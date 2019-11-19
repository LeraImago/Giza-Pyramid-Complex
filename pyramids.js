import { Lensflare, LensflareElement } from '/Lensflare.js';

window.onload = init();

function init() {
	let scene = new THREE.Scene();
	let renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	let camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight, 
		0.1, 
		1000 );
	camera.position.set(-40, 15, 70);
	
	let controlsOrbit = new THREE.OrbitControls(camera, renderer.domElement);
	controlsOrbit.update();

	let textureLoader = new THREE.TextureLoader();
	let textureFlare0 = textureLoader.load( 'lensflare0.png' );
	let textureFlare3 = textureLoader.load( 'lensflare3.png' );

	addLight( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
	addLight( 0.08, 0.8, 0.5, 0, 0, - 1000 );
	addLight( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );

	function addLight( h, s, l, x, y, z ) {
		var light = new THREE.PointLight( 0xffffff, 1.5, 6000 );
		light.color.setHSL( h, s, l );
		light.position.set( x, y, z );
		scene.add( light );
		var lensflare = new Lensflare();
		lensflare.addElement( new LensflareElement( textureFlare0, 700, 0, light.color ) );
		lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6 ) );
		lensflare.addElement( new LensflareElement( textureFlare3, 70, 0.7 ) );
		lensflare.addElement( new LensflareElement( textureFlare3, 120, 0.9 ) );
		lensflare.addElement( new LensflareElement( textureFlare3, 70, 1 ) );
		light.add( lensflare );
	}

	let plane = new THREE.PlaneGeometry( 240, 240, 1, 1);
	let planeMaterial = new THREE.MeshStandardMaterial({
		color: 0x1E1229,
		side: THREE.DoubleSide});
	let ground = new THREE.Mesh(plane, planeMaterial);
	ground.rotation.x = -0.5 * Math.PI;
	ground.position.set( 15, 0, 0);
	scene.add(ground);

	let ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);

	let width = 40;
	let height = 40;
	let intensity = 10;
	
	let areaLight1 = new THREE.RectAreaLight( 0x6717C2, intensity,  width, height );
	areaLight1.position.set(2, 9, -5);
	areaLight1.rotation.set(-Math.PI / 2, 0, 0);

	let areaLight2 = new THREE.RectAreaLight( 0x00C2E8, intensity,  width, height );
	areaLight2.position.set(-17, 9, 20);
	areaLight2.rotation.set(-Math.PI / 2, 0, 0);

	let areaLight3 = new THREE.RectAreaLight( 0xFA9F19, intensity,  width, height );
	areaLight3.position.set(30, 9, -29);
	areaLight3.rotation.set(-Math.PI / 2, 0, 0);

	let target = new THREE.Object3D();
	let pointColor = "#0335b1";
	let spotLight = new THREE.SpotLight(pointColor);
	spotLight.position.set(-40, 120, -10);
	spotLight.castShadow = true;
	spotLight.target = ground;
	spotLight.distance = 0;
	spotLight.angle = 1.77;
	
	scene.add(
	ambientLight,
	spotLight,
	areaLight1,
	areaLight2,
	areaLight3 );

	let textureMoon = new THREE.TextureLoader().load('moon.jpg');
	textureMoon.wrapS = THREE.RepeatWrapping;
	textureMoon.wrapT = THREE.RepeatWrapping;
	textureMoon.repeat.set(1, 1);

	let sphereLight = new THREE.SphereGeometry(2, 20, 20);
	let laghtM = new THREE.MeshLambertMaterial({
		color: 0xFE083C,
		map: textureMoon});
	let sphereLightMesh = new THREE.Mesh(sphereLight, laghtM);
	sphereLightMesh.receiveShadow = true;
	scene.add(sphereLightMesh);

	let step = 0;
	let phase = 2;
	let invert = 1;

	let texturePyramid = new THREE.TextureLoader().load('stone1.png');
	texturePyramid.wrapS = THREE.RepeatWrapping;
	texturePyramid.wrapT = THREE.RepeatWrapping;
	texturePyramid.repeat.set(4, 4);
	let material = [
	new THREE.MeshLambertMaterial({
		color: 0x5B88C1, 
		map: texturePyramid, 
		transparent: true}),
	new THREE.MeshBasicMaterial({
		color: 0x000080,
		wireframe: true })
	];

	let geom1 = new THREE.OctahedronGeometry(7);
	let pyramid1 = new THREE.Mesh(geom1, material);
	pyramid1.castShadows = true;
	pyramid1.rotation.y = -4;
	pyramid1.position.set(-17, 0, 20);

	let geom2 = new THREE.OctahedronGeometry(12);
	let pyramid2 = new THREE.Mesh(geom2, material);
	pyramid2.castShadows = true;
	pyramid2.rotation.y = -4;
	pyramid2.position.set(2, 0, -5);

	let geom3 = new THREE.OctahedronGeometry(15);
	let pyramid3 = new THREE.Mesh(geom3, material);
	pyramid3.castShadows = true;
	pyramid3.rotation.y = -4;
	pyramid3.position.set(32, 0, -29);

	let geom4 = new THREE.OctahedronGeometry(3);
	let pyramid4 = new THREE.Mesh(geom4, material);
	pyramid4.castShadows = true;
	pyramid4.rotation.y = -4;
	pyramid4.position.set(-18, 0, 29);

	let geom5 = new THREE.OctahedronGeometry(2);
	let pyramid5 = new THREE.Mesh(geom5, material);
	pyramid5.castShadows = true;
	pyramid5.rotation.y = -4;
	pyramid5.position.set(-23, 0, 29);

	let pyramid6 = new THREE.Mesh(geom5, material);
	pyramid6.castShadows = true;
	pyramid6.rotation.y = -4;
	pyramid6.position.set(-27, 0, 29);

	let geom7 = new THREE.OctahedronGeometry(4);
	let pyramid7 = new THREE.Mesh(geom7, material);
	pyramid7.castShadows = true;
	pyramid7.rotation.y = -4;
	pyramid7.position.set(48, 0, -27);

	let pyramid8 = new THREE.Mesh(geom7, material);
	pyramid8.castShadows = true;
	pyramid8.rotation.y = -4;
	pyramid8.position.set(48, 0, -21);

	let pyramid9 = new THREE.Mesh(geom7, material);
	pyramid9.castShadows = true;
	pyramid9.rotation.y = -4;
	pyramid9.position.set(48, 0, -15);

	scene.add(
	pyramid1,
	pyramid2,
	pyramid3, 
	pyramid4, 
	pyramid5, 
	pyramid6,
	pyramid7,
	pyramid8,
	pyramid9);

	renderer.setClearColor(new THREE.Color(0x07162C));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	document.getElementById("threeOutput").appendChild(renderer.domElement);

	function render() {
		requestAnimationFrame(render);
		
		if (phase > 2 * Math.PI) {
			invert = invert * -1;
			phase -= 2 * Math.PI;
		} else {
			phase += 0.04;
		}
		
		sphereLightMesh.position.z = +(14 * (Math.sin(phase)));
		sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
		sphereLightMesh.position.y = 20;
		
		if (invert < 0) {
		    pivot = 14;
		    sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
		}
		spotLight.position.copy(sphereLightMesh.position);
		
		controlsOrbit.update();
		renderer.render(scene, camera);
	}
	function onWindowResize() {
		renderer.setSize( window.innerWidth, window.innerHeight );
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}
	window.addEventListener( 'resize', onWindowResize, false );
	render();
}

