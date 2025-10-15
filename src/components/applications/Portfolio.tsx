import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../showcase/Home';
import About from '../showcase/About';
import Window from '../os/Window';
import Experience from '../showcase/Experience';
import Projects from '../showcase/Projects';
import Contact from '../showcase/Contact';
import SoftwareProjects from '../showcase/projects/Software';
import MusicProjects from '../showcase/projects/Music';
import ArtProjects from '../showcase/projects/Art';
import VerticalNavbar from '../showcase/VerticalNavbar';
import LanguageSelector from '../general/LanguageSelector';
import { LanguageProvider } from '../../contexts/LanguageContext';


export interface PortfolioProps extends WindowAppProps {}

const Portfolio: React.FC<PortfolioProps> = (props) => {
    const initWidth = 1200;
    const initHeight = 700;

    return (
        <LanguageProvider>
        <Window
            top={Math.max(0, (window.innerHeight - 700) / 2)}
            left={Math.max(0, (window.innerWidth - 1200) / 2)}
            width={initWidth}
            height={initHeight}
            windowTitle="Fernando Bezerra - Portfolio 2025"
            windowBarIcon="showcaseIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2025 Fernando Bezerra'}
        >
            <Router>
                <div className="site-page">
                    <LanguageSelector />
                    <VerticalNavbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/projects/software"
                            element={<SoftwareProjects />}
                        />
                        <Route
                            path="/projects/music"
                            element={<MusicProjects />}
                        />
                        <Route path="/projects/art" element={<ArtProjects />} />
                    </Routes>
                </div>
            </Router>
        </Window>
        </LanguageProvider>
    );
};

export default Portfolio;
