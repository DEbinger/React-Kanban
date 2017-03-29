import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions';

class Card extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className='cardBox' >
        <p>Title: {this.props.title}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Status: {this.props.status}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <p>Priority: {this.props.priority}</p>
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
    onAddCard: (title, priority, status, createdBy, assignedTo) => {
      dispatch(addCard(title, priority, status, createdBy, assignedTo));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);