var Repere = function()
{

  


	//==========================
	//Constructeur issu de l'heritage
	//==========================

		//fabric.Group.call(this);
		Kinetic.Group.call(this);

	//==========================
	//Variables Membres
	//==========================

		this._id=idRepere++;

	//==========================
	//getter/setter
	//==========================

	//n°Id du repere
		this.id=function(c)
			{
				return this._id;
			}
	

	//==========================
	//Autres fonctions membres
	//==========================


	


	//==========================
	//Graphismes
	//==========================

	this.vX=new Vecteur(0,1);
	this.vY=new Vecteur(1,0);

	
	this.add(this.vX);
	this.add(this.vY);


	//==========================
	//Evenements
	//==========================

		
		

	//==========================
	//Construction...
	//==========================



}
Repere.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
Repere.prototype.constructor = Repere;//On recopie le constructeur de Noeud dans son prototype



