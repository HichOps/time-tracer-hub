# TimeTravel Agency - Webapp Interactive ⏳✨

Webapp immersive pour une agence de voyage temporel de luxe, réalisée dans le cadre du projet supervisé "IA Créatives" (2026). Ce projet illustre une transition réussie du **"Vibe Coding"** vers une **architecture logicielle industrielle**.

🔗 **Démo en ligne** : [https://time-tracer-hub.lovable.app](https://time-tracer-hub.lovable.app)
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

## ✨ Fonctionnalités Avancées

1. **Expérience Immersive "Triple A"** :
   * **Custom Cursor** : Viseur temporel doré (60 FPS) avec `useMotionValue` et `useSpring` de Framer Motion pour une fluidité GPU-accélérée.
   * **Audio Context** : Nappe sonore adaptative démarrant dès l'entrée dans l'expérience.
   * **Mouse Parallax** : Effet de profondeur sur les images de destination via `useParallax`.
2. **Agent Chronos 2.0** : IA conversationnelle connectée à **Mistral AI** (`mistral-small-latest`) avec mémoire de conversation et fallback local si la clé API est absente.
2. **Architecture Modulaire** : Code 100% déclaratif. Le fichier `Index.tsx` est réduit à une simple structure de composition.
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