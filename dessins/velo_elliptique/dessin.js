var a0 = 790	;
var b0 = 630	;
var b1 = 166	;
var a2 = 50	;
var a3 = 800	;
var b3 = 36	;
var b4 = 718	;





// BATI =================================

	// Cree la classe
		C0 = new Classe_Equivalence();	// Création de la classe
		C0.nom("Bâti")	;			// Changement de nom
		schema.ajouteClasse(C0);		// Ajout au schéma
		
	// Dessine des lignes
		C0.dessineLigne(0,0,a0,0);
		C0.dessineLigne(a0,0,a0,b0);
		/*C0.schema.addChild(new Point(0,0));
		C0.schema.addChild(new Point(a0,b0));*/
		
	// Photo
		C0.ajouteImage("velo_elliptique/classe0.png",-254.4,-969.9,0,1.59);
		
	// Réglages
		C0.couleur("#000000");			
		C0.bloque(true);			// On bloque (bati)
		C0.children[0].alpha=0.1





// ROUE =================================

	// Cree la classe
		C1 = new Classe_Equivalence();	// Création de la classe
		C1.nom("Roue")	;			// Changement de nom
		schema.ajouteClasse(C1);		// Ajout au schéma
		
	// Dessine des lignes
		C1.dessineLigne(0,0,0,b1);
		/*C1.schema.addChild(new Point(0,b1));*/
		
	// Photo
		C1.ajouteImage("velo_elliptique/classe1.png",-129.9,-183.6,0,0.6);
		
	// Liaisons
		LIAISON1 = ajouteLiaison(0,1,"pivot",{x:0,y:0})
		LIAISON1.L1.pilotee(true); // OU L2, c'est pareil
		LIAISON1.L1.rotation -= 90 ;
		LIAISON1.L2.rotation -= 90 ;
		
	// Réglages
		C1.couleur("#5555FF");
		C1.children[0].alpha=0.1



// Shape + pedale ================================

	// Cree la classe
		C2 = new Classe_Equivalence();	// Création de la classe
		C2.nom("Pédale")	;		// Changement de nom
		schema.ajouteClasse(C2);		// Ajout au schéma
		
	// Dessine des lignes
		C2.dessineLigne(0,0,a3,0);
		C2.dessineLigne(a3,0,a3,b3);
		
	// Photo
		C2.ajouteImage("velo_elliptique/classe23.png",-15.3,-49,0,0.508);
		C2.y = -b1 ;
		
	// Liaisons
		LIAISON2 = ajouteLiaison(1,2,"pivot",{x:0,y:-b1})
		LIAISON2.L1.rotation -= 90 ;

	// Réglages
		C2.couleur("#009900");
		C2.children[0].alpha=0.2
		C2.rotation = 21 ;

// Guidon =============================================

	// Cree la classe
		C3 = new Classe_Equivalence();	// Création de la classe
		C3.nom("Guidon")	;		// Changement de nom
		schema.ajouteClasse(C3);		// Ajout au schéma
		
	// Dessine des lignes
		C3.dessineLigne(0,0,0,0);
		C3.dessineLigne(0,0,0,-b4);
		C3.x = a0 ;
		C3.y = -b0 ;
		
		C3.rotation = 2.4 ;

	// Photo
		C3.ajouteImage("velo_elliptique/classe4.png",-360,-480,-16,1.535);

	// Liaisons
		LIAISON4 = ajouteLiaison(0,3,"pivot",{x:a0,y:-b0})
		LIAISON4.L1.rotation -= 90 ;
		
		LIAISON5 = ajouteLiaison(2,3,"pivot",{x:a0-b4*Math.sin(C3.rotation/180*Math.PI),y:-b0+b4*Math.cos(C3.rotation/180*Math.PI)})
		LIAISON5.L1.rotation -= 90 ;
		LIAISON5.L2.rotation -= 90 ;
		
	// Réglages
		C3.couleur("#FFAA00");
		C3.children[0].alpha=0.2
		
//Ajout des classes
/*schema.ajouteClasse(C0);
schema.ajouteClasse(C1);
schema.ajouteClasse(C2);
schema.ajouteClasse(C3);*/
	
	

//dessin
/*C0.dessineLigne(0,0,0,b0);
C0.dessineLigne(0,b0,a0,b0);*/



/*C1.dessineLigne(0,0,c,0);
C2.dessineLigne(0,0,c,0);
C3.dessineLigne(0,0,l,0);
C3.dessineLigne(d,0,d,e);*/

//Point
//C2.schema.addChild(new Point(-100,100));


//Liaisons (à faire en dernier pour les pb de décallage d'origine)
/*LIAISON1 = ajouteLiaison(0,1,"pivot",{x:0,y:a})
LIAISON1.L1.pilotee(true); // OU L2, c'est pareil
LIAISON1.L1.rotation=-90
LIAISON2 = ajouteLiaison(0,3,"pivot",{x:b,y:0});
LIAISON3 = ajouteLiaison(2,3,"pivot",{x:b+d,y:e});
LIAISON3.L2.rotation=-90
LIAISON4 = ajouteLiaison(1,2,"pivot",{x:c*Math.cos(15*Math.PI/180),y:a+c*Math.sin(15*Math.PI/180)});*/
//LIAISON2 = ajouteLiaison(1,2,"pivot",{x:0,y:-100})
//LIAISON2.L1.pilotee(true);


/*C0.ajouteImage("domoticc/bati.png",-276,-415,0,1.58);
C1.ajouteImage("domoticc/bras.png",-42,-42,0,0.23);
C2.ajouteImage("domoticc/bielle.png",-19,-19,0,0.3);
C3.ajouteImage("domoticc/vantail.png",-27,-26,0,0.72);*/




schema.scaleX = 0.5 ;
schema.scaleY = 0.5 ;
schema.x -= 200 ;
schema.y += 50 ;

