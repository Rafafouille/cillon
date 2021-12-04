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
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Point.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Bipoint.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Vecteur_Lie.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Base.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Repere.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Classe_Equivalence_Flottante.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/liaisons/CLASS-DemiLiaison.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/liaisons/CLASS-PivotMale.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/liaisons/CLASS-PivotFemelle.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/liaisons/CLASS-PivotFlottante.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/liaisons/CLASS-GlissiereMale.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/liaisons/CLASS-GlissiereFemelle.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-SuiveurSouris.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/liaisons/CLASS-AccrocheFlottante.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/liaisons/CLASS-Accroche.js"></script>
		<script type="text/javascript" src="./sources/JS/simulation.js"></script>
		<script type="text/javascript" src="./sources/JS/classes/CLASS-Ligne.js"></script>
		
		
		
		<!-- Style -->
		<link rel="stylesheet" href="./sources/styles/style.css">
		
	</head>
	<body>
		<div id="menu_principal">
			<div class="bouton_menu" id="bouton_ouvrir" title="Ouvrir mécanisme" onclick="ouvre_ferme_menu_ouvrir();">
				<img src="./sources/images/dossier.svg" style="height:50px;" alt="[ OUVRIR ]"/>
			</div>
			<div class="bouton_menu" id="bouton_editer" title="Éditer le mécanisme" onclick="ouvre_ferme_menu_editer();">
				<img src="./sources/images/crayon.svg" style="height:50px;" alt="[ ÉDITER ]"/>
			</div>
			<div class="bouton_menu" id="bouton_simuler" title="Simuler" onclick="ouvre_ferme_menu_simuler();">
				<img src="./sources/images/icone_simule.png" style="height:50px;" alt="[ SIMULER ]"/>
			</div>
		</div>
		<div class="menu_secondaire" id="menu_editer">
			<div class="bouton_menu" id="bouton_select" title="Sélectionne un objet pour l'éditer" onclick="mode_selection()">
				<img src="./sources/images/icone_select.svg" style="height:50px;" alt="[ SÉLECTIONNE ]"/>
			</div>
			<div class="bouton_menu" id="bouton_add_CE" title="Ajouter une classe d'équivalence" onclick="place_new_CE()">
				<img src="./sources/images/icone_add_CE.svg" style="height:50px;" alt="[ AJOUTER CLASSE D'ÉQUIVALENCE ]"/>
			</div>
			<div class="bouton_menu" id="bouton_dessiner" title="Dessiner sur une classe d'équivalence" onclick="lance_new_dessin()">
				<img src="./sources/images/crayon.svg" style="height:50px;" alt="[DESSINER]"/>
			</div>
			<div class="bouton_menu new_liaison" id="bouton_add_liaison_pivot" onclick="place_new_pivot()" title="Ajouter une pivot">
				<img src="./sources/images/icone_pivot.svg" style="height:50px;" alt="[PIVOT]"/>
			</div>
			<div class="bouton_menu ouvrir_console" id="bouton_console" onclick="ouvreConsole()" title="Console">
				<img src="./sources/images/console.svg" style="height:50px;" alt="[CONSOLE]"/>
			</div>
		</div>
		<div class="menu_secondaire"  id="menu_simuler">
			<div class="bouton_menu" id="bouton_lancer_simulation" title="Lancer la simulation" onclick="lancer_simulation()">
				<img src="./sources/images/icone_simule.svg" style="height:50px;" alt="[ LECTURE ]"/>
			</div>
			<div class="bouton_menu" id="bouton_lancer_reset" title="Réinitialiser les positions" onclick="reset_simulation();">
				<img src="./sources/images/icone_simule_reset.svg" style="height:50px;" alt="[ RESET ]"/>
			</div>
			<div class="bouton_menu" id="bouton_agir" title="Agir sur le mécanisme" onclick="lancer_agir()">
				<img src="./sources/images/main.svg" style="height:50px;" alt="[ AGIR ]"/>
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
		<div class="menu_tertiaire"  id="menu_selection_CE">
			<form>
				<label for="select_CE">Classe d'équivalence : </label>
				<select id="select_CE">
				</select>
			</form>
		</div>
		<div id="div_schema_cinematique" style="border:solid;">
						<canvas id="canvas_schema_cinematique" width="1000" height="600"></canvas>
		</div>
		
		<div id="menu_graphique">
			<div class="bouton_menu" id="bouton_affiche_images" title="Afficher toutes les images d'arrière plan" onclick="affiche_toutes_images()">
				<img src="./sources/images/icone_affiche_dessins.svg" style="height:50px;" alt="[ ALL IMAGES ]"/>
			</div>
			<div class="bouton_menu" id="bouton_cache_images" title="Cache toutes les images d'arrière plan" onclick="cache_toutes_images()">
				<img src="./sources/images/icone_cache_dessins.svg" style="height:50px;" alt="[ NO IMAGES ]"/>
			</div>
			
			<div class="bouton_menu" id="bouton_affiche_schema" title="Afficher tous les schémas" onclick="affiche_tous_schemas()">
				<img src="./sources/images/icone_affiche_schemas.svg" style="height:50px;" alt="[ ALL SCHÉMA ]"/>
			</div>
			<div class="bouton_menu" id="bouton_cache_schema" title="Cache tous les schémas" onclick="cache_tous_schemas()">
				<img src="./sources/images/icone_cache_schemas.svg" style="height:50px;" alt="[ NO SCHÉMA ]"/>
			</div>
		</div>
		
		<div id="info_classe" class="boite_info" style="display:none;">
			<h2>Classe d'équivalence</h2>
			<div class="contenu_info">
				<form onkeypress="return event.keyCode != 13;">
					<label for="info_CE_nom">Nom : </label><input type="text" name="info_CE_nom" id="info_CE_nom" placeholder="Nom de la classe d'équivalence" onchange="getClasse(CLASSE).nom($(this).val())"/>
					<label for="info_CE_couleur">Couleur : </label><input type="color" name="info_CE_couleur" id="info_CE_couleur" onChange="getClasse(CLASSE).couleur($(this).val())"/><br/>
					<label for="info_CE_bloque">Bloqué : </label><input type="checkbox" name="info_CE_bloque" id="info_CE_bloque" onChange="getClasse(CLASSE).bloque($(this).prop('checked'))"/><br/>
					<label for="info_CE_schema_visible">Schéma visible : </label><input type="checkbox" name="info_CE_schema_visible" id="info_CE_schema_visible" onChange="getClasse(CLASSE).schema.visible=$(this).prop('checked')"/><br/>
					<label for="info_CE_images_visible">Dessin visible : </label><input type="checkbox" name="info_CE_images_visible" id="info_CE_images_visible" onChange="getClasse(CLASSE).images.visible=$(this).prop('checked')"/><br/>
					<label for="info_CE_annotations_visible">Annotations visibles : </label><input type="checkbox" name="info_CE_annotations_visible" id="info_CE_annotations_visible" onChange="getClasse(CLASSE).annotations.visible=$(this).prop('checked')"/>
				</form>
			</div>
		</div>
	</body>
	
	
	
	<!-- MAIN -->
	<script type="text/javascript" src="./sources/JS/main.js"></script>
	<script type="text/javascript" src="./sources/JS/evenements_souris.js"></script>
	
	<?php
		// INCLUDES
		include("sources/PHP/dialogs.php");
	?>
	
	
	<script>
			execute_console(); //Exécution du code source
			updateConsoleMiseEnForme();
			schema.sauvePositions();	//On sauvegarde les positions initiales*/
	</script>
	
	
	
</html>
