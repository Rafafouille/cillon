var Schema = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		this._echelle=40;	//Nombre de pixel par unité
		this.classes=[];	//Liste des classes d'équivalence
		this._souris={x:0,y:0};
//		this._t0=0;	//Temps initiale du début de la simulation
		this._tSimulation = 0;	//Temps écoulé depuis le début de la simulation (pauses incluses)

	//==========================
	//getter/setter
	//==========================

		this.echelle=function(e)
		{
			if(typeof(e)!='undefined')
				this._echelle=e;
			return this._echelle;
		}
		
		//Fonction qui renvoie les coordonnées (en pixel) sur x d'un point du schéma
		this.x2X=function(x)
		{
			return x*this._echelle;
		}
		
		//Fonction qui renvoie les coordonnées (en pixel) sur y d'un point du schéma
		this.y2Y=function(y)
		{
			return -y*this._echelle;
		}
		
		//Fonction qui renvoie les coordonnées (dans la base de schema) sur x 
		this.X2x=function(X)
		{
			return X/this._echelle;
		}
		
		//Fonction qui renvoie les coordonnées (dans la base de schema) sur y 
		this.Y2y=function(Y)
		{
			return -Y/this._echelle;
		}
		
		
		//Fonction qui renvoie les coordonnées (dans la base de schema) sur y 
		this.nbClasses=function()
		{
			return this.classes.length;
		}
		
		//Souris **************************************
		
		//Coordonnées de la souris (local)
		this.souris=function(s)
		{
			if(typeof(s)!='undefined')
				this._souris=s;
			return this._souris;
		}
		this.xSouris=function(x)
		{
			if(typeof(x)!='undefined')
				this._souris.x=x;
			return this._souris.x;
		}
		this.ySouris=function(y)
		{
			if(typeof(y)!='undefined')
				this._souris.y=y;
			return this._souris.y;
		}
		//Coordonnées de la souris (en px)
		this.SOURIS=function(s)
		{
			if(typeof(s)!='undefined')
				this._souris={x:s.X/this._echelle,y:-s.Y/this._echelle};
			return {X:this._souris.x*this._echelle,Y:-this._souris.y*this._echelle};
		}
		this.XSOURIS=function(X)
		{
			if(typeof(X)!='undefined')
				this._souris.x=X/this._echelle;
			return this._souris.x*this._echelle;
		}
		this.YSOURIS=function(Y)
		{
			if(typeof(Y)!='undefined')
				this._souris.y=-Y/this._echelle;
			return -this._souris.y*this._echelle;
		}


		//Fonction qui renvoie la date initiale de la simulation depuis t0
		/*this.t0 = function(t0)
		{
			if(typeof(t0)!='undefined')
				this._t0=t0;
			return this._t0;
		}*/


		//Fonction qui renvoie le temps de la simulation depuis le début de la simu
		this.tSimulation = function(t)
		{
			if(typeof(t)!='undefined')
				this._tSimulation=t;
			return this._tSimulation
		}

	//==========================
	//Autres fonctions membres
	//==========================

		//Ajoute un classe au dessin
		this.ajouteClasse=function(c)
		{
			/*i=0
			while(this.classes[i] != undefined) //On cherche un numéro de classe non-utilisé
				i+=1;*/
			this.classes.push(c);
			//c.numero(i);
			var num = this.classes.length-1 ; //N° de la classe
			c.couleur(this.choisitCouleur(num));
			this.addChild(c);	//Ajoute graphiquement
		}
		
		this.choisitCouleur=function(i)
		{
			if(typeof(i) == 'undefined')
				i = this.classes.length; // On prend la 1ère couleur libre par defaut
			//liste_Couleurs=["black","red","blue","Green","Orange","Purple","SaddleBrown","Navy","Maroon","DeepSkyBlue","LimeGreen","DarkGoldenRod","Orchid"];
			liste_Couleurs=["#000000","#FF0000","#0000FF","#00FF00","#FF9900","#FF00FF","#990000","#000099","#00FFFF","#99FF00"];
			return liste_Couleurs[i%(liste_Couleurs.length)]
		}

		//Fonction qui demande à chaque CE de sauvegarder leur position.
		this.sauvePositions = function()
		{
			for(var i=0;i<this.classes.length;i++)
			{
				c= this.classes[i]
				c.sauveLastPosition();
			}
		}

		//Fonction qui demande à chaque CE de recharger leur dernière position sauvegardée.
		this.restorePositions = function()
		{
			for(var i=0;i<this.classes.length;i++)
			{
				c= this.classes[i]
				c.restoreLastPosition();
			}
		}
		
		
	//==========================
	//Graphismes
	//==========================
	
		//Repere (placé après avoir construit l'objet)

	//==========================
	//EVENEMENS
	//==========================
	
		ceci=this;
		this.updateSourisFromStagePosition=function(event)
		{
			var X=event.stageX;
			var Y=event.stageY;
			var posLoc=ceci.globalToLocal(X,Y);
			//console.log("x: "+posLoc.x+" ; y: "+posLoc.y);
			ceci.SOURIS({X:posLoc.x,Y:posLoc.y})
		}


		cela = this;
		this.addEventListener("tick",function(event){
		
				if(ACTION=="simule")
				{
					//console.log(">>>>>>>>>>>>>>>>>>>");
					//console.log(event);
					//console.log(event.delta);
					if(event.delta=="undefined")
						ACTION=""
					schema._tSimulation += event.delta/1000.	//On fait s'écouler le temps
					//console.log(schema._tSimulation);
					for(var i=0;i<PRECISION;i++)
						resout();
				}
			}); 

		
		

		

}
Schema.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
Schema.prototype.constructor = Schema;//On recopie le constructeur de Noeud dans son prototype



