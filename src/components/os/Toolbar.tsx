import React, { useEffect, useRef, useState } from 'react';

import { Icon } from '../general';
import TabContextMenu from './TabContextMenu';
// import { } from '../general';
// import Home from '../site/Home';
// import Window from './Window';

export interface ToolbarProps {
    windows: DesktopWindows;
    toggleMinimize: (key: string) => void;
    onCloseWindow: (key: string) => void;
    shutdown: () => void;
    openTerminal?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    windows,
    toggleMinimize,
    onCloseWindow,
    shutdown,
    openTerminal,
}) => {
    const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let mins = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + mins + ' ' + amPm;
        return strTime;
    };

    const [startWindowOpen, setStartWindowOpen] = useState(false);
    const lastClickInside = useRef(false);

    const [lastActive, setLastActive] = useState('');
    const [contextMenu, setContextMenu] = useState({
        isVisible: false,
        position: { x: 0, y: 0 },
        tabKey: ''
    });

    useEffect(() => {
        let max = 0;
        let k = '';
        Object.keys(windows).forEach((key) => {
            if (windows[key].zIndex >= max) {
                max = windows[key].zIndex;
                k = key;
            }
        });
        setLastActive(k);
    }, [windows]);

    const handleTabContextMenu = (e: React.MouseEvent, key: string) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
            isVisible: true,
            position: { x: e.clientX, y: e.clientY },
            tabKey: key
        });
    };

    const closeTab = () => {
        if (contextMenu.tabKey) {
            onCloseWindow(contextMenu.tabKey);
        }
        setContextMenu({ isVisible: false, position: { x: 0, y: 0 }, tabKey: '' });
    };

    const [time, setTime] = useState(getTime());

    const updateTime = () => {
        setTime(getTime());
        setTimeout(() => {
            updateTime();
        }, 5000);
    };

    useEffect(() => {
        updateTime();
    });

    const onCheckClick = () => {
        if (lastClickInside.current) {
            setStartWindowOpen(true);
        } else {
            setStartWindowOpen(false);
        }
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => {
            window.removeEventListener('mousedown', onCheckClick, false);
        };
    }, []);

    const onStartWindowClicked = () => {
        setStartWindowOpen(true);
        lastClickInside.current = true;
    };

    const toggleStartWindow = () => {
        if (!startWindowOpen) {
            lastClickInside.current = true;
        } else {
            lastClickInside.current = false;
        }
    };

    useEffect(() => {
        const handleClick = () => {
            setContextMenu({ isVisible: false, position: { x: 0, y: 0 }, tabKey: '' });
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setContextMenu({ isVisible: false, position: { x: 0, y: 0 }, tabKey: '' });
            }
        };

        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div style={styles.toolbarOuter}>
            {startWindowOpen && (
                <div
                    onMouseDown={onStartWindowClicked}
                    style={styles.startWindow}
                >
                    <div style={styles.startWindowInner}>
                        <div style={styles.verticalStartContainer}>
                            <p style={styles.verticalText}>DuckOS</p>
                        </div>
                        <div style={styles.startWindowContent}>
                            <div style={styles.startMenuSpace} />
                            {openTerminal && !windows['terminal'] && (
                                <>
                                    <div
                                        className="start-menu-option"
                                        style={styles.startMenuOption}
                                        onMouseDown={openTerminal}
                                    >
                                        <Icon
                                            style={styles.startMenuIcon}
                                            icon="terminal"
                                        />
                                        <p style={styles.startMenuText}>
                                            Terminal
                                        </p>
                                    </div>
                                    <div style={styles.startMenuLine} />
                                </>
                            )}
                            <div style={styles.startMenuLine} />
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                                onMouseDown={shutdown}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="computerBig"
                                />
                                <p style={styles.startMenuText}>
                                    Sh<u>u</u>t down...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div style={styles.toolbarInner}>
                <div style={styles.toolbar}>
                    <div
                        style={Object.assign(
                            {},
                            styles.startContainerOuter,
                            startWindowOpen && styles.activeTabOuter
                        )}
                        onMouseDown={toggleStartWindow}
                    >
                        <div
                            style={Object.assign(
                                {},
                                styles.startContainer,
                                startWindowOpen && styles.activeTabInner
                            )}
                        >
                            <Icon
                                size={18}
                                icon="duckLogo"
                                style={styles.startIcon}
                            />
                            <p className="toolbar-text" style={startWindowOpen ? { color: 'black' } : { color: 'var(--textcolor)' }}>Start</p>
                        </div>
                    </div>
                    <div style={styles.toolbarTabsContainer}>
                        {Object.keys(windows).map((key) => {
                            return (
                                <div
                                    key={key}
                                    style={Object.assign(
                                        {},
                                        styles.tabContainerOuter,
                                        lastActive === key &&
                                            !windows[key].minimized &&
                                            styles.activeTabOuter
                                    )}
                                    onMouseDown={() => toggleMinimize(key)}
                                    onContextMenu={(e) => handleTabContextMenu(e, key)}
                                >
                                    <div
                                        style={Object.assign(
                                            {},
                                            styles.tabContainer,
                                            lastActive === key &&
                                                !windows[key].minimized &&
                                                styles.activeTabInner
                                        )}
                                    >
                                        <Icon
                                            size={18}
                                            icon={windows[key].icon}
                                            style={styles.tabIcon}
                                        />
                                        <p style={Object.assign(
                                            {},
                                            styles.tabText,
                                            lastActive === key &&
                                                !windows[key].minimized &&
                                                { color: 'black' }
                                        )}>
                                            {windows[key].name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div style={styles.time}>
                    <Icon style={styles.volumeIcon} icon="volumeOn" />
                    <p style={styles.timeText}>{time}</p>
                </div>
            </div>
            <TabContextMenu
                onClose={() => setContextMenu({ isVisible: false, position: { x: 0, y: 0 }, tabKey: '' })}
                onTabClose={closeTab}
                position={contextMenu.position}
                isVisible={contextMenu.isVisible}
            />
        </div>
    );
};

const styles: StyleSheetCSS = {
    toolbarOuter: {
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 32,
        background: 'var(--background)',
        borderTop: `1px solid var(--background)`,
        zIndex: 100000,
    },
    verticalStartContainer: {
        // width: 30,
        height: '100%',
        background: 'var(--darkGray)',
    },
    verticalText: {
        fontFamily: 'Terminal',
        textOrientation: 'sideways',
        fontSize: 32,
        padding: 4,
        paddingBottom: 64,
        paddingTop: 8,
        letterSpacing: 1,
        color: 'var(--textcolor)',
        transform: 'scale(-1)',
        WebkitTransform: 'scale(-1)',
        MozTransform: 'scale(-1)',
        msTransform: 'scale(-1)',
        OTransform: 'scale(-1)',
        // @ts-ignore
        writingMode: 'tb-rl',
    },
    startWindowContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        // alignItems: 'flex-end',
    },
    startWindow: {
        position: 'absolute',
        bottom: 28,
        display: 'flex',
        flex: 1,
        width: 256,
        // height: 400,
        left: 4,
        boxSizing: 'border-box',
        border: `1px solid var(--border-light)`,
        borderBottomColor: 'var(--border-dark)',
        borderRightColor: 'var(--border-dark)',
        background: 'var(--background)',
    },
    activeTabOuter: {
        border: `1px solid var(--border-dark)`,
        borderBottomColor: 'var(--border-light)',
        borderRightColor: 'var(--border-light)',
    },
    startWindowInner: {
        border: `1px solid var(--background)`,
        borderBottomColor: 'var(--border-dark)',
        borderRightColor: 'var(--border-dark)',
        flex: 1,
    },
    startMenuIcon: {
        width: 32,
        height: 32,
    },
    startMenuText: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        marginLeft: 8,
    },
    startMenuOption: {
        alignItems: 'center',
        // flex: 1,
        height: 24,
        padding: 12,
    },
    startMenuSpace: {
        flex: 1,
    },
    startMenuLine: {
        height: 1,
        background: 'var(--border-light)',
        borderTop: `1px solid var(--border-dark)`,
    },
    activeTabInner: {
        border: `1px solid var(--border-dark)`,
        borderBottomColor: 'var(--border-light)',
        borderRightColor: 'var(--border-light)',
        backgroundImage: `linear-gradient(45deg, #DCCEA8 25%, transparent 25%),
        linear-gradient(-45deg,  #DCCEA8 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%,  #DCCEA8 75%),
        linear-gradient(-45deg, transparent 75%,  #DCCEA8 75%)`,
        backgroundSize: `4px 4px`,
        backgroundPosition: `0 0, 0 2px, 2px -2px, -2px 0px`,
        pointerEvents: 'none',
    },
    tabContainerOuter: {
        display: 'flex',
        flexShrink: 1,
        minWidth: 0,
        maxWidth: 200,
        cursor: 'pointer',
        border: `1px solid var(--border-light)`,
        borderBottomColor: 'var(--border-dark)',
        borderRightColor: 'var(--border-dark)',
        marginRight: 2,
    },
    tabContainer: {
        display: 'flex',
        border: `1px solid var(--background)`,
        borderBottomColor: 'var(--darkGray)',
        borderRightColor: 'var(--darkGray)',
        alignItems: 'center',
        paddingLeft: 4,
        paddingRight: 4,
        flex: 1,
        overflow: 'hidden',
    },
    tabIcon: {
        marginRight: 6,
    },
    startContainer: {
        alignItems: 'center',
        flexShrink: 1,
        // background: 'red',
        border: `1px solid var(--background)`,
        borderBottomColor: 'var(--border-dark)',
        borderRightColor: 'var(--border-dark)',
        padding: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    startContainerOuter: {
        marginLeft: 3,
        boxSizing: 'border-box',
        cursor: 'pointer',
        border: `1px solid var(--border-light)`,
        borderBottomColor: 'var(--border-dark)',
        borderRightColor: 'var(--border-dark)',
    },
    toolbarTabsContainer: {
        // background: 'blue',
        flexGrow: 1,
        flexShrink: 1,
        marginLeft: 4,
        marginRight: 4,
        overflow: 'hidden',
    },
    startIcon: {
        marginRight: 4,
    },
    toolbarInner: {
        borderTop: `1px solid var(--border-light)`,

        alignItems: 'center',
        flex: 1,
    },
    toolbar: {
        flexGrow: 1,
        width: '100%',
    },
    time: {
        flexShrink: 1,
        width: 86,
        height: 24,
        boxSizing: 'border-box',
        marginRight: 4,
        paddingLeft: 4,
        paddingRight: 4,
        border: `1px solid var(--border-light)`,
        borderTopColor: 'var(--border-dark)',

        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftColor: 'var(--border-dark)',
    },
    volumeIcon: {
        cursor: 'pointer',
        height: 18,
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        color: 'var(--textcolor)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    timeText: {
        fontSize: 12,
        fontFamily: 'MSSerif',
    },
};

export default Toolbar;