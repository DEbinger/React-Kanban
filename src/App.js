// jshint esversion:6

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import NewTask from './components/NewTask.js';
import Card from './components/Card.js';
import CardList from './components/CardList.js';
import CurrentCard from './components/CompletedCard.js';
import CompletedCard from './components/CurrentCard.js';

import { addCard } from './actions';

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


  getCurrentCards(){
    return new Promise(function(resolve, reject){
      function reqListener (){
        resolve(JSON.parse(this.responseText));
        console.log(this.responseText);
      }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "api/card/");
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send();
  });
}

  getCompletedCards(){
    return new Promise(function(resolve, reject){
      function reqListener (){
        resolve(JSON.parse(this.responseText));
        console.log(this.responseText);
      }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "api/card/");
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send();
  });
}

  addCard(){
    return new Promise(function(resolve, reject){
      function reqListener (){
        resolve(JSON.parse(this.responseText));
      }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("POST", "api/card/");
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send();
  });
}
  render() {
    return (
      <div className="App">

        <p className="App-intro">
        </p>
        <NewTask/>
        <CardList/>
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
    onAddCard: (title, priority, status, createdBy, assignedTo) => {
      dispatch(addCard(title, priority, status, createdBy, assignedTo));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);