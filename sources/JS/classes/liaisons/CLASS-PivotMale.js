//Pivot animée, en attendant d'être placée
/*
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
					[O1L1.y*k,	-O1L1.x*k,	-k*(O1L1.y*O1L1.y+O1L1.x*O1L1.x+O1L1.y*L1L2.y-O1L1.x*L1L2.x),	-O1L1.y*k,	O1L1.x*k,	k*(O1L1.y*O2L2.y+O1L1.x*O2L2.x)]	
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
			//return -t*20;
			
			var omega = 2*math.pi*0.1 //vitesse angulaire
			return math.sin(omega*t)*30-30
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

*/




/**
 * Demi-liaison "Pivot" désignée comme mâle
 * @extends DemiLiaison
 */
class PivotMale extends DemiLiaison
{


	// **********************************************************
	/*
	 * Constructeur
	 */
	constructor()
	{
		super()	// Rappelle le constructeur parent
		
		
		// Constantes ************
		this._genre = "male";	//Permet de discriminer la liaison "male" et la liaison "femelle"
		
		
		// Graphismes **********
		this._cercle=new createjs.Shape();
		this._cercle.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur).beginFill("white").drawCircle(0, 0, this._rayon);
		this.addChild(this._cercle);
		
		this._tige=new createjs.Shape();
		this._tige.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur).moveTo(this._rayon,0).lineTo(this._rayon+this._longueurTige,0);
		this.addChild(this._tige);


		//Les shapes n'ont pas de bornes. Alors on va en créer
		
		this.setBounds(-this._rayon-this._longueurTige,-this._rayon-this._longueurTige,2*(this._rayon+this._longueurTige),2*(this._rayon+this._longueurTige))
		
	}
	
	
	
	// MEMBRES **********************************************************
	
			/** Rayon du cercle qui dessine la liaison pivot, en px.
			@type {Number}  */
		_rayon = 10 ;
		
			/** Longueur de la tige (à partir du cercle), en px.
			@type {Number}  */
		_longueurTige = 20;
		
			/** Dessin le cercle
			@type {createjs.Shape}  */
		_cercle = new createjs.Shape();
		
			/** Dessin la tige
			@type {createjs.Shape}  */
		_tige = new createjs.Shape();
		
	// getter/setter ****************************************************

			/** GETTER / SETTER du rayon.
			@param {Number} r - [OPTIONNEL] Nouvelle valeur du rayon.
			@return {Number} Le rayon courant
			*/
		rayon(r)
		{
			if(typeof(r)!='undefined')
				{
					this._rayon=r;
					//Met à jour les dimensions directement sur les graphismes
					// ... à faire
				}
			return this._rayon;
		}
		
			/** GETTER / SETTER de la longueur de tige.
			@param {Number} l - [OPTIONNEL] Nouvelle valeur de la longueure.
			@return {Number} La longueur courante
			*/
		longueurTige(l)
		{
			if(typeof(l)!='undefined')
				{
					this._longueurTige=l;
					//Met à jour les dimensions directement sur les graphismes
					// ... à faire
				}
			return this._longueurTige;
		}
		
	//==========================
	//Autres fonctions membres
	//==========================

			/** Fonction qui met à jour la couleur des graphismes de la liaison (appelée avec this.couleur() en setter). Écrase la méthode abstraite mère.
			@param {String} _coul - Couleur
			*/
		updateCouleurGraphismes(_coul)
		{		
			this._cercle.graphics._stroke.style=_coul;
			this._tige.graphics._stroke.style=_coul;
		}
		
			/** Fonction qui met à jour l'épaisseur des graphismes de la liaison (appelée avec this.epaisseur() en setter). Écrase la méthode abstraite mère.
			@param {Number} _ep - Épaisseur
			*/
		updateEpaisseurGraphismes(_ep)
		{
			// À FAIRE
		}
		
		
			/** ÉCRASE LA CLASSE ABSTRAITE MÈRE - Fonction qui met à jour la variable this._VS, qui contient les constantes de simulation (histoire de ne les calculer qu'une fois par pas de temps).
			@return {Object} Objet contenant toutes les constantes de simulation.
			*/
		updateConstantesSimulation()
		{
			this._VS.O1L1 = this.O1L1() ;
			this._VS.O2L2 = this.demiSoeur().O1L1(); ;
			this._VS.L1L2 = this.L1L2() ;
			return this._VS
		}
		
		
			/**ÉCRASE LA CLASSE ABSTRAITE MÈRE -  Fonction qui renvoie les coefficients de la matrice K
			
			@param {Number} _eq - N° de l'équation (correspond à 'quelle ligne ?') du PFS. Peut-être 0 (="TRS sur x"), 1 (="TRS sur y") ou 2 (="TMS en O1' sur theta").
			@param {Number} _i - Inconnue (correspond à 'quelle colonne ?'). Par exemple : 0:dx1, 1:dy1, 2:dtheta1, etc.
			*/
		getCoeff_K(_eq, _i)
		{
			var c = this._VS
			if(_eq==0)
			{
				if(_i==0)
				{
					return -this._k ;
				}
				else if(_i==1)
				{
					return 0 ;
				}
				else if(_i==2)
				{
					return this._k*c.O1L1.y;
				}
				else if(_i==3)
				{
					return this._k ;
				}
				else if(_i==4)
				{
					return 0 ;
				}
				else if(_i==5)
				{
					return -this._k*c.O2L2.y;
				}
			}
			else if(_eq==1)
			{
				if(_i==0)
				{
					return 0;
				}
				else if(_i==1)
				{
					return -this._k;
				}
				else if(_i==2)
				{
					return -this._k * c.O1L1.x;
				}
				else if(_i==3)
				{
					return 0 ;
				}
				else if(_i==4)
				{
					return this._k;
				}
				else if(_i==5)
				{
					return this._k*c.O2L2.x;
				}
			}
			else if(_eq==2)
			{
				if(_i==0) 
				{
					return this._k * c.O1L1.y;
				}
				else if(_i==1)
				{
					return -this._k * c.O1L1.x;
				}
				else if(_i==2)
				{
					return -this._k * (c.O1L1.y * c.O1L1.y + c.O1L1.x * c.O1L1.x + c.O1L1.y * c.L1L2.y - c.O1L1.x * c.L1L2.x);
				}
				else if(_i==3)
				{
					return -this._k * c.O1L1.y ;
				}
				else if(_i==4)
				{
					return this._k * c.O1L1.x ;
				}
				else if(_i==5)
				{
					return this._k * (c.O1L1.y * c.O2L2.y + c.O1L1.x * c.O2L2.x ) ;
				}
			}
		}

/** Fonction qui renvoie les coefficients de la matrice K
			
			@param {Number} _eq - N° de l'équation (correspond à 'quelle ligne ?') du PFS. Peut-être 0 (="TRS sur x"), 1 (="TRS sur y") ou 2 (="TMS en O1' sur theta").
			*/
		getCoeff_F(_eq)
		{
			var c=this._VS; // Les constantes
			
			if(_eq==0)
			{
				return -this._k * c.L1L2.x
			}
			else if(_eq==1)
			{
				return -this._k * c.L1L2.y
			}
			else if(_eq==2)
			{
				return this._k * (c.O1L1.y*c.L1L2.x-c.O1L1.x*c.L1L2.y)
			}

			return null;
		}




			/** (ECRASE L A FONCTION ABSTRAITE) Ajoute (= modifie en place dans les grosses matrices K et F globales) la sous partie liée à la liaison. Écrase la méthode abstraite mère. Voir la démonstration à cette adresse : {@link http://cillon.allais.eu/ressources/demo_pivot.pdf}.
			@param {Array} K - Référence vers la matrice K générale du système global.
			@param {Array} F - Référence vers le vecteur F second membre du système global (vecteur en ligne, à une dimension)
			@return {Object} {K:   , F :} Objet représentant les PETITES matrices du système, liées à la liaison (Attention, ce ne sont pas les matrices globales)
			*/
		remplisSysteme_liaison(K,F)
		{
			var n1 = this.classe().numero(); //Numéro de la CE
			var n2 = this.demiSoeur().classe().numero() // Numéro de la CE de la demi-Soeur
			/*
			var O1L1 = this.O1L1();
			var O2L2 = this.demiSoeur().O1L1();
			var L1L2 = this.L1L2();
			var k = this._k
		
			console.log("=======================================");
			//NOTE : il faudra peut être condenser les lignes suivantes
					
			var KK = [	[-k,		0,		k*O1L1.y,								k,		0,		-k*O2L2.y],
					[0,		-k,		-k*O1L1.x,								0,		k,		k*O2L2.x],
					[O1L1.y*k,	-O1L1.x*k,	-k*(O1L1.y*O1L1.y+O1L1.x*O1L1.x+O1L1.y*L1L2.y-O1L1.x*L1L2.x),	-O1L1.y*k,	O1L1.x*k,	k*(O1L1.y*O2L2.y+O1L1.x*O2L2.x)]	
					]
					//[O1L1.y*k,	-O1L1.x*k,	-k*(O1L1.y*O1L1.y+O1L1.x*O1L1.x),	-O1L1.y*k,	O1L1.x*k,	k*(O1L1.y*O2L2.y+O1L1.x*O2L2.x)]	] //Ancien
					
			//var FF = [k*L1L2.x,k*L1L2.y,k*(O1L1.x*L1L2.y-O1L1.y*L1L2.x)]
			var FF = [-k*L1L2.x,	-k*L1L2.y,	k*(O1L1.y*L1L2.x-O1L1.x*L1L2.y)]
			

*/

			this.updateConstantesSimulation();
			var KK = this.construit_K_local();	
			var FF = this.construit_F_local();
			
			
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

				F.ajouteVal(3*n1+2, k*(deltaTheta-deltaTheta0+signe*this.evalueConsigne()*57.29577951308232  ));//+k*) // 57,29... = conversion rad / deg
			}
			
			return {K:KK,F:FF}
		}
		
			/* Fonction qui sert de consigne angulaire, dans le cas où c'est une piloté.
			@retrun {Number} Valeur de la consigne, instantanée (à la date schema.tSimulation).
			*/
		/*consigneAngulaire()
		{
			var t=schema.tSimulation();
			//return -t*20;
			
			var omega = 2*math.pi*0.1 //vitesse angulaire
			return math.sin(omega*t)*30-30
		}*/

	

			/** Fonction qui calcule le score (= la distance) entre chaque demi liaison pivot (écrase la fonction abstraite)
			@ return {Number} Score
			*/
		getScore()
		{
			var V= this.L1L2();
			var ecart_distance = Math.sqrt(V.x*V.x+V.y*V.y); // en px
			var ecart_consigne = 0 // en °
			
			if(this._pilotee && ACTION == "simule")
			{
				var deltaTheta0 = this.classe().lastPosition().theta-this.demiSoeur().classe().lastPosition().theta;	//Ecart initial
				var deltaTheta = this.classe().rotation-this.demiSoeur().classe().rotation;	//Ecart actuel
				var signe = 1-2*(this._genre=="male")
				ecart_consigne = Math.abs(deltaTheta-deltaTheta0+signe*this.evalueConsigne()*57.29577951308232);
			}
			return  ecart_distance + ecart_consigne;
		}
}


