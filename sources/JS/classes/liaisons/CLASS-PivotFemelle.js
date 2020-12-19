//demi-liaison pivot

var PivotFemelle= function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		PivotMale.call(this);

}
PivotFemelle.prototype = Object.create(PivotMale.prototype);//On recopie le prototype de createjs.Stage
PivotFemelle.prototype.constructor = PivotFemelle;//On recopie le constructeur de Noeud dans son prototype



