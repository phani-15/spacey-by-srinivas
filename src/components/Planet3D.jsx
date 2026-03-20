import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS } from '../data/planets';

const Loader3D = ({ planetName }) => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 shadow-2xl min-w-[200px]">
                <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                    <div 
                        className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"
                        style={{ animationDuration: '1s' }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-400">
                        {Math.round(progress)}%
                    </div>
                </div>
                <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-1">
                    Loading {planetName}
                </h3>
                <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden mt-2">
                    <div 
                        className="bg-blue-500 h-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </Html>
    );
};

const SpherePlanet = ({ planetData }) => {
    const textures = useLoader(THREE.TextureLoader, [
        planetData.textureMap,
        planetData.bumpMap || planetData.textureMap
    ]);
    const colorMap = textures[0];
    const bumpMap = planetData.bumpMap ? textures[1] : null;

    const [hovered, setHover] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
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
            groupRef.current.rotation.y += 0.005;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });
    return <group ref={groupRef}>{children}</group>;
};

const Planet3D = ({ planetName }) => {
    const planetData = PLANETS[planetName];
    if (!planetData) return null;

    return (
        <React.Suspense fallback={<Loader3D planetName={planetName} />}>
            {/* <RotatingContainer> */}
                <SpherePlanet planetData={planetData} />
            {/* </RotatingContainer> */}
        </React.Suspense>
    );
};

export default Planet3D;
