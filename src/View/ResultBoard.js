import { TextAreaField } from "@aws-amplify/ui-react";
import React from "react";
import { SelectionControllerDistributor } from "../Controller/user_selection_controller";
import { template } from "../Model/boardTemplate";

function ResultBoard() {
  return (
    <TextAreaField
      id="resultText"
      value={rephrase()}
      onChange={() => {}}
    ></TextAreaField>
  );
}

function rephrase() {
  var newResult = template;
  for (const selectionController in SelectionControllerDistributor.selectionControllers) {
    if (SelectionControllerDistributor.selectionControllers[selectionController].isSelected) {
      newResult = newResult.replaceAll(
        "$" + selectionController,
        SelectionControllerDistributor.selectionControllers[selectionController]
          .resultDescription
      );
    }
  }
  // console.log(newResult);
  return newResult;
}

export default ResultBoard;

//   var t =
// `Brian Lai
// 6401 Shellmound St. Apt.8207,
// Emeryville, CA, 94608

// 12/30/22

// Uber
// 1455 Market St. Ste 400,
// San Francisco, CA 94103

// Dear Hiring Manager,

// I am a recent graduate from UC Davis with Bachelor’s degree in Computer Science and months of experience in Full Stack Mobile and Web Application Development at New Mexico State University writing to apply for the position of Mobile Software Engineer I found advertised on Indeed. Uber is well renowned for delivery service with modern technology in mobile platforms, and Uber Eats provides exceptional food delivery services for customers through user-friendly UI and advanced algorithms that bring efficiency to merchants and drivers to process orders. Uber Eats applications including three parts, customer, restaurant, and delivery, need to focus on different goals to engage more users as well as ensure completeness of orders. My past education and work experiences have prepared me with advanced skills of mobile application development, creative&complex problem solving, and efficient commutative ability to be successful at Uber.

// My last experience in full stack software engineering at NMSU allows me to build applications from scratch confidently or conduct certain tasks, including UI&UX design, framework design, constructing local and cloud databases, implementation of API, data visualization, quality Assurance, documentation, and publication. I collaborated with medical professionals and two first-year developers to deploy a predicting model with intuitive UI&UX and creative data visualization, and my main task was to build and publish mobile and web applications from 0 to 1. During my development, I learned to conduct tasks more efficiently through efficient communication, speaking the common language by visualization and datalization of my presentation. The key for me to deliver the final product is constant self-improvement because I kept picking up a new framework and innovative techniques to deploy, which enhances the performance of the product.

// College education develops my hard skills including computational thinking and problem-solving. During my time at CC, I constructed an understanding of object-oriented programing, and while studying at UC Davis, I was introduced to advanced algorithms and theories in relevant fields. I have conducted many projects which allow me to exert my knowledge and skill; fixing many inefficiencies and invalidations in the projects strengthened my problem-solving skills as well as my computational thinking.

// The Mobile Software Engineer position aligns with my goals of being a contributor to society by creating the most useful and outstanding product that benefits users. I look forward to using my skills in full-stack development, creative&complex problem solving, and efficient commutative ability to contribute to the software development at Uber. I look forward to speaking to you about this exciting position. I can be contacted by phone at 5102400585 or by ccblai1211@gmail.com; work reference is available upon request.

// Sincerely,

// Brian Lai`
