
//Classe d'équivalence
var Classe_Equivalence = function(_param_)
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		//Paramètres par défaut
		//this._numero=-1;	//Numéro de la classe
		this._nom="";
		this._couleur="black";	//Couleur de la classe
		this.liste_liaisons=[]	//Liste de toutes les référence des demi-liaisons concernées par la classe
		this._bloque = false; //Si la pièce ne doit pas bouger (bati)
		this._lastPosition = {x:0,y:0,theta:0}	//Dernière position sauvegarder (pour rétablir après simulation)
		
		//Paramètres fournis en argument du constructeur

	//==========================
	//getter/setter
	//==========================

		this.numero=function()
		{
			return schema.classes.indexOf(this);
		}
		this.nom=function(n)
		{
			if(typeof(n)!='undefined')
				this._nom=n;
			if(this._nom=="")
				return "Classe n°"+this.numero();
			return this._nom;
		}

		this.couleur=function(c)
		{
			if(typeof(c)!='undefined')
			{
				this._couleur=c;
				this._repere.couleur(c);
			}
			return this._couleur;
		}
		
		
	//===========
	
		//Getter/Setter des coordonnées dans le repere local
		//Setter : de la forme {x:,y:,theta:} (en unité local et en radian dans le sens trigo)
		//Getter : renvoie la même chose que ci-dessus.
		this.coord=function(c)
		{
			if(typeof(c)!='undefined')
			{
				this.x=c.x*this.echelle();
				this.y=-c.y*this.echelle();
				this.rotation=-c.theta/Math.PI*180;
			}
			return {x:this.x/this.echelle(),y:-this.y/this.echelle(),thete:-this.rotation/180*Math.PI};
		}
		
		//Coordonnées sur x dans la base locale
		this.xx=function(xx)
		{
			if(typeof(xx)!='undefined')
				this.x=xx*this.echelle();
			return this.x/this.echelle();
		}
		
		//Coordonnées sur y dans la base locale
		this.yy=function(yy)
		{
			if(typeof(yy)!='undefined')
				this.y=-yy*this.echelle();
			return -this.y/this.echelle();
		}
		
		//Angle de rotation (en radian, dans le sens trigo)
		this.theta=function(t)
		{
			if(typeof(t)!='undefined')
				this.rotation=-t/Math.PI*180;
			return this.rotation/180*Math.PI;
		}


		this.echelle=function()
		{
			return schema.echelle();
		}
		
		this.bloque=function(b)
		{
			if(typeof(b)!='undefined')
				this._bloque=Boolean(b)
			return this._bloque;
		}
		
		
		this.lastPosition=function()
		{
			return this._lastPosition;
		}
	//===============
	//Autres fonctions membres
	//==========================
	
	
		//Fonction qui renvoie les coordonnées de la souris captées par le schéma, dans les coordonnées locales de la classe d'équivalence
		// Renvoie {x: ... , y: ....}
		this.getSourisLocal=function()
		{
			return schema.localToLocal(schema.XSOURIS(),schema.YSOURIS(),this);
		}
	

		//Fonction qui ajoute une demi-liaison
		this.ajouteDemiLiaison = function(_demiLiaison,_centre)
		{
			//Ajout graphique
			this.addChild(_demiLiaison);
			var position = schema.localToLocal(_centre.x,_centre.y,this);
			_demiLiaison.x=position.x;
			_demiLiaison.y=position.y;
			
			//Ajout dans la liste de liaisons
			this.liste_liaisons.push(_demiLiaison);
		}

		//Fonction qui remplis le système à résoudre
		this.remplitSysteme=function(K,F)
		{
			if(this._bloque)
			{
				n=this.numero()
				for(i=0;i<3;i++)
				{
					K.set([3*n+i,3*n+i],1)
				}
			}
			else
			{
				for(var i=0;i<this.liste_liaisons.length;i++)
				{
					liaison = this.liste_liaisons[i];
					//On recupere les bouts de matrice
					var miniSystemeLiaison = liaison.remplisSysteme_liaison(K,F)
				}
			}
				
		}
		
		
		// Enregistre la position courante (avant simulation, par exemple)
		this.sauveLastPosition = function()
		{
			this._lastPosition = {x:this.x,y:this.y,theta:this.rotation}
		}
		//Restore la position courante (après simulation, par exemple)
		this.restoreLastPosition = function()
		{
			this.x=this._lastPosition.x;
			this.y=this._lastPosition.y;
			this.rotation=this._lastPosition.theta;
		}
		
		
		//Fonction qui décale l'origine de la pièce pour quelle soit au barycentre des liaisons (améliore le conditionnement de la matrice)
		this.recentreOrigine = function()
		{
			if(this.liste_liaisons.length==0)
				return;
		
			//recherche du barycentre des liaisons, dans le repère local
			var barycentre = {x:0,y:0}
			for(var i=0; i<this.liste_liaisons.length; i++)
			{
				var liaison_i = this.liste_liaisons[i];
				barycentre.x += liaison_i.x;
				barycentre.y += liaison_i.y;
			}
			barycentre.x/=this.liste_liaisons.length;
			barycentre.y/=this.liste_liaisons.length;
			
			//déplacement des éléments (liaison et autres objet)
			for(var i=0; i<this.children.length; i++)
			{
				var element_i = this.children[i];
				element_i.x -= barycentre.x;
				element_i.y -= barycentre.y;
			}
			//déplacement de la pièce pour revenir dans la même position
			var bary_global = this.localToLocal(barycentre.x, barycentre.y, this.parent)
			this.x += bary_global.x-this.x;
			this.y += bary_global.y-this.y;
		}
	//==========================
	//Graphismes
	//==========================
	
		this._repere=new Repere({x:0,y:0},0);
		this.addChild(this._repere);
		

	//==========================
	//Evénements
	//==========================
	
	
}


Classe_Equivalence.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
Classe_Equivalence.prototype.constructor = Classe_Equivalence;//On recopie le constructeur de Noeud dans son prototype
