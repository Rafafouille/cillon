



// Fonction qui résout une fois le système KU=F
resout = function()
{

	//On crée les matrices
	systeme = prepareSysteme();
	

	//console.log(math.det(systeme.K))
	
	//console.log("=======")
	//affiche_matrice(systeme.K._data);
	//affiche_matrice(systeme.F._data);
	
	//On résout
	solution = math.usolve(systeme.K,systeme.F)
	
	//console.log("---")
	//affiche_matrice(solution._data);
	
	//On déplace les pièces
	for(i=0;i<schema.nbClasses();i++)
	{
		n=3*i;
			var dx = solution.get([3*i,0]);
		schema.classes[i].x += dx>10 ? 10 : dx
			var dy = solution.get([3*i+1,0]);
		schema.classes[i].y += dy>10 ? 10: dy
			var dtheta=solution.get([3*i+2,0])*180/math.pi
		schema.classes[i].rotation += dtheta>5?5:dtheta	// Pour brider la rotation
	}
}


// Fonction qui crée et remplis les matrices de résolution
prepareSysteme = function()
{
	var n = schema.nbClasses(); //Nombre de classes d'équivalence
	K = math.zeros(3*n,3*n)
	F = math.zeros(3*n,1)
	
	K.ajouteVal = function(i,j,val)
		{this.set([i,j], this.get([i,j])+val)}
	
	F.ajouteVal = function(i,val)
		{this.set([i,0], this.get([i,0])+val)}
	
	
	
	
	
	// Pour chaque CE
	for (i=0 ; i<schema.classes.length; i++)
	{
		var CE = schema.classes[i]
		CE.remplitSysteme(K,F)
	}
	
	return {K:K, F:F}
}
