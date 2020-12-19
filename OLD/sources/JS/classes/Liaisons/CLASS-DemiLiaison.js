var DemiLiaison=function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

	Kinetic.Group.call(this);

	//==========================
	//Variables Membres
	//==========================

	this._partenaire=null;	//Partinaire
	this._couleur='black';	//Couleur de la liaison
	this._rigiditeLiaison=RAIDEUR_LIAISONS;	//Rigidité (pénalisation...)
	
	//==========================
	//getter/setter
	//==========================
		//Référence vers une autre demi-liaison
		this.partenaire=function(p)
		{
			if(typeof(p)!='undefined')
				this._partenaire=p;
			return this._partenaire;
		}
		
		//Couleur
		this.couleur=function(c)
			{
				if(typeof(c)!='undefined')
					this._couleur=c;
				return this._couleur;
			}
			
		//Rigidité de la liaison (au sens de la pénalité)
		this.rigiditeLiaison=function(r)
		{
			if(typeof(r)!='undefined')
				this._rigiditeLiaison=r;
			return this._rigiditeLiaison;
		}

	
	

	//==========================
	//Autres fonctions membres
	//==========================
	
		//Calcul l'énergie de penalité
		this.penalite=function()
		{
			return null;
		}

	//==========================
	//Graphismes
	//==========================

	//==========================
	//Evenements
	//==========================

	//==========================
	//Construction...
	//==========================

}

DemiLiaison.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
DemiLiaison.prototype.constructor = DemiLiaison;//On recopie le constructeur de Noeud dans son prototype

