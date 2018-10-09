import axios from "axios";

export default {
  // Gets all Articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the Articles with the given id
  getArticles: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the Articles with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a Articles to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
