// jshint esversion:6

import React, {Component} from 'react';
import Card from './Card';
import { addCard }  from '../actions';
import { connect } from 'react-redux';

class CompletedCard extends Component {
  constructor(props){
    super(props);

    this.state = {
      cards: []
    };
  }

  render(){
    return (
      <div className="CompletedCard">
        <h1>DONE</h1>
          {this.props.cards.filter(card => card.status === "Done").map(({id, title, createdBy, status, assignedTo, priority}) =>
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
    onAddCard: (id, title, createdBy, status, assignedTo, priority) => {
      dispatch(addCard(id, title, createdBy, status, assignedTo, priority));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedCard);