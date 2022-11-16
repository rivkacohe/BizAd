import { Link } from "react-router-dom";
import Title from "../Title/Title";
import  "./About.css";

function About() {
    return (
    <>
     <Title text="About This App">
                <small>What makes BizAd the #1 app for advertising business</small>
            </Title>

            <div className="about">
                <p className="aboutP">
                Everyday many business owners choose to use our app to advertise their business and to gain more traction to their website and online store
                </p>
                <Link className="btn btn-primary btn-lg" to={"/"}>Start Today</Link>
            </div>
    </>  );
}

export default About;