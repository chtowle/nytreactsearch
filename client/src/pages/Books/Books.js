import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Books extends Component {
  state = {
    books: [],
    topic: "",
    startyear: "",
    endyear: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, topic: "", startyear: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
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
    if (this.state.topic && this.state.startyear) {
      API.saveBook({
        topic: this.state.topic,
        startyear: this.state.startyear,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
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
                disabled={!(this.state.startyear && this.state.topic)}
                onClick={this.handleFormSubmit}
              >
               Search
              </FormBtn>
              <br></br>
            </form>
            <form>
              <h2><br></br>Results</h2>
              <h1>------------------------------------------</h1>
            </form>
            <form>
              <h2><br></br>Saved Searches</h2>
              <h1>------------------------------------------</h1>
            </form>
          </Col>
         
        </Row>
      </Container>
    );
  }
}

export default Books;
