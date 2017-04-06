import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions';

class Card extends Component {
  constructor(props){
    super(props);
    this.handleDelete=this.handleDelete.bind(this)
  }

  handleDelete(e) {
    e.preventDefault()
    console.log(this.props)
    this.deleteCard(this.props)
  }

   deleteCard(card){
    return new Promise(function(resolve, reject){
      function reqListener(){
        resolve(JSON.parse(this.responseText));
      }
      let oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("DELETE", `api/card/${card.id}`);
      oReq.setRequestHeader("Content-Type", "application/json");
      oReq.send();
    });
  }


  render(){
    console.log(this.props)
    return (
      <div className='cardBox' >
        <p>Id: {this.props.id}</p>
        <p>Title: {this.props.title}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Status: {this.props.status}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <p>Priority: {this.props.priority}</p>
        <form onSubmit={this.handleDelete}>
          <input type="submit" value="delete"/>
        </form>
      </div>
      )
  }


}

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCard: (id, title, createdBy, status, assignedTo, priority) => {
      dispatch(addCard(id, title, createdBy, status, assignedTo, priority));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);