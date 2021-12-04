

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



