<div id="dialog_ouvrir" title="Ouvrir un mécanisme">
	<div id="dialog_ouvrir_contenu">
	</div>
</div>


<script>
	$("#dialog_ouvrir").dialog({
		autoOpen: false,
		modal:true,
		width:900,
		height:500,
		buttons: [
			    {
			      text: "Annuler",
			      click: function() {$(this).dialog("close");}
			    }
			  ]
	});
</script>





<div id="dialog_console" title="Console Javascript">
	<div id="dialog_console">
		<form>
			<div style="text-align:center;">
				<!-- <textarea><?php


					//OUVERTURE DE FICHIER
					//$fichier = isset($_GET['schema'])?$_GET['schema']:"test";
					
					//// Ouverture du fichier JS (et exécution dans la foulée)
					////echo "<script type=\"text/javascript\" src=\"./dessins/".$fichier."/dessin.js\"></script>";//On execute le fichier
					
					//$fichier_source = fopen("./dessins/".$fichier."/dessin.js", "r") or die("impossible d'ouvrir");
					//$code_source=fread($fichier_source,filesize("./dessins/".$fichier."/dessin.js"));
					//fclose($fichier_source);
					//echo $code_source;
					
					//include("dessins/".$fichier."/dessin.php");
				?></textarea>-->
				
				<div class="console" contenteditable ><?php


					//OUVERTURE DE FICHIER
					$fichier = isset($_GET['schema'])?$_GET['schema']:"test";
					
					// Ouverture du fichier JS (et exécution dans la foulée)
					//echo "<script type=\"text/javascript\" src=\"./dessins/".$fichier."/dessin.js\"></script>";//On execute le fichier
					
					$fichier_source = fopen("./dessins/".$fichier."/dessin.js", "r") or die("impossible d'ouvrir");
					$code_source=fread($fichier_source,filesize("./dessins/".$fichier."/dessin.js"));
					fclose($fichier_source);
					echo nl2br($code_source);
					
					//include("dessins/".$fichier."/dessin.php");
				?>
				</div>
			</div>
			<input type="checkbox" id="checkbox-console-reset" name="checkbox-console-reset">
				<label for="checkbox-console-reset">Effacer le dessin avant l'exécution.</label>
			<a href="documentation/" target="_blanck"><img style="height:30px;" src="./sources/images/help.svg" alt="[DOCUMENTATION]" title="Documentation"/></a>
		</form>
	</div>
</div>


<script>
	$("#dialog_console").dialog({
		autoOpen: false,
		modal:true,
		width:900,
		height:500,
		buttons: [
			    {
			      text: "Annuler",
			      click: function() {$(this).dialog("close");}
			    }
			    ,
			    {
			      text: "Exécuter",
			      click: function(){}
			    }
			  ]
	});
</script>
