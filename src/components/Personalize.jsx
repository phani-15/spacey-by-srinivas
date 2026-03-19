import React, { useState, useEffect, useRef } from 'react';
import useMissionState from '../hooks/useMissionState';
import gsap from 'gsap';
import { Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Personalize = () => {
    const { name, weight, setName, setWeight, setScene } = useMissionState();
    const [localName, setLocalName] = useState(name);
    const [localWeight, setLocalWeight] = useState(weight || '');

    const containerRef = useRef(null);
    const formElementsRef = useRef([]);

    useEffect(() => {
        formElementsRef.current = formElementsRef.current.slice(0, 4);

        const tl = gsap.timeline();

        tl.fromTo(containerRef.current,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
        );

        formElementsRef.current.forEach((el, index) => {
            if (el) {
                tl.fromTo(el,
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
                    `-=${index === 0 ? 0.2 : 0.3}`
                );
            }
        });
    }, []);

    const  navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localName.trim() && localWeight > 0) {
            setName(localName);
            setWeight(Number(localWeight));

            // Exit animation
            gsap.to(containerRef.current, {
                opacity: 0,
                scale: 0.9,
                y: -30,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => navigate('/gravity')
            });
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />

            <div
                ref={containerRef}
                className="relative z-10 bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl max-w-md w-full border border-slate-800"
            >
                <div ref={el => formElementsRef.current[0] = el} className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mb-4">
                        <Rocket size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                        Suit Up, Explorer!
                    </h2>
                    <p className="text-slate-400 mt-2 text-sm">We need your data to calibrate the jump simulation.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div ref={el => formElementsRef.current[1] = el} className="relative group">
                        <label className="block text-sm font-semibold text-slate-300 mb-2 transition-colors group-focus-within:text-blue-400">
                            What is your name?
                        </label>
                        <input
                            type="text"
                            required
                            value={localName}
                            onChange={(e) => setLocalName(e.target.value)}
                            className="w-full px-4 py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-lg"
                            placeholder="e.g. Commander Neil"
                        />
                    </div>

                    <div ref={el => formElementsRef.current[2] = el} className="relative group">
                        <label className="block text-sm font-semibold text-slate-300 mb-2 transition-colors group-focus-within:text-blue-400">
                            Your Earth Weight (kg)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                required
                                min="10"
                                max="300"
                                value={localWeight}
                                onChange={(e) => setLocalWeight(e.target.value)}
                                className="w-full px-4 py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-lg pr-12"
                                placeholder="60"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">kg</span>
                        </div>
                    </div>

                    <div ref={el => formElementsRef.current[3] = el} className="pt-4">
                        <button
                            type="submit"
                            disabled={!localName.trim() || !localWeight || localWeight <= 0}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 rounded-xl text-lg font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:shadow-none"
                        >
                            Enter Gravity Lab →
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Personalize;
