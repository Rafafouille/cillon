var PivotAnimee=function(_P1_,_P2_)
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

	Kinetic.Group.call(this); 

	//==========================
	//Variables Membres
	//==========================

	this._piece1=_P1_;		//reference vers Piece1
	this._piece2=_P2_;		//reference vers Piece2
	this._alpha=0;			//Angle d'orientation
	this._rayon=10;			//Rayon de la pivot
	this._vitesse1=1;		//Vitesse de mouvement de 1
	this._vitesse2=Math.PI;	//Vitesse de mouvement de 2

	//==========================
	//getter/setter
	//==========================

		//Pièce 1
		this.piece1=function(p)
		{
			if(typeof(p)!='undefined')
			{
				this._piece1=p;
				this.redessine();
			}
			return this._piece1;
		}
		//Pièce 2
		this.piece2=function(p)
		{
			if(typeof(p)!='undefined')
			{
				this._piece2=p;
				this.redessine();
			}
			return this._piece2;
		}

		//Couleur Pièce 1
		this.couleur1=function()
		{
			return this._piece1.couleur();
		}
		//Couleur Pièce 2
		this.couleur2=function()
		{
			return this._piece2.couleur();
		}

		//Epaisseur Pièce 1
		this.epaisseur1=function()
		{
			return this._piece1.epaisseur();
		}
		//Epaisseur Pièce 2
		this.epaisseur2=function()
		{
			return this._piece2.epaisseur();
		}
		//Vitesse 1
		this.vitesse1=function(v)
		{
			if(typeof(v)!='undefined')
				this._vitesse1=v;
			return this._vitesse1;
		}
		//Vitesse 2
		this.vitesse2=function(v)
		{
			if(typeof(v)!='undefined')
				this._vitesse2=v;
			return this._vitesse2;
		}

	
		
		//Rayon de la pivot
		this.rayon=function(r)
		{
			if(typeof(r)!='undefined')
			{
				if(r<0) r=0;
				this._rayon=r;
				this.cercle.radius(r);
			}
			return this._rayon;
		}

	//==========================
	//Autres fonctions membre
	//==========================
		

		//Fonction qui redessine
		this.redessine=function(r)
		{
			this.cercle.radius(this._rayon);
			this.cercle.stroke(this.couleur1());
			this.cercle.strokeWidth(this.epaisseur1());

			this.trait1.stroke(this.couleur1());
			this.trait1.strokeWidth(this.epaisseur1());

			this.trait2.stroke(this.couleur2());
			this.trait2.strokeWidth(this.epaisseur2());
		}


	//==========================
	//Graphismes
	//==========================

	this.cercle=new Kinetic.Circle({
			radius: this._rayon,
			stroke: this.couleur1(),
			strokeWidth: this.epaisseur1(),
			fill: 'white',
		});
	this.trait1=new Kinetic.Line({
			points:[0,0,2*this._rayon*Math.cos(this._alpha),2*this._rayon*Math.sin(this._alpha)],
			stroke: this.couleur1(),
			strokeWidth:  this.epaisseur1()
		});
	this.trait2=new Kinetic.Line({
			points:[0,0,2*this._rayon*Math.cos(Math.PI-this._alpha),2*this._rayon*Math.sin(Math.PI-this._alpha)],
			stroke: this.couleur2(),
			strokeWidth:  this.epaisseur2()
		});

	this.backgnd=new Kinetic.Rect({
			width: 10000,
			height: 10000,
			x:-5000,
			y:-5000,
			fill: 'red',
			opacity:0
		});


	this.add(this.backgnd);
	this.add(this.trait2);
	this.add(this.trait1);
	this.add(this.cercle);


	//==========================
	//Evénements
	//==========================

	var ceci=this;
	this.fonctionAnimation=function(frame)
	{	//Souris
		var test=scene.getPointerPosition();
		if(test!== undefined)
		{
			var px=scene.getPointerPosition().x-scene.calqueSelection.x();
			var py=scene.getPointerPosition().y-scene.calqueSelection.y();
			ceci.x(px);
			ceci.y(py);
		}
		//Rotation
		ceci._alpha=frame.time*0.001;
		ceci.trait1.points([0,0,2*ceci._rayon*Math.cos(ceci._alpha*ceci._vitesse1),2*ceci._rayon*Math.sin(ceci._alpha*ceci._vitesse1)]);
		ceci.trait2.points([0,0,2*ceci._rayon*Math.cos(Math.PI-ceci._alpha*ceci._vitesse2),2*ceci._rayon*Math.sin(Math.PI-ceci._alpha*ceci._vitesse2)]);
	}
	this.animation=new Kinetic.Animation(
		this.fonctionAnimation,
		scene.calqueSelection
	);


	//Mise en place de la liaison au click
	this.on("click",function(){
		//Création des demi-liaisons
		var demiPivot1=new DemiPivot();
		var demiPivot2=new DemiPivot();
		demiPivot2.rotation(180);
		//Ajoute dans chaque piece
		this._piece1.ajouteLiaison(demiPivot1);
		this._piece2.ajouteLiaison(demiPivot2);
		//Placement
		var pos1=this._piece1.global2local(scene.getPointerPosition());
		var pos2=this._piece2.global2local(scene.getPointerPosition());
		demiPivot1.position(pos1);
		demiPivot2.position(pos2);
		//Lien entre les demi-liaisons
		demiPivot1.partenaire(demiPivot2);
		demiPivot2.partenaire(demiPivot1);
		scene.draw();
	});
}

PivotAnimee.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
PivotAnimee.prototype.constructor = PivotAnimee;//On recopie le constructeur de Noeud dans son prototype

