


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
		console.log(classe.numero())
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
