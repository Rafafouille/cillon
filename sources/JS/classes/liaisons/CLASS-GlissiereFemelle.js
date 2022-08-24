
/*
var GlissiereFemelle = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		DemiLiaison.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		//Définition
		this._genre = "femelle";	//Permet de discriminer la liaison "male" et la liaison "femelle"
		
		//Caractéristiques géométriques de la liaison
		this._longueur=50; // Longueur du rectangle
		this._largeur=20; // Largeur du rectangle
		this._longueurTige=20;
		


	//==========================
	//getter/setter
	//==========================

		// Longueur du rectangle
		this.longueur=function(l)
		{
			if(typeof(l)!='undefined')
				{
					this._longueur=l;
					//Met à jour les couleur directement sur les graphismes
					// ... à faire
				}
			return this._longueur;
		}
		
		// Largeur du rectangle
		this.lageur=function(l)
		{
			if(typeof(l)!='undefined')
				{
					this._largeur=l;
					//Met à jour les couleur directement sur les graphismes
					// ... à faire
				}
			return this._largeur;
		}
		//Longueur tige
		this.longueurTige=function(l)
		{
			if(typeof(l)!='undefined')
				{
					this._longueurTige=l;
					//Met à jour les couleur directement sur les graphismes
					// ... à faire
				}
			return this._longueurTige;
		}

	//==========================
	//Autres fonctions membres
	//==========================

		//ECRASE L'ANCIENNE
		//Fonction qui met à jour la couleur des graphismes de la liaison (appelée avec this.couleur() en setter)
		this.updateCouleurGraphismes = function(_coul)
		{
			this.children[0].graphics._stroke.style = _coul;
			this.children[1].graphics._stroke.style = _coul;
		}

		//ECRASE L'ANCIENNE
		//Fonction qui met à jour l'épaisseur des graphismes de la liaison (appelée avec this.epaisseur() en setter)
		this.updateEpaisseurGraphismes = function(_ep)
		{
			// À FAIRE
		}

		
		//ECRASE L'ANCIENNE
		//Ajoute (dans la grosse matrice K et F globale) la sous partie liée à la liaison
		this.remplisSysteme_liaison = function(K,F)
		{
			var O1L1 = this.O1L1();
			var O2L2 = this.demiSoeur().O1L1();
			var L1L2 = this.L1L2();
			var k = this._k
			var kRot = this._kRot;
			var n1 = this.classe().numero(); //Numéro de la CE
			var n2 = this.demiSoeur().classe().numero() // Numéro de la CE de la demi-Soeur
			var alpha1 = this.getAbsoluteRotation(); // En degrés
			var alpha2 = (this.demiSoeur().getAbsoluteRotation()); // Orientation de la direction de la demi-soeur (absolu)
			var sina2 = Math.sin(alpha2*Math.PI/180);
			var cosa2 =  Math.cos(alpha2*Math.PI/180);
			var B = O1L1.x*cosa2 + O1L1.y*sina2;
			var C = O1L1.x*sina2 + O1L1.y*cosa2;
			var D = L1L2.x*sina2 + L1L2.y*cosa2;
			
		
			//NOTE : il faudra peut être condenser les lignes suivantes
					
			var KK = [	[-k*sina2*sina2,		k*sina2*cosa2,	k*sina2*(O1L1.y*sina2+O1L1.x*cosa2),	k*sina2*sina2,	-k*sina2*cosa2,	-k*sina2*(O2L2.y*sina2+O2L2.x*cosa2)	],
					[k*cosa2*sina2,		-k*cosa2*cosa2,	-k*cosa2*(O1L1.y*sina2+O1L1.x*cosa2),	-k*cosa2*sina2,	k*cosa2*cosa2,	k*cosa2*(O2L2.y*sina2+O2L2.x*cosa2)	],
					[k*B*sina2 - kRot,	-k*B*cosa2,	-k*(B*B+C*D),	-k*B*sina2+kRot,	k*B*cosa2,	k*B*(O2L2.y*sina2+O2L2.x*cosa2)	]	
					]
					
			//var FF = [k*L1L2.x,k*L1L2.y,k*(O1L1.x*L1L2.y-O1L1.y*L1L2.x)]
			var FF = [k*sina2*(-L1L2.x*sina2+L1L2.y*cosa2),	-k*cosa2*(-L1L2.x*sina2+L1L2.y*cosa2),	-k*B*(-L1L2.x*sina2+L1L2.y*cosa2)-kRot*(alpha2-alpha1)]
			

			
			//On recopie dans les bonnes lignes de K et F
			for(var i=0; i<3 ; i++) // Pour chacune des 3 lignes
			{
				// Recopiage
				//K.set([3*n1+i,3*n1], K.get([3*n1+i,3*n1])+KK[i][0])
				K.ajouteVal( 3*n1+i , 3*n1,	KK[i][0])
				K.ajouteVal( 3*n1+i , 3*n1+1, KK[i][1])
				K.ajouteVal( 3*n1+i , 3*n1+2, KK[i][2])
				
				K.ajouteVal( 3*n1+i , 3*n2, 	KK[i][3])
				K.ajouteVal( 3*n1+i , 3*n2+1,	KK[i][4])
				K.ajouteVal( 3*n1+i , 3*n2+2,  KK[i][5])
				
				F.ajouteVal( 3*n1+i, FF[i])
				

			}
			
			
			// AJOUTE DE LA MOTORISATION
			if(this._pilotee && ACTION == "simule")
			{
			
				// A faire
			}
			
			return {K:KK,F:FF}
		}

		//Fonction qui sert de consigne angulaire, dans le cas où c'est une piloté
		this.consigneAngulaire=function()
		{
			var t=schema.tSimulation();
			var omega = 2*math.pi*0.1 //vitesse angulaire
			return math.sin(omega*t)*90
		}

		
	//==========================
	//Graphismes
	//==========================
	
		this._rectangle=new createjs.Shape();
		this._rectangle.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur).drawRect(-this._longueur/2,-this._largeur/2.,this._longueur,this._largeur);
		this.addChild(this._rectangle);

		this._tige=new createjs.Shape();
		this._tige.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur).moveTo(0,this._largeur/2).lineTo(0,this._largeur/2+this._longueurTige);
		this.addChild(this._tige);


		//Les shapes n'ont pas de bornes. Alors on va en créer
		
		this.setBounds(-this._longueur/2.,this._epaisseur/2.,this._longueur/2.,-this._epaisseur/2.)


}
GlissiereFemelle.prototype = Object.create(DemiLiaison.prototype);//On recopie le prototype de DemiLiaison
GlissiereFemelle.prototype.constructor = GlissiereFemelle;//On recopie le constructeur de Noeud dans son prototype

*/






/**
 * Demi-liaison "Glissière" désignée comme femelle
 * @extends DemiLiaison
 */
class GlissiereFemelle extends DemiLiaison
{

	// **********************************************************
	/*
	 * Constructeur
	 */
	constructor()
	{
		// Héritage (constructeur parent)
		super()	// Rappelle le constructeur parent
		
		// MAJ membres
		this._genre = "femelle";	//Permet de discriminer la liaison "male" et la liaison "femelle"
		this._nom = "Glissière"
		
		// GRAPHISMES
			this._rectangle=new createjs.Shape();
			this._rectangle.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur).drawRect(-this._longueur/2,-this._largeur/2.,this._longueur,this._largeur);
			this.addChild(this._rectangle);

			this._tige=new createjs.Shape();
			this._tige.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur).moveTo(0,this._largeur/2).lineTo(0,this._largeur/2+this._longueurTige);
			this.addChild(this._tige);

			//Les shapes n'ont pas de bornes. Alors on va en créer
			this.setBounds(-this._longueur/2.,this._epaisseur/2.,this._longueur/2.,-this._epaisseur/2.)
	}
	
	
	// MEMBRES **********************************************************
		/** Longueur du rectangle
			@type {Number}  */
		_longueur = 50 ;
		
		/** Largeur du rectangle
			@type {Number}  */
		_largeur = 20 ;
		
		/** Longueur de la tige orthogonale
			@type {Number}  */
		_longueurTige = 20;
		
		/** Dessin le rectangle
			@type {createjs.Shape}  */
		_rectangle = new createjs.Shape();
		
		/** Dessin le rectangle
			@type {createjs.Shape}  */
		_tige = new createjs.Shape();
		
		
		
		version = 3;
		
	// getter/setter ****************************************************

			/** GETTER / SETTER de la longueur du rectangle.
			@param {Number} [l] - [OPTIONNEL] Nouvelle valeur de longueur du rectangle (en px).
			@return {Number} La longueur courante (nouvelle valeur si setter)
			*/
		longueur(l)
		{
			if(typeof(l)!='undefined')
				{
					this._longueur = l ;
					//Met à jour les dimensions directement sur les graphismes
					// ... à faire
				}
			return this._longueur ;
		}
		
			/** GETTER / SETTER de la largeur du rectangle.
			@param {Number} [l] - [OPTIONNEL] Nouvelle valeur de largeur du rectangle (en px).
			@return {Number} La largeur courante (nouvelle valeur si setter)
			*/
		largeur(l)
		{
			if(typeof(l)!='undefined')
				{
					this._largeur = l ;
					//Met à jour les dimensions directement sur les graphismes
					// ... à faire
				}
			return this._largeur ;
		}
		
			/** GETTER / SETTER de la longueur de la tige qui part du rectangle.
			@param {Number} [l] - [OPTIONNEL] Nouvelle valeur de longueur de la tige (en px).
			@return {Number} La longueur de la tige courante (nouvelle valeur si setter)
			*/
		longueurTige(l)
		{
			if(typeof(l)!='undefined')
				{
					this._longueurTige = l ;
					//Met à jour les dimensions directement sur les graphismes
					// ... à faire
				}
			return this._longueurTige ;
		}

	//==========================
	//Autres fonctions membres
	//==========================
	
	
			/** (ECRASE L A FONCTION ABSTRAITE) Fonction qui met à jour la couleur des graphismes de la liaison (appelée avec this.couleur() en setter)
			@param {String} _coul - Couleur (de préférence de la forme "#RRVVBB").
			*/
		updateCouleurGraphismes(_coul)
		{
			this.children[0].graphics._stroke.style = _coul;
			this.children[1].graphics._stroke.style = _coul;
		}

			/** (ECRASE L A FONCTION ABSTRAITE) Fonction qui met à jour l'épaisseur des graphismes de la liaison (appelée avec this.epaisseur() en setter)
			@param {Number} _ep - Epaisseur (en px)
			*/
		updateEpaisseurGraphismes(_ep)
		{
			// À FAIRE
		}
		
			/** Fonction qui renvoie le vecteur V1, propre à la direction de la pièce femelle (voir {@link http://cillon.allais.eu/ressources/demo_glissiere.pdf})
			
			@return {Object} Vecteur de la forme {x:, y:} dans les coordonnées globale du schéma.
			*/
		v1()
		{
			var angle = (this.rotation + this.classe().rotation)*0.017453292519943295 ;//en rad
			return {x:Math.cos(angle), y:Math.sin(angle)};
		}
		
			/** Fonction qui renvoie le vecteur W1, perpendiculaire à la direction de la pièce femelle (voir {@link http://cillon.allais.eu/ressources/demo_glissiere.pdf})
			
			@return {Object} Vecteur de la forme {x:, y:} dans les coordonnées globale du schéma.
			*/
		w1()
		{
			var angle = (this.rotation + this.classe().rotation)*0.017453292519943295 ;//en rad
			return {x:-Math.sin(angle), y:Math.cos(angle)};
		}
		
		
			/** Fonction qui renvoie le vecteur V, directeur de la biscetrice de V1 et V2 (voir {@link http://cillon.allais.eu/ressources/demo_glissiere.pdf}). Doit être appelé aprés avoir mis à jour V1 et V2 dans this._VS.
			
			@return {Object} Vecteur de la forme {x:, y:} dans les coordonnées globale du schéma.
			*/
		v()
		{
			var norme = Math.sqrt(Math.pow(this._VS.v1.x+this._VS.v2.x , 2)+Math.pow(this._VS.v1.y+this._VS.v2.y , 2));
			return {x: (this._VS.v1.x+this._VS.v2.x)/norme, y:(this._VS.v1.y+this._VS.v2.y)/norme}
		}
		
		
			/** Fonction qui renvoie le vecteur W, directeur de la biscetrice de W1 et W2 (voir {@link http://cillon.allais.eu/ressources/demo_glissiere.pdf}). Doit être appelé aprés avoir mis à jour V dans this._VS.
			
			@return {Object} Vecteur de la forme {x:, y:} dans les coordonnées globale du schéma.
			*/
		w()
		{
			return {x: -this._VS.v.y, y: this._VS.v.x}
		}
		
			/** Fonction qui renvoie la constante B (voir {@link http://cillon.allais.eu/ressources/demo_glissiere.pdf}). Doit être appelé aprés avoir mis à jour V2 et W à jour dans this._VS.
			
			@return {Number} Constante B
			*/
		B()
		{
			if(this.version==2)
				return this.k()/(this._VS.v2.x*this._VS.w.y-this._VS.v2.y*this._VS.w.x)
			else if(this.version==3)
				return -this.k()/(this._VS.v2.x*this._VS.w1.y-this._VS.v2.y*this._VS.w1.x)
		}
		
			/** Fonction qui renvoie la constante C (voir {@link http://cillon.allais.eu/ressources/demo_glissiere.pdf}). Doit être appelé aprés avoir mis à jour L1L2 et V2 à jour dans this._VS.
			
			@return {Number} Constante C
			*/
		C()
		{
				return (this._VS.L1L2.x*this._VS.v2.y)-(this._VS.L1L2.y*this._VS.v2.x)
		}
		
			/** Fonction qui renvoie (en coordonnées absolues du schema) le vecteur entre l'origine de la classe d'équivalence soeur, et cette liaison
			@return {Object} {x:   , y: }
			*/
		O2L1()
		{
			var O2 = this.demiSoeur().localToLocal(0,0,schema);
			var L1 = this.localToLocal(0,0,schema);
			return {x: L1.x-O2.x, y:L1.y-O2.y}
		}
		
			/** Fonction qui met à jour la variable this._VS, qui contient les constantes de simulation (histoire de ne les calculer qu'une fois par simulation).
			@return {Object} Objet contenant toutes les constantes de simulation.
			*/
		updateConstantesSimulation()
		{
			this._VS.v1 = this.v1();
			this._VS.w1 = this.w1();
			this._VS.v2 = this.demiSoeur().v2() ;
			this._VS.w2 = this.demiSoeur().w2() ;
			if(this.version==2)
			{
				this._VS.v = this.v() ;
				this._VS.w = this.w() ;
			}
			this._VS.B = this.B() ;
			this._VS.L1L2 = this.L1L2(); // Vecteur de femelle vers male
			this._VS.C = this.C() ;
			this._VS.O1L1 = this.O1L1() ;
			this._VS.O2L2 = this.demiSoeur().O1L1();
			this._VS.O2L1 = this.O2L1() ;
			return this._VS
		}
			
			/** Fonction qui renvoie les coefficients de la matrice K
			
			@param {Number} _eq - N° de l'équation (correspond à 'quelle ligne ?') du PFS. Peut-être 0 (="TRS sur x"), 1 (="TRS sur y") ou 2 (="TMS en O1' sur theta").
			@param {Number} _i - Inconnue (correspond à 'quelle colonne ?'). Par exemple : 0:dx1, 1:dy1, 2:dtheta1, etc.
			*/
		getCoeff_K(_eq, _i)
		{
			var c=this._VS; // Les constantes
		
			if(this.version==2)
			{
					if(_eq==0)
					{
						if(_i==0)
						{
							return -c.B*(c.v2.y)*(c.w.x)
						}
						else if(_i==1)
						{
							return c.B*(c.v2.x)*(c.w.x)
						}
						else if(_i==2)
						{
							return c.B*((c.v2.y * c.O1L1.y - c.v2.x * c.O1L1.x) * c.w.x - 0.5 * c.C * c.v.x)
						}
						else if(_i==3)
						{
							return c.B*(c.v2.y * c.w.x)
						}
						else if(_i==4)
						{
							return -c.B*(c.v2.x * c.w.x)
						}
						else if(_i==5)
						{
							return c.B * ((-c.v2.y * c.O2L2.y - c.v2.x * c.O2L2.x + c.L1L2.x * c.w2.y - c.L1L2.y * c.w2.x ) * c.w.x - 0.5 * c.C * c.v.x)
						}
					}
					else if(_eq==1)
					{
						if(_i==0)
						{
							return c.B*(c.v2.y)*(c.w.y)
							return -c.B*(c.v2.y)*(c.w.y)
						}
						else if(_i==1)
						{
							return -c.B*(c.v2.x)*(c.w.y)
							return c.B*(c.v2.x)*(c.w.y)
						}
						else if(_i==2)
						{
							return -c.B*((c.v2.y * c.O1L1.y - c.v2.x * c.O1L1.x) * c.w.y - 0.5 * c.C * c.v.y)
							return c.B*((c.v2.y * c.O1L1.y - c.v2.x * c.O1L1.x) * c.w.y - 0.5 * c.C * c.v.y)
						}
						else if(_i==3)
						{
							return -c.B*(c.v2.y)*(c.w.y)
							return c.B*(c.v2.y)*(c.w.y)
						}
						else if(_i==4)
						{
							return c.B*(c.v2.x)*(c.w.y)
							return -c.B*(c.v2.x)*(c.w.y)
						}
						else if(_i==5)
						{
							return -c.B * ((-c.v2.y * c.O2L2.y - c.v2.x * c.O2L2.x + c.L1L2.x * c.w2.y - c.L1L2.y * c.w2.x ) * c.w.y - 0.5 * c.C * c.v.y)
							return c.B * ((-c.v2.y * c.O2L2.y - c.v2.x * c.O2L2.x + c.L1L2.x * c.w2.y - c.L1L2.y * c.w2.x ) * c.w.y - 0.5 * c.C * c.v.y)
						}
					}
					else if(_eq==2)
					{
						//return 0;
						if(_i==0)
						{
							return c.B * c.v2.y * (c.w.x * c.O1L1.y - c.w.y * c.O1L1.x)
						}
						else if(_i==1)
						{
							return c.B * c.v2.x * (c.w.y * c.O1L1.x - c.w.x * c.O1L1.y)
						}
						else if(_i==2)
						{
							return -this._kRot + c.B * (c.O1L1.x * ((c.v2.y*c.O1L1.y - c.v2.x * c.O1L1.x) * c.w.y - 0.5 * c.C * c.v.y) - c.O1L1.y * c.C * c.w.y + c.O1L1.y * ((-c.v2.y * c.O1L1.y + c.v2.x * c.O1L1.x) * c.w.x + 0.5 * c.C * c.v.x) - c.O1L1.x * c.C * c.w.x)
						}
						else if(_i==3)
						{
							return c.B * c.v2.y * (c.w.y * c.O1L1.x - c.w.x * c.O1L1.y)
						}
						else if(_i==4)
						{
							return c.B * c.v2.x * (c.w.x * c.O1L1.y - c.w.y * c.O1L1.x)
						}
						else if(_i==5)
						{
							return this._kRot + c.B * (c.O1L1.x * ((-c.v2.y * c.O2L2.y - c.v2.x * c.O2L2.x + c.L1L2.x * c.w2.y - c.L1L2.y * c.w2.x) * c.w.y - 0.5 * c.C*c.v.y) + c.O1L1.y * ((c.v2.y * c.O2L2.y + c.v2.x * c.O2L2.x - c.L1L2.x * c.w2.y + c.L1L2.y * c.w2.x) * c.w.x + 0.5 * c.C * c.v.x))
						}
					}
			}
			else if(this.version==3)
			{
					if(_eq==0)
					{
						if(_i==0)
						{
							return -c.B*(c.v2.y)*(c.w1.x)
						}
						else if(_i==1)
						{
							return c.B*(c.v2.y)*(c.w1.y)
						}
						else if(_i==2)
						{
							return c.B*((c.v2.y * c.O1L1.y + c.v2.x * c.O1L1.x) * c.w1.x - c.C * c.v1.x)
						}
						else if(_i==3)
						{
							return c.B*(c.v2.y * c.w1.x)
						}
						else if(_i==4)
						{
							return -c.B*(c.v2.x * c.w1.x)
						}
						else if(_i==5)
						{
							return c.B * ((-c.v2.y * c.O2L2.y - c.v2.x * c.O2L2.x + c.L1L2.x * c.w2.y - c.L1L2.y * c.w2.x ) * c.w1.x)
						}
					}
					else if(_eq==1)
					{
						if(_i==0)
						{
							return -c.B*(c.v2.y)*(c.w1.y)
						}
						else if(_i==1)
						{
							return c.B*(c.v2.x)*(c.w1.y)
						}
						else if(_i==2)
						{
							return c.B*((c.v2.y * c.O1L1.y + c.v2.x * c.O1L1.x) * c.w1.y - c.C * c.v1.y)
						}
						else if(_i==3)
						{
							return c.B*(c.v2.y)*(c.w1.y)
						}
						else if(_i==4)
						{
							return -c.B*(c.v2.x)*(c.w1.y)
						}
						else if(_i==5)
						{
							return c.B * ((-c.v2.y * c.O2L2.y - c.v2.x * c.O2L2.x + c.L1L2.x * c.w2.y - c.L1L2.y * c.w2.x ) * c.w1.y)
						}
					}
					else if(_eq==2)
					{
						//return 0;
						if(_i==0)
						{
							return c.B * c.v2.y * (c.w1.x * c.O1L1.y - c.w1.y * c.O1L1.x)
						}
						else if(_i==1)
						{
							return c.B * c.v2.x * (c.w1.y * c.O1L1.x - c.w1.x * c.O1L1.y)
						}
						else if(_i==2)
						{
							return -this._kRot + c.B * (c.O1L1.x * ((c.v2.y*c.O1L1.y + c.v2.x * c.O1L1.x) * c.w1.y - c.C * c.v1.y) - c.O1L1.y * c.C * c.w1.y + c.O1L1.y * (-(-c.v2.y * c.O1L1.y + c.v2.x * c.O1L1.x) * c.w1.x + c.C * c.v1.x) - c.O1L1.x * c.C * c.w1.x)
						}
						else if(_i==3)
						{
							return c.B * c.v2.y * (c.w1.y * c.O1L1.x - c.w1.x * c.O1L1.y)
						}
						else if(_i==4)
						{
							return c.B * c.v2.x * (c.w1.x * c.O1L1.y - c.w1.y * c.O1L1.x)
						}
						else if(_i==5)
						{
							return this._kRot + c.B * (c.O1L1.x * ((-c.v2.y * c.O2L2.y - c.v2.x * c.O2L2.x + c.L1L2.x * c.w2.y - c.L1L2.y * c.w2.x) * c.w1.y) + c.O1L1.y * (-(-c.v2.y * c.O2L2.y - c.v2.x * c.O2L2.x - c.L1L2.x * c.w2.y + c.L1L2.y * c.w2.x) * c.w1.x)) 
						}
					}
			}
			return null;
		}
			
			/** Fonction qui renvoie les coefficients de la matrice K
			
			@param {Number} _eq - N° de l'équation (correspond à 'quelle ligne ?') du PFS. Peut-être 0 (="TRS sur x"), 1 (="TRS sur y") ou 2 (="TMS en O1' sur theta").
			*/
		getCoeff_F(_eq)
		{
			var c=this._VS; // Les constantes
			if(this.version==2)
			{
					if(_eq==0)
					{
						return -c.B * c.C * c.w.x;
					}
					else if(_eq==1)
					{
						return -c.B * c.C * c.w.y;
					}
					else if(_eq==2)
					{
						//return this._kRot * (this.rotation+this.classe().rotation-this.demiSoeur().rotation-this.demiSoeur().classe().rotation)
						return this._kRot * (this.rotation+this.classe().rotation-this.demiSoeur().rotation-this.demiSoeur().classe().rotation) + c.B * c.C * (c.w.x * c.O1L1.y - c.w.y * c.O1L1.x)
					}
			}
			else if(this.version==3)
			{
					if(_eq==0)
					{
						return -c.B * c.C * c.w1.x;
					}
					else if(_eq==1)
					{
						return -c.B * c.C * c.w1.y;
					}
					else if(_eq==2)
					{
						return this._kRot * (this.rotation+this.classe().rotation-this.demiSoeur().rotation-this.demiSoeur().classe().rotation) + c.B * c.C * (c.w1.x * c.O1L1.y - c.w1.y * c.O1L1.x)
					}
			}
			return null;
		}
		
			/** Fonction qui "fabrique" la matrice K, de dimension (3x6) correspondant à la demi-liaison. Cette matrice est ensuite ajoutée à la matrice K globale, via la méthode {@link remplisSysteme_liaison}
			
			@return {Array} Matrice K*/
		
		construit_K_local()
		{
			return 	[[this.getCoeff_K(0,0), this.getCoeff_K(0,1), this.getCoeff_K(0,2), this.getCoeff_K(0,3), this.getCoeff_K(0,4), this.getCoeff_K(0,5)],
				[this.getCoeff_K(1,0), this.getCoeff_K(1,1), this.getCoeff_K(1,2), this.getCoeff_K(1,3), this.getCoeff_K(1,4), this.getCoeff_K(1,5)],
				[this.getCoeff_K(2,0), this.getCoeff_K(2,1), this.getCoeff_K(2,2), this.getCoeff_K(2,3), this.getCoeff_K(2,4), this.getCoeff_K(2,5)]]
		}
		
			/** Fonction qui "fabrique" le second membre F, de dimension (3x1) correspondant à la demi-liaison. Cette matrice est ensuite ajoutée à la matrice F globale, via la méthode {@link remplisSysteme_liaison}
			
			@return {Array} Matrice F (second membre)*/
		
		construit_F_local()
		{
			return 	[	this.getCoeff_F(0),
					this.getCoeff_F(1),
					this.getCoeff_F(2)];
		}
		
			/**  (ECRASE L A FONCTION ABSTRAITE) Ajoute (= modifie en place dans les grosses matrices K et F globales) la sous partie liée à la liaison. Écrase la méthode abstraite mère.
				
			@param {Array} K - Référence vers la matrice K générale du système global.
			@param {Array} F - Référence vers le vecteur F second membre du système global (vecteur en ligne, à une dimension)
			@return {Object} {K:   , F :} Objet représentant les PETITES matrices du système, liées à la liaison (Attention, ce ne sont pas les matrices globales)
			*/
		
		remplisSysteme_liaison(K,F)
		{
			var n1 = this.classe().numero(); //Numéro de la CE
			var n2 = this.demiSoeur().classe().numero() // Numéro de la CE de la demi-Soeur
			
			if(this.version==1) // ANCIENNE METHODE
			{
						var O1L1 = this.O1L1();
						var O2L2 = this.demiSoeur().O1L1();
						var L1L2 = this.L1L2();
						var k = this._k
						var kRot = this._kRot;
						var alpha1 = this.getAbsoluteRotation(); // En degrés
						var alpha2 = (this.demiSoeur().getAbsoluteRotation()); // Orientation de la direction de la demi-soeur (absolu)
						var sina2 = Math.sin(alpha2*Math.PI/180);
						var cosa2 =  Math.cos(alpha2*Math.PI/180);
						var B = O1L1.x*cosa2 + O1L1.y*sina2;
						var C = O1L1.x*sina2 + O1L1.y*cosa2;
						var D = L1L2.x*sina2 + L1L2.y*cosa2;
						
					
						//NOTE : il faudra peut être condenser les lignes suivantes
								
						var KK = [	[-k*sina2*sina2,		k*sina2*cosa2,	k*sina2*(O1L1.y*sina2+O1L1.x*cosa2),	k*sina2*sina2,	-k*sina2*cosa2,	-k*sina2*(O2L2.y*sina2+O2L2.x*cosa2)	],
								[k*cosa2*sina2,		-k*cosa2*cosa2,	-k*cosa2*(O1L1.y*sina2+O1L1.x*cosa2),	-k*cosa2*sina2,	k*cosa2*cosa2,	k*cosa2*(O2L2.y*sina2+O2L2.x*cosa2)	],
								[k*B*sina2 - kRot,	-k*B*cosa2,	-k*(B*B+C*D),	-k*B*sina2+kRot,	k*B*cosa2,	k*B*(O2L2.y*sina2+O2L2.x*cosa2)	]	
								]
								
						//var FF = [k*L1L2.x,k*L1L2.y,k*(O1L1.x*L1L2.y-O1L1.y*L1L2.x)]
						var FF = [k*sina2*(-L1L2.x*sina2+L1L2.y*cosa2),	-k*cosa2*(-L1L2.x*sina2+L1L2.y*cosa2),	-k*B*(-L1L2.x*sina2+L1L2.y*cosa2)-kRot*(alpha2-alpha1)]
						

						
						
				} // FIN DE L'ANCIENNE METHODE
				else
				{ // DEBUT NOUVELLES METHODES
					this.updateConstantesSimulation();
					var KK = this.construit_K_local();	
					var FF = this.construit_F_local();
				}
				
				//On recopie dans les bonnes lignes de K et F
				for(var i=0; i<3 ; i++) // Pour chacune des 3 lignes
				{
					// Recopiage
					//K.set([3*n1+i,3*n1], K.get([3*n1+i,3*n1])+KK[i][0])
					K.ajouteVal( 3*n1+i , 3*n1,	KK[i][0])

					K.ajouteVal( 3*n1+i , 3*n1+1, KK[i][1])
					K.ajouteVal( 3*n1+i , 3*n1+2, KK[i][2])
					
					K.ajouteVal( 3*n1+i , 3*n2, 	KK[i][3])
					K.ajouteVal( 3*n1+i , 3*n2+1,	KK[i][4])
					K.ajouteVal( 3*n1+i , 3*n2+2,  KK[i][5])
					
					F.ajouteVal( 3*n1+i, FF[i])
					

				}
				
						
						
				// AJOUTE DE LA MOTORISATION
				if(this._pilotee && ACTION == "simule")
				{
				
					// A faire
				}
			
			return {K:KK,F:FF}
		}

		/** Fonction qui calcule le score (= la distance) entre chaque demi liaison pivot (écrase la fonction abstraite)
			@ return {Number} Score
			*/
		getScore()
		{
			return 0;
			// A FAIRE
		}
		
}

