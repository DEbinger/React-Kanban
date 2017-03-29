import React, { Component } from 'react';
import Card from './Card.js';
import { connect } from 'react-redux';
import { addCard } from '../actions';


export class CardList extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.getCards()
    .then((data)=>{
      data.forEach( card => {
        this.props.onAddCard(card.title, card.priority, card.status, card.createdBy, card.assignedTo);
      });
    })
    .catch(function(event){
    });
  }

  getCards(){
    return new Promise(function(resolve, reject){
      function reqListener(){
        resolve(JSON.parse(this.responseText));
      }
      let oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", "api/card/");
      oReq.setRequestHeader("Content-Type", "application/json");
      oReq.send();
    });
  }

  render(){
    return (
      <div>
      {this.props.cards.map(({
      title,
      createdBy,
      status,
      assignedTo,
      priority
      }) =>
      <Card
      title={title}
      createdBy={createdBy}
      status={status}
      assignedTo={assignedTo}
      priority={priority}
      />
      )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCard: (title, priority, status, createdBy, assignedTo) => {
      dispatch(addCard(title, priority, status, createdBy, assignedTo));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);