/**
 * Created by maciej on 11.12.17.
 */
import React, { Component } from 'react'
import Search from './Search.js'

class CheckList extends Component {
    constructor(props){
        super(props);
        this.state={
            filterText: ''
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(phrase){
        this.setState({filterText: phrase})
    }


    checkInputKeyPress(event){
        if (event.key === 'Enter'){
            this.props.taskAction.add(this.props.dutyId, event.target.value)
            event.target.vatue='';
        }
    }


    renderTasks(tasks){
        return(
            <div>
            {tasks.map((task, taskIndex) =>
                <li key={task.id} className="checklist__task">
                    <input type="checkbox" checked={task.done} onChange={
                        this.props.taskAction.toggle.bind(null, this.props.dutyId, task.id, taskIndex)
                    }/>
                    {task.name}{''}
                    <a href="#" className="checklist__task--remove" onClick={
                        this.props.taskAction.delete.bind(null, this.props.dutyId, task.id, taskIndex)
                    } />
                </li>)}
            </div>);
        }




    render(){
        let filteredTasks = this.props.tasks.filter(
            (task) => task.name.indexOf(this.state.filterText) !== -1
        );

        return(
            <div className="checklist">
                <Search filterText={this.state.filterText}
                        userInput={this.handleUserInput}/>
                <ul>{this.renderTasks(filteredTasks)}</ul>
                <input type="text"
                       className="checklist--add-task"
                       placeholder="Write text and press Enter to add new task"
                       onKeyPress={this.checkInputKeyPress.bind(this)} />
            </div>
        );
    }
}

export default CheckList;