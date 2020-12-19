
//==============================================
// Fonctions de déboggage
//==============================================

//Fonction qui affiche dans la console
debug=function(t)
{
	console.log(t);
}
//Affiche un tableau 2D dans la console
print2D=function(T)
{
	for(var i=0;i<T.length;i++)
		console.log(T[i]);
}

//==============================================
// Fonctions liées aux classes
//==============================================


//Fonction qui renvoie une référence d'une classe à partir de son numéro dans la liste
getClasseFromNum=function(i)
{
	return scene.classes.children[i];
}


//Fonction qui choisi une couleur au pif...
randomColor=function()
{
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
    return color;
}
//==============================================
// Solver
//==============================================

//Fonction qui déclenche de remplissage des matrices du système
setSysteme=function()
{
	//Efface la matrice précédente
	for(var i=0;i<matA.length;i++)
		matA[i].fill(0);
	matB.fill(0);

	//On refait les matrices
	for(var i=0;i<scene.classes.children.length;i++)
	{
		var solide=scene.classes.children[i];
		solide.setEquations();
	}
	debug(numeric.det(matA));
}

//Fonction qui déclenche de remplissage des matrices du système
solveSysteme=function()
{
	return numeric.dot(numeric.inv(matA),matB);	//A OPTIMISER !!!!!
}

//Fonction qui déclenche de remplissage des matrices du système
updateResultatSysteme=function(sol)
{
	for(var i=0;i<scene.classes.children.length;i++)
		{
			var solide=scene.classes.children[i];
			solide.x(sol[3*i]);
			solide.y(sol[3*i+1]);
			solide.rotation(sol[3*i+2]*57.29577951308232);//rad->Deg
		}
}




//==============================================
// Menus divers
//===============================================


//Bouton pour lancer le menu pour ajouter une liaison
startMenuAjouterUneLiaison=function()
{

	if($("#menuAjouterLiaison").css("display")=='none')	//Si pas affiché
	{
		if(scene.classes.children.length>1)	//S'il y a assez de classe (au moins 2), on ajoute l'objet qui va créer la liaison
		{
			var typeLiaison=$("#ajouterLiaison_ChoixLiaison").val();		//On recupere le type de liaison
			var p1=getClasseFromNum(parseInt($("#ajouterLiaison_Piece1").val()));	//On recupere la piece 1
			var p2=getClasseFromNum(parseInt($("#ajouterLiaison_Piece2").val()));	//On repcupere la piece 2
		
			switch(typeLiaison)	//Quelle liaison ?
			{
				case "pivot":
					var liaisonAnimee=new PivotAnimee(p1,p2);
					break;
				default:
					var liaisonAnimee=0;
			}
		
			if(liaisonAnimee)	//Si la liaison est connue
			{
				scene.calqueSelection.add(liaisonAnimee);	//On l'ajoute à la scene
				liaisonAnimee.animation.start();		//On lance son animation
			}
		}
	}
	else //Si le menu est DEJA ouvert
	{
		scene.calqueSelection.destroyChildren();
	}
	$("#menuAjouterLiaison").slideToggle();
}



//Met a jour le menu d'ajout des liaisons (pieces 1)
updateSelectAjoutLiaison_Piece1=function()
{
	var choixPiece1=parseInt($("#ajouterLiaison_Piece1").val());
	var choixPiece2=parseInt($("#ajouterLiaison_Piece2").val());
	$("#ajouterLiaison_Piece1").empty();
	for(var i=0;i<scene.classes.children.length;i++)
		{
			if(i!=choixPiece2)
			{
				$("#ajouterLiaison_Piece1").append('<option value='+i+'>'+scene.classes.children[i].nom()+'</option>');
				if(i==choixPiece1)
					$("#ajouterLiaison_Piece1 option:last-child").prop('selected', true);
			}
		}
}

//Met a jour le menu d'ajout des liaisons (pieces 2)
updateSelectAjoutLiaison_Piece2=function()
{
	var choixPiece1=parseInt($("#ajouterLiaison_Piece1").val());
	var choixPiece2=parseInt($("#ajouterLiaison_Piece2").val());
	$("#ajouterLiaison_Piece2").empty();
	for(var i=0;i<scene.classes.children.length;i++)
		{
			if(i!=choixPiece1)
			{
				$("#ajouterLiaison_Piece2").append('<option value='+i+'>'+scene.classes.children[i].nom()+'</option>');
				if(i==choixPiece2)
					$("#ajouterLiaison_Piece2 option:last-child").prop('selected', true);
			}
		}
}

//==============================================
// Fonctions de cinématique
//==============================================

//Fonction qui renvoie les coordonnées graphiques a partir des coordonnées des vecteurs
getGraphCoord=function(c)
{
    return {x:c.x*unite,y:-c.y*unite};
}



//==============================================
// Outils mathématiques
//==============================================

//Fonction qui addition les vecteurs {x:,y:,z:}
add3D=function(v1,v2)
{
	return{x:v1.x+v2.x,y:v1.y+v2.y,z:v1.z+v2.z};
}

//Fonction qui addition les vecteurs {x:,y:}
add2D=function(v1,v2)
{
	return{x:v1.x+v2.x,y:v1.y+v2.y};
}


//Fonction qui soustrait les vecteurs {x:,y:,z:}
sous3D=function(v1,v2)
{
	return{x:v1.x-V2.x,y:v1.y-v2.y,z:v1.z-v2.z};
}

//Fonction qui soustrait les vecteurs {x:,y:}
sous2D=function(v1,v2)
{
	return{x:v1.x-v2.x,y:v1.y-v2.y};
}


//Fonction qui calcul la norme d'un vecteurs {x:,y:,z:}
norme2D=function(v)
{
	return Math.sqrt(v.x*v.x+v.y*v.y+v.z*v.z);
}

//Fonction qui addition les vecteurs {x:,y:}
norme2D=function(v)
{
	return Math.sqrt(v.x*v.x+v.y*v.y);
}


//Matrice remplie de 0
zeroes=function(n,m)
{
	var mat=new Array();
	for(i=0;i<n;i++)
	{
		if(typeof(m)=="undefined")
			mat.push(0);
		else
			mat.push(new Array(m).fill(0));
	}
	return mat;
	
}

