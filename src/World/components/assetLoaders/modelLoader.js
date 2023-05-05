import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function setupModel(data) {
  const model = data.scene.children[0];
  return model;
}

async function loadClockParts() {
  try {
    const loader = new GLTFLoader();

    const [frameData, faceData, handHHData, handMMData, handSSData] = await Promise.all([
      loader.loadAsync('/assets/models/ClockFrame.glb'),
      loader.loadAsync('/assets/models/ClockFace.glb'),
      loader.loadAsync('/assets/models/Clock_Hand_HH.glb'),
      loader.loadAsync('/assets/models/Clock_Hand_MM.glb'),
      loader.loadAsync('/assets/models/Clock_Hand_SS.glb'),
    ]);

    const frame = setupModel(frameData);
    const face = setupModel(faceData);
    const handHH = setupModel(handHHData);
    const handMM = setupModel(handMMData);
    const handSS = setupModel(handSSData);

    return { frame, face, handHH, handMM, handSS };
  }

  catch(error) {
    console.log(error);
  }
}

export { loadClockParts };
