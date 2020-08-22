import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";
import {BrowserRouter as Router, Route} from "react-router-dom";
import CharacterPage from "../pages/characterPage";
import BooksItem from "../pages/booksItem";
import BooksPage from "../pages/booksPage";
import HousesPage from "../pages/housesPage";



export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch(error) {
        console.log('error')
        this.setState({
            error: true
        })
    }

    onShowHideRandomChar = () => {
        return (
            this.setState((state) => {
              return  {showRandomChar: !state.showRandomChar}
            })
        )
        }



    render() {
        const {showRandomChar} = this.state

        const char = showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }



        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button
                                    className="btn-primary mb-5 p-2 rounded"
                                    onClick={this.onShowHideRandomChar}
                                >Toggle random character</button>
                            </Col>
                        </Row>
                        <Route path='/'  component={() => <span>Welcome to GOT DB</span>} exact/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books'  component={BooksPage} exact/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                               return <BooksItem bookId={id}/>
                            }
                        }/>
                    </Container>
                </div>
            </Router>

        );
    }

};

