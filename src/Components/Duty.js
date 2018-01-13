/**
 * Created by maciej on 11.12.17.
 */
import React, { Component } from 'react'
import CheckList from './CheckList.js'

class Duty extends Component {
    constructor(props){
        super(props);
        this.state={
            showDetails: false,
        };
        this.toggleDetails = this.toggleDetails.bind(this);
    }

    toggleDetails(){
        this.setState({showDetails: !this.state.showDetails});
    }

    render(){
        let dutyDetails;
        if (this.state.showDetails) {
            dutyDetails=(
                <div className="duty__details">
                    {this.props.description}
                    <CheckList dutyId={this.props.id}
                               tasks={this.props.tasks}
                               taskAction={this.props.taskAction} />
                </div>
            );
        }
        let dutyColor = {
          position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 5,
            backgroundColor: this.props.color
        };

        return(
            <div className="duty">
                <div style={dutyColor}/>
                    <div className={this.state.showDetails ? 'duty__title duty__title--is-open' : 'duty__title'}
                         onClick={this.toggleDetails}>
                        {this.props.title}
                    </div>
                    {dutyDetails}
            </div>
        );
    }
}

export default Duty;