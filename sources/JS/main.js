

//VARIABLES GLOBALES

ACTION="";
SOUS_ACTION="";
CLASSE=-1;	//Quand on sélectionne une classe

MOUSE_DOWN = -1;	//id du dernier bouton de souris enfoncé (utile pour le drag n drop). Voir les événements dans la classe schema.
LAST_CLIC = {x:0,y:0}	// Coordonnées globale de la souris lors du dernier clic (pour le drag n drop)
PRECISION = 5;	//Nombre de boucles de résolution


dessin = new createjs.Stage("canvas_schema_cinematique");
dessin.enableMouseOver(); //Permet de faire les mouseover et les css "cursor"
	
//Schema (= un containeur, un peu comme les canvas, mais avec des echelles adapté, etc.)
schema = new Schema();
schema._repere=new Repere({x:0,y:0},0);
schema._repere.couleur("black");
schema.addChild(schema._repere);
dessin.addChild(schema);

schema.x=dessin.canvas.width/2;//On place l'origine du schéma au milieu
schema.y=dessin.canvas.height/2;
dessin.addEventListener("stagemousemove", schema.updateSourisFromStagePosition);//Permet d'envoyer les position de la souris


//C0=new Classe_Equivalence();
//C1=new Classe_Equivalence();
//C2=new Classe_Equivalence();
//C3=new Classe_Equivalence();

//C0.bloque(true)
//C1.bloque(true)
//C3.bloque(true)

//C1.y=-50;
/*C2.x=50;
C2.y=-150
C3.x=200
C3.y=-100

schema.ajouteClasse(C0);
schema.ajouteClasse(C1);
schema.ajouteClasse(C2);
schema.ajouteClasse(C3);*/


//dessin
/*var line = new createjs.Shape();
line.graphics.setStrokeStyle(3).beginStroke("rgba(255,0,0,1)");
line.graphics.moveTo(30,0);
line.graphics.lineTo(-30, -100);
C1.addChild(line)
var line = new createjs.Shape();
line.graphics.setStrokeStyle(3).beginStroke("rgba(0,0,255,1)");
line.graphics.moveTo(-20,50);
line.graphics.lineTo(120, -50);
C2.addChild(line)
var line = new createjs.Shape();
line.graphics.setStrokeStyle(3).beginStroke("rgba(0,100,0,1)");
line.graphics.moveTo(-30,100);
line.graphics.lineTo(30, -100);
C3.addChild(line)*/




// Point qui suit la souris (et qui sert de curseur)
suiveur = new SuiveurSouris();
schema.addChild(suiveur);

//Liaisons
/*LIAISON1 = ajouteLiaison(0,1,"pivot",{x:0,y:0})
LIAISON1.L1.pilotee(true); // OU L2, c'est pareil
LIAISON1.L1.rotation=90
LIAISON2 = ajouteLiaison(1,2,"pivot",{x:0,y:-100})
//LIAISON2.L1.pilotee(true);
LIAISON3 = ajouteLiaison(2,3,"pivot",{x:200,y:-200})
//LIAISON3.L1.pilotee(true);
LIAISON4 = ajouteLiaison(3,0,"pivot",{x:200,y:0})*/

//LIAISON4.L1.pilotee(true);
//C1.y+=10


// Appel des modifs toutes les 30 ms
createjs.Ticker.setFPS(30);	
createjs.Ticker.addEventListener("tick", dessin);




