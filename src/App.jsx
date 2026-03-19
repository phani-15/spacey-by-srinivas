import IntroScene from './components/IntroScene';
import Personalize from './components/Personalize';
import GravityLab from './components/GravityLab';
import KnowledgeGame from './components/KnowledgeGame';
import Victory from './components/Victory';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import CanvasCursor from './components/CanvasCursor';
import PageTransition from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<PageTransition><IntroScene /></PageTransition>} />
                <Route path='/personalize' element={<PageTransition><Personalize /></PageTransition>} />
                <Route path='/gravity' element={<PageTransition><GravityLab /></PageTransition>} />
                <Route path='/test' element={<PageTransition><KnowledgeGame /></PageTransition>} />
                <Route path='/win' element={<PageTransition><Victory /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
  return (
    <div className="w-full min-h-screen bg-slate-950 overflow-hidden font-sans">
      <BrowserRouter>
        <CanvasCursor />
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
