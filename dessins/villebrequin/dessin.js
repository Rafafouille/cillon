//On crée les classe d'équivalence
bati = new Classe_Equivalence();
manivelle  = new Classe_Equivalence();
bielle = new Classe_Equivalence();
piston = new Classe_Equivalence();

//Ajout des classes
SCHEMA.ajouteClasse(bati);
SCHEMA.ajouteClasse(manivelle);
SCHEMA.ajouteClasse(bielle);
SCHEMA.ajouteClasse(piston);


// Position
posO = {x:0,y:0};
posA = {x:0, y:-150, uniteSI:false};
posB = {x:500, y:0, uniteSI:false};
//posC = {x:750, y:0, uniteSI:false};
posC = {x:700, y:0, uniteSI:false};
posD = {x:1000, y:0, uniteSI:false};
//On change les coordonnées des classes
//C2.x = 50;
//C2.y = -150
//C3.x = 500

// Option des classes
bati.bloque(true);
bielle.changePosition(posA) ;
piston.changePosition(posB) ;

//dessin
manivelle.dessineLigne(posO,posA) ;
bielle.dessineLigne(posA, posB) ;
piston.dessineLigne(posB, {x:posC.x, y:posC.y+30, uniteSI:false})

//C3.dessineLigne(-50,0,-200,0,false);








//Liaisons
LIAISON1 = ajouteLiaison(bati,manivelle,"pivot",posO)
	LIAISON1.L1.pilotee(true); // OU L2, c'est pareil
	LIAISON1.L1.rotation=90
	LIAISON1.L1.consignesCinematiques(1,"0.5*t")
LIAISON2 = ajouteLiaison(manivelle,bielle,"pivot",posA);
	LIAISON2.L1.rotation=90;
	LIAISON2.L2.rotation=Math.atan2(posB.y-posA.y,posB.x-posA.x)*180/Math.PI;
LIAISON3 = ajouteLiaison(bielle,piston,"pivot",posB)
	LIAISON3.L1.rotation=Math.atan2(posB.y-posA.y,posB.x-posA.x)*180/Math.PI+180;
LIAISON4 = ajouteLiaison(bati,piston,"glissiere",posC)
/*	LIAISON4.L1.rotation+=90
	LIAISON4.L2.rotation+=90*/


SCHEMA.x = 200 ;
schema.sauvePositions();	//On sauvegarde les positions initiales
