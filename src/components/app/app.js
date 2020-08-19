import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from "../errorMessage";


export default class App extends Component {

    state = {
        showRandomChar: true,
        error: false
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
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

};

