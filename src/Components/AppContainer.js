.../**
 * Created by maciej on 11.12.17.
 */
import React, {Component} from 'react'
import ScheduleBoard from './ScheduleBoard.js'
import 'whatwg-fetch'
import 'babel-polyfill'
import update from 'react-addons-update'

const API_URL = 'http://localhost:3000';
const API_HEADERS = {
    'Content-Type': 'application/json'
};

class AppContainer extends Component {
    constructor(){
        super(...arguments);
        this.state={dutiesList:[]};
    }

    componentDidMount(){
        fetch('./duties.json')
            //API_URL+'/dutiesList', {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {this.setState({dutiesList: responseData});})
            .catch((error) => {console.log('Error', error);});
    }

    addTask(dutyId, taskName){
        let dutyIndex = this.state.dutiesList.findIndex((duty)=>duty.id === dutyId);
        let newTask = {id:Date.now(), name:taskName, done: false};
        let nextState = update(this.state.dutiesList, {
            [dutyIndex]: {
                tasks: {$push: [newTask]}
            }
        });
        this.setState({dutiesList: nextState});
        fetch(`${API_URL}/dutiesList/${dutyId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        .then((response) => response.json()).then((responseData) => {
            newTask.id=responseData.id
                this.setState({dutiesList: nextState});
            });
    }

    deleteTask(dutyId, taskId, taskIndex){
        let dutyIndex = this.state.dutiesList.findIndex((duty)=>duty.id === dutyId);
        let nextState = update(this.state.dutiesList, {
            [dutyIndex]: {
                tasks: {$splice: [[taskIndex,1]]}
            }
        });
        this.setState({dutiesList: nextState});
        fetch (`${API_URL}/dutiesList/${dutyId}/tasks/${taskId}`,{
            method: 'delete',
            headers: API_HEADERS
        });
    }

    toggleTask(dutyId, taskId, taskIndex){
        let dutyIndex = this.state.dutiesList.findIndex((duty)=>duty.id === dutyId);
        let newDoneValue;
        let nextState = update(this.state.dutiesList, {
            [dutyIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: { $apply: (done) => {
                            newDoneValue = !done;
                            return newDoneValue;
                        }}
                    }
                }
            }
        });
        this.setState({dutiesList:nextState});
        fetch(`${API_URL}/dutiesList/${dutyId}/tasks/${taskId}`,{
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done:newDoneValue})
        });
    }

    render(){
        return(
            <ScheduleBoard duties={this.state.dutiesList}
                           taskAction={{
                                toggle: this.toggleTask.bind(this),
                                delete: this.deleteTask.bind(this),
                                add: this.addTask.bind(this)}} />
        );
    }
}

export default AppContainer;