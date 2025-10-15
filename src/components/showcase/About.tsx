import React from 'react';
import me from '../../assets/pictures/workingAtComputer.jpg';
import meNow from '../../assets/pictures/currentme.jpg';
import pfp from '../../assets/pictures/pfp.jpg';
import cafe from '../../assets/pictures/cafe.jpg';
import casal from '../../assets/pictures/casal.jpg';
import iot from '../../assets/pictures/iot.jpg';
import koshki from '../../assets/pictures/koshki.jpg';
import luna from '../../assets/pictures/luna.jpg';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';
import { useLanguage } from '../../contexts/LanguageContext';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    const { t } = useLanguage();

    return (
        // add on resize listener
        <div className="site-page-content">
            {/* <img src={me} style={styles.topImage} alt="" /> */}
            <h1 style={{ marginLeft: -16 }}>{t('home.welcome')}</h1>
            <h3>{t('home.title')}</h3>
            <br />
            <div className="text-block">
                <p>
                    {t('home.description')}
                </p>
                <br />
                <p>
                    {t('home.contact')}{' '}
                    <Link to="/contact">{t('home.form')}</Link> {t('home.or')}{' '}
                    <a href="mailto:fernando.devsolutions13@gmail.com">
                        fernando.devsolutions13@gmail.com
                    </a>
                </p>
            </div>
            <ResumeDownload />
            <div className="text-block">
                <h3>{t('about.title')}</h3>
                <br />
                <p>
                    {t('about.intro')}
                </p>
                <br />
                <div className="captioned-image">
                    <img src={pfp} style={styles.image} alt="" />
                    <p>
                        <sub>
                            <b>Figure 1:</b> Profile picture
                        </sub>
                    </p>
                </div>
                <br />
                <p>
                    {t('about.education')}
                </p>
                <br />
                <p>
                    {t('about.skills')}
                </p>
                <br />
                <h3>{t('about.hobbies')}</h3>
                <br />
                <p>
                    {t('about.hobbies.desc')}
                </p>
                <br />
                <p>
                    {t('about.hobbies.desc2')}
                </p>
                <br />
                <br />
                <p>
                    {t('about.thanks')}
                </p>
                <br />
                <p>
                    {t('about.reach')}{' '}
                    <Link to="/contact">{t('about.contact.page')}</Link> {t('home.or')}{' '}
                    <a href="mailto:fernando.devsolutions13@gmail.com">
                        fernando.devsolutions13@gmail.com
                    </a>
                </p>
            </div>

            <div className="text-block">
                <h3>{t('about.personal.title')}</h3>
                <br />

                <h4>{t('about.personal.coffee.title')}</h4>
                <br />
                <p>
                    {t('about.personal.coffee.desc')}
                </p>
                <br />
                <div className="captioned-image">
                    <img src={cafe} style={styles.image} alt="Coffee" />
                    <p>
                        <sub>
                            <b>Figure 2:</b> {t('about.personal.coffee.caption')}
                        </sub>
                    </p>
                </div>
                <br />

                <h4>{t('about.personal.gabriela.title')}</h4>
                <br />
                <p>
                    {t('about.personal.gabriela.desc')}
                </p>
                <br />
                <br />
                <div className="captioned-image">
                    <img src={casal} style={styles.image} alt="Gabriela and me" />
                    <p>
                        <sub>
                            <b>Figure 3:</b> {t('about.personal.gabriela.caption')}
                        </sub>
                    </p>
                </div>
                <br />

                <h4>{t('about.personal.hardware.title')}</h4>
                <br />
                <p>
                    {t('about.personal.hardware.desc')}
                </p>
                <br />
                <br />
                <div className="captioned-image">
                    <img src={iot} style={styles.image} alt="IoT and Hardware projects" />
                    <p>
                        <sub>
                            <b>Figure 4:</b> {t('about.personal.hardware.caption')}
                        </sub>
                    </p>
                </div>
                <br />

                <h4>{t('about.personal.cats.title')}</h4>
                <br />
                <p>
                    {t('about.personal.cats.desc')}
                </p>
                <br />
                <br />
                <div style={styles.catsContainer}>
                    <div className="captioned-image" style={styles.catImageWrapper}>
                        <img src={koshki} style={styles.catImage} alt="Koshki" />
                        <p>
                            <sub>
                                <b>Figure 5:</b> {t('about.personal.cats.koshki')}
                            </sub>
                        </p>
                    </div>
                    <div className="captioned-image" style={styles.catImageWrapper}>
                        <img src={luna} style={styles.catImage} alt="Luna" />
                        <p>
                            <sub>
                                <b>Figure 6:</b> {t('about.personal.cats.luna')}
                            </sub>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    contentHeader: {
        marginBottom: 16,
        fontSize: 48,
    },
    image: {
        width: '20%',
        aspectRatio: '1 / 1',
        objectFit: 'cover',
        display: 'block',
        margin: '0 auto',
    },
    topImage: {
        height: 'auto',
        width: '100%',
        marginBottom: 32,
    },
    verticalImage: {
        alignSelf: 'center',
        // width: '80%',
        marginLeft: 32,
        flex: 0.8,

        alignItems: 'center',
        // marginBottom: 32,
        textAlign: 'center',
        flexDirection: 'column',
    },
    catsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '16px',
        width: '100%',
    },
    catImageWrapper: {
        flex: 1,
        maxWidth: '50%',
    },
    catImage: {
        width: '40%',
        aspectRatio: '1 / 1',
        objectFit: 'cover',
        display: 'block',
        margin: '0 auto',
    },
};

export default About;
