# Rapport sur l'Atelier 2 : JavaScript et Programmation Orientée Objet (POO)

## Introduction

Ce dépôt GitHub contient les solutions aux exercices de l'Atelier 2, conçu dans le cadre de l’apprentissage de la programmation orientée objet (POO) avec JavaScript. L’objectif principal est de se familiariser avec les concepts fondamentaux de la POO, tels que les classes, l’héritage, la composition, et la manipulation d’objets, tout en exploitant les fonctionnalités modernes d’ECMAScript 6 (ES6). Ce rapport détaille chaque exercice, explique les solutions implémentées, et offre une perspective pédagogique sur les concepts abordés.

Les exercices couvrent la création de classes, l’héritage, la surcharge, la manipulation de données via JSON, et la mise en œuvre d’un mini-blog orienté objet.

---

## Structure du Dépôt

Le dépôt est organisé comme suit :
- Exercice 1 : Gestion de classes pour des voitures avec héritage et tri.
- Exercice 2 : Objets natifs Étudiant et Professeur avec tri alphabétique.
- Exercice 3 : Classes géométriques (Vecteur2D, Rectangle, Carré, Point, Segment) en ES6.
- Exercice 4 : Mini-blog orienté objet avec conversion JSON.
- Fichiers associés : Fichiers JavaScript pour la logique, HTML/CSS pour l’affichage (si applicable).

---

## Analyse des Exercices

### 1. Exercice 1 : Gestion des Voitures avec Héritage

**Objectif** : Créer une classe Voiture et implémenter l’héritage avec Hyundai et Ford, puis trier les instances par année.

**Solution :**
1. Une fonction constructeur Voiture avec les attributs : model, marque, année, type, carburant.
2. Création d’une liste d’instances de Voiture.
3. Classes Hyundai (attributs : série, hybride ; méthode : alarmer()) et Ford (attribut : options) héritant de Voiture via extends.
4. Tri des voitures par année croissante avec sort().

**Explication Pédagogique :**
- Cet exercice introduit les bases de la POO : encapsulation (attributs) et héritage (sous-classes).
- Concept clé : La méthode sort() avec une fonction de comparaison ((a, b) => a.année - b.année) permet un tri efficace.

### 2. Exercice 2 : Étudiants et Professeurs

**Objectif :** Créer des objets Etudiant et Professeur, ajouter des méthodes, et trier les étudiants alphabétiquement.

**Solution :**
1. Objets Etudiant (attributs : nom, prenom, age, cne) et Professeur (attributs : nom, age, cin).
2. Méthodes : étudier() pour Etudiant, enseigner() pour Professeur.
3. Tri des étudiants par nom et prenom avec sort().

**Explication Pédagogique :**
- Cet exercice montre comment ajouter des comportements (méthodes) à des objets.
- Concept clé : Le tri multi-critères peut être réalisé avec une logique conditionnelle dans sort() (ex. : comparer nom puis prenom si nécessaire).

### 3. Exercice 3 : Classes Géométriques en ES6

**Objectif :** Définir des classes géométriques avec constructeurs, méthodes, et héritage en ES6

**Solution :**
1. Classe Vecteur2D :
    - Constructeur avec x=0, y=0 par défaut.
    - Méthodes : affichage et addition de vecteurs.
    - Test : instanciation et affichage de la somme.
2. Classe Rectangle :
    - Constructeur avec longueur, largeur par défaut, attribut nom="rectangle".
    - Méthodes : affichage et calcul de la surface.
3. Classe Carre :
    - Hérite de Rectangle, surcharge nom="carré".
4. Classe Point :
    - Constructeur avec x=0, y=0.
5. Classe Segment :
    - Composition avec deux instances de Point (orig et extrem).

**Explication Pédagogique :**
- Cet exercice utilise ES6 pour une syntaxe claire (classes, extends).
- Concept clé : La composition (Segment avec Point) illustre comment combiner des classes pour modéliser des relations complexes.

### 4. Exercice 4 : Mini-Blog Orienté Objet

**Objectif :** Implémenter un mini-blog avec gestion de posts et utilisateurs, en utilisant JSON pour le stockage.

**Solution :**
1. Classes : User (attributs : nom, etc.) et Post (attributs : titre, description, etc.).
2. Fonctionnalités : ajout de posts, liste des posts.
3. Stockage dans un tableau JSON avec conversion classe → JSON (JSON.stringify) et JSON → classe (constructeur personnalisé).
4. Interface simple pour afficher les posts.

**Explication Pédagogique :**
- Cet exercice combine POO et gestion de données persistantes via JSON.
- Concept clé : La sérialisation/désérialisation permet de sauvegarder et restaurer des objets.

**Captures d’écran :**
![capture d'écran]()
---

## Conclusion

Cet atelier a permis de maîtriser les piliers de la POO en JavaScript :
- **Encapsulation :** Attributs et méthodes dans des classes.
- **Héritage :** Réutilisation du code entre classes parentes et enfant.
- **Composition :** Construction d’objets complexes à partir d’autres objets.
- **ES6 :** Syntaxe moderne pour une meilleure lisibilité.

---

## Instructions pour l'exécution des exercices

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/yassinekamouss/WebDevTasks.git
