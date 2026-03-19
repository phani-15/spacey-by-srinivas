import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS } from '../data/planets';

const SpherePlanet = ({ planetData }) => {
    // We pass both maps to useLoader. If bumpMap isn't present, we load textureMap twice as a safe fallback.
    const textures = useLoader(THREE.TextureLoader, [
        planetData.textureMap,
        planetData.bumpMap || planetData.textureMap
    ]);
    const colorMap = textures[0];
    const bumpMap = planetData.bumpMap ? textures[1] : null;

    const [hovered, setHover] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
        // Cleanup on unmount
        return () => { document.body.style.cursor = 'auto'; };
    }, [hovered]);

    return (
        <Sphere 
            args={[planetData.radius * 2, 32, 32]} 
            position={[0, 0, 0]}
            onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
            onPointerOut={() => setHover(false)}
        >
            <meshStandardMaterial
                map={colorMap}
                bumpMap={bumpMap}
                bumpScale={0.05}
                roughness={0.6}
                metalness={0.1}
            />
        </Sphere>
    );
};

const RotatingContainer = ({ children }) => {
    const groupRef = useRef();
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005; // Base slow rotation
            // Add slight floating effect
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });
    return <group ref={groupRef}>{children}</group>;
};

const Planet3D = ({ planetName }) => {
    const planetData = PLANETS[planetName];
    if (!planetData) return null;

    return (
        <React.Suspense fallback={null}>
            {/* <RotatingContainer> */}
                <SpherePlanet planetData={planetData} />
            {/* </RotatingContainer> */}
        </React.Suspense>
    );
};

export default Planet3D;
