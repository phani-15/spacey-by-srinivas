import { create } from 'zustand';

// Use Zustand for simpler, more robust state management without context boilerplate
const useMissionState = create((set) => ({
    name: '',
    weight: 60, // default weight in kg
    currentScene: 'intro', // intro, personalize, lab, game, victory
    selectedPlanet: 'Earth',

    setName: (name) => set({ name }),
    setWeight: (weight) => set({ weight }),
    setScene: (scene) => set({ currentScene: scene }),
    setPlanet: (planet) => set({ selectedPlanet: planet }),

    resetMission: () => set({
        name: '',
        weight: 60,
        currentScene: 'intro',
        selectedPlanet: 'Earth'
    }),
}));

export default useMissionState;
