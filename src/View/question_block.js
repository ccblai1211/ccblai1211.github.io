import { TextField } from "@aws-amplify/ui-react";
import React, { useState, useEffect, useRef } from "react";
import "../CSS/App.css";
import {fetchNotes} from"../Controller/Database.js"
import {InputController} from "../Controller/user_input"
import {SelectionController} from "../Controller/user_selection"

function DropDown(props) {

  const [expanded, setExpanded] = useState(false); // dropdown menu expand state
  const [popup, setPopup] = useState(false); // popup window enable state

  const inputController = InputController.get(props.cate);
  const selectionController = SelectionController.get(props.cate);
  
  var menuRef = useRef();
  useEffect(() => {
    
    // add ref to dropdown and target outside of dropdown to close dropdown
    var dropDownHandler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", dropDownHandler);
    return () => {
      document.removeEventListener("mousedown", dropDownHandler);
    };
  }, []);

  
  return (
    <div className="question" style={{ zIndex: props.precedence }}>
      {/* Category Title */}
      <p>{props.cate}</p> 
      <div className="dropdown" ref={menuRef}>
        <button
          className="dropdownButton"
          onClick={() => {
            setExpanded(!expanded);
          }}
          style={{ borderBottomColor: expanded ? "transparent" : "black" }}
        >
          {selectionController.selection}
        </button>

        <ListItems
          expanded={expanded}
          itemList = {props.itemList}
          selectionController = {selectionController}
          setExpanded={setExpanded}
          menuRef={menuRef}
          reload = {props.reload}
          setReload = {props.setReload}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="addOption"
          onClick={() => {
            setPopup(true);
          }}
        >
          Add {props.cate}
        </button>
      </div>
      <AddOptionWindow cate={props.cate} shown={popup} windowClose={setPopup} inputController = {inputController}
      setNotes = {props.setNotes} />
    </div>
  );
}

const ListItems = (props) => {
  return (
    <div
      className="dropdownMenu"
      style={{ visibility: props.expanded ? "visible" : "hidden" }}
    >
      {props.itemList.map((d, i) => (
        <button
          key={i}
          className="dropdownItem"
          onClick={(e) => {
            props.selectionController.setSelection(d.key, d.description)
            props.setExpanded(false);
            props.setReload(!props.reload)
          }}
        >
          {d.key}
        </button>
      ))}
    </div>
  );
};
// {cate, shown, windowClose, inputController, setNotes }
const AddOptionWindow = (props) => {

  return (
    <div
      className="grayScreen"
      style={{ display: props.shown ? "flex" : "none" }}
    >
      <div className="popupWindow">
        <button
          className="popupClose"
          onClick={() => {
            props.windowClose(false);
          }}>
          x
        </button>
        <h2>{props.cate}</h2>
        <div id="inputForms">
          <TextField variation="quiet" placeholder="tag" isRequired={true} onChange = {(e)=>{props.inputController.setTag(e.target.value)}}
          defaultValue = {props.inputController.tag}
          ></TextField>
          <TextField variation="quiet" placeholder="description" isRequired = {true}
          onChange = {(e)=>{props.inputController.setDescription(e.target.value)}}></TextField>
        </div>
        <button id = "submitButton" onClick={async ()=>{
            await props.inputController.submitToAWS();
            props.windowClose(false);
            fetchNotes(props.setNotes);
            
            }}>Submit</button>
      </div>
    </div>
  );
};

export default DropDown;
