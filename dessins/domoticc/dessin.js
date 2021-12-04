var a = 160;
var b = 100;
var c = 280;
var d = 355;
var e = 20;
var l = 1000;

//On crée les classe d'équivalence
C0 = new Classe_Equivalence();
C0.bloque(true);
C0.couleur("#AAAA00");

C1 = new Classe_Equivalence();
C1.y = a;
C1.rotation = 15;
C1.couleur("#FF0000");

C2 = new Classe_Equivalence();
C2.x = c*Math.cos(15*Math.PI/180)
C2.y = a+c*Math.sin(15*Math.PI/180)
C2.rotation = -49
C2.couleur("#0000FF");

C3 = new Classe_Equivalence();
C3.x = b ;
C3.couleur("#00AA00");

//On change les coordonnées des classes





//Ajout des classes
schema.ajouteClasse(C0);
schema.ajouteClasse(C1);
schema.ajouteClasse(C2);
schema.ajouteClasse(C3);
	
	

//dessin
C0.dessineLigne(0,0,0,-a);
C0.dessineLigne(0,0,b,0);
C1.dessineLigne(0,0,c,0);
C2.dessineLigne(0,0,c,0);
C3.dessineLigne(0,0,l,0);
C3.dessineLigne(d,0,d,-e);

//Point
//C2.schema.addChild(new Point(-100,100));


//Liaisons (à faire en dernier pour les pb de décallage d'origine)
LIAISON1 = ajouteLiaison(0,1,"pivot",{x:0,y:a})
LIAISON1.L1.pilotee(true); // OU L2, c'est pareil
LIAISON1.L1.rotation=-90
LIAISON2 = ajouteLiaison(0,3,"pivot",{x:b,y:0});
LIAISON3 = ajouteLiaison(2,3,"pivot",{x:b+d,y:e});
LIAISON3.L2.rotation=-90
LIAISON4 = ajouteLiaison(1,2,"pivot",{x:c*Math.cos(15*Math.PI/180),y:a+c*Math.sin(15*Math.PI/180)});
//LIAISON2 = ajouteLiaison(1,2,"pivot",{x:0,y:-100})
//LIAISON2.L1.pilotee(true);


C0.ajouteImage("domoticc/bati.png",-276,-415,0,1.58);
C1.ajouteImage("domoticc/bras.png",-42,-42,0,0.23);
C2.ajouteImage("domoticc/bielle.png",-19,-19,0,0.3);
C3.ajouteImage("domoticc/vantail.png",-27,-26,0,0.72);
