# Atlas IA & ML — Référentiel des modèles d'IA et de Machine Learning

Site statique en deux pages présentant 16 familles de modèles (du ML classique aux agents IA) :

- **`index.html` — Grille comparative** : pour chaque famille, un schéma animé, le type de problème et son sous-classement ML, les business cases les plus significatifs par industrie, et l'architecture de référence du cas d'usage phare avec sa stack Python.
- **`fiches.html` — Fiches Métier × Technique** : pour chaque architecture, l'objectif business et les KPI de succès (côté métier), puis chaque composant, ses bibliothèques Python et son rôle dans le résultat (côté technique), avec la perspective d'exploitation DevOps / MLOps / LLMOps.

## Structure du dépôt

```
.
├── index.html                 # Page 1 — grille comparative des 16 modèles
├── fiches.html                # Page 2 — fiches architectures Métier × Technique
├── assets/
│   ├── css/
│   │   ├── theme.css          # Variables de couleurs, typographies, navigation, animations
│   │   ├── grid.css           # Styles propres à la grille comparative
│   │   └── fiches.css         # Styles propres aux fiches
│   └── js/
│       └── animations.js      # Animations : schémas SVG (tracé progressif, pop),
│                              # révélation au scroll, pulsation des pipelines, KPI en cascade
└── README.md
```

## Déploiement sur GitHub Pages

1. Créer un dépôt et pousser l'ensemble des fichiers à la racine :
   ```bash
   git init
   git add .
   git commit -m "Atlas IA & ML"
   git branch -M main
   git remote add origin https://github.com/<votre-compte>/<votre-repo>.git
   git push -u origin main
   ```
2. Dans le dépôt GitHub : **Settings → Pages → Build and deployment** :
   - *Source* : `Deploy from a branch`
   - *Branch* : `main` / dossier `/ (root)` → **Save**
3. Le site est publié sous `https://<votre-compte>.github.io/<votre-repo>/`.

## Personnalisation

- **Couleurs et polices** : bloc `:root` de `assets/css/theme.css` (chaque variable est commentée).
- **Animations** : `assets/js/animations.js` (vitesses et délais) et section « Animations » de `theme.css` (keyframes). Le site reste entièrement lisible sans JavaScript, et les animations se désactivent automatiquement si le visiteur a activé « réduire les animations » (`prefers-reduced-motion`).
- **Contenu** : les pages sont autonomes ; chaque modèle est un bloc `<article class="row">` (grille) ou `<section class="fiche">` (fiches).

## Sources des statistiques citées

Communiqués Gartner (2025–2026) sur l'adoption de l'agentic AI, enquête McKinsey *The State of AI 2025* et enquêtes Kaggle *State of Machine Learning and Data Science* — référencées en pied de page des deux pages.
