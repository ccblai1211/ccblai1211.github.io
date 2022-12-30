import React, { useState, useEffect, useRef } from "react";
import "../CSS/App.css";
import "@aws-amplify/ui-react/styles.css";
import DropDown from "./question_block.js";
import ResultBoard from "./ResultBoard";
import { API, Storage, Auth } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";

import { listNotes } from "../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../graphql/mutations";

import { fetchNotes } from "../Controller/Database";


const App = ({ signOut }) => {
  var order = 199;
  const infoList = ["Name", "Address"];
  const [notes, setNotes] = useState({});
  const [reload, setReload] = useState(false);
  useEffect(() => {
    fetchNotes(setNotes);
  }, []);

  return (
    <div className="half">
      <div className="userBoard">
        {infoList.map((attribute, i) => {
          console.log("reload dropdown")
          return (
            <DropDown
              key={i}
              itemList={notes[attribute] == undefined ? [] : notes[attribute]}
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
    </div>
  );

  // AWS default interface

  // const [notes, setNotes] = useState([]);
  // // console.log(notes)
  // useEffect(() => {
  //   fetchNotes();
  // }, []);
  // // Auth.currentUserInfo().then((user) => {console.log(user)})
  // async function fetchNotes() {
  //   const apiData = await API.graphql({ query: listNotes });
  //   const notesFromAPI = apiData.data.listNotes.items;
  //   setNotes(notesFromAPI);
  // }
  // async function createNote(event) {
  //   event.preventDefault();
  //   const form = new FormData(event.target);
  //   const data = {
  //     category: form.get("category"),
  //     key: form.get("key"),
  //     description: form.get("description"),
  //   };
  //   await API.graphql({
  //     query: createNoteMutation,
  //     variables: { input: data },
  //   });
  //   fetchNotes();
  //   event.target.reset();
  // }

  // async function deleteNote({ id }) {
  //   const newNotes = notes.filter((note) => note.id !== id);
  //   setNotes(newNotes);
  //   await API.graphql({
  //     query: deleteNoteMutation,
  //     variables: { input: { id } },
  //   });
  // }

  // return (
  //   <View className="App">
  //     <Heading level={1}>My Notes App</Heading>
  //     <View as="form" margin="3rem 0" onSubmit={createNote}>
  //       <Flex direction="row" justifyContent="center">
  //         <TextField
  //           name="category"
  //           placeholder="Category"
  //           label="Category"
  //           labelHidden
  //           variation="quiet"
  //           required
  //         />
  //         <TextField
  //           name="key"
  //           placeholder="Title"
  //           label="Title"
  //           labelHidden
  //           variation="quiet"
  //           required
  //         />
  //         <TextField
  //           name="description"
  //           placeholder="Description"
  //           label="Description"
  //           labelHidden
  //           variation="quiet"
  //           required
  //         />
  //         <Button type="submit" variation="primary">
  //           Create Note
  //         </Button>
  //       </Flex>
  //     </View>

  //     <Heading level={2}>Current Notes</Heading>

  //     <View margin="3rem 0">
  //       {notes.map((note) => (
  //         <Flex
  //           key={note.id || note.name}
  //           direction="row"
  //           justifyContent="center"
  //           alignItems="center"
  //         >
  //           <Text as="strong" fontWeight={700}>
  //             {note.category}
  //           </Text>
  //           <Text as="strong" fontWeight={700}>
  //             {note.key}
  //           </Text>
  //           <Text as="span">{note.description}</Text>
  //           <Button variation="link" onClick={() => deleteNote(note)}>
  //             Delete note
  //           </Button>
  //         </Flex>
  //       ))}
  //     </View>
  //     <Button onClick={signOut}>Sign Out</Button>
  //   </View>
  // );
};

export default withAuthenticator(App);
