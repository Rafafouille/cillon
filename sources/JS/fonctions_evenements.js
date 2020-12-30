

// ***********************************************************
// Ferme tous les sous-menu
ferme_menus = function()
{
	$(".menu_secondaire").css("display","none");
	resetActions();
}

// ***********************************************************
// Ouvre le sous-menu "editer" et referme les autres.
//Si déjà ouvert, ça le ferme
ouvre_ferme_menu_editer = function()
{
	if($("#menu_editer").css("display")=="none")
		{ferme_menus();
		$("#menu_editer").css("display","block");}
	else
		ferme_menus();
}

// ***********************************************************
// Ajout d'une classe d'équivalence
place_new_CE=function()
{
	if(ACTION == "ajoute une CE")
		resetActions();
	else
	{
		resetActions();
		ACTION="ajoute une CE";
		SOUS_ACTION="";
		
		//Ajout d'une pivot animée sur le curseur
		suiveur.addChild(new Classe_Equivalence_Flottante());
	}

}



// ***********************************************************
// Ajout d'une liaison pivot
place_new_pivot=function()
{
	if(ACTION == "ajoute liaison" && SOUS_ACTION == "pivot") // Si on clique pour la 1ere fois (pas 2 fois d'affilé)
		resetActions();
	else
	{
		resetActions();
		//Update des listes
		$("#menu_selection_pieces").css("display","block");
		update_liste_CE1();
		update_liste_CE2();
		update_liste_CE1();
		
		
		ACTION="ajoute liaison";
		SOUS_ACTION="pivot";
		
		//Ajout d'une pivot animée sur le curseur
		suiveur.addChild(new PivotFlottante());
	}
}






// ***********************************************************
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
	
	
	
	//On va recentrer l'origine des CE
	classe1.recentreOrigine();
	classe2.recentreOrigine();
}



