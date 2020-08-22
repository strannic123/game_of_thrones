import React, {Component} from 'react';
import gotService from "../../services/gotService";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import {withRouter} from 'react-router-dom';


class BooksPage extends Component {
    gotService = new gotService();

    state = {
        selectedBook: null,
        error: false
    }

        onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }



    componentDidCatch(error) {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }



        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => name}
            />
        )
    }
}
export default withRouter(BooksPage);