 
 

//VARIABLES GLOBALES

ACTION="";
SOUS_ACTION="";
CLASSE=-1;	//Quand on sélectionne une classe

MOUSE_DOWN = -1;	//id du dernier bouton de souris enfoncé (utile pour le drag n drop). Voir les événements dans la classe schema.
LAST_CLIC = {x:0,y:0}	// Coordonnées globale de la souris lors du dernier clic (pour le drag n drop)

/** Nombre max d'itération avant d'afficher un résultat (si jamais ca converge pas, ou mal)
 @type {Number}*/
ITER_MAX=30 ;

/** Précision qui joue sur la variation du score (quand ça bouge presque plus, on arrete de simuler).
 @type {Number}*/
PRECISION = 2;	//I


dessin = new createjs.Stage("canvas_schema_cinematique");
dessin.enableMouseOver(); //Permet de faire les mouseover et les css "cursor"
	
//Schema (= un containeur, un peu comme les canvas, mais avec des echelles adapté, etc.)
/** Référence vers le schéma principal  (remplace schema (en minuscule, obsolète))
 @type {Schema}*/
SCHEMA = new Schema();
schema = SCHEMA // Obsolete, mais présent dans pleine de fichier


SCHEMA._repere=new Repere({x:0,y:0},0);
SCHEMA._repere.couleur("black");
SCHEMA.addChild(SCHEMA._repere);
dessin.addChild(SCHEMA);

SCHEMA.x=dessin.canvas.width/2;//On place l'origine du schéma au milieu
SCHEMA.y=dessin.canvas.height/2;
dessin.addEventListener("stagemousemove", function(event){SCHEMA.updateSourisFromStagePosition(event)});//Permet d'envoyer les position de la souris

/** Liste des liaisons, sous la forme d'objets de deux demi-liaison {L1,L2}.
* @type {Array}  */
LISTE_LIAISONS = [] // Liste des liaisons




// Point qui suit la souris (et qui sert de curseur)
suiveur = new SuiveurSouris();
SCHEMA.addChild(suiveur);



// Appel des modifs toutes les 30 ms
createjs.Ticker.setFPS(30);	
createjs.Ticker.addEventListener("tick", dessin);




