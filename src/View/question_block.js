import { TextAreaField, TextField } from "@aws-amplify/ui-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { IconButton } from "rsuite";
import { Edit } from "@rsuite/icons";
import { DatabaseController } from "../Controller/DatabaseController.js";
import { SelectionController } from "../Controller/user_selection_controller";
import { ClipLoader } from "react-spinners";
import { Auth } from "aws-amplify";
import "../CSS/App.css";

function DropDown(props) {
  const [expanded, setExpanded] = useState(false); // dropdown menu expand state
  const [popup, setPopup] = useState({
    shown: false,
    submit: "none",
    item: { key: "", description: "" },
  }); // popup window enable state
  const [databaseController, setDatabaseController] = useState("");
  // const [ready, setReady] = useState(false);

  const selectionController = SelectionController.get(props.cate);

  var menuRef = useRef();
  useEffect(() => {
    Auth.currentUserInfo().then(async (user) => {
      setDatabaseController(DatabaseController.get(user.attributes.email));
    });
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

  return databaseController != "" ? (
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
          itemList={props.itemList}
          selectionController={selectionController}
          databaseController={databaseController}
          setExpanded={setExpanded}
          menuRef={menuRef}
          setNotes={props.setNotes}
          setPopup={setPopup}
          reload={props.reload}
          setReload={props.setReload}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="addOption"
          onClick={() => {
            setPopup({ shown: true, submit: "create", item: { key: "", description: "" } });
          }}
        >
          Add {props.cate}
        </button>
      </div>
      <AddOptionWindow
        cate={props.cate}
        shown={popup.shown}
        databaseController={databaseController}
        setPopup={setPopup}
        submit={popup.submit}
        item={popup.item}
        setNotes={props.setNotes}
      />
    </div>
  ) : (
    <LoadingScreen shown={true} />
  );
}

const ListItems = (props) => {
  return (
    <div
      className="dropdownMenu"
      style={{ visibility: props.expanded ? "visible" : "hidden" }}
    >
      {props.itemList.map((d, i) => (
        <ItemButton
          key={i}
          item={d}
          selectionController={props.selectionController}
          databaseController={props.databaseController}
          setExpanded={props.setExpanded}
          setPopup={props.setPopup}
          setNotes={props.setNotes}
          setReload={props.setReload}
          reload={props.reload}
        />
      ))}
    </div>
  );
};

const ItemButton = (props) => {
  return (
    <div className="twoButtonHolder">
      {/* item selection button */}
      <button
        className="dropdownItem"
        onClick={async (e) => {
          await props.selectionController.setSelection(
            props.item.key,
            props.item.description
          );
          props.setExpanded(false);
          props.setReload(!props.reload);
        }}
      >
        {props.item.key}
      </button>

      {/* item edition button */}
      <IconButton
        className="itemDelete"
        icon={<Edit />}
        color="cyan"
        appearance="primary"
        onClick={() => {
          props.setPopup({ shown: true, submit: "update", item: props.item });
        }}
      />

      {/* item deletion button */}
      <button
        className="itemDelete"
        onClick={async () => {
          await props.databaseController.deleteData(props.item);
        }}
      >
        {" "}
        x{" "}
      </button>
    </div>
  );
};
const AddOptionWindow = ({
  shown,
  setPopup,
  submit,
  databaseController,
  cate,
  item,
}) => {
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [initialized, setInitialized] = useState(false);
  // const [content, setContent] = useState({tag: "", description: ""});

  function handleTagChange(e) {
    setTag(e.target.value);
  }
  function handleDesChange(e) {
    setDescription(e.target.value);
  }
  
  function resetContent() {
    setTag("");
    setDescription("");
  }

  useEffect(() => {
    setTag(item.key);
    setDescription(item.description);
  }, [item]);

  return (
    <div className="grayScreen" style={{ display: shown ? "flex" : "none" }}>
      <div className="popupWindow">
        <button
          className="popupClose"
          onClick={() => {
            // resetContent();
            setPopup({
              shown: false,
              submit: "none",
              item: { key: "", description: "" },
            });
          }}
        >
          x
        </button>
        <h2 id="PopupWindowTitle">{cate}</h2>

        <TextField
          id="tagInput"
          variation="quiet"
          placeholder="tag"
          isRequired={true}
          value={tag}
          onChange={handleTagChange}
        ></TextField>
        <TextAreaField
          id="descriptionInput"
          placeholder="description"
          value={description}
          onChange={handleDesChange}
        ></TextAreaField>

        <button
          id="submitButton"
          onClick={async () => {
            if (submit == "create") {
              await databaseController.createData(cate, tag, description);
              // clear field
              // resetContent();
              setPopup({
                shown: false,
                submit: "none",
                item: { key: "", description: "" },
              });
            } else if (submit == "update") {
              await databaseController.updateData(item.id, tag, description);
              setPopup({
                shown: false,
                submit: "none",
                item: { key: "", description: "" },
              });
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const LoadingScreen = (props) => {
  return (
    <div
      className="grayScreen"
      style={{ display: props.shown ? "flex" : "none" }}
    >
      <ClipLoader className={"popupWindow"} color={"#36d7b7"} loading={true} />
    </div>
  );
};

export default DropDown;
