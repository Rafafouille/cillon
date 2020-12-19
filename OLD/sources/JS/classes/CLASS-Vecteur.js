var Vecteur = function(_x_,_y_,_base_)
{

    _x_ = typeof _x_ !== 'undefined' ? _x_ : 0;
    _y_ = typeof _y_ !== 'undefined' ? _y_ : 0;


	//==========================
	//Constructeur issu de l'heritage
	//==========================

		//fabric.Group.call(this);
		Kinetic.Group.call(this);
		this._coord0={x:_x_,y:_y_};

	//==========================
	//Variables Membres
	//==========================

		this._id=idVecteur++;
		this._tailleFleche={longueur:0.5,largeur:0.35};
		this._couleur="red";	//Couleur du vecteur(string)
		this._longueurSupport=1000;	//Longueur de la droite qui sert de support (en px)
		this._afficheSupport=false;	//Dit si on affiche (ou non) le support en dur (booléen)
		this._rayonInfluence=20;	//Rayon de la zone (transparent) clicable du vecteur

	//==========================
	//getter/setter
	//==========================

	//n°id du vecteur
		this.id=function()
			{
				return this._id;
			}
	//Coordonnees par defaut du vecteur (tel qu'il va etre tracé dans le conteneur parent)
		this.coord0=function(c)
			{
				if(typeof(c)!='undefined')
					this._coord0=c;
				return this._coord0;
			}

	//Coordonnee X par defaut du vecteur (tel qu'il va etre tracé dans le conteneur parent)                                                                                                       
	    this.coord0X=function(cx)
		{
			if(typeof(cx)!='undefined')
				this._coord0.x=cx;
			return this._coord0.x;
		}


	//Coordonnee Y par defaut du vecteur (tel qu'il va etre tracé dans le conteneur parent)                                                                                                                
   	 this.coord0Y=function(cy)
	{
		if(typeof(cy)!='undefined')
		    this._coord0.y=cy;
		return this._coord0.y;
	}

	//Coordonnees Graphique (en pixel) pour le zoom par defaut                                                                                                                
	this.coord0Graphique=function()
	{
		var cg=getGraphCoord(this.coord0());
		return {x:cg.x,y:cg.y};
	}

	//Donne la taille de la fleche (coule longueur/largeur)
	this.tailleFleche=function(t)
	{
		if(typeof(t)!='undefined')
			this._tailleFleche=t;
		return this._tailleFleche;
	}

	//Donne la longueur de la fleche
	this.longueurFleche=function(l)
	{
		if(typeof(l)!='undefined')
			this._tailleFleche.longueur=l;
		return this._tailleFleche.longueur;
	}

	//Donne la largeur de la fleche    
	this.largeurFleche=function(l)
	{
		if(typeof(l)!='undefined')
			this._tailleFleche.largeur=l;
		return this._tailleFleche.largeur;
	}

	//Longueur du support
	this.longueurSupport=function(l)
	{
		if(typeof(l)!='undefined')
			this._longueurSupport=l;
		return this._longueurSupport;
	}

	//Longueur du support
	this.afficheSupport=function(a)
	{
		if(typeof(a)!='undefined')
			this._afficheSupport=a;
		return this._afficheSupport;
	}

	//Couleur du vecteur
	this.couleur=function(c)
		{
			if(typeof(c)!='undefined')
				{
					this._couleur=c;
					this.tige.stroke(c);
					this.fleche.fill(c);
					this.support.stroke(c);
				}
			return this._couleur;
		}
		
	//Longueur du support
	this.rayonInfluence=function(r)
	{
		if(typeof(r)!='undefined')
			this._rayonInfluence=r;
		return this._rayonInfluence;
	}
		
		
		
	//==========================
	//Autres fonctions membres
	//==========================


	this.norme=function()
	{
		return Math.sqrt(this.coord0().x*this.coord0().x+this.coord0().y*this.coord0().y);
	}

	//Renvoie le vecteur unitaire associé au vecteur
	this.vecteurUnitaire=function()
	{
		return {x:this.coord0().x/this.norme(),y:this.coord0().y/this.norme()};
	}
    
	//Renvoie le vecteur unitaire, tourné de +pi/2 (sens direct)
	this.vecteurUnitaireNormal=function()
	{
		var vu=this.vecteurUnitaire();
		return {x:-vu.y,y:vu.x};
	}


	//==========================
	//Graphismes
	//==========================

	this.tige=new Kinetic.Line({
				points :[0,0,
					       this.coord0Graphique().x-this.longueurFleche()*getGraphCoord(this.vecteurUnitaire()).x,
					       this.coord0Graphique().y-this.longueurFleche()*getGraphCoord(this.vecteurUnitaire()).y],
				  stroke: 'red',
				  width: 20
			      });
				  
	this.zoneInfluence=new Kinetic.Line({
					points :[0,0,
							this.coord0Graphique().x,
							this.coord0Graphique().y],
					stroke: "green",
					strokeWidth: this._rayonInfluence,
					lineCap: "round",
					opacity:0
		});

	var ceci=this
	this.fleche=new Kinetic.Shape({
					drawFunc:function(context){
									context.beginPath();
									context.moveTo(ceci.coord0Graphique().x,ceci.coord0Graphique().y);
									context.lineTo(ceci.coord0Graphique().x-ceci.longueurFleche()*getGraphCoord(ceci.vecteurUnitaire()).x+ceci.largeurFleche()/2*getGraphCoord(ceci.vecteurUnitaireNormal()).x,
											ceci.coord0Graphique().y-ceci.longueurFleche()*getGraphCoord(ceci.vecteurUnitaire()).y+ceci.largeurFleche()/2*getGraphCoord(ceci.vecteurUnitaireNormal()).y);
									context.lineTo(ceci.coord0Graphique().x-ceci.longueurFleche()*getGraphCoord(ceci.vecteurUnitaire()).x-ceci.largeurFleche()/2*getGraphCoord(ceci.vecteurUnitaireNormal()).x,
											ceci.coord0Graphique().y-ceci.longueurFleche()*getGraphCoord(ceci.vecteurUnitaire()).y-ceci.largeurFleche()/2*getGraphCoord(ceci.vecteurUnitaireNormal()).y);
									context.lineTo(ceci.coord0Graphique().x,ceci.coord0Graphique().y);
									context.closePath();
									context.fillStrokeShape(this);
								},
					fill: 'red'
					});
					
					
	this.support=new Kinetic.Line({
					points:[-this._longueurSupport/2*this.coord0Graphique().x,-this._longueurSupport/2*this.coord0Graphique().y,
							this._longueurSupport/2*this.coord0Graphique().x,this._longueurSupport/2*this.coord0Graphique().y],
					stroke: 'red',
					strokeWidth:0.5,
					opacity:0.5,
					dash: [20, 10,5,10],
					visible:false
					});

/*"M "+this.coord0Graphique().x+" "+this.coord0Graphique().y+
				" L "+(this.coord0Graphique().x-this.longueurFleche()*getGraphCoord(this.vecteurUnitaire()).x+this.largeurFleche()/2*getGraphCoord(this.vecteurUnitaireNormal()).x)+
				" "+(this.coord0Graphique().y-this.longueurFleche()*getGraphCoord(this.vecteurUnitaire()).y+this.largeurFleche()/2*getGraphCoord(this.vecteurUnitaireNormal()).y)+
				" L "+(this.coord0Graphique().x-this.longueurFleche()*getGraphCoord(this.vecteurUnitaire()).x-this.largeurFleche()/2*getGraphCoord(this.vecteurUnitaireNormal()).x)+
                                " "+(this.coord0Graphique().y-this.longueurFleche()*getGraphCoord(this.vecteurUnitaire()).y-this.largeurFleche()/2*getGraphCoord(this.vecteurUnitaireNormal()).y));*/

	this.add(this.zoneInfluence);
	this.add(this.support);
	this.add(this.tige);
	this.add(this.fleche);


	//==========================
	//Evenements
	//==========================

		this.on("mouseover",function(){
										this.support.visible(true);scene.draw();
									});	//Pour aller plus vite : ajouter if(!this._afficheSupport)
		this.on("mouseout",function(){
										if(!this._afficheSupport)
											{this.support.visible(false);scene.draw();}
									});
		this.on("dblclick",function(){
										console.log("dbclcik");
										if(this._afficheSupport)
										{
											this.afficheSupport(false);
											this.support.visible(false);
										}
										else
										{
											this.afficheSupport(true);
											this.support.visible(true);
										}
									});
		

	//==========================
	//Construction...
	//==========================



}
Vecteur.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
Vecteur.prototype.constructor = Vecteur;//On recopie le constructeur de Noeud dans son prototype



