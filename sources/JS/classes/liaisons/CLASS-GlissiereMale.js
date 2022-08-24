
/*
var GlissiereMale = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		DemiLiaison.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		//Définition
		this._genre = "male";	//Permet de discriminer la liaison "male" et la liaison "femelle"
		
		//Caractéristiques géométriques de la liaison
		this._longueur=100; // Longueur de la tige mâle
		


	//==========================
	//getter/setter
	//==========================

		// Longueur de la tige
		this.longueur=function(r)
		{
			if(typeof(l)!='undefined')
				{
					this._longueur=l;
					//Met à jour les couleur directement sur les graphismes
					// ... à faire
				}
			return this._longueur;
		}
		

	//==========================
	//Autres fonctions membres
	//==========================

		//ECRASE L'ANCIENNE
		//Fonction qui met à jour la couleur des graphismes de la liaison (appelée avec this.couleur() en setter)
		this.updateCouleurGraphismes = function(_coul)
		{
			this.children[0].graphics._stroke.style = _coul;
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
			//console.log("alpha1 = "+alpha1+"    ;    alpha2 ="+alpha2)
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
	
		this._ligne=new createjs.Shape();
		this._ligne.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur).moveTo(-this._longueur/2.,0).lineTo(this._longueur/2.,0);
		this.addChild(this._ligne);


		//Les shapes n'ont pas de bornes. Alors on va en créer
		
		this.setBounds(-this._longueur/2.,this._epaisseur/2.,this._longueur/2.,-this._epaisseur/2.)


}
GlissiereMale.prototype = Object.create(DemiLiaison.prototype);//On recopie le prototype de DemiLiaison
GlissiereMale.prototype.constructor = GlissiereMale;//On recopie le constructeur de Noeud dans son prototype
*/















/**
 * Demi-liaison "Glissière" désignée comme mâle
 * @extends DemiLiaison
 */
class GlissiereMale extends DemiLiaison
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
		this._genre = "male";	//Permet de discriminer la liaison "male" et la liaison "femelle"
		this._nom = "Glissière"
		
		// GRAPHISMES
			this._ligne = new createjs.Shape();
			this._ligne.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur).moveTo(-this._longueur/2.,0).lineTo(this._longueur/2.,0);
			this.addChild(this._ligne);


			//Les shapes n'ont pas de bornes. Alors on va en créer
			
			this.setBounds(-this._longueur/2.,this._epaisseur/2.,this._longueur/2.,-this._epaisseur/2.)
	}
	
	
	// MEMBRES **********************************************************
		/** Longueur de la tige (de base) mâle qui passe dans la liaison
			@type {Number}  */
		_longueur = 100 ;

		/** Dessin de la ligne mâle
			@type {createjs.Shape}  */
		_ligne = new createjs.Shape();
		
		
	// getter/setter ****************************************************

			/** GETTER / SETTER de la longueur de la tige mâle.
			@param {Number} [l] - [OPTIONNEL] Nouvelle valeur de longueur de la tige mâle (en px).
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

	//==========================
	//Autres fonctions membres
	//==========================
	
	
			/** (ECRASE L A FONCTION ABSTRAITE) Fonction qui met à jour la couleur des graphismes de la liaison (appelée avec this.couleur() en setter)
			@param {String} _coul - Couleur (de préférence de la forme "#RRVVBB").
			*/
		updateCouleurGraphismes(_coul)
		{
			this.children[0].graphics._stroke.style = _coul;
		}

			/** (ECRASE L A FONCTION ABSTRAITE) Fonction qui met à jour l'épaisseur des graphismes de la liaison (appelée avec this.epaisseur() en setter)
			@param {Number} _ep - Epaisseur (en px)
			*/
		updateEpaisseurGraphismes(_ep)
		{
			// À FAIRE
		}
		
		
		
			/** Fonction qui renvoie le vecteur V2, propre à la direction de la pièce mâle (voir {@link http://cillon.allais.eu/ressources/demo_glissiere.pdf})
			
			@return {Object} Vecteur de la forme {x:, y:} dans les coordonnées globale du schéma.
			*/
		v2()
		{
			var angle = (this.rotation + this.classe().rotation)*0.017453292519943295 ;//en rad
			return {x:Math.cos(angle), y:Math.sin(angle)};
		}
		
			/** Fonction qui renvoie le vecteur W2, perpendiculaire à la direction de la pièce mâle (voir {@link http://cillon.allais.eu/ressources/demo_glissiere.pdf})
			
			@return {Object} Vecteur de la forme {x:, y:} dans les coordonnées globale du schéma.
			*/
		w2()
		{
			var angle = (this.rotation + this.classe().rotation)*0.017453292519943295 ;//en rad
			return {x:-Math.sin(angle), y:Math.cos(angle)};
		}
		
			/** Fonction qui met à jour la variable this._VS, qui contient les constantes de simulation (histoire de ne les calculer qu'une fois par simulation). Concrètement, toutes les constantes sont concentrées dans la liaison demi-soeur.
			@return {Object} Objet contenant toutes les constantes de simulation.
			*/
		updateConstantesSimulation()
		{
			return this.demiSoeur().updateConstantesSimulation()
		}
			
			/** Fonction qui renvoie les coefficients de la matrice K
			
			@param {Number} _eq - N° de l'équation (correspond à 'quelle ligne ?') du PFS. Peut-être 0 (="TRS sur x"), 1 (="TRS sur y") ou 2 (="TMS en O1' sur theta").
			@param {Number} _i - Inconnue (correspond à 'quelle colonne ?'). Par exemple : 0:dx1, 1:dy1, 2:dtheta1, etc.
			*/
		getCoeff_K(_eq, _i)
		{
			var c=this.demiSoeur()._VS; // Les constantes

			if(this.demiSoeur().version==3)
			{
					if(_eq==0)
					{
						if(_i==0)
						{
							return -this.demiSoeur().getCoeff_K(0,3);
						}
						else if(_i==1)
						{
							return -this.demiSoeur().getCoeff_K(0,4);
						}
						else if(_i==2)
						{
							return -this.demiSoeur().getCoeff_K(0,5);
						}
						else if(_i==3)
						{
							return -this.demiSoeur().getCoeff_K(0,0);
						}
						else if(_i==4)
						{
							return -this.demiSoeur().getCoeff_K(0,1);
						}
						else if(_i==5)
						{
							return -this.demiSoeur().getCoeff_K(0,2);
						}
					}
					else if(_eq==1)
					{
						if(_i==0)
						{
							return -this.demiSoeur().getCoeff_K(1,3);
						}
						else if(_i==1)
						{
							return -this.demiSoeur().getCoeff_K(1,4);
						}
						else if(_i==2)
						{
							return -this.demiSoeur().getCoeff_K(1,5);
						}
						else if(_i==3)
						{
							return -this.demiSoeur().getCoeff_K(1,0);
						}
						else if(_i==4)
						{
							return -this.demiSoeur().getCoeff_K(1,1);
						}
						else if(_i==5)
						{
							return -this.demiSoeur().getCoeff_K(1,2);
						}
					}
					else if(_eq==2)
					{
						//return 0;
						if(_i==0)
						{
							return -c.B*c.v2.y * (c.w1.y * c.O2L1.x - c.w1.x * c.O2L1.y)
						}
						else if(_i==1)
						{
							return -c.B*c.v2.x * (c.w1.x*c.O2L1.y - c.w1.y*c.O2L1.x)
						}
						else if(_i==2)
						{
							return -this._kRot - c.B* (c.O2L1.x * (-c.v2.y*c.O2L2.y - c.v2.x*c.O2L2.x + c.L1L2.x*c.w2.y - c.L1L2.y*c.w2.x)*c.w1.y  - c.O2L1.y * c.w1.x * (-c.v2.y*c.O2L2.y - c.v2.x*c.O2L2.x + c.L1L2.x*c.w2.y - c.L1L2.y*c.w2.x)  )
						}
						else if(_i==3)
						{
							return -c.B*( c.C*c.w1.y + c.v2.y*(c.w1.x*c.O2L1.y - c.w1.y*c.O2L1.x))
						}
						else if(_i==4)
						{
							return -c.B*(-c.C*c.w1.x + c.v2.x*(c.w1.y*c.O2L1.x - c.w1.x*c.O2L1.y))
						}
						else if(_i==5)
						{
							return this._kRot - c.B*( c.O2L1.x*((c.v2.y*c.O1L1.y+c.v2.x*c.O1L1.x)*c.w1.y - c.C*c.v1.y) - c.C*(c.O1L1.x*c.w1.x+c.O1L1.y*c.w1.y) - c.O2L1.y*((c.v2.y*c.O1L1.y+c.v2.x*c.O1L1.x)*c.w1.x-c.C*c.v1.x) )
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
			var c=this.demiSoeur()._VS; // Les constantes
			if(this.demiSoeur().version==3)
			{
					if(_eq==0)
					{
						return -this.demiSoeur().getCoeff_F(0);
					}
					else if(_eq==1)
					{
						return -this.demiSoeur().getCoeff_F(1);
					}
					else if(_eq==2)
					{
						return this._kRot*(this.rotation+this.classe().rotation-this.demiSoeur().rotation-this.demiSoeur().classe().rotation)+c.B*c.C*(c.w1.y*c.O2L1.x-c.w1.x*c.O2L1.y)
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
			// Attention à l'ordre "1" et "2"
			var n1 = this.classe().numero(); //Numéro de la CE
			var n2 = this.demiSoeur().classe().numero() // Numéro de la CE de la demi-Soeur
			if(this.demiSoeur().version==1)
			{
								var O1L1 = this.O1L1();
								var O2L2 = this.demiSoeur().O1L1();
								var L1L2 = this.L1L2();
								var k = this._k
								var kRot = this._kRot;
								var alpha1 = this.getAbsoluteRotation(); // En degrés
								var alpha2 = (this.demiSoeur().getAbsoluteRotation()); // Orientation de la direction de la demi-soeur (absolu)
								//console.log("alpha1 = "+alpha1+"    ;    alpha2 ="+alpha2)
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

