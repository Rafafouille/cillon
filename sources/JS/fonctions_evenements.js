

// ***********************************************************
/**
 * Fonction qui ferme les menus secondaires éventuellement ouverts
 * et annule les actions en cours.
 */
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
			/** Fonction qui ajoute la liaison dans chaque classe d'équivalence à partir des informations globales.
			@param {Number|Classe_Equivalence} [_i=Voir_menu_déroulant] - Numéro de la classe d'équivalence 1 (ou bien référence vers cette classe). Si absent : récupère le numéro dans le menu déroulant (si placé manuellement).
			@param {Number|Classe_Equivalence} [_j=Voir_menu_déroulant] - Numéro de la classe d'équivalence 2 (ou bien référence vers cette classe). Si absent : récupère le numéro dans le menu déroulant (si placé manuellement).
			@param {String} [_liaison=Voir_menu_déroulant] - Nom de la liaison, parmi : "pivot", "glissiere". Si absent, récupère celle du menu déroulant (si placé manuellement).
			@param {Position} [_centre=Position_de_la_souris] - Position de la liaison à placer.
			@return {Boolean} 'true' si la classe est bloquée. 'false' sinon.
			*/
ajouteLiaison = function(_i,_j,_liaison,_centre)
{
	if(typeof(BRAS1)!="undefined" && typeof(BATI)!="undefined")
		{
		console.log("alors qu'on aurait du avoir :")
		console.log(BATI.localToLocal(60,0 ,BRAS1))
		}
	if(typeof(_i)=="undefined")
		var classe1 = getClasse1();
	else if(_i instanceof Classe_Equivalence)
		var classe1 = _i
	else
		var classe1 = schema.classes[_i]
	
	if(typeof(_j)=="undefined")
		var classe2 = getClasse2();
	else if(_j instanceof Classe_Equivalence)
		var classe2 = _j
	else
		var classe2 = schema.classes[_j]
		
	if(typeof(_liaison)=="undefined")
		var liaison = SOUS_ACTION;
	else
		var liaison = _liaison
		
	if(typeof(_centre)=="undefined")
		var centre = {x:schema.XSOURIS(),y:schema.YSOURIS(),contexte:SCHEMA}
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
	
	if(liaison == "glissiere")
	{
		liaisonMale = new GlissiereMale();
		liaisonFemelle = new GlissiereFemelle();
		
		liaisonMale.demiSoeur(liaisonFemelle);
		liaisonFemelle.demiSoeur(liaisonMale);
		
		liaisonMale.couleur(classe1.couleur());
		liaisonFemelle.couleur(classe2.couleur());
		
		classe1.ajouteDemiLiaison(liaisonMale,centre);
		classe2.ajouteDemiLiaison(liaisonFemelle,centre);
	}
	
	
	//On va recentrer l'origine des CE
	//classe1.recentreOrigine();
	//classe2.recentreOrigine();
	
	return {L1:liaisonMale, L2:liaisonFemelle}
}



// ******************************************************
// Fonction lance ou stop la simulation
lancer_simulation = function()
{
	if(ACTION != "simule")
	{
		resetActions();
		ACTION = "simule";		//on lance la simulation
		$("#bouton_lancer_simulation img").attr('src','./sources/images/icone_simule_pause.svg');
		$("#bouton_lancer_simulation").css("background-color","#FFDDDD");
		//schema.tSimulation(0);	//On réinitialise le temps de simulation
	}
	else
	{
		resetActions();
	}
}


// ********************************************************
// Remet la simulation dans sa position initiale
function reset_simulation()
{
	schema.restorePositions();
	schema.tSimulation(0);	//On réinitialise le temps de simulation
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


// *********************************************************
// Fonction qui entame la manipulation (simulation) à la main
lancer_agir = function()
{
	if(ACTION == "MANIP")
		resetActions();
	else
	{
		resetActions();
		ACTION="MANIP";
		SOUS_ACTION="PREPARE";
		$("#bouton_agir").css("background-color","#FFDDDD"); //Met le bouton en surbrillance
		
		//Ajout d'une pivot animée sur le curseur
		suiveur.addChild(new AccrocheFlottante());
	}
}


// *********************************************************
// Fonction qui ouvre la boite de dialogue d'ouverture
ouvre_ferme_menu_ouvrir = function()
{
	//Supprime le contenu
	$("#dialog_ouvrir_contenu").empty();
	//met le'icone
	$("#dialog_ouvrir_contenu").append("<div style='text-align:center;'><img style='width:50px;' src='./sources/images/chargement.svg' alt='Chargement...'/></div>");
	$("#dialog_ouvrir").dialog("open");
	
	//Requete liste des mecanismes
	$.post(	"repondeur.php",
			{action:"getMecanismes"},
			getMechanisme_callback,
			"json"
	)
}

// *************************************************
// Fonction callback qui recoit la liste des 
getMechanisme_callback = function(data)
{
	var mecanismes = data.mecanismes
	//Supprime le contenu
	$("#dialog_ouvrir_contenu").empty();
	for(i=0;i<mecanismes.length;i++)
	{
		var mecanism = mecanismes[i];
		toto=mecanism;
		var nom = mecanism.nom;
		var image = mecanism.image;
		var lien = mecanism.lien;
		var code = "<a class='mecanisme_a_ouvrir' href='?schema="+lien+"'><h1>"+nom+"</h1><div class='image_mecanisme_a_ouvrir'><img src='"+image+"'/></div></div>"
		$("#dialog_ouvrir_contenu").append(code);
	}	
}





// *********************************************
// Fonction qui ouvre la console
ouvreConsole = function()
{
	$("#dialog_console").dialog("open");
}

