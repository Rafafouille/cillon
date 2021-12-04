
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
