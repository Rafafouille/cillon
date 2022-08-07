var a0 = 790	;
var b0 = 630	;
var b1 = 166	;
var a2 = 50	;
var a3 = 800	;
var b3 = 36	;
var b4 = 718	;



// CREATION DES CLASSES D'EQUIVALENCE ===========================
	bati = new Classe_Equivalence();	// Création de la classe
	roue = new Classe_Equivalence();	// Création de la classe
	pedale = new Classe_Equivalence();	// Création de la classe
	guidon = new Classe_Equivalence();	// Création de la classe
	
	SCHEMA.ajouteClasse(bati);		// Ajout au schéma
	SCHEMA.ajouteClasse(roue);		// Ajout au schéma
	SCHEMA.ajouteClasse(pedale);		// Ajout au schéma
	SCHEMA.ajouteClasse(guidon);		// Ajout au schéma
	
// POINTS ==================================================

	posO = {x:0, y:0} ;
	posA = {x:0, y:-b1, uniteSI:false} ;
	posB = {x:a3, y:-b3, contexte:pedale, uniteSI:false}
	posC = {x:a0, y:-b0, uniteSI:false};

	O = new Point("O")
	A = new Point("A")
	B = new Point("B")
	C = new Point("C")
	
	bati.ajoutePoint(O,posO);
	bati.ajoutePoint(C,posC);
	roue.ajoutePoint(A,posA);
	pedale.ajoutePoint(B,posB);

// BATI =================================

	// Cree la classe
		bati.nom("Bâti")	;			// Changement de nom
		
	// Dessine des lignes
		bati.dessineLigne(posO,{x:a0,y:0,uniteSI:false});
		bati.dessineLigne({x:a0,y:0,uniteSI:false},posC);
		
	// Photo
		bati.ajouteImage("velo_elliptique/classe0.png",-254.4,-969.9,0,1.59);
		
	// Réglages
		bati.couleur("#000000");			
		bati.bloque(true);			// On bloque (bati)
		bati.children[0].alpha=0.1


// ROUE =================================

	// Cree la classe
		roue.nom("Roue")	;			// Changement de nom
		
	// Dessine des lignes
		roue.dessineLigne(posO,posA);
		
	// Photo
		roue.ajouteImage("velo_elliptique/classe1.png",-129.9,-183.6,0,0.6);
		
	// Liaisons
		LIAISON1 = ajouteLiaison(0,1,"pivot",posO)
		LIAISON1.L1.pilotee(true); // OU L2, c'est pareil
		omega = 0.1*2*Math.PI; // Vitesse de rotation (0.1Hz)
		LIAISON1.L1.consignesCinematiques(1,"-omega*t")
		LIAISON1.L1.rotation -= 90 ;
		LIAISON1.L2.rotation -= 90 ;
		
	// Réglages
		roue.couleur("#5555FF");
		roue.children[0].alpha=0.1



// Shape + pedale ================================

	// Cree la classe
		pedale.nom("Pédale")	;		// Changement de nom
		pedale.changePosition(posA);//y = -b1 ;
		
	// Dessine des lignes
		pedale.dessineLigne(posA,{x:a3,y:0,contexte:pedale,uniteSI:false});
		pedale.dessineLigne({x:a3,y:0,contexte:pedale,uniteSI:false},posB);
		
	// Photo
		pedale.ajouteImage("velo_elliptique/classe23.png",-15.3,-49,0,0.508);
		
	// Liaisons
		LIAISON2 = ajouteLiaison(1,2,"pivot",posA)
		LIAISON2.L1.rotation -= 90 ;

	// Réglages
		pedale.couleur("#009900");
		pedale.children[0].alpha=0.2
		pedale.rotation = 21 ;

// Guidon =============================================

	// Cree la classe
		guidon.nom("Guidon")	;		// Changement de nom
		guidon.changePosition(posC) ;
		guidon.rotation = 2.4 ;
		
	// Dessine des lignes
		guidon.dessineLigne(posC,posB);
		guidon.dessineLigne(posC,{x:0,y:-500,contexte:guidon,uniteSI:false});
		//guidon.x = a0 ;
		//guidon.y = -b0 ;
		

	// Photo
		guidon.ajouteImage("velo_elliptique/classe4.png",-360,-480,-16,1.535);

	// Liaisons
		LIAISON4 = ajouteLiaison(0,3,"pivot",posC)
		LIAISON4.L1.rotation -= 90 ;
		
		LIAISON5 = ajouteLiaison(2,3,"pivot",posB);//{x:a0-b4*Math.sin(C3.rotation/180*Math.PI),y:-b0+b4*Math.cos(C3.rotation/180*Math.PI)})
		LIAISON5.L1.rotation -= 90 ;
		LIAISON5.L2.rotation -= 90 ;
		
	// Réglages
		guidon.couleur("#FFAA00");
		guidon.children[0].alpha=0.2
		


SCHEMA.scaleX = 0.3 ;
SCHEMA.scaleY = 0.3 ;
SCHEMA.x -= 100 ;
SCHEMA.y += 100 ;

