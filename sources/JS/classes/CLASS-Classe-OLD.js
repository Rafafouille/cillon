var Classe = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		Kinetic.Group.call(this);
		this.draggable(false);	//Rendre l'objet draggable


	//==========================
	//Variables Membres
	//==========================
	
		this._id=idClasse++;		//N°Id de la classe d'équivalence
		this._idDDL=scene.nbClasses();			//Pour savoir où se trouve les DDL
		this._nom="Classe "+this._id;
		this._couleur=randomColor();	//Couleur de la classe d'équivalence
		this._epaisseur=3;		//Epaisseur
		this._listeLiaisons=[];		//Liste des liaisons
		this._etat="contraint";		//Fonction qui dit si la pièce est bloquée ou cliquée, etc...  Peut être bloqué libre contraint
		this._DDLBloques={x:false,y:false,theta:false};	//Les DDL bloqués (true) ou libre (false)
		this._lastClic={x:null,y:null};	//Position (locale) du dernier clic de la souris

	//==========================
	//getter/setter
	//==========================

		//Renvoie le n°Id de la classe
		this.id=function()
		{
			return this._id;
		}
		//Pour savoir où se trouve les DDL
		this.idDDL=function(i)
		{
			if(typeof(i)!='undefined')
				this._idDDL=i;
			return this._idDDL;
		}

		//Affecte/renvoie le n°Id de la bulle
		this.nom=function(n)
		{
			if(typeof(n)!='undefined')
				this._nom=n;
			return this._nom;
		}

		//couleur de la classe
		this.couleur=function(c)
		{
			if(typeof(c)!='undefined')
				this._couleur=c;
			return this._couleur;
		}

		//couleur de la classe
		this.epaisseur=function(e)
		{
			if(typeof(e)!='undefined')
				this._epaisseur=e;
			return this._epaisseur;
		}
		//Renvoie le n°Id de la bulle
		this.listeLiaisons=function()
		{
			return this._listeLiaisons;
		}

		//couleur de la classe
		this.etat=function(b)
		{
			if(typeof(b)!='undefined')
				this._etat=b;
			return this._etat;
		}
			
		this.DDLBloques=function(d)
		{
				if(typeof(d)!='undefined')
					this._DDLBloques=d;
				return this._DDLBloques;
		}
		
		this.XBloque=function(x)
		{
				if(typeof(x)!='undefined')
					this._DDLBloques.x=x;
				return this._DDLBloques.x;
		}
		
		this.YBloque=function(y)
		{
				if(typeof(y)!='undefined')
					this._DDLBloques.y=y;
				return this._DDLBloques.y;
		}
		
		this.ThetaBloque=function(t)
		{
				if(typeof(t)!='undefined')
					this._DDLBloques.theta=t;
				return this._DDLBloques.theta;
		}

		this.estPiloteParLaSouris=function(p)
		{
			return piloteParLaSouris==this;
		}

		this.lastClic=function(l)
		{
				if(typeof(l)!='undefined')
					this._lastClic=l;
				return this._lastClic;
		}

		this.lastClicX=function(l)
		{
				if(typeof(l)!='undefined')
					this._lastClic.x=l;
				return this._lastClic.x;
		}

		this.lastClicY=function(l)
		{
				if(typeof(l)!='undefined')
					this._lastClic.y=l;
				return this._lastClic.y;
		}

	//==========================
	//Autres fonctions membres
	//==========================

		//ajoute une demi-liaison (prend une référence de la demi-liaison)
		this.ajouteLiaison=function(liaison)
		{
			this.add(liaison);	//Ajout au groupe Kinetic
			this._listeLiaisons.push(liaison);	//Ajout à la liste des liaisons de cette classe
			liaison.couleur(this.couleur());		//Met à jour la couleur de la liaison
		}
	

		//Fonction qui remplie la matrice matA et matB
		this.setEquations=function()
		{
			if(this._etat=="bloque")	//Si piece fixe
			{
				for(var ii=0;ii<3;ii++)
						matA[this._idDDL*3+ii][this._idDDL*3+ii]=1;//On mets trois 1 sur la diagonale
			}
			else if(this._etat=="libre")	//Si piece libre
			{
				for(var ii=0;ii<3;ii++)
						matA[this._idDDL*3+ii][this._idDDL*3+ii]=1;//On mets trois 1 sur la diagonale
				matB[this._idDDL*3]=this.x();
				matB[this._idDDL*3+1]=this.y();
				matB[this._idDDL*3+2]=this.rotation()*0.017453292519943295;
			}
			else
			{


				//*******************
				// LIAISONS
				//*******************

				for(var i=0;i<this._listeLiaisons.length;i++)//Pour chaque liaison
				{
					var L=this._listeLiaisons[i];	//On récupère la liaison
					var eq=L.getEquationsLiaison();	//On récupère les équations
					
					//On remplit la matrice
					//Equation en X
					if(!this.XBloque())
					{
						for(var jj=0;jj<3;jj++)
						{
							matA[this._idDDL*3][this._idDDL*3+jj]+=eq.a[0][jj];
							matA[this._idDDL*3][eq.idDDLPartenaire*3+jj]+=eq.a[0][jj+3];
						}
						matB[this._idDDL*3]+=eq.b[0];
					}
					else
					{
						matA[this._idDDL*3][this._idDDL*3]=1;
						matB[this._idDDL*3]=this.x();
					}
					//Equation en Y
					if(!this.YBloque())
					{
						for(var jj=0;jj<3;jj++)
						{
							matA[this._idDDL*3+1][this._idDDL*3+jj]+=eq.a[1][jj];
							matA[this._idDDL*3+1][eq.idDDLPartenaire*3+jj]+=eq.a[1][jj+3];
						}
						matB[this._idDDL*3+1]+=eq.b[1];
					}
					else
					{
						matA[this._idDDL*3+1][this._idDDL*3+1]=1;
						matB[this._idDDL*3+1]=this.y();
					}
					//Equation en Theta
					if(!this.ThetaBloque())
					{
						for(var jj=0;jj<3;jj++)
						{
							matA[this._idDDL*3+2][this._idDDL*3+jj]+=eq.a[2][jj];
							matA[this._idDDL*3+2][eq.idDDLPartenaire*3+jj]+=eq.a[2][jj+3];
						}
						matB[this._idDDL*3+2]+=eq.b[2];
					}
					else
					{
						matA[this._idDDL*3+2][this._idDDL*3+2]=1;
						matB[this._idDDL*3+2]=this.rotation()*0.01745329251994329576923690768489;
					}
					
				}


				//*******************
				// SOURIS
				//*******************
				if(this.estPiloteParLaSouris() && 0)
				{
					var KM=RAIDEUR_SOURIS;
					var Tip=this.rotation()*0.017453293
					var ai=this.lastClicX();
					var bi=this.lastClicY();
					var D=scene.getPointerPosition().x-scene.calquePrincipal.x()	-ai*(Math.cos(Tip)+Tip*Math.sin(Tip))+bi*(Math.sin(Tip)-Tip*Math.cos(Tip));
					var E=scene.getPointerPosition().y-scene.calquePrincipal.y()	-ai*(Math.sin(Tip)-Tip*Math.cos(Tip))-bi*(Math.cos(Tip)+Tip*Math.sin(Tip));
					var cvi=ai*Math.sin(Tip)+bi*Math.cos(Tip);
					var cwi=-ai*Math.cos(Tip)+bi*Math.sin(Tip);
					var a=[	[0,	0,	0			],
						[0,	0,	0			],
						[0,	0,	0			]];
					var b=[		0,
							0,
							0];
					if(!this.XBloque())
					{
						a[0][0]=-KM;a[0][2]=KM*cvi;
						b[0]=-KM*D;
					}
					else
					{
						a[0][0]=1;
						b[0]=this.x();
					}
					if(!this.YBloque())
						{
						a[1][1]=-KM;a[1][2]=KM*cwi;
						b[1]=-KM*E;
						}
					else
					{
						a[1][1]=1;
						b[1]=this.y();
					}
					if(!this.ThetaBloque())
					{
						a[2][0]=KM*cvi;a[2][1]=KM*cwi;a[2][2]=-KM*(cvi*cvi*cwi*cwi);
						b[2]=KM*(D*cvi+E*cwi);
					}
					else
					{
						a[2][2]=1;
						b[2]=this.rotation()*0.01745329251994329576923690768489;
					}


					/*debug("MX="+(scene.getPointerPosition().x-scene.calquePrincipal.x()));
					debug("acl="+(-ai*(Math.cos(Tip)+Tip*Math.sin(Tip))+bi*(Math.sin(Tip)-Tip*Math.cos(Tip))));
					debug("ai="+ai);
					debug("bi="+bi);
					debug("D="+D);
					debug("E="+E);*/
					for(var ii=0;ii<3;ii++)
					{
						for(var jj=0;jj<3;jj++)
						{
							matA[this._idDDL*3+ii][this._idDDL*3+jj]+=a[ii][jj]
						}
						matB[this._idDDL*3+ii]+=b[ii];
					}
				}
			}//Fin du "si bloqué"
		}




	//==========================
	//Graphismes
	//==========================

		this.repere0 = new Repere();
		
		this.plan=new Kinetic.Rect({
				x: -10,
				y: -10,
				width: 140,
				height: 60,
				fill: this._couleur,
				opacity:0.5,
				visible:false
				});
				
		this.dessinsArrierePlan=new Kinetic.Group();//Image d'arriere plan
		
		//Dessin d'arriere plan
		this.dessinsArrierePlan.rect=new Kinetic.Rect({
				width: 100,
				height: 50,
				stroke: this.couleur(),
				strokeWidth: 5,
				x:-50,
				y:-20
			});
		this.dessinsArrierePlan.add(this.dessinsArrierePlan.rect);
		/*var ceci=this;
		this.dessinsArrierePlan.imagePatatoide = new Image();
		this.dessinsArrierePlan.imagePatatoide.onload = function() {
				var image = new Kinetic.Image({
					x: -100,
					y: -100,
					image: ceci.dessinsArrierePlan.imagePatatoide,
					width: 200,
					height: 200
				});
				ceci.dessinsArrierePlan.add(image);
				scene.draw();
			};
		this.dessinsArrierePlan.imagePatatoide.src = './sources/images/patatoide.png';*/

		
		this.add(this.plan);
		this.add(this.dessinsArrierePlan);		
		this.add(this.repere0);


	//==========================
	//Animation
	//==========================

	//==========================
	//Evenements
	//==========================

		var ceci=this;
		this.on("mouseover",function(){this.plan.visible(true);scene.draw()});
		this.on("mouseout",function(){this.plan.visible(false);scene.draw()});
		this.on('dragmove',function(){					//OBSOLETE A SUPPRIMER
						var eP=ceci._etat;
						ceci._etat="libre";setSysteme();
						updateResultatSysteme(solveSysteme());
						scene.draw();
						ceci._etat=eP;
					});

		/*this.actionMouseDown=function()
		{
			piloteParLaSouris=this;
			this.lastClic(this.global2local(scene.getPointerPosition()));
			//scene.animationMouvement.start();
			scene.fonctionAnimationMouvement();//A supprimer
		}

		this.actionMouseUp=function()
		{
			piloteParLaSouris=null;
			scene.animationMouvement.stop();
		}
		this.on("mousedown",this.actionMouseDown);
		this.on("mouseup",this.actionMouseUp);*/

	//==========================
	//Construction...
	//==========================



}
Classe.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
Classe.prototype.constructor = Classe;//On recopie le constructeur de Noeud dans son prototype



