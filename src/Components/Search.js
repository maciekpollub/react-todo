/**
 * Created by maciej on 12.12.17.
 */
import  React, { Component } from 'react'

class Search extends Component {

    handleChange(event){
        this.props.userInput(event.target.value)
    }

    render() {
        return(
            <div>
                Search: <input type="search"
                               placeholder="search for:"
                               value={this.props.filterText}
                               onChange={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

export default Search;