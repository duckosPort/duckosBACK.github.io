import React from 'react';

import windowResize from './windowResize.png';
import maximize from './maximize.png';
import minimize from './minimize.png';
import computerBig from './computerBig.png';
import computerSmall from './computerSmall.png';
import myComputer from './myComputer.png';
import showcaseIcon from './showcaseIcon.png';
import doomIcon from './doomIcon.png';
import credits from './credits.png';
import volumeOn from './volumeOn.png';
import volumeOff from './volumeOff.png';
import trailIcon from './trailIcon.png';
import windowGameIcon from './windowGameIcon.png';
import windowExplorerIcon from './windowExplorerIcon.png';
import windowsStartIcon from './windowsStartIcon.png';
import duckLogo from './duck-logo.png';
import scrabbleIcon from './scrabbleIcon.png';
import close from './close.png';
import tetrisIcon from './tetrisIcon.png';
import pacmanIcon from './pacmanIcon.png';
import ssf2tIcon from './ssf2tIcon.png';
import pokemonFireRedIcon from './pokemonFireRedIcon.png';
import terminal from './terminal.png';

const icons = {
    windowResize: windowResize,
    maximize: maximize,
    minimize: minimize,
    computerBig: computerBig,
    computerSmall: computerSmall,
    myComputer: myComputer,
    showcaseIcon: showcaseIcon,
    doomIcon: doomIcon,
    volumeOn: volumeOn,
    volumeOff: volumeOff,
    credits: credits,
    scrabbleIcon: scrabbleIcon,
    close: close,
    windowGameIcon: windowGameIcon,
    windowExplorerIcon: windowExplorerIcon,
    windowsStartIcon: windowsStartIcon,
    duckLogo: duckLogo,
    trailIcon: trailIcon,
    tetrisIcon: tetrisIcon,
    pacmanIcon: pacmanIcon,
    ssf2tIcon: ssf2tIcon,
    pokemonFireRedIcon: pokemonFireRedIcon,
    terminal: terminal,
};

export type IconName = keyof typeof icons;

const getIconByName = (
    iconName: IconName
    // @ts-ignore
): React.FC<React.SVGAttributes<SVGElement>> => icons[iconName];

export default getIconByName;
