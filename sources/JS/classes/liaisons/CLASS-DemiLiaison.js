//Classe abstraite d'une demi-liaison

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
			}*/
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



