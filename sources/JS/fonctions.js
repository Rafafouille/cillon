

// =====================================================================
/**
 * Met à jour la liste des classes d'équivalence dans le menu de sélection de la classe d'équivalence n°1 (dans le cas où l'utilisateur est invité à sélectionner 2 classes d'équivalance).
 * La liste est récupérée dans schema.classes. On ignore la classe qui est présente dans la liste n°2.
 */
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



// =====================================================================
/**
 * Met à jour la liste des classes d'équivalence dans le menu de sélection de la classe d'équivalence n°2 (dans le cas où l'utilisateur est invité à sélectionner 2 classes d'équivalance).
 * La liste est récupérée dans schema.classes. On ignore la classe qui est présente dans la liste n°1.
 */
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



// =====================================================================
/**
 * Met à jour la liste des classes d'équivalence dans le menu e sélection de la classe d'équivalence (dans le cas où l'utilisateur est invité à sélectionner 1 seule classe d'équivalance).
 * La liste est récupérée dans schema.classes.
 */
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





// =====================================================================
/**
 * Fonction qui renvoie une référence vers la classe d'équivalence n°i (stoquée dans schema.classe).
 * @param {int} i - Numéro de la classe d'équivalence
 * @return {Classe_Equivalence} Référence vers un objet <Classe_Equivalence>.
*/
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
	if(ACTION == "MANIP" && SOUS_ACTION == "TIRE")
	{
		schema.classes[CLASSE].accroche.autoSupprime();
	}
	
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
	$("#info_CE_images_visible").prop("checked",classe.images.visible);
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



// ***********************************************
// Calcule la dérivée d'une parabole passant par 3 points,
// au niveau du 3eme point
// A, B et C sont des objets : {x,y}
deriveGauche3pts = function(A,B,C)
{
	var a = (C.y-A.y)/(C.x-A.x)/(C.x-B.x)-(B.y-A.y)/(B.x-A.x)/(C.x-B.x)
	var b = (B.y-A.y)/(B.x-A.x)-a*(B.x+A.x)
	return 2*a*C.x+b
}





// ******************************************************
// affiche_toutes_images en arrière plan
affiche_toutes_images = function()
{
	schema.classes.forEach(function(classe)
		{
			classe.images.visible = true;
		})
}


// ******************************************************
// cache_toutes_images en arrière plan
cache_toutes_images = function()
{
	schema.classes.forEach(function(classe)
		{
			classe.images.visible = false;
		})
}

// ******************************************************
// affiche_tous_schema et symboles cinématiques
affiche_tous_schemas = function()
{
	schema.classes.forEach(function(classe)
		{
			classe.schema.visible = true;
		})
}

// ******************************************************
// cache_tous_schema et symboles cinématiques
cache_tous_schemas = function()
{
	schema.classes.forEach(function(classe)
		{
			classe.schema.visible = false;
		})
}


// *******************************************************
// Fonction qui update la coloration syntaxique de la console
updateConsoleMiseEnForme = function()
{
	texte = $("#dialog_console .console").text(); // Texte au format brut
	texte = console2HTML(texte);	//Coloration
	$("#dialog_console .console").html(texte);
}

// ******************************************************
// Fonction qui encode le HTML le texte (brut) situé dans la console
console2HTML = function(texte)
{
	// Retour à la ligne
	texte = (texte + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + "<br />" + '$2');
	
	//Commentaires
	texte = texte.replace(/\/\/(.*)/g,'<span class=\"code_commentaire\">//$1</span>');
	
	//commande blanches
	texte = texte.replace(/(new )/g,'<span class=\"code_blanc\">$1</span>');
	
	//commande fonctions de cillon
	texte = texte.replace(/(Classe_Equivalence|ajouteLiaison|ajouteImage)\((.*)\)/g,'<span class="code_fonction_cillon"\>$1(</span>$2<span class="code_fonction_cillon">)</span>');
	
	//commande méthodes de cillon
	texte = texte.replace(/\.(bloque|couleur|dessineLigne|ajouteClasse|pilotee)\((.*)\)/g,'.<span class="code_methode_cillon"\>$1(</span>$2<span class="code_methode_cillon">)</span>');
		
	//commande méthodes str
	//texte = texte.replace(/\"(.*)\"/,'.<span class="code_str"\>\"$1\"</span>');
	//texte = texte.replace(/\'(.*)\'/g,'.<span class="code_str"\>\'$1\'</span>');
		
		
	return texte;
}




// ************************************************************
// Fonction qui interprète la console
execute_console = function()
{
	eval($("#dialog_console .console").text());//Exécution du code source
}



// ************************************************************
/** Fonction qui écrase les paramètres par défaut d'une fonction
 * par les options passées en argument. Les paramètres par défaut (argument 'defaut') est modifié en place.
 * @param {Object} defaut - objet contenant les paramètres par défaut (exemple : {x:0,y:0,....})
 * @param {Object} param - (FACULTATIF) objet contenant les (quelques) paramètres à écraser dans 'defaut' {exemple : {y:0} }
 */
ecraseOptions = function(defaut,param)
{
	if(typeof(param)!="undefined")
	{
		Object.keys(param).forEach(function(key){
			defaut[key] = param[key];
		})
	}
}


// ***************************************************
/** Fonction qui renvoie l'orientation d'un objet createjs par rapport au stage.
 * Utile notament quand un objet est pris dans des containers eux-même tournés.
 * @param {createjs.DisplayObject} Objet dont on veut connaître la rotation par rapport au stage
 * @return {number} Angle de rotation (en degré, dans le sens horaire)
 */
getGlobalRotation = function(_obj)
{
	var rotation = _obj.rotation ;
	var pointer = _obj
	while(pointer.parent)
	{
		pointer = pointer.parent
		rotation += pointer.rotation
	}
	return rotation;
}

// ***************************************************
/** Fonction qui renvoie l'orientation d'un objet createjs par rapport à un autre objet createjs.
 * Utile notament quand un objet est pris dans des containers eux-même tournés.
 * @param {createjs.DisplayObject} Objet dont on veut connaître la rotation par rapport au stage
 * @return {number} Angle de rotation (en degré, dans le sens horaire)
 */
getLocalToLocalRotation = function(_objSource, _objContexte)
{
	return getGlobalRotation(_objSource)-getGlobalRotation(_objContexte)
}

// ************************************************************
/** Fonction qui convertit une position (qui peut être locale à une classe d'équivalence, ou n'importe quel objet createjs ou non, qui peut être en, pixel ou en coordonnées locales)
 * @param {Position} _pos - Object "position".
 * @param {createjs.DisplayObject} _contexte_final - Objet createjs dans lequel on souhaite calculer les coordonnées.
 * @param {Boolean} _uniteSI - false si on souhaite que les coordonnées finale soient exprimées en coordonnées "classique" (en px, y vers le bas, rotation en degré dans le sens horaire). Si true, ce sera en unités dites "SI" (x et y avec l'unité de SCHEMA.unite(), rotation en radian dans le sens trigo).
 * @return {Position} Object position, par rapport à "schema"
*/
convertePosition = function(_pos_init, _contexte_final=SCHEMA, _uniteSI=false)
{
	// Valeur par defaut
	if(typeof(_pos_init.x) == 'undefined')
		_pos_init.x = 0 ;
	if(typeof(_pos_init.y) == 'undefined')
		_pos_init.y = 0 ;
	if(typeof(_pos_init.theta) == 'undefined')
		_pos_init.theta = 0 ;
	if(typeof(_pos_init.contexte) == 'undefined')
		_pos_init.contexte = SCHEMA ;
	if(typeof(_pos_init.uniteSI) == 'undefined')
		_pos_init.uniteSI = false ;
		
	var angle_init = _pos_init.theta * (1-1*_pos_init.uniteSI-_pos_init.uniteSI*1/(Math.PI)*180)
		
	var unite_source = 1 + _pos_init.uniteSI*(-1) + _pos_init.uniteSI * SCHEMA.unite() ;
	var unite_destination = 1 + _uniteSI*(-1) + _uniteSI * SCHEMA.unite() ;
	var sens_y_source = 1-2*_pos_init.uniteSI
	var sens_y_destination = 1-2*_uniteSI
	
	var new_coord = _pos_init.contexte.localToLocal(_pos_init.x*unite_source ,_pos_init.y*unite_source*sens_y_source ,_contexte_final) ; // Conversion en coordonnées px
	
	var newRotation = (angle_init+getLocalToLocalRotation(_pos_init.contexte,_contexte_final))*(1-1*_uniteSI-_uniteSI*Math.PI/180) ;
	
	return {x:new_coord.x/unite_destination, y:new_coord.y/unite_destination*sens_y_destination, theta:newRotation, contexte:_contexte_final, uniteSI: _uniteSI} ;
}
