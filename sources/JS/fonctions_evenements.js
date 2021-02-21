

// ***********************************************************
// Ferme tous les sous-menu
ferme_menus = function()
{
	$(".menu_secondaire").css("display","none");
	$(".bouton_menu").css("background-color","white");// Remet tous les boutons en blanc
	resetActions();
}

// ***********************************************************
// Ouvre le sous-menu "editer" et referme les autres.
//Si déjà ouvert, ça le ferme
ouvre_ferme_menu_editer = function()
{
	if($("#menu_editer").css("display")=="none")
	{
		ferme_menus();
		$("#menu_editer").css("display","block");
		$("#bouton_editer").css("background-color","#FFDDDD");//Met le bouton en surbrillance
		schema.restorePositions();	//On remet les pièces en place (des fois qu'elles auraient bouger durant la simulation précédente) avant d'éditer
	}
	else
		ferme_menus();
}

// ***********************************************************
// Ouvre le sous-menu "editer" et referme les autres.
//Si déjà ouvert, ça le ferme
ouvre_ferme_menu_simuler = function()
{
	if($("#menu_simuler").css("display")=="none")
	{
		ferme_menus();
		$("#menu_simuler").css("display","block");
		$("#bouton_simuler").css("background-color","#FFDDDD");//Met le bouton en surbrillance
		schema.sauvePositions();	//On sauvegarde les positions initiales
	}
	else
	{
		ferme_menus();
		schema.restorePositions();	//On remet les pièces en place (des fois qu'elles auraient bouger durant la simulation précédente) avant d'éditer
	}
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
		$("#bouton_add_CE").css("background-color","#FFDDDD"); //Met le bouton en surbrillance
		
		//Ajout d'une pivot animée sur le curseur
		suiveur.addChild(new Classe_Equivalence_Flottante());
	}

}

// ***********************************************************
// Ajout d'une classe d'équivalence
lance_new_dessin=function()
{
	if(ACTION == "dessin") // Si on clique pour la 1ere fois (pas 2 fois d'affilé)
		resetActions();
	else
	{
		resetActions();
		update_liste_CE();
		ACTION = "DESSIN"
		SOUS_ACTION = "ATTENTE_DEMARRAGE"
		$("#menu_selection_CE").css("display","block");
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
		$("#bouton_add_liaison_pivot").css("background-color","#FFDDDD");
		
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
		
	var liaisonMale = null;
	var liaisonFemelle = null;


	if(liaison == "pivot")
	{
		liaisonMale = new PivotMale();
		liaisonFemelle = new PivotFemelle();
		
		liaisonMale.rotation=180;
		liaisonMale.couleur(classe1.couleur());
		liaisonMale.demiSoeur(liaisonFemelle);
		
		liaisonFemelle.couleur(classe2.couleur());
		liaisonFemelle.demiSoeur(liaisonMale);
		
		classe1.ajouteDemiLiaison(liaisonMale,centre);
		classe2.ajouteDemiLiaison(liaisonFemelle,centre);
	}
	
	
	
	//On va recentrer l'origine des CE
	classe1.recentreOrigine();
	classe2.recentreOrigine();
	
	return {L1:liaisonMale, L2:liaisonFemelle}
}



// ******************************************************
// Fonction lance ou stop la simulation
lancer_simulation = function()
{
	if(ACTION != "simule")
	{
		ACTION = "simule";		//on lance la simulation
		$("#bouton_lancer_simulation img").attr('src','./sources/images/icone_simule_pause.svg');
		$("#bouton_lancer_simulation").css("background-color","#FFDDDD");
		schema.tSimulation(0);	//On réinitialise le temps de simulation
	}
	else
	{
		resetActions();
	}
}






// *********************************************************
// Fonction qui sélectionne une classe d'équivalence
// classe peut être une référence vers une classe d'équivalence, ou bien son numéro
// --> Equivalent à maClasse.selectionne()
selectionneClasse = function(classe)
{
	if(typeof classe=="number")
		classe = schema.classes[classe]
	classe.selectionne();
}


// **********************************************************
// Fonction qui désélectionne toutes les classes d'équivalence et leur contenu
deselectionneToutLeMonde = function()
{
	for(var i=0 ; i<schema.classes.length;i++)
	{
		schema.classes[i].deselectionne()
		CLASSE = -1
	}
}


// *********************************************************
// Fonction qui nous place en mode "sélection"
mode_selection = function()
{
	if(ACTION == "SELECTION")
	{
		ACTION = ""
		$("#bouton_select").css("background-color","white");//Met le bouton en surbrillance
		deselectionneToutLeMonde();
	}
	else //On rentre dans le mode sélection
	{
		ACTION = "SELECTION";
		$("#bouton_select").css("background-color","#FFDDDD");//Met le bouton en surbrillance
	}
}



