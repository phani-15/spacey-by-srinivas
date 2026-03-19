import React from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const MarsModel = () => {
  const obj = useLoader(OBJLoader, "/models/mars.obj");

  return (
    <primitive
      object={obj}
      scale={0.8}
      position={[0, 0, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
};

export default MarsModel;