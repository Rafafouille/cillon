//Au choix :
// __arg1__,__arg2__,__arg3__,__arg4__ correspondent aux x1,y1,x2,y2 d'un segment
// __arg1__ est un tableau contenant [x0,y0,x1,y1,x2,y2,...]. Dans ce cas, __arg2__ donne le contexte dans lequel sont données les coordonnées (coordonnées locales par défaut).
/*
var Ligne = function(__arg1__,__arg2__,__arg3__,__arg4__,)
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);
		

	//==========================
	//Variables Membres
	//==========================
	
		this._couleur = "#000000";

	//==========================
	//getter/setter
	//==========================
	
		this.couleur=function(c)
		{
			if(typeof(c)!='undefined')
			{
				this._couleur=c;
				this.ligne.graphics._stroke.style=c;
				this.ligneSelection.graphics._stroke.style=c;
			}
			return this._couleur;
		}
		
	//==========================
	//Autres fonctions membres
	//==========================

		
		


	//==========================
	//Graphismes
	//==========================
	
		this.ligne = new createjs.Shape();	//Ligne "visible"
		this.ligneSelection = new createjs.Shape();	//Ligne "invisible", plus large pour la sélection
		
		this.ligne.graphics.setStrokeStyle(3,"round").beginStroke(this._couleur);
		this.ligneSelection.graphics.setStrokeStyle(20,"round").beginStroke(this._couleur);
		this.ligneSelection.alpha=0.01;
			
		//Cas 1 : on donne les coordonnées d'une ligne entre 2 points
		if(typeof(__arg1__)=="number" && typeof(__arg2__)=="number" && typeof(__arg3__)=="number" && typeof(__arg4__)=="number")
			{
				this.ligne.graphics.moveTo(__arg1__,__arg2__);
				this.ligne.graphics.lineTo(__arg3__,__arg4__);
				this.ligneSelection.graphics.moveTo(__arg1__,__arg2__);
				this.ligneSelection.graphics.lineTo(__arg3__,__arg4__);
				this.ligne.setBounds(Math.min(__arg1__,__arg3__),Math.min(__arg2__,__arg4__),Math.abs(__arg3__-__arg1__),Math.abs(__arg4__-__arg2__))
			}
			//Cas  2 : on donne une liste de coordonnées [x0, y0, x1, y1, etc...]
			else if(Array.isArray(__arg1__))
			{
			
				//Conversion des coordonnées
				if(typeof(__arg2__)=="object")
				{
					liste=[]
					for(var j=2;j<__arg1__.length;j+=2)
					{
						var point = __arg2__.globalToLocal(__arg1__[j],__arg1__[j+1])
						liste.push(point.x)
						liste.push(point.y)
					}
				}
				else
					liste = __arg1__
			
				
				this.ligne.graphics.moveTo(liste[0],liste[1]);
				this.ligneSelection.graphics.moveTo(liste[0],liste[1]);
				for(var j=2;j<__arg1__.length;j+=2)
				{
					this.ligne.graphics.lineTo(liste[j],liste[j+1]);
					this.ligneSelection.graphics.lineTo(liste[j],liste[j+1]);
				}
			}
			//Cas 3 : On donne une shape et on va recopier son graphics
			else if(typeof(__arg1__) == "object")
			{
				this.ligne.graphics =__arg1__.graphics.clone();
				this.ligneSelection.graphics =__arg1__.graphics.clone();
			}
		this.addChild(this.ligneSelection)
		this.addChild(this.ligne)



}
Ligne.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
Ligne.prototype.constructor = Ligne;//On recopie le constructeur de Noeud dans son prototype
*/


/**
 * Objet (graphique) représentant une classe d'équivalence.
 * @extends createjs.Container
 */
class Ligne extends createjs.Container
{

	// **********************************************************
	/**
	 * Constructeur. Peut être utilisé de 3 manières différente : Cas 1 : pour une segment simple, créee une ligne entre les points (__arg1__,__arg2__) et (__arg3__,__arg4__). Cas 2 : pour une ligne brisée (composée de plusieurs segments bout à bout), __arg1__ doit être une liste de coordonnées du type [x0, y0, x1, y1, etc...]. Cas 3 : Peut recopier la forme (createjs.Shape) d'un objet.
	 * @param {Number|Array|createjs.DisplayObject} __arg1__ - Cas 1 : Coordonnées sur X (en px) du 1er point | Cas 2 : Liste de coordonnées | Cas 3 : Objet dont on veut recopier le shape.
	 * @param {Number} [__arg2__] - Cas 2 : Coordonnées sur Y (en px) du 1er point.
	 * @param {Number} [__arg3__] - Cas 3 : Coordonnées sur X (en px) du 2nd point.
	 * @param {Number} [__arg4__] - Cas 4 : Coordonnées sur Y (en px) du 2nd point.
	 */
	constructor(__arg1__,__arg2__,__arg3__,__arg4__)
	{
		super()	// Rappelle le constructeur parent
		
		// Graphisme
		
		this.ligne.graphics.setStrokeStyle(this._epaisseur,"round").beginStroke(this._couleur);
		this.ligneSelection.graphics.setStrokeStyle(this._epaisseurClick,"round").beginStroke(this._couleur);
		this.ligneSelection.alpha=0.01;
		
		
		//Cas 1 : on donne les coordonnées d'une ligne entre 2 points
		if(typeof(__arg1__)=="number" && typeof(__arg2__)=="number" && typeof(__arg3__)=="number" && typeof(__arg4__)=="number")
			{
				this.ligne.graphics.moveTo(__arg1__,__arg2__);
				this.ligne.graphics.lineTo(__arg3__,__arg4__);
				this.ligneSelection.graphics.moveTo(__arg1__,__arg2__);
				this.ligneSelection.graphics.lineTo(__arg3__,__arg4__);
				this.ligne.setBounds(Math.min(__arg1__,__arg3__),Math.min(__arg2__,__arg4__),Math.abs(__arg3__-__arg1__),Math.abs(__arg4__-__arg2__))
			}
			//Cas  2 : on donne une liste de coordonnées [x0, y0, x1, y1, etc...]
			else if(Array.isArray(__arg1__))
			{
			
				//Conversion des coordonnées
				if(typeof(__arg2__)=="object")
				{
					liste=[]
					for(var j=2;j<__arg1__.length;j+=2)
					{
						var point = __arg2__.globalToLocal(__arg1__[j],__arg1__[j+1])
						liste.push(point.x)
						liste.push(point.y)
					}
				}
				else
					liste = __arg1__
			
				
				this.ligne.graphics.moveTo(liste[0],liste[1]);
				this.ligneSelection.graphics.moveTo(liste[0],liste[1]);
				for(var j=2;j<__arg1__.length;j+=2)
				{
					this.ligne.graphics.lineTo(liste[j],liste[j+1]);
					this.ligneSelection.graphics.lineTo(liste[j],liste[j+1]);
				}
			}
			//Cas 3 : On donne une shape et on va recopier son graphics
			else if(typeof(__arg1__) == "object")
			{
				this.ligne.graphics =__arg1__.graphics.clone();
				this.ligneSelection.graphics =__arg1__.graphics.clone();
			}
		this.addChild(this.ligneSelection)
		this.addChild(this.ligne)
	}
	
	
	
	
	//==========================
	//Variables Membres
	//==========================
	
	
		/** Couleur (noir par défaut)
		@type {String}  */
	_couleur = "#000000";
	
		/** Epaisseur du trait visible
		@type {Number}  */
	_epaisseur = 3;
	
		/** Epaisseur du trait invisible pour le click
		@type {Number}  */
	_epaisseurClick = 20
	
		/** Ligne visible
		@type {createjs.DisplayObject}  */
	ligne = new createjs.Shape();
	
		/** Ligne invisible et large (pour la sélection avec la souris)
		@type {createjs.DisplayObject}  */
	ligneSelection = new createjs.Shape();
	
	
	//==========================
	//getter/setter
	//==========================
	
			/** GETTER/SETTER - Couleur de la ligne
			@param {String} [c] Couleur à affecter
			@return {String} Couleur affectée
			*/
		couleur(c)
		{
			if(typeof(c)!='undefined')
			{
				this._couleur=c;
				this.ligne.graphics._stroke.style=c;
				this.ligneSelection.graphics._stroke.style=c;
			}
			return this._couleur;
		}
		
	//==========================
	//Autres fonctions membres
	//==========================
}
