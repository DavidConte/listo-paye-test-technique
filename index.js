// Test technique suite aux entretiens avec Listo Paye

function isInclusDansPeriode(periodeAbsence) {
    
    // Vérification de la conformité du paramètre periodeAbsence
    if (typeof periodeAbsence !== "object" || typeof periodeAbsence === "undefined") {
        throw new Error("Parameter should be an object");
    }
    else {
        if (typeof periodeAbsence.dateDebut === "undefined") {
            throw new Error("Parameter should have a dateDebut attribute");
        }
        if (typeof periodeAbsence.dateFin === "undefined") {
            throw new Error("Parameter should have a dateFin attribute");
        }
        if (Object.prototype.toString.call(periodeAbsence.dateDebut) !== "[object Date]") {
            throw new Error("Parameter\'s dateDebut attribute should be a Date");
        }
        if (Object.prototype.toString.call(periodeAbsence.dateFin) !== "[object Date]") {
            throw new Error("Parameter\'s dateFin attribute should be a Date");
        }
    }


    // La période mensuelle commence le 1er jour (minuit inclus) et finit le dernier jour (minuit exclus) du mois en cours
    let currentDate = new Date();
    let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let lastDay =  new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    lastDay.setSeconds(-1);

    let periodeMensuelle = {
        dateDebut: firstDay,
        dateFin: lastDay
    };

    let result;

    // Si la période d'absence se situe entièrement avant ou après le mois en cours
    if ((periodeAbsence.dateDebut < periodeMensuelle.dateDebut && periodeAbsence.dateFin < periodeMensuelle.dateDebut)
        || (periodeAbsence.dateDebut > periodeMensuelle && periodeAbsence.dateFin > periodeMensuelle.dateFin)) {
        return false;
        }
    
    // Si la période d'absence commence dans le mois en cours
    if (periodeAbsence.dateDebut >= periodeMensuelle.dateDebut && periodeAbsence.dateFin <= periodeMensuelle.dateFin) {
        return true;
        }
    
    // Si la période d'absence se termine dans le mois en cours
    if ((periodeAbsence.dateDebut >= periodeMensuelle.dateDebut && periodeAbsence.dateDebut <= periodeMensuelle.dateFin)
        ||(periodeAbsence.dateFin >= periodeMensuelle.dateDebut && periodeAbsence.dateFin <= periodeMensuelle.dateFin)) {
        return true;
        }
}