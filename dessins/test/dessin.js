
//On crée les classe d'équivalence
C0 = new Classe_Equivalence();
C1 = new Classe_Equivalence();



//On bloque le bati
C0.bloque(true);


//Ajout des classes
schema.ajouteClasse(C0);
schema.ajouteClasse(C1);
	

//Coordonnées
posO = {x:0,y:0} // Position par rapport au schéma, avec les unités du dessin (y vers le haut)
posA = {x:100, y:0, uniteSI:false}
posB = {x:100, y:-50, uniteSI:false}
	


//dessin


//Points

//Liaisons
LIAISON1 = ajouteLiaison(C0,C1,"pivot",posO)
LIAISON2 = ajouteLiaison(C1,C0,"glissiere",posA)
//LIAISON3 = ajouteLiaison(C0,C1,"pivot",posB)

//LIAISON3.L1.y+=1

schema.sauvePositions();	//On sauvegarde les positions initiales
