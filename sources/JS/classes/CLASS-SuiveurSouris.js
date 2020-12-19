

//Classe Suiveur souris (crée un objet qui suit la souris ou pas)
var SuiveurSouris = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);
		
	//==========================
	//Variables Membres
	//==========================
	
		this._aimante = true;
		
	
	//==========================
	//getter/setter
	//==========================
	
		//Coordonnées locales *****************
	
		//Dit si le suiveur doit être aimanté aux éléments de la scene (axes, etc.) ou pas
		this.aimante=function(a)
		{
			if(typeof(a)!='undefined')
			{
					this._aimante=!!a; // !! = convertion en booléen
			}
			return this._aimante;
		}

		
		
	//==========================
	//Autres fonctions membres
	//==========================
	
	
	//==========================
	//Graphisme
	//==========================

		this.contenu = new createjs.Container(); //C'est la "boite" dans lequel on va mettre des objets
		this.addChild(this.contenu);
		
		this.debug = new createjs.Container(); //Sert juste à afficher un truc avec la souris
		var circle = new createjs.Shape();
		circle.graphics.beginFill("red").drawCircle(0, 0, 5)
		this.debug.addChild(circle);
		this.addChild(this. debug);
	
	//==========================
	//Evenements
	//==========================
	
		this.update = function()
		{
			this.x=schema.XSOURIS();
			this.y=schema.YSOURIS();
		}
	
		var cela=this
		this.addEventListener("tick",function(){cela.update()});
	
		
}
SuiveurSouris.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
SuiveurSouris.prototype.constructor = SuiveurSouris;//On recopie le constructeur de Noeud dans son prototype
