//Quelques constantes
var a = 160;
var b = 100;
var c = 280;
var d = 355;
var e = 20;
var l = 1000;

//Définition des CE
bati = new Classe_Equivalence();
moteur = new Classe_Equivalence();
bielle = new Classe_Equivalence();
vantail = new Classe_Equivalence();


//Ajout des classes dans le dessin
schema.ajouteClasse(bati);
schema.ajouteClasse(moteur);
schema.ajouteClasse(bielle);
schema.ajouteClasse(vantail);


// Points du schéma
posO = {x:0,y:0}
posA = {x:0, y:a, uniteSI:false};
posB = {x:c, y:0, contexte:moteur, uniteSI:false};
posC = {x:d, y:e, contexte:vantail, uniteSI:false};
posD = {x:b, y:0, uniteSI:false};
posQ = {x:l, y:0, contexte:vantail, uniteSI:false};

//Options des CE
bati.bloque(true);
bati.couleur("#AAAA00");
moteur.changePosition(posA)
moteur.rotation = 15;
moteur.couleur("#FF0000");
bielle.changePosition(posB);
bielle.rotation = -49
bielle.couleur("#0000FF");
vantail.changePosition(posD);
vantail.couleur("#00AA00");

//dessins des lignes
bati.dessineLigne(posO,posA);
bati.dessineLigne(posO,posD);
moteur.dessineLigne(posA,posB);
bielle.dessineLigne(posB,posC);
vantail.dessineLigne(posD,posQ);
vantail.dessineLigne({x:d,y:0,contexte:vantail,uniteSI:false},posC);

//Liaisons (à faire en dernier pour les pb de décallage d'origine)
LIAISON1 = ajouteLiaison(0,1,"pivot",posA)
LIAISON1.L1.pilotee(true); // OU L2, c'est pareil
aM = -2.1 // Amplitude angle moteur (en rad)
T=10 // Periode
LIAISON1.L1.consignesCinematiques(1,"creneau(t%T,0,3)*aM/3*(t%T)+creneau(t%T,3,5)*aM-creneau(t%T,5,8)*aM/3*(t%T-8)")
LIAISON1.L1.rotation=-90
LIAISON2 = ajouteLiaison(0,3,"pivot",posD);
LIAISON3 = ajouteLiaison(2,3,"pivot",posC);
LIAISON3.L2.rotation=-90
LIAISON4 = ajouteLiaison(1,2,"pivot",posB);

//images
bati.ajouteImage("domoticc/bati.png",-276,-415,0,1.58);
moteur.ajouteImage("domoticc/bras.png",-42,-42,0,0.23);
bielle.ajouteImage("domoticc/bielle.png",-19,-19,0,0.3);
vantail.ajouteImage("domoticc/vantail.png",-27,-26,0,0.72);


//Points
O = new Point("O");
A = new Point("A");
B = new Point("B");
C = new Point("C");
D = new Point("D");
Q = new Point("Q");

bati.ajoutePoint(O,posO);
bati.ajoutePoint(A,posA);
bati.ajoutePoint(D,posD);
moteur.ajoutePoint(B,posB);
vantail.ajoutePoint(C,posC);
vantail.ajoutePoint(Q,posQ);

// Affichage de départ
SCHEMA.scaleX=0.4;
SCHEMA.scaleY=0.4;
SCHEMA.x=100;
SCHEMA.y=200;
