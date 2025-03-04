// 1. Définition de la classe Vecteur2D
class Vecteur2D {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

}

// 2. Instanciation de deux vecteurs
const v1 = new Vecteur2D();
const v2 = new Vecteur2D(1, 2);

console.log(v1); // Vecteur2D { x: 0, y: 0 }
console.log(v2); // Vecteur2D { x: 1, y: 2 }

// 3. Ajout des méthodes (afficher et additionner)
Vecteur2D.prototype.afficher = function() {
    return `(${this.x}, ${this.y})`;
}

Vecteur2D.prototype.additionner = function(vecteur) {
    return new Vecteur2D(this.x + vecteur.x, this.y + vecteur.y);
}


// 4. Test des méthodes
const v3 = new Vecteur2D(3, 4);
const v4 = new Vecteur2D(1, 2);

console.log(v3.afficher()); // (3, 4)
console.log(v4.afficher()); // (1, 2)

console.log(v3.additionner(v4).afficher()); // (4, 6)
console.log(v4.additionner(v3).afficher()); // (4, 6)



// 5. Classe Réctangle : 
class Rectangle {
    constructor(longueur=0, largeur=0, nom="Rectangle") {
        this.longueur = longueur;
        this.largeur = largeur;
    }

    afficher() {
        return `Longueur: ${this.longueur}, Largeur: ${this.largeur}`;
    }

    surface() {
        return this.longueur * this.largeur;
    }
}

// 6. Classe Carre héritant de Rectangle
class Carre extends Rectangle {
    constructor(cote=0) {
        super(cote, cote, "Carré");
    }
}

const r1 = new Rectangle(5, 3);
const c1 = new Carre(4);

console.log(r1.afficher()); // Longueur: 5, Largeur: 3
console.log(r1.surface()); // 15


// 7. Classe Point
class Point {
    constructor(x=0.0, y=0.0){
        this.x = x;
        this.y = y;
    }
}

// 8. classe Segment
class Segment {
    constructor(xOrig = 0.0, yOrig = 0.0, xExtrem = 0.0, yExtrem = 0.0) {
        this.orig = new Point(xOrig, yOrig);
        this.extrem = new Point(xExtrem, yExtrem);
    }
}

const point1 = new Point();           // Point par défaut (0, 0)
const point2 = new Point(2.5, 3.7);   // Point spécifique

const segment1 = new Segment();       // Segment par défaut ((0,0) à (0,0))
const segment2 = new Segment(1, 2, 4, 5); // Segment de (1,2) à (4,5)

// Tests
console.log("Point 1 :", point1);
console.log("Point 2 :", point2);
console.log("Segment 1 :", segment1);
console.log("Segment 2 :", segment2);