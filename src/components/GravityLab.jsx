import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import useMissionState from '../hooks/useMissionState';
import { PLANETS } from '../data/planets';
import Planet3D from './Planet3D';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';


const GravityLab = () => {
    const { name, weight, setScene, selectedPlanet, setPlanet } = useMissionState();
    const [jumpHeight, setJumpHeight] = useState('0.00');
    const [isJumping, setIsJumping] = useState(false);
    const astronautRef = useRef(null);

    // Constants
    const earthGravity = PLANETS['Earth'].gravity;
    const earthJumpBase = 0.5; // Average human jump is 0.5 meters

    // Update selected planet and calculate relative jump
    const handlePlanetChange = (newPlanet) => {
        setPlanet(newPlanet);

        // Stop current jump if changing planets
        if (isJumping) {
            gsap.killTweensOf(astronautRef.current);
            gsap.to(astronautRef.current, { y: 0, duration: 0.2 });
            setIsJumping(false);
        }
    };

    const navigate = useNavigate()

    const handleJump = () => {
        if (isJumping) return;

        setIsJumping(true);

        const planetData = PLANETS[selectedPlanet];
        // Formula: earthJump * (earthGravity / planetGravity)
        const calculatedHeight = earthJumpBase * (earthGravity / planetData.gravity);

        setJumpHeight(calculatedHeight.toFixed(2));

        // Visual animation height (scaled for UI)
        const visualHeight = Math.min(calculatedHeight * 50, 400); // cap visual height

        // Time relative to gravity (lower gravity = longer hang time)
        const jumpDuration = 1 * (earthGravity / planetData.gravity) * 0.5;

        // GSAP Physics simulation for jump
        gsap.to(astronautRef.current, {
            y: -visualHeight,
            duration: jumpDuration,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                setIsJumping(false);
            }
        });

    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-white overflow-hidden">

            {/* 3D Viewport (Left/Top) */}
            <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen bg-black">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    {/* <pointLight position={[10, 10, 10]} intensity={2} /> */}
                    <Stars radius={70} depth={40} count={2500} factor={4} saturation={0} fade speed={1} />
                    <Environment preset="city" />
                    <Planet3D planetName={selectedPlanet} />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate={false}
                    />
                </Canvas>

                {/* Planet Identifier Overlay */}
                <div className="absolute top-6 left-6 z-10">
                    <h2 className="text-4xl font-black drop-shadow-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
                        {selectedPlanet.toUpperCase()}
                    </h2>
                    <p className="text-slate-300 font-medium">Gravity: {PLANETS[selectedPlanet].gravity} m/s²</p>
                </div>
            </div>

            {/* Control Panel (Right/Bottom) */}
            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-slate-900 border-l border-slate-800 shadow-2xl z-20 max-h-screen">

                <div className="mb-4">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
                        Gravity Simulator
                    </h2>
                    <p className="text-slate-400">
                        Hey {name || 'Explorer'}, select a planet and test your jump!
                    </p>
                </div>

                {/* Planet Selector Slider/Tabs */}
                <div className="flex bg-slate-800 p-1.5 rounded-2xl mb-4 w-full max-w-md shadow-inner">
                    {Object.keys(PLANETS).map((pNames) => (
                        <button
                            key={pNames}
                            onClick={() => handlePlanetChange(pNames)}
                            className={`flex-1 py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${selectedPlanet === pNames
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                }`}
                        >
                            {pNames}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl mb-10">
                    <p className="text-sm text-slate-400 mb-2 font-medium uppercase tracking-wider">
                        {PLANETS[selectedPlanet].name} Environment
                    </p>
                    <p className="text-lg text-slate-200">
                        <ul className='list-disc pl-5'>
                            {PLANETS[selectedPlanet].description.map((element, index) => (
                                <li key={index} className='text-sm'>{element}</li>
                            ))}
                        </ul>
                    </p>
                </div>

                {/* Jump Interaction Area */}
                <div className="flex items-end gap-12 mb-12 flex-1">

                    {/* Astronaut Visual */}
                    <div className="relative w-24 flex flex-col items-center">
                        {/* Height Indicator track */}
                        <div className="absolute bottom-0 w-0.5 h-[300px] bg-slate-700 -z-10 rounded-full overflow-hidden">
                            <div className="w-full bg-blue-500 rounded-full transition-all duration-[2000ms]" style={{ height: isJumping ? '100%' : '10%' }}></div>
                        </div>

                        <div
                            ref={astronautRef}
                            className="text-6xl drop-shadow-xl z-10"
                            style={{ filter: isJumping ? 'drop-shadow(0 20px 20px rgba(0,0,0,0.5))' : 'none' }}
                        >
                            🧑‍🚀
                        </div>
                        {/* Ground shadow */}
                        <div
                            className={`w-16 h-3 bg-black/60 blur-sm rounded-full mt-2 transition-all duration-300 ${isJumping ? 'scale-50 opacity-20' : 'scale-100 opacity-100'}`}
                        ></div>
                    </div>

                    <div className="flex-1 flex flex-col justify-end pb-8">
                        <button
                            onClick={handleJump}
                            disabled={isJumping}
                            className={`py-5 px-6 rounded-xl font-bold text-xl transition-all shadow-lg w-full max-w-[250px]
                ${isJumping
                                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed transform scale-95'
                                    : 'bg-green-600 hover:bg-green-500 text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] active:scale-95'
                                }
              `}
                        >
                            {isJumping ? 'JUMPING...' : 'INITIATE JUMP'}
                        </button>

                        <div className="mt-6 flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white">{isJumping ? '---' : jumpHeight}</span>
                            <span className="text-xl text-slate-400 font-bold">meters</span>
                        </div>
                        {jumpHeight > 0 && !isJumping && (
                            <p className="text-sm text-green-400 mt-2 font-medium">Record recorded!</p>
                        )}
                    </div>
                </div>

                {/* Next Scene */}
                <div className="pt-6 border-t border-slate-800 flex justify-end">
                    <button
                        onClick={() => navigate('/test')}
                        className="flex items-center gap-2 group text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                        Advance to Knowledge Check
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default GravityLab;
