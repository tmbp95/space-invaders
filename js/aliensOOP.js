/*global THREE*/

var camera, ortographicCameraLives, scene, sceneLives, renderer;
var geometry, material, mesh;
var clock = new THREE.Clock();
var cameraChoice = 1;
var alien = [];
var star = [];  
var spacecraft;
var bullet = [];
var keys = [];

var bulletFlag = false;
var nFlag = false;
var lFlag = false;
var cFlag = false;
var gFlag = false;
var hFlag = false;
var sFlag = false;
var rFlag = false;
var lightActiveFlag = false;
var pointlightFlag = false;
var spotlightFlag = false;
var pauseFlag = false;
var gameLostFlag = false;
var gameWonFlag = false;

var alienskilled = 0;
var typeLight = 0;
var lives = 3;
var livesList = [lives];
var wireframechange = false;

var alienColor1 = 0x00ffa8;
var alienColor2 = 0xffba00;
var alienColor3 = 0xcccccc;

var spacecraftAcceleration = 15.0;

var limitSpaceGame = 45;
var ViewSize = 35;

var materialStar = new THREE.MeshBasicMaterial({color: 0xffff65});

var materialSpacecraft = new THREE.MeshBasicMaterial({color:0x323232, wireframe: false});
var materialWeapons = new THREE.MeshBasicMaterial({color:0xff0000, wireframe: false});
var materialTeeth = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false});
var materialBody = new THREE.MeshBasicMaterial({color: 0x323232, wireframe: false});
var materialAlien1 = new THREE.MeshBasicMaterial({color: alienColor1, wireframe: false});
var materialAlien2 = new THREE.MeshBasicMaterial({color: alienColor2, wireframe: false});
var materialAlien3 = new THREE.MeshBasicMaterial({color: alienColor3, wireframe: false});
var materialBulletBack = new THREE.MeshBasicMaterial({color: 0xdfc11f, wireframe: false});
var materialBulletFront = new THREE.MeshBasicMaterial({color: 0xb9a017, wireframe: false});

var lmaterialSpacecraft = new THREE.MeshLambertMaterial({color: 0x323232, emissive: 0x000011, wireframe: false, side: THREE.DoubleSide});
var lmaterialWeapons = new THREE.MeshLambertMaterial({color: 0xff0000, emissive: 0x000011, wireframe: false, side: THREE.DoubleSide})

var lmaterialTeeth = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false, emissive: 0x000011});
var lmaterialBody = new THREE.MeshLambertMaterial({color: 0x323232, wireframe: false, emissive: 0x000011});
var lmaterialAlien1 = new THREE.MeshLambertMaterial({color: alienColor1, wireframe: false, emissive: 0x000011});
var lmaterialAlien2 = new THREE.MeshLambertMaterial({color: alienColor2, wireframe: false, emissive: 0x000011});
var lmaterialAlien3 = new THREE.MeshLambertMaterial({color: alienColor3, wireframe: false, emissive: 0x000011});
var lmaterialBulletBack = new THREE.MeshLambertMaterial({color: 0xdfc11f, wireframe: false, emissive: 0x000011});
var lmaterialBulletFront = new THREE.MeshLambertMaterial({color: 0xb9a017, wireframe: false, emissive: 0x000011});

var pmaterialSpacecraft =new THREE.MeshPhongMaterial({color: 0x323232, emissive: 0x000011, specular: 0x111000, shininess: 35, wireframe: false, side: THREE.DoubleSide});
var pmaterialWeapons = new THREE.MeshPhongMaterial({color: 0xff0000, emissive: 0x000011, specular: 0x0f0f0f, shininess: 70, wireframe: false, side: THREE.DoubleSide});
var pmaterialTeeth = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false, emissive: 0x000011, specular: 0x111000, shininess: 35});
var pmaterialBody = new THREE.MeshPhongMaterial({color: 0x323232, wireframe: false, emissive: 0x000011, specular: 0x111000, shininess: 35});
var pmaterialAlien1 = new THREE.MeshPhongMaterial({color: alienColor1, wireframe: false, emissive: 0x000011, specular: 0x111000, shininess: 35});
var pmaterialAlien2 = new THREE.MeshPhongMaterial({color: alienColor2, wireframe: false, emissive: 0x000011, specular: 0x111000, shininess: 35});
var pmaterialAlien3 = new THREE.MeshPhongMaterial({color: alienColor3, wireframe: false, emissive: 0x000011, specular: 0x111000, shininess: 35});
var pmaterialBulletBack = new THREE.MeshPhongMaterial({color: 0xdfc11f, wireframe: false, emissive: 0x000011, specular: 0x111000, shininess: 35});
var pmaterialBulletFront = new THREE.MeshPhongMaterial({color: 0xb9a017, wireframe: false, emissive: 0x000011, specular: 0x111000, shininess: 35});


var directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
directionalLight.position.set( 0, -1, 0 );

var spotLight = new THREE.SpotLight( 0xffffff, 1.5, ViewSize, Math.PI / 4);
spotLight.position.set( 0, 1, -22 );



var pointLight = [];

pointLight[0] = new THREE.PointLight( 0xffffff, 1, 55);
pointLight[0].position.set( -34, -8 , 25.5);
star[0]= new THREE.Object3D();
addStarbody(star[0], pointLight[0]);

pointLight[1] = new THREE.PointLight( 0xffffff, 1, 55);
pointLight[1].position.set( 34, -8, 25.5);
star[1]= new THREE.Object3D();
addStarbody(star[1], pointLight[1]);

pointLight[2] = new THREE.PointLight( 0xffffff, 1, 55);
pointLight[2].position.set( -34, -8, -25.5);
star[2]= new THREE.Object3D();
addStarbody(star[2], pointLight[2]);

pointLight[3] = new THREE.PointLight( 0xffffff, 1, 55);
pointLight[3].position.set( 34, -8, -25.5);
star[3]= new THREE.Object3D();
addStarbody(star[3], pointLight[3]);

pointLight[4] = new THREE.PointLight( 0xffffff, 1, 55);
pointLight[4].position.set( -34, -8, 0);
star[4]= new THREE.Object3D();
addStarbody(star[4], pointLight[4]);

pointLight[5] = new THREE.PointLight( 0xffffff, 1, 55);
pointLight[5].position.set( 34, -8, 0);
star[5]= new THREE.Object3D();
addStarbody(star[5], pointLight[5]);


var texturePause = new THREE.TextureLoader().load( "pause2.png" );
var materialPause = new THREE.MeshBasicMaterial({ map: texturePause, transparent: true});
var screenPause = new THREE.Mesh(new THREE.PlaneGeometry(50, 30), materialPause);
screenPause.visible = false;

var textureGameOver = new THREE.TextureLoader().load( "over.png" );
var materialGameOver = new THREE.MeshBasicMaterial({ map: textureGameOver, transparent: true});
var screenGameOver = new THREE.Mesh(new THREE.PlaneGeometry(50, 30), materialGameOver);
screenGameOver.visible = false;

var textureWon = new THREE.TextureLoader().load( "win.png" );
var materialWon = new THREE.MeshBasicMaterial({ map: textureWon, transparent: true});
var screenWon = new THREE.Mesh(new THREE.PlaneGeometry(50, 30), materialWon);
screenWon.visible = false;

function showScreen(screenToShow) {
	'use scrict';
	if(cameraChoice == 1){
		screenToShow.rotateX(90 * Math.PI / 180);
		screenToShow.position.set(0,-6,0);
		screenToShow.visible = true;
	}
	if(cameraChoice == 2){
		screenToShow.rotateX(147 * Math.PI / 180);
		screenToShow.position.set(0,-15,15);
		screenToShow.visible = true;
	}
	if(cameraChoice == 3){
		screenToShow.rotateX(162 * Math.PI / 180);
		screenToShow.position.set(spacecraft.position.x,-6,40);
		screenToShow.visible = true;
	}
}

function removeScreen(screenToShow) {
	'use scrict';
	if(cameraChoice == 1){
		screenToShow.rotateX(-90 * Math.PI / 180);
		screenToShow.visible = false;
		}
	if(cameraChoice == 2){
		screenToShow.rotateX(-147 * Math.PI / 180);
		screenToShow.visible = false;
	}
	if(cameraChoice == 3){
		screenToShow.rotateX(-162 * Math.PI / 180);
		screenToShow.visible = false;
	}
}


function addBackGround() {
	'use strict';
	var textureBG = new THREE.TextureLoader().load("plane.jpg");
	var materialBG = new THREE.MeshBasicMaterial( { map: textureBG, side: THREE.DoubleSide} );
	var planeBG = new THREE.Mesh(new THREE.PlaneGeometry(90, 70), materialBG);
	planeBG.rotateX(Math.PI/2);
	planeBG.position.set(0, 10, 0);
	scene.add(planeBG);
}

function addStarbody(obj, point){
	'use strict';
	geometry = new THREE.SphereGeometry(0.5, 16, 8);
	mesh = new THREE.Mesh(geometry, materialStar);
	mesh.position.set(point.position.x, -8 , point.position.z);
	obj.add(mesh);
}



var inherits = function(superClass, actualClass){
	'use scrict';
	var superClassCopy = Object.create(superClass.prototype);
	actualClass.prototype = superClassCopy;
	actualClass.prototype.constructor = actualClass;
}

var character  = function(position){
	'use scrict';
	THREE.Object3D.call(this);
	this.active = true;
	this.position.set(position.x, position.y, position.z);
	this.speed = new THREE.Vector3(0.0, 0.0, 0.0);
	this.acceleration = new THREE.Vector3(0.0, 0.0, 0.0);
	this.speedMax = new THREE.Vector3(50.0, 50.0, 50.0);
}
inherits(THREE.Object3D, character);

character.prototype.hasCollision = function(){
	'use strict'
	this.radiusA = this.BoundingSphere.radius;
	var distanceGlobal;
	var i = 0;
	for(i=0; i < alien.length; i++){
		if(alien[i] != this && alien[i].active == true){
			var distanceX = alien[i].position.x - this.position.x;
			var distanceZ = alien[i].position.z - this.position.z;

			distanceGlobal = Math.sqrt((distanceX)*(distanceX) + (distanceZ)*(distanceZ))

			if(this.radiusA + alien[i].BoundingSphere.radius >= distanceGlobal){
				this.ProcessCollision(alien[i]);
				return;
			}

		}
	}
}

character.prototype.update = function(delta){
	'use scrict';
	var speed = new THREE.Vector3(0, 0, 0);
	if(this.acceleration.x != 0.0){
		speed = speed.set(this.speed.x + this.acceleration.x * delta, this.speed.y, this.speed.z);
		if((Math.sign(this.speed.x) == Math.sign(speed.x) || this.speed.x == 0.0) && Math.sign(speed.x) != 0.0){
			var speedX = speed.x;
			if (Math.abs(speedX) < this.speedMax.x){
				this.speed.x = speed.x;
				var newPositionX = this.position.x + (speed.x * delta);
				this.setPositionX(newPositionX);
			}
		}else{

			this.acceleration.x = 0.0;
			this.speed.x = 0.0;
		}
	}else{
		var newPositionX = this.position.x + (this.speed.x * delta);
		this.setPositionX(newPositionX);
	}

	if(this.acceleration.z != 0.0){
		speed = speed.set(this.speed.x, this.speed.y, this.speed.z + this.acceleration.z * delta);
		if(Math.sign(this.speed.z) == Math.sign(speed.z) || this.speed.z == 0.0){
			var speedZ = speed.z;
			if (Math.abs(speedZ) < this.speedMax.z){
				this.speed.z = speed.z;
				var newPositionZ = this.position.z + (speed.z * delta);
				this.setPositionZ(newPositionZ);
			}
		}else{
			this.acceleration.z = 0.0;
			this.speed.z = 0.0;
		}
			
	}else{
		var newPositionZ = this.position.z + (this.speed.z * delta);
		this.setPositionZ(newPositionZ);
	}

	this.hasCollision();
}


//-------------- Spacecraft -----------------

function createBody(obj, material, x, y, z, rotate){
	'use strict';

	this.geom = new THREE.Geometry();

	/* 0 */this.geom.vertices.push(new THREE.Vector3(0,1,0));
	/* 1 */this.geom.vertices.push(new THREE.Vector3(3,1,0));
	/* 2 */this.geom.vertices.push(new THREE.Vector3(0,1,3));
	/* 3 */this.geom.vertices.push(new THREE.Vector3(3,1,3));
	/* 4 */this.geom.vertices.push(new THREE.Vector3(1,1,8.5));
	/* 5 */this.geom.vertices.push(new THREE.Vector3(2,1,8.5));
	/* 6 */this.geom.vertices.push(new THREE.Vector3(1,1,-2));
	/* 7 */this.geom.vertices.push(new THREE.Vector3(2,1,-2));

	/* 8 */this.geom.vertices.push(new THREE.Vector3(0,-0.5,0));
	/* 9 */this.geom.vertices.push(new THREE.Vector3(3,-0.5,0));
	/* 10 */this.geom.vertices.push(new THREE.Vector3(0,-0.5,3));
	/* 11 */this.geom.vertices.push(new THREE.Vector3(3,-0.5,3));
	/* 12 */this.geom.vertices.push(new THREE.Vector3(1.5,-0.5,0));
	/* 13 */this.geom.vertices.push(new THREE.Vector3(1,-0.5,3));
	/* 14 */this.geom.vertices.push(new THREE.Vector3(2,-0.5,3));

	this.geom.faces.push( new THREE.Face3(2,1,3));
	this.geom.faces.push( new THREE.Face3(2,0,1));
	this.geom.faces.push( new THREE.Face3(4,3,2));
	this.geom.faces.push( new THREE.Face3(4,5,3));
	this.geom.faces.push( new THREE.Face3(0,7,1));
	this.geom.faces.push( new THREE.Face3(0,7,6));

	this.geom.faces.push( new THREE.Face3(2,13,12));
	this.geom.faces.push( new THREE.Face3(2,12,0));
	this.geom.faces.push( new THREE.Face3(13,14,12));
	this.geom.faces.push( new THREE.Face3(14,3,1));
	this.geom.faces.push( new THREE.Face3(14,1,12));

	this.geom.faces.push( new THREE.Face3(2,4,13));
	this.geom.faces.push( new THREE.Face3(5,3,14));
	this.geom.faces.push( new THREE.Face3(4,5,14));
	this.geom.faces.push( new THREE.Face3(4,14,13));

	this.geom.faces.push( new THREE.Face3(0,12,6));
	this.geom.faces.push( new THREE.Face3(6,12,7));
	this.geom.faces.push( new THREE.Face3(7,12,1));

	this.geom.computeFaceNormals();
	this.geom.computeVertexNormals();


	this.mesh = new THREE.Mesh(this.geom, material);
	this.mesh.position.set(x, y, z);
	this.mesh.scale.set(1.1,1,1);
	this.mesh.rotateY(rotate);
	this.mesh.rotateX(rotate);

	obj.add(this.mesh);
}




function createWeapon(obj, material, x, y, z, rotate){
	'use strict';

	this.geom = new THREE.Geometry(); 

	this.geom.vertices.push(new THREE.Vector3(0,0,0));
	this.geom.vertices.push(new THREE.Vector3(0,0,-1));
	this.geom.vertices.push(new THREE.Vector3(1,0,-1));
	this.geom.vertices.push(new THREE.Vector3(1,0,0));
	this.geom.vertices.push(new THREE.Vector3(0,5,0));
	this.geom.vertices.push(new THREE.Vector3(0,5,-1));
	this.geom.vertices.push(new THREE.Vector3(1,5,-1));
	this.geom.vertices.push(new THREE.Vector3(1,5,0));
	this.geom.vertices.push(new THREE.Vector3(0,6,0));
	this.geom.vertices.push(new THREE.Vector3(0,6,-0.5));
	this.geom.vertices.push(new THREE.Vector3(1,6,-0.5));
	this.geom.vertices.push(new THREE.Vector3(1,6,0));

	//TRASEIRA DA ARMA
	this.geom.faces.push( new THREE.Face3(0,2,3));
	this.geom.faces.push( new THREE.Face3(0,1,2));
	this.geom.faces.push( new THREE.Face3(4,0,3));
	this.geom.faces.push( new THREE.Face3(4,3,7));
	this.geom.faces.push( new THREE.Face3(7,3,2));
	this.geom.faces.push( new THREE.Face3(7,2,6));
	this.geom.faces.push( new THREE.Face3(6,2,1));
	this.geom.faces.push( new THREE.Face3(6,1,5));
	this.geom.faces.push( new THREE.Face3(5,0,4));
	this.geom.faces.push( new THREE.Face3(5,1,0));

	//FRENTE DA ARMA
	this.geom.faces.push( new THREE.Face3(7,11,8));
	this.geom.faces.push( new THREE.Face3(7,8,4));
	this.geom.faces.push( new THREE.Face3(6,10,11));
	this.geom.faces.push( new THREE.Face3(6,11,7));
	this.geom.faces.push( new THREE.Face3(5,9,10));
	this.geom.faces.push( new THREE.Face3(5,10,6));
	this.geom.faces.push( new THREE.Face3(4,8,9));
	this.geom.faces.push( new THREE.Face3(4,9,5));
	this.geom.faces.push( new THREE.Face3(8,11,10));
	this.geom.faces.push( new THREE.Face3(8,10,9));



	this.geom.computeFaceNormals();
	this.geom.computeVertexNormals();

	this.mesh = new THREE.Mesh(this.geom, material);
	this.mesh.position.set(x, y, z);
	this.mesh.rotateX(Math.PI/2);
	this.mesh.rotateY(rotate);


	obj.add(this.mesh);
}

function createWing(obj, material, x, y, z, rotate){
	'use strict';

	this.geom = new THREE.Geometry(); 

	/* 0 */this.geom.vertices.push(new THREE.Vector3(0,0,0));
	/* 1 */this.geom.vertices.push(new THREE.Vector3(0,0,-0.2));
	/* 2 */this.geom.vertices.push(new THREE.Vector3(2,0,-0.2));
	/* 3 */this.geom.vertices.push(new THREE.Vector3(2,0,0));
	/* 4 */this.geom.vertices.push(new THREE.Vector3(0,3,0));
	/* 5 */this.geom.vertices.push(new THREE.Vector3(0,3,-0.2));
	/* 6 */this.geom.vertices.push(new THREE.Vector3(2,3,-0.2));
	/* 7 */this.geom.vertices.push(new THREE.Vector3(2,3,0));

	/* 8 */this.geom.vertices.push(new THREE.Vector3(3,0,0.2));
	/* 9 */this.geom.vertices.push(new THREE.Vector3(3,0,-0.2));
	/* 10 */this.geom.vertices.push(new THREE.Vector3(3,3,-0.2));
	/* 11 */this.geom.vertices.push(new THREE.Vector3(3,3,0.2));

	//PARTE1 DA ASA
	this.geom.faces.push( new THREE.Face3(0,2,3));
	this.geom.faces.push( new THREE.Face3(0,1,2));
	this.geom.faces.push( new THREE.Face3(4,0,3));
	this.geom.faces.push( new THREE.Face3(4,3,7));
	this.geom.faces.push( new THREE.Face3(6,2,1));
	this.geom.faces.push( new THREE.Face3(6,1,5));
	this.geom.faces.push( new THREE.Face3(5,0,4));
	this.geom.faces.push( new THREE.Face3(5,0,1));
	this.geom.faces.push( new THREE.Face3(4,7,6));
	this.geom.faces.push( new THREE.Face3(4,6,5));

	//PARTE2 da ASA
	this.geom.faces.push( new THREE.Face3(3,9,8));
	this.geom.faces.push( new THREE.Face3(3,2,9));
	this.geom.faces.push( new THREE.Face3(7,3,8));
	this.geom.faces.push( new THREE.Face3(7,8,11));
	this.geom.faces.push( new THREE.Face3(10,9,2));
	this.geom.faces.push( new THREE.Face3(10,2,6));
	this.geom.faces.push( new THREE.Face3(6,3,7));
	this.geom.faces.push( new THREE.Face3(6,3,2));
	this.geom.faces.push( new THREE.Face3(7,11,10));
	this.geom.faces.push( new THREE.Face3(7,10,6));

	this.geom.computeFaceNormals();
	this.geom.computeVertexNormals();


	this.mesh = new THREE.Mesh(this.geom, material);
	this.mesh.position.set(x, y, z);
	this.mesh.rotateY(rotate);
	this.mesh.rotateX(Math.PI/2);

	obj.add(this.mesh);
}



function createSpacecraft(position){
	'use scrict';
	character.call(this, position);

	this.initialPosition = position;


	this.shape1 = new createBody(this, materialSpacecraft, -1.7, -0.5, -5, 0); 
	this.shape2 = new createBody(this, materialSpacecraft, 1.6, 1.5, -5, Math.PI);
	this.shape3 = new createWing(this, materialSpacecraft, -4.5, 0.5, -5, 0); 
	this.shape4 = new createWing(this, materialSpacecraft, 4.4, 0.5, -2, Math.PI);
	this.shape5 = new createWeapon(this, materialWeapons, -5.4, 0, -6, 0); 
	this.shape6 = new createWeapon(this, materialWeapons, 5.3, 1, -6, Math.PI);	
	this.BoundingSphere = new THREE.SphereGeometry(5.13, 20, 20).boundingSphere;
	scene.add(this);


}
inherits(character, createSpacecraft)

createSpacecraft.prototype.setPositionX = function(newPosition){
	'use scrict';
	if(this.acceleration.x != 0.0){
		if(Math.abs(newPosition) < limitSpaceGame-6){
			this.position.x = newPosition;
		}else if (newPosition > limitSpaceGame-6){
			this.position.x = limitSpaceGame-6;
			this.speed.x = 0.0;
			this.acceleration.x = 0.0;
		}else{
			this.position.x = -limitSpaceGame+6;
			this.speed.x = 0.0;
			this.acceleration.x = 0.0;
		}
	}
}

createSpacecraft.prototype.setPositionZ = function(newPosition){
	'use scrict';
}

createSpacecraft.prototype.ProcessCollision = function(alien){
	'use strict'
	lives--;
	alien.removeAlien();
	sceneLives.remove(livesList[lives]);
}

createSpacecraft.prototype.reset = function(){
	'use strict'
	this.position.set(this.initialPosition.x, this.initialPosition.y, this.initialPosition.z);
	this.speed = new THREE.Vector3(0.0, 0.0, 0.0);
	this.acceleration  = new THREE.Vector3(0.0, 0.0, 0.0);
}

createSpacecraft.prototype.changeMaterial = function(materialSpace, materialW){
	'use scrict';
	this.shape1.mesh.material = materialSpace;
	this.shape2.mesh.material = materialSpace;
	this.shape3.mesh.material = materialSpace;
	this.shape4.mesh.material = materialSpace;
	this.shape5.mesh.material = materialW;
	this.shape6.mesh.material = materialW;


	this.shape1.mesh.material.needsUpdate = true;
	this.shape2.mesh.material.needsUpdate = true;
	this.shape3.mesh.material.needsUpdate = true;
	this.shape4.mesh.material.needsUpdate = true;
	this.shape5.mesh.material.needsUpdate = true;
	this.shape6.mesh.material.needsUpdate = true;

	this.shape1.geom.normalsNeedUpdate = true;
	this.shape2.geom.normalsNeedUpdate = true;
	this.shape3.geom.normalsNeedUpdate = true;
	this.shape4.geom.normalsNeedUpdate = true;
	this.shape5.geom.normalsNeedUpdate = true;
	this.shape6.geom.normalsNeedUpdate = true;

}



//-------------- ALIEN -------------------------------

function addAlienLeg(obj, material, x, y, z){
	'use scrict';
	this.geometry = new THREE.CubeGeometry(1.5, 1, 0.5);
	this.mesh = new THREE.Mesh(this.geometry, material);
	this.mesh.position.set(x, y, z);
	obj.add(this.mesh);
}

function addAlienArm(obj, material, x, y, z){
	'use scrict';
	this.geometry = new THREE.CylinderGeometry(1, 1, 0.5, 30);
	this.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(90)));
	this.mesh = new THREE.Mesh(this.geometry, material);
	this.mesh.position.set(x, y, z);
	obj.add(this.mesh);
}

function addAlienEar(obj, material, x, y, z){
	'use scrict';
	this.geometry = new THREE.CylinderGeometry(0, 1, 1.5, 30);
	this.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));
	this.mesh = new THREE.Mesh(this.geometry, material);
	this.mesh.position.set(x, y, z);
	obj.add(this.mesh);
}

function addAlienEye(obj, material, x, y, z){
	'use scrict';
	this.geometry = new THREE.CylinderGeometry(1, 1, 0.1, 30);
	this.mesh = new THREE.Mesh(this.geometry, material);
	this.mesh.position.set(x, y, z);
	obj.add(this.mesh);
}

function addAlienMouth(material, materialT, x, y, z){
	'use scrict';
	this.mesh = new THREE.Object3D();
	mouth = this.mesh;

	this.geometry = new THREE.CubeGeometry(3, 0.1, 1.5);	
	this.mesh1 = new THREE.Mesh(this.geometry, material);
	mouth.add(this.mesh1);

	this.AlienTeeth1 = new addAlienTeeth(mouth, materialT, -1, -0.1, 0.25);
	this.AlienTeeth2 = new addAlienTeeth(mouth, materialT, 0, -0.1, -0.25);
	this.AlienTeeth3 = new addAlienTeeth(mouth, materialT, 1, -0.1, 0.25);
	mouth.position.set(x, y, z);
}

function addAlienTeeth(obj, material, x, y, z){
	'use scrict';
	this.geometry = new THREE.CubeGeometry(0.6, 0.1, 1);
	this.mesh = new THREE.Mesh(this.geometry, material);
	this.mesh.position.set(x, y, z);
	obj.add(this.mesh);
}

function addAlienBody(obj, material, x, y, z){
	'use scrict';
	this.geometry = new THREE.CubeGeometry(8, 4, 5);
	this.mesh = new THREE.Mesh(this.geometry, material);
	this.mesh.position.set(x, y, z);
	obj.add(this.mesh);
}

var createAlien = function(material, position){
	'use scrict';
	character.call(this, position);
	this.speed = new THREE.Vector3(15.0, 0.0, 15.0);
	this.initialPosition = position;
	this.randomMove();

	this.AlienBody = new addAlienBody(this, material, 0, 0, 0);
	this.AlienEye1 = new addAlienEye(this, materialBody, 1, -2, 1);
	this.AlienEye2 = new addAlienEye(this, materialBody, -1, -2, 1);
	this.Mouth = new addAlienMouth(materialBody, materialTeeth, 0, -2, -1.25);
	this.AlienEar1 = new addAlienEar(this, materialBody, -2, 0, 3.25);
	this.AlienEar2 = new addAlienEar(this, materialBody, 2, 0, 3.25);
	this.AlienArm1 = new addAlienArm(this, materialBody, -4.25, 0, 0);
	this.AlienArm2 = new addAlienArm(this, materialBody, 4.25, 0, 0);
	this.AlienLeg1 = new addAlienLeg(this, materialBody, -2.25, 0, -2.75);
	this.AlienLeg2 = new addAlienLeg(this, materialBody, 2.25, 0, -2.75);
	this.BoundingSphere = new THREE.SphereGeometry(4.7, 20, 20).boundingSphere;
	this.add(this.Mouth.mesh);
 	scene.add(this);

}
inherits(character, createAlien);

createAlien.prototype.setPositionX = function(newPosition){
	'use scrict';
	if(Math.abs(newPosition) < limitSpaceGame-5){
		this.position.x = newPosition;
	}else if (newPosition > limitSpaceGame-5){
		this.position.x = limitSpaceGame-5;
		this.speed.x = -this.speed.x;
	}else{
		this.position.x = -limitSpaceGame+5;
		this.speed.x = -this.speed.x;
	}
}

createAlien.prototype.setPositionZ = function(newPosition){
	'use scrict';
	if(Math.abs(newPosition) < ViewSize-5){
		this.position.z = newPosition;
	}else if (newPosition > ViewSize-5){
		this.position.z = ViewSize-5;
		this.speed.z = -this.speed.z;
	}else{
		this.position.z = -ViewSize+5;
		this.speed.z = -this.speed.z;
	}
}

createAlien.prototype.randomMove = function(){
	'use scrict';
	var valueX = (Math.round(Math.random()*2) - 1);
	var valueZ = (Math.round(Math.random()*2) - 1);
	if(valueZ == 0 && valueX == 0){
		return this.randomMove();
	}else{
		this.speed.x = this.speed.x * valueX;
		this.speed.z = this.speed.z * valueZ;
	}	
}

createAlien.prototype.removeAlien = function(){
	'use strict'
	scene.remove(this);
	this.active = false;
	alienskilled++;
}

createAlien.prototype.ProcessCollision = function(){
	'use strict'
	this.speed.x = -this.speed.x;
	this.speed.z = -this.speed.z;
}

createAlien.prototype.reset = function(){
	'use strict'
	this.position.set(this.initialPosition.x, this.initialPosition.y, this.initialPosition.z);
	this.speed = new THREE.Vector3(15.0, 0.0, 15.0);
	this.randomMove();
	this.active = true;
}

createAlien.prototype.changeMaterial = function(materialAlien, material, materialT){
	'use scrict';
	this.AlienBody.mesh.material = materialAlien;
	this.AlienEye1.mesh.material = material;
	this.AlienEye2.mesh.material = material;
	this.Mouth.mesh1.material = material;
	this.Mouth.AlienTeeth1.mesh.material = materialT;
	this.Mouth.AlienTeeth2.mesh.material = materialT;
	this.Mouth.AlienTeeth3.mesh.material = materialT;
	this.AlienEar1.mesh.material = material;
	this.AlienEar2.mesh.material = material;
	this.AlienArm1.mesh.material = material;
	this.AlienArm2.mesh.material = material;
	this.AlienLeg1.mesh.material = material;
	this.AlienLeg2.mesh.material = material;

	this.AlienBody.mesh.material.needsUpdate = true;
	this.AlienEye1.mesh.material.needsUpdate = true;
	this.AlienEye2.mesh.material.needsUpdate = true;
	this.Mouth.mesh1.material.needsUpdate = true;
	this.Mouth.AlienTeeth1.mesh.material.needsUpdate = true;
	this.Mouth.AlienTeeth2.mesh.material.needsUpdate = true;
	this.Mouth.AlienTeeth3.mesh.material.needsUpdate = true;
	this.AlienEar1.mesh.material.needsUpdate = true;
	this.AlienEar2.mesh.material.needsUpdate = true;
	this.AlienArm1.mesh.material.needsUpdate = true;
	this.AlienArm2.mesh.material.needsUpdate = true;
	this.AlienLeg1.mesh.material.needsUpdate = true;
	this.AlienLeg2.mesh.material.needsUpdate = true;

	this.AlienBody.geometry.normalsNeedUpdate = true;
	this.AlienEye1.geometry.normalsNeedUpdate = true;
	this.AlienEye2.geometry.normalsNeedUpdate = true;
	this.Mouth.geometry.normalsNeedUpdate = true;
	this.Mouth.AlienTeeth1.geometry.normalsNeedUpdate = true;
	this.Mouth.AlienTeeth2.geometry.normalsNeedUpdate = true;
	this.Mouth.AlienTeeth3.geometry.normalsNeedUpdate = true;
	this.AlienEar1.geometry.normalsNeedUpdate = true;
	this.AlienEar2.geometry.normalsNeedUpdate = true;
	this.AlienArm1.geometry.normalsNeedUpdate = true;
	this.AlienArm2.geometry.normalsNeedUpdate = true;
	this.AlienLeg1.geometry.normalsNeedUpdate = true;
	this.AlienLeg2.geometry.normalsNeedUpdate = true;
}


//-------------- BULLET -----------------

function addBulletBackPart(obj,material){
	'use scrict';
	this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 30);
 	this.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 )));
 	this.mesh = new THREE.Mesh(this.geometry, material);
 	this.mesh.position.set(0, 0, 0);
 	obj.add(this.mesh);
}

function addBulletFrontPart(obj, material){
	'use scrict';
	 this.geometry = new THREE.SphereGeometry(0.5, 10, 10);
	 this.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 )));
	 this.mesh = new THREE.Mesh(this.geometry, material);
	 this.mesh.position.set(0, 0, 0.5);
	 obj.add(this.mesh);
}


var createBullet = function(){
	'use scrict';
	this.positionCreate = new THREE.Vector3(spacecraft.position.x - 0.04, 0, spacecraft.position.z + 3.6);
	character.call(this, this.positionCreate);

	this.speed.set(0.0, 0.0, 30.0);
	
	if(typeLight == 0){
		this.BulletFrontPart = new addBulletFrontPart(this, materialBulletFront);
		this.BulletBackPart = new addBulletBackPart(this, materialBulletBack);
	} else if (typeLight == 1){
		this.BulletFrontPart = new addBulletFrontPart(this, lmaterialBulletFront);
		this.BulletBackPart = new addBulletBackPart(this, lmaterialBulletBack);
	} else if (typeLight == 2){
		this.BulletFrontPart = new addBulletFrontPart(this, pmaterialBulletFront);
		this.BulletBackPart = new addBulletBackPart(this, pmaterialBulletBack);
	}  

	this.BoundingSphere = new THREE.SphereGeometry(0.75, 20, 20).boundingSphere;
 	scene.add(this);
}
inherits(character, createBullet);

createBullet.prototype.removeBullet = function(){
	'use scrict';
	scene.remove(this);
	var index = bullet.indexOf(this);
	bullet.splice(index, 1);
}

createBullet.prototype.setPositionX = function(newPosition){
	'use scrict';
}

createBullet.prototype.setPositionZ = function(newPosition){
	'use scrict';
	if(Math.abs(newPosition) < ViewSize - 2){
		this.position.z = newPosition;
	}else if (newPosition > ViewSize - 2){
		this.removeBullet();
	}
}
createBullet.prototype.ProcessCollision = function(target){
	'use strict'
	this.removeBullet();
	target.removeAlien();
}

createBullet.prototype.changeMaterial = function(materialB, materialF){
	'use scrict';
	this.BulletBackPart.mesh.material = materialB;
	this.BulletFrontPart.mesh.material = materialF;

	this.BulletBackPart.mesh.material.needsUpdate = true;
	this.BulletFrontPart.mesh.material.needsUpdate = true;

	this.BulletBackPart.geometry.normalsNeedUpdate = true;
	this.BulletFrontPart.geometry.normalsNeedUpdate = true;
	
}

//-------------- SCENE -----------------

function createScene(){
	'use strict';
	scene = new THREE.Scene();

	alien[0] = new createAlien(materialAlien1, new THREE.Vector3(-20, 0, 25.5));
	alien[1] = new createAlien(materialAlien1, new THREE.Vector3(-7, 0, 25.5));
	alien[2] = new createAlien(materialAlien1, new THREE.Vector3(7, 0, 25.5));
	alien[3] = new createAlien(materialAlien1, new THREE.Vector3(20, 0, 25.5));

	alien[4] = new createAlien(materialAlien2, new THREE.Vector3(-20, 0, 3));
	alien[5] = new createAlien(materialAlien2, new THREE.Vector3(-7, 0, 3));
	alien[6] = new createAlien(materialAlien2, new THREE.Vector3(7, 0, 3));
	alien[7] = new createAlien(materialAlien2, new THREE.Vector3(20, 0, 3));
	
	spacecraft = new createSpacecraft(new THREE.Vector3(0, 0, -25.5));

	scene.add(screenPause);
	scene.add(screenGameOver);
	scene.add(screenWon);
}


function createCamera(){
	'use strict';
	var aspectRatio = window.innerWidth /  window.innerHeight;

	switch(cameraChoice){
		case 1: 
			if ( aspectRatio > 1){
				camera = new THREE.OrthographicCamera(ViewSize * -aspectRatio, aspectRatio * ViewSize, ViewSize, -ViewSize, 1, 1000);
			}
			else{
				camera = new THREE.OrthographicCamera(-ViewSize, ViewSize, ViewSize / aspectRatio, ViewSize / -aspectRatio,  1, 1000);
			}

			camera.position.x = 0;
			camera.position.y = -10;
			camera.position.z = 0;
			camera.lookAt(scene.position);
			break;

		case 2:
			camera = new THREE.PerspectiveCamera(-50, aspectRatio, 1, 130);
			camera.position.x = 0;
			camera.position.y = -50;
			camera.position.z = -75.5;
			camera.lookAt(scene.position);
			break;

		case 3: 
			camera = new THREE.PerspectiveCamera(-50, aspectRatio, 1, 120);
			camera.position.x = spacecraft.position.x;
			camera.position.y =  -10;
			camera.position.z = -55;
			camera.lookAt(spacecraft.position);
			break;
	}
}

function createCameraLives(){

	aspectRatio = window.innerWidth/window.innerHeight;
	if ( aspectRatio > 1){
				ortographicCameraLives = new THREE.OrthographicCamera(9.5 * -aspectRatio, aspectRatio * 9.5, 3.6, -7.1, 1, 1000);
			}
			else{
				ortographicCameraLives = new THREE.OrthographicCamera(-9.5, 9.5, 3.6 / aspectRatio, 7.1 / -aspectRatio,  1, 1000);
			}

	ortographicCameraLives.position.x = 0;
	ortographicCameraLives.position.y = -10;
	ortographicCameraLives.position.z = 0;

	ortographicCameraLives.lookAt(sceneLives.position);
}


function updatePositionCamera(){
	'use scrict';
	if (cameraChoice == 3){
		camera.position.x = spacecraft.position.x;
	}
}
function updatePositionSpotLight(){
	'use scrict';
	if (spotlightFlag == true){
		spotLight.position.x = spacecraft.position.x;
		spotLight.target.position.x = spacecraft.position.x;
	}
}

function createSceneLives(){
	sceneLives = new THREE.Scene();
	var posX = -11.5;

	for (var i = 0; i < lives; i++){
		livesList[i] = new createSpacecraft(new THREE.Vector3(0, 0, 0));
		livesList[i].changeMaterial(materialSpacecraft,materialWeapons);
		livesList[i].position.x = posX;
		posX += 11.5;
	}
	
	for (var i = 0; i < lives; i++){
		sceneLives.add(livesList[i]);
	}

}

function render(){
	'use strict';
	renderer.clear();
	renderer.setViewport(5, window.innerHeight/1.2, window.innerWidth/9, window.innerHeight/11);
	renderer.render(sceneLives, ortographicCameraLives);
	renderer.setViewport(100, 0, window.innerWidth - 200, window.innerHeight);
	renderer.render(scene, camera);
}

function onResize(){
	'use strict';

	var aspectRatio = window.innerWidth /  window.innerHeight;
	renderer.setSize(window.innerWidth, window.innerHeight);
	if(cameraChoice == 1){
		if ( window.innerHeight > 0 && window.innerWidth > 0 && aspectRatio > 1){
			camera.left = ViewSize * -aspectRatio ;
			camera.right = aspectRatio * ViewSize;
			camera.top = ViewSize;
			camera.bottom = -ViewSize;
			ortographicCameraLives.left = -aspectRatio * 9.5;
    		ortographicCameraLives.right = aspectRatio * 9.5;
    		ortographicCameraLives.top = 3.6;
    		ortographicCameraLives.bottom = -7.1;
			camera.updateProjectionMatrix();
			ortographicCameraLives.updateProjectionMatrix();
		}
		else if ( window.innerHeight > 0 && window.innerWidth > 0 && aspectRatio < 1){
			camera.left = -limitSpaceGame;
			camera.right = limitSpaceGame;
			camera.top = limitSpaceGame / aspectRatio;
			camera.bottom = limitSpaceGame / -aspectRatio;
			ortographicCameraLives.left = -9.5;
			ortographicCameraLives.right = 9.5;
			ortographicCameraLives.top = 3.6 / aspectRatio;
			ortographicCameraLives.bottom = 7.1 / -aspectRatio;
			camera.updateProjectionMatrix();
			ortographicCameraLives.updateProjectionMatrix();
		}
	}else{
    	camera.aspect = aspectRatio;
    	camera.updateProjectionMatrix();
	}	
}

function controlKeys(){
	'use strict'

	if(keys[49] == true && pauseFlag == false){ //1
		if (cameraChoice != 1) {
			cameraChoice = 1;
			createCamera();
		}
		

	}

	if(keys[50] == true && pauseFlag == false){//2
		if (cameraChoice != 2) {
			cameraChoice = 2;
			createCamera();
		}
	}

	if(keys[51] == true && pauseFlag == false){ //3
		if (cameraChoice != 3) {
			cameraChoice = 3;
			createCamera();
		}
	}

	if(keys[37] == true && pauseFlag == false){ // <-
		if(Math.sign(spacecraft.acceleration.x) == 0.0 || Math.sign(spacecraft.speed.x)<0){
			spacecraft.acceleration.set(-spacecraftAcceleration, 0, 0);
		}
	}

	if(keys[39] == true && pauseFlag == false){ // ->
		if(Math.sign(spacecraft.acceleration.x) == 0.0 || Math.sign(spacecraft.speed.x)>0){
			spacecraft.acceleration.set(spacecraftAcceleration, 0, 0);
		}
	}

	if(keys[66] == true && pauseFlag == false){ //b
		if(bulletFlag == false){
			bullet.push(new createBullet());
			bulletFlag = true;
		}
	}

	if(keys[83] == true && gameWonFlag == false && gameLostFlag == false){ //s
		if(sFlag == false && pauseFlag == false){
			showScreen(screenPause);
			pauseFlag = true;
			sFlag = true;
		}
		if(sFlag == false && pauseFlag == true){
			removeScreen(screenPause);
			pauseFlag = false;
			sFlag = true;
		}
	}

	if(keys[82] == true && (gameWonFlag == true || gameLostFlag == true)){ //r
		var i;
		var h;
		alienskilled = 0;
		lives = 3;
		for(h=bullet.length-1; h >= 0; h--){
			bullet[h].removeBullet();
		}

		for(i=0; i < alien.length; i++){
			scene.remove(alien[i]);
			alien[i].reset();
			scene.add(alien[i]);
		}

		spacecraft.reset();

		for (var d = 0; d < lives; d++){
		sceneLives.add(livesList[d]);
	}

		if(gameLostFlag == true){
			removeScreen(screenGameOver);
			gameLostFlag = false;
		}
		if(gameWonFlag == true){
			removeScreen(screenWon);
			gameWonFlag = false;
		}
		pauseFlag = false;
		
	}
}

function checkState() {
	'use scrict';
	if(lives == 0 && gameLostFlag == false){
		pauseFlag = true;
		gameLostFlag = true;
		showScreen(screenGameOver);
	}
	if(alienskilled == alien.length && gameWonFlag == false && gameLostFlag == false){
		pauseFlag = true;
		gameWonFlag = true;
		showScreen(screenWon);
	}
}

function animate(){
	'use scrict';
	var i = 0;
	var delta = clock.getDelta();
	if(pauseFlag == true){
		delta = 0;
	}
	controlKeys();
	spacecraft.update(delta);
	updatePositionCamera();
	updatePositionSpotLight();

	for(i=0; i < alien.length; i++){
		alien[i].update(delta);
	}

	for(i=0; i < bullet.length; i++){
		bullet[i].update(delta);
	}

	if(gFlag == false && typeLight == 1){
		var i;
		var x;
		for(i = 0 ; i< alien.length; i ++){
			if(i<4){
				alien[i].changeMaterial(pmaterialAlien1, pmaterialBody, pmaterialTeeth);
			}else{
				alien[i].changeMaterial(pmaterialAlien2, pmaterialBody, pmaterialTeeth);
			}
		}
		for(x=0; x < bullet.length; x++){
				bullet[x].changeMaterial(pmaterialBulletBack, pmaterialBulletFront);
		}
		spacecraft.changeMaterial(pmaterialSpacecraft, pmaterialWeapons); 
		typeLight = 2;
		gFlag = true;
	}

	if(cFlag == false && pointlightFlag == false && lightActiveFlag==false){
		var x;
		for(x=0; x < pointLight.length; x++){
			scene.add(pointLight[x]);
			//scene.add(star[x]);
		}
		cFlag = true;
		pointlightFlag = true; 
	}
	if(hFlag == false && spotlightFlag == false){
		scene.add(spotLight);
		scene.add(spotLight.target);
		spotlightFlag = true;
		hFlag = true;
	}

	checkState();
	
	render();
	requestAnimationFrame(animate);
	
}

function onKeyUp(e){
	'use strict';
	keys[e.keyCode] = false;
	switch(e.keyCode){
		case 37:// <-
			if(spacecraft.speed.x != 0.0 && Math.sign(spacecraft.speed.x)<0){
				spacecraft.acceleration.multiplyScalar(-2);
			}
			break;
		case 39:// ->
			if(spacecraft.speed.x != 0.0 && Math.sign(spacecraft.speed.x)>0){
				spacecraft.acceleration.multiplyScalar(-2);
			}
			break;
		case 66: //b
			bulletFlag = false;
			break;
		case 83: //s
			sFlag = false;
			break;
		case 82: //r
			rFlag = false;
			break;
	}
}

function onKeyDown(e){
	'use strict';
	keys[e.keyCode] = true;

}

function init(){
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.autoClear = false;
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();

	createCamera();
	createSceneLives();
	createCameraLives();
	addBackGround();

	typeLight = 1;

	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}