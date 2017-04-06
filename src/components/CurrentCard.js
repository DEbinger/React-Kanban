// jshint esversion:6

import React, {Component} from 'react';
import Card from './Card';
import { addCard }  from '../actions';
import { connect } from 'react-redux';

class CurrentCard extends Component {
  constructor(props){
    super(props);

    this.state = {
      cards: []
    };
  }

  render(){
    return (
      <div className="CurrentCard">
        <h1>TO DO</h1>
          {this.props.cards.filter(card => card.status === "ToDo").map(({id, title, createdBy, status, assignedTo, priority}) =>
            <div className="completedCardDiv">
              <Card
                id={id}
                title={title}
                createdBy={createdBy}
                status={status}
                assignedTo={assignedTo}
                priority={priority}
              />
            </div>)}
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
    onAddCard: (title, createdBy, status, assignedTo, priority) => {
      dispatch(addCard(title, createdBy, status, createdBy, assignedTo, priority));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentCard);