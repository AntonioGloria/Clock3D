import { MeshStandardMaterial } from "three";
import { loadTextures } from "./assetLoaders/textureLoader";

const textureFiles = [
  '/assets/textures/clock/ClockFace_BaseColor_1K.png',
  '/assets/textures/clock/ClockFace_Roughness_1K.png',
  '/assets/textures/clock/ClockFace_Normal_1K.png'
]

async function clockMaterial() {
  try {
    const [colorMap, roughnessMap, normalMap] = await loadTextures(textureFiles);
    const clockMaterial = new MeshStandardMaterial({
      map: colorMap,
      roughnessMap: roughnessMap,
      normalMap: normalMap
    });

    return clockMaterial;
  }

  catch(error) {
    console.log(error);
  }
}

export { clockMaterial }