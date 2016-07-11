<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Schéma cinématique</title>

		<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/smoothness/jquery-ui.css" />
		<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
		<link rel="stylesheet" href="./sources/css/menus.css"/>

		<!--<script src="./sources/JS/libraries/fabricjs.js"></script>-->

		<script src="http://libs.allais.eu/kineticJS/kinetic-v5.1.0.js"></script>
		<script src="http://libs.allais.eu/kineticJS/kineticPlus.js"></script>
		<script src="http://libs.allais.eu/numericJS/numeric.js"></script>

		<script src="./sources/JS/classes/CLASS-Vecteur.js"></script>
		<script src="./sources/JS/classes/CLASS-Repere.js"></script>
		<script src="./sources/JS/classes/CLASS-Classe.js"></script>
		<script src="./sources/JS/classes/Liaisons/CLASS-DemiLiaison.js"></script>
		<script src="./sources/JS/classes/Liaisons/CLASS-DemiPivot.js"></script>
		<script src="./sources/JS/classes/Liaisons/CLASS-PivotAnimee.js"></script>
		<script src="./sources/JS/fonctions.js"></script>
		<script src="./sources/JS/main.js"></script>

		<script>
			//Scripts
		</script>
	</head>
	<body>
		<div id="scene" style="border:solid;">test</div>
	</body>

	<p>
		<a class="boutonMenu" onclick="scene.classes.add(new Classe());">Ajouter Classe</a>
		<a class="boutonMenu" onclick="startMenuAjouterUneLiaison();">Ajouter Liaison</a>
	</p>

	<div id="menuAjouterLiaison">
		<h3>Ajouter une liaison</h3>
		<form action="" method="POST">
			<label>Liaison : </label>
			<select id="ajouterLiaison_ChoixLiaison">
				<option value="pivot">Pivot</option>
			</select>
			<br/>
			<label>Pièce 1 :</label>
			<select id="ajouterLiaison_Piece1" onchange="scene.calqueSelection.children[0].piece1(getClasseFromNum(parseInt($('#ajouterLiaison_Piece1').val())));updateSelectAjoutLiaison_Piece2();">
			</select>
			<br/>
			<label>Pièce 2:</label>
			<select id="ajouterLiaison_Piece2" onchange="scene.calqueSelection.children[0].piece2(getClasseFromNum(parseInt($('#ajouterLiaison_Piece2').val())));updateSelectAjoutLiaison_Piece1();">
			</select>
		</form>
	</div>
	
</html>
