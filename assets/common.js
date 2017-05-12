'use strict'
//es6 imports

import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
//window.Tether = require('tether');
//require('bootstrap');


//console.log(Slider);

var WIDTH = window.innerWidth; // Width Screen
var HEIGHT = window.innerHeight; // Height Screen

// Dat.GUI Controls
var guiControls = new function (){
  this.rotationY = 0.01; 
  this.rotationZ = 0.01;   
  this.width = 1;
	this.height = 1;
	this.depth = 1;
}

var datGUI = new dat.GUI();
datGUI .add(guiControls, 'rotationY', 0, 0.3);
datGUI .add(guiControls, 'rotationZ', 0, 0.3);
datGUI .add(guiControls, 'width', 0.2, 1.5);
datGUI .add(guiControls, 'height', 0.2, 1.5);
datGUI .add(guiControls, 'depth', 0.2, 1.5);


// Create a WebGL renderer
var canvas = new THREE.WebGLRenderer({antialias: true});

// Canvas dimensions
canvas.setSize(
	WIDTH,
	HEIGHT
);

// Add canvas to body
document.body.appendChild(canvas.domElement);

// Create an empty scene
var scene = new THREE.Scene;

// Create polygon
var geometriaCubo = new THREE.CubeGeometry(
	200, // X axis dimension
	140, // Y axis dimension
	100 // Z axis dimension
);

// Color appearance (lilac)
var aparienciaLila = new THREE.MeshLambertMaterial({
	color: 0xc054ff // Hexadecimal color
});

// Create the polygon and give appearance
var cubo = new THREE.Mesh(geometriaCubo, aparienciaLila);

// Add the cube to the scene
scene.add(cubo);


// Create camara
var camera = new THREE.PerspectiveCamera(
	45,
	(WIDTH / HEIGHT),
	0.1,
	10000
);

// Place the camera
camera.position.y = 160;
camera.position.z = 400;

// Center the view in the cube
camera.lookAt(cubo.position);

// Add the camara to the scene
scene.add(camera);

// Create two spotlights
var luz1 = new THREE.PointLight(0x54d9ff); // Azul
luz1.position.set(
	120, // Axis X position
	260, // Axis Y position
	100	 // Axis Z position
);

var luz2 = new THREE.PointLight(0xff548f); // Rosa
luz2.position.set(
	-100, // Axis X position
	100, // Axis Y position
	200	 // Axis Z position
);

// Add the ligths
scene.add(luz1);
scene.add(luz2);

function renderize(){
	// Rotate the cube
	//cubo.rotation.y += Math.PI * 0.5 / 100;
	//cubo.rotation.z += Math.PI * Math.cos(x++ / 50) / 80;

  // Animation related to guiControls
  cubo.rotation.y += guiControls.rotationY;
	cubo.rotation.z += guiControls.rotationZ;
  cubo.scale.x = guiControls.width;
  cubo.scale.y = guiControls.height;
  cubo.scale.z = guiControls.depth;
  
	// Renderize the scene
	canvas.render(scene, camera);
	requestAnimationFrame(renderize);
}

// Renderize all
renderize();




