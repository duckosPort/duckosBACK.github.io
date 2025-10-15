import React, { useState } from 'react';
import DosPlayer from '../dos/DosPlayer';
import Window from '../os/Window';

export interface SSF2TAppProps extends WindowAppProps {}

const SSF2TApp: React.FC<SSF2TAppProps> = (props) => {
    const [width, setWidth] = useState(980);
    const [height, setHeight] = useState(750);

    return (
        <Window
            top={10}
            left={10}
            width={width}
            height={height}
            windowTitle="Super Street Fighter 2 Turbo"
            windowBarIcon="windowGameIcon"
            windowBarColor="#8B0000"
            bottomLeftText={'Powered by JSDOS & DOSBox'}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
        >
            <DosPlayer width={width} height={height} bundleUrl="ssf2t.jsdos" />
        </Window>
    );
};

export default SSF2TApp;
