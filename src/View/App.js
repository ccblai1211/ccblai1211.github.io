import React, { useState, useEffect, useRef } from "react";
import "../CSS/App.css";
import "@aws-amplify/ui-react/styles.css";
import DropDown from "./question_block.js";
import ResultBoard from "./ResultBoard";
import { API, Storage, Auth } from "aws-amplify";
import { ClipLoader } from "react-spinners";
import {
  Button,
  withAuthenticator,
} from "@aws-amplify/ui-react";

import { listNotes } from "../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../graphql/mutations";

import { fetchNotes, DatabaseController } from "../Controller/DatabaseController";


const App = ({ signOut }) => {
  var order = 199;
  var databaseController;
  const infoList = ["Name", "Address","Company Name", "Company Address", "Applying Position", "Job Platform", "Current Position", "Current Company", "Education", "Short Experience", "Company Information" , "My Goal", "Experience #1", "Experience #2", "Conclusion"];
  const [notes, setNotes] = useState({});
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Auth.currentUserInfo().then(async(user) => {
      databaseController = DatabaseController.get(user.attributes.email);
      databaseController.setup(setNotes, setLoading);
      await databaseController.fetchData();
    });

  }, []);

  

  return (
    <div className="half">
      <div className="userBoard">
        {infoList.map((attribute, i) => {
          return (
            <DropDown
              key={i}
              itemList={notes[attribute] == undefined ? [] : notes[attribute]}
              databaseController = {databaseController}
              cate={attribute}
              precedence={order--}
              setNotes={setNotes}
              reload={reload}
              setReload={setReload}
            />
            
          );
        })}
        <Button id="signOutButton" onClick={signOut}>
          Sign Out
        </Button>
        
      
      </div>
      <div className="board">
        <ResultBoard orderList = {infoList}/>
      </div>
      <LoadingScreen shown = {loading}/>
    </div>
  );
};

const LoadingScreen = (props)=>{
  return <div className="grayScreen"
  style={{ display: props.shown ? "flex" : "none" }}>
    <ClipLoader className = {"popupWindow"} color={"#36d7b7"} loading = {true}/>
  </div>
  
}

export default withAuthenticator(App);
