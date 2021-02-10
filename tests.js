// Les tests sont écrits avec le mois de Février comme Période Mensuelle courante

var periodeMensuelle = {
    dateDebut: new Date('2021-02-01T00:00:00'),
    dateFin: new Date('2021-02-28T23:59:59')
}
QUnit.test('Période d\'absence incluse', function(assert) {
    let periodeAbsence = {
        dateDebut: new Date('2021-02-05T00:00:00'),
        dateFin: new Date('2021-02-10T15:15:40')
    };
    assert.equal(isInclusDansPeriode(periodeAbsence), true, 'Absence du 5 au 10 Février, doit être prise en compte pour le calcul de paie de Février');
});

QUnit.test('Période d\'absence exclue', function(assert) {
    let periodeAbsence = {
        dateDebut: new Date('2021-01-01T00:00:00'),
        dateFin: new Date('2021-01-10T15:15:40')
    };
    assert.equal(isInclusDansPeriode(periodeAbsence), false, 'Absence du 1 au 10 Janvier, ne doit pas être prise en compte pour le calcul de la paie de Février');
});

QUnit.test('Période d\'absence commence incluse mais finit exclue', function(assert) {
    let periodeAbsence = {
        dateDebut: new Date('2021-02-10T00:00:00'),
        dateFin: new Date('2021-03-01T02:05:30')
    };
    assert.equal(isInclusDansPeriode(periodeAbsence), true, 'Absence commence en Février et finit en Mars, doit être prise en compte pour le calcul de paie de Février');
});

QUnit.test('Période d\'absence commence exclue mais finit incluse', function(assert) {
    let periodeAbsence = {
        dateDebut: new Date('2021-01-15T00:00:00'),
        dateFin: new Date('2021-02-10T15:15:40')
    };
    assert.equal(isInclusDansPeriode(periodeAbsence), true, 'Absence commence en Janvier et finit en Février, doit être prise en compte pour le calcul de paie de Février');
});

QUnit.test('Période d\'absence du mauvais type', function(assert) {
    assert.throws(function() {isInclusDansPeriode(12022020)}, new Error("Parameter should be an object"), "Exception thrown if parameter is a number");
    assert.throws(function() {isInclusDansPeriode("3 février 2020")} , new Error("Parameter should be an object"), "Exception thrown if parameter is a string");
});

QUnit.test('Période d\'absence non renseignée', function(assert) {
    assert.throws(function() {isInclusDansPeriode()}, new Error("Parameter should be an object"), "Exception thrown if parameter is missing");
})

QUnit.test('Période d\'absence sans attribut de date de début', function(assert) {
    assert.throws(function() {isInclusDansPeriode({dateFin: new Date('2021-02-05T15:10.30')})}, new Error("Parameter should have a dateDebut attribute"), "Exception thrown if parameter does not have a dateDebut attribute");
});

QUnit.test('Période d\'absence sans attribut de date de fin', function(assert) {
    assert.throws(function() {isInclusDansPeriode({dateDebut: new Date('2021-02-01T15:10.30')})}, new Error("Parameter should have a dateFin attribute"), "Exception thrown if parameter does not have a dateFin attribute");
});

QUnit.test('Période d\'absence avec attribut de date de début du mauvais type', function(assert) {
    assert.throws(function() {isInclusDansPeriode({dateDebut: 10022021, dateFin: new Date('2021-02-05T15:10.30')})}, new Error("Parameter\'s dateDebut attribute should be a Date"), "Exception thrown if parameter\'s dateDebut attribute is a number");
    assert.throws(function() {isInclusDansPeriode({dateDebut: '10 Février 2020', dateFin: new Date('2021-02-05T15:10.30')})}, new Error("Parameter\'s dateDebut attribute should be a Date"), "Exception thrown if parameter\'s dateDebut attribute is a string");
});

QUnit.test('Période d\'absence avec attribut de date de fin du mauvais type', function(assert) {
    assert.throws(function() {isInclusDansPeriode({dateDebut: new Date('2021-02-01T15:10.30'), dateFin: 05022021})}, new Error("Parameter\'s dateFin attribute should be a Date"), "Exception thrown if parameter\'s dateFin attribute is a number");
    assert.throws(function() {isInclusDansPeriode({dateDebut: new Date('2021-02-01T15:10.30'), dateFin: '5 Février 2021'})}, new Error("Parameter\'s dateFin attribute should be a Date"), "Exception thrown if parameter\'s dateFin attribute is a string");
});