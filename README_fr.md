# OSINT-Hub

Ce README est également disponible en [🇬🇧 Anglais](./README.md)

**OSINT-Hub** est une plateforme web complète regroupant des ressources OSINT (Open Source Intelligence) et de sécurité offensive avec des capacités de filtrage avancées. La plateforme est conçue comme un écosystème évolutif avec plusieurs hubs spécialisés en développement actif.

---

## Aperçu

OSINT-Hub fournit une interface centralisée pour les professionnels de la sécurité, chercheurs et passionnés pour découvrir et accéder à des outils dans de multiples domaines. La plateforme organise les ressources par catégories incluant la reconnaissance, l'ingénierie sociale, les tests d'applications web, la forensique et plus encore, avec un focus sur les ressources d'Europe de l'Ouest tout en maintenant une couverture mondiale.

![Capture d'écran d'OSINT-Hub](Screenshot.png "Capture d'écran")

---

## Vision

OSINT-Hub est conçu comme un **écosystème évolutif** d'outils de renseignement de sécurité. Bien qu'il comporte actuellement deux hubs principaux (OSINT et Sécurité Offensive), l'architecture de la plateforme supporte une expansion illimitée. Les futurs ajouts couvriront :

- Renseignement sur les menaces et surveillance
- Rapports automatisés et documentation
- Espaces de travail d'enquête collaborative
- Ensembles d'outils régionaux et sectoriels spécialisés
- Intégrations API pour accès direct aux outils

Consultez la barre de navigation latérale pour voir quelles sections sont en ligne, en développement ou à venir. La plateforme est en développement actif avec des mises à jour régulières et de nouvelles fonctionnalités.

---

## Fonctionnalités

### Fonctionnalités Principales
- **Architecture de plateforme multi-hub** : Comprend actuellement les sections OSINT et Sécurité Offensive, avec des hubs spécialisés supplémentaires en développement actif
- **🤖 Chatbot OSINT alimenté par IA (BETA)** : Chatbot spécialisé pour les requêtes et conseils OSINT - les performances dépendent des spécifications de votre système
- **Menu de navigation moderne** : Barre latérale élégante indiquant clairement le statut des outils (Live, Dev, Soon) pour les fonctionnalités actuelles et à venir
- **Chargement de pages dynamique par iframe** : Transitions fluides entre les sections
- **Système d'avertissement légal** : Disclaimer proéminent pour une utilisation responsable

### Système de Filtrage Avancé
- **Filtrage multidimensionnel** :
  - Organisation par catégories (14+ catégories pour OSINT, 13+ pour Offsec)
  - Filtrage par type de source (GitHub, sites officiels, APIs, ressources gouvernementales)
  - Filtrage géographique/régional (International, pays européens, etc.)
  - Indicateurs de niveau de danger (Faible, Moyen, Élevé, Risque extrême)
  - Distinction outils gratuits vs. payants
  - Statut des outils signalés/vérifiés
- **Recherche en temps réel** : Filtrage instantané par texte sur les noms et descriptions d'outils
- **Compteur de résultats** : Compte en direct des outils correspondants
- **Interrupteurs à bascule** : Contrôles intuitifs pour ajustements rapides des filtres
- **Fonctionnalité de réinitialisation** : Réinitialisation des filtres en un clic

### Expérience Utilisateur
- **Design responsive** : Optimisé pour ordinateurs de bureau et appareils mobiles
- **Animation de particules en arrière-plan** : Effets visuels dynamiques
- **UI glassmorphism** : Effets de flou d'arrière-plan modernes et conteneurs translucides
- **Esthétique néon** : Palette de couleurs inspirée du cyberpunk avec des accents lumineux
- **Transitions fluides** : Animations CSS et effets de survol partout
- **Menu mobile** : Navigation hamburger pour petits écrans

### Fonctionnalités Techniques
- **Backend Flask** : Serveur Python léger pour hébergement local
- **Détection automatique de port** : Trouve automatiquement les ports disponibles (plage 8000-9000)
- **CORS activé** : Configuration cross-origin appropriée
- **API JSON** : Données d'outils structurées dans `api/tools.json`
- **Gestion des ressources statiques** : Structure de fichiers organisée avec dossier static dédié
- **Modèle IA local** : Modèle Phi-3 mini pour assistance OSINT hors ligne

---

## Installation & Utilisation

### Prérequis
- Python 3.7 ou supérieur
- pip (gestionnaire de paquets Python)
- wget (pour le téléchargement du modèle IA)
- Minimum 4 Go de RAM recommandé pour la fonctionnalité du chatbot IA

### Démarrage Rapide

1. **Cloner ou télécharger le dépôt** :
   ```bash
   git clone https://github.com/ThePinguin073/osint-hub.git
   cd osint-hub
   ```

2. **Exécuter l'installateur automatisé** :
   ```bash
   python installer.py
   ```
   
   L'installateur va automatiquement :
   - Créer un environnement virtuel
   - Installer toutes les dépendances requises (Flask, flask-cors, llama-cpp-python, etc.)
   - Télécharger le modèle IA (~2.4 Go) pour le chatbot OSINT
   - Configurer l'environnement complet

3. **Activer l'environnement virtuel** :
   ```bash
   # Linux/macOS
   source ./venv/bin/activate
   
   # Windows
   venv\Scripts\activate.bat
   ```

4. **Lancer l'application** :
   ```bash
   python app.py
   ```
   
   Le serveur trouvera automatiquement un port disponible entre 8000-9000 et affichera :
   ```
   * Running on http://127.0.0.1:XXXX
   ```

5. **Accéder à la plateforme** :
   - Ouvrir votre navigateur
   - Naviguer vers l'URL affichée dans le terminal
   - Accepter l'avertissement légal pour continuer
   - Explorer les outils OSINT, les ressources de Sécurité Offensive, et essayer le chatbot IA (BETA)

### Notes
- **Performance du Chatbot IA** : Les performances du chatbot dépendent des spécifications de votre système. Pour une expérience optimale, un processeur multi-cœur moderne et au moins 8 Go de RAM sont recommandés.
- **Premier Lancement** : La première fois que vous utilisez le chatbot, il peut prendre un moment pour charger le modèle IA en mémoire.
- **Connexion Internet** : Requise pour l'installation initiale et les mises à jour de la base de données d'outils.

---

## Catégories d'Outils

### Hub OSINT
- 🔍 Reconnaissance & OSINT
- 🏷️ Noms d'utilisateur
- 👥 Réseaux Sociaux
- ✉️ Adresses Email
- 📱 Numéros de Téléphone
- 🕸️ Domaines & URLs
- 🌐 Adresses IP
- 🧭 Géolocalisation & Cartes
- 🖼️ Images & Recherche Visuelle
- 🏢 Entreprises & Business
- 🧅 Outils Darknet
- 🧾 Fuites de Données
- ₿ Cryptomonnaies
- 📰 Actualités & Médias
- 🔧 Logiciels Utiles
- 🗂️ Frameworks OSINT

### Hub Sécurité Offensive
- 🔍 Reconnaissance
- 📡 Scan & Énumération
- 💥 Exploitation
- 🕷️ Post-Exploitation
- 🌐 Tests d'Applications Web
- 📶 Sécurité Sans Fil
- 👥 Ingénierie Sociale
- 🔐 Attaques par Mot de Passe
- 🔬 Forensique Numérique
- 🌍 Analyse Réseau
- 📱 Sécurité Mobile
- ⚙️ Rétro-Ingénierie
- 🛡️ Outils de Développement de Malware
- 🗂️ Frameworks & Distributions

---

## Avertissement Légal

**IMPORTANT** : Cette plateforme agrège des outils qui peuvent être utilisés à la fois pour la recherche en sécurité légitime et à des fins malveillantes. Les utilisateurs sont **entièrement responsables** de :

- La conformité aux lois locales, nationales et internationales
- L'obtention d'une autorisation appropriée avant de tester des systèmes
- L'utilisation éthique de tous les outils et techniques
- La compréhension des implications légales dans leur juridiction

Les créateurs et contributeurs n'assument **aucune responsabilité** pour l'usage abusif de cette plateforme ou des outils qu'elle référence. Ceci est fourni uniquement à des fins éducatives et de tests de sécurité autorisés.

---

## Feuille de Route

### En Développement Actif

La plateforme s'étend continuellement au-delà de ses hubs OSINT et Sécurité Offensive actuels. Les outils et fonctionnalités à venir incluent :

#### Développement Actif
- **🗺️ Outil OMF** : Intégration du Framework de Méthodologie OSINT pour des processus de recherche guidés et des workflows de meilleures pratiques ([GitHub](https://github.com/thepinguin073/OMF))
- **🤖 Améliorations du Chatbot IA** : Optimisation des performances et base de connaissances élargie

#### À Venir
- **📄 Générateur de Rapports** : Création automatisée de rapports d'enquête OSINT avec modèles personnalisables et formats d'export
- **📊 Tableau de Bord Analytics** : Statistiques d'utilisation et métriques de popularité des outils
- **🔗 Intégration API** : Intégrations d'outils directes pour workflows rationalisés et automatisation

#### En Considération
- **Hub Offsec Amélioré** : Frameworks d'exploitation supplémentaires, outils post-exploitation et scripts d'automatisation
- **Fonctionnalités Collaboratives** : Espaces de travail d'enquête multi-utilisateurs
- **Synchronisation Cloud** : Sauvegarde cloud optionnelle pour les données d'enquête

Le menu de navigation affiche le statut actuel de chaque section, facilitant le suivi des outils en ligne, en développement ou prévus pour de futures versions. Revenez régulièrement pour les mises à jour !

---

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le dépôt
2. Créer une branche de fonctionnalité (`git checkout -b feature/VotreFonctionnalité`)
3. Faire vos modifications
4. Tester minutieusement
5. Soumettre une pull request

### Idées de Contribution
- Ajouter de nouveaux outils à la base de données
- Traduire vers d'autres langues
- Corriger des bugs ou améliorer la documentation
- Ajouter de nouvelles catégories ou fonctionnalités
- Suggérer de nouveaux hubs ou sections
- Améliorer les réponses et l'entraînement du chatbot IA
- Contribuer au développement d'OMF

---

## Remerciements

Ce projet s'appuie sur le travail d'innombrables praticiens OSINT, chercheurs en sécurité et développeurs open-source. Remerciements spéciaux à :

- La communauté OSINT pour le développement d'outils et le partage de connaissances
- Les chercheurs en sécurité faisant progresser les techniques de sécurité offensive de manière éthique
- Les contributeurs open-source dont les outils sont présentés ici
- Des projets comme Kali Linux, OWASP et MITRE ATT&CK pour l'inspiration de framework
- Microsoft pour le modèle Phi-3
- Le projet llama.cpp pour l'inférence LLM locale efficace

---

## Licence

Ce projet est sous licence Apache 2.0. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## Support & Contact

- **Issues** : Signaler les bugs via [GitHub Issues](https://github.com/ThePinguin073/osint-hub/issues)
- **OSINT-Hub** : [https://github.com/thepinguin073/osint-hub](https://github.com/thepinguin073/osint-hub)
- **Projet OMF** : [https://github.com/thepinguin073/OMF](https://github.com/thepinguin073/OMF)
- **Créateur** : ThePinguin073
- **Projet Connexe** : [Cryptex](https://cryptexhq.github.io/)

---

**Rappel** : De grands outils impliquent de grandes responsabilités. Opérez toujours légalement, éthiquement et avec une autorisation appropriée.

Bonne chasse (éthique) ! 🔍🛡️