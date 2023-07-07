import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Scene
const scene = new THREE.Scene();

// Object
const colors = [0xdb7093, 0xc71585, 0xff0000, 0xdc143c, 0xb22222];

const modelLoader = new GLTFLoader();
const group = new THREE.Group();
modelLoader.load(
  "/model/text.gltf",
  function (gltf) {
    const count = gltf.scene.children[0].geometry.attributes.position.count;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const sphere = new THREE.SphereGeometry(Math.random() - 2 * 0.1, 16, 16);
      const sphereMaterial = new THREE.MeshNormalMaterial();
      const sphereMesh = new THREE.Mesh(sphere, sphereMaterial);

      sphereMesh.position.x =
        gltf.scene.children[0].geometry.attributes.position.array[i3] * 100;
      sphereMesh.position.y =
        gltf.scene.children[0].geometry.attributes.position.array[i3 + 1] *
          100 -
        Math.random() * 5;
      sphereMesh.position.z =
        gltf.scene.children[0].geometry.attributes.position.array[i3 + 2] *
          100 -
        Math.random() * 2;

      group.add(sphereMesh);
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

scene.add(group);
// Text
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const fontLoader = new FontLoader();

fontLoader.load("/font/libre.json", (font) => {
  const textGeometry = new TextGeometry("ShariarSensei", {
    font: font,
    size: 2,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry.center();
  const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  text.position.z = -10;
  scene.add(text);
});

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 10);
scene.add(directionalLight);

// const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);

// Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
// renderer.setClearColor(0x000000, 0);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();
// write a function to make the cube rotate
const tick = () => {
  // Update objects
  // controls.update();
  // group.rotation.x += 0.001;
  group.rotation.y += 0.001;
  // group.rotation.z += 0.001;
  const elapsedTime = clock.getElapsedTime();

  for (let index = 0; index < group.children.length; index++) {
    const element = group.children[index];
    element.position.y = Math.sin(elapsedTime + index) * 2;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

// // write a function to make the canvas full screen on double click
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
