"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';

class Cart extends React.Component{

  onDelete(_id){
    const currentBookToDelete = this.props.cart;
    const indexToDelete = currentBookToDelete.findIndex(
      function(cart){
        return cart._id === _id;
      }
    )
    let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),
    ...currentBookToDelete.slice(indexToDelete + 1)]
    this.props.deleteCartItem(cartAfterDelete);
  }

  onIncrement(_id){
    this.props.updateCart(_id, 1);
  }

  onDecrement(_id, quantity){
    if(quantity > 1){
      this.props.updateCart(_id, -1);
    }
  }

  constructor(){
    super();
    this.state = {
      showModal: false
    }
  }

  open(){
    this.setState({showModal: true})
  }

  close(){
    this.setState({showModal: false})
  }

  render(){
    if(this.props.cart[0]){
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
  renderEmpty(){
    return(<div></div>)
  }
  renderCart(){
    const cartItemsList = this.props.cart.map(function(cartArr){
      return(
        <Panel key={cartArr._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6><span>    </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>${cartArr.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>Qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6><span>    </span>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup className="cart-btn-group">
                <Button
                  bsStyle="default"
                  bsSize="small"
                  onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}
                >
                  -
                </Button>
                <Button
                  className="cart-plus"
                  bsStyle="default"
                  bsSize="small"
                  onClick={this.onIncrement.bind(this, cartArr._id)}
                >
                  +
                </Button>
                <span>     </span>
                <Button
                  bsStyle="danger"
                  bsSize="small"
                  onClick={this.onDelete.bind(this, cartArr._id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    }, this)
    return(
      <Panel header="Cart" bsStyle="primary">
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h6>Total Amount: {this.props.totalAmount}</h6>
            <Button
              bsStyle="success"
              bsSize="small"
              onClick={this.open.bind(this)}
            >
              Proceed to Checkout
            </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved.</h6>
              <p>You will receive an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>Total ${this.props.totalAmount}</h6>
            </Col>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return{
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount,

  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteCartItem,
    updateCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
