


//Met à jour la liste des classes d'équivalence dans le menu
update_liste_CE1=function()
{
	//On recupere l'ancienne sélection
	var old=parseInt($("#select_CE1").val());
	//On vide
	$("#select_CE1").empty();
	//On remet...
	for(var i=0; i<schema.classes.length; i++)
	{
		classe=schema.classes[i];
		if(!$("#select_CE2 option[value='"+classe.numero()+"']").is(':selected'))//...si c'est pas déjà dans l'autre
		{
			var ajout="<option value=\""+classe.numero()+"\"";
			if(classe.numero()==old)
				ajout+=" selected=\"selected\"";
			ajout+=">"+classe.nom()+"</option>";
			$("#select_CE1").append(ajout);
		}
	}
}

//Met à jour la liste des classes d'équivalence dans le menu
update_liste_CE2=function()
{
	//On recupere l'ancienne sélection
	var old=parseInt($("#select_CE2").val());
	//On vide
	$("#select_CE2").empty();
	//On remet...
	for(var i=0 ; i< schema.classes.length; i++)
	{
		classe=schema.classes[i];
		if(!$("#select_CE1 option[value='"+classe.numero()+"']").is(':selected'))
		{
			var ajout="<option value=\""+classe.numero()+"\"";
			if(classe.numero()==old)
				ajout+=" selected=\"selected\"";
			ajout+=">"+classe.nom()+"</option>";
			$("#select_CE2").append(ajout);
		}
	}
}

// Met à jour la liste de CE (seules) dans le menu
update_liste_CE = function()
{
	//On vide
	$("#select_CE").empty();
	for(var i=0 ; i< schema.classes.length; i++)
	{
		var classe=schema.classes[i];
		var ajout="<option value=\""+classe.numero()+"\">"+classe.nom()+"</option>";
		$("#select_CE").append(ajout);
	}
}




// Fonction qui renvoie une référence vers la classe d'équivalence n°i
getClasse = function(i)
{
	return schema.classes[Number(i)];
}
// Identique à getClasse, sauf qu'il renvoie direct la référence de la classe 1 dans le menu de sélection
getClasse1 = function()
{
	return getClasse($("#select_CE1").val());
}
// Identique à getClasse, sauf qu'il renvoie direct la référence de la classe 2 dans le menu de sélection
getClasse2 = function()
{
	return getClasse($("#select_CE2").val());
}

// Identique à getClasse, sauf qu'il renvoie direct la référence de la classe 2 dans le menu de sélection
getClasseSelectionnee = function()
{
	return getClasse($("#select_CE").val());
}


// ******************************************************************
// Fonction qui supprime ce qu'il y a dans la souris (suiveur).
// A utiliser à chaque nouvelle option cliquer, ou en fin d'action
videSuiveur = function()
{
	for(var i=suiveur.children.length-1; i>1; i--)
		suiveur.removeChildAt(i)
}

// ******************************************************************
// Fonction qui remet à zéro les actions, et qui vide le curseur suiveur
// (utile à la fin d'une action, ou pour annuler une action courrante)
resetActions = function()
{
	videSuiveur();
	ACTION="";
	SOUS_ACTION="";
	CLASSE=-1;
	deselectionneToutLeMonde();
	
	$(".menu_tertiaire").css("display","none");//Efface les menus tertiaires
	$(".menu_secondaire .bouton_menu").css("background-color","white");//Vire le bouton en surbrillance
	
	$("#bouton_lancer_simulation img").attr('src','./sources/images/icone_simule.svg');//On remet l'icone "lecture" de la simulation
	$("#info_classe").hide(400); //Cache le menu de séleciton des CE
	
	
}


// **********************************************************************
// Fonction qui remonte les parents jusqu'à trouver la classe d'équivalence
trouveClasse = function(cible)
{
	while(!cible.type || typeof cible.type() == "undefined" || cible.type() != "classe")
		cible = cible.parent;
		
	return cible;
}



// ************************************************
// Fonction qui remplie la zone d'info de la CL
update_info_CE=function(classe)
{
	$("#info_CE_nom").val(classe.nom());
	$("#info_CE_couleur").val(classe.couleur());
	$("#info_CE_bloque").prop("checked",classe.bloque());
	$("#info_CE_schema_visible").prop("checked",classe.schema.visible);
	$("#info_CE_annotations_visible").prop("checked",classe.annotations.visible);
}



// ****************************************************
// Calcule l'angle entre deux vecteur V1 et V2 de la forme {x: , y: }
angleEntreVecteurs = function(V1,V2)
{
	return Math.acos((V1.x*V2.x+V1.y* V2.y)/norme(V1)/norme(V2))
}


// *******************************************
// Calcule la norme de V de la forme {x: ,  y: }
norme = function(V)
{
	return Math.sqrt(V.x*V.x+V.y*V.y)
}
