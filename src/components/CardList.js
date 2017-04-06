import React, { Component } from 'react';
import Card from './Card.js';
import { connect } from 'react-redux';
import { addCard } from '../actions';


export class CardList extends Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.cards)
    return (
      <div className="CardList">
      <h1>NEW</h1>
        {this.props.cards.filter(card => card.status === "New").map(({id, title, createdBy, status, assignedTo, priority}) =>
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
    onAddCard: (id, title, createdBy, status, assignedTo, priority) => {
      dispatch(addCard(id, title, createdBy, status, assignedTo, priority));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);