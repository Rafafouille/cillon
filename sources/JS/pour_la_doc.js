/**
 * @typedef {Object} Point
 * @property {number} x - Coordonnées sur x
 * @property {number} y - Coordonnées sur y
 * @property {Classe_Equivalence} classe - (Facultatif) Référentel pour le jeu de coordonnées. Par défaut : c'est l'objet "schema"
 */
 
 /**
 * @typedef {Object} Position
 * @property {number} x - Coordonnée sur x (si non-renseignée : les fonctions l'interprète comme 0)..
 * @property {number} y - Coordonnée sur y (si non-renseignée : les fonctions l'interprète comme 0).
 * @property {number} theta - Rotation, en degrès (si non-renseignée : les fonctions l'interprète comme 0).
 * @property {createjs.DisplayObject} contexte - Contexte par rapport auquel les coordonnées sont définies (si non-renseignée : les fonctions l'interprète comme l'objet SCHEMA)
 * @property {Boolean} uniteSI - Si False : les unités par défaut sont utilisée (x et y en px et y vers le bas, et rotation en degrés dans le sens horaire). Si True : les unités personnalisée sont utilées (x et y en unité définie dans SCHEMA.unite(), y vers le haut et theta en radian dans le sens trigo).
 */
