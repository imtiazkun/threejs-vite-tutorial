import './style.css'

// import three as THREE
import * as THREE from 'three'
import GUI from 'lil-gui';



// Scene
const scene = new THREE.Scene()

// AxesHelper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Object


const geometry = new THREE.DodecahedronGeometry(1, 0)
const material = new THREE.MeshStandardMaterial({ color: 0x77ba66 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Lighting
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 5, 5, 10 );
scene.add( directionalLight );

const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( helper );

// Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// debug
const gui = new GUI();
gui.add(mesh.position, "x")
  .name("Position X")
  .max(3)
  .min(-3)
  .onChange(() => renderer.render(scene, camera));

gui.add(mesh.position, "y")
  .name("Position Y")
  .max(3)
  .min(-3)
  .onChange(() => renderer.render(scene, camera));

gui.add(mesh.rotation, "y")
  .name("Rotation Y")
  .max(3)
  .min(-3)
  .onChange(() => renderer.render(scene, camera));

gui.addColor(mesh.material, "color")
  .name("Color")
  .onChange(() => renderer.render(scene, camera));

gui.add(mesh, "visible")
  .onChange(() => renderer.render(scene, camera));

// write a function to make the cube rotate

const tick = () => {
  // Update objects
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  mesh.rotation.z += 0.01
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()



window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
})


// // write a function to make the canvas full screen on double click
// window.addEventListener("dblclick", () => {
//   if (!document.fullscreenElement) {
//     canvas.requestFullscreen()
//   }
//   else {
//     document.exitFullscreen()
//   }
// })
