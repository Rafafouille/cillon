
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
		this._selectionne = false;	//Dit si on est actuellement sélectionné
		this._type = "classe";	//Type d'objet
		
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
				for(var i=0;i<this.schema.children.length;i++)
				{
					var enfant = this.schema.children[i];
					if(enfant.couleur && typeof(enfant.couleur) === "function")	//Si la méthode couleur existe et que c'est une fonction
						enfant.couleur(c);
				}
				for(var i=0;i<this.image.children.length;i++)
				{
					var enfant = this.image.children[i];
					if(enfant.couleur && typeof(enfant.couleur) === "function")	//Si la méthode couleur existe et que c'est une fonction
						enfant.couleur(c);
				}
				for(var i=0;i<this.annotations.children.length;i++)
				{
					var enfant = this.annotations.children[i];
					if(enfant.couleur && typeof(enfant.couleur) === "function")	//Si la méthode couleur existe et que c'est une fonction
						enfant.couleur(c);
				}
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
		
		
		this.type=function()
		{
			return this._type;
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
			this.schema.addChild(_demiLiaison);
			_demiLiaison.classe(this);	//On ajoute la ref vers la classe
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
			for(var i=0; i<this.image.children.length; i++)
			{
				var element_i = this.image.children[i];
				element_i.x -= barycentre.x;
				element_i.y -= barycentre.y;
			}
			for(var i=0; i<this.schema.children.length; i++)
			{
				var element_i = this.schema.children[i];
				element_i.x -= barycentre.x;
				element_i.y -= barycentre.y;
			}
			for(var i=0; i<this.annotations.children.length; i++)
			{
				var element_i = this.annotations.children[i];
				element_i.x -= barycentre.x;
				element_i.y -= barycentre.y;
			}
			//déplacement de la pièce pour revenir dans la même position
			var bary_global = this.localToLocal(barycentre.x, barycentre.y, this.parent)
			this.x += bary_global.x-this.x;
			this.y += bary_global.y-this.y;
		}
		
		
		// Fonction qui floute la CE
		this.floute = function()
		{
			this.filters = [new createjs.BlurFilter(5, 5, 10)] //Filtre flou
			
			// On met en cache la CL (dans un rectangle dont on calcule les dimensions). Voir la doc
			this.updateBounds();
			var bounds = this.getBounds();
			var boundsFlou = this.filters[0].getBounds() //Padding en plus lié au flou
			//console.log("<<<<<<<<<<<<<<<<<<<<<<<");
			//console.log(bounds);
			//console.log(boundsFlou)
			this.cache(bounds.x+boundsFlou.x, 	bounds.y+boundsFlou.y, 	bounds.width+boundsFlou.width, 	bounds.height+boundsFlou.height ) //On met en cache (nécessaire)
			//this.cache(-1000, 	-1000, 	2000,2000 ) 
			this.alpha = 0.25;
		}
		
		this.updateBounds = function()
		{
			var xmin=0;
			var ymin=0;
			var xmax=0;
			var ymax=0;
			
			if(this.schema.getBounds()!=null)
			{
				var b_schema = this.schema.getBounds();
				xmin=b_schema.x;
				ymin=b_schema.y;
				xmax=b_schema.x+b_schema.width;
				ymax=b_schema.y+b_schema.height;
			}
			
			if(this.image.getBounds()!=null)
			{
				var b_image= this.image.getBounds();
				xmin=Math.min(xmin,b_image.x);
				ymin=Math.min(ymin,b_image.y);
				xmax=Math.max(xmax,b_image.x+b_image.width);
				ymax=Math.max(ymax,b_image.y+b_image.height);
			}
			
			if(this.annotations.getBounds()!=null)
			{

				var b_annotations = this.annotations.getBounds();
				xmin=Math.min(xmin,b_annotations.x);
				ymin=Math.min(ymin,b_annotations.y);
				xmax=Math.max(xmax,b_annotations.x+b_annotations.width);
				ymax=Math.max(ymax,b_annotations.y+b_annotations.height);
				// A compléter avec les autres groupes (
			}
			
			this.setBounds(xmin,ymin,xmax-xmin,ymax-ymin);
		}
		
		// Fonction qui défloute
		this.defloute = function()
		{
			this.filters = null
			this.uncache();
			this.alpha=1;
		}
		
		
		// Fonction qui sélectionne la CL (met en surbrillance, tout ça)
		this.selectionne = function()
		{
			deselectionneToutLeMonde(); //On vire tous les autres
			CLASSE = this.numero()
			update_info_CE(this);	//Met à jour la zone d'info
			
			for(var i=0;i<schema.classes.length;i++)
			{
				if(i!=CLASSE)
					schema.classes[i].floute()
			}
			this._selectionne = true;
		}
		
		
		//Fonction qui retire la surbrillance, etc...
		this.deselectionne = function()
		{
			for(var i=0;i<schema.classes.length;i++)
			{
				if(i!=CLASSE)
					schema.classes[i].defloute()
			}
			this._selectionne = false;
			CLASSE = -1;
		}
		
		//Fonction qui switch le mode sélectionné / désélectionné
		this.selectionneDeselectionne=function()
		{
			if(this._selectionne)
			{
				this.deselectionne();			
				$("#info_classe").hide(400);
			}
			else
			{
				$("#info_classe").show(400);
				this.selectionne();
			}
		}
		
		
		//Fonction qui dessine une ligne, (enregistre ses bornes) et l'ajoute à la classe
		//Renvoie un ref de la ligne
		this.dessineLigne = function(a,b,c,d)
		{
		
			var ligne = new Ligne(a,b,c,d);
			ligne.couleur(this._couleur);
			this.schema.addChild(ligne)
			
				
		
			
			return ligne
		}
		
	//==========================
	//Graphismes
	//==========================
		this.image = new createjs.Container()
		this.addChild(this.image);
		this.schema = new createjs.Container()
		this.addChild(this.schema);
		this.annotations = new createjs.Container()
		this.addChild(this.annotations);
		
		this._repere=new Repere({x:0,y:0},0);
		this.annotations.addChild(this._repere);
		


	//==========================
	//Evénements
	//==========================
		this.cursor="pointer";
			
		this.addEventListener("click",function(event)
			{
				if(ACTION == "SELECTION")
				{
					cible = event.target;
					trouveClasse(cible).selectionneDeselectionne();
				}
			})
	
	
	
}


Classe_Equivalence.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
Classe_Equivalence.prototype.constructor = Classe_Equivalence;//On recopie le constructeur de Noeud dans son prototype
