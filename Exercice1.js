// 1. Fonction constructeur Voiture
function Voiture(model, marque, annee, type, carburant){
    this.model = model;
    this.marque = marque;
    this.annee = annee;
    this.type = type;
    this.carburant = carburant;
}

// 2. Création d'une liste de voitures
let listeVoitures = [
    new Voiture("A3", "Audi", 2019, "Berline", "Essence"),
    new Voiture("Fiesta", "Ford", 2021, "Compacte", "Diesel"),
    new Voiture("Tucson", "Hyundai", 2022, "SUV", "Hybride"),
    new Voiture("206", "Peugeot", 2015, "Citadine", "Essence")
];

// 3. Implémentation de l'héritage

// Classe Hyundai
function Hyundai(model, annee, type, carburant, serie, hybride) {
    Voiture.call(this, model, "Hyundai", annee, type, carburant);
    this.serie = serie;
    this.hybride = hybride;
}

Hyundai.prototype = Object.create(Voiture.prototype);
Hyundai.prototype.constructor = Hyundai;

Hyundai.prototype.alarmer = function() {
    return `Alerte ! La Hyundai ${this.model} ${this.serie} est en marche !`;
};

// Classe Ford
function Ford(model, annee, type, carburant, options) {
    Voiture.call(this, model, "Ford", annee, type, carburant);
    this.options = options;
}

Ford.prototype = Object.create(Voiture.prototype);
Ford.prototype.constructor = Ford;

// Ajout d'exemples avec les classes dérivées
listeVoitures.push(
    new Hyundai("Ioniq", 2023, "Berline", "Electrique", "5", true),
    new Ford("Focus", 2020, "Compacte", "Essence", ["GPS", "Toit ouvrant"])
);


// 4. Trier et afficher les voitures par ordre croissant des années
listeVoitures.sort((a, b) => a.annee - b.annee);

console.log("Liste des voitures triées par année :");
listeVoitures.forEach((voiture, index) => {
    console.log(`${index + 1}. ${voiture.marque} ${voiture.model} - ${voiture.annee}`);
    if (voiture instanceof Hyundai) {
        console.log(`   Série: ${voiture.serie}, Hybride: ${voiture.hybride}`);
        console.log(`   ${voiture.alarmer()}`);
    }
    if (voiture instanceof Ford) {
        console.log(`   Options: ${voiture.options.join(", ")}`);
    }
    console.log("---");
});