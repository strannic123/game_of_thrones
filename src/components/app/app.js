import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from "../characterPage";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import gotService from "../../services/gotService";


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
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const {showRandomChar} = this.state

        const btnHideShow = showRandomChar ? <RandomChar/> : null;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {/*<RandomChar/>*/}
                            {btnHideShow}
                            <button
                                className="btn-primary mb-5 p-2 rounded"
                                onClick={this.onShowHideRandomChar}
                            >Toggle random character</button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                charId={this.state.selectedChar}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

};

