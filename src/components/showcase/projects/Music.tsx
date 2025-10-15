import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { VideoPlayer } from '../../general';
import { Link } from 'react-router-dom';

export interface MusicProjectsProps {}

const MusicProjects: React.FC<MusicProjectsProps> = (props) => {
    const { t } = useLanguage();
    const [currentVideo, setCurrentVideo] = useState<string>('');

    // Use videos from public folder to avoid webpack bundling issues with large files
    const autumnVideo = `${process.env.PUBLIC_URL}/videos/autumn.mp4`;
    const sambaVideo = `${process.env.PUBLIC_URL}/videos/samba.mp4`;
    const lucretiaVideo = `${process.env.PUBLIC_URL}/videos/lucretia.mp4`;

    return (
        <div className="site-page-content">
            <h1>{t('music.title')}</h1>
            <h3>{t('music.subtitle')}</h3>
            <br />

            <div className="text-block">
                <p>{t('music.intro.p1')}</p>
                <br />
                <p>{t('music.intro.p2')}</p>
                <br />
                <p>
                    {t('music.intro.p3.part1')}{' '}
                    <Link to="/projects/software" style={styles.link}>
                        {t('music.intro.p3.link')}
                    </Link>
                    {t('music.intro.p3.part2')}
                </p>
            </div>

            <h2>{t('music.autumn.title')}</h2>
            <br />
            <p>{t('music.autumn.desc')}</p>
            <br />

            <VideoPlayer
                src={autumnVideo}
                title="Autumn Leaves"
                subtitle="Fernando Bezerra - 2024"
                currentVideo={currentVideo}
                setCurrentVideo={setCurrentVideo}
            />

            <h2>{t('music.samba.title')}</h2>
            <br />
            <p>{t('music.samba.desc')}</p>
            <br />

            <VideoPlayer
                src={sambaVideo}
                title="Samba da Volta"
                subtitle="Fernando Bezerra - 2024"
                currentVideo={currentVideo}
                setCurrentVideo={setCurrentVideo}
            />

            <h2>{t('music.lucretia.title')}</h2>
            <br />
            <p>{t('music.lucretia.desc')}</p>
            <br />

            <VideoPlayer
                src={lucretiaVideo}
                title="Lucretia"
                subtitle="Fernando Bezerra - 2024"
                currentVideo={currentVideo}
                setCurrentVideo={setCurrentVideo}
            />

            <h2>{t('music.future.title')}</h2>
            <br />
            <p>{t('music.future.desc')}</p>
            <br />
        </div>
    );
};

const styles: StyleSheetCSS = {
    link: {
        color: '#0066cc',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
};

export default MusicProjects;
