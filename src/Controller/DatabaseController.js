import { listNotes } from "../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
  updateNote as updateNoteMutation,
} from "../graphql/mutations";
import { API, Auth } from "aws-amplify";

export class DatabaseController {
  constructor(email) {
    this.email = email;
    this.ready = false;
  }

  static get(tag) {
    if (tag in DatabaseControllerDistributor.databaseControllers) {
      return DatabaseControllerDistributor.databaseControllers[tag];
    } else {
      DatabaseControllerDistributor.databaseControllers[tag] =
        new DatabaseController(tag);
      return DatabaseControllerDistributor.databaseControllers[tag];
    }
  }

  setup(setData, setLoading) {
    this.setData = setData;
    this.setLoading = setLoading;
    this.ready = true;
  }

  async fetchData() {
    this.setLoading(true);
    if (this.ready) {
      
      var email = "";
      await Auth.currentUserInfo().then((user) => {
        email = user.attributes.email;
      });
      const apiData = await API.graphql({ query: listNotes });
      const notesFromAPI = apiData.data.listNotes.items;

      var sortedData = {};
      notesFromAPI.forEach((data) => {
        if (data.user == this.email) {
          if (data.category in sortedData) {
            sortedData[data.category].push(data);
          } else {
            sortedData[data.category] = [data];
          }
        }
      });

      console.log("fetching");
      this.setData(sortedData);

    } else {
      throw new Error("Leak of setup of setData and setLoading");
    }
    this.setLoading(false);
  }

  async createData(cate, tag, description) {
    if (tag != "" && description != "") {
      this.setLoading(true);

      const data = {
        user: this.email,
        category: cate,
        key: tag,
        description: description,
      };
      await API.graphql({
        query: createNoteMutation,
        variables: { input: data },
      });
      await this.fetchData();
    }
  }
  async updateData(id,  tag, description){
    if (tag != "" && description != "") {
      
      this.setLoading(true);
      const data = {
        id:id,
        key:tag,
        description:description
      }
      await API.graphql({
        query:updateNoteMutation,
        variables : {input:data}
      })
      await this.fetchData();

    }
  }


  async deleteData({ id }) {
    this.setLoading(true);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });

    await this.fetchData();
  }
}

class DatabaseControllerDistributor {
  static databaseControllers = {};
}
