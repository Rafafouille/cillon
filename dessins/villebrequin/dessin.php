<script>

//On crée les classe d'équivalence
C0=new Classe_Equivalence();
C1=new Classe_Equivalence();
C2=new Classe_Equivalence();
C3=new Classe_Equivalence();

//On change les coordonnées des classes
C2.x = 50;
C2.y = -150
C3.x = 500



//On bloque C0 (le bati)
C1.bloque(true);


//Ajout des classes
schema.ajouteClasse(C0);
schema.ajouteClasse(C1);
schema.ajouteClasse(C2);
schema.ajouteClasse(C3);
	
	

//dessin
C1.dessineLigne(30,0,-30,-100,false);
C2.dessineLigne(-20,50,220,150,false);
C3.dessineLigne(-50,0,-200,0,false);


//Liaisons
LIAISON1 = ajouteLiaison(0,1,"pivot",{x:0,y:0})
LIAISON1.L1.pilotee(true); // OU L2, c'est pareil
LIAISON1.L1.rotation=90
LIAISON2 = ajouteLiaison(1,2,"pivot",{x:0,y:-100})
LIAISON3 = ajouteLiaison(2,3,"pivot",{x:300,y:0})
LIAISON3 = ajouteLiaison(3,0,"glissiere",{x:500,y:0})




schema.sauvePositions();	//On sauvegarde les positions initiales
</script>
