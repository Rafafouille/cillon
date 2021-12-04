<?php

$action = isset($_POST['action'])?$_POST['action']:"";


if($action=="getMecanismes")
{

	$liste=array();
	$dossiers_mecanismes = scandir("dessins");
	for($i=0;$i<sizeof($dossiers_mecanismes);$i++)
	{
		if($dossiers_mecanismes[$i]!="." && $dossiers_mecanismes[$i]!="..")
		{
		
			$nom = $dossiers_mecanismes[$i];
			$image = "./dessins/".$dossiers_mecanismes[$i]."/icone.png";
			if(!file_exists($image))
				$image = "./sources/images/icone_engrenage.svg";
			$lien = $dossiers_mecanismes[$i];
		
		
			$infos = array(
					"nom"=>$nom,
					"image"=>$image,
					"lien"=>$lien
					);
			array_push($liste,$infos);
		}
	}
	$reponse=array(
		'mecanismes'=>$liste
		);
	
	$reponseJSON = json_encode($reponse);
	echo $reponseJSON;
}

?>
