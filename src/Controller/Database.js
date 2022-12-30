import { listNotes } from "../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../graphql/mutations";
import { API, Auth } from "aws-amplify";



export async function fetchNotes(setNotes) {
  var email = "";
  await Auth.currentUserInfo().then((user) => {
    email = user.attributes.email;
  });
  const apiData = await API.graphql({ query: listNotes });
  const notesFromAPI = apiData.data.listNotes.items;

  var sortedData = {};
  notesFromAPI.forEach((data) => {
    if (data.user == email) {
      if (data.category in sortedData) {
        sortedData[data.category].push(data);
      } else {
        sortedData[data.category] = [data];
      }
    }
  });
  console.log(sortedData);
  console.log("fetching");
  setNotes(sortedData);
}
export async function createNote(cate, tag, description) {
  var email = "";
  await Auth.currentUserInfo().then((user) => {
    email = user.attributes.email;
  });
  const data = {
    user: email,
    category: cate,
    key: tag,
    description: description,
  };
  await API.graphql({
    query: createNoteMutation,
    variables: { input: data },
  });
  // fetchNotes(setNotes);
}

// async function deleteNote({ id }) {
//     const newNotes = notes.filter((note) => note.id !== id);
//     setNotes(newNotes);
//     await API.graphql({
//       query: deleteNoteMutation,
//       variables: { input: { id } },
//     });
//   }
