# Site d'OE-Architecture — Bâtir solide, vivre mieux !

Site statique (HTML / CSS / JS) : aucune installation, aucun build.

## Modifier
- **Projets (réalisations)** → `projects.js` : un bloc par projet (nom, lieu, type, statut, description, rôle, images). Copie un bloc pour en ajouter un.
- **Textes** → `index.html` (sections : Accueil, Qui sommes-nous, Services, Approche, Réalisations, Pourquoi nous, Valeurs, Partenaires, Contact).
- **Couleurs** → variables `:root` en haut de `style.css` (`--indigo`, `--cyan`, `--bg`).
- **Images** → dossier `assets/` (garde des noms simples, sans espaces ni accents).
- **Réseaux sociaux** → cherche `class="social"` dans `index.html` et colle les vrais liens.
- **Téléphone / WhatsApp / e-mail** → `index.html` et, en haut de `script.js`, `WHATSAPP` et `EMAIL`.

## Recevoir les demandes de devis
Dans `script.js`, ligne `const FORM_ENDPOINT = ''` : crée un formulaire gratuit sur https://formspree.io (avec oearchitecture04@gmail.com) et colle l'adresse fournie. Sans cela, le bouton ouvre un e-mail pré-rempli. Le bouton « Écrire sur WhatsApp » envoie la demande directement sur WhatsApp.

## Publier
1. Dépose les fichiers à la racine d'un dépôt GitHub (`index.html`, `style.css`, `script.js`, `projects.js`, `vercel.json`, dossier `assets`).
2. Sur vercel.com : *Add New → Project* → importe le dépôt → *Deploy* (Preset : Other).
3. Chaque modification sur GitHub redéploie le site automatiquement.
