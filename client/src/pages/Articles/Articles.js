import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";


function searchNYT(topic,startYear,endYear) {

//did not get the api to work here
//get the articles using topic search and start and end date
//using the nytimes api
//save the articles using the API.saveArticle

//
//let authKey = "2df675ce8664464b9254cc94e75d523b"

//let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
//authKey + "&q=";

//let keyword = ""
//let amountPulled = 0;
//
// 
//$.ajax({
//  url: queryURL,
//    method: "GET"
//  }).done(function(data) {
//    console.log(data)
//      //article counting loop
//    for (let i = 0; i < recordNumber; i++){
//        let selection = $("<div>");
//        selection.addClass("well")
//        selection.attr("id", "article-well-" + recordNumber);
      

    }
 //   });
   
//}
//API.saveArticle({
//        topic: this.state.topic,
 //       startyear: this.state.url
 //     })
 //       .then(res => this.loadArticles())
  //      .catch(err => console.log(err));

class Articles extends Component {
  state = {
    articles: [],
    topic: "",
    startyear: "",
    endyear: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, topic: "", startyear: "", endyear: ""})
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startyear  && this.state.endyear) {
      searchNYT(this.state.topic,this.state.startyear)
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New York Times Article Scrubber</h1>
            </Jumbotron>
            <form>
              <h2>Search</h2>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="topic (required)"
              />
              <Input
                value={this.state.startyear}
                onChange={this.handleInputChange}
                name="startyear"
                placeholder="Startyear (required)"
              />
               <Input
                value={this.state.endyear}
                onChange={this.handleInputChange}
                name="endyear"
                placeholder="Endyear (required)"
              />
              <FormBtn
                disabled={!(this.state.startyear && this.state.topic && this.state.endyear)}
                onClick={this.handleFormSubmit}
              >
               Search
              </FormBtn>
              <br></br>
            </form>
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>

            <Jumbotron>
              <h1>Articles Saved</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(articles => (
                  <ListItem key={articles._id}>
                    <Link to={"/articles/" + articles._id}>
                      <strong>
                        {articles.title} by {articles.date}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(articles._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
         
        </Row>
      </Container>
    );
  }
}

export default Articles;
