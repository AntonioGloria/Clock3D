import { loadModels } from './components/assetLoaders/modelLoader.js';
import { loadEnvTexture } from './components/assetLoaders/textureLoader.js';
import { clockMaterial } from './components/material.js';
import { ClockModel } from './components/clock.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let controls;
let renderer;
let scene;
let loop;

const bgEnvMapPath = '/assets/textures/environment/wooden_lounge_1k.exr'
const modelPaths = [
  '/assets/models/ClockFrame.glb',
  '/assets/models/ClockFace.glb',
  '/assets/models/Clock_Hand_SS.glb',
  '/assets/models/Clock_Hand_MM.glb',
  '/assets/models/Clock_Hand_HH.glb'
];

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    try {
      const clockParts = await loadModels(modelPaths);
      const clockModel = new ClockModel(clockParts);
      clockModel.face.material = await clockMaterial();

      const bgEnvMap = await loadEnvTexture(bgEnvMapPath);
      scene.environment = bgEnvMap;
      scene.environmentIntensity = 0.1;

      controls.target.copy(clockModel.position);
      scene.add(clockModel);
      loop.updatables.push(clockModel);
    }

    catch(error) {
      console.log(error);
    }
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
