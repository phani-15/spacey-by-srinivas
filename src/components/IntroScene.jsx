import React, { useEffect, useRef } from 'react';
import useMissionState from '../hooks/useMissionState';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const IntroScene = () => {
    const { setScene } = useMissionState();
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonRef = useRef(null);
    const planetsRef = useRef([]);

    useEffect(() => {
        const tl = gsap.timeline();

        // Reset planets array for React Strict Mode
        planetsRef.current = planetsRef.current.slice(0, 3);

        tl.fromTo(titleRef.current,
            { opacity: 0, scale: 0.5, y: -50 },
            { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.7)' }
        )
            .fromTo(subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
                '-=0.5'
            )
            .fromTo(buttonRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
                '-=0.3'
            );

        // Floating planet animations
        planetsRef.current.forEach((planet, index) => {
            if (!planet) return;

            gsap.fromTo(planet,
                {
                    opacity: 0,
                    scale: 0,
                    rotation: Math.random() * 360
                },
                {
                    opacity: 0.6,
                    scale: 1,
                    duration: 1.5,
                    ease: 'power2.out',
                    delay: index * 0.2
                }
            );

            gsap.to(planet, {
                y: `random(-20, 20)`,
                x: `random(-20, 20)`,
                rotation: `+=random(-30, 30)`,
                duration: `random(3, 5)`,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 1.5
            });
        });

    }, []);

    const navigate = useNavigate()

    const handleStart = () => {
        // Exit animation
        gsap.to([titleRef.current, subtitleRef.current, buttonRef.current, ...planetsRef.current], {
            opacity: 0,
            scale: 0.8,
            y: -50,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.in',
            onComplete: () => navigate('/personalize')
        });
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4 overflow-hidden">

            {/* Animated Background Elements - "Planets" */}
            <div
                ref={el => planetsRef.current[0] = el}
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500 blur-3xl opacity-20 pointer-events-none"
            />
            <div
                ref={el => planetsRef.current[1] = el}
                className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-purple-600 blur-3xl opacity-20 pointer-events-none"
            />
            <div
                ref={el => planetsRef.current[2] = el}
                className="absolute top-2/3 left-1/3 w-24 h-24 rounded-full bg-red-500 blur-3xl opacity-20 pointer-events-none"
            />

            <div className="z-10 flex flex-col items-center">
                <h1
                    ref={titleRef}
                    className="text-5xl md:text-7xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 tracking-tight"
                >
                    Gravity Lab
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-xl md:text-3xl mb-12 text-center max-w-2xl text-slate-300 font-light"
                >
                    Let's discover how high <span className="font-bold text-white">YOU</span> can jump in space.
                </p>

                <button
                    ref={buttonRef}
                    onClick={handleStart}
                    className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-2xl font-bold shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] transition-all transform hover:-translate-y-1 overflow-hidden"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center gap-3">
                        Start Mission <span className="text-3xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block">🚀</span>
                    </span>
                </button>
            </div>

            {/* Starfield effect (CSS simple) */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDIiIGhlaWdodD0iNDAyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMjAxIDIwMWEgMSAxIDAgMCAxIDAgMiAxIDEgMCAwIDEgMC0yeiIvPjwvZz48L2c+PC9zdmc+')] pointer-events-none bg-repeat"></div>
        </div>
    );
};

export default IntroScene;
