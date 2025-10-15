import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

import girlRun from '../../../assets/pictures/projects/art/girl-run.gif';
import gsts from '../../../assets/pictures/projects/art/gsts.png';
import desenho1 from '../../../assets/pictures/art/desenho1.jpg';
import desenho2 from '../../../assets/pictures/art/desenho2.jpg';
import dnd from '../../../assets/pictures/art/dnd.jpg';
import edit from '../../../assets/pictures/art/edit.png';
import ui1 from '../../../assets/pictures/art/ui1.png';
import ui2 from '../../../assets/pictures/art/ui2.png';
import ui3 from '../../../assets/pictures/art/ui3.png';
import ui4 from '../../../assets/pictures/art/ui4.png';
import uiextra from '../../../assets/pictures/art/uiextra.png';

export interface ArtProjectsProps {}

const ArtProjects: React.FC<ArtProjectsProps> = (props) => {
    const { t } = useLanguage();

    return (
        <div className="site-page-content">
            <h1>{t('art.title')}</h1>
            <h3>{t('art.subtitle')}</h3>
            <br />

            <div className="text-block">
                <h2>{t('art.drawing.title')}</h2>
                <br />
                <p>
                    {t('art.drawing.desc')}
                </p>
                <br />
                <div className="captioned-image">
                    <img src={desenho1} style={styles.artImage} alt="Face sketch" />
                    <p>
                        <sub>
                            <b>Figure 2:</b> {t('art.drawing.figure2')}
                        </sub>
                    </p>
                </div>
                <br />
                <div className="captioned-image">
                    <img src={desenho2} style={styles.artImage} alt="Star Wars artwork" />
                    <p>
                        <sub>
                            <b>Figure 3:</b> {t('art.drawing.figure3')}
                        </sub>
                    </p>
                </div>
            </div>

            <div className="text-block">
                <h2>{t('art.rpg.title')}</h2>
                <br />
                <p>
                    {t('art.rpg.desc1')}
                </p>
                <br />
                <div className="captioned-image">
                    <img src={dnd} style={styles.artImage} alt="D&D themed art" />
                    <p>
                        <sub>
                            <b>Figure 4:</b> {t('art.rpg.figure4')}
                        </sub>
                    </p>
                </div>
                <br />
                <p>
                    {t('art.rpg.desc2')}
                </p>
                <br />
                <div className="captioned-image">
                    <img src={edit} style={styles.artImage} alt="Campaign visual edit" />
                    <p>
                        <sub>
                            <b>Figure 5:</b> {t('art.rpg.figure5')}
                        </sub>
                    </p>
                </div>
            </div>

            <div className="text-block">
                <h2>{t('art.ui.title')}</h2>
                <br />
                <p>
                    {t('art.ui.desc')}
                </p>
                <br />
                <div style={styles.uiGrid}>
                    <div className="captioned-image" style={styles.uiGridItem}>
                        <img src={ui1} style={styles.uiImage} alt="UI Design 1" />
                        <p>
                            <sub>
                                <b>Figure 6:</b> {t('art.ui.figure6')}
                            </sub>
                        </p>
                    </div>
                    <div className="captioned-image" style={styles.uiGridItem}>
                        <img src={ui2} style={styles.uiImage} alt="UI Design 2" />
                        <p>
                            <sub>
                                <b>Figure 7:</b> {t('art.ui.figure7')}
                            </sub>
                        </p>
                    </div>
                    <div className="captioned-image" style={styles.uiGridItem}>
                        <img src={ui3} style={styles.uiImage} alt="UI Design 3" />
                        <p>
                            <sub>
                                <b>Figure 8:</b> {t('art.ui.figure8')}
                            </sub>
                        </p>
                    </div>
                    <div className="captioned-image" style={styles.uiGridItem}>
                        <img src={ui4} style={styles.uiImage} alt="UI Design 4" />
                        <p>
                            <sub>
                                <b>Figure 9:</b> {t('art.ui.figure9')}
                            </sub>
                        </p>
                    </div>
                </div>
                <br />
                <div className="captioned-image">
                    <img src={uiextra} style={styles.uiImageCenter} alt="UI Design Extra" />
                    <p>
                        <sub>
                            <b>Figure 10:</b> {t('art.ui.figure10')}
                        </sub>
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    artImage: {
        width: '60%',
        height: 'auto',
        display: 'block',
        margin: '0 auto',
    },
    uiGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '32px',
        width: '60%',
        margin: '0 auto',
        marginBottom: '32px',
    },
    uiGridItem: {
        margin: '0',
    },
    uiImage: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
    uiImageCenter: {
        width: '30%',
        height: 'auto',
        display: 'block',
        margin: '0 auto',
    },
};

export default ArtProjects;
