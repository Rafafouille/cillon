
//Vecteur lié à un point.
//2 constructions :
//Vecteur_Lie(bipoint)
//Vecteur_Lie(point,vecteur)
var Vecteur_Lie = function(__arg1__,__vecteur__)
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);


	//==========================
	//Variables Membres
	//==========================
	
	
		if(__arg1__ instanceof Bipoint)//Si appel Vecteur_Lie(bipoint)
		{
			__point__=__arg1__.p1();
			__vecteur__=__arg1__.vecteur();
		}
		else //Si appel Vecteur_Lie(point,vecteur)
		{
			__point__=__arg1__;
		}
		
	
		this._point=__point__;		//{x,y}
		this._vecteur=__vecteur__;	//de type vecteur
		this._couleur="black";
		this._rayonClicable=20;	//En pixel

	//==========================
	//getter/setter
	//==========================

		//Getter/Setter de P1
		this.point=function(p)
		{
			if(typeof(p)!='undefined')
			{
				this._point=p;
				this.updateDessin();
			}
			return this._point;
		}
		//Getter/Setter du vecteur
		this.vecteur=function(v)
		{
			if(typeof(v)!='undefined')
			{
				this._vecteur=v;
				this.updateDessin();
			}
			return this._vecteur;
		}

		
		//Getter/Setter de la couleur
		this.couleur=function(c)
		{
			if(typeof(c)!='undefined')
			{
				this._couleur=c;
				this._bipoint.couleur(c);
				this._axe.graphics._stroke.style=c;
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
			this._bipoint.p1(this._point);
			this._bipoint.p2({x:this._point.x+this._vecteur.dx(),y:this._point.y+this._vecteur.dy()});
			
			this._zoneClicable.graphics._activeInstructions[0].x=this._bipoint.X1();
			this._zoneClicable.graphics._activeInstructions[0].y=this._bipoint.Y1();
			
			
		}


	//==========================
	//Graphismes
	//==========================

		//Vecteur
		this._bipoint=new Bipoint(this._point,this._vecteur);
			this.addChild(this._bipoint);
		//Zone clicable
		this._zoneClicable=new createjs.Shape();
		this._zoneClicable.graphics.setStrokeStyle(this._rayonClicable,"round").beginStroke(this._couleur)
			.moveTo(this._bipoint.X1(),this._bipoint.Y1())
			.lineTo(this._bipoint.X2(),this._bipoint.Y2());
		this._zoneClicable.alpha=0.01;
		this.addChild(this._zoneClicable);
		//Axe
		this._axe=new createjs.Shape();
		this._axe.graphics.beginStroke(this._couleur)
			.setStrokeDash([15,5,5,5])
			.moveTo(this._bipoint.X1()-this._vecteur.DX()*10,this._bipoint.Y1()-this._vecteur.DY()*10)
			.lineTo(this._bipoint.X2()+this._vecteur.DX()*10,this._bipoint.Y2()+this._vecteur.DY()*10);
		this._axe.alpha=0.2;
		this.addChild(this._axe);
		
		this.cursor="pointer";
	
	//==========================
	//Evénements
	//==========================
	
		this.fonctionMouseOver=function(evt)
		{
			//dessin.canvas.style.cursor = "pointer";
			this._axe.alpha=1;
			//dessin.update();
		}
		this.fonctionMouseOut=function(evt)
		{
			this._axe.alpha=0.2;
			//dessin.update();
		}
		
		this.on("mouseover",this.fonctionMouseOver);
		this.on("mouseout",this.fonctionMouseOut);
		

}
Vecteur_Lie.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
Vecteur_Lie.prototype.constructor = Vecteur_Lie;//On recopie le constructeur de Noeud dans son prototype
