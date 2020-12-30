//Pivot animée, en attendant d'être placée

var PivotMale = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);


	//==========================
	//Variables Membres
	//==========================
	
		this._couleur="black";
		this._rayon=10;
		this._longueurTige=20;
		this._epaisseur=3;
		this._demiSoeur=null;	// Référence vers la demi-liaison associée (sur l'autre classe d'équivalence)
		this._k=10000;	//Raideur de la liaison

	//==========================
	//getter/setter
	//==========================

		this.couleur=function(c)
		{
			if(typeof(c)!='undefined')
				{
					this._couleur=c;
					//Met à jour les couleur directement sur les graphismes
					this._cercle.graphics._stroke.style=c;
					this._tige.graphics._stroke.style=c;
				}
			return this._couleur;
		}
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
		this.epaisseur=function(e)
		{
			if(typeof(e)!='undefined')
				{
					this._epaisseur=e;
					//Met à jour les couleur directement sur les graphismes
					// ... à faire
				}
			return this._epaisseur;
		}
	
		this.demiSoeur=function(d)
		{
			if(typeof(d)!='undefined')
					this._demiSoeur=d;
			return this._demiSoeur;
		}
		
		this.k=function(k)
		{
			if(typeof(k)!='undefined')
					this._k=k;
			return this._k;
		}

	//==========================
	//Autres fonctions membres
	//==========================

		//Fonction qui renvoie le vecteur {x,y} (en coordonnées absolues) entre cette demi liaison et sa soeur
		this.L1L2 = function()
		{
			var L1 = this.localToLocal(0,0,schema);
			var L2 = this.demiSoeur().localToLocal(0,0,schema);
			return {x:L2.x-L1.x, y:L2.y-L1.y}
		}
		//Fonction qui renvoie (en coordonnées absolues) le vecteur entre l'origine de la CE mère, et cette liaison
		this.O1L1 = function()
		{
			var O1 = this.parent.localToLocal(0,0,schema);
			var L1 = this.localToLocal(0,0,schema);
			return {x: L1.x-O1.x, y:L1.y-O1.y}
		}
		
		//Ajoute (dans la grosse matrice K et F globale) la sous partie liée à la liaison
		this.remplisSysteme_liaison = function(K,F)
		{
			var O1L1 = this.O1L1();
			var O2L2 = this.demiSoeur().O1L1();
			var L1L2 = this.L1L2();
			var k = this.k()
			var n1 = this.parent.numero(); //Numéro de la CE
			var n2 = this.demiSoeur().parent.numero() // Numéro de la CE de la demi-Soeur
		
		
			//NOTE : il faudra peut être condenser les lignes suivantes
		
			/*var KK = [	[k,	0,	k*O1L1.y,	k,	0,	-k*O2L2.y],
					[0,	-k,	-k*O1L1.x,	0,	k,	k*O2L2.x],
					[k*O1L1.y,k*O1L1.x,-k*(O1L1.x*O1L1.x+O1L1.y*O1L1.y),-k*O1L1.y,k*O1L1.x,k*(O1L1.x*O2L2.x+O1L1.y*O2L2.y)]	]*/
					
			var KK = [	[-k,		0,		k*O1L1.y,				k,		0,		-k*O2L2.y],
					[0,		-k,		-k*O1L1.x,				0,		k,		k*O2L2.x],
					[O1L1.y*k,	-O1L1.x*k,	-k*(O1L1.y*O1L1.y+O1L1.x*O1L1.x),	-O1L1.y*k,	O1L1.x*k,	k*(O1L1.y*O2L2.y+O1L1.x*O2L2.x)]	]
					
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
			return {K:KK,F:FF}
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



}
PivotMale.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
PivotMale.prototype.constructor = PivotMale;//On recopie le constructeur de Noeud dans son prototype



