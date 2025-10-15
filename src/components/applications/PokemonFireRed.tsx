import React, { useState } from 'react';
import GBAPlayer from '../gba/GBAPlayer';
import Window from '../os/Window';

export interface PokemonFireRedAppProps extends WindowAppProps {}

const PokemonFireRedApp: React.FC<PokemonFireRedAppProps> = (props) => {
    const [width, setWidth] = useState(980);
    const [height, setHeight] = useState(750);

    return (
        <Window
            top={10}
            left={10}
            width={width}
            height={height}
            windowTitle="Pokemon FireRed"
            windowBarIcon="windowGameIcon"
            windowBarColor="#CC0000"
            bottomLeftText={'Powered by GBA.js Emulator'}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
        >
            <GBAPlayer width={width} height={height} romUrl="pokemon-firered.gba" />
        </Window>
    );
};

export default PokemonFireRedApp;
