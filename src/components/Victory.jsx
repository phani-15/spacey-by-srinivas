import React, { useEffect, useRef } from 'react';
import useMissionState from '../hooks/useMissionState';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

const Victory = () => {
    const { name, resetMission } = useMissionState();
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const badgeRef = useRef(null);

    useEffect(() => {
        // Trigger confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        // GSAP Animations
        const tl = gsap.timeline();

        tl.fromTo(badgeRef.current,
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }
        )
            .fromTo(textRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
                '-=0.5'
            );

        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6 overflow-hidden">

            {/* Background Starfield */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDIiIGhlaWdodD0iNDAyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMjAxIDIwMWEgMSAxIDAgMCAxIDAgMiAxIDEgMCAwIDEgMC0yeiIvPjwvZz48L2c+PC9zdmc+')] pointer-events-none bg-repeat"></div>

            <div className="z-10 flex flex-col items-center text-center max-w-3xl">

                <div ref={badgeRef} className="text-9xl mb-8 drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]">
                    🏆
                </div>

                <div ref={textRef}>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                        Mission Accomplished!
                    </h1>

                    <p className="text-2xl md:text-3xl mb-4 text-slate-200">
                        Outstanding work, <span className="font-bold text-white">{name || 'Explorer'}</span>.
                    </p>

                    <p className="text-lg md:text-xl mb-12 text-slate-400 font-light">
                        You successfully navigated the Gravity Lab, understood the differences between planetary gravity, and correctly equipped the required gear for your mission.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Victory;
