# Application d'apprentissage de l'espéranto

Cette application web permet d'apprendre l'espéranto de manière naturelle grâce à la méthode de **comprehensible input**. Elle propose une collection de textes en espéranto avec des traductions interactives et des enregistrements audio.

## 🚀 Technologies utilisées

- **React 18** - Bibliothèque JavaScript pour créer des interfaces utilisateur
- **TypeScript** - Langage de programmation typé basé sur JavaScript
- **Material-UI (MUI)** - Bibliothèque de composants React basée sur Material Design
- **React Router** - Gestion de la navigation entre les pages
- **Axios** - Client HTTP pour les appels API
- **Emotion** - Bibliothèque CSS-in-JS pour le styling

## 📦 Installation

1. Clonez le repository :
```bash
git clone <votre-repo>
cd nilegu-ui
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application en mode développement :
```bash
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## 🛠️ Commandes disponibles

- `npm start` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm test` - Lance les tests
- `npm run eject` - Éjecte la configuration (irréversible)

## 🎯 Fonctionnalités

### Page d'accueil
- **Explication de la méthode** : Présentation de l'approche naturelle d'apprentissage
- **Avantages de la méthode** : Textes progressifs, progression naturelle, mémorisation durable
- **Niveaux disponibles** : Débutant, intermédiaire, avancé
- **Navigation vers le catalogue** : Accès direct aux textes

### Catalogue de textes
- **Recherche avancée** : Par titre, auteur, mots-clés
- **Filtres** : Niveau, auteur, longueur du texte
- **Affichage des textes** : Cartes avec informations détaillées
- **Navigation** : Accès direct aux textes individuels

### Lecteur de texte
- **Texte interactif** : Mots cliquables avec traductions
- **Lecteur audio** : Contrôles de lecture (play, pause, stop)
- **Popup de traduction** : Affichage détaillé des mots
- **Interface responsive** : Optimisé pour mobile et desktop

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
├── pages/              # Pages de l'application
│   ├── HomePage.tsx    # Page d'accueil
│   ├── CatalogPage.tsx # Catalogue des textes
│   └── TextReaderPage.tsx # Lecteur de texte
├── hooks/              # Hooks personnalisés
│   └── useTekstoj.ts   # Gestion des données des textes
├── services/           # Services API
│   └── api.ts          # Appels vers le backend
├── types/              # Types TypeScript
│   └── index.ts        # Interfaces des données
├── App.tsx             # Composant principal avec routage
└── index.tsx           # Point d'entrée
```

## 🔧 API Backend

L'application se connecte à l'API espéranto :
- **URL de base** : `https://ikurso.esperanto-france.org/api.php`
- **Endpoints** :
  - `?path=tekstoj` - Liste des textes
  - `?path=tekstoj/{id}` - Détails d'un texte spécifique

## 🎨 Design et UX

### Thème personnalisé
- **Couleur primaire** : Vert espéranto (#2E7D32)
- **Couleur secondaire** : Bleu (#1976D2)
- **Typographie** : Roboto pour une meilleure lisibilité
- **Composants** : Coins arrondis et ombres subtiles

### Responsive Design
- **Mobile-first** : Interface optimisée pour les petits écrans
- **Tablette** : Adaptation automatique des grilles
- **Desktop** : Mise en page complète avec navigation

## 🚀 Fonctionnalités avancées

### Gestion d'état
- **Hooks personnalisés** : `useTekstoj`, `useTekstoDetaloj`
- **État local** : Filtres, sélection de mots, contrôles audio
- **Gestion d'erreurs** : Affichage des erreurs API

### Performance
- **Lazy loading** : Chargement à la demande des textes
- **Mise en cache** : Réutilisation des données déjà chargées
- **Optimisation** : Composants optimisés pour éviter les re-renders

## 📚 Méthode d'apprentissage

### Comprehensible Input
Cette application suit les principes de la méthode de comprehensible input :

1. **Exposition naturelle** : Lecture de textes authentiques
2. **Compréhension contextuelle** : Découverte du sens par le contexte
3. **Interactivité** : Traductions disponibles à la demande
4. **Audio** : Prononciation et intonation correctes
5. **Progression** : Textes adaptés au niveau de l'apprenant

### Avantages
- **Apprentissage intuitif** : Pas besoin d'étudier la grammaire explicitement
- **Motivation** : Contenu intéressant et varié
- **Efficacité** : Mémorisation naturelle du vocabulaire
- **Flexibilité** : Apprentissage à son rythme

## 🔧 Développement avec Cursor

### Conseils pour utiliser Cursor efficacement :

1. **Autocomplétion intelligente** : Cursor vous aide avec les imports et les props MUI
2. **Refactoring** : Utilisez Cmd/Ctrl + Shift + R pour renommer des variables
3. **Navigation** : Cmd/Ctrl + P pour ouvrir rapidement des fichiers
4. **Terminal intégré** : Utilisez le terminal de Cursor pour les commandes npm
5. **Git intégré** : Gérez vos commits directement dans Cursor

### Workflow recommandé :

1. **Planifiez vos fonctionnalités** : Décrivez ce que vous voulez faire
2. **Utilisez l'IA de Cursor** : Demandez de l'aide pour implémenter des fonctionnalités
3. **Testez régulièrement** : Lancez `npm start` pour voir vos changements
4. **Commitez souvent** : Utilisez Git pour sauvegarder votre travail

## 📚 Ressources utiles

- [Documentation MUI](https://mui.com/material-ui/getting-started/)
- [Documentation React](https://react.dev/)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [Documentation React Router](https://reactrouter.com/)
- [Espéranto France](https://www.esperanto-france.org/)
- [Méthode comprehensible input](https://en.wikipedia.org/wiki/Comprehensible_input)

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **Espéranto France** pour l'API et les textes
- **Material-UI** pour les composants
- **React** pour le framework
- **La communauté espéranto** pour le contenu
