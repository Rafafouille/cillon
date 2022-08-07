//demi-liaison pivot
/*
var PivotFemelle= function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		PivotMale.call(this);
	
		this.genre("femelle");	//Pour se différencier de la pièce mâle

}
PivotFemelle.prototype = Object.create(PivotMale.prototype);//On recopie le prototype de createjs.Stage
PivotFemelle.prototype.constructor = PivotFemelle;//On recopie le constructeur de Noeud dans son prototype
*/

/**
 * Demi-liaison "Pivot" désignée comme femelle. Identique à mâle.
 * @extends PivotMale
 */
class PivotFemelle extends PivotMale
{

	// **********************************************************
	/*
	 * Constructeur
	 */
	constructor()
	{
		super()	// Rappelle le constructeur parent
			
		// Valeur
		this.genre("femelle");	//Pour se différencier de la pièce mâle
	}

}
