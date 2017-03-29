// jshint esversion:6

import React from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions';

class NewTask extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      priority: '',
      status: '',
      createdBy: '',
      assignedTo: ''
    };

    this.handleSubmit=this.handleSubmit.bind(this);
    this.titleValue=this.titleValue.bind(this);
    this.priorityValue=this.priorityValue.bind(this);
    this.statusValue=this.statusValue.bind(this);
    this.createdByValue=this.createdByValue.bind(this);
    this.assignedToValue=this.assignedToValue.bind(this);
  }

addCards(card){
  console.log('add card xhr',card)
    return new Promise(function(resolve, reject){
      function reqListener (){
        let data = this.responseText;
        resolve(data);
      }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("POST", "api/card/", true);
    oReq.setRequestHeader("Content-type", "application/json");
    oReq.send(JSON.stringify(card));
  });
}

// addCardsData(data){
//   this.addCards(data)
//   });
// }

  handleSubmit(event){
    event.preventDefault();
    this.addCards({
      title: this.state.title,
      createdBy: this.state.createdBy,
      status: this.state.status,
      assignedTo: this.state.assignedTo,
      priority: this.state.priority
    })
    .then(data =>
    {
     let card = JSON.parse(data)
     console.log(card)
    this.props.onAddCard(card.title, card.createdBy, card.status, card.assignedTo, card.priority);
    }
)
    this.setState ({
      title: '',
      priority: '',
      createdBy: '',
      assignedTo: ''
    })
}

  titleValue(event){
    this.setState({
      title: event.target.value
    });
  }

  priorityValue(event){
    this.setState({
      priority: event.target.value
    });
  }

  statusValue(event){
    this.setState({
      status: event.target.value
    });
  }

  createdByValue(event){
    this.setState({
      createdBy: event.target.value
    });
  }

  assignedToValue(event){
    this.setState({
      assignedTo: event.target.value
    });
  }

render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input type='text' placeholder='Title' onChange={this.titleValue} />
          <input type='text' placeholder='Created By' onChange={this.createdByValue} />
          <select placeholder='Status' onChange={this.statusValue}>
            <option disabled selected value>Status</option>
            <option value="Todo">Todo</option>
            <option value="Inprogress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input type='text' placeholder='Assigned To' onChange={this.assignedToValue} />
          <input type='text' placeholder='Priority' onChange={this.priorityValue} />
        </div>
        <div>
          <button type="submit"> Submit Task </button>
        </div>
      </form>
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
    onAddCard: (title, createdBy, status, assignedTo, priority) => {
      dispatch(addCard(
        title,
        createdBy,
        status,
        assignedTo,
        priority));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTask);