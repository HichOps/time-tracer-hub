import { useEffect, useRef, useCallback } from 'react';

// ============================================
// GLSL Shaders — Vortex Temporel Heisenberg
// ============================================

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

/**
 * Fragment shader : tunnel tourbillonnant style Stargate / Sliders
 * - Tunnel cylindrique avec distorsion spirale
 * - Palette : noir profond, bleu nuit, poussière d'or (#D4AF37)
 * - Masque radial pour fondu vers le noir sur les bords
 */
const FRAGMENT_SHADER = `
  precision mediump float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;

  // Pseudo-random hash
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Smooth noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      val += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return val;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);
    
    // Polar coordinates for tunnel effect
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Tunnel depth (inverse of distance = infinite depth at center)
    float depth = 0.08 / (dist + 0.05);
    
    // Spiral distortion — the wormhole rotation
    float spiral = angle + depth * 2.0 + u_time * 0.3;
    float spiralSlow = angle + depth * 1.5 - u_time * 0.15;
    
    // Layered tunnel texture using fbm noise
    float tunnel1 = fbm(vec2(spiral * 2.0, depth * 6.0 + u_time * 0.4));
    float tunnel2 = fbm(vec2(spiralSlow * 3.0, depth * 4.0 - u_time * 0.2));
    float tunnel3 = fbm(vec2(angle * 4.0 + u_time * 0.1, depth * 8.0 + u_time * 0.6));
    
    // Combine layers
    float pattern = tunnel1 * 0.5 + tunnel2 * 0.3 + tunnel3 * 0.2;
    
    // Energy streaks — bright lines spiraling inward
    float streaks = smoothstep(0.6, 0.9, sin(spiral * 8.0 + depth * 20.0 + u_time) * 0.5 + 0.5);
    streaks += smoothstep(0.7, 1.0, sin(spiralSlow * 6.0 + depth * 15.0 - u_time * 0.8) * 0.5 + 0.5) * 0.5;
    
    // Color palette — Deep black, midnight blue, golden stardust
    vec3 darkBlue = vec3(0.02, 0.03, 0.08);
    vec3 midnightBlue = vec3(0.05, 0.08, 0.18);
    vec3 gold = vec3(0.831, 0.686, 0.216);       // #D4AF37
    vec3 brightGold = vec3(1.0, 0.843, 0.0);      // #FFD700
    vec3 warmGold = vec3(0.85, 0.65, 0.13);
    
    // Base tunnel color — dark to blue gradient with depth
    vec3 baseColor = mix(darkBlue, midnightBlue, pattern);
    
    // Add golden energy based on pattern intensity
    float goldIntensity = pow(pattern, 2.0) * 0.6;
    baseColor = mix(baseColor, gold * 0.4, goldIntensity);
    
    // Add bright golden streaks
    baseColor += brightGold * streaks * 0.15 * (1.0 - dist * 0.8);
    
    // Central glow — bright golden core
    float coreGlow = exp(-dist * 4.0) * 0.4;
    baseColor += warmGold * coreGlow * (0.7 + 0.3 * sin(u_time * 0.5));
    
    // Stardust particles — flickering golden dots
    float stars = pow(noise(vec2(spiral * 20.0, depth * 40.0 + u_time * 2.0)), 8.0);
    baseColor += brightGold * stars * 0.4;
    
    // Radial vignette mask — intense at center, fading to black at edges
    float vignette = 1.0 - smoothstep(0.15, 0.7, dist);
    
    // Outer fade to pure black
    float outerFade = 1.0 - smoothstep(0.3, 0.85, dist);
    
    // Apply masks
    vec3 finalColor = baseColor * vignette * outerFade;
    
    // Subtle overall dimming to keep it background-level
    finalColor *= 0.55;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ============================================
// WebGL helpers
// ============================================

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('[VortexBG] Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('[VortexBG] Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// ============================================
// React Component
// ============================================

/**
 * Vortex temporel procédural en WebGL pur
 * - Tunnel tourbillonnant style Stargate / wormhole
 * - Palette Heisenberg : noir, bleu nuit, or (#D4AF37)
 * - Masque radial pour ne pas gêner la lisibilité du texte
 * - pointer-events: none pour ne jamais bloquer les clics
 */
const VortexBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const programRef = useRef<WebGLProgram | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!gl) {
      console.warn('[VortexBG] WebGL not available');
      return false;
    }
    glRef.current = gl;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return false;

    const program = createProgram(gl, vs, fs);
    if (!program) return false;
    programRef.current = program;

    // Fullscreen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Cleanup shaders (attached to program, no longer needed standalone)
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    return true;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    if (!canvas || !gl) return;

    // Use lower resolution for performance (0.35x = big perf win, still looks great with blur)
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const scale = 0.35;
    const w = Math.floor(canvas.clientWidth * dpr * scale);
    const h = Math.floor(canvas.clientHeight * dpr * scale);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ok = initGL();
    if (!ok) return;

    const gl = glRef.current!;
    const program = programRef.current!;
    gl.useProgram(program);

    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResLoc = gl.getUniformLocation(program, 'u_resolution');

    resize();

    let startTime = performance.now();

    const render = () => {
      resize();
      const elapsed = (performance.now() - startTime) * 0.001;

      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uResLoc, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);

      // Cleanup WebGL
      if (glRef.current && programRef.current) {
        glRef.current.deleteProgram(programRef.current);
      }
      programRef.current = null;
      glRef.current = null;
    };
  }, [initGL, resize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 1,
        pointerEvents: 'none',
        imageRendering: 'auto',
        filter: 'blur(2px)',
      }}
      aria-hidden="true"
    />
  );
};

export default VortexBackground;
