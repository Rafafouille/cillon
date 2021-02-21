
//Vecteur lié à un point.
//__point__ : {x:,y:}
//__vecteur__: objet vecteur, 1er vecteur directeur (=x) (par forcément unitaire)
//Soit Repere(origine,base)
//Soit Repere(origine,angle)
//Soit Repere(origine,vecteur)

var Repere = function(__point__,__arg2__)
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		if(__arg2__ instanceof Base)//Si c'est une base
		{
			__base__=__arg2__;
		}
		else if(__arg2__ instanceof Vecteur)//Si on donne le vecteur directeur de x
		{
			__base__=new Base(__arg2__);
		}
		else//Si c'est un angle par rapport à l'horizontale
		{
			__base__=new Base(__arg2__);
		}
	
	
		this._origine=__point__;		//{x,y}
		this._base=__base__;	//Base
		this._couleur="black";

	//==========================
	//getter/setter
	//==========================

		//Getter/Setter de P1
		this.origine=function(o)
		{
			if(typeof(o)!='undefined')
			{
				this._origine=o;
				this.updateDessin();
			}
			return this._origine;
		}
		
		//Getter/Setter de vx
		this.vx=function(v)
		{
			return this._base.vx(v)
		}
		
		//Getter/Setter de vy
		this.vy=function(v)
		{
			return this._base.vy(v)
		}
		
		//Getter/Setter de la base
		this.base=function(b)
		{
			if(typeof(b)!='undefined')
			{
				this._base=b;
				this.updateDessin();
			}
			return this._base;
		}


		
		//Getter/Setter de la couleur
		this.couleur=function(c)
		{
			if(typeof(c)!='undefined')
			{
				this._couleur=c;
				this._axeX.couleur(c);
				this._axeY.couleur(c);
			}
			return this._couleur;
		}

		//Renvoie la classe d'équivalence dans lequel il fait partie
		this.getClasse=function()
		{
			return this.parent.getClasse();
		}
		
	//==========================
	//Autres fonctions membres
	//==========================

		this.updateDessin=function()
		{
			
		}


	//==========================
	//Graphismes
	//==========================

	//Axe X :
	this._axeX=new Vecteur_Lie(this._origine,this.vx());
	this.addChild(this._axeX);
	
	//Axe Y :
	this._axeY=new Vecteur_Lie(this._origine,this.vy());
	this.addChild(this._axeY);

}
Repere.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
Repere.prototype.constructor = Repere;//On recopie le constructeur de Noeud dans son prototype



