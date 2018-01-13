/**
 * Created by maciej on 11.12.17.
 */
import React, { Component } from 'react'
import List from './List.js'

class ScheduleBoard extends Component {
    render(){
        return(
            <div className="app">

                <List id="monday" title="Monday" taskAction={this.props.taskAction} duties={
                    this.props.duties.filter((duty) => duty.day === 'Monday')
                }/>

                <List id="tuesday" title="Tuesday" taskAction={this.props.taskAction} duties={
                    this.props.duties.filter((duty) => duty.day === 'Tuesday')
                }/>

                <List id="wednesday" title="Wednesday" taskAction={this.props.taskAction} duties={
                    this.props.duties.filter((duty) => duty.day === 'Wednesday')
                }/>

                <List id="thursday" title="Thursday" taskAction={this.props.taskAction} duties={
                    this.props.duties.filter((duty) => duty.day === 'Thursday')
                }/>

                <List id="friday" title="Friday" taskAction={this.props.taskAction} duties={
                    this.props.duties.filter((duty) => duty.day === 'Friday')
                }/>

            </div>
        );
    }
}

export default ScheduleBoard;