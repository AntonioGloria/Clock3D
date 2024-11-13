import { SpotLight, HemisphereLight } from 'three';


function createLights() {
  const ambientLight = new HemisphereLight(
    'white',
    'black',
    0.5,
  );

  const mainLight = new SpotLight('white', 1500);
  mainLight.position.set(0, 20, 5);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 4096;
  mainLight.shadow.mapSize.height = 4096;
  mainLight.angle = Math.PI/8;

  return { ambientLight, mainLight };
}

export { createLights };
