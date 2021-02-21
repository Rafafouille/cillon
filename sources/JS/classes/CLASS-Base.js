

//Classe Base
//Base(vecteur1) --> (vecteur x (normalisation). y est construit automatiquement orthonormal)
//Base(angle) --> par rapport à l'horizontale
function Base(__arg1__)
{
	//==========================
	//Variables Membres
	//==========================
	
		if(__arg1__ instanceof Vecteur)//Si vecteur directeur
		{
			__vx__=__arg1__.unitaire();
		}
		else //Si angle
		{
			__vx__=new Vecteur({dx:Math.cos(__arg1__),dy:Math.sin(__arg1__)})
		}
	
		this._vx=__vx__;
		this._vy=__vx__.normale();
		
	
	//==========================
	//getter/setter
	//==========================
	
		//Coordonnées locales *****************
	
		//Vecteur directeur de x
		this.vx=function(v)
		{
			if(typeof(v)!='undefined')
			{
					this._vx=v;
					this._vy=v.normale()
			}
			return this._vx;
		}
	
		//Coordonnées sur y
		this.vy=function(v)
		{
			if(typeof(v)!='undefined')
			{
					this._vy=v;
					this._vx=v.normale();
					this._vx.multiplie(-1);
			}
			return this._vy;
		}
		
		//Renvoie la classe d'équivalence dans lequel il fait partie
		this.getClasse=function()
		{
			return this.parent.getClasse();
		}
		
		
	//==========================
	//Autres fonctions membres
	//==========================
	
	
		
}
