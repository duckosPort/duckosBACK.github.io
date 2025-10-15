import React from 'react';
import ResumeDownload from '../ResumeDownload';
import { useLanguage } from '../../../contexts/LanguageContext';
import { GitHubReadme } from '../../general';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    const { t } = useLanguage();

    return (
        <div className="site-page-content">
            <h1>{t('software.title')}</h1>
            <h3>{t('software.subtitle')}</h3>
            <br />
            <p>
                {t('software.description')}
            </p>
            <br />
            <ResumeDownload />
            <br />
            {/* Tone Key Reader */}
            <div className="text-block">
                <h2>{t('software.proj1.title')}</h2>
                <br />
                <p>{t('software.proj1.desc1')}</p>
                <br />
                <p>{t('software.proj1.desc2')}</p>
                <br />
                <GitHubReadme username="Nandobez" repo="Tone-Key-Reader" />
                <br />
                <h3>{t('software.links')}</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/Nandobez/Tone-Key-Reader"
                            style={{color: '#458588'}}
                        >
                            <p style={{color: '#458588'}}>
                                <b>[GitHub]</b> - Tone Key Reader Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            {/* Flappy Bird ML */}
            <div className="text-block">
                <h2>{t('software.proj2.title')}</h2>
                <br />
                <p>{t('software.proj2.desc1')}</p>
                <br />
                <p>{t('software.proj2.desc2')}</p>
                <br />
                <GitHubReadme username="Nandobez" repo="FlappyML" />
                <br />
                <h3>{t('software.links')}</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/Nandobez/FlappyML"
                            style={{color: '#458588'}}
                        >
                            <p style={{color: '#458588'}}>
                                <b>[GitHub]</b> - FlappyML Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            {/* Chat Server */}
            <div className="text-block">
                <h2>{t('software.proj3.title')}</h2>
                <br />
                <p>{t('software.proj3.desc1')}</p>
                <br />
                <GitHubReadme username="Nandobez" repo="Chat-Server-in-C" />
                <br />
                <h3>{t('software.links')}</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/Nandobez/Chat-Server-in-C"
                            style={{color: '#458588'}}
                        >
                            <p style={{color: '#458588'}}>
                                <b>[GitHub]</b> - Chat Server Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Gemini CLI */}
            <div className="text-block">
                <h2>{t('software.proj4.title')}</h2>
                <br />
                <p>{t('software.proj4.desc1')}</p>
                <br />
                <GitHubReadme username="Nandobez" repo="Gemini-CLI-Chat" />
                <br />
                <h3>{t('software.links')}</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/Nandobez/Gemini-CLI-Chat"
                            style={{color: '#458588'}}
                        >
                            <p style={{color: '#458588'}}>
                                <b>[GitHub]</b> - Gemini CLI Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Paint ESP32 */}
            <div className="text-block">
                <h2>{t('software.proj5.title')}</h2>
                <br />
                <p>{t('software.proj5.desc1')}</p>
                <br />
                <GitHubReadme username="Nandobez" repo="Paint-App-for-ESP32-CYD" />
                <br />
                <h3>{t('software.links')}</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/Nandobez/Paint-App-for-ESP32-CYD"
                            style={{color: '#458588'}}
                        >
                            <p style={{color: '#458588'}}>
                                <b>[GitHub]</b> - Paint ESP32 Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* YouTube Downloader */}
            <div className="text-block">
                <h2>{t('software.proj6.title')}</h2>
                <br />
                <p>{t('software.proj6.desc1')}</p>
                <br />
                <GitHubReadme username="Nandobez" repo="YT-Song-Downloader" />
                <br />
                <h3>{t('software.links')}</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/Nandobez/YT-Song-Downloader"
                            style={{color: '#458588'}}
                        >
                            <p style={{color: '#458588'}}>
                                <b>[GitHub]</b> - YT Song Downloader Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Polaroide */}
            <div className="text-block">
                <h2>{t('software.proj7.title')}</h2>
                <br />
                <p>{t('software.proj7.desc1')}</p>
                <br />
                <h3>{t('software.links')}</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://polaroide.vercel.app/"
                            style={{color: '#83a598'}}
                        >
                            <p>
                                <b>[Website]</b> - Polaroide
                            </p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Site do Pai */}
            <div className="text-block">
                <h2>{t('software.proj8.title')}</h2>
                <br />
                <p>{t('software.proj8.desc1')}</p>
                <br />
                <div style={styles.iframeContainer}>
                    <iframe
                        src="https://sergiomagalhaesautor.github.io/"
                        style={styles.iframe}
                        title="Sérgio Magalhães Author Website"
                        frameBorder="0"
                    />
                </div>
                <br />
                <h3>{t('software.links')}</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://sergiomagalhaesautor.github.io/"
                            style={{color: '#83a598'}}
                        >
                            <p>
                                <b>[Website]</b> - Sérgio Magalhães Autor
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <ResumeDownload />
        </div>
    );
};

const styles: StyleSheetCSS = {
    iframeContainer: {
        width: '100%',
        height: '600px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    iframe: {
        width: '100%',
        height: '100%',
        border: 'none',
    },
};

export default SoftwareProjects;
