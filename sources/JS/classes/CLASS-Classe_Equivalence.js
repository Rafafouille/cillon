
// Class: Classe_Equivalence
// Classe qui représente une classe d'équivalence
// Hérite de <createjs.Container>
/*
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
		
		// Variable : this._nom
		// (String) Nom de la classe d'équivalence
		this._nom="";
		this._couleur="black";	//Couleur de la classe
		this.liste_liaisons=[]	//Liste de toutes les référence des demi-liaisons concernées par la classe
		this._bloque = false; //Si la pièce ne doit pas bouger (bati)
		this._lastPosition = {x:0,y:0,theta:0}	//Dernière position sauvegarder (pour rétablir après simulation)
		this._selectionne = false;	//Dit si on est actuellement sélectionné
		this._type = "classe";	//Type d'objet
		this._historique = []	//Historique des positions (tableau de tableaux de la forme [[t0,x0,y0,theta0], [t1,x1,y1 .....]
		this._longueurHistorique = 5 ; //Nombre de position qu'on garde
		
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
				for(var i=0;i<this.images.children.length;i++)
				{
					var enfant = this.images.children[i];
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
		
		
		this.longueurHistorique = function(l)
		{
			if(typeof(l)!='undefined')
				this._longueurHistorique=l
			return this._longueurHistorique;
		}
		//Renvoie la i-ème position en partant de la plus récente vers la plus vieille
		//Si i absent : renvoie tout le vecteur
		//i =1 pour la position la plus récente
		//Renvoie la plus vieille valeur si on dépasse
		this.historique=function(i)
		{
			if(typeof(i)=="undefined")
				return this._historique;
			if(this._historique.length==0)
				return [0,this._lastPosition.x,this._lastPosition.y,this._lastPosition.theta]
			if(i<1)
				return null;
			if(i>this._historique.length) //Si on remonte trop loin...
				return this._historique[0]; //Renvoie la plus vieille
			return this._historique[this._historique.length-i]
		}
		
		
		//Ajoute une position à l'historique (et supprime la plus vieille)
		this.pushHistorique=function(_date,_x,_y,_theta)
		{
			this._historique.push([_date,_x,_y,_theta]);
			if(this._historique.length>this._longueurHistorique)
				this._historique.shift();
		}
		
		
		
		// TORSEUR CINEMATIQUE
		
		this.getVRotation = function()
		{
			var a1 = this.historique(1);
			var a2 = this.historique(3);
			var a3 = this.historique(5);
			return deriveGauche3pts({x:a3[0],y:a3[3]},{x:a2[0],y:a2[3]},{x:a1[0],y:a1[3]})
		}
		
		//renvoie le torseur
		this.getTorseurCinematique=function(P)
		{
			
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
			this.recentreOrigine();
		}
		
		//Fonction qui supprime la demi-liaison
		this.supprimeDemiLiaison = function(_demiLiaison)
		{
			var index = this.liste_liaisons.indexOf(_demiLiaison); //Trouve l'objet dans la liste des liaison
			if (index > -1)
			{
				console.log("supprime")
				//Supprime la demi-liaison
				this.liste_liaisons.splice(index, 1);//On la vire de la liste
				this.schema.removeChild(_demiLiaison);	//On la vire du container
				//this.recentreOrigine();
				//Supprime la demi-soeur
				if(_demiLiaison._demiSoeur)	//Supperssion de la demi-soeur
				{
					_demiLiaison._demiSoeur._demiSoeur = null; //On casse le lien pour pas faire de boucle infinie
					_demiLiaison._demiSoeur.autoSupprime();
				}
			}
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
//			for(var i=0; i<this.images.children.length; i++)
//			{
//				var element_i = this.images.children[i];
//				element_i.x -= barycentre.x;
//				element_i.y -= barycentre.y;
//			}
			this.images.x -= barycentre.x;
			this.images.y -= barycentre.y;
			
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
			this.cache(bounds.x+boundsFlou.x, 	bounds.y+boundsFlou.y, 	bounds.width+boundsFlou.width, 	bounds.height+boundsFlou.height ) //On met en cache (nécessaire)
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
			
			if(this.images.getBounds()!=null)
			{
				var b_image= this.images.getBounds();
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
		//si repereDirect =true : Y est vers le haut. Si false : Y est vers le bas
		this.dessineLigne = function(a,b,c,d,repereDirect = true)
		{
			if(repereDirect)
				var ligne = new Ligne(a,-b,c,-d);
			else
				var ligne = new Ligne(a,b,c,d);
			ligne.couleur(this._couleur);
			this.schema.addChild(ligne)
			
			return ligne
		}
		
		// Fonction qui ajoute une image à la CE
		// _image = str
		this.ajouteImage = function(_image,_x=0,_y=0,_rot=0,_scale=1)
		{
			var img = new createjs.Bitmap("dessins/"+_image);
			this.images.addChild(img);
			img.x=_x;
			img.y=_y;
			img.rotation=_rot;
			img.scaleX=img.scaleY=_scale;
		}
		
	//==========================
	//Graphismes
	//==========================
		this.images = new createjs.Container()
		this.addChild(this.images);
		this.schema = new createjs.Container()
		this.addChild(this.schema);
		this.annotations = new createjs.Container()
		this.addChild(this.annotations);
		
		this._repere=new Repere({x:0,y:0},0);
		this.annotations.addChild(this._repere);
		


	//==========================
	//Evénements
	//==========================
		this.cursor="pointer"; // Pour le CSS de la
			
		this.addEventListener("click",function(event)
			{
				if(ACTION == "SELECTION")
				{
					cible = event.target;
					trouveClasse(cible).selectionneDeselectionne();
				}
			})
	
		this.addEventListener("mousedown",function(event)
			{
				if(ACTION == "MANIP" && SOUS_ACTION == "PREPARE")
				{
					cible = event.target;
					classe = trouveClasse(cible)
					CLASSE = classe.numero()
					videSuiveur();
					classe.accroche = new Accroche();
					classe.ajouteDemiLiaison(classe.accroche,schema.globalToLocal(event.stageX,event.stageY))
					classe.recentreOrigine();
					
					
					SOUS_ACTION = "TIRE";
				}
			})
	
}


Classe_Equivalence.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
Classe_Equivalence.prototype.constructor = Classe_Equivalence;//On recopie le constructeur de Noeud dans son prototype

*/



/**
 * Objet (graphique) représentant une classe d'équivalence.
 * @extends createjs.Container
 */
class Classe_Equivalence extends createjs.Container
{

	// **********************************************************
	/**
	 * Constructeur
	 * @param {Object} _opt - [FACULTATIF] Options de création de la classe d'équivalence. L'objet complet est de la forme : {pos:..., couleur:..., bloque:...}, mais seuls les informations strictement nécessaires peuvent être renseignées. pos est de type {@link Position} (par défaut : l'origine de {@link SCHEMA}) ; couleur est STRING ; bloque est un booléen (si la pièce est bloquée, référentiel, etc.)
	 */
	constructor(_opt)
	{
		super()	// Rappelle le constructeur parent
		
		// PARAMETRES
			var options = { pos: {x:0,y:0,theta:0,contexte:SCHEMA} , couleur:"#000000", bloque:false } ;	//Paramètres par défaut
			ecraseOptions(options,_opt) ;	// Mise à jour des paramètres en fonction de ce que l'utilisateur passe
			
			var position = convertPosition(options.pos,SCHEMA,false);	// Converti la position (px, par rapport à SCHEMA)
			
			this.x = position.x ;
			this.y = position.y ;
			this.rotation = position.theta ;
			this.couleur(options.couleur) ;
			this.bloque(options.bloque) ;
			
			this.cursor="pointer"; // Pour le CSS de la
			
		// DESSINS
		
			this.addChild(this.images);
			this.addChild(this.schema);
			this.addChild(this.annotations);
			this.annotations.addChild(this._repere);
		
		// EVENEMENTS 
		
			this.addEventListener("click",function(event)
				{
					if(ACTION == "SELECTION")
					{
						var cible = event.target;
						trouveClasse(cible).selectionneDeselectionne();
					}
				})
		
			this.addEventListener("mousedown",function(event)
				{
					if(ACTION == "MANIP" && SOUS_ACTION == "PREPARE")
					{
						var cible = event.target;
						var classe = trouveClasse(cible)
						CLASSE = classe.numero()
						videSuiveur();
						classe.accroche = new Accroche();
						classe.ajouteDemiLiaison(classe.accroche,{x:event.stageX,y:event.stageY,contexte:SCHEMA.parent,uniteSI:false});//schema.globalToLocal(event.stageX,event.stageY))
						//classe.recentreOrigine();
						
						
						SOUS_ACTION = "TIRE";
					}
				})
	}
	
	//==========================
	//Variables Membres
	//==========================
	
			/** Nom de la classe d'équivalence
			@type {String}  */
		_nom = "";
		
			/** Couleur de la classe d'équivalence
			@type {String}  */
		_couleur = "black";
		
			/** Liste de toutes les référence des demi-liaisons concernées par la classe
			@type {Array}  */
		liste_liaisons = []
		
			/** Bloque la pièce (true) ou laisse la pièce mobile (false)
			@type {Boolean}  */
		_bloque = false; 
		
			/** Dernière position enregistrée (utile quand on veut réinitialier une simulation)
			@type {Position}  */
		_lastPosition = {x:0,y:0,theta:0}	//Dernière position sauvegarder (pour rétablir après simulation)
		
			/** Dit si la classe est actuellement sélectionnée
			@type {Boolean}  */
		_selectionne = false;
		
			/** Type d'objet ("classe")
			@type {String}  */
		_type = "classe";
		
			/** Historique des positions (tableau de tableaux de la forme [[t0,x0,y0,theta0], [t1,x1,y1 .....]
			@type {Array}  */
		_historique = [];
		
			/** Nombre de position qu'on garde dans l'historique
			@type {Number}  */
		_longueurHistorique = 5 ; //Nombre de position qu'on garde
		
			/** Liste des points présents dans la classe d'équivalence
			@type {Array} */
		_listePoints = [];
		
		//Paramètres fournis en argument du constructeur
		
	//==========================
	//Graphismes
	//==========================
	
			
		
			/** Groupe graphique contenant les images d'arrière plan de la classe d'équivalence.
			@type {createjs.Container}  */
		images = new createjs.Container() ;
		
			/** Groupe graphique contenant les schémas (liaisons, traites, etc.).
			@type {createjs.Container}  */
		schema = new createjs.Container() ;
		
			/** Groupe graphique contenant les annotations (points, vecteurs, etc.).
			@type {createjs.Container}  */
		annotations = new createjs.Container() ;
		
			/** Référence vers le repère initial de la classe d'équivalence (inclu dans le groupe annotations)
			@type {createjs.Container}  */
		_repere = new Repere({x:0,y:0},0);
		
	//==========================
	//getter/setter
	//==========================

	
			/** Renvoie le numéro de la classe d'équivalence, stocké dans schema.classes
			@return {Number} Numéro de la classe
			*/
		numero()
		{
			return schema.classes.indexOf(this);
		}
		
			/** GETTER/SETTER - Renvoie le numéro de la classe d'équivalence, stocké dans schema.classes
			@param {String} [n] - Nom de la classe à stocker.
			@return {String} Nom de la classe d'équivalence. Si chaîne vide, renvoie "Classe n°i" où i est le numéro de la classe.
			*/
		nom(n)
		{
			if(typeof(n)!='undefined')
				this._nom=n;
			if(this._nom=="")
				return "Classe n°"+this.numero();
			return this._nom;
		}
		
			/** GETTER/SETTER - Couleur de la classe d'équivalence. Si modifiée, elle affecte les objets graphique enfants (lignes, cercles, liaisons, etc.) qui possède une méthode couleur() similaire
			@param {String} [c] - Couleur à stocker.
			@return {String} Couleur de la classe d'équivalence
			*/
		couleur(c)
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
				for(var i=0;i<this.images.children.length;i++)
				{
					var enfant = this.images.children[i];
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
		
			/** GETTER/SETTER - Coordonnées de la classe d'équivalence, dans les coordonnées locales (voir la classe schema)
			@param {Position} [c] - Position de la classe, de la forme {x:,y:,theta:} (en unité local et en radian dans le sens trigo)
			@return {Position} Position de la classe, de la forme {x:,y:,theta:} (en unité local et en radian dans le sens trigo)
			*/
		COORD(c)
		{
			if(typeof(c)!='undefined')
			{
				this.x=c.x*this.echelle();
				this.y=-c.y*this.echelle();
				this.rotation=-c.theta/Math.PI*180;
			}
			return {x:this.x/this.echelle(),y:-this.y/this.echelle(),thete:-this.rotation/180*Math.PI};
		}
		
			/** GETTER/SETTER - Coordonnée sur X de la classe d'équivalence, dans les coordonnées locales (voir la classe schema)
			@param {Number} [posX] - Coordonnées sur X en unité local.
			@return {Number} Coordonnées sur X en unité local.
			*/
		X(posX)
		{
			if(typeof(posX)!='undefined')
				this.x=posX*this.echelle();
			return this.x/this.echelle();
		}
		
			/** GETTER/SETTER - Coordonnée sur Y de la classe d'équivalence, dans les coordonnées locales (voir la classe schema)
			@param {Number} [posY] - Coordonnées sur Y en unité local (positif vers le haut).
			@return {Number} Coordonnées sur Y en unité local (positif vers le haut).
			*/
		Y(posY)
		{
			if(typeof(posY)!='undefined')
				this.y=-posY*this.echelle();
			return -this.y/this.echelle();
		}
		
			/** GETTER/SETTER - Angle de rotation (en radian, dans le sens trigo)
			@param {Number} [t] - Angle de rotation (en radian, dans le sens trigo)
			@return {Number} Angle de rotation (en radian, dans le sens trigo)
			*/
		THETA(t)
		{
			if(typeof(t)!='undefined')
				this.rotation=-t/Math.PI*180;
			return this.rotation/180*Math.PI;
		}


		
			/** Echelle (nombre de pixel correspondant à une unité). Pointe vers la valeur stockées dans la classe schéma.
			@return {Number} Echelle, en pixels.
			*/
		echelle()
		{
			return schema.echelle();
		}
		
			/** GETTER/SETTER - Permet de bloquer la pièce par rapport à la scène (=bâti). Si true, les coordonnées de la classe d'équivalence ne sont pas modifiées durant la simulation
			@param {Boolean} [b] - 'true' si la classe est bloquée. 'false' sinon.
			@return {Boolean} 'true' si la classe est bloquée. 'false' sinon.
			*/
		bloque(b)
		{
			if(typeof(b)!='undefined')
				this._bloque=Boolean(b)
			return this._bloque;
		}
		
			/** Renvoie la position précédemment enregistrée (avant simulation)
			@return {Position}
			*/
		lastPosition()
		{
			return this._lastPosition;
		}
		
			/** GETTER du type d'objet (classe d'équivalence)
			@return {String}
			*/
		type()
		{
			return this._type;
		}
		
			/** GETTER/SETTER du nombre de derniers points que l'on enregistre.
			@param {Number} [l] - nombre de derniers points que l'on enregistre.
			@return {Number} nombre de derniers points que l'on enregistre.
			*/
		longueurHistorique(l)
		{
			if(typeof(l)!='undefined')
				this._longueurHistorique=l
			return this._longueurHistorique;
		}
		
			/** Renvoie la i-ème position en partant de la plus récente vers la plus vieille.
			 * Si i absent : renvoie tout le vecteur.
			 * i = 1 pour la position la plus récente
			@param {Number} [i=0] - Numéro de la position que l'on souhaite récupérer
			@return {Position}
			*/
		historique(i)
		{
			if(typeof(i)=="undefined")
				return this._historique;
			if(this._historique.length==0)
				return [0,this._lastPosition.x,this._lastPosition.y,this._lastPosition.theta]
			if(i<1)
				return null;
			if(i>this._historique.length) //Si on remonte trop loin...
				return this._historique[0]; //Renvoie la plus vieille
			return this._historique[this._historique.length-i]
		}
		
			/** Ajoute une position à l'historique (et supprime la plus vieille).
			@param {Number} _date - Date de l'enregistrement
			@param {Number} _x - Position sur x à enregitrer (en pixel)
			@param {Number} _y - Position sur y à enregitrer (en pixel)
			@param {Number} _theta - Orientation à enregistrer (en degrès, sens horaire)
			*/
		pushHistorique(_date,_x,_y,_theta)
		{
			this._historique.push([_date,_x,_y,_theta]);
			if(this._historique.length>this._longueurHistorique)
				this._historique.shift();
		}
		
		
		
	//=========================
	//TORSEUR CINEMATIQUE
	//==========================
		
			/** Calcule la vitesse de rotation autour de l'axe normal au plan
			@return {Number} Vitesse de rotation (en rad/s mais je suis plus sûr)
			*/
		getVRotation()
		{
			var a1 = this.historique(1);
			var a2 = this.historique(3);
			var a3 = this.historique(5);
			return deriveGauche3pts({x:a3[0],y:a3[3]},{x:a2[0],y:a2[3]},{x:a1[0],y:a1[3]})
		}
		
			/** Calcule le torseur cinématique instantané de la classe d'équivalence
			@return {Torseur} Torseur cinématique
			*/
		getTorseurCinematique(P)
		{
			
		}
		
	//=========================
	//Autres fonctions membres
	//==========================
	
	
		
			/** Fonction qui renvoie les coordonnées de la souris captées par le schéma, dans les coordonnées locales de la classe d'équivalence
			@return {Position} Position de la souris en pixel (A VERIFIER)
			*/
		getSourisLocal()
		{
			return schema.localToLocal(schema.XSOURIS(),schema.YSOURIS(),this);
		}
	
			/** Fonction qui ajoute une demi-liaison
			@param {DemiLiaison} _demiLiaison - Référence vers l'objet "demi-liaison"
			@param {Position} _center - Position de la demi-liaison.
			*/
		ajouteDemiLiaison(_demiLiaison,_centre)
		{
			//Ajout graphique
			this.schema.addChild(_demiLiaison);
			_demiLiaison.classe(this);	//On ajoute la ref vers la classe
			var position = convertPosition(_centre,this,false); //schema.localToLocal(_centre.x,_centre.y,this);
			_demiLiaison.x=position.x;
			_demiLiaison.y=position.y;
			
			//Ajout dans la liste de liaisons
			this.liste_liaisons.push(_demiLiaison);
			//this.recentreOrigine();
		}
		
			/** Fonction qui supprime la demi-liaison (si elle existe)
			@param {DemiLiaison} _demiLiaison - Référence vers l'objet "demi-liaison" à supprimer
			*/
		supprimeDemiLiaison(_demiLiaison)
		{
			var index = this.liste_liaisons.indexOf(_demiLiaison); //Trouve l'objet dans la liste des liaison
			if (index > -1)
			{
				//Supprime la demi-liaison
				this.liste_liaisons.splice(index, 1);//On la vire de la liste
				this.schema.removeChild(_demiLiaison);	//On la vire du container
				//this.recentreOrigine();
				//Supprime la demi-soeur
				if(_demiLiaison._demiSoeur)	//Supperssion de la demi-soeur
				{
					_demiLiaison._demiSoeur._demiSoeur = null; //On casse le lien pour pas faire de boucle infinie
					_demiLiaison._demiSoeur.autoSupprime();
				}
			}
		}
		
			/** Fonction qui remplit le système à résoudre
			@param {Matrix} K - Matrice du système K.U=F
			@param {Vector} F - Vecteur-second membre du sytème K.U=F
			*/
		remplitSysteme(K,F)
		{
			if(this._bloque)
			{
				var n=this.numero()
				for(var i=0;i<3;i++)
				{
					K.set([3*n+i,3*n+i],1)
				}
			}
			else
			{
				for(var i=0;i<this.liste_liaisons.length;i++)
				{
					var liaison = this.liste_liaisons[i];
					//On recupere les bouts de matrice
					var miniSystemeLiaison = liaison.remplisSysteme_liaison(K,F)
				}
			}
				
		}
		
			/** Enregistre la position courante (avant simulation, par exemple)
			*/
		sauveLastPosition()
		{
			this._lastPosition = {x:this.x,y:this.y,theta:this.rotation}
		}
		
			/** Restore la position courante (après simulation, par exemple)
			*/
		restoreLastPosition()
		{
			this.x=this._lastPosition.x;
			this.y=this._lastPosition.y;
			this.rotation=this._lastPosition.theta;
		}
		
			/** Fonction qui décale l'origine de la pièce pour quelle soit au barycentre des liaisons (améliore le conditionnement de la matrice)
			*/
		recentreOrigine()
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
			/*for(var i=0; i<this.images.children.length; i++)
			{
				var element_i = this.images.children[i];
				element_i.x -= barycentre.x;
				element_i.y -= barycentre.y;
			}*/
			this.images.x -= barycentre.x;
			this.images.y -= barycentre.y;
			
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
		
			/** Fonction qui floute la classe d'équivalence (Utile quand on sélectionne un autre classe d'équivalence)
			*/
		floute()
		{
			this.filters = [new createjs.BlurFilter(5, 5, 10)] //Filtre flou
			
			// On met en cache la CL (dans un rectangle dont on calcule les dimensions). Voir la doc
			this.updateBounds();
			var bounds = this.getBounds();
			var boundsFlou = this.filters[0].getBounds() //Padding en plus lié au flou
			this.cache(bounds.x+boundsFlou.x, 	bounds.y+boundsFlou.y, 	bounds.width+boundsFlou.width, 	bounds.height+boundsFlou.height ) //On met en cache (nécessaire)
			this.alpha = 0.25;
		}
		
			/** Fonction qui recalcule les limites (Largeur / Hauteur) géométrique de la classe d'équivalence (creatjs.Container ne sait pas le faire tout seul)
			*/
		updateBounds()
		{
			var xmin=0;
			var ymin=0;
			var xmax=0;
			var ymax=0;
			
			if(this.schema.getBounds()!=null)
			{
				var b_schema = this.schema.getBounds();
				var xmin = b_schema.x;
				var ymin = b_schema.y;
				var xmax = b_schema.x+b_schema.width;
				var ymax = b_schema.y+b_schema.height;
			}
			
			if(this.images.getBounds()!=null)
			{
				var b_image = this.images.getBounds();
				var xmin = Math.min(xmin,b_image.x);
				var ymin = Math.min(ymin,b_image.y);
				var xmax = Math.max(xmax,b_image.x+b_image.width);
				var ymax = Math.max(ymax,b_image.y+b_image.height);
			}
			
			if(this.annotations.getBounds()!=null)
			{

				var b_annotations = this.annotations.getBounds();
				var xmin = Math.min(xmin,b_annotations.x);
				var ymin = Math.min(ymin,b_annotations.y);
				var xmax = Math.max(xmax,b_annotations.x+b_annotations.width);
				var ymax = Math.max(ymax,b_annotations.y+b_annotations.height);
				// A compléter avec les autres groupes (
			}
			
			this.setBounds(xmin,ymin,xmax-xmin,ymax-ymin);
		}
		
			/** Fonction qui défloute la classe d'équivalence
			*/
		defloute()
		{
			this.filters = null
			this.uncache();
			this.alpha=1;
		}
		
			/** Fonction qui sélectionne la Classe d'équivalence (met en surbrillance en floutant les autres)
			*/
		selectionne()
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
		
			/** Fonction désélectionne (qui retire la surbrillance, etc...)
			*/
		deselectionne()
		{
			for(var i=0;i<schema.classes.length;i++)
			{
				if(i!=CLASSE)
					schema.classes[i].defloute()
			}
			this._selectionne = false;
			CLASSE = -1;
		}
		
			/** Fonction qui switch le mode sélectionné / désélectionné
			*/
		selectionneDeselectionne()
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
		
		
			/** Cette méthode calcule les coordonnées d'une position _pos, dans le repère local de la classe d'équivalence (équivalent à convertPosition(), mais à destination de cette classe.)
				@param {Point} _pos - Position dont on souhaite connaître les coordonnées locale
				@param {Boolean} [_direct=false] - true : les coordonnées seront données dans le repère direct du schéma (x vers la droite, y vers le haut), le tout à l'échelle de SCHEMA.echelle(). false : les coordonnées sont celles propre à createjs (y vers le bas, et unité en pixel)
				@return {Object} Coordonnées du type {x:, y:, theta:, contexte: this, _uniteSI: }
			*/
		getLocalPosition(_pos,_USI=false)
		{
			return convertPosition(_pos,this,_USI)
		}
		
		
		
		
		
		
			/* Fonction qui dessine une ligne, (enregistre ses bornes) et l'ajoute à la classe
			@param {Number} a - Coordonnées sur x du point 1
			@param {Number} b - Coordonnées sur y du point 1
			@param {Number} c - Coordonnées sur x du point 2
			@param {Number} d - Coordonnées sur y du point 2
			@param {Boolean} repereDirect - si repereDirect =true : Y est vers le haut. Si false : Y est vers le bas. IL FAUDRAIT REMPLACER PAR L'UTILISATION DES COORDONNEES A L'ECHELLE (voir la classe {@link Schema})
			@return Référence vers la ligne nouvellement créée.
			@deprecated Replacé par dessineSegment (plus partique)
			*/
		/*dessineLigne(a,b,c,d,repereDirect = true)
		{
			if(repereDirect)
				var ligne = new Ligne(a,-b,c,-d);
			else
				var ligne = new Ligne(a,b,c,d);
			ligne.couleur(this._couleur);
			this.schema.addChild(ligne)
			
			return ligne
		}*/
		
		
		
		
		
		/** Fonction qui dessine un segment sur la classe d'équivalence
			@param {Position} _P1 - Position du point extrémité 1
			@param {Position} _P2 - Position du point extrémité 2
			@return {createjs.displayObject} Référence vers la ligne (dessin) nouvellement créée.
			*/
		dessineLigne(_P1,_P2)
		{
			_P1=convertPosition(_P1,this,false) ;
			_P2=convertPosition(_P2,this,false) ;
			var ligne = new Ligne(_P1.x,_P1.y,_P2.x,_P2.y);
			ligne.couleur(this._couleur);
			this.schema.addChild(ligne)
			return ligne
		}
		
		
		
			/** Fonction qui ajoute une image à la classe d'équivalence
			@param {String} _image - Adresse de l'image à insérer
			@param {Number} _x - Coordonnées sur x (local à la classe d'équivalence) en pixel. Défaut : 0.
			@param {Number} _y - Coordonnées sur y (local à la classe d'équivalence) en pixel. Défaut : 0.
			@param {Number} _rot - Orientation de l'image (local à la classe d'équivalence) en degrés, sens horaire. Défaut : 0.
			@param {Number} _scale - Échelle de l'image. Défaut : 1
			*/
		ajouteImage(_image,_x=0,_y=0,_rot=0,_scale=1)
		{
			var img = new createjs.Bitmap("dessins/"+_image);
			this.images.addChild(img);
			img.x=_x;
			img.y=_y;
			img.rotation=_rot;
			img.scaleX=img.scaleY=_scale;
		}	
		
		
			/** Fonction qui modifie la position de la classe d'équivalence. Cela revient à modifier les membres x, y ou rotation,
			 * mais en prenant en compte les éventuels effets d'échelle.
			 * @param {Position} pos - Position à prendre.
			 */
		changePosition(pos)
		{
			var position = convertPosition(pos,SCHEMA,false);	// Converti la position (px, par rapport à SCHEMA)
		
			this.x = position.x ;
			this.y = position.y ;
			this.rotation = position.theta ;
		}
		
			/** Ajoute un point à la classe d'équivalence, en le "préparant" (mettre la bonne couleur, redresse le texte pour qu'il apparaisse droit, etc.)
			 * @param {Point} _P - Objet 'point' à placer.
			 * @param {Position} _pos - Position du point
			 */
		ajoutePoint(_P, _pos)
		{
			// Ajout
			this.annotations.addChild(_P);
			this._listePoints.push(_P);
			SCHEMA._listePoints.push(_P);
			
			// Position
			_P.changePosition(_pos);
			
			//Autre
			_P.couleur(this.couleur())
		}
		
			/** Fonction qui met à jour les enfants */
		MAJ()
		{
			this._listePoints.forEach(function(P){
				P.MAJ();
			});
		}
}
