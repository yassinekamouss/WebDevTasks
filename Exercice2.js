// 1. Création des objets natifs Etudiant et Professeur
function Etudiant(nom, prenom, age, cne) {
    this.nom = nom;
    this.prenom = prenom;
    this.age = age;
    this.cne = cne;
}

function Professeur(nom, age, cin) {
    this.nom = nom;
    this.age = age;
    this.cin = cin;
}

// 2. Ajout des méthodes étudier() et enseigner()
Etudiant.prototype.etudier = function() {
    return `${this.prenom} ${this.nom} est en train d'étudier.`;
};

Professeur.prototype.enseigner = function() {
    return `Prof. ${this.nom} est en train d'enseigner.`;
};

// Création de quelques instances pour tester
const etudiants = [
    new Etudiant("kamouss", "yassine", 22, "CNE123456"),
    new Etudiant("Zidane", "Ahmed", 20, "CNE789012"),
];

const professeurs = [
    new Professeur("Mohamed", 45, "CIN123ABC"),
    new Professeur("Hassan", 52, "CIN456DEF")
];

// 3. Fonction pour trier les étudiants par ordre alphabétique (nom et prénom)
function trierEtudiants(etudiants) {
    return etudiants.sort((a, b) => {
        // Compare d'abord les noms
        const compareNom = a.nom.localeCompare(b.nom);
        
        // Si les noms sont identiques, compare les prénoms
        if (compareNom === 0) {
            return a.prenom.localeCompare(b.prenom);
        }
        
        return compareNom;
    });
}

// Test du tri alphabétique
const etudiantsTries = trierEtudiants(etudiants);
console.log("Étudiants triés par ordre alphabétique :");
etudiantsTries.forEach(etudiant => {
    console.log(`${etudiant.nom} ${etudiant.prenom}, ${etudiant.age} ans, CNE: ${etudiant.cne}`);
});

// Test des méthodes
console.log("\nTests des méthodes :");
console.log(etudiants[0].etudier());
console.log(professeurs[0].enseigner());