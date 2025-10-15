import React, { useCallback, useEffect, useState } from 'react';
import Colors from '../../constants/colors';
import Portfolio from '../applications/Portfolio';
import Doom from '../applications/Doom';
import Tetris from '../applications/Tetris';
import Pacman from '../applications/Pacman';
import SSF2T from '../applications/SSF2T';
import PokemonFireRed from '../applications/PokemonFireRed';
import Terminal from '../applications/Terminal';
import ShutdownSequence from './ShutdownSequence';
import ThisComputer from '../applications/ThisComputer';
import Toolbar from './Toolbar';
import DesktopShortcut, { DesktopShortcutProps } from './DesktopShortcut';
import { IconName } from '../../assets/icons';
import Credits from '../applications/Credits';
import ContextMenu from './ContextMenu';

export interface DesktopProps {}

type ExtendedWindowAppProps<T> = T & WindowAppProps;

const APPLICATIONS: {
    [key in string]: {
        key: string;
        name: string;
        shortcutIcon: IconName;
        component: React.FC<ExtendedWindowAppProps<any>>;
    };
} = {
    computer: {
        key: 'computer',
        name: 'Internet',
        shortcutIcon: 'computerBig',
        component: ThisComputer,
    },
    portfolio: {
        key: 'portfolio',
        name: 'Portfolio',
        shortcutIcon: 'showcaseIcon',
        component: Portfolio,
    },
    tetris: {
        key: 'tetris',
        name: 'Tetris',
        shortcutIcon: 'tetrisIcon',
        component: Tetris,
    },
    pacman: {
        key: 'pacman',
        name: 'PC-MAN',
        shortcutIcon: 'pacmanIcon',
        component: Pacman,
    },
    doom: {
        key: 'doom',
        name: 'Doom',
        shortcutIcon: 'doomIcon',
        component: Doom,
    },
    ssf2t: {
        key: 'ssf2t',
        name: 'Super Street Fighter 2 Turbo',
        shortcutIcon: 'ssf2tIcon',
        component: SSF2T,
    },
    pokemonFireRed: {
        key: 'pokemonFireRed',
        name: 'Pokemon FireRed',
        shortcutIcon: 'pokemonFireRedIcon',
        component: PokemonFireRed,
    },
    credits: {
        key: 'credits',
        name: 'Credits',
        shortcutIcon: 'credits',
        component: Credits,
    },
    terminal: {
        key: 'terminal',
        name: 'Terminal',
        shortcutIcon: 'terminal',
        component: Terminal,
    },
};

const Desktop: React.FC<DesktopProps> = (props) => {
    const [windows, setWindows] = useState<DesktopWindows>({});

    const [shortcuts, setShortcuts] = useState<DesktopShortcutProps[]>([]);

    const [shutdown, setShutdown] = useState(false);
    const [numShutdowns, setNumShutdowns] = useState(1);

    const getHighestZIndex = useCallback((): number => {
        let highestZIndex = 0;
        Object.keys(windows).forEach((key) => {
            const window = windows[key];
            if (window) {
                if (window.zIndex > highestZIndex)
                    highestZIndex = window.zIndex;
            }
        });
        return highestZIndex;
    }, [windows]);

    const addWindow = useCallback(
        (key: string, element: JSX.Element) => {
            setWindows((prevState) => ({
                ...prevState,
                [key]: {
                    zIndex: getHighestZIndex() + 1,
                    minimized: false,
                    component: element,
                    name: APPLICATIONS[key].name,
                    icon: APPLICATIONS[key].shortcutIcon,
                },
            }));
        },
        [getHighestZIndex]
    );

    const removeWindow = useCallback((key: string) => {
        // Absolute hack and a half
        setTimeout(() => {
            setWindows((prevWindows) => {
                const newWindows = { ...prevWindows };
                delete newWindows[key];
                return newWindows;
            });
        }, 100);
    }, []);

    const minimizeWindow = useCallback((key: string) => {
        setWindows((prevWindows) => {
            const newWindows = { ...prevWindows };
            newWindows[key].minimized = true;
            return newWindows;
        });
    }, []);

    const toggleMinimize = useCallback(
        (key: string) => {
            const newWindows = { ...windows };
            const highestIndex = getHighestZIndex();
            if (
                newWindows[key].minimized ||
                newWindows[key].zIndex === highestIndex
            ) {
                newWindows[key].minimized = !newWindows[key].minimized;
            }
            newWindows[key].zIndex = getHighestZIndex() + 1;
            setWindows(newWindows);
        },
        [windows, getHighestZIndex]
    );

    const onWindowInteract = useCallback(
        (key: string) => {
            setWindows((prevWindows) => ({
                ...prevWindows,
                [key]: {
                    ...prevWindows[key],
                    zIndex: 1 + getHighestZIndex(),
                },
            }));
        },
        [setWindows, getHighestZIndex]
    );

    const openPortfolio = useCallback(() => {
        if (!windows['portfolio']) {
            const portfolioApp = APPLICATIONS['portfolio'];
            addWindow(
                'portfolio',
                <portfolioApp.component
                    onInteract={() => onWindowInteract('portfolio')}
                    onMinimize={() => minimizeWindow('portfolio')}
                    onClose={() => removeWindow('portfolio')}
                    key='portfolio'
                />
            );
        } else {
            toggleMinimize('portfolio');
        }
    }, [windows, addWindow, onWindowInteract, minimizeWindow, removeWindow, toggleMinimize]);

    const openTerminal = useCallback(() => {
        if (!windows['terminal']) {
            const terminalApp = APPLICATIONS['terminal'];
            addWindow(
                'terminal',
                <terminalApp.component
                    onInteract={() => onWindowInteract('terminal')}
                    onMinimize={() => minimizeWindow('terminal')}
                    onClose={() => removeWindow('terminal')}
                    openGui={openPortfolio}
                    key='terminal'
                />
            );
        } else {
            toggleMinimize('terminal');
        }
    }, [windows, addWindow, onWindowInteract, minimizeWindow, removeWindow, toggleMinimize, openPortfolio]);

    useEffect(() => {
        if (shutdown === true) {
            rebootDesktop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shutdown]);

    useEffect(() => {
        const newShortcuts: DesktopShortcutProps[] = [];
        Object.keys(APPLICATIONS).forEach((key) => {
            const app = APPLICATIONS[key];
            // Skip terminal from desktop shortcuts
            if (app.key === 'terminal') {
                return;
            }
            newShortcuts.push({
                shortcutName: app.name,
                icon: app.shortcutIcon,
                onOpen: () => {
                    addWindow(
                        app.key,
                        <app.component
                            onInteract={() => onWindowInteract(app.key)}
                            onMinimize={() => minimizeWindow(app.key)}
                            onClose={() => removeWindow(app.key)}
                            key={app.key}
                        />
                    );
                },
            });
        });

        newShortcuts.forEach((shortcut) => {
            if (shortcut.shortcutName === 'Portfolio') {
                shortcut.onOpen();
            }
        });

        // Open terminal minimized (taskbar only)
        const terminalApp = APPLICATIONS['terminal'];
        addWindow(
            'terminal',
            <terminalApp.component
                onInteract={() => onWindowInteract('terminal')}
                onMinimize={() => minimizeWindow('terminal')}
                onClose={() => removeWindow('terminal')}
                openGui={openPortfolio}
                key='terminal'
            />
        );
        setTimeout(() => {
            minimizeWindow('terminal');
        }, 100);

        setShortcuts(newShortcuts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rebootDesktop = useCallback(() => {
        setWindows({});
    }, []);

    const startShutdown = useCallback(() => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns(numShutdowns + 1);
        }, 600);
    }, [numShutdowns]);

    const openPortfolioFromMenu = useCallback(() => {
        if (!windows['portfolio']) {
            const portfolioApp = APPLICATIONS['portfolio'];
            addWindow(
                'portfolio',
                <portfolioApp.component
                    onInteract={() => onWindowInteract('portfolio')}
                    onMinimize={() => minimizeWindow('portfolio')}
                    onClose={() => removeWindow('portfolio')}
                    key='portfolio'
                />
            );
        } else {
            toggleMinimize('portfolio');
        }
    }, [windows, addWindow, onWindowInteract, minimizeWindow, removeWindow, toggleMinimize]);

    const openTerminalFromMenu = useCallback(() => {
        if (!windows['terminal']) {
            const terminalApp = APPLICATIONS['terminal'];
            addWindow(
                'terminal',
                <terminalApp.component
                    onInteract={() => onWindowInteract('terminal')}
                    onMinimize={() => minimizeWindow('terminal')}
                    onClose={() => removeWindow('terminal')}
                    openGui={openPortfolio}
                    key='terminal'
                />
            );
        } else {
            toggleMinimize('terminal');
        }
    }, [windows, addWindow, onWindowInteract, minimizeWindow, removeWindow, toggleMinimize, openPortfolio]);

    const openCreditsFromMenu = useCallback(() => {
        if (!windows['credits']) {
            const creditsApp = APPLICATIONS['credits'];
            addWindow(
                'credits',
                <creditsApp.component
                    onInteract={() => onWindowInteract('credits')}
                    onMinimize={() => minimizeWindow('credits')}
                    onClose={() => removeWindow('credits')}
                    key='credits'
                />
            );
        } else {
            toggleMinimize('credits');
        }
    }, [windows, addWindow, onWindowInteract, minimizeWindow, removeWindow, toggleMinimize]);

    return !shutdown ? (
        <div style={styles.desktop}>
            {/* For each window in windows, loop over and render  */}
            {Object.keys(windows).map((key) => {
                const element = windows[key].component;
                if (!element) return <div key={`win-${key}`}></div>;
                return (
                    <div
                        key={`win-${key}`}
                        style={Object.assign(
                            {},
                            { zIndex: windows[key].zIndex },
                            windows[key].minimized && styles.minimized
                        )}
                    >
                        {React.cloneElement(element, {
                            key,
                            onInteract: () => onWindowInteract(key),
                            onClose: () => removeWindow(key),
                        })}
                    </div>
                );
            })}
            <div style={styles.shortcuts}>
                {shortcuts.map((shortcut, i) => {
                    return (
                        <div
                            style={Object.assign({}, styles.shortcutContainer, {
                                top: i * 104,
                            })}
                            key={shortcut.shortcutName}
                        >
                            <DesktopShortcut
                                icon={shortcut.icon}
                                shortcutName={shortcut.shortcutName}
                                onOpen={shortcut.onOpen}
                            />
                        </div>
                    );
                })}
            </div>
            <Toolbar
                windows={windows}
                toggleMinimize={toggleMinimize}
                onCloseWindow={removeWindow}
                shutdown={startShutdown}
                openTerminal={openTerminal}
            />
            <ContextMenu
                onClose={() => {}}
                onOpenPortfolio={openPortfolioFromMenu}
                onOpenTerminal={openTerminalFromMenu}
                onOpenCredits={openCreditsFromMenu}
                onShutdown={startShutdown}
            />
        </div>
    ) : (
        <ShutdownSequence
            setShutdown={setShutdown}
            numShutdowns={numShutdowns}
        />
    );
};

const styles: StyleSheetCSS = {
    desktop: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: Colors.turquoise,
        backgroundImage: 'url(' + require('../../assets/pictures/forest-wallpaper.jpg') + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#1d2e2f',
    },
    shortcutContainer: {
        position: 'absolute',
    },
    shortcuts: {
        position: 'absolute',
        top: 16,
        left: 6,
    },
    minimized: {
        pointerEvents: 'none',
        opacity: 0,
    },
};

export default Desktop;
