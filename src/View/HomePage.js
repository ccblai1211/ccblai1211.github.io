import React, { useRef, createRef, useEffect, forwardRef } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Typed from "typed.js";
import useScrollBlock from "../utility/useScrollBlock";
import ProjectBlock from "./ProjectBlock";
import PortfolioController from "../Controller/portfolioController.js";
import {
  TextField,
  TextAreaField,
  Button,
  useTheme,
} from "@aws-amplify/ui-react";

// CSS
import "../CSS/style.css";
// import '@aws-amplify/ui-react/styles.css';
// images
import logo from "../asset/images/brian_logo_nameOnly.png";
import homePortrait from "../asset/images/home_portrait.png";
import introPortrait from "../asset/images/intro_portrait.png";
import TwitterIcon from "../asset/images/twitter_icon.png";
import GithubIcon from "../asset/images/github_icon.png";
// import FacebookIcon from "../asset/images/facebook_icon.png";
import LinkedinIcon from "../asset/images/linkedin_icon.png";
import GmailIcon from "../asset/images/gmail_icon.png";
import { border, borderRadius, fontSize, maxWidth } from "@mui/system";

const HomePage = () => {
  // define an element for animation typing text
  const el = useRef(null);
  const typed = useRef(null);
  // const [blockScroll, allowScroll] = useScrollBlock();

  const { tokens } = useTheme();
  const textFieldTheme = {
    backgroundColor: `${tokens.colors.neutral[80]}`,
    borderRadius: "10px",
    border: "",
    fontSize: "12pt",
    textAlign: "left",
    maxWidth: "300px",
    minWidth: "200px",
    margin: "10px auto 10px auto",
    placeholder: "white",
  };

  const textFieldAreaTheme = {
    backgroundColor: `${tokens.colors.neutral[80]}`,
    borderRadius: "10px",
    fontSize: "12pt",
    textAlign: "left",
    minWidth: "300px",
    maxWidth: "600px",
    margin: "10px auto 10px auto",
    height: "300px",
  };

  const portfolioController = new PortfolioController();

  // list of category appearing in the web page
  const pageRefs = {
    Home: useRef(null),
    "About Me": useRef(null),
    Portfolio: useRef(null),
    // Blog: useRef(null),
    "Contact Me": useRef(null),
  };

  // scroll to the top of a page
  const scrollToPage = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  // var lastKnownScrollPosition = 0;
  // var scrollDistance = 0;
  // var ticking = false;

  // const pageSwitch = (event) => {

  //   var scrollThreshold = window.innerHeight/2;

  //   if (!ticking) {
  //     window.requestAnimationFrame(() => {
  //       scrollDistance += window.scrollY - lastKnownScrollPosition;
  //       lastKnownScrollPosition = window.scrollY;
  //       // console.log(scrollDistance)
  //       if(scrollDistance >= scrollThreshold){
  //         scrollDistance = 0;
  //       }
  //       ticking = false;
  //     });

  //     ticking = true;
  //   }
  // };

  // const pageSwitch = (pageRef) => {}

  React.useEffect(() => {
    // setup data for animation text
    const options = {
      strings: [
        "Web Development",
        "IOS Mobile Development",
        "Android Mobile Development",
      ],
      typeSpeed: 50,
      backSpeed: 40,
      loop: true,
      loopCount: Infinity,
    };

    typed.current = new Typed(el.current, options);

    // window.addEventListener("scroll", pageSwitch);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();

      // window.removeEventListener("scroll", pageSwitch);
    };
  }, []);

  return (
    <>
      {/* Loader */}
      <div id="preloader">
        <div id="main-ld">
          <div id="loader"></div>
        </div>
      </div>
      {/* End loader */}
      {/* Navigation */}
      {/* <img src={homePortrait} alt="" width = {"100%"}/> */}

      {/* introduction page */}
      <Page key="Home" background={homePortrait} ref={pageRefs["Home"]}>
        <div>
          <div></div>
          <h1>Hi i'm Brian</h1>
          <h4> The Software Developer</h4>
          <h3>
            <span>specialized in </span>
            <span style={{ whiteSpace: "pre" }} ref={el} />
          </h3>
        </div>
      </Page>
      {/* Bio page */}
      <Page ref={pageRefs["About Me"]}>
        <div className="introContent">
          <div className="flexText">
            <h2>About me.</h2>
            <p>
              {" "}
              Full stack developer with experience in web development, IOS, and
              Android mobile development using Flutter and React.js. Reliable
              ability to deliver products from scratch, from framework design,
              UI&UX design, implementation, quality assurance, and to
              publication. Proficient with Front-end language and data
              visualization. In-depth understanding of SQLite and cloud-based
              storage using AWS. Affirmative reputation from colleagues, and
              always open to opportunities and challenges to develop and utilize
              my skills for good.{" "}
            </p>
          </div>

          <img
            className="profilePic"
            src={introPortrait}
            alt=""
            height="30%"
            width="30%"
          />
        </div>
      </Page>
      {/* Portfolio Page */}
      <Page ref={pageRefs["Portfolio"]}>
        <div className="portfolioPage">
          {Object.keys(portfolioController.projects).map((key, index) => {
            const projects = portfolioController.projects;
            return (
              <ProjectBlock
                key={index}
                image={projects[key].picture}
                title={projects[key].title}
                summary={projects[key].description}
                routeName={key}
              />
            );
          })}
        </div>
      </Page>
      {/* Blog Page */}
      {/* <Page ref={pageRefs["Blog"]}>Blog Page</Page> */}
      {/* Contact Page */}
      <Page ref={pageRefs["Contact"]}>
        <div className="half leftBox">
          <h2>Contact Me</h2>
          <TextField inputStyles={textFieldTheme} placeholder="Name" />
          <TextField inputStyles={textFieldTheme} placeholder="Email" />
          <TextAreaField
            inputStyles={textFieldAreaTheme}
            placeholder="message"
            width="75%"
          />
          <Button size="large" style={{margin: "10px 0 10px 0"}}>
            <h2 style={{color:"white",margin:"0" }}>Send</h2>
          </Button>
        </div>
        <div className="half">
          <ContactInfo
            image={TwitterIcon}
            urlAppear="@ccblai"
            url="https://twitter.com/ccblai"
          />
          <ContactInfo
            image={GithubIcon}
            urlAppear="https://github.com/ccblai1211"
            url="https://github.com/ccblai1211"
          />
          <ContactInfo
            image={LinkedinIcon}
            urlAppear="www.linkedin.com/in/brian-lai-ccb"
            url="http://linkedin.com/in/brian-lai-ccb"
          />
          <ContactInfo
            image={GmailIcon}
            urlAppear="ccblai1211@gmail.com"
            url="mailto:ccblai1211@gmail.com"
          />
        </div>
      </Page>

      {/* Navigation Bar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        id="mainNav"
      >
        <div className="navigationBar">
          {/* banner logo */}
          <a className="pointer-link">
            <img
              src={logo}
              alt=""
              onClick={() => scrollToPage(pageRefs["Home"])}
              width="100px"
            />
          </a>
          {/* Navigation buttons */}
          <ul className="rowItems navItems">
            {Object.keys(pageRefs).map((title, index) => (
              <li key={index} onClick={() => scrollToPage(pageRefs[title])}>
                <a className="pointer-link">{title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

const Page = forwardRef((props, ref) => {
  return (
    <div
      className="page"
      ref={ref}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${props.background})`,
      }}
    >
      {" "}
      {props.children}{" "}
    </div>
  );
});

const ContactInfo = (props) => {
  return (
    <div className="contactInfo">
      <img src={props.image}></img>
      <a href={props.url}>
        <p>{props.urlAppear}</p>
      </a>
    </div>
  );
};

export default HomePage;
