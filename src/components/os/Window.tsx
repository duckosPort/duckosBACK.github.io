import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IconName } from '../../assets/icons';

import Icon from '../general/Icon';
import Button from './Button';
import DragIndicator from './DragIndicator';
import ResizeIndicator from './ResizeIndicator';

export interface WindowProps {
    closeWindow: () => void;
    minimizeWindow: () => void;
    onInteract: () => void;
    width: number;
    height: number;
    top: number;
    left: number;
    windowTitle?: string;
    bottomLeftText?: string;
    rainbow?: boolean;
    windowBarColor?: string;
    windowBarIcon?: IconName;
    onWidthChange?: (width: number) => void;
    onHeightChange?: (height: number) => void;
}

const Window: React.FC<WindowProps> = (props) => {
    const windowRef = useRef<any>(null);
    const dragRef = useRef<any>(null);
    const contentRef = useRef<any>(null);

    const dragProps = useRef<{
        dragStartX: any;
        dragStartY: any;
    }>();

    const resizeRef = useRef<any>(null);

    const [top, setTop] = useState(props.top);
    const [left, setLeft] = useState(props.left);

    const lastClickInside = useRef(false);

    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);

    const [contentWidth, setContentWidth] = useState(props.width);
    const [contentHeight, setContentHeight] = useState(props.height);

    const [windowActive, setWindowActive] = useState(true);

    const [isMaximized, setIsMaximized] = useState(false);
    const [preMaxSize, setPreMaxSize] = useState({
        width,
        height,
        top,
        left,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isResizingTop, setIsResizingTop] = useState(false);

    const resizeTopRef = useRef<{ startY: number; startTop: number; startHeight: number }>();

    const startResize = (event: any) => {
        event.preventDefault();
        setIsResizing(true);
        window.addEventListener('mousemove', onResize);
        window.addEventListener('mouseup', stopResize);
    };

    const onResize = ({ clientX, clientY }: any) => {
        const curWidth = clientX - left;
        const curHeight = clientY - top;
        if (curWidth > 520) resizeRef.current.style.width = `${curWidth}px`;
        if (curHeight > 220) resizeRef.current.style.height = `${curHeight}px`;
        resizeRef.current.style.opacity = 1;
    };

    const stopResize = () => {
        setIsResizing(false);
        if (resizeRef.current) {
            setWidth(parseInt(resizeRef.current.style.width) || width);
            setHeight(parseInt(resizeRef.current.style.height) || height);
            resizeRef.current.style.opacity = 0;
        }
        window.removeEventListener('mousemove', onResize);
        window.removeEventListener('mouseup', stopResize);
    };

    const startResizeTop = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        setIsResizingTop(true);
        resizeTopRef.current = {
            startY: event.clientY,
            startTop: top,
            startHeight: parseInt(height.toString()),
        };
        window.addEventListener('mousemove', onResizeTop);
        window.addEventListener('mouseup', stopResizeTop);
    };

    const onResizeTop = ({ clientY }: any) => {
        if (!resizeTopRef.current) return;
        const { startY, startTop, startHeight } = resizeTopRef.current;
        const deltaY = clientY - startY;
        const newTop = startTop + deltaY;
        const newHeight = startHeight - deltaY;

        if (newHeight > 220) {
            setTop(newTop);
            setHeight(newHeight);
        }
    };

    const stopResizeTop = () => {
        setIsResizingTop(false);
        window.removeEventListener('mousemove', onResizeTop);
        window.removeEventListener('mouseup', stopResizeTop);
    };

    const startDrag = (event: any) => {
        const { clientX, clientY } = event;
        setIsDragging(true);
        event.preventDefault();
        dragProps.current = {
            dragStartX: clientX,
            dragStartY: clientY,
        };
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDrag);
    };

    const onDrag = ({ clientX, clientY }: any) => {
        let { x, y } = getXYFromDragProps(clientX, clientY);
        
        // Aplicar limites de colisão
        const boundedX = Math.max(0, Math.min(x, window.innerWidth - width));
        const boundedY = Math.max(0, Math.min(y, window.innerHeight - height));
        
        if (dragRef.current) {
            dragRef.current.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
            dragRef.current.style.opacity = 1;
        }
    };

    const stopDrag = ({ clientX, clientY }: any) => {
        setIsDragging(false);
        const { x, y } = getXYFromDragProps(clientX, clientY);
        
        // Aplicar limites de colisão
        const boundedX = Math.max(0, Math.min(x, window.innerWidth - width));
        const boundedY = Math.max(0, Math.min(y, window.innerHeight - height));
        
        setTop(boundedY);
        setLeft(boundedX);
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDrag);
    };

    const getXYFromDragProps = (
        clientX: number,
        clientY: number
    ): { x: number; y: number } => {
        if (!dragProps.current) return { x: 0, y: 0 };
        const { dragStartX, dragStartY } = dragProps.current;

        const x = clientX - dragStartX + left;
        const y = clientY - dragStartY + top;

        return { x, y };
    };

    useEffect(() => {
        dragRef.current.style.transform = `translate(${left}px, ${top}px)`;
    });

    useEffect(() => {
        props.onWidthChange && props.onWidthChange(contentWidth);
    }, [props.onWidthChange, contentWidth]); // eslint-disable-line

    useEffect(() => {
        props.onHeightChange && props.onHeightChange(contentHeight);
    }, [props.onHeightChange, contentHeight]); // eslint-disable-line

    useEffect(() => {
        setContentWidth(contentRef.current.getBoundingClientRect().width);
    }, [width]);

    useEffect(() => {
        setContentHeight(contentRef.current.getBoundingClientRect().height);
    }, [height]);

    const maximize = () => {
        if (isMaximized) {
            setWidth(preMaxSize.width);
            setHeight(preMaxSize.height);
            setTop(preMaxSize.top);
            setLeft(preMaxSize.left);
            setIsMaximized(false);
        } else {
            setPreMaxSize({
                width,
                height,
                top,
                left,
            });
            setWidth(window.innerWidth);
            setHeight(window.innerHeight - 32);
            setTop(0);
            setLeft(0);
            setIsMaximized(true);
        }
    };

    const onCheckClick = () => {
        if (lastClickInside.current) {
            setWindowActive(true);
        } else {
            setWindowActive(false);
        }
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => {
            window.removeEventListener('mousedown', onCheckClick, false);
        };
    }, []);

    const onWindowInteract = () => {
        props.onInteract();
        setWindowActive(true);
        lastClickInside.current = true;
    };

    return (
        <div onMouseDown={onWindowInteract} style={styles.container}>
            <div
                style={Object.assign({}, styles.window, {
                    width,
                    height,
                    top,
                    left,
                })}
                ref={windowRef}
            >
                <div
                    style={styles.resizeTopHitbox}
                    onMouseDown={startResizeTop}
                ></div>
                <div style={styles.windowBorderOuter}>
                    <div style={styles.windowBorderInner}>
                        <div
                            style={styles.dragHitbox}
                            onMouseDown={startDrag}
                        ></div>
                        <div
                            className={props.rainbow ? 'rainbow-wrapper' : ''}
                            style={Object.assign(
                                {},
                                styles.topBar,
                                props.windowBarColor && {
                                    backgroundColor: props.windowBarColor,
                                },
                                !windowActive && {
                                    backgroundColor: '#32302f',
                                }
                            )}
                        >
                            <div style={styles.windowHeader}>
                                {props.windowBarIcon ? (
                                    <Icon
                                        icon={props.windowBarIcon}
                                        style={Object.assign(
                                            {},
                                            styles.windowBarIcon,
                                            !windowActive && { opacity: 0.5 }
                                        )}
                                        size={16}
                                    />
                                ) : (
                                    <div style={{ width: 16 }} />
                                )}
                                <p
                                    style={
                                        windowActive
                                            ? {}
                                            : { color: '#928374' }
                                    }
                                    className="showcase-header"
                                >
                                    {props.windowTitle}
                                </p>
                            </div>
                            <div style={styles.windowTopButtons}>
                                <Button
                                    icon="minimize"
                                    onClick={props.minimizeWindow}
                                />
                                <Button icon="maximize" onClick={maximize} />
                                <div style={{ paddingLeft: 2 }}>
                                    <Button
                                        icon="close"
                                        onClick={props.closeWindow}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            style={Object.assign({}, styles.contentOuter, {
                                // zIndex: isDragging || isResizing ? 0 : 100,
                            })}
                        >
                            <div style={styles.contentInner}>
                                <div style={styles.content} ref={contentRef}>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                        <div
                            onMouseDown={startResize}
                            style={styles.resizeHitbox}
                        ></div>
                        <div style={styles.bottomBar}>
                            <div
                                style={Object.assign({}, styles.insetBorder, {
                                    flex: 5 / 7,
                                    alignItems: 'center',
                                })}
                            >
                                <p
                                    style={{
                                        fontSize: 12,
                                        marginLeft: 4,
                                        fontFamily: 'MSSerif',
                                    }}
                                >
                                    {props.bottomLeftText}
                                </p>
                            </div>
                            <div
                                style={Object.assign(
                                    {},
                                    styles.insetBorder,
                                    styles.bottomSpacer
                                )}
                            />
                            <div
                                style={Object.assign(
                                    {},
                                    styles.insetBorder,
                                    styles.bottomSpacer
                                )}
                            />
                            <div
                                style={Object.assign(
                                    {},
                                    styles.insetBorder,
                                    styles.bottomResizeContainer
                                )}
                            >
                                <div
                                    style={{
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <Icon size={12} icon="windowResize" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={
                    !isResizing
                        ? {
                              zIndex: -10000,
                              pointerEvents: 'none',
                          }
                        : {
                              zIndex: 1000,
                              cursor: 'nwse-resize',
                              mixBlendMode: 'difference',
                          }
                }
            >
                <ResizeIndicator
                    top={top}
                    left={left}
                    width={width}
                    height={height}
                    resizeRef={resizeRef}
                />
            </div>
            <div
                style={
                    !isDragging
                        ? {
                              zIndex: -10000,
                              pointerEvents: 'none',
                          }
                        : {
                              zIndex: 1000,
                              cursor: 'move',
                              mixBlendMode: 'difference',
                          }
                }
            >
                <DragIndicator
                    width={width}
                    height={height}
                    dragRef={dragRef}
                />
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    window: {
        backgroundColor: 'var(--background)',
        position: 'absolute',
    },
    dragHitbox: {
        position: 'absolute',
        width: 'calc(100% - 70px)',
        height: 48,
        zIndex: 10000,
        top: -8,
        left: -4,
        cursor: 'move',
    },
    resizeTopHitbox: {
        position: 'absolute',
        width: '100%',
        height: 8,
        zIndex: 10002,
        top: -4,
        left: 0,
        cursor: 'ns-resize',
        backgroundColor: 'rgba(192, 192, 192, 0.6)', // Indicador visual cinza claro
    },
    windowBorderOuter: {
        border: `1px solid var(--darkGray)`,
        borderTopColor: 'var(--background)',
        borderLeftColor: 'var(--background)',
        flex: 1,
    },
    windowBorderInner: {
        border: `1px solid var(--darkGray)`,
        borderTopColor: 'var(--lightGray)',
        borderLeftColor: 'var(--lightGray)',
        flex: 1,
        padding: 2,

        flexDirection: 'column',
    },
    resizeHitbox: {
        position: 'absolute',
        width: 60,
        height: 60,
        bottom: -20,
        right: -20,
        cursor: 'nwse-resize',
    },
    topBar: {
        backgroundColor: 'var(--background3)',
        width: '100%',
        height: 20,

        alignItems: 'center',
        paddingRight: 2,
        boxSizing: 'border-box',
    },
    contentOuter: {
        border: `1px solid var(--lightGray)`,
        borderTopColor: 'var(--darkGray)',
        borderLeftColor: 'var(--darkGray)',
        flexGrow: 1,

        marginTop: 8,
        marginBottom: 8,
        overflow: 'hidden',
    },
    contentInner: {
        border: `1px solid var(--background)`,
        borderTopColor: 'var(--darkGray)',
        borderLeftColor: 'var(--darkGray)',
        flex: 1,
        overflow: 'hidden',
    },
    content: {
        flex: 1,

        position: 'relative',
        // overflow: 'scroll',
        overflowX: 'hidden',
        backgroundColor: 'var(--background)',
    },
    bottomBar: {
        flexShrink: 1,
        width: '100%',
        height: 20,
    },
    bottomSpacer: {
        width: 16,
        marginLeft: 2,
    },
    insetBorder: {
        border: `1px solid var(--lightGray)`,
        borderTopColor: 'var(--darkGray)',
        borderLeftColor: 'var(--darkGray)',
        padding: 2,
    },
    bottomResizeContainer: {
        flex: 2 / 7,

        justifyContent: 'flex-end',
        padding: 0,
        marginLeft: 2,
    },
    windowTopButtons: {
        // zIndex: 10000,

        alignItems: 'center',
    },
    windowHeader: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    windowBarIcon: {
        paddingLeft: 4,
        paddingRight: 4,
    },
};

export default Window;