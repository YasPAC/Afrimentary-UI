import "./about.css";
import {Header, Footer} from "../../../Components";
import aboutBg from "../../../assets/about-hero.webp";
import { DocTitle } from "../../../Utilities";

const About = () => {
    DocTitle("About Afrimentary - We aim to bridge the gap between researchers and the diverse communities across Africa")
    return (
        <main className="afrimentary__about">
            <Header />
            <div className="about__image">
                <img src={aboutBg} alt="afrimentary-about"/>
                <div className="image_dot one"></div>
                <div className="image_dot two"></div>
                <div className="image_dot three"></div>
            </div>
            <div className="about__intro">
                <div className="titles">
                    <p>
                        Afrimentary:
                    </p>
                </div>
                <div className="intro__light">
                    <p className="info__header">
                        Transforming the landscape of academic quantitative surveys and survey experiments in Africa.
                    </p>
                    <p>
                        Our online platform is dedicated to revolutionizing the connection between researchers and Africa-
                        based respondents, fostering a collaborative environment that drives valuable research and insights.
                        Whether you are a researcher in search of reliable and diverse respondents or an Africa-based 
                        individual interested in participating in cutting-edge research, 
                        Afrimentary is your gateway to meaningful collaboration.
                    </p>
                </div>
            </div>
            <div className="about__mission">
                <div className="mission__img">
                    <div className="why__title titles">
                        <p>
                            Our mission:
                        </p>
                    </div>
                </div>
                <div className="mission__info">
                    <p className="info__header">
                        Our mission is clear and impactful: we aim to bridge the gap between researchers 
                        and the diverse communities across Africa, providing a platform where both sides can come 
                        together to contribute and benefit from meaningful research.
                        
                    </p>
                    <div className="info__body">
                        <p>
                            Founded by a team of passionate 
                            African PhD students, Afrimentary was born out of the recognition of the need for a platform that would bridge this gap. By leveraging technology, data analytics, and a deep understanding of the African context, 
                            we are dedicated to empowering researchers and respondents alike.
                            What sets us apart is our commitment to recognizing the value of respondents' 
                            contributions. We believe in compensating respondents for their time and effort, 
                            ensuring that their valuable insights are acknowledged and rewarded.
                        </p>
                    </div>
                </div>
            </div>
            <div className="about__why">
                <div className="why__title titles">
                    <p>
                        Why Afrimentary:
                    </p>
                </div>
                <div className="why__info">
                    <p className="info__header">
                        Our firsthand experience enables us to create a platform that truly resonates 
                        with the African research community, 
                        providing an inclusive space for collaboration and innovation.
                    </p>
                    <div className="info__body">
                        Cultural sensitivity and contextual understanding are at the heart of what we do. 
                        As African PhD students ourselves, we intimately understand the unique dynamics, cultural nuances, 
                        and complexities of conducting research in Africa. We bring our deep-rooted knowledge, expertise, 
                        and commitment to the table, ensuring that Afrimentary is tailored to the specific needs of 
                        researchers and respondents in Africa. <br /><br />
                        We recognize the immense diversity within Africa, from its vibrant 
                        cultures and languages to its unique social and economic landscapes. Our platform enables 
                        researchers to tailor their surveys to specific regions and demographics, 
                        ensuring that the data collected accurately reflects the rich tapestry of African society.
                    </div>
                </div>
            </div>
            <div className="about__footer">
                <Footer />
            </div>
        </main>
    )
}

export default About;