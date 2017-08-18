"use strict";
import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks, getBooks, resetButton} from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends React.Component{
  constructor(){
    super();
    this.state = {
      images:[{}],
      img:''
    }
  }

  componentDidMount(){
    this.props.getBooks();
    //GET IMAGES FROM API
    axios.get('/api/images')
      .then(function(response){
      this.setState({images:response.data});
      }.bind(this))
      .catch(function(err){
        this.setState({images:'error loadingimage files from the server', img:''})
      }.bind(this))
  }

  handleSubmit(){
    const book=[{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      images: findDOMNode(this.refs.image).value,
      price: findDOMNode(this.refs.price).value,
    }]
    this.props.postBooks(book);
  }

  onDelete(){
    let bookId = findDOMNode(this.refs.delete).value;
    this.props.deleteBooks(bookId);
   }

   handleSelect(img){
     this.setState({
       img: '/images/' + img
     })
   }

   resetForm(){
     this.props.resetButton();
     findDOMNode(this.refs.title).value = '';
     findDOMNode(this.refs.description).value = '';
     findDOMNode(this.refs.price).value = '';
     this.setState({img: ''});
   }


  render(){

    const booksList = this.props.books.map(function(booksArr){
      return (
        <option key={booksArr._id}> {booksArr._id} </option>
      )
    })

    const imgList = this.state.images.map(function(imgArr, i){
      return(
        <MenuItem
          key={i}
          eventKey={imgArr.name}
          onClick={this.handleSelect.bind(this, imgArr.name)}
        >
          {imgArr.name}
        </MenuItem>
      )
    }, this)

    return(
      <Well>
        <Row>
          <Col xs={12} sm={6} lg={6}>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image" value={this.state.img} />
                  <DropdownButton
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title="Select an image"
                    bsStyle="primary"
                  >
                    {imgList}
                  </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
            </Panel>
          </Col>
          <Col xs={12} sm={6} lg={6}>
            <Panel>
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Title"
                  ref="title"
                />
              </FormGroup>
              <FormGroup controlId="description">
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Description"
                  ref="description"
                />
              </FormGroup>
              <FormGroup controlId="price">
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Price"
                  ref="price"
                />
              </FormGroup>
              <Button
                bsStyle={(!this.props.style)?("primary"):(this.props.style)}
                onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
              >
                {(!this.props.msg)?("Save Book"):(this.props.msg)}
              </Button>
            </Panel>
            <Panel className="select-book">
              <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select a book to delete</ControlLabel>
              <FormControl ref="delete" componentClass="select" placeholder="select">
                <option value="select">select</option>
                  {booksList}
              </FormControl>
            </FormGroup>
            <Button
              bsStyle="danger"
              onClick={this.onDelete.bind(this)}
            >
              Delete Book
            </Button>
            </Panel>
          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    postBooks,
    deleteBooks,
    getBooks,
    resetButton
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
