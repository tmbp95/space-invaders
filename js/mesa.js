/*global THREE*/

var camera, scene, renderer;
var geometry, material, mesh;
var ball;
var clock = new THREE.Clock();
var keys = [];
var reset = false;
var alien11, alien12, alien13, alien14, alien21, alien22, alien23, alien24, alien31, alien32, alien33, alien34, Spacecraft;

var alienColor1 = 0x00ffa8;
var alienColor2 = 0xffba00;
var alienColor3 = 0xcccccc;

var acceleration = 20.0;
var disacceleration = 30.0;

var speed = 0, speedMax = 50.0;
var limitSpaceGame = 40;
var ViewSize = 35;


var materialSpacecraft = new THREE.MeshBasicMaterial({color:0xfffbce, wireframe: true});
var materialWeapons = new THREE.MeshBasicMaterial({color:0xff0000, wireframe: true});
var materialTeeth = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
var materialBody = new THREE.MeshBasicMaterial({color: 0x323232, wireframe: true});
;
var materialAlien2 = new THREE.MeshBasicMaterial({color: alienColor2, wireframe: true});
var materialAlien3 = new THREE.MeshBasicMaterial({color: alienColor3, wireframe: true});

function createBall(x,y,z){
	'use scrict';
	ball = new THREE.Object3D();
	ball.userData = {jumping: true, step: 0};
	material = new THREE.MeshBasicMaterial({color:0xff0000, wireframe:true});
	geometry = new THREE.SphereGeometry(4, 20, 20);
	mesh = new THREE.Mesh(geometry, material);

	ball.add(mesh);
	ball.position.set(x, y, z);
	scene.add(ball);
}

function addTableTop(obj, x, y, z){
	'use scrict';
	geometry = new THREE.CubeGeometry(60, 2, 20);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addTableLeg(obj, x, y, z){
	'use scrict';
	geometry = new THREE.CubeGeometry(2, 6, 2);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y-3, z);
	obj.add(mesh);
}

function createTable(x, y, z){
	'use scrict';
	var table = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial({color:0x00ff00, wireframe:true});

	addTableTop(table, 0, 0, 0);
	addTableLeg(table, -25, -1, -8);
	addTableLeg(table, -25, -1, 8);
	addTableLeg(table, 25, -1, 8);
	addTableLeg(table, 25, -1, -8);

	scene.add(table);
	table.position.x = x;
	table.position.y = y;
	table.position.z = z;
}
function character(acceleration, x,y,z){
	var obj = {};
	obj.acceleration = acceleration;
	obj.obj3d = new THREE.Object3D();
	obj.obj3d.position.set(x, y,z);
	obj.active = true;
	return obj;
};

function alien( acceleration, x,y,z){
	var obj = character(acceleration, x,y,z);
	var materialAlien1 = new THREE.MeshBasicMaterial({color: 0x00ffa8, wireframe: true})
	obj.geometry = new THREE.CubeGeometry(8, 4, 5);
	obj.mesh = new THREE.Mesh(geometry, materialAlien1);
	obj.mesh.position.set(x, y, z);
	obj.obj3d.add(obj.mesh);
	return obj;
};

function createCamera(){
	'use scrict';
	camera = new THREE.PerspectiveCamera(70,
										window.innerWidth / window.innerHeight,
										1,
										1000);
	camera.position.x = 50;
	camera.position.y = 50;
	camera.position.z = 50;
	camera.lookAt(scene.position);
}

function createScene(){
	'use scrict';
	scene = new THREE.Scene();
	//scene.add(new THREE.AxisHelper(10));

	//createTable(0, 0, 0);
	//createBall(0, 0, 15);
	var alien1 = new alien(acceleration, 0,0,0);
	alert(alien1.obj3d);
	scene.add(alien1.obj3d);
}

function onResize(){
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);

	if(window.innerHeight > 0 && window.innerWidth > 0){
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();
	}
}


function animate(){
	'use strict';

	render();
	requestAnimationFrame(animate);
}

function render(){
	'use strict';
	renderer.render(scene, camera);
}

function init(){
	'use scrict';
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	createScene();
	createCamera();
	render();
	window.addEventListener("resize", onResize);
}