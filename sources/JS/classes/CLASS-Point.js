/*
//Point graphique
var Point = function(_x,_y)
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		this._couleur = "black"	// Couleur
		this._classe = null;		// Classe d'équivalence mère
		this._epaisseur = 2		// Épaisseur du trait
		this._diamètre = 10		// Diamètre
		
		

	//==========================
	//getter/setter
	//==========================

		
		//Getter/Setter de la couleur
		this.couleur=function(c)
		{
			if(typeof(c)!='undefined')
			{
				this._couleur=c;
				//Modifier les couleurs
			}
			return this._couleur;
		}
		
		
		//Renvoie l'epaisseur des traits
		this.epaisseur = function(e)
		{
			if(typeof(e)!='undefined')
			{
				this._epaisseur=e;
			}
			return this._epaisseur;
		}
		
		//Renvoie le diamètre du point
		this.diametre = function(d)
		{
			if(typeof(d)!='undefined')
			{
				this._diametre=d;
			}
			return this._diametre;
		}
		
		//Renvoie la classe d'équivalence mère
		this.classe = function(c)
		{
			if(typeof(c)!='undefined')
			{
				this._classe=c;
			}
			return this._classe;
		}
		
		

	//==========================
	//Autres fonctions membres
	//==========================

	

	//==========================
	//Graphismes
	//==========================

		//Position
		var coor


		//croix
		//this._croix = new createjs.containter()
		this._croix = new createjs.Shape();
		this._croix.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur);
		this._croix.graphics.moveTo(-this._diametre*0.7071067811865476,-this._diametre*0.7071067811865476)
		this._croix.graphics.lineTo(this._diametre*0.7071067811865476,this._diametre*0.7071067811865476)
		this._croix.graphics.moveTo(-this._diametre*0.7071067811865476,this._diametre*0.7071067811865476)
		this._croix.graphics.lineTo(this._diametre*0.7071067811865476,-this._diametre*0.7071067811865476)
		this.addChild(this._croix);
		
//		this.cursor="pointer";
	
	//==========================
	//Evénements
	//==========================
	
	
		

}
Point.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
Point.prototype.constructor = Point;//On recopie le constructeur de Noeud dans son prototype

		this._croix = new createjs.Shape();



*/



/**
 * Un point sur le schéma
 * @extends createjs.Container
 */
class Point extends createjs.Container
{
	// **********************************************************
	/*
	 * Constructeur
	 * @param {Position} _coord_ - Position du point
	 * @param {String} _nom_ - Nom du point
	 * @param {Object} _opt_ - Options supplémentaires {couleur:"maCouleur"}
	 */
	constructor(_nom_)
	{
		super()	// Rappelle le constructeur parent
		
		// PARAMETRES
			this._nom = _nom_ ;
			
			/*var options = {couleur:"#000000" } ;	//Paramètres par défaut
			ecraseOptions(options,_opt) ;	// Mise à jour des paramètres en fonction de ce que l'utilisateur passe			
			this._couleur = options.couleur;*/

		//this.rotation = -getGlobalRotation(this.parent); //On garde le point "droit" (il ne tourne pas, pour avoir les écritures dans le bon sens)
		
		// DESSINS
		
			this._croix.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur);
			this._croix.graphics.moveTo(-this._diametre/2*0.7071067811865476,-this._diametre/2*0.7071067811865476)
			this._croix.graphics.lineTo(this._diametre/2*0.7071067811865476,this._diametre/2*0.7071067811865476)
			this._croix.graphics.moveTo(-this._diametre/2*0.7071067811865476,this._diametre/2*0.7071067811865476)
			this._croix.graphics.lineTo(this._diametre/2*0.7071067811865476,-this._diametre/2*0.7071067811865476)
			this.addChild(this._croix);
			
			this._texte.x = 15 ;
			this._texte.y = -30 ;
			this._texte.text = this._nom;
			this.addChild(this._texte)

		// EVENEMENTS
	}
	
	
	//==========================
	//Variables Membres
	//==========================
	
	
			/** Nom du point
			@type {String}  */
		_nom = "" ;
		
			/** Couleur de la classe d'équivalence
			@type {String}  */
		_couleur = "black"	// Couleur
		
			/** Epaisseur des traits
			@type {Number}  */
		_epaisseur = 2		// Épaisseur du trait
		
			/** Diamètre de la puce ou de la croix qui représente le point
			@type {Number}  */
		_diametre = 10		// Diamètre
		
			/** Dessin de la croix
			@type {createjs.Shape}  */
		_croix = new createjs.Shape();
		
			/** texte d'affichage du nom du point
			@type {String}  */
		_texte = new createjs.Text("tt", "20px Arial", "black");;
		
	//==========================
	//getter/setter
	//==========================

		
			/** GETTER/SETTER - Nom du point à afficher
			@param {String} n - (FACULTATIF) Nom du point.
			@return {String} Nom du point.
			*/
		nom(n)
		{
			if(typeof(n)!='undefined')
			{
				this._nom = n;
				//Modifier le texte
				this._texte.text = n ;
			}
			return this._nom;
		}
		
			/** GETTER/SETTER - Couleur de la classe d'équivalence.
			Si modifiée, elle affecte les objets graphique enfants (lignes, cercles, liaisons, etc.) qui possède une méthode couleur() similaire
			@param {String} c - (FACULTATIF) Couleur à stocker.
			@return {String} Couleur de la classe d'équivalence
			*/
		couleur(c)
		{
			if(typeof(c)!='undefined')
			{
				this._couleur=c;
				//Modifier les couleurs
				this._texte.color=c;
				this._croix.graphics._stroke.style=c;
			}
			return this._couleur;
		}
		
			/** GETTER/SETTER - Epaisseur des traits
			@param {Number} e - (FACULTATIF) Epaisseur des traits.
			@return {Number} Épaisseur des traits
			*/
		epaisseur(e)
		{
			if(typeof(e)!='undefined')
			{
				this._epaisseur=e;
			}
			return this._epaisseur;
		}
		
			/** GETTER/SETTER - Taille de la puce qui représente le point
			@param {Number} d - (FACULTATIF) Taille de la puce
			@return {Number} Taille de la puce
			*/
		diametre(d)
		{
			if(typeof(d)!='undefined')
			{
				this._diametre=d;
			}
			return this._diametre;
		}
		
		

	//==========================
	//Autres fonctions membres
	//==========================

			/** Fonction qui met à jour le point à chaque pas de temps de simulation.
			*/
		MAJ()
		{
			this.rotation = -getGlobalRotation(this.parent); //On garde le point "droit" (il ne tourne pas, pour avoir les écritures dans le bon sens)
		}
		
			/** Fonction qui change la position d'un point (en fonction du contexte indiqué)
			* @param {Position} _pos - Nouvelle position du point
			*/
		changePosition(_pos)
		{
			var posLocale =  convertPosition(_pos,this.parent,false);
			this.rotation = -getGlobalRotation(this.parent);
			this.x = posLocale.x;
			this.y = posLocale.y;
		}
	// ===========================
	// GRAPHISMES
	// ===========================
	
}
	
