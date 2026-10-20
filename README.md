# Face au choix

Jeu React local : visage recadré, deux options fixes, révélation de l’image, résultat et score final. Aucun backend ni compte. Les vingt dernières parties sont conservées dans le localStorage du navigateur. Effacer les données du navigateur efface les scores. Ceux-ci ne sont pas partagés entre appareils et peuvent être modifiés par l’utilisateur.

## Démarrer

Node.js 22.12+ ou 24 recommandé.

```sh
npm install
npm run dev
```

Ouvrir l’adresse affichée par Vite. `npm run build` produit le dossier `dist`, `npm run preview` permet de consulter cette version. `npm test` vérifie le calcul et la conservation des scores.

## Ajouter vos photos

Les photos de `assets/bb/` et `assets/nn/` sont intégrées automatiquement par Vite, y compris au build. La réponse provient uniquement du dossier : BB ou NN. Formats : JPG, JPEG, PNG, WebP et AVIF.

1. Ajouter vos photos dans le dossier de leur catégorie, puis relancer le serveur ou le build.
2. Modifier les libellés dans `options` de `src/data/questions.js` si nécessaire, en conservant les identifiants `bb` et `nn`.
3. Pour ajuster un visage, modifier son entrée dans `facePositions`, par exemple `'/assets/bb/photo.jpg': { x: 45, y: 35, zoom: 5 }`.

Les cadrages des vingt photos sont définis dans `facePositions` : `x` et `y` positionnent le cadrage en pourcentage, `zoom` définit le grossissement. Pour les nouvelles photos sans configuration, le cadrage par défaut est `{ x: 50, y: 30 }` avec un zoom de 2,5. Il n’y a pas de détection automatique des visages. La vue révélée montre toute l’image sans découpe.

Toutes les photos sont mélangées à chaque partie. Un point par bonne réponse, aucun point négatif. Une réponse est définitive jusqu’à la prochaine partie.

## Organisation

- `src/components/` : affichage du portrait et de la question réutilisables.
- `src/data/questions.js` : contenu du jeu.
- `src/game.js` : calcul du score indépendant de React.
- `src/services/scores.js` : persistance isolée, stockage injectable pour les tests.
- `src/main.jsx` : déroulement de la partie et assemblage de l’interface.

Les photos restent des fichiers statiques : leurs URLs sont accessibles au navigateur même avant la révélation. Cette base convient à un jeu amical, sans garantie contre la triche. Pour des scores partagés ou vérifiés, prévoir un backend.
