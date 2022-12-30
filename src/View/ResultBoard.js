import { TextAreaField } from "@aws-amplify/ui-react";
import React from "react";
import { SelectionController } from "../Controller/user_selection";

function ResultBoard(props) {
  var result = "";
  props.orderList.forEach((cate) => {
    console.log(cate);
    var selectionController = SelectionController.get(cate);
    result += selectionController.description;
    console.log(selectionController.description);
    console.log(result);
  });
  return (<div><p>{result}</p></div>);
  // return({SelectionControllerDistributor.selectionControllers.forEach((selection)=>(<p>{selection.description}</p>))});
}

export default ResultBoard;
