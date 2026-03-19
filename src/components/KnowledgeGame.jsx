import React, { useState, useEffect, useRef } from 'react';
import useMissionState from '../hooks/useMissionState';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

// Drag Types
const ItemTypes = {
    BOOTS: 'boots',
};

// Available items to drag
const availableBoots = [
    { id: 'heavy', name: 'Heavy Titanium Boots', type: ItemTypes.BOOTS, hint: 'For low gravity', icon: '🥾' },
    { id: 'light', name: 'Light Nylon Sneakers', type: ItemTypes.BOOTS, hint: 'For high gravity', icon: '👟' },
    { id: 'jet', name: 'Jet Thruster Boots', type: ItemTypes.BOOTS, hint: 'For extreme weight', icon: '🚀' },
];

const BootItem = ({ boot }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOOTS,
        item: { id: boot.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-4 bg-slate-800 border-2 border-slate-700 rounded-xl cursor-grab active:cursor-grabbing hover:border-blue-500 transition-colors flex flex-col items-center gap-2 ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'
                }`}
        >
            <span className="text-4xl">{boot.icon}</span>
            <span className="text-sm font-bold text-center text-slate-300">{boot.name}</span>
        </div>
    );
};

const AstronautTarget = ({ onDrop, currentBoot, planetName }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOOTS,
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div className="flex flex-col items-center">
            <div
                ref={drop}
                className={`relative w-48 h-64 border-4 border-dashed rounded-3xl flex flex-col items-center justify-end pb-8 transition-colors
          ${isOver ? 'border-green-400 bg-green-400/10' : 'border-slate-600 bg-slate-800/50'}
          ${currentBoot ? 'border-blue-500 bg-blue-500/10' : ''}
        `}
            >
                {/* Placeholder Astronaut */}
                <div className="absolute top-8 text-6xl">🧑‍🚀</div>

                {/* Drop zone indicator / current boot */}
                <div className={`text-4xl transition-all ${currentBoot ? 'scale-110' : 'opacity-50'}`}>
                    {currentBoot ? currentBoot.icon : '⬇️'}
                </div>
                {!currentBoot && <p className="text-xs text-slate-400 mt-2 font-bold uppercase">Drop Boots Here</p>}
            </div>
            <p className="mt-4 font-bold text-lg text-slate-300">Test Subject: {planetName}</p>
        </div>
    );
};

const KnowledgeGameContent = () => {
    const { setScene } = useMissionState();
    const [equippedBoot, setEquippedBoot] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
    }, []);

    const navigate = useNavigate()

    const handleDrop = (item) => {
        const droppedBoot = availableBoots.find(b => b.id === item.id);
        setEquippedBoot(droppedBoot);

        // Logic: Moon has low gravity (1.6), needs heavy boots to walk normally
        if (item.id === 'heavy') {
            setIsCorrect(true);
            setShowFeedback(true);
            gsap.to('.rocket-btn', { scale: 1.1, duration: 0.2, yoyo: true, repeat: 3 });
        } else {
            setIsCorrect(false);
            setShowFeedback(true);
            // Shake animation for incorrect
            gsap.fromTo('.astronaut-target',
                { x: -10 },
                { x: 10, duration: 0.1, yoyo: true, repeat: 3, onComplete: () => gsap.set('.astronaut-target', { x: 0 }) }
            );
        }
    };

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6">

            <div className="text-center mb-10 max-w-2xl">
                <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                    Knowledge Check
                </h2>
                <p className="text-xl text-slate-300">
                    The Moon's gravity is very weak (1.6 m/s²). If you want to walk normally without floating away, which gear should you equip?
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full max-w-4xl bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">

                {/* Inventory */}
                <div className="flex-1 w-full">
                    <h3 className="text-lg font-bold text-slate-400 mb-4 uppercase tracking-wider border-b border-slate-700 pb-2">Equipment Inventory</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {availableBoots.map(boot => (
                            <BootItem key={boot.id} boot={boot} />
                        ))}
                    </div>
                </div>

                {/* Target */}
                <div className="flex-1 flex justify-center astronaut-target">
                    <AstronautTarget
                        onDrop={handleDrop}
                        currentBoot={equippedBoot}
                        planetName="The Moon"
                    />
                </div>
            </div>

            {/* Feedback & Action */}
            <div className="mt-12 h-24 flex flex-col items-center justify-center">
                {showFeedback && (
                    <div className={`text-xl font-bold mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {isCorrect
                            ? "Correct! Heavy boots counteract the low gravity."
                            : "Not quite. Think about how light you'd be!"}
                    </div>
                )}

                <button
                    onClick={() =>navigate('/win')}
                    disabled={!isCorrect}
                    className={`rocket-btn px-10 py-4 rounded-xl text-xl font-bold transition-all shadow-lg
            ${isCorrect
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transform hover:-translate-y-1'
                            : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                        }
          `}
                >
                    {isCorrect ? 'Launch Rocket 🚀' : 'Mission Locked'}
                </button>
            </div>

        </div>
    );
};

const KnowledgeGame = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <KnowledgeGameContent />
        </DndProvider>
    );
};

export default KnowledgeGame;
