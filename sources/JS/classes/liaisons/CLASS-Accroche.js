//Pivot animée, en attendant d'être placée
/*
var Accroche = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		DemiLiaison.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		this._k=50;	//Raideur de la liaison

	//==========================
	//getter/setter
	//==========================


	//==========================
	//Autres fonctions membres
	//==========================

		
		//Fonction qui renvoie (en coordonnées absolues) le vecteur entre l'origine de la CE mère, et cette liaison
		this.L1S = function()
		{
			var S = {x:suiveur.x, y:suiveur.y};
			var L1 = this.localToLocal(0,0,schema);
			return {x: S.x-L1.x, y:S.y-L1.y}
		}

		//Ajoute (dans la grosse matrice K et F globale) la sous partie liée à la liaison
		this.remplisSysteme_liaison = function(K,F)
		{
			var k = this._k
			var n1 = this.classe().numero(); //Numéro de la CE
			var L1S = this.L1S()
			var O1L1 = this.O1L1();
		
			//NOTE : il faudra peut être condenser les lignes suivantes
					
			var KK = [	[-k,		0,			-k*O1L1.y							],
					[0,		-k,			k*O1L1.x								],
					[k*O1L1.y,	-k*O1L1.x,		k*(-O1L1.x*O1L1.x-O1L1.y*L1S.y-O1L1.y*O1L1.y-O1L1.x*L1S.x)	]	]
					
			//var FF = [k*L1L2.x,k*L1L2.y,k*(O1L1.x*L1L2.y-O1L1.y*L1L2.x)]
			var FF = [-k*L1S.x	,	-k*L1S.y	,	k*(-O1L1.x*L1S.y+O1L1.y*L1S.x)]
			

			
			//On recopie dans les bonnes lignes de K et F
			for(var i=0; i<3 ; i++) // Pour chacune des 3 lignes
			{
				// Recopiage
				//K.set([3*n1+i,3*n1], K.get([3*n1+i,3*n1])+KK[i][0])
				K.ajouteVal( 3*n1+i , 3*n1,	KK[i][0])
				K.ajouteVal( 3*n1+i , 3*n1+1, KK[i][1])
				K.ajouteVal( 3*n1+i , 3*n1+2, KK[i][2])
				
				
				F.ajouteVal( 3*n1+i, FF[i])
				

			}
			
			
			return {K:KK,F:FF}
		}


		
	//==========================
	//Graphismes
	//==========================
	
		this._main = new createjs.Bitmap("./sources/images/main_fermee.png");
		this._main.scaleX = this._main.scaleY = 0.2;
		this._main.x -= 9.4;
		this._main.y -= 9.4;
		this.addChild(this._main);

}
Accroche.prototype = Object.create(DemiLiaison.prototype);//On recopie le prototype de createjs.Stage
Accroche.prototype.constructor = Accroche;//On recopie le constructeur de Noeud dans son prototype


*/



/**
 * Demi-liaison "Accroche", qui est crée au moment de cliquer de manière ephémère avec la souris en mode "simulation manuelle".
 * @extends PivotMale
 */
class Accroche extends DemiLiaison
{

	// **********************************************************
	/*
	 * Constructeur
	 */
	constructor()
	{
		// Héritage
		super()	// Rappelle le constructeur parent
		
		
		this._k=20;	//Raideur de la liaison
		
		// Graphismes
		this._main = new createjs.Bitmap("./sources/images/main_fermee.png");
		this._main.scaleX = this._main.scaleY = 0.2;
		this._main.x -= 9.4;
		this._main.y -= 9.4;
		this.addChild(this._main);
	}
	
	
	//==========================
	//membres
	//==========================
	
			/** Image Bitmap qui contient le curseur "main" de la souris
			@type {createjs.Bitmap}  */
		_main = new createjs.DisplayObject()
		
		
		
	
	//==========================
	//getter/setter
	//==========================

	//==========================
	//Autres fonctions membres
	//==========================


			/** Fonction qui renvoie (en coordonnées absolues) le vecteur entre l'origine de la classe d'équivalence sur laquelle on vient de cliquer mère, et la souris.
			@return {Vecteur} Vecteur liant le clic à la souris
			*/
		L1S()
		{
			var S = {x:suiveur.x, y:suiveur.y};
			var L1 = this.localToLocal(0,0,schema);
			return {x: S.x-L1.x, y:S.y-L1.y}
		}

			/** Ajoute (= modifie en place dans les grosses matrices K et F globales) la sous partie liée à la liaison. Écrase la méthode abstraite mère.
			@param {Array} K - Référence vers la matrice K générale du système global.
			@param {Array} F - Référence vers le vecteur F second membre du système global (vecteur en ligne, à une dimension)
			@return {Object} {K:   , F :} Objet représentant les PETITES matrices du système, liées à la liaison (Attention, ce ne sont pas les matrices globales)
			*/
		remplisSysteme_liaison(K,F)
		{
			var k = this._k
			var n1 = this.classe().numero(); //Numéro de la CE
			var L1S = this.L1S();
			var O1L1 = this.O1L1();
		
			//NOTE : il faudra peut être condenser les lignes suivantes
					
			var KK = [	[-k,		0,			-k*O1L1.y							],
					[0,		-k,			k*O1L1.x								],
					[k*O1L1.y,	-k*O1L1.x,		k*(-O1L1.x*O1L1.x-O1L1.y*L1S.y-O1L1.y*O1L1.y-O1L1.x*L1S.x)	]	]
					
			//var FF = [k*L1L2.x,k*L1L2.y,k*(O1L1.x*L1L2.y-O1L1.y*L1L2.x)]
			var FF = [-k*L1S.x	,	-k*L1S.y	,	k*(-O1L1.x*L1S.y+O1L1.y*L1S.x)]
			

			
			//On recopie dans les bonnes lignes de K et F
			for(var i=0; i<3 ; i++) // Pour chacune des 3 lignes
			{
				// Recopiage
				//K.set([3*n1+i,3*n1], K.get([3*n1+i,3*n1])+KK[i][0])
				K.ajouteVal( 3*n1+i , 3*n1,	KK[i][0])
				K.ajouteVal( 3*n1+i , 3*n1+1, KK[i][1])
				K.ajouteVal( 3*n1+i , 3*n1+2, KK[i][2])
				
				
				F.ajouteVal( 3*n1+i, FF[i])
				

			}
			
			
			return {K:KK,F:FF}
		}

}

