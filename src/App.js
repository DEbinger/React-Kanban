// jshint esversion:6

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import NewTask from './components/NewTask.js';
import CardList from './components/CardList.js';
import CurrentCard from './components/CurrentCard.js';
import CompletedCard from './components/CompletedCard.js';

import { addCard, updateStatus, deleteCard } from './actions';

class App extends Component {
  constructor(){
    super();

    this.state = {
      cards: []
    };
  }

  componentWillMount(){
    this.getCards()
    .then((data)=>{
      data.forEach( card => {
        this.props.onAddCard(card.id, card.title, card.createdBy, card.status, card.assignedTo, card.priority);
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

//   getCurrentCards(){
//     return new Promise(function(resolve, reject){
//       function reqListener (){
//         resolve(JSON.parse(this.responseText));
//         console.log(this.responseText);
//       }
//     var oReq = new XMLHttpRequest();
//     oReq.addEventListener("load", reqListener);
//     oReq.open("GET", "api/card/");
//     oReq.setRequestHeader("Content-Type", "application/json");
//     oReq.send();
//   });
// }

//   getCompletedCards(){
//     return new Promise(function(resolve, reject){
//       function reqListener (){
//         resolve(JSON.parse(this.responseText));
//         console.log(this.responseText);
//       }
//     var oReq = new XMLHttpRequest();
//     oReq.addEventListener("load", reqListener);
//     oReq.open("GET", "api/card/");
//     oReq.setRequestHeader("Content-Type", "application/json");
//     oReq.send();
//   });
// }

//   addCard(){
//     return new Promise(function(resolve, reject){
//       function reqListener (){
//         resolve(JSON.parse(this.responseText));
//       }
//     var oReq = new XMLHttpRequest();
//     oReq.addEventListener("load", reqListener);
//     oReq.open("POST", "api/card/");
//     oReq.setRequestHeader("Content-Type", "application/json");
//     oReq.send();
//   });
// }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
        </p>
        <NewTask/>
        <div className="CardContainer">
          <CardList/>
          <CurrentCard/>
          <CompletedCard/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inProgressCards: state.inProgressCards
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
)(App);