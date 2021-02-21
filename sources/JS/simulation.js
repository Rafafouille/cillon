



// Fonction qui résout une fois le système KU=F
resout = function()
{

	//On crée les matrices
	systeme = prepareSysteme();
	

	
	//On résout
	solution = math.usolve(systeme.K,systeme.F)
	
	
	//On déplace les pièces
	for(i=0;i<schema.nbClasses();i++)
	{
		n=3*i;
		schema.classes[i].x += solution.get([3*i,0])
		schema.classes[i].y += solution.get([3*i+1,0])
		schema.classes[i].rotation += solution.get([3*i+2,0])*180/math.pi
//		console.log("Classe n0"+i+" : ( "+solution.get([3*i,0])+" , "+solution.get([3*i+1,0])+" , "+solution.get([3*i+2,0])*180/math.pi+" )")
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
