import { EquirectangularReflectionMapping } from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';

const exrLoader = new EXRLoader();

async function loadEnvTexture(filePath) {
  const exrMap = await exrLoader.loadAsync(filePath);
  exrMap.mapping = EquirectangularReflectionMapping;

  return exrMap;
}

export { loadEnvTexture };