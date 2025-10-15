import React, { useState, useEffect, MouseEvent } from 'react';

interface ContextMenuProps {
    onClose: () => void;
    onOpenPortfolio: () => void;
    onOpenTerminal: () => void;
    onOpenCredits: () => void;
    onShutdown: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
    onClose,
    onOpenPortfolio,
    onOpenTerminal,
    onOpenCredits,
    onShutdown
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleContextMenu = (e: Event) => {
            e.preventDefault();
            if ('clientX' in e && 'clientY' in e) {
                setPosition({ 
                    x: (e as unknown as MouseEvent).clientX, 
                    y: (e as unknown as MouseEvent).clientY 
                });
                setIsVisible(true);
            }
        };

        const handleClick = () => {
            setIsVisible(false);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsVisible(false);
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: position.y,
                left: position.x,
                zIndex: 10000,
                backgroundColor: 'var(--background)',
                border: '1px solid var(--lightGray)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                minWidth: '150px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    color: 'var(--textcolor)',
                    borderBottom: '1px solid var(--border-light)',
                    borderTopColor: 'var(--border-dark)',
                    fontFamily: 'MSSerif',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                onMouseDown={onOpenPortfolio}
            >
                Portfolio
            </div>
            <div
                style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    color: 'var(--textcolor)',
                    borderBottom: '1px solid var(--border-light)',
                    borderTopColor: 'var(--border-dark)',
                    fontFamily: 'MSSerif',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                onMouseDown={onOpenTerminal}
            >
                Terminal
            </div>
            <div
                style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    color: 'var(--textcolor)',
                    borderBottom: '1px solid var(--border-light)',
                    borderTopColor: 'var(--border-dark)',
                    fontFamily: 'MSSerif',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                onMouseDown={onOpenCredits}
            >
                Credits
            </div>
            <div
                style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    color: 'red',
                    fontFamily: 'MSSerif',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                onMouseDown={onShutdown}
            >
                Shutdown
            </div>
        </div>
    );
};

export default ContextMenu;