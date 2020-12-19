var DemiPivot=function()
{
	
	DemiLiaison.call(this);

	//==========================
	//Variables Membres
	//==========================

	this._rayon=10;		//Rayon de la pivot
	this._epaisseur=5;	//epaisseur des traits
	
	//==========================
	//getter/setter
	//==========================
	
		
		//Rayon de la pivot
		this.rayon=function(r)
		{
			if(typeof(r)!='undefined')
			{
				if(r<0) r=0;
				this._rayon=r;
				this.cercle.radius(r);
			}
			return this._rayon;
		}

		//Couleur (spécial liaison pivot)
		this.couleur=function(c)
		{
			if(typeof(c)!='undefined')
			{
				this._couleur=c;
				this.cercle.stroke(c);
				this.trait.stroke(c);
			}
			return this._couleur;
		}

		//Epaisseur (float)
		this.epaisseur=function(e)
		{
			if(typeof(e)!='undefined')
			{
				this._epaisseur=e;
				this.cercle.strokeWidth(e);
				this.trait.strokeWidth(e);
			}
			return this._epaisseur;
		}

	//==========================
	//Autres fonctions membres
	//==========================

		this.getEquationsLiaison=function()
		{
			//Sans rotation
			var ai=this.x();
			var bi=this.y();	
			var aj=this._partenaire.x();
			var bj=this._partenaire.y();
			var KL=this._rigiditeLiaison;	//A simplifier

			//Anciennes valeurs
			var Xip=this.parent.x();
			var Yip=this.parent.y();
			var Tip=this.parent.rotation()*0.017453292519943295;
			var Xjp=this._partenaire.x();
			var Yjp=this._partenaire.y();
			var Tjp=this._partenaire.rotation()*0.017453292519943295;

			//Simplifications
			var si=Math.sin(Tip);
			var ci=Math.cos(Tip);
			var sj=Math.sin(Tjp);
			var cj=Math.cos(Tjp);
			var sji=Math.sin(Tjp-Tip);
			var cji=Math.cos(Tjp-Tip);
			var cvi=ai*si+bi*ci;
			var cvj=aj*sj+bj*cj;
			var cwi=-ai*ci+bi*si;
			var cwj=-aj*cj+bj*sj;
			var D=-ai*(ci+Tip*si)+bi*(si-Tip*ci)+aj*(cj+Tjp*sj)-bj*(sj-Tjp*cj);
			var E=-ai*(si+Tip*ci)-bi*(ci+Tip*si)+aj*(sj+Tjp*cj)+bj*(cj+Tjp*sj);
			//var dXjip=Xjp-Xip;
			var dTjip=Tjp-Tip;
			
			//var sip=si-Tip*ci;
			//var cip=ci+Tip*si;
			//var sijp=Math.sin(Tjp-Tip)

			//a : de la forme [equation pour Xi, equation pour Yi, equation pour Thetai]
			//Ici : sans prendre la rotation en compte :
				//var a=[[-KL,0,0,KL,0,0],[0,-KL,0,0,KL,0],[0,0,1,0,0,0]];
				var a=[	[-KL,0,KL*cvi,KL,0,-KL*cvj],
					[0,-KL,KL*cwi,0,KL,-KL*cwj],
					//[KL*cvi,KL*cwi,-KL*(cvi*cvi+cwi*cwi),-KL*cvi,-KL*cwi,KL*(cvi*cvj-cwi*cwj)]
						[KL*(ai*si+bi*ci),
						+KL*(-ai*ci+bi*si),
						+KL*(-ai*ci*(Xjp-Xip)+bi*si*(Xjp-Xip)-ai*si*(Yjp-Yip)-bi*ci*(Yjp-Yip)
							-ai*aj*cji-bi*aj*sji+ai*bj*sji-bi*bj*cji),
						+KL*(-ai*si-bi*ci),
						+KL*(ai*ci-bi*si),
						+KL*(ai*aj*cji+bi*aj*sji-ai*bj*sji+bi*bj*cji)
						]
					//[0,0,1,0,0,0]
					]
			//b : second membre associé
			var b=[		-KL*D,
					-KL*E,
					//KL*(D*cvi+E*cwi)
					-KL*(ai*ci*Xjp*Tip-ai*ci*Xip*Tip
						-bi*si*Xjp*Tip+bi*si*Xip*Tip
						+ai*si*Yjp*Tip-ai*si*Yip*Tip
						+bi*ci*Yjp*Tip-bi*ci*Yip*Tip
						+ai*aj*(sji-dTjip*cji)
						-bi*aj*(cji+dTjip*sji)
						+ai*bj*(cji+dTjip*sji)
						+bi*bj*(sji-dTjip*cji))
				];
			
			return {a:a,b:b,idDDLPartenaire:this._partenaire.parent.idDDL()};
		}

	//==========================
	//Graphismes
	//==========================


	this.cercle=new Kinetic.Circle({
			radius: this._rayon,
			stroke: this._couleur,
			strokeWidth: this._epaisseur,
		});

	this.trait=new Kinetic.Line({
			points:[this._rayon,0,2*this._rayon,0],
			stroke: this._couleur,
			strokeWidth: this._epaisseur,
		});

	this.add(this.trait);
	this.add(this.cercle);

	//==========================
	//Evenements
	//==========================

	//==========================
	//Construction...
	//==========================
	


}

DemiPivot.prototype = Object.create(DemiLiaison.prototype);//On recopie le prototype de Kinteic.Group
DemiPivot.prototype.constructor = DemiPivot;//On recopie le constructeur de Noeud dans son prototype

