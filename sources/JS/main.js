 
 

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
SCHEMA = new Schema();
schema = SCHEMA // Obsolete, mais présent dans pleine de fichier
/** Référence vers le schéma principal  (remplace schema (en minuscule, obsolète))
 @type {Schema}*/
SCHEMA = schema

SCHEMA._repere=new Repere({x:0,y:0},0);
SCHEMA._repere.couleur("black");
SCHEMA.addChild(SCHEMA._repere);
dessin.addChild(SCHEMA);

SCHEMA.x=dessin.canvas.width/2;//On place l'origine du schéma au milieu
SCHEMA.y=dessin.canvas.height/2;
dessin.addEventListener("stagemousemove", function(event){SCHEMA.updateSourisFromStagePosition(event)});//Permet d'envoyer les position de la souris







// Point qui suit la souris (et qui sert de curseur)
suiveur = new SuiveurSouris();
SCHEMA.addChild(suiveur);

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




