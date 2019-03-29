/*global THREE*/

var camera, scene, renderer;
var geometry, material, mesh;
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
var materialAlien1 = new THREE.MeshBasicMaterial({color: alienColor1, wireframe: true});
var materialAlien2 = new THREE.MeshBasicMaterial({color: alienColor2, wireframe: true});
var materialAlien3 = new THREE.MeshBasicMaterial({color: alienColor3, wireframe: true});

//-------------- Spacecraft -----------------

function addSpacecraftTail(obj, x, y, z){
	'use scrict';
	geometry = new THREE.CylinderGeometry(3, 1.5, 2, 30);
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 )));
	mesh = new THREE.Mesh(geometry, materialWeapons);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addSpacecraftPriWeapon(obj, x, y, z){
	'use scrict';
	geometry = new THREE.CylinderGeometry(0.9, 0.9, 3.5, 30);
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 )));
	mesh = new THREE.Mesh(geometry, materialWeapons);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addSpacecraftSecWeapon(obj, height, x, y, z){
	'use scrict';
	geometry = new THREE.CylinderGeometry(0.5, 0.5, height, 30);
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 )));
	mesh = new THREE.Mesh(geometry, materialWeapons);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addSpacecraftPartBody(obj, width, height, depth, x, y, z){
	'use scrict';
	geometry = new THREE.CubeGeometry(width, height, depth);
	mesh = new THREE.Mesh(geometry, materialSpacecraft);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addSpacecraftBody(x,y,z){
	this.mesh = new THREE.Object3D();
	body = this.mesh;


	var part1 = new addSpacecraftPartBody(body, 3.5, 2, 5, 0, 0, 0.5);
	var part2 = new addSpacecraftPartBody(body, 8, 2, 2, 0, 0, -3);
	var part3 = new addSpacecraftPartBody(body, 12, 2, 2, 0, 0, -5);
	
	body.position.set(x,y,z);

}

function createSpacecraft(x,y,z){
	'use scrict';
	spacecraft = new THREE.Object3D();

	this.Body = new addSpacecraftBody(0,0,0);

	this.Tail = new addSpacecraftTail(spacecraft, 0, 0, -7);

	this.PriWeapon = new addSpacecraftPriWeapon(spacecraft, 0, 0, 4.75);
	this.SecWeapon1 = new addSpacecraftSecWeapon(spacecraft, 3.5, -3, 0, -0.25);
	this.SecWeapon2 = new addSpacecraftSecWeapon(spacecraft, 3.5, 3, 0, -0.25);
	this.SecWeapon3 = new addSpacecraftSecWeapon(spacecraft, 3, -5, 0, -2.5);
	this.SecWeapon4 = new addSpacecraftSecWeapon(spacecraft, 3, 5, 0, -2.5);

	spacecraft.add(this.Body.mesh);
	scene.add(spacecraft);
	spacecraft.position.x = x;
	spacecraft.position.y = y;
	spacecraft.position.z = z;
}

//-------------- ALIEN -----------------

function addAlienLeg(obj, x, y, z){
	'use scrict';
	geometry = new THREE.CubeGeometry(1.5, 1, 0.5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addAlienArm(obj, x, y, z){
	'use scrict';
	geometry = new THREE.CylinderGeometry(1, 1, 0.5, 30);
	geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(90)));
	mesh = new THREE.Mesh(geometry, materialBody);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addAlienEar(obj, x, y, z){
	'use scrict';
	geometry = new THREE.CylinderGeometry(0, 1, 1.5, 30);
	geometry.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));
	mesh = new THREE.Mesh(geometry, materialBody);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addAlienEye(obj, x, y, z){
	'use scrict';
	geometry = new THREE.CylinderGeometry(1, 1, 0.1, 30);
	mesh = new THREE.Mesh(geometry, materialBody);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addAlienMouth(x,y,z){
	this.mesh = new THREE.Object3D();
	mouth = this.mesh;

	geometry = new THREE.CubeGeometry(3, 0.1, 1.5);	
	mesh = new THREE.Mesh(geometry, materialBody);
	mouth.add(mesh);

	var AlienTeeth1 = new addAlienTeeth(mouth, -1, -2.1, 0.25);
	var AlienTeeth2 = new addAlienTeeth(mouth, 0, -2.1, -0.25);
	var AlienTeeth3 = new addAlienTeeth(mouth, 1, -2.1, 0.25);
	mouth.position.set(x,y,z);
}

function addAlienTeeth(obj, x, y, z){
	'use scrict';
	geometry = new THREE.CubeGeometry(0.6, 0.1, 1);
	mesh = new THREE.Mesh(geometry, materialTeeth);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addAlienBody(obj, x, y, z){
	'use scrict';
	geometry = new THREE.CubeGeometry(8, 4, 5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
;}

function Alien(x, y, z, materialaux){
	alien = new THREE.Object3D();

	material = materialaux;
	this.AlienBody = new addAlienBody(alien, 0, 0, 3);
	this.AlienEye1 = new addAlienEye(alien, 1, -2, 4);
	this.AlienEye2 = new addAlienEye(alien, -1, -2, 4);
	this.Mouth = new addAlienMouth(0, -2, 1.75);
	this.AlienEar1 = new addAlienEar(alien, -2, 0, 6.25);
	this.AlienEar2 = new addAlienEar(alien, 2, 0, 6.25);
	this.AlienArm1 = new addAlienArm(alien, -4.25, 0, 3);
	this.AlienArm2 = new addAlienArm(alien, 4.25, 0, 3);
	this.AlienLeg1 = new addAlienLeg(alien, -2.25, 0, 0.25);
	this.AlienLeg2 = new addAlienLeg(alien, 2.25, 0, 0.25);

	alien.add(this.Mouth.mesh);
	scene.add(alien);
	alien.position.x = x;
	alien.position.y = y;
	alien.position.z = z;
}


//-------------- SCENE -----------------

function createScene(){
	'use strict';

	scene = new THREE.Scene();

	alien11 = new Alien(-6, 0, 24.5, materialAlien1);
	alien12 = new Alien(-18, 0, 24.5, materialAlien1);
	alien13 = new Alien(6, 0, 24.5, materialAlien1);
	alien14 = new Alien(18, 0, 24.5, materialAlien1);

	alien21 = new Alien(-6, 0, 16.5, materialAlien2);
	alien22 = new Alien(-18, 0, 16.5, materialAlien2);
	alien23 = new Alien(6, 0, 16.5, materialAlien2);
	alien24 = new Alien(18, 0, 16.5, materialAlien2);

	alien31 = new Alien(-6, 0, 8.5, materialAlien3);
	alien32 = new Alien(-18, 0, 8.5, materialAlien3);
	alien33 = new Alien(6, 0, 8.5, materialAlien3);
	alien34 = new Alien(18, 0, 8.5, materialAlien3);

	Spacecraft = new createSpacecraft(0, 0, -25.5);
}

function createCamera(){
	'use strict';
	var aspectRatio = window.innerWidth /  window.innerHeight;

	if ( aspectRatio > 1){
		camera = new THREE.OrthographicCamera(ViewSize * -aspectRatio, aspectRatio * ViewSize, ViewSize, -ViewSize, 1, 1000);		
	}

	else
		camera = new THREE.OrthographicCamera(-ViewSize, ViewSize, ViewSize / aspectRatio, ViewSize / -aspectRatio,  1, 1000);
	
		camera.position.x = 0;
		camera.position.y = -10;
		camera.position.z = 0;
		camera.lookAt(scene.position);

}

function render(){
	'use strict';
	renderer.render(scene, camera);
}


function onResize(){
	'use strict';

	var aspectRatio = window.innerWidth /  window.innerHeight;
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	if ( window.innerHeight > 0 && window.innerWidth > 0 && aspectRatio > 1){
		camera.left = ViewSize * -aspectRatio ;
		camera.right = aspectRatio * ViewSize;
		camera.top = ViewSize;
		camera.bottom = -ViewSize;
		
		camera.updateProjectionMatrix();
		
	}

	else if ( window.innerHeight > 0 && window.innerWidth > 0 && aspectRatio < 1){
		
		camera.left = -ViewSize;
		camera.right = ViewSize;
		camera.top = ViewSize / aspectRatio;
		camera.bottom = ViewSize / -aspectRatio;
		camera.updateProjectionMatrix();
	}
	
}
function calculatePositionBySpeed(){
	var time = clock.getDelta();
	if (keys[37] == true && speed <= 0){
		if(speedMax > -speed){
			var newposition = spacecraft.position.x + speed * time - (1/2 * acceleration * time * time);
			speed = speed  - acceleration * time;

		}else{
			var newposition = spacecraft.position.x + speed * time ;
		}
		if(newposition > -limitSpaceGame){
			spacecraft.position.x = newposition;
		}else{
			spacecraft.position.x = -limitSpaceGame;
			speed=0;
		}
	}


	if (keys[39] == true && speed >= 0){
		if(speedMax > speed){
			var newposition = spacecraft.position.x + speed * time + (1/2 * acceleration * time * time);
			speed = speed  + acceleration * time;
		}else{
			var newposition = spacecraft.position.x + speed * time;
		}
		if(newposition < limitSpaceGame){
			spacecraft.position.x = newposition;
		}else{
			spacecraft.position.x = limitSpaceGame;
			speed=0;
		}
	}

	if (keys[37] == false && speed < 0){
		var newposition = spacecraft.position.x + speed * time + (1/2 * disacceleration * time * time);
		if(newposition > -limitSpaceGame){
			spacecraft.position.x = newposition;
			speed = speed  + disacceleration * time;
		}else{
			spacecraft.position.x = -limitSpaceGame;
			speed=0;
		}
		if (speed > 0) speed = 0;
	}

	if (keys[39] == false && speed > 0){
		var newposition = spacecraft.position.x + speed * time - (1/2 * disacceleration * time * time);
		if(newposition < limitSpaceGame){
			spacecraft.position.x = newposition;
			speed = speed  - disacceleration * time;
		}else{
			spacecraft.position.x = limitSpaceGame;
			speed=0;
		}
		
		if (speed < 0) speed = 0;
	}
}

function animate(){

	'use scrict';
	calculatePositionBySpeed();
	render();
	requestAnimationFrame(animate);
}

function onKeyUp(e){
	'use strict';
	keys[e.keyCode] = 0;
}

function onKeyDown(e){
	'use strict';
	keys[e.keyCode] = 1;
	switch(e.keyCode){
		case 65: //A
		case 97: //a
			materialBody.wireframe = !materialBody.wireframe;
			materialWeapons.wireframe = !materialWeapons.wireframe;
			materialTeeth.wireframe = !materialTeeth.wireframe;
			materialSpacecraft.wireframe = !materialSpacecraft.wireframe;
			materialAlien1.wireframe = !materialAlien1.wireframe;
			materialAlien2.wireframe = !materialAlien2.wireframe;
			materialAlien3.wireframe = !materialAlien3.wireframe;
	}
}

function init(){
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias: true});


	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();

	createCamera();

	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}