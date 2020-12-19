

//VARIABLES GLOBALES

ACTION="";
SOUS_ACTION="";
CLASSE=0;


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


C0=new Classe_Equivalence();
C1=new Classe_Equivalence();
//C2=new Classe_Equivalence();
C1.x=100;
C1.y=50;

//C2.x=-10;
//C2.y=-50;

C0.bloque(true)

schema.ajouteClasse(C0);
schema.ajouteClasse(C1);
//schema.ajouteClasse(C2);



// Point qui suit la souris (et qui sert de curseur)
suiveur = new SuiveurSouris();
schema.addChild(suiveur);

ajouteLiaison(0,1,"pivot",{x:0,y:0})
//C1.x+=10
ajouteLiaison(0,1,"pivot",{x:200,y:20})
//C1.y+=10


// Appel des modifs toutes les 30 ms
createjs.Ticker.setFPS(30);	
createjs.Ticker.addEventListener("tick", dessin);




