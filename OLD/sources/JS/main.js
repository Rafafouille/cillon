

idClasse=0;	//n° des classe d'équivalence
idVecteur=0;   //n° des vecteurs
idRepere=0;   //n° des reperes
idLiaison=0;   //n° des liaisons

unite=30;      //Nombre de pixels par unité

piloteParLaSouris=null;	//solide piloté par la souris


RAIDEUR_LIAISONS=10;
RAIDEUR_SOURIS=1;

//Initialisation
window.onload = function()
{
	scene=new Kinetic.Stage({
					container: "scene",
					width: 1000,
					height: 600
				});
				
	scene.nbClasses=function()
	{
		return scene.classes.children.length;
	}
				
	//Définition des calques
	scene.calquePrincipal=new Kinetic.Layer();
	scene.calquePrincipal.x(200);
	scene.calquePrincipal.y(200);

	scene.calqueSelection=new Kinetic.Layer();
	scene.calqueSelection.x(200);
	scene.calqueSelection.y(200);

	scene.add(scene.calqueSelection);
	scene.add(scene.calquePrincipal);
	
	//Groupe contenant les classes d'équivalence
	scene.classes=new Kinetic.Group();
	scene.calquePrincipal.add(scene.classes);
	







	//TEST CLASSES
	solide1=new Classe();
	//solide1.draggable(true);
	solide1.x(500);
	solide1.y(000);
	solide1.etat("bloque");
	scene.classes.add(solide1);

	solide2=new Classe();
	solide2.draggable(true);
	solide2.x(000);
	solide2.y(000);
	//solide2.etat("bloque");
	scene.classes.add(solide2);

	solide3=new Classe();
	solide3.draggable(false);
	solide3.x(250);
	solide3.y(00);
	//solide3.etat("bloque");
	scene.classes.add(solide3);
	
	// LIAISONS
	
	//Liaison 2-3
	pivot23=new DemiPivot();
	pivot23.x(125);
	pivot23.y(0);
	solide2.ajouteLiaison(pivot23);
	
	pivot32=new DemiPivot();
	pivot32.x(-125);
	pivot32.y(0);
	solide3.ajouteLiaison(pivot32);

	pivot23.partenaire(pivot32);
	pivot32.partenaire(pivot23);
	

	//Liaison 1-3
	pivot13=new DemiPivot();
	pivot13.x(-125);
	pivot13.y(0);
	solide1.ajouteLiaison(pivot13);
	
	pivot31=new DemiPivot();
	pivot31.x(125);
	pivot31.y(0);
	solide3.ajouteLiaison(pivot31);

	pivot13.partenaire(pivot31);
	pivot31.partenaire(pivot13);
	

	//TEST AUTRES

	

	//Dessin de la scene

	scene.draw();

	
	
	//Systeme
	matA=zeroes(scene.nbClasses()*3,scene.nbClasses()*3);//Matrice du système
	matB=zeroes(scene.nbClasses()*3);	//Second membre
	resultat=zeroes(scene.nbClasses()*3);	//Resultat du système (0 par defaut)





	//Solvage

	scene.fonctionAnimationMouvement=function(frame)
	{
		setSysteme();	//Mise en place du système
		//print2D(matA);
		updateResultatSysteme(solveSysteme());	//On résout et on update les nouvelles coordonnées dans la foulée
	}
	scene.animationMouvement=new Kinetic.Animation(scene.fonctionAnimationMouvement,scene.calquePrincipal)


	//Initialisation des boites de dialogues

		//Boite Ajout d'une liaison

			$("#ajouterLiaison_Piece1").append('<option value=0>'+scene.classes.children[0].nom()+'</option>');
			$("#ajouterLiaison_Piece2").append('<option value=1>'+scene.classes.children[1].nom()+'</option>');
			for(var i=2;i<scene.classes.children.length;i++)
			{
				$("#ajouterLiaison_Piece1").append('<option value='+i+'>'+scene.classes.children[i].nom()+'</option>');
				$("#ajouterLiaison_Piece2").append('<option value='+i+'>'+scene.classes.children[i].nom()+'</option>');
			}
	
}
