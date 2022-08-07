//Classe abstraite d'une demi-liaison
/*
var DemiLiaison = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		//Définition
		this._nom = "liaison"	// Nom de la liaison
		this._genre = "neutre";	//Permet de discriminer la liaison "male" et la liaison "femelle"
		this._classe = -1;	// Référence vers la classe parente.
		//Apparence
		this._couleur="black";	// Couleur
		this._epaisseur=3;	// Epaisseur du trait
		this._demiSoeur=null;	// Référence vers la demi-liaison associée (sur l'autre classe d'équivalence)
		//Simulation
		this._k=10000;		// Raideur de la liaison en effort
		this._kRot=1000000;	// Raideur de la liaison en effort moment (s'il y a lieu)
		this._pilotee = false;	// Dit si la liaison est pilotée (motorisée) ou non
		this._equation = "0";	// Equation du mouvement
		this._nbDDL = 0 ; 	// Nombre de DDL

	//==========================
	//getter/setter
	//==========================

		// Getter / Setter qui impose / renvoie la couleur
		this.couleur=function(c)
		{
			if(typeof(c)!='undefined')
				{
					this._couleur=c;
					this.updateCouleurGraphismes(c);  //Met à jour les couleur directement sur les graphismes
				}
			return this._couleur;
		}
		
		// Getter / Setter qui impose / renvoie l'épaisseur des traits
		this.epaisseur=function(e)
		{
			if(typeof(e)!='undefined')
				{
					this._epaisseur=e;
					//Met à jour les couleur directement sur les graphismes
					this.updateEpaisseurGraphismes(e);  //Met à jour les épaisseur directement sur les graphismes
				}
			return this._epaisseur;
		}
	
		// Getter / Setter qui donne la réf. de lautre moitié de liaison
		this.demiSoeur=function(d)
		{
			if(typeof(d)!='undefined')
					this._demiSoeur=d;
			return this._demiSoeur;
		}
		
		// Getter / Setter de la raideur en force
		this.k=function(k)
		{
			if(typeof(k)!='undefined')
					this._k=k;
			return this._k;
		}

		// Getter / Setter de la raideur en moment
		this.kRot=function(k)
		{
			if(typeof(k)!='undefined')
					this._kRot=k;
			return this._kRot;
		}

		
		// Getter / Setter qui impose le mouvement de la liaison
		this.pilotee=function(p)
		{
			if(typeof(p)!='undefined')
			{
					this._pilotee=!!p;
					this._demiSoeur._pilotee=!!p;
			}
			return this._pilotee;
		}
		
		// Getter / Setter du genre (male / femelle)
		this.genre=function(g)
		{
			if(typeof(g)!='undefined')
					this._genre=g;
			return this._genre;
		}
		
		// Getter / Setter de de la ref. vers la classe d'équivalence
		this.classe = function(c)
		{
			if(typeof(c)!='undefined')
					this._classe=c;
			return this._classe;
		}
		
		// Getter du nombre de DDL
		this.nbDDL = function(n)
		{
			return this._nbDDL;
		}
	//==========================
	//Autres fonctions membres
	//==========================


		//MÉTHODE ABSTRAITE
		//Fonction qui met à jour la couleur des graphismes de la liaison (appelée avec this.couleur() en setter)
		this.updateCouleurGraphismes = function(_coul)
		{
			// À COMPLÉTER DANS LES LIAISONS FILLES
		}

		//MÉTHODE ABSTRAITE
		//Fonction qui met à jour l'épaisseur des graphismes de la liaison (appelée avec this.epaisseur() en setter)
		this.updateEpaisseurGraphismes = function(_ep)
		{
			// À COMPLÉTER DANS LES LIAISONS FILLES
		}
		
		//Renvoie l'angle de rotation par rapport au schéma parent
		this.getAbsoluteRotation=function()
		{
			return this.rotation + this.classe().rotation;
		}
		
		//Fonction qui renvoie le vecteur {x,y} (en coordonnées absolues) entre cette demi liaison et sa soeur
		this.L1L2 = function()
		{
			if(this._demiSoeur != null)
			{
				var L1 = this.localToLocal(0,0,schema);
				var L2 = this.demiSoeur().localToLocal(0,0,schema);
				return {x:L2.x-L1.x, y:L2.y-L1.y}
			}
			else
				return {x:0,y:0}
		}
		//Fonction qui renvoie (en coordonnées absolues du schema) le vecteur entre l'origine de la CE mère, et cette liaison
		this.O1L1 = function()
		{
			var O1 = this.classe().localToLocal(0,0,schema);
			var L1 = this.localToLocal(0,0,schema);
			return {x: L1.x-O1.x, y:L1.y-O1.y}
		}
		
		//MÉTHODE ABSTRAITE
		//Ajoute (dans les grosses matrices K et F globales) la sous partie liée à la liaison
		this.remplisSysteme_liaison = function(K,F)
		{
			// À COMPLÉTER DANS LES LIAISONS FILLES
			
			var n1 = this.classe().numero(); //Numéro de la CE
			var n2 = this.demiSoeur().classe().numero() // Numéro de la CE de la demi-Soeur
		
			//Portion de systeme, lié aux inconnues : X = [[dx1], [dy1], [dtheta1], [dx2], [dy2], [dtheta2]] ou 1 est la demi-liaison courante et 2 et la demi-liaison soeur.
			var KK = [	[0,	0,	0,	0,	0,	0],
					[0,	0,	0,	0,	0,	0],
					[0,	0,	0,	0,	0,	0]	] ;
					
			var FF = [0	,	0	,	0] ;
			

			//On recopie dans les bonnes lignes de K et F
			for(var i=0; i<3 ; i++) // Pour chacune des 3 lignes
			{
				// Recopiage
				K.ajouteVal( 3*n1+i , 3*n1,	KK[i][0])
				K.ajouteVal( 3*n1+i , 3*n1+1,	KK[i][1])
				K.ajouteVal( 3*n1+i , 3*n1+2,	KK[i][2])
				
				K.ajouteVal( 3*n1+i , 3*n2, 	KK[i][3])
				K.ajouteVal( 3*n1+i , 3*n2+1,	KK[i][4])
				K.ajouteVal( 3*n1+i , 3*n2+2,  KK[i][5])
				
				F.ajouteVal( 3*n1+i, FF[i])
			}
			
			
			// AJOUTE DE LA MOTORISATION
			if(this._pilotee && ACTION == "simule")
			{
				//A compléter
			}
			
			return {K:KK,F:FF}	// Renvoyé pour info (K et F sont modifiés en place
		}

		//Fonction qui sert de consigne angulaire, dans le cas où c'est une piloté
		// i est le n° du DDL piloté
		this.consigneAngulaire=function(_i)
		{
			var i = (_i==undefined) ? 1:i
			if(i==1)	//A modifier (c'est un exemple)
			{
				return 0
			}
			return 0
		}
		
		
		//Fonction qui supprime la classe
		this.autoSupprime = function()
		{
			this.classe().supprimeDemiLiaison(this);
			/*var index = this.classe().liste_liaisons.indexOf(this); //Trouve l'objet dans la liste des liaison
			if (index > -1)
			{
				this.classe().liste_liaisons.splice(index, 1);
			}
			this.parent.removeChild(this);
			if(this._demiSoeur)	//Supperssion de la demi-soeur
			{
				this._demiSoeur._demiSoeur = null; //On casse le lien pour pas faire de boucle infinie
				this._demiSoeur.autoSupprime();
			}* /
		}
		
	//==========================
	//Graphismes
	//==========================
	
		// À COMPLETER

		//Les shapes n'ont pas de bornes. Alors on va en créer
		//	this.setBounds(-this._rayon-this._longueurTige,-this._rayon-this._longueurTige,2*(this._rayon+this._longueurTige),2*(this._rayon+this._longueurTige))


}
DemiLiaison.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
DemiLiaison.prototype.constructor = DemiLiaison;//On recopie le constructeur de Noeud dans son prototype
*/




/**
 * Objet (graphique) représentant une demi-liaison. Classe abstraite.
 * @extends createjs.Container
 */
class DemiLiaison extends createjs.Container
{
	/**
	 * Constructeur
	 */
	constructor()
	{
		super()	// Rappelle le constructeur parent
	}
	
	
	//==========================
	//Variables Membres
	//==========================
	
	
		// Définition **************************
		
			/** Nom de la liaison
			@type {String}  */
		_nom = "liaison";
		
			/** Permet de discriminer la liaison "male" et la liaison "femelle" 
			@type {String}*/
		_genre = "neutre";
		
			/**  Référence vers la classe parente.
			@type {Number}*/
		_classe = null;
		
			/**  Référence vers la classe parente.
			@type {Number}*/
		
		// Apparence ***********************************

		
			/** Couleur de la demi-liaison
			@type {String}*/
		_couleur="black";
		
			/** Épaisseur de la demi-liaison
			@type {Number}*/
		_epaisseur=3;
		
			/** Référence vers la demi-liaison associée (sur l'autre classe d'équivalence)
			@type {DemiLiaison}*/
		_demiSoeur = null;
		
		//Simulation *******************************************
		
			/** Raideur de la liaison en effort
			@type {Number}*/
		_k=10000;
		
			/** Raideur de la liaison en effort moment (s'il y a lieu)
			@type {Number}*/
		_kRot=1000000;
		
			/** Dit si la liaison est pilotée (motorisée) ou non
			@type {Boolean}*/
		_pilotee = false;
		
			/** Equation du mouvement
			@type {String}*/
		_equation = "0";
		
			/** Nombre de DDL
			@type {Number}*/
		_nbDDL = 0 ;
		
			/** Liste des consignes cinématiques pour piloter la liaison. Il s'agit d'une liste dans le cas où une liaison a plusieurs DDL (l'élément [0] pilotera le 1er DDL, l'élément [1] pilotera le second, etc.). Pour rappel, le nombre maxixmul est de 3 DDL (liaison libre). Attention : ici, on garde la convention des Array ([0] = 1er DDL, [1] = 2ème DDL, etc.) contrairement au getter/setter associé. Chaque consigne est une expression mathématique sous forme de String, qui sera évaluée à chaque résolution du syst_me.
			@type {Array}
			*/
		_consignesCinematiques = ["","",""];
	
	//==========================
	//getter/setter
	//==========================


			/** Getter / Setter qui impose ou renvoie la couleur. En setter, met automatiquement les dessins à jour en appelant {@link updateCouleurGraphismes}.
			@param  {String} c - Couleur (de préférence format "#RRVVBB").
			@return {String} Couleur. En cas de Setter, c'est la nouvelle valeur qui est renvoyée.
			*/
		couleur(c)
		{
			if(typeof(c)!='undefined')
				{
					this._couleur=c;
					this.updateCouleurGraphismes(c);  //Met à jour les couleur directement sur les graphismes
				}
			return this._couleur;
		}

			/** Getter / Setter qui impose ou renvoie l'épaisseur des traits. En setter, met automatiquement les dessins à jour en appelant {@link updateEpaisseurGraphismes} 
			@param {Number} e - Épaisseur en px.
			@return {Number} Épaisseur en px. En cas de Setter, c'est la nouvelle valeur qui est renvoyée.
			*/
		epaisseur(e)
		{
			if(typeof(e)!='undefined')
				{
					this._epaisseur=e;
					//Met à jour les couleur directement sur les graphismes
					this.updateEpaisseurGraphismes(e);  //Met à jour les épaisseur directement sur les graphismes
				}
			return this._epaisseur;
		}
	
			/** Getter / Setter qui donne la référence vers l'objet "autre moitié de liaison"
			@param {DemiLiaison} d - Référence vers l'objet "demi-liaison" correspondant.
			@return {DemiLiaison} Référence vers l'objet "demi-liaison" correspondant. En cas de Setter, c'est la nouvelle référence qui est renvoyée.
			*/
		demiSoeur(d)
		{
			if(typeof(d)!='undefined')
					this._demiSoeur=d;
			return this._demiSoeur;
		}

			/** GGetter / Setter de la raideur des liaisons en force
			@param {Number} k - Raideur.
			@return {Number} Raideur. En cas de Setter, c'est la nouvelle valeur qui est renvoyée.
			*/
		k(k)
		{
			if(typeof(k)!='undefined')
					this._k=k;
			return this._k;
		}
		
			/** Getter / Setter de la raideur des laisons en moment (quand il y a lieu)
			@param {Number} k - Raideur.
			@return {Number} Raideur. En cas de Setter, c'est la nouvelle valeur qui est renvoyée.
			*/
		kRot(k)
		{
			if(typeof(k)!='undefined')
					this._kRot=k;
			return this._kRot;
		}

			/** Getter / Setter qui impose le mouvement de la liaison
			@param {Boolean} p - true si on veut piloter, false si elle est libre.
			@return {Boolean} true si on veut piloter, false si elle est libre. En cas de Setter, c'est la nouvelle valeur qui est renvoyée.
			*/
		pilotee(p)
		{
			if(typeof(p)!='undefined')
			{
					this._pilotee=!!p;
					this._demiSoeur._pilotee=!!p;
			}
			return this._pilotee;
		}
		
			/** Getter / Setter du genre de la liaison (male / femelle)
			@param {String} g - Genre : "male" ou "femelle". "neutre" par défaut dans la classe abstraite.
			@return {String} Genre. En cas de Setter, c'est la nouvelle valeur qui est renvoyée.
			*/
		genre(g)
		{
			if(typeof(g)!='undefined')
					this._genre=g;
			return this._genre;
		}
		
			/** Getter / Setter de la reférence vers la classe d'équivalence à laquelle est associée la demi-liaison.
			@param {Classe_Equivalence} c - Référence vers l'objet Classe_Equivalence.
			@return {Classe_Equivalence} Référence vers l'objet Classe_Equivalence. En cas de Setter, c'est la nouvelle valeur qui est renvoyée.
			*/
		classe(c)
		{
			if(typeof(c)!='undefined')
					this._classe=c;
			return this._classe;
		}
				
			/** Getter / Setter de la reférence du nombre de degrés de liberté de la liaison.
			@param {Number} n - Nombre de DDL.
			@return {Number} Nombre de DDL.. En cas de Setter, c'est la nouvelle valeur qui est renvoyée.
			*/
		nbDDL(n)
		{
			return this._nbDDL;
		}
		
			/** Getter / Setter des consignes cinématique pour piloter une liaison.
			@param {Number} [i=1] - Numéro du DDL (attention : le premier DDL est le numéro 1 (Ne pas confondre avec le numéro d'indice où il est stocker)). L'ordre des DDL (quant il y a en a plusieurs) est selon le type de liaison (Voir doc associé à chaque liaison). Si utilisé en setter, cela affecte la liaison demi-soeur également.
			@param {String} [eq] - Equation à stocker au DDL n°i. Si absent : devient un getter.
			@return {String} Equation de pilotage du DDL. En cas de Setter, c'est la nouvelle valeur qui est renvoyée.
			*/
		consignesCinematiques(i=1,eq)
		{
			if(i<1 || i>3)
				console.error("Le numéro de DDL doit être compris entre 1 et 6 (inclus)");
			if(typeof(eq)!='undefined')
			{
				this._consignesCinematiques[i-1]=eq;
				this.demiSoeur()._consignesCinematiques[i-1]=eq;
			}
			return this._consignesCinematiques[i-1];
		}
	//==========================
	//Autres fonctions membres
	//==========================


			/** MÉTHODE ABSTRAITE - Fonction qui met à jour la couleur des graphismes de la liaison (appelée avec this.couleur() en setter) en accord avec la géométrie de la liaison.
			@param {String} _coul - Couleur
			*/
		updateCouleurGraphismes(_coul)
		{
			// À COMPLÉTER DANS LES LIAISONS FILLES
		}

			/** MÉTHODE ABSTRAITE - Fonction qui met à jour l'épaisseur des graphismes de la liaison (appelée avec this.epaisseur() en setter) en accord avec la géométrie de la liaison
			@param {Number} _ep - Nombre de DDL.
			*/
		updateEpaisseurGraphismes(_ep)
		{
			// À COMPLÉTER DANS LES LIAISONS FILLES
		}
		
			/** Renvoie l'angle de rotation par rapport au schéma parent
			@return {Number} Angle de rotation en degrés, dans la convention de signe du dessin.
			*/
		getAbsoluteRotation()
		{
			return this.rotation + this.classe().rotation;
		}
		
			/** Fonction qui renvoie le vecteur {x,y} (en coordonnées absolues) entre cette demi liaison et sa soeur
			@return {Object} {x:   , y: }
			*/
		L1L2()
		{
			if(this._demiSoeur != null)
			{
				var L1 = this.localToLocal(0,0,schema);
				var L2 = this.demiSoeur().localToLocal(0,0,schema);
				return {x:L2.x-L1.x, y:L2.y-L1.y}
			}
			else
				return {x:0,y:0}
		}
		
			/** Fonction qui renvoie (en coordonnées absolues du schema) le vecteur entre l'origine de la classe d'équivalence mère, et cette liaison
			@return {Object} {x:   , y: }
			*/
		O1L1()
		{
			var O1 = this.classe().localToLocal(0,0,schema);
			var L1 = this.localToLocal(0,0,schema);
			return {x: L1.x-O1.x, y:L1.y-O1.y}
		}

			/** MÉTHODE ABSTRAITE - Ajoute (= modifie en place dans les grosses matrices K et F globales) la sous partie liée à la liaison
			@param {Array} K - Référence vers la matrice K générale du système global
			@param {Array} F - Référence vers le vecteur F second membre du système global (vecteur en ligne, à une dimension)
			@return {Object} {K:   , F :} Objet représentant les PETITES matrices du système, liées à la liaison (Attention, ce ne sont pas les matrices globales)
			*/
		remplisSysteme_liaison(K,F)
		{
			// À COMPLÉTER DANS LES LIAISONS FILLES
			
			var n1 = this.classe().numero(); //Numéro de la CE
			var n2 = this.demiSoeur().classe().numero() // Numéro de la CE de la demi-Soeur
		
			//Portion de systeme, lié aux inconnues : X = [[dx1], [dy1], [dtheta1], [dx2], [dy2], [dtheta2]] ou 1 est la demi-liaison courante et 2 et la demi-liaison soeur.
			var KK = [	[0,	0,	0,	0,	0,	0],
					[0,	0,	0,	0,	0,	0],
					[0,	0,	0,	0,	0,	0]	] ;
					
			var FF = [0	,	0	,	0] ;
			

			//On recopie dans les bonnes lignes de K et F
			for(var i=0; i<3 ; i++) // Pour chacune des 3 lignes
			{
				// Recopiage
				K.ajouteVal( 3*n1+i , 3*n1,	KK[i][0])
				K.ajouteVal( 3*n1+i , 3*n1+1,	KK[i][1])
				K.ajouteVal( 3*n1+i , 3*n1+2,	KK[i][2])
				
				K.ajouteVal( 3*n1+i , 3*n2, 	KK[i][3])
				K.ajouteVal( 3*n1+i , 3*n2+1,	KK[i][4])
				K.ajouteVal( 3*n1+i , 3*n2+2,  KK[i][5])
				
				F.ajouteVal( 3*n1+i, FF[i])
			}
			
			
			// AJOUTE DE LA MOTORISATION
			if(this._pilotee && ACTION == "simule")
			{
				//A compléter
			}
			
			return {K:KK,F:FF}	// Renvoyé pour info (K et F sont modifiés en place
		}

			/** Fonction qui sert de consigne angulaire, dans le cas où c'est une piloté
			@param {Number} _i - (Facultatif) Numéro du DDL à piloter (n°1 par défaut)
			@return {Number} Valeur de la consigne pour ce DDL
			*/
		evalueConsigne(_i)
		{
			var t=schema.tSimulation();
						
						//var omega = 2*math.pi*0.1 //vitesse angulaire
						//return math.sin(omega*t)*30-30
			var i = (_i==undefined) ? 1:i
			if(this.consignesCinematiques(i)=="")
				return 0;
			return eval(this.consignesCinematiques(i))
		}
		

			/** Fonction qui supprime la liaison de la classe d'équivalence mère
			*/
		autoSupprime()
		{
			this.classe().supprimeDemiLiaison(this);
		}
	
}

