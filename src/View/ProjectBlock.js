import React from "react";
import { Link } from "react-router-dom";
// CSS
import "../CSS/style.css";
import "../CSS/wording.css";

const ProjectBlock = (props) => {
  return (
    <div className="summary-block">
      <div style={{ height: "35%" }}>
        <img src={props.image}></img>
      </div>
      <a href={props.link}>
          <h4>{props.title}</h4>
      </a>
      <div className = "flexText" >
        
        <p>{props.summary}</p>
      </div>
     
      <span >{"( "} <Link to = {`/${props.routeName}`}><span>read more</span></Link><span>{" )"}</span></span>
      
    </div>
  );
};

export default ProjectBlock;
