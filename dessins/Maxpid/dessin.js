// Constantes  en mm
a = 70*2 ;
b = 80*2 ;
c = 80*2 ;
d = -50;

//On crée les classe d'équivalence
bati = new Classe_Equivalence();
moteur = new Classe_Equivalence();
ecrou = new Classe_Equivalence();
bras = new Classe_Equivalence();



//On bloque le bati
bati.bloque(true);


//Ajout des classes
schema.ajouteClasse(moteur);
schema.ajouteClasse(ecrou);
schema.ajouteClasse(bras);
schema.ajouteClasse(bati);
	

//Coordonnées
posO = {x:0,y:0} // Position par rapport au schéma, avec les unités du dessin (y vers le haut)
posA = {x:a, y:0, uniteSI:false}
posB = {x:0, y:-b, uniteSI:false}
posC = {x:c, y:0, contexte:bras, uniteSI:false}
posCbis = {x:d, y:0, contexte:ecrou, uniteSI:false}
	

moteur.changePosition(posB);
bras.changePosition(posA);
bras.rotation=-90;
ecrou.changePosition(posC);
	ecrou.rotation=0;


//dessin
bati.dessineLigne(posO,posA);
bati.dessineLigne(posO,posB);
bras.dessineLigne(posA,posC);
moteur.dessineLigne(posB,{x:400,y:0,contexte:moteur,uniteSI:false});
ecrou.dessineLigne({x:d,y:30,contexte:ecrou,uniteSI:false}, {x:0,y:30,contexte:ecrou, uniteSI:false})




//Points

//Liaisons
LIAISON1 = ajouteLiaison(bati,moteur,"pivot",posB)
	LIAISON1.L1.rotation=90;
LIAISON2 = ajouteLiaison(moteur,ecrou,"glissiere",posCbis)
	LIAISON2.L1.kRot(10000);
	LIAISON2.L2.kRot(10000);
LIAISON3 = ajouteLiaison(ecrou,bras,"pivot",posC)
	LIAISON3.L1.rotation = 90;
	LIAISON3.L2.rotation = 180;
LIAISON4 = ajouteLiaison(bati,bras,"pivot",posA)
	LIAISON4.L2.pilotee(true); // OU L2, c'est pareil
	aB = -Math.PI/2 // Amplitude angle bras (en rad)
	T=14 // Periode
	LIAISON4.L2.consignesCinematiques(1,"creneau(t%T,0,4)*aB/4*(t%T)+creneau(t%T,4,7)*aB-creneau(t%T,7,11)*aB/4*(t%T-11)")



// Photos
bati.ajouteImage("Maxpid/bati.png",-30.5,-190,0,0.445);
	bati.children[0].alpha=0.2
bras.ajouteImage("Maxpid/bras.png",-38.5,-87.5,0,0.5192);
	bras.children[0].alpha=0.2
moteur.ajouteImage("Maxpid/moteur.png",-235,-49,0,0.43);
	moteur.children[0].alpha=0.2
ecrou.ajouteImage("Maxpid/ecrou.png",-35,-42.5,0,0.3);
	ecrou.children[0].alpha=0.2
		
SCHEMA.scaleX = 0.65
SCHEMA.scaleY = SCHEMA.scaleX;
SCHEMA.x = 204 ;
SCHEMA.y = 446 ;
		
schema.sauvePositions();	//On sauvegarde les positions initiales
