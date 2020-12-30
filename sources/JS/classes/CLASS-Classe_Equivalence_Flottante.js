
//Classe d'équivalence
var Classe_Equivalence_Flottante = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);


	//==========================
	//Variables Membres
	//==========================

		this._couleur = schema.choisitCouleur();

	//==========================
	//getter/setter
	//==========================



		this.couleur=function(c)
		{
			if(typeof(c)!='undefined')
			{
				this._couleur=c;
				this._repere.couleur(c);
			}
			return this._couleur;
		}
		
		

	
		
		
		
	//==========================
	//Autres fonctions membres
	//==========================
	
		cela=this;
		this.placeCE = function()
		{
			var CE = new Classe_Equivalence();
			CE.x = suiveur.x;
			CE.y = suiveur.y;
			schema.ajouteClasse(CE);
			cela.parent.removeChild(cela); //Supprime la classe flottante	
		}
	
	//==========================
	//Graphismes
	//==========================
	
		this._repere=new Repere({x:0,y:0},0);
		this._repere.couleur(this._couleur);
		this.addChild(this._repere);
		

	//==========================
	//Evénements
	//==========================
	
		this.addEventListener("click", this.placeCE)
}


Classe_Equivalence_Flottante.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
Classe_Equivalence_Flottante.prototype.constructor = Classe_Equivalence_Flottante;//On recopie le constructeur de Noeud dans son prototype
