# TimeTravel Agency - Webapp Interactive ⏳✨

Webapp immersive pour une agence de voyage temporel de luxe, réalisée dans le cadre du projet supervisé "IA Créatives" (2026). Ce projet illustre une transition réussie du **"Vibe Coding"** vers une **architecture logicielle industrielle**.

🔗 **Démo en ligne** : [https://time-tracer-hub.vercel.app](https://time-tracer-hub.vercel.app)
💻 **Dépôt GitHub** : [https://github.com/HichOps/time-tracer-hub](https://github.com/HichOps/time-tracer-hub)
🏢 **Propulsé par** : Heisenberg Prod.

---

## 📸 Aperçu du Projet

| Hero Section & Immersion | Modale de Réservation |
|:---:|:---:|
| ![Hero Section](https://i.imgur.com/fKLmrnA.png) | ![Réservation](https://i.imgur.com/os6B5eh.png) |

| Quiz & Recommandation | Expérience Immersive |
|:---:|:---:|
| ![Quiz](https://i.imgur.com/do2kZFW.png) | ![Audio & Cursor](https://i.imgur.com/441V8G3.png) |

---

## 📝 Description

Cette webapp "Triple A" offre une expérience de voyage temporel complète :
* **Exploration** de destinations historiques (Paris 1889, Crétacé, Florence 1504).
* **Interaction** avec l'agent **Chronos** (IA conversationnelle personnalisée).
* **Personnalisation** via un algorithme de recommandation (Chrono-Quiz).
* **Réservation** sécurisée avec feedback visuel immersif.

---

## 🚀 Genèse du Projet

Ce projet illustre une démarche de **"Vibe Coding" maîtrisé** : partir d'un prototype généré pour aboutir à une architecture industrielle optimisée.

### Étape 1 – Bootstrap Initial
* **[Lovable.dev](https://lovable.dev)** : Génération du squelette React/Vite/Tailwind et de l'interface initiale via prompts conversationnels (pas de code from scratch).
* **[Nano Banana (Bananaml)](https://www.nano-banana.com/)** : Création des visuels cinématographiques des destinations temporelles (images héros).
* **Gemini 3 Pro** : Rédaction et itération des prompts pour Lovable et Nano Banana.

### Étape 2 – Réappropriation & Optimisation
* **Audit Clean Code** complet du code généré par Lovable.
* **Extraction** de la logique en hooks personnalisés (`useQuiz`, `useChatbot`, `useCursor`...).
* **Suppression** de 42 composants Shadcn/UI inutilisés (49 → 7).
* **Optimisation GPU** des animations (Framer Motion `useMotionValue`).
* **Intégration** de Mistral AI pour un agent conversationnel premium.
* **Refactoring** en architecture industrielle avec types, constantes, et services centralisés.

> 💡 **Takeaway** : Les outils de génération IA sont d'excellents accélérateurs, mais la valeur réside dans la capacité à auditer, restructurer et optimiser le code produit.

---

## �🛠 Stack & Outils Utilisés

Le projet a été entièrement développé à l'aide d'**outils gratuits** et de plans "tier" accessibles, démontrant qu'une haute qualité de production est possible sans budget logiciel conséquent.

### 🤖 Intelligence Artificielle & Pilotage
* **Gemini 3 Pro** : Rédaction des prompts pour Lovable et Nano Banana + Architecte stratégique pour l'audit de code et la planification du refactoring.
* **GitHub Copilot (Claude 4.5 Opus)** : Agent de développement principal en local (VS Code) pour le refactoring complexe et l'implémentation des hooks personnalisés.
* **Mistral AI (mistral-small-latest)** : Moteur de l'agent conversationnel **Chronos 2.0**, avec System Prompt personnalisé et mémoire conversationnelle.

### 🏗 Génération & Prototypage
* **[Lovable.dev](https://lovable.dev)** : Bootstrap initial du projet (React/Vite/Tailwind) via prompts conversationnels.

### 🎨 Assets & Visuels
* **Nano Banana** : Génération des visuels cinématographiques exclusifs pour les destinations.
* **Lucide React** : Librairie d'icônes vectorielles.
* **Web Audio API** : Gestion de l'ambiance sonore spatiale et des bruitages mécaniques.

### ⚡ Architecture Technique (Clean Code)
* **Runtime & Package Manager** : **Bun** pour une rapidité d'exécution et d'installation optimale.
* **Frontend** : React + TypeScript (Typage strict validé via `tsc --noEmit`).
* **Styling** : Tailwind CSS avec Design System centralisé dans `src/constants/styles.ts`.
* **Logic Layer** : Custom Hooks (`useQuiz`, `useChatbot`, `useAudio`, `useCursor`, `useParallax`, `useIntersection`) isolant totalement la logique du JSX.
* **Animations** : Framer Motion (GPU Accelerated) & Mouse Parallax.

---

## 🏗️ Architecture Technique (Industrial Grade)

L'architecture du projet a été conçue pour répondre aux standards de production **Heisenberg Prod.** (Lyon Perrache, depuis 1986). Elle respecte les principes **SOLID**, **DRY** et **SoC** (Separation of Concerns).

```
time-tracer-hub/
├── 📦 bun.lockb                    # Lockfile Bun (runtime haute performance)
├── ⚙️ vite.config.ts               # Configuration Vite + Code Splitting
├── 🎨 tailwind.config.ts           # Design System centralisé
├── 🔐 .env.example                 # Template des variables d'environnement
│
├── public/
│   └── robots.txt                  # SEO & Indexation
│
└── src/
    ├── main.tsx                    # Point d'entrée React
    ├── App.tsx                     # Router & Providers
    │
    ├── 📄 pages/
    │   ├── Index.tsx               # Page principale (composition pure)
    │   └── NotFound.tsx            # Gestion 404
    │
    ├── 🧩 components/
    │   ├── Header.tsx              # Navigation principale
    │   ├── HeroSection.tsx         # Section héroïque immersive
    │   ├── DestinationsSection.tsx # Grille des voyages temporels
    │   ├── DestinationCard.tsx     # Carte destination (parallax)
    │   ├── ExperienceSection.tsx   # Section expérience
    │   ├── ChronoQuiz.tsx          # Quiz de recommandation
    │   ├── ChatWidget.tsx          # Interface Chronos (IA)
    │   ├── BookingModal.tsx        # Modale de réservation
    │   ├── Footer.tsx              # Pied de page (Lyon Perrache 1986)
    │   └── ui/                     # Composants atomiques
    │       ├── CustomCursor.tsx    # Curseur temporel GPU-accéléré
    │       ├── MuteButton.tsx      # Contrôle audio
    │       └── [shadcn/ui]         # 7 composants essentiels
    │
    ├── 🪝 hooks/
    │   ├── useChatbot.ts           # Logique IA Chronos + Mistral API
    │   ├── useCursor.ts            # Animation curseur (useMotionValue)
    │   ├── useAudio.ts             # Gestion audio spatiale
    │   ├── useQuiz.ts              # Machine à états du quiz
    │   ├── useBooking.ts           # Workflow de réservation
    │   ├── useParallax.ts          # Effet parallaxe souris
    │   ├── useIntersection.ts      # Détection viewport
    │   └── use-mobile.tsx          # Détection responsive
    │
    ├── 🔌 services/
    │   └── mistralService.ts       # API Mistral (Few-Shot Prompting)
    │
    ├── 📚 constants/
    │   ├── destinations.ts         # Données destinations (Paris 1889, etc.)
    │   ├── quiz.ts                 # Questions & scoring
    │   ├── chat.ts                 # Réponses fallback Chronos
    │   ├── styles.ts               # Design tokens (couleurs, espacements)
    │   └── index.ts                # Barrel export
    │
    ├── 🎭 contexts/
    │   └── AudioContext.tsx        # Provider audio global
    │
    ├── 🏷️ types/
    │   └── index.ts                # Interfaces TypeScript centralisées
    │
    └── 🧪 test/
        ├── setup.ts                # Configuration Vitest
        └── example.test.ts         # Tests unitaires
```

### 💡 Justifications Techniques

| Couche | Avantage |
|--------|----------|
| **🪝 Hooks Personnalisés** | Isolation totale de la logique métier (SoC). Le JSX reste 100% déclaratif. |
| **🔌 Services** | Centralisation des appels API Mistral. Secrets sécurisés via `.env`. |
| **📚 Constants** | Principe DRY : contenu érudit et Design System en un seul point de vérité. |
| **🏷️ Types** | Typage strict validé par `tsc --noEmit`. Zéro `any` en production. |
| **⚡ Bun Engine** | Runtime 3x plus rapide que Node.js pour le build et l'installation. |
| **🎨 Tailwind + tokens** | Design System cohérent via `styles.ts` (or Heisenberg, dégradés temporels). |

> 🏭 **Industrial Grade** : Cette architecture permet une maintenance aisée, des tests unitaires ciblés et une scalabilité horizontale pour de futures destinations.

---

## ✨ Fonctionnalités Avancées

1. **Expérience Immersive "Triple A"** :
   * **Custom Cursor** : Viseur temporel doré (60 FPS) avec `useMotionValue` et `useSpring` de Framer Motion pour une fluidité GPU-accélérée.
   * **Audio Context** : Nappe sonore adaptative démarrant dès l'entrée dans l'expérience.
   * **Mouse Parallax** : Effet de profondeur sur les images de destination via `useParallax`.
2. **Agent Chronos 2.0** : IA conversationnelle connectée à **Mistral AI** (`mistral-small-latest`) avec mémoire de conversation et fallback local si la clé API est absente.

### 🧠 Focus : L'Intelligence de Chronos
L'agent utilise un système de **Few-Shot Prompting** pour garantir une immersion totale :
- **Modèle** : Mistral-small-latest (via API sécurisée).
- **Context Window** : Mémoire glissante de 16 messages pour une continuité narrative.
- **Guardrails** : Filtrage des hors-sujets et maintien strict du rôle "Heisenberg Prod.".

3. **Architecture Modulaire** : Code 100% déclaratif. Le fichier `Index.tsx` est réduit à une simple structure de composition.
3. **Localisation Réelle** : L'agence est ancrée à **Lyon Perrache** (12 bis Cour de Verdun Gensoul, 69002) avec un héritage remontant à **1986**.
4. **Performance Optimisée** : Suppression du code mort (nettoyage des composants Shadcn inutilisés) et lazy-loading systématique.

---

## 🧠 Retour d'Expérience & Processus

Le projet a suivi une méthodologie de **"Reclaim & Refactor"** :

1. **Phase 1 : Bootstrap (Lovable)** : Génération rapide d'une base fonctionnelle pour valider le concept visuel.
2. **Phase 2 : Appropriation & Restructuration** : Migration vers VS Code. Le code a été repris en main pour casser le monolithe initial au profit de dossiers `types/`, `constants/`, et `hooks/` dédiés.
3. **Phase 3 : Polissage "Heisenberg Prod."** : Personnalisation totale de la marque, correction des incohérences temporelles et optimisation des performances (passage au `useMotionValue` pour le curseur).

---

## ⚖️ Transparence & Éthique

* **Code** : Prototypé par IA, mais audité, corrigé et réarchitecturé manuellement pour garantir la maintenabilité.
* **Images** : Synthétisées via Nano Banana.
* **Accessibilité** : Optimisation des balises `aria-label` et SEO.
* **Production** : Signé par **Heisenberg Prod.**

---

## 📄 Licence
MIT License - Projet pédagogique M1/M2 Digital & IA (2026).

---

## 🎤 FAQ Technique (Préparation Jury)

Anticipation des questions techniques pour la soutenance orale.

### 🤖 IA & Mistral

| # | Question | Réponse |
|---|----------|---------|
| 1 | **Pourquoi avoir choisi Mistral AI plutôt qu'OpenAI ou Anthropic ?** | Mistral est une **solution française souveraine** avec un excellent rapport qualité/coût. Le modèle `mistral-small-latest` offre des réponses de qualité équivalente à GPT-3.5 pour un coût 3x inférieur, ce qui est cohérent avec la contrainte "outils gratuits/tier accessible" du projet. De plus, Mistral respecte mieux le RGPD. |
| 2 | **Comment as-tu sécurisé la clé API Mistral ?** | La clé est stockée dans un fichier `.env` **exclu du versioning** via `.gitignore`. En production (Vercel), elle est injectée via les **Environment Variables** du dashboard. Le code vérifie `import.meta.env.VITE_MISTRAL_API_KEY` et active un **fallback local** si la clé est absente, garantissant une expérience dégradée mais fonctionnelle. |
| 3 | **Qu'est-ce que le System Prompt et pourquoi est-il si long ?** | Le System Prompt est l'**instruction initiale** envoyée au LLM avant chaque conversation. J'utilise du **Few-Shot Prompting** (exemples de réponses attendues) pour forcer le modèle à rester dans son rôle de "Chronos, concierge temporel Heisenberg Prod.". Les 80+ lignes incluent des faits historiques précis (Paris 1889, Florence 1504) pour éviter les hallucinations et des **guardrails** pour filtrer les hors-sujets. |

### 🏗️ Architecture & Hooks

| # | Question | Réponse |
|---|----------|---------|
| 4 | **Pourquoi avoir extrait la logique dans des Custom Hooks ?** | C'est l'application du principe **SoC (Separation of Concerns)**. Les hooks comme `useChatbot` ou `useCursor` encapsulent toute la logique métier, laissant les composants React **100% déclaratifs**. Cela facilite les tests unitaires, la réutilisation, et permet à un développeur de modifier la logique sans toucher au JSX. |
| 5 | **Quel est l'avantage d'un dossier `services/` séparé ?** | Le dossier `services/` isole les **appels API externes** (Mistral). Si demain je veux migrer vers OpenAI, je modifie uniquement `mistralService.ts` sans toucher aux hooks ni aux composants. C'est le pattern **Repository/Gateway** adapté au frontend, conforme aux principes SOLID (Single Responsibility). |
| 6 | **Pourquoi avoir supprimé 42 composants Shadcn/UI ?** | Lovable a généré un projet avec **tous** les composants Shadcn par défaut. Après audit, j'ai identifié que seuls 7 étaient réellement utilisés. Supprimer le code mort réduit le **bundle size**, accélère le build, et améliore la lisibilité du projet. C'est une application du principe YAGNI (You Ain't Gonna Need It). |

### ⚡ Performance & Bun

| # | Question | Réponse |
|---|----------|---------|
| 7 | **Pourquoi Bun plutôt que npm ou yarn ?** | Bun est un runtime JavaScript **3x plus rapide** que Node.js pour l'installation des dépendances et le build. Sur ce projet, `bun install` prend ~2 secondes vs ~15 secondes avec npm. En production, cela accélère les pipelines CI/CD. Bun est aussi compatible à 100% avec l'écosystème npm, donc zéro risque de régression. |
| 8 | **Comment as-tu optimisé le curseur personnalisé à 60 FPS ?** | Le curseur initial utilisait `useState` pour tracker la position, causant des **re-renders** à chaque mouvement de souris. J'ai migré vers `useMotionValue` et `useSpring` de Framer Motion, qui mettent à jour les valeurs **hors du cycle React** via le GPU. Résultat : fluidité 60 FPS sans aucun re-render du composant. |

### 🎭 Branding & Identité

| # | Question | Réponse |
|---|----------|---------|
| 9 | **Comment as-tu personnalisé l'expérience pour Heisenberg Prod. ?** | J'ai remplacé toutes les mentions "Lovable" par l'identité **Heisenberg Prod.** : logo, footer (adresse Lyon Perrache), System Prompt de Chronos, et même les méta-données SEO (`index.html`). Le Design System dans `styles.ts` utilise des tokens cohérents (or Heisenberg, dégradés temporels) pour une identité visuelle unifiée. |
| 10 | **Pourquoi Lyon 1986 ? C'est réel ou fictif ?** | C'est un **easter egg narratif** cohérent avec l'univers du voyage temporel. 1986 est l'année de fondation fictive de l'agence, et Lyon Perrache (12 bis Cour de Verdun Gensoul, 69002) est une adresse réelle qui ancre l'agence dans le monde physique. Cela renforce l'**immersion** et donne du crédit au storytelling de Chronos. |

### 🧠 Méthodologie IA

| # | Question Bonus | Réponse |
|---|----------------|---------|
| 11 | **Quel a été le rôle de chaque IA dans ton workflow ?** | **Gemini 3 Pro** : Architecte stratégique pour l'audit, la planification des phases et la rédaction des prompts. **Claude 4.5 Opus** (via GitHub Copilot) : Agent d'exécution en local pour le refactoring complexe et l'implémentation des hooks. **Mistral** : Moteur de l'agent conversationnel en production. Chaque IA a un rôle distinct, évitant la confusion des responsabilités. |

> 💡 **Conseil oral** : Pour chaque réponse, commence par le "quoi" (ce que tu as fait), puis le "pourquoi" (le bénéfice technique ou utilisateur).

---