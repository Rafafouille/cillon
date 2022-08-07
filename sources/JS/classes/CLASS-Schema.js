/* Class: Schema
 Schéma. Il représente la scène principale dans laquelle sont mis les dessins.
 Hérite de <createjs.Container>
*/
/*
var Schema2 = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		this._echelle=40;	//Nombre de pixel par unité
		this.classes=[];	//Liste des classes d'équivalence
		this._souris={x:0,y:0};
//		this._t0=0;	//Temps initiale du début de la simulation
		this._tSimulation = 0;	//Temps écoulé depuis le début de la simulation (pauses incluses)

	//==========================
	//getter/setter
	//==========================

		// -----------------------------------------------------

		this.echelle=function(e)
		{
			if(typeof(e)!='undefined')
				this._echelle=e;
			return this._echelle;
		}
		
		//Fonction qui renvoie les coordonnées (en pixel) sur x d'un point du schéma
		this.x2X=function(x)
		{
			return x*this._echelle;
		}
		
		//Fonction qui renvoie les coordonnées (en pixel) sur y d'un point du schéma
		this.y2Y=function(y)
		{
			return -y*this._echelle;
		}
		
		//Fonction qui renvoie les coordonnées (dans la base de schema) sur x 
		this.X2x=function(X)
		{
			return X/this._echelle;
		}
		
		//Fonction qui renvoie les coordonnées (dans la base de schema) sur y 
		this.Y2y=function(Y)
		{
			return -Y/this._echelle;
		}
		
		
		//Fonction qui renvoie les coordonnées (dans la base de schema) sur y 
		this.nbClasses=function()
		{
			return this.classes.length;
		}
		
		//Souris **************************************
		
		//Coordonnées de la souris (local)
		this.souris=function(s)
		{
			if(typeof(s)!='undefined')
				this._souris=s;
			return this._souris;
		}
		this.xSouris=function(x)
		{
			if(typeof(x)!='undefined')
				this._souris.x=x;
			return this._souris.x;
		}
		this.ySouris=function(y)
		{
			if(typeof(y)!='undefined')
				this._souris.y=y;
			return this._souris.y;
		}
		//Coordonnées de la souris (en px)
		this.SOURIS=function(s)
		{
			if(typeof(s)!='undefined')
				this._souris={x:s.X/this._echelle,y:-s.Y/this._echelle};
			return {X:this._souris.x*this._echelle,Y:-this._souris.y*this._echelle};
		}
		this.XSOURIS=function(X)
		{
			if(typeof(X)!='undefined')
				this._souris.x=X/this._echelle;
			return this._souris.x*this._echelle;
		}
		this.YSOURIS=function(Y)
		{
			if(typeof(Y)!='undefined')
				this._souris.y=-Y/this._echelle;
			return -this._souris.y*this._echelle;
		}


		//Fonction qui renvoie la date initiale de la simulation depuis t0
		//this.t0 = function(t0)
	//	{
	//		if(typeof(t0)!='undefined')
	//			this._t0=t0;
	//		return this._t0;
	//	}


		//Fonction qui renvoie le temps de la simulation depuis le début de la simu
		this.tSimulation = function(t)
		{
			if(typeof(t)!='undefined')
				this._tSimulation=t;
			return this._tSimulation
		}

	//==========================
	//Autres fonctions membres
	//==========================

		//Ajoute un classe au dessin
		this.ajouteClasse=function(c)
		{
		//	i=0
		//	while(this.classes[i] != undefined) //On cherche un numéro de classe non-utilisé
		//		i+=1;
			this.classes.push(c);
			//c.numero(i);
			var num = this.classes.length-1 ; //N° de la classe
			c.couleur(this.choisitCouleur(num));
			this.addChild(c);	//Ajoute graphiquement
		}
		
		this.choisitCouleur=function(i)
		{
			if(typeof(i) == 'undefined')
				i = this.classes.length; // On prend la 1ère couleur libre par defaut
			//liste_Couleurs=["black","red","blue","Green","Orange","Purple","SaddleBrown","Navy","Maroon","DeepSkyBlue","LimeGreen","DarkGoldenRod","Orchid"];
			liste_Couleurs=["#000000","#FF0000","#0000FF","#00AA00","#FF9900","#FF00FF","#990000","#000099","#00FFFF","#99FF00"];
			return liste_Couleurs[i%(liste_Couleurs.length)]
		}

		//Fonction qui demande à chaque CE de sauvegarder leur position.
		this.sauvePositions = function()
		{
			for(var i=0;i<this.classes.length;i++)
			{
				c= this.classes[i]
				c.sauveLastPosition();
			}
		}

		//Fonction qui demande à chaque CE de recharger leur dernière position sauvegardée.
		this.restorePositions = function()
		{
			for(var i=0;i<this.classes.length;i++)
			{
				c= this.classes[i]
				c.restoreLastPosition();
			}
		}
		
		//Fonction qui enregistre dans l'historique les positions des CL
		//Il prend la date t en argument
		this.pushHistoriques=function(t)
		{
			for(var i=0;i<this.classes.length;i++)
			{
				c = this.classes[i]
				c.pushHistorique(t,c.x,c.y,c.rotation);
			}
		}
		
		//Efface tout le dessin
		this.reset=function()
		{
			this.classes=[];
			for(var i=0;i<this.classes.length;i++)
			{
				c = this.classes[i]
				this.removeChild(c);
			}
		}
		
	//==========================
	//Graphismes
	//==========================
	
		//Repere (placé après avoir construit l'objet)

	//==========================
	//EVENEMENS
	//==========================
	
		ceci=this;
		this.updateSourisFromStagePosition=function(event)
		{
			var X=event.stageX;
			var Y=event.stageY;
			var posLoc=ceci.globalToLocal(X,Y);
			ceci.SOURIS({X:posLoc.x,Y:posLoc.y})
		}


		cela = this;
		this.addEventListener("tick",function(event){
		
				if(ACTION=="simule" || ACTION == "MANIP" && SOUS_ACTION == "TIRE")
				{
					if(event.delta=="undefined")
						ACTION=""
					schema._tSimulation += event.delta/1000.	//On fait s'écouler le temps
					//console.log(schema._tSimulation);
					for(var i=0;i<PRECISION;i++)
						resout();
					schema.pushHistoriques(schema._tSimulation)
				}
			}); 

		
		

		

}
Schema2.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
Schema2.prototype.constructor = Schema2;//On recopie le constructeur de Noeud dans son prototype
*/


/**
 * Classe représentant le calque principal sur lequel on dessine.
 * @extends createjs.Container
 */
class Schema extends createjs.Container
{
	// **********************************************************
	/*
	 * Constructeur
	 */
	constructor()
	{
		super()	// Rappelle le constructeur parent
		
		// DESSINS
		
		// EVENEMENTS
			// Ajout d'évenement lorsqu'une simulation se déroule
			this.addEventListener("tick",this.faitBougerLaSimulation); 
	}
	
	
	
	
	//==========================
	//Variables Membres
	//==========================
	
			/** Nombre de pixels qui définit l'unité de longueur (lorsqu'on a un zoom de 100%)
			@type {Array}  */
		_unite = 40 ;

		
			/** Liste des classes d'équivalence présentes sur le dessin
			@type {Array}  */
		classes = [] ;
		
			/** Coordonnées de la souris
			@type {coordonnees} */
		_souris={x:0,y:0};
		
		
//		this._t0=0;	//Temps initiale du début de la simulation


			/** Temps écoulé depuis le début de la simulation (pauses incluses). Unité = ???? milliseconde ????
			@type {Number}  */
		_tSimulation = 0;	//
		
			/** Liste des points présents dans la classe d'équivalence
			@type {Array} */
		_listePoints = [];
		
	//==========================
	//getter/setter
	//==========================
	
		
		
			/** GETTER / SETTER de l'échelle (c'est à dire : le nombre de pixels qui définit l'unité de longueur)
			@param {Number} e - [OPTIONNEL] Nouvelle valeur de l'échelle.
			@deprecated remplacé par [unite()]{@link Schema#unite}.
			@return {Number} L'échelle courante
			*/
		echelle(e)
		{
			if(typeof(e)!='undefined')
				this._unite=e;
			return this._unite;
		}
		
		
			/** GETTER / SETTER de l'unité (c'est à dire : le nombre de pixels qui définit l'unité de longueur)
			@param {Number} u - [OPTIONNEL] Nouvelle valeur de l'échelle.
			@return {Number} L'échelle courante
			*/
		unite(u)
		{
			if(typeof(u)!='undefined')
				this._unite=u;
			return this._unite;
		}
		
			
			/** Fonction qui renvoie les coordonnées (en pixel) sur x d'un point du schéma (en prenant en compte l'échelle)
			@param {Number} x - Coordonnées sur x (dans l'unité du dessin).
			@return {Number} Coordonnées sur x convertie en pixels
			*/
		x2X(x)
		{
			return x*this._unite;
		}
			
			/** Fonction qui renvoie les coordonnées (en pixel) sur y d'un point du schéma (en prenant en compte l'échelle et le sens)
			@param {Number} y - Coordonnées sur y (dans l'unité du dessin).
			@return {Number} Coordonnées sur y convertie en pixels
			*/
		y2Y(y)
		{
			return -y*this._unite;
		}
			
			/** Fonction qui renvoie les coordonnées (en unité du schéma) sur X d'un point (en prenant en compte l'échelle)
			@param {Number} X - Coordonnées sur x (en pixel).
			@return {Number} Coordonnées sur x convertie en unité du schéma
			*/
		X2x(X)
		{
			return X/this._unite;
		}
		
			/** Fonction qui renvoie les coordonnées (en unité du schéma) sur Y d'un point (en prenant en compte l'échelle)
			@param {Number} Y - Coordonnées sur y (en pixel).
			@return {Number} Coordonnées sur y convertie en unité du schéma (et dans le bon sens)
			*/
		Y2y(Y)
		{
			return -Y/this._unite;
		}
		
			
			/** Fonction qui renvoie le nombre de classes d'équivalence présentes sur le dessin
			@return {Number} Nombre de classe présentes sur le dessin
			*/
		nbClasses()
		{
			return this.classes.length;
		}
		
		
	//Souris **************************************
		

			/**  GETTER / SETTER Coordonnées (en pixel) de la souris.
			@param {Point} s (FACULTATIF) Coordonnées de la souris (en pixel)
			@return {Point}  Coordonnées de la souris
			*/
		souris(s)
		{
			if(typeof(s)!='undefined')
				this._souris=s;
			return this._souris;
		}
		
			/** GETTER / SETTER Coordonnée sur x (en pixel) de la souris.
			@param {Number} x - (FACULTATIF) Coordonnée sur x de la souris (en pixel)
			@return {Number} Coordonnée sur x de la souris (en pixel)
			*/
		xSouris(x)
		{
			if(typeof(x)!='undefined')
				this._souris.x=x;
			return this._souris.x;
		}
		
			/** GETTER / SETTER Coordonnée sur y (en pixel) de la souris.
			@param {Number} y - (FACULTATIF) Coordonnée sur y de la souris (en pixel)
			@return {Number} Coordonnée sur y de la souris (en pixel)
			*/
		ySouris(y)
		{
			if(typeof(y)!='undefined')
				this._souris.y=y;
			return this._souris.y;
		}
		
			/**  GETTER / SETTER Coordonnées (en coordonnées locales) de la souris.
			@param {Point} S - (FACULTATIF) Coordonnées (en coordonnées locales) de la souris.
			@return {Point} Coordonnées (en coordonnées locales) de la souris.
			*/
		SOURIS(S)
		{
			if(typeof(S)!='undefined')
				this._souris={x:S.X/this._unite,y:-S.Y/this._unite};
			return {X:this._souris.x*this._unite,Y:-this._souris.y*this._unite};
		}
		
			/** GETTER / SETTER Coordonnée sur X (en coordonnées locales) de la souris.
			@param {Number} X - (FACULTATIF) Coordonnée sur X de la souris (en coordonnées locales)
			@return {Number} Coordonnée sur X de la souris (en coordonnées locales)
			*/
		XSOURIS(X)
		{
			if(typeof(X)!='undefined')
				this._souris.x=X/this._unite;
			return this._souris.x*this._unite;
		}
		
			/** GETTER / SETTER Coordonnée sur Y (en coordonnées locales) de la souris.
			@param {Number} Y - (FACULTATIF) Coordonnée sur Y de la souris (en coordonnées locales)
			@return {Number} Coordonnée sur Y de la souris (en coordonnées locales)
			*/
		YSOURIS(Y)
		{
			if(typeof(Y)!='undefined')
				this._souris.y=-Y/this._unite;
			return -this._souris.y*this._unite;
		}


		//Fonction qui renvoie la date initiale de la simulation depuis t0
		/*this.t0 = function(t0)
		{
			if(typeof(t0)!='undefined')
				this._t0=t0;
			return this._t0;
		}*/

		
			/** GETTER / SETTER du temps de la simulation depuis le début de la simu
			@param {Number} t - (FACULTATIF) Valeur de temps à stocker
			@return {Number} Temps de simulation (en ms ???)
			*/
		tSimulation(t)
		{
			if(typeof(t)!='undefined')
				this._tSimulation=t;
			return this._tSimulation
		}
		
	//==========================
	//Autres fonctions membres
	//==========================

			/** Fonction qui ajoute une nouvelle classe au schéma. Elle utilse "addChild" de createjs, mais aussi l'ajoute à la liste membre "classes".
			@param {Classe_Equivalence} c - Classe d'équivalence à ajouter.
			*/
		ajouteClasse(c)
		{
			this.classes.push(c);
			var num = this.classes.length-1 ; //N° de la classe
			c.couleur(this.choisitCouleur(num));
			this.addChild(c);	//Ajoute graphiquement
		}
		
			/** Fonction qui choisit la couleur de la classe d'équivalence n°i parmis une palette de couleur.
			@param {number} i - Numéro de la classe d'équivalence dont on veut choisir une couleur (0 inclus)
			@return {string} Couleur
			*/
		choisitCouleur(i)
		{
			if(typeof(i) == 'undefined')
				i = this.classes.length; // On prend la 1ère couleur libre par defaut
			//liste_Couleurs=["black","red","blue","Green","Orange","Purple","SaddleBrown","Navy","Maroon","DeepSkyBlue","LimeGreen","DarkGoldenRod","Orchid"];
			var liste_Couleurs=["#000000","#FF0000","#0000FF","#00AA00","#FF9900","#FF00FF","#990000","#000099","#00FFFF","#99FF00"];
			return liste_Couleurs[i%(liste_Couleurs.length)]
		}
		
			/** Fonction qui demande à chaque classe d'équivalence de sauvegarder leur position.
			*/
		sauvePositions()
		{
			for(var i=0;i<this.classes.length;i++)
			{
				var c= this.classes[i]
				c.sauveLastPosition();
			}
		}

			/** Fonction qui demande à chaque classe d'équivalence de recharger (=de se repositionner sur) leur dernière position sauvegardée.
			*/
		restorePositions()
		{
			for(var i=0;i<this.classes.length;i++)
			{
				var c= this.classes[i]
				c.restoreLastPosition();
			}
		}
		
			/** Fonction qui enregistre dans l'historique les positions des classe d'équivalence
			@param {number} t - date de l'enregistrement (en ms ?)
			*/
		pushHistoriques(t)
		{
			for(var i=0;i<this.classes.length;i++)
			{
				var c = this.classes[i]
				c.pushHistorique(t,c.x,c.y,c.rotation);
			}
		}
		
			/** Efface le dessin et vide la liste des classes d'équivalence.
			*/
		reset()
		{
			for(var i=0;i<this.classes.length;i++)
			{
				var c = this.classes[i]
				this.removeChild(c);
			}
			this.classes=[];
		}
		
			/** Fonction qui met à jour les enfants */
		MAJ()
		{
			this.classes.forEach(function(C){
				C.MAJ();
			});
		}
		
	//==========================
	//Graphismes
	//==========================
	
		//Repere (placé après avoir construit l'objet)
		

	//==========================
	//EVENEMENS
	//==========================
	
			/** Fonction appelée lors d'un événement de souris, qui enregistre la postiion de la souris.
			@param {event} event - Événement de souris (clic, etc.)
			*/
		updateSourisFromStagePosition(event)
		{
			var X=event.stageX;
			var Y=event.stageY;
			var posLoc=this.globalToLocal(X,Y);
			this.SOURIS({X:posLoc.x,Y:posLoc.y})
		}


			/** Fonction qui fait calculer la simulation pour un pas de temps, si 'on est en mode "simule" ou en mode "tire"
			@param {event} event - Événement (issu d'une tick normalement)
			*/
		faitBougerLaSimulation(event)
		{
			if(ACTION=="simule" || ACTION == "MANIP" && SOUS_ACTION == "TIRE")
			{
				if(event.delta=="undefined")
					ACTION=""
				schema._tSimulation += event.delta/1000.	//On fait s'écouler le temps
				//console.log(schema._tSimulation);
				for(var i=0;i<PRECISION;i++)
					resout();
				schema.pushHistoriques(schema._tSimulation)
				SCHEMA.MAJ(); // Met à jours les enfants
			}
		}

}

