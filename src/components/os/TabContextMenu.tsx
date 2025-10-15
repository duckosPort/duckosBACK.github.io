import React, { useState, useEffect, useRef } from 'react';

interface TabContextMenuProps {
    onClose: () => void;
    onTabClose: () => void;
    position: { x: number; y: number };
    isVisible: boolean;
}

const TabContextMenu: React.FC<TabContextMenuProps> = ({
    onClose,
    onTabClose,
    position,
    isVisible
}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [adjustedPosition, setAdjustedPosition] = useState(position);

    useEffect(() => {
        if (isVisible && menuRef.current) {
            const menuHeight = menuRef.current.offsetHeight;
            const menuWidth = menuRef.current.offsetWidth;
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            let newX = position.x;
            let newY = position.y;

            // Ajusta horizontalmente se sair da tela pela direita
            if (position.x + menuWidth > windowWidth) {
                newX = windowWidth - menuWidth - 5;
            }

            // Ajusta horizontalmente se sair da tela pela esquerda
            if (newX < 5) {
                newX = 5;
            }

            // Ajusta verticalmente - aparece para cima se estiver muito embaixo
            // Considera a barra de tarefas (32px de altura) + margem de segurança
            if (position.y + menuHeight > windowHeight - 40) {
                newY = position.y - menuHeight - 5;
            }

            // Garante que não saia pela parte de cima
            if (newY < 5) {
                newY = 5;
            }

            setAdjustedPosition({ x: newX, y: newY });
        }
    }, [position, isVisible]);

    if (!isVisible) return null;

    return (
        <div
            ref={menuRef}
            style={{
                position: 'fixed',
                top: adjustedPosition.y,
                left: adjustedPosition.x,
                zIndex: 10001,
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border-light)',
                borderTopColor: 'var(--border-dark)',
                borderRightColor: 'var(--border-dark)',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                minWidth: '100px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    padding: '6px 12px',
                    cursor: 'pointer',
                    color: 'red',
                    fontFamily: 'MSSerif',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                onMouseDown={onTabClose}
            >
                Close
            </div>
        </div>
    );
};

export default TabContextMenu;