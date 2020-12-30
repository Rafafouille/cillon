<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>Cillon 2D</title>
		
		<!-- JQUERY -->
		<link rel="stylesheet" href="./sources/JS/libraries/jquery-ui/jquery-ui.css">
		<script type="text/javascript" src="./sources/JS/libraries/jquery-ui/external/jquery/jquery.js"></script>
		<script type="text/javascript" src="./sources/JS/libraries/jquery-ui/jquery-ui.min.js"></script>
		
		<!-- CREATEJS -->
		<script type="text/javascript" src="./sources/JS/libraries/easeljs/easeljs-0.8.2.min.js"></script>
		
		<!-- MATHJS -->
		<script type="text/javascript" src="./sources/JS/libraries/mathjs/math.js"></script>
		
		
		<!-- FONCTIONS -->
		<script type="text/javascript" src="./sources/JS/fonctions.js"></script>
		<script type="text/javascript" src="./sources/JS/fonctions_evenements.js"></script>
		
		<!-- CLASSES -->
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Schema.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Classe_Equivalence.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Vecteur.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Bipoint.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Vecteur_Lie.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Base.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Repere.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Classe_Equivalence.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Classe_Equivalence_Flottante.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/liaisons/CLASS-PivotMale.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/liaisons/CLASS-PivotFemelle.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/liaisons/CLASS-PivotFlottante.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-SuiveurSouris.js"></script>
		<script type="text/javascript" src="./sources/JS/simulation.js"></script>
		
		
		
		<!-- Style -->
		<link rel="stylesheet" href="./sources/styles/style.css">
		
	</head>
	<body>
		<div id="menu_principal">
			<div class="bouton" id="bouton_editer" title="Éditer le mécanisme" onclick="ouvre_ferme_menu_editer();">
				<img src="./sources/images/crayon.svg" style="height:50px;" alt="[ ÉDITER ]"/>
			</div>
			<div class="bouton" id="bouton_simuler" title="Simuler">
				<img src="./sources/images/icone_simule.png" style="height:50px;" alt="[ SIMULER ]"/>
			</div>
		</div>
		<div class="menu_secondaire" id="menu_editer">
			<div class="bouton" id="bouton_add_CE" title="Ajouter une classe d'équivalence" onclick="place_new_CE()">
				<img src="./sources/images/icone_add_CE.svg" style="height:50px;" alt="[ AJOUTER CLASSE D'ÉQUIVALENCE ]"/>
			</div>
			<div class="bouton" id="bouton_dessiner" title="Dessiner sur une classe d'équivalence">
				<img src="./sources/images/crayon.svg" style="height:50px;" alt="[DESSINER]"/>
			</div>
			<div class="bouton new_liaison" id="bouton_add_liaison_pivot" onclick="place_new_pivot()" title="Ajouter une pivot">
				<img src="./sources/images/icone_pivot.svg" style="height:50px;" alt="[PIVOT]"/>
			</div>
		</div>
		<div class="menu_secondaire"  id="menu_simuler">
			<div class="bouton" id="bouton_agire" title="Agir sur le mécanisme">
				<img src="./sources/images/main.svg" style="height:50px;" alt="[AGIR]"/>
			</div>
		</div>
		<div class="menu_tertiaire"  id="menu_selection_pieces">
			<form>
				<label for="select_CE1">Pièce 1 : </label>
				<select id="select_CE1" onchange="update_liste_CE2()">
				</select>
				<label for="select_CE2">Pièce 2 : </label>
				<select id="select_CE2" onchange="update_liste_CE1()">
				</select>
			</form>
		</div>
		<div id="div_schema_cinematique" style="border:solid;">
						<canvas id="canvas_schema_cinematique" width="800" height="400"></canvas>
		</div>
	</body>
	
	
	
	<!-- MAIN -->
	<script type="text/javascript" src="./sources/JS/main.js"></script>
</html>
