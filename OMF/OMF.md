# OSINT Methodology Framework (OSM) :


## Objectif initial : 
Instauré une méthodologie et une rigueur épistémiologique, modulaire et adaptable à l'OSINT, afin de permettre une reproductibilité des enquêtes, une falsifiabilité des résultats ( Karl Popper ) ainsi que des protections contre les biais analytiques, les erreurs de jugements et contre la désinformation active.


## Structure initial : 
Le framework s'oriente autour du cycle du renseignement, qui s'articule en 5 phases : PLANNIFICATION, COLLECTE, CORRELATION, ANALYSE, REPORTING.
Chaque phase contient un ensemble de tactiques, de techiques, et parfois de sous-techniques relative à leur phase initiale

### Le framework intègre un principe de proportionnalité: 
La rigueur méthodologique n'est pas une fin en soi: elle doit être proportionnelle aux enjeux.
Le framework OSINT propose trois niveaux d'application :


	- Quick Investigation (80% des cas)
		**Quand l'utiliser** : Requêtes rapides, enjeux faibles, usage personnel
		**Temps estimé** : 30 minutes - 2 heures
		**Documentation** : Notes minimales
		**Exemple** : Vérifier la légitimité d'un site web avant un achat

		**Ce qui suffit** :
		- Validation basique des sources (2-3 sources convergentes)
		- Conscience des biais principaux (confirmation bias)
		- Notes structurées (qui/quoi/où/quand)

		**Ce qu'on peut sauter** :
		- Planning formalisé
		- OPSEC avancé
		- Chain of custody
		- Peer review

	- Standard Professional (15% des cas)
		**Quand l'utiliser** : Investigations sérieuses, usage professionnel
		**Temps estimé** : 8-40 heures
		**Documentation** : Rapport structuré
		**Exemple** : Due diligence pré-embauche, article journalistique local

		**Ce qui est nécessaire** :
		- Les 5 phases (version allégée)
		- ACH avec 3-4 hypothèses
		- Documentation reproductible
		- OPSEC adapté au contexte

		**Ce qu'on peut alléger** :
		- Planning détaillé (2-3 pages suffisent)
		- Chain of custody forensique
		- Red teaming formel

	- Full Rigor (5% des cas)
		**Quand l'utiliser** : Enquêtes majeures, usage judiciaire, attribution sensible
		**Temps estimé** : 40-200 heures
		**Documentation** : Complète et probatoire
		**Exemple** : Attribution d'APT, enquête judiciaire, investigation géopolitique

		**Ce qui est obligatoire** :
		- Framework COMPLET
		- Toutes les phases documentées exhaustivement
		- ACH exhaustif + validation par pairs
		- Chain of custody forensique
		- OPSEC maximal

		**Aucun raccourci permis.**


## Le cardre se base sur des principes scientifiques éprouvé: 

A. La falsifiabilité (Karl Popper)
Une enquête OSINT ne se conduit pas au fil des découvertes mais selon une structure préétablie. Chaque information doit servir à confirmer ou infirmer une hypothèse précise, jamais à nourrir des intuitions non vérifiées. La discipline intellectuelle prime sur l’intérêt d’une donnée : un fait marquant ne justifie aucune conclusion sans validation indépendante.

B. La reproductibilité
Un tiers qualifié doit pouvoir suivre le même protocole et obtenir des résultats comparables. Cette exigence impose une standardisation des techniques de collecte, de corrélation et d'analyse.

C. La traçabilité probatoire (Locard)
Dans l'esprit du principe de Locard ("tout contact laisse une trace"), chaque étape de l'investigation doit être documentée comme une chaîne de custody intellectuelle. Les métadonnées, horodatages, captures d'écran, et logs de requêtes constituent autant de preuves de l'intégrité du processus.

D. L'explicitation des incertitudes
Contrairement au mythe du renseignement omniscient, toute analyse comporte des zones d'ombre. La méthodologie doit intégrer des échelles de confiance explicites (inspired by les "estimative probabilities" de la communauté du renseignement US) et justifier le niveau de certitude accordé à chaque assertion.

E. Définition du scoping
Le scoping est un composant essentielle du modèle, car son oubli ou son omission peut mener à l'intrusion non-nécessaire dans la vie privé d'autrui ou de donner des résultats hors-sujet par rapport à l'objectif de l'enquête

### L'ANALYSIS LADDER : UN MODÈLE COGNITIF DE TRANSFORMATION

Le cœur de cette méthodologie réside dans l'Analysis Ladder, un framework de montée en abstraction contrôlée :
NIVEAU 5 : Insights 
           ↑ (Synthèse décisionnelle + degré de confiance)
NIVEAU 4 : Patterns 
           ↑ (detection des anomalies et hypothèse)
NIVEAU 3 : Contextual Data
           ↑ (Inférence causale, attribution d'intentions)
NIVEAU 2 : Identifiers
           ↑ (Reconnaissance de patterns, clustering)
NIVEAU 1 : Raw Data
           ↑ (Collecte factuelle brute)

Cette échelle impose une progression graduelle et explicite, où chaque niveau hérite de la rigueur du précédent. Elle prévient le piège classique de "l'intuition analytique" en obligeant à justifier chaque saut inférentiel.
Principe clé : On ne peut atteindre le niveau N+1 qu'en ayant solidement établi le niveau N. Toute tentative de court-circuiter cette hiérarchie doit être explicitement justifiée et documentée comme une prise de risque méthodologique.

### Utilisation du principe du "Devil's Advocate"
L'utilisation de principe du devil's advocate est essentiel pour obtenir une conclusion solide, le principe permet également de respecté le principe de Heuer.
Cependant, il est généralement plus facile de travailler en binôme (ou en équipe concurrante) sur une même enquête, car il est plus naturelle de tenté de réfuté les hypothèses des autres que ses propres hypothèses

### L'intégration du cycle du framework:

Le framework s'organise autour d'un cycle :
0. Définition de l'objectif de l'enquête 
	- Utilisation de la technique du Starbursting (Voir ci-dessous)

1. Préparation de l'enquête
	- Toutes bonnes enquêtes OSINT commence avec les bonnes questions, une enquête cherche à répondre à des questions, pas a collecté des données inutilement

2. Formulation d’une hypothèse probatoire

3. Collecte des données nécessaires à étayée l'hypothèse

4. Corrélation des données entres elles
	- L’acte de prendre du temps pour évaluer en profondeur les informations (ralentir) est bien plus crucial pour la qualité de l'analyse que la méthode ou le format spécifique utilisé pour le faire.
	- Toujours dans le cadre de la mise en contexte des informations recueillit afin de facilité leur analyse, il est essentiel de prendre en compte l’ensemble des aspects intellectuels et artistiques civilisationnel de la cible, car cela peut faire varier plusieurs hypothèse et indicateur par rapport à l’enquête

5. Analyse des données corrélées par rapport à l'hypthèse de base
	- Il est essentiel d'intégrer un concept fondamentale: "Ne supposez rien, doutez de tout"

6. Rapport d'enquête
	- Il est essentiel d’expliqué pourquoi une preuve en est une: Preuve --> Significations des preuves --> Conclusions

7. Feedback par rapport aux manquements, aux problèmes rencontrés ou à l'inverse aux découvertes techniques permettant d'améliorer les futurs enquêtes:
	- Apprendre des erreurs historiques: De nombreuses analyses se sont révélées erronées parce que les analystes se sont concentrés sur les données "standard" tout en négligeant des détails qui, rétrospectivement, étaient cruciaux.

Le cycle du framework suit une logique itérative de manière à intégré une boucle de rétroaction afin d'influer de manière positive sur les résultats des enquêtes suivantes, tout en prenant en compte les retours de feedback des enquêtes précédentes.
Cette logique permet une non-reproductibilitée des erreurs humaines ou techniques et ainsi maintenir le cadre épistémiologique tout en y intégrant les erreurs à venir 


### Utilisation de la statistique bayésienne, le syllogisme, la déduction et l'induction
Des techniques éprouvées, telles que la statistique bayésienne, le syllogisme, la déduction ou l'induction permettent d’inférer en cohérence avec l’objectif initial ou, à l’inverse, de réfuter une hypothèse.


### Utilisation de "l'Analysis of competing hypotheses" (ACH)
Les techniques cités précédemment, tel que le syllogisme, peuvent introduire des biais analytiques (exemple: Biais de surinterprétation)
L'utilisation de l'ACH permet leur détection ainsi que le cas échéant, leurs neutralisations


### Le principe de Heuer
L’analyste ne doit pas chercher à confirmer son hypothèse, mais à la réfuter activement.
Autrement dit : la force d’une hypothèse ne réside pas dans le nombre d’indices qui la soutiennent, mais dans la résistance qu’elle oppose à la contradiction.


### L'utilisation de la "chain of custody"
Afin de préservé la nature d'une preuve ainsi que son intégrité, l'utilisation d'une chain of custody peut-être nécessaire, cependant, ce principe doit réspecté le principe de proportionnalité


### L'analyse finale
Alors que l'enquête est achevée et que l'analyste (ou l'équipe) s'apprêtent à entré dans la phase de reporting, il est judicieux d'appliquer une dernière vérification afin de contrôler la cohérence globale des résultats de l'enquête.
Pour ce faire l'application du principe de Heuer ou du principe du devil's advocate peut grandement facilitée la tâche

### La technique du Starbursting:

Le Starbursting est une technique qui privilégie la génération de questions à se poser sur un problème plutôt que la production d'idées ou de solutions à celui-ci.

Pourquoi l'utiliser ? 

	• Élaborer une liste de questions auxquelles répondre lors des activités du projet, dès les premières
	étapes de la planification

	• Anticiper les questions sur un projet ou une idée existante, notamment celles
	qui pourraient surgir lors d'un compte rendu de situation à votre supérieur

	• Créer une liste de contrôle pour s'assurer que tous les aspects d'un projet ou d'un document ont été traités
	de manière exhaustive

Comment l'utiliser ? 

	1. Dessiner une étoile. Représentez une étoile à six branches sur un tableau blanc ou un paperboard. Inscrivez ensuite « Qui ? », « Quoi ? », « Pourquoi ? », « Quand ? », « Où ? » et « Comment ? » à chaque branche. Inscrivez une phrase représentant le sujet de discussion au centre de l'étoile.

	2. Générer des questions. Examinez systématiquement chacun des six points et réfléchissez aux questions possibles sur le sujet en commençant par le mot interrogatif correspondant.
	Passez ensuite au point suivant. N'allez pas trop vite, car les questions les plus originales surgissent généralement seulement après avoir posé toutes les questions évidentes.
	Évitez également l'écueil courant de répondre aux questions au fur et à mesure qu'elles vous viennent à l'esprit.

	3. Catégorisez, organisez et hiérarchisez. Structurez vos questions une fois que vous avez terminé de les générer.

	4. Élaborez un plan d'action. Discutez ou répondez à toute question à laquelle vous pouvez facilement ou rapidement répondre.
	Travaillez les questions restantes une par une et élaborez un plan d'action pour chacune. Vous répondrez à certaines d'entre elles directement grâce à une recherche rapide, par exemple sur Internet ou en consultant l'expert compétent. D'autres questions peuvent prendre du temps à résoudre, mais vous pouvez les utiliser pour élaborer un plan de projet ou une structure pour votre tâche.

Avantages de la méthode Starbursting :

	• Elle favorise une réflexion approfondie sur un large éventail de facteurs influençant un projet ou un problème.

	• Elle offre une structure utile pour une séance de brainstorming.

	• Elle est simple à utiliser, car il est généralement plus facile de formuler des questions que des réponses. C’est particulièrement vrai en début de projet.

	• Elle est accessible à tous, quel que soit leur niveau d’expérience dans le domaine.


## La taxonomie:

Comme cité ci-dessus, le framework s'organise autour de phases, divisé en tactiques (le pourquoi ?), elles-mêmes divisé en techniques (le comment ?), qui peuvent être redivisé en sous-techniques (Les détails, semblables à des appendices relatif à la techniques qui appuyent )

### Les tactiques:
1. Chaques tactiques se rapporte à la phases dans laquelle il est hébergé (Exemple: Formulations des hypothèses --> Plannification)
2. Chaques tactiques se rapporte à un aspect clé fondamentale relatif au domaine du renseignement a laquelle elle fait partie (GEOINT, HUMINT, OPSEC, SOCMINT, SAT (Structured Analytic Techniques), etc) 
3. Chaques tactiques suit, dans une moindre mesure, un flux de travail séquentiel par rapport à la tactique précédente et influant directement sur la tactique suivante
	Exemple:
		A. Définition de l'objectif
		B. Définition du Scope
		C. Mise en place d'une méthodologie reproductible
		D. Définition des procédures nécéssaire au maintient de la sécurité opérationnelle (OPSEC)
		E. Sélection des outils 

		Dans cet exemple, les étapes se font dans l'ordre alphabétique, toujours en respectant le principe de proportionnalité

4. Chaques tactiques possèdent un indicateur de proportionnalité, facilitant l'utilisation de ce même principe
5. Chaques tactiques peut comporter une ou plusieurs techniques


### Les techniques:
1. Chaque technique permet à l’analyste d’exécuter une tâche adaptée au contexte, en fournissant des outils et méthodes qui facilitent l’atteinte de son objectif: 
	- Une description de la technique
	- L'objectif qu'elle permet d'accomplir 
	- Un exemple d'utilisation
	- Si applicable, une stratégie OPSEC permettant la mitigation d'un acteur malveillant utilisant cette techniques contre nous
	- Si applicable, le ou les outils reconnu et considéré comme étant une référence pour la tâche en cours
	- Si applicable, une ou plusieurs sous-techniques permettant de clarifié la techniques ou de choisir entre plusieurs stratégies différente d'application de la technique, en fonction du choix de l'analyste ainsi que du contexte dans lequel il se trouve


### Les sous-techniques: 
1. Chaques sous-techniques permet:
		- une approche différente de la situation dans laquelle l'analyste peut se trouver, permettant ainsi de modifier sa stratégie globale
		- Une clarifiaction par rapport à certains détails de la techniques, mais nécéssitant d'avantage d'explication

2. Chaques sous-techniques comportent plusieurs éléments: 
		- Une description
		- Un exemple
		- Si applicable, une stratégie de corrélation / analyse 

**Chaques taxons possède un ID permettant son identification immédiate, et facilitant la reproductibilité de l'investigation**


### L'ajout de nouveau taxons (tactiques, techniques, sous-techniques):
L’ajout de nouveaux taxons au sein du modèle permet une évolution communautaire du framework, favorise le partage de connaissances et renforce les compétences de l’ensemble des membres.
Toutefois, pour qu'un nouveau taxon soit admis au sein du modèle, il doit satisfaire à un certains nombres de critères:

- Le taxon doit respecter le cardre épistémiologique du framework, ce qui implique la mise en place d'une période probatoire de 6 mois durant laquelle la techniques devra être, dans une moindre mesure, mise à l'épreuve, permettant la falsifiabilité de la techniques ainsi que sa reproductibilitée 

- Le taxon devra respecté les critères imposé par son niveau (tactiques, techniques, sous-techniques) défini ci-dessus

- Afin de préservé le sérieux du framework, le taxon devra déjà avoir été testé par au moins deux entitées différentes et indépendante l'une de l'autre


**Le but de ce framework est de définir un cadre méthodologique communautaire au sein de l’OSINT, et non de reposer sur une entité centralisée décidant de ce qui doit ou ne doit pas être fait.**


## La lutte contre la désinformation:

### PRISMA
L'utilisation de la liste de contrôle PRISMA est susceptible d'améliorer la qualité de la phase d'analyse de l'enquête, car permet davantage de transparence dans le processus

### L'application des principes et des conceptes utilisé en zététique
La zététique, ou l'étude rationnelle des phénomènes présentés comme paranormaux, des pseudosciences et des thérapies étranges intègre plusieurs facteurs pouvant être appliqué à la lutte contre la désinformation:

- La démystification
- Le développement de la culture scientifique
- L'utilisation de la pensée critique

Pour plus d'information, voir la page wikipédia sur la zététique: https://fr.wikipedia.org/wiki/Z%C3%A9t%C3%A9tique


# Note sur l'éthique:

Le cadre permet une standardisation de la méthodologie utilisé dans l'OSINT de différents concepts utilisés dans différents domaines differnets, ce qui permet d'améliorer grandement la qualité de son travail, cepandant, l'éthique est centrale au sein de ce framework, chaques taxons ainsi que chaques enquêtes nécéssite **le respect des normes et lois en vigeurs en fonction de votre juridiction, ainsi que le respect de la vie privée**

En effet, non-respect de ces dernières, en plus d'être potentiellement illégales, est aussi infructieux, menant à des pertes de temps où à des résultats hors-sujet.


**Un grand pouvoir implique de grande responsabilitées ! **