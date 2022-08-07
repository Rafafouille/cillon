/**
 * @typedef {Object} Point. Attention à ne pas confondre avec {@link Position} (d'ailleur, cet objet est peut-être déjà obsolète).
 * @property {number} x - Coordonnées sur x
 * @property {number} y - Coordonnées sur y
 */
 
 /**
 * @typedef {Object} Position
 * @property {number} [x=0] - Coordonnée sur x (si absent : les fonctions l'interprètent comme 0)..
 * @property {number} [y=0] - Coordonnée sur y (si absent : les fonctions l'interprètent comme 0).
 * @property {number} [theta=0] - Rotation, en degrès (si absent : les fonctions l'interprètent comme 0).
 * @property {createjs.DisplayObject} [contexte={@link SCHEMA}] - Contexte par rapport auquel les coordonnées sont définies (si absent : les fonctions l'interprètent comme l'objet {@link SCHEMA})
 * @property {Boolean} [uniteSI=true] - Si False : les unités par défaut sont utilisées (x et y en pixels avec y vers le bas ; rotation en degrés dans le sens horaire). Si true : les unités personnalisées sont utilées (x et y en unité définie dans {@link schema.unite}, avec y vers le haut et theta en radian dans le sens trigo).
 */
