// Initialize hero model
const initModel = () => {
    // Grab render container
    const container = document.getElementById('hero-model');

    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(-2.7, 1.4, 2.5);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor( 0xffffff, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    controls.target.y = camera.position.y;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI * 0.5;

    controls.maxDistance = 3.6;
    controls.minDistance = 2.5;
  
    controls.screenSpacePanning = false;

    // Create light source
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1.75);
    scene.add(light);

    // Initialize loader
    const loader = new THREE.GLTFLoader();

    // Initialize DRACO for decompression
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');

    // Add DRACO to gtlf
    loader.setDRACOLoader(dracoLoader);

    // Load model
    loader.load( '../src/cactus_plant_web_small.glb', function ( gltf ) {
        console.log('Loaded..');
        console.log(gltf);
        scene.add(gltf.scene);
    
    }, undefined, function ( error ) {
    
        console.error(error);
    
    });

    const render = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
    }

    const animate = () => { 
        controls.update();
        //requestAnimationFrame(animate);
        render();
    }

    render();

    const resize = () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.pixelRatio = window.pixelRatio;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', resize, false);
}

initModel();