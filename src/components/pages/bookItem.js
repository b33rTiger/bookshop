"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';
import {Image, Row, Col, Well, Button} from 'react-bootstrap';

class BookItem extends React.Component{
  handleCart(){
    const book = [...this.props.cart, {
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      images: this.props.images,
      price: this.props.price,
      quantity: 1
    }]
    if(this.props.cart.length > 0){
      let _id = this.props._id;
      let cartIndex = this.props.cart.findIndex(function(cart){
        return cart._id === _id;
      })
      if(cartIndex === -1){
        this.props.addToCart(book);
      } else {
        this.props.updateCart(_id, 1, this.props.cart);
      }
    } else {
      this.props.addToCart(book);
    }
  }

  render(){
    return(
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.images} responsive />
          </Col>
          <Col xs={6} sm={12}>
            <h6>{this.props.title}</h6>
            <p>{this.props.description}</p>
            <h6>${this.props.price}</h6>
            <Button
              bsStyle="primary"
              onClick={this.handleCart.bind(this)}
            >
              Buy Now
            </Button>
          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStateToProps(state){
  return{
    cart: state.cart.cart
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addToCart,
    updateCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
