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
//		this._nbClasses=0; //Nombre de classes (ça évite de recompter dans this.classes à chaque fois)
		this._souris={x:0,y:0};

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
			liste_Couleurs=["black","red","blue","Green","Orange","Purple","SaddleBrown","Navy","Maroon","DeepSkyBlue","LimeGreen","DarkGoldenRod","Orchid"];
			return liste_Couleurs[i%(liste_Couleurs.length)]
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



		this.addEventListener("tick",function(){
				ceci.classes[0].rotation+=0.2;
				resout();
			});


}
Schema.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
Schema.prototype.constructor = Schema;//On recopie le constructeur de Noeud dans son prototype



