import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export interface LanguageSelectorProps {}

const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div style={styles.container}>
            <button
                style={Object.assign({}, styles.button, language === 'en' && styles.active)}
                onClick={() => setLanguage('en')}
                title="English"
            >
                🇺🇸
            </button>
            <button
                style={Object.assign({}, styles.button, language === 'pt' && styles.active)}
                onClick={() => setLanguage('pt')}
                title="Português"
            >
                🇧🇷
            </button>
        </div>
    );
};

const styles: StyleSheetCSS = {
    container: {
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 10000,
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        fontSize: 32,
        cursor: 'pointer',
        border: '2px solid transparent',
        background: 'transparent',
        borderRadius: 4,
        padding: 4,
        transition: 'all 0.2s ease',
        opacity: 0.6,
    },
    active: {
        opacity: 1,
        border: '2px solid white',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
    },
};

export default LanguageSelector;
