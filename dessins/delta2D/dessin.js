

//Constantes
a = 60 /40 ;
l = 170 /40 ;
b = 80 /40 ;
c = 60 /40 ;
L = 330 /40 ;
DI = 60 /40 ;
alpha_coude = 28 ; //(en degres)

// =============================================
// On crée les classe d'équivalence
// =============================================

// 0) BATI **********************
BATI = new Classe_Equivalence();
BATI.nom("Bâti") ; // Changement de nom
schema.ajouteClasse(BATI);
BATI.bloque(true);
BATI.dessineLigne({x:-a,y:0},{x:a,y:0});
BATI.dessineLigne({x:0,y:0},{x:0,y:b * Math.sin(Math.PI/3)});
BATI.dessineLigne({x:0,y:b * Math.sin(Math.PI/3)},{x:a+b * Math.cos(Math.PI/3),y:b * Math.sin(Math.PI/3)});


// 1) BRAS DROITE **********************
BRAS1 = new Classe_Equivalence();
BRAS1.nom("Bras droite 1") ; // Changement de nom
SCHEMA.ajouteClasse(BRAS1);
BRAS1.changePosition({x:a,y:0,contexte:BATI})
//BRAS1.x = a ;
BRAS1.dessineLigne({x:0,y:0,contexte:BRAS1},{x:l,y:0,contexte:BRAS1});

// 2) BRAS GAUCHE **********************
BRAS2=new Classe_Equivalence();
BRAS2.nom("Bras gauche 2") ; // Changement de nom
SCHEMA.ajouteClasse(BRAS2);
BRAS2.changePosition({x:-a,y:0,contexte:BATI})
//BRAS2.x = -a ;
BRAS2.dessineLigne({x:0,y:0,contexte:BRAS2},{x:-l,y:0,contexte:BRAS2});

// 4) AVANT-BRAS DROITE **********************
AVANT_BRAS1=new Classe_Equivalence();
AVANT_BRAS1.nom("Avant Bras droite 1") ; // Changement de nom
schema.ajouteClasse(AVANT_BRAS1);
AVANT_BRAS1.changePosition({x:l,y:0,contexte:BRAS1})
//AVANT_BRAS1.x = a + l ;
AVANT_BRAS1.rotation=134;
AVANT_BRAS1.dessineLigne({x:0,y:0,contexte:AVANT_BRAS1},{x:L,y:0,contexte:AVANT_BRAS1});

// 5) AVANT-BRAS GAUCHE **********************
AVANT_BRAS2=new Classe_Equivalence();
AVANT_BRAS2.nom("Avant Bras gauche 2") ; // Changement de nom
schema.ajouteClasse(AVANT_BRAS2);
//AVANT_BRAS2.x = -a - l ;
AVANT_BRAS2.changePosition({x:-l,y:0,contexte:BRAS2})
AVANT_BRAS2.rotation=-134;
AVANT_BRAS2.dessineLigne({x:0,y:0,contexte:AVANT_BRAS2},{x:-L,y:0,contexte:AVANT_BRAS2});


// 7) Effecteur
EFFECTEUR = new Classe_Equivalence();
EFFECTEUR.nom("Effecteur") ; // Changement de nom
schema.ajouteClasse(EFFECTEUR);
//EFFECTEUR.x = a+l+L*Math.cos(134*Math.PI/180)
//EFFECTEUR.y = -L*Math.cos(134*Math.PI/180)
EFFECTEUR.changePosition({x:-L,y:0,contexte:AVANT_BRAS2})
EFFECTEUR.rotation=0;
EFFECTEUR.dessineLigne({x:0,y:-0.8,contexte:EFFECTEUR},{x:-c*Math.cos(alpha_coude/180*Math.PI),y:-0.8,contexte:EFFECTEUR});
EFFECTEUR.dessineLigne({x:-c*Math.cos(alpha_coude/180*Math.PI),y:c*Math.sin(alpha_coude/180*Math.PI),contexte:EFFECTEUR},{x:-c*Math.cos(alpha_coude/180*Math.PI),y:-0.8,contexte:EFFECTEUR});


// 8) COUDE **********************
COUDE = new Classe_Equivalence();
COUDE.nom("Coude") ; // Changement de nom
schema.ajouteClasse(COUDE);
COUDE.changePosition({x:l,y:0,contexte:BRAS1})
//COUDE.x = a+l;
COUDE.dessineLigne({x:0,y:0,contexte:COUDE},{x:b * Math.cos(Math.PI/3),y:b * Math.sin(Math.PI/3),contexte:COUDE});
COUDE.dessineLigne({x:0,y:0,contexte:COUDE},{x:-c*Math.cos(alpha_coude/180*Math.PI),y:c*Math.sin(alpha_coude/180*Math.PI),contexte:COUDE});


//On change les coordonnées des classes

// 3) BIELLE BRAS DROITE **********************
BIELLE_BRAS1=new Classe_Equivalence();
BIELLE_BRAS1.nom("Bielle Bras 1") ; // Changement de nom
schema.ajouteClasse(BIELLE_BRAS1);
BIELLE_BRAS1.changePosition({x:a+b * Math.cos(Math.PI/3),y:b * Math.sin(Math.PI/3),contexte:BATI})
BIELLE_BRAS1.dessineLigne({x:0,y:0,contexte:BIELLE_BRAS1},{x:l,y:0,contexte:BIELLE_BRAS1});

// 6) BIELLE AVANT-BRAS DROITE **********************
BIELLE_AVANT_BRAS1=new Classe_Equivalence();
BIELLE_AVANT_BRAS1.nom("Bielle Avant Bras 1") ; // Changement de nom
schema.ajouteClasse(BIELLE_AVANT_BRAS1);
BIELLE_AVANT_BRAS1.changePosition({x:-c*Math.cos(alpha_coude/180*Math.PI),y:c*Math.sin(alpha_coude/180*Math.PI),contexte:COUDE})
//BIELLE_AVANT_BRAS1.x = a + l - c*Math.cos(alpha_coude/180*Math.PI);
//BIELLE_AVANT_BRAS1.y =  -c*Math.sin(alpha_coude/180*Math.PI);
BIELLE_AVANT_BRAS1.dessineLigne({x:0,y:0,contexte:BIELLE_AVANT_BRAS1},{x:L,y:0,contexte:BIELLE_AVANT_BRAS1});
BIELLE_AVANT_BRAS1.rotation=134;


// Liaisons
LIAISON1 = ajouteLiaison(BATI,BRAS1,"pivot",{x:a, y:0, contexte:BATI})
LIAISON2 = ajouteLiaison(BATI,BRAS2,"pivot",{x:-a, y:0, contexte:BATI})
	LIAISON2.L1.rotation = 0;
LIAISON3 = ajouteLiaison(BRAS1, AVANT_BRAS1, "pivot", {x:l, y:0, contexte:BRAS1})
LIAISON4 = ajouteLiaison(BRAS2, AVANT_BRAS2, "pivot", {x:-l,y:0, contexte:BRAS2})
	LIAISON4.L1.rotation = 0;
	LIAISON4.L2.rotation = 180;
// Avant bras gauche / effecteur
LIAISON5 = ajouteLiaison(AVANT_BRAS2,EFFECTEUR,"pivot",{x:0,y:0,contexte:EFFECTEUR})
	LIAISON5.L1.rotation = 0;
	LIAISON5.L2.rotation = 90;
// Bati / Bielle1
LIAISON6 = ajouteLiaison(BATI,BIELLE_BRAS1,"pivot",{x:0,y:0,contexte:BIELLE_BRAS1})
// Bras / coude
LIAISON7 = ajouteLiaison(BRAS1,COUDE,"pivot",{x:l ,y:0,contexte:BRAS1})
	LIAISON7.L1.rotation = 180;
	LIAISON7.L2.rotation = -60;
// Bielle / coude
LIAISON8 = ajouteLiaison(BIELLE_BRAS1,COUDE,"pivot",{x:l ,y:0, contexte:BIELLE_BRAS1})
	LIAISON8.L1.rotation = 180;
	LIAISON8.L2.rotation = 120;
// Bielle2 / coude
LIAISON9 = ajouteLiaison(COUDE,BIELLE_AVANT_BRAS1,"pivot",{x:0 ,y:0, contexte:BIELLE_AVANT_BRAS1})
	LIAISON9.L1.rotation = alpha_coude;
	LIAISON9.L2.rotation = 0;

// effecteur avant bras droit
LIAISON10 = ajouteLiaison(AVANT_BRAS1,EFFECTEUR,"pivot",{x:0,y:0,contexte:EFFECTEUR})
	LIAISON10.L1.rotation = 180;
	LIAISON10.L2.rotation = 90;
// effecteur bielle2

LIAISON11 = ajouteLiaison(BIELLE_AVANT_BRAS1,EFFECTEUR,"pivot",{x:L, y:0, contexte:BIELLE_AVANT_BRAS1})
	LIAISON11.L1.rotation = 180;
	LIAISON11.L2.rotation = 90;




LIAISON1.L1.pilotee(true);
	T1 = 12.4; //Periode mouvement 1
	aM1 = -Math.PI/3 //Amplitude mouvement 1
	d1 = 4 // duree mouvement 1
	LIAISON1.L1.consignesCinematiques(1,"creneau(t%T1,0,d1)*aM1/d1*(t%T1)+creneau(t%T1,d1,T1/2)*aM1-creneau(t%T1,T1/2,T1/2+d1)*aM1/d1*(t%T1-(T1/2+d1))")
LIAISON2.L1.pilotee(true);
	T2 = 20; //Periode mouvement 2
	aM2 = Math.PI/3 //Amplitude mouvement 2
	d2 = 4 // duree mouvement 2
	LIAISON2.L1.consignesCinematiques(1,"creneau(t%T2,0,d2)*aM2/d2*(t%T2)+creneau(t%T2,d2,T2/2)*aM2-creneau(t%T2,T2/2,T2/2+d2)*aM2/d2*(t%T2-(T2/2+d2))")
	
		
BATI.ajouteImage("delta2D/bati.png",-126,-82,0,0.1734);
BRAS1.ajouteImage("delta2D/bras_droite.png",-25,-25,0,0.133020344);
BRAS2.ajouteImage("delta2D/bras_gauche.png",-184,-25,0,0.133020344);
AVANT_BRAS1.ajouteImage("delta2D/avant_bras_droite.png",-12.55186722,-12.55186722,0,0.2282);
AVANT_BRAS2.ajouteImage("delta2D/avant_bras_gauche.png",-342,-12.82208589,0,0.224948875);
EFFECTEUR.ajouteImage("delta2D/effecteur.png",-89.75,-25,0,0.154);
COUDE.ajouteImage("delta2D/coude.png",-68*Math.cos(Math.PI/6)+87*Math.sin(Math.PI/6),-68*Math.sin(Math.PI/6)-87*Math.cos(Math.PI/6),30,0.1358);
BIELLE_BRAS1.ajouteImage("delta2D/bielle_1.png",-5.3768,-5.3768,0,0.1144);
BIELLE_AVANT_BRAS1.ajouteImage("delta2D/bielle_2.png",-5.3696,-5.3696,0,0.114247311);



SCHEMA.y-=200;
//cache_toutes_images()
