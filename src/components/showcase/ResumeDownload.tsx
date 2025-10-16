import React from 'react';
import printer from '../../assets/resume/printer.gif';
import { useLanguage } from '../../contexts/LanguageContext';

export interface ResumeDownloadProps {
    altText?: string;
}

const ResumeDownload: React.FC<ResumeDownloadProps> = ({ altText }) => {
    const { t } = useLanguage();

    // Use absolute URLs to ensure correct resolution when embedded in iframe
    const resumeBaseUrl = 'https://duckosport.github.io/duckosBACK.github.io';

    return (
        <div style={styles.resumeContainer}>
            <img style={styles.resumePrinter} alt="" src={printer} />
            <div style={styles.resumeContainerText}>
                <h3>{altText ? altText : t('resume.title')}</h3>
                <div style={styles.resumeLinks}>
                    <a rel="noreferrer" target="_blank" href={`${resumeBaseUrl}/Fernando_Bezerra_Resume_EN.pdf`} download style={styles.resumeLink}>
                        <p>📄 {t('resume.en')}</p>
                    </a>
                    <a rel="noreferrer" target="_blank" href={`${resumeBaseUrl}/Fernando_Bezerra_Resume_PT.pdf`} download style={styles.resumeLink}>
                        <p>📄 {t('resume.pt')}</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    resumeContainer: {
        backgroundColor: '#504945',
        padding: 12,
        boxSizing: 'border-box',
        border: '2px solid black',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        width: '100%',
        alignItems: 'center',
    },
    resumeContainerText: {
        flexDirection: 'column',
    },
    resumeLinks: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 8,
    },
    resumeLink: {
        textDecoration: 'none',
        color: 'blue',
    },
    resumePrinter: {
        width: 56,
        height: 48,
        paddingRight: 24,
    },
};

export default ResumeDownload;
