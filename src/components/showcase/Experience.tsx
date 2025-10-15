import React from 'react';
import ResumeDownload from './ResumeDownload';
import { useLanguage } from '../../contexts/LanguageContext';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    const { t } = useLanguage();

    return (
        <div className="site-page-content">
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>{t('exp.doctor.title')}</h1>
                        <h4>Fortaleza, Brazil</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>{t('exp.doctor.role')}</h3>
                        <b>
                            <p>{t('exp.doctor.date')}</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    {t('exp.doctor.desc')}
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            {t('exp.doctor.1')}
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('exp.doctor.2')}
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('exp.doctor.3')}
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('exp.doctor.4')}
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('exp.doctor.5')}
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>{t('exp.lapin.title')}</h1>
                        <h4>UNIFOR - Fortaleza, Brazil</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>{t('exp.lapin.role')}</h3>
                        <b>
                            <p>{t('exp.lapin.date')}</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    {t('exp.lapin.desc')}
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            {t('exp.lapin.1')}
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('exp.lapin.2')}
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('exp.lapin.3')}
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('exp.lapin.4')}
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>{t('exp.academic.title')}</h1>
                        <h4>UNIFOR - Fortaleza, Brazil</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>{t('exp.academic.role')}</h3>
                        <b>
                            <p>{t('exp.academic.date')}</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    {t('exp.academic.desc')}
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            {t('exp.academic.1')}
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('exp.academic.2')}
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('exp.academic.3')}
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('exp.academic.4')}
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('exp.academic.5')}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    skillRow: {
        flex: 1,
        justifyContent: 'space-between',
    },
    skillName: {
        minWidth: 56,
    },
    skill: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        background: 'red',
        marginLeft: 8,
        height: 8,
    },
    hoverLogo: {
        height: 32,
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    hoverText: {
        marginBottom: 8,
    },
    indent: {
        marginLeft: 24,
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export default Experience;
