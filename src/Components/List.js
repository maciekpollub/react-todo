/**
 * Created by maciej on 11.12.17.
 */
import React, { Component } from 'react'
import Duty from './Duty.js'

class List extends Component {
    render(){
        let duties = this.props.duties.map((duty) => {
            return(
                <Duty key={duty.id}
                      id={duty.id}
                      title={duty.title}
                      taskAction={this.props.taskAction}
                      description={duty.description}
                      color={duty.color}
                      tasks={duty.tasks} />
            );
        });
        return(
            <div className="list">
                <h1>{this.props.title}</h1>
                {duties}
            </div>
        );
    }
}

export default List;