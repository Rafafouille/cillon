

// Ajout d'une liaison pivot
add_pivot=function()
{
	//Update des listes
	update_liste_CE1();
	update_liste_CE2();
	update_liste_CE1();
	
	
	ACTION="ajoute liaison";
	SOUS_ACTION="pivot";
	
	suiveur.addChild(new PivotFlottante());

	
}






// FONCTION QUI AJOUTE LA LIAISON DANS CHAQUE CLASSE D'EQUIVALENCE A PARTIR DES INFO GLOBALES
ajouteLiaison = function(_i,_j,_liaison,_centre)
{

	if(typeof(_i)=="undefined")
		var classe1 = getClasse1();
	else
		var classe1 = schema.classes[_i]
	
	if(typeof(_j)=="undefined")
		var classe2 = getClasse2();
	else
		var classe2 = schema.classes[_j]
		
	if(typeof(_liaison)=="undefined")
		var liaison = SOUS_ACTION;
	else
		var liaison = _liaison
		
	if(typeof(_centre)=="undefined")
		var centre = {x:schema.XSOURIS(),y:schema.YSOURIS()}
	else
		var centre = _centre
		

	if(liaison == "pivot")
	{
		var pivotMale = new PivotMale();
		var pivotFemelle = new PivotFemelle();
		
		pivotMale.rotation=180;
		pivotMale.couleur(classe1.couleur());
		pivotMale.demiSoeur(pivotFemelle);
		
		pivotFemelle.couleur(classe2.couleur());
		pivotFemelle.demiSoeur(pivotMale);
		
		classe1.ajouteDemiLiaison(pivotMale,centre);
		classe2.ajouteDemiLiaison(pivotFemelle,centre);
	}
}
