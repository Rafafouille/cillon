		document.getElementById('canvas_schema_cinematique').addEventListener("mousedown",function(event){
				MOUSE_DOWN = event.which;
				if(MOUSE_DOWN == 2) //Si clic du milieu
				{
					LAST_CLIC.x = event.x;
					LAST_CLIC.y = event.y;
					schema.LAST_POSITION_GLOBALE=schema.localToGlobal(schema.x,schema.y);
					/*document.getElementById('canvas_schema_cinematique').addEventListener("mousemove",function(event){
							newPosition = schema.globalToLocal(event.x-schema.LAST_POSITION_GLOBALE.x,event.y-schema.LAST_POSITION_GLOBALE.y);
							schema.x = newPosition.x;
							schema.y = newPosition.y;
						});*/
				}
				else if(MOUSE_DOWN == 1 && ACTION == "DESSIN")
				{
					if(SOUS_ACTION == "ATTENTE_DEMARRAGE")
					{
						//On prépare le brouillon
						var ligne = new createjs.Shape();
						schema.addChild(ligne) ;
						schema.brouillon = ligne ;
						
						var position_local = schema.brouillon.globalToLocal(event.stageX , event.stageY)
						LAST_CLIC.x = position_local.x;
						LAST_CLIC.y = position_local.y;
						ligne.coords=[event.stageX , event.stageY];
						
						SOUS_ACTION = "DESSINE";
						
					}
				}
			})
			
			
			
			
			
		document.getElementById('canvas_schema_cinematique').addEventListener("mouseup",function(event)
			{
				if(ACTION == "DESSIN" && SOUS_ACTION == "DESSINE")
				{
					SOUS_ACTION = "ATTENTE_DEMARRAGE";
					var classe = getClasseSelectionnee();
					classe.dessineLigne(schema.brouillon.coords,classe);
					schema.removeChild(schema.brouillon);
				}
				if(ACTION == "MANIP"  && SOUS_ACTION == "TIRE")
				{
					SOUS_ACTION = "PREPARE";
					var classe = schema.classes[CLASSE];
					classe.accroche.autoSupprime();
					suiveur.addChild(new AccrocheFlottante());
				}
			});
			
		//Souris deplace	
		schema.addEventListener("pressmove",function(event){

				if(event.nativeEvent.which == 2 || MOUSE_DOWN == 2) //Si c'est un clic milieu
				{
					schema.x += event.nativeEvent.movementX;
					schema.y += event.nativeEvent.movementY;
				}
				if(ACTION == "DESSIN" && SOUS_ACTION == "DESSINE") //Si on est en mode dessin avec le stylo sur la feuille
				{
					

					var classe = getClasseSelectionnee();
					var new_position_local = schema.brouillon.globalToLocal(event.stageX , event.stageY)
					
					schema.brouillon.graphics.setStrokeStyle(1).beginStroke(classe.couleur()).moveTo(LAST_CLIC.x,LAST_CLIC.y);
					schema.brouillon.graphics.lineTo(new_position_local.x,new_position_local.y);
					
					
					// Recopiage du dessin dans une liste, en simplifiant la ligne
					/*var coords = schema.brouillon.coords
					var x0 = event.stageX ;
					var y0 = event.stageY ;
					var x1 = coords[coords.length-2]
					var y1 = coords[coords.length-1]
					var x2 = coords[coords.length-4]
					var y2 = coords[coords.length-3]
					if(coords.length<=4 || Math.abs(angleEntreVecteurs({x:x1-x2,y:y1-y2},{x:x0-x1,y:y0-y1}))>10*Math.PI/180)
					{*/
						schema.brouillon.coords.push(event.stageX);
						schema.brouillon.coords.push(event.stageY);
					//}
					
					//Remplace
					LAST_CLIC.x = new_position_local.x;
					LAST_CLIC.y = new_position_local.y;
				}
			});
			
			
			

		//Souris (zoom)
		document.getElementById('canvas_schema_cinematique').addEventListener("wheel",function(event){

				if(Math.max(-1, Math.min(1, (event.deltaY || -event .detail)))>0)
				{
					factor = 1.1;
				}
				else
				{
					factor = 1/1.1;
				}

  				var sourisLocale = schema.globalToLocal(dessin.mouseX , dessin.mouseY)
				var depGlobal = {x:dessin.mouseX-schema.x , y:dessin.mouseY-schema.y}
				
				schema.x += depGlobal.x
				schema.y += depGlobal.y
				
    				schema.scaleX *= factor;
    				schema.scaleY *= factor;
    				
				schema.x -= depGlobal.x * factor
				schema.y -= depGlobal.y * factor
				
    				/*var sourisGlobaleZoomee = schema.localToGlobal(sourisLocale.x,sourisLocale.y)

				schema.x -= dessin.mouseX-sourisGlobaleZoomee.x;
				schema.y -= dessin.mouseY-sourisGlobaleZoomee.y;*/
				event.preventDefault();//Pour supprimer le scrolling
			});
			
			
			
		//Move
