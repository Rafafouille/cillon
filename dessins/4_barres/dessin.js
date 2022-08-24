//On crée les classe d'équivalence
C0=new Classe_Equivalence();
C1=new Classe_Equivalence();
C2=new Classe_Equivalence();
C3=new Classe_Equivalence();

//On change les coordonnées des classes
C2.x=50;
C2.y=-150
C3.x=200
C3.y=-100


//On bloque C0 (le bati)
C0.bloque(true);


//Ajout des classes
schema.ajouteClasse(C0);
schema.ajouteClasse(C1);
schema.ajouteClasse(C2);
schema.ajouteClasse(C3);
	

//Coordonnées
posA = {x:0,y:0} // Position par rapport au schéma, avec les unités du dessin (y vers le haut)
posB = {x:0,y:2.5,uniteSI:true}
posC = {x:5,y:5,uniteSI:true}
posD = {x:5,y:0,uniteSI:true}
	

//dessin
C1.dessineLigne(posA,posB);
C2.dessineLigne(posB,posC);
C3.dessineLigne(posC,posD);



//Points
A = new Point("A");
B = new Point("B");
C = new Point("C");
D = new Point("D");

C0.ajoutePoint(A,posA);
C2.ajoutePoint(B,posB);
C3.ajoutePoint(C,posC);
C0.ajoutePoint(D,posD);

//Liaisons
LIAISON1 = ajouteLiaison(0,1,"pivot",posA)
LIAISON1.L1.pilotee(true); // OU L2, c'est pareil
omega = 0.1*2*Math.PI
LIAISON1.L1.consignesCinematiques(1,"omega*t")
LIAISON1.L1.rotation=90
LIAISON2 = ajouteLiaison(1,2,"pivot",posB)
LIAISON2.L1.rotation=90;
LIAISON2.L2.rotation=-Math.atan((posC.y-posB.y)/(posC.x-posB.x))*180/Math.PI;
//LIAISON2.L1.pilotee(true);
LIAISON3 = ajouteLiaison(2,3,"pivot",posC)
LIAISON3.L1.rotation=LIAISON2.L2.rotation-180;
LIAISON3.L2.rotation=90;
//LIAISON3.L1.pilotee(true);
LIAISON4 = ajouteLiaison(3,0,"pivot",posD)
LIAISON4.L1.rotation=-90;
LIAISON4.L2.rotation=90;

schema.sauvePositions();	//On sauvegarde les positions initiales
