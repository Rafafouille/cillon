//Pivot animée, en attendant d'être placée

var PivotMale = function()
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
		this._rayon=10;
		this._longueurTige=20;
		


	//==========================
	//getter/setter
	//==========================

		// Rayon du cercle
		this.rayon=function(r)
		{
			if(typeof(r)!='undefined')
				{
					this._rayon=r;
					//Met à jour les couleur directement sur les graphismes
					// ... à faire
				}
			return this._rayon;
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
			this._cercle.graphics._stroke.style=_coul;
			this._tige.graphics._stroke.style=_coul;
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
			var n1 = this.classe().numero(); //Numéro de la CE
			var n2 = this.demiSoeur().classe().numero() // Numéro de la CE de la demi-Soeur
		
		
			//NOTE : il faudra peut être condenser les lignes suivantes
					
			var KK = [	[-k,		0,		k*O1L1.y,								k,		0,		-k*O2L2.y],
					[0,		-k,		-k*O1L1.x,								0,		k,		k*O2L2.x],
					[O1L1.y*k,	-O1L1.x*k,	-k*(O1L1.y*O1L1.y+O1L1.x*O1L1.x+O1L1.y*L1L2.y+O1L1.x*L1L2.x),	-O1L1.y*k,	O1L1.x*k,	k*(O1L1.y*O2L2.y+O1L1.x*O2L2.x)]	
					]
					//[O1L1.y*k,	-O1L1.x*k,	-k*(O1L1.y*O1L1.y+O1L1.x*O1L1.x),	-O1L1.y*k,	O1L1.x*k,	k*(O1L1.y*O2L2.y+O1L1.x*O2L2.x)]	] //Ancien
					
			//var FF = [k*L1L2.x,k*L1L2.y,k*(O1L1.x*L1L2.y-O1L1.y*L1L2.x)]
			var FF = [-k*L1L2.x,	-k*L1L2.y,	k*(O1L1.y*L1L2.x-O1L1.x*L1L2.y)]
			

			
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
			
				var k = this._kRot //Raideur en rotation
				var signe = 1-2*(this._genre=="male")
				var deltaTheta0 = this.classe().lastPosition().theta-this.demiSoeur().classe().lastPosition().theta;	//Ecart initial
				var deltaTheta = this.classe().rotation-this.demiSoeur().classe().rotation;	//Ecart actuel
				K.ajouteVal(3*n1+2, 3*n1+2, -k)
				K.ajouteVal(3*n2+2, 3*n2+2, k)

				F.ajouteVal(3*n1+2, k*(deltaTheta-deltaTheta0+signe*this.consigneAngulaire()));//+k*)
			}
			
			return {K:KK,F:FF}
		}

		//Fonction qui sert de consigne angulaire, dans le cas où c'est une piloté
		this.consigneAngulaire=function()
		{
			var t=schema.tSimulation();
			return -t*20;
			
			var omega = 2*math.pi*0.1 //vitesse angulaire
			return math.sin(omega*t)*90
		}

		
	//==========================
	//Graphismes
	//==========================
	
		this._cercle=new createjs.Shape();
		this._cercle.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur).beginFill("white").drawCircle(0, 0, this._rayon);
		this.addChild(this._cercle);
		
		this._tige=new createjs.Shape();
		this._tige.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur).moveTo(this._rayon,0).lineTo(this._rayon+this._longueurTige,0);
		this.addChild(this._tige);


		//Les shapes n'ont pas de bornes. Alors on va en créer
		
		this.setBounds(-this._rayon-this._longueurTige,-this._rayon-this._longueurTige,2*(this._rayon+this._longueurTige),2*(this._rayon+this._longueurTige))


}
PivotMale.prototype = Object.create(DemiLiaison.prototype);//On recopie le prototype de DemiLiaison
PivotMale.prototype.constructor = PivotMale;//On recopie le constructeur de Noeud dans son prototype



