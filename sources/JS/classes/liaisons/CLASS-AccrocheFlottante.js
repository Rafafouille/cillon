//Pivot animée, en attendant d'être placée
/*
var AccrocheFlottante = function()
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

		createjs.Container.call(this);


	//==========================
	//Variables Membres
	//==========================
	
	

	//==========================
	//getter/setter
	//==========================

	

	//==========================
	//Autres fonctions membres
	//==========================
	
	


	//==========================
	//Graphismes
	//==========================
	
	
		var imgSprite = new Image();
		imgSprite.accrocheFlottante = this;
		imgSprite.onload = function(event){
			   
			    this.accrocheFlottante.animation = new createjs.Sprite(this.accrocheFlottante.spriteSheet, "run");
			    this.accrocheFlottante.addChild(this.accrocheFlottante.animation);
			    this.accrocheFlottante.animation.scaleX = 0.07 ;
			    this.accrocheFlottante.animation.scaleY = 0.07 ;
			    this.accrocheFlottante.animation.x = -this.accrocheFlottante.getBounds().width/2.
			    this.accrocheFlottante.animation.y = -this.accrocheFlottante.getBounds().height/2.	
			};
		imgSprite.src = "./sources/images/sprite_main_animee.png";
		
		var data = {
				images: [imgSprite],
				frames: {width:480, height:480},
				animations:
				{
		    			run:[0,10,"run"]
				}
			    };
		this.spriteSheet = new createjs.SpriteSheet(data);
	
		

		    
	toto = this.animation;
	//==========================
	// Animation
	//==========================

	
	
	//==========================
	// Evenements
	//==========================
		
		

}
AccrocheFlottante.prototype = Object.create(createjs.Container.prototype);//On recopie le prototype de createjs.Stage
AccrocheFlottante.prototype.constructor = AccrocheFlottante;//On recopie le constructeur de Noeud dans son prototype
*/

class AccrocheFlottante extends createjs.Container
{
	//==========================
	//Constructeur issu de l'heritage
	//==========================

	// **********************************************************
	/*
	 * Constructeur
	 */
	constructor()
	{
		// Héritage
		super()	// Rappelle le constructeur parent
		
		
		
		// Graphismes
		var imgSprite = new Image();
		imgSprite.accrocheFlottante = this;
		imgSprite.onload = function(event){
			   
			    this.accrocheFlottante.animation = new createjs.Sprite(this.accrocheFlottante.spriteSheet, "run");
			    this.accrocheFlottante.addChild(this.accrocheFlottante.animation);
			    this.accrocheFlottante.animation.scaleX = 0.07 ;
			    this.accrocheFlottante.animation.scaleY = 0.07 ;
			    this.accrocheFlottante.animation.x = -this.accrocheFlottante.getBounds().width/2.
			    this.accrocheFlottante.animation.y = -this.accrocheFlottante.getBounds().height/2.	
			};
		imgSprite.src = "./sources/images/sprite_main_animee.png";
		
		var data = {
				images: [imgSprite],
				frames: {width:480, height:480},
				animations:
				{
		    			run:[0,10,"run"]
				}
			    };
		this.spriteSheet = new createjs.SpriteSheet(data);
	}

	//==========================
	//Variables Membres
	//==========================
	
	

	//==========================
	//getter/setter
	//==========================

	

	//==========================
	//Autres fonctions membres
	//==========================
	
	


	//==========================
	//Graphismes
	//==========================
	
	
	//==========================
	// Animation
	//==========================

	
	
	//==========================
	// Evenements
	//==========================
}
