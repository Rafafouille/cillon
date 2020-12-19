//Pivot animée, en attendant d'être placée

var PivotFlottante = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);


	//==========================
	//Variables Membres
	//==========================
	
	

	//==========================
	//getter/setter
	//==========================

	

	//==========================
	//Autres fonctions membres
	//==========================
	
	
		var cela=this;
		//Fonction qui "pose" la liaison sur chacune des classes d'équivalence sélectionnée
		this.poseLiaison=function()
		{
			ajouteLiaison();
			schema.removeChild(cela);
		}

	//==========================
	//Graphismes
	//==========================
	
		this._pivotFemelle=new PivotFemelle();
		this.addChild(this._pivotFemelle);
		
		this._pivotMale=new PivotMale();
		this.addChild(this._pivotMale);
		
	//==========================
	// Animation
	//==========================

		this.updateAnimation=function(a)
		{
			//Update Dessin
			this._pivotMale.rotation+=1.2;
			this._pivotFemelle.rotation-=3;
			
			/*this.x=schema.XSOURIS();
			this.y=schema.YSOURIS();*/
			
			this._pivotMale.couleur(getClasse1().couleur());
			//console.log(getClasse1().couleur());
			this._pivotFemelle.couleur(getClasse2().couleur());
		}
		var cela=this
		this.addEventListener("tick",function(){cela.updateAnimation()});
		
	
	
	//==========================
	// Evenements
	//==========================
		
	//Quand on clique, il faut créer la liaison sur chaque classe d'équivalence
		this.addEventListener("click",this.poseLiaison);
		

}
PivotFlottante.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
PivotFlottante.prototype.constructor = PivotFlottante;//On recopie le constructeur de Noeud dans son prototype



