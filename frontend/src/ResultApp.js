import React, { Component } from 'react';
import { Typography, Divider, Spin, Row, Col, Card } from 'antd';
import axios from 'axios';
import StockCard from './StockCard';
import {StockPieChart} from "./StockPieChart";

const queryString = require('query-string');

const {Title, Paragraph, Text} = Typography;

class ResultApp extends Component {

    state = {
        amount: 0,
        strategyList: [],
        loading: true,
        strategyResponse: [],
        amountResponse: [],
        piechartResponse: [],
    };


    async componentDidMount() {
        const values = queryString.parse(this.props.location.search)

        this.setState({amount: parseInt(values.amount), strategyList: values.strategy})

        //API call to server to fetch information

        let postBody = {}
        postBody.Amount = parseInt(values.amount);
        postBody.Strategies = [];
        if (values.strategy.length === 2) {
            postBody.Strategies = [...values.strategy]
        }
        else {
            postBody.Strategies.push(values.strategy)
        }

        console.log(postBody);


        let response = await axios.post(`http://127.0.0.1:5000/getData`, postBody)


        console.log(response);
        console.log(JSON.stringify(response));

        this.setState({loading: false});
        if (response.data.strategiesResponse[1]) {
            this.setState({strategyResponse: [...response.data.strategiesResponse[0], ...response.data.strategiesResponse[1]]});
        }
        else {
            this.setState({strategyResponse: [...response.data.strategiesResponse[0]]});
        }

        this.setState({amountResponse: response.data.amountResponse});
        this.setState({piechartResponse: response.data.piechartResponse});

        console.log("this.state.strategyResponse");
        console.log(this.state.strategyResponse);
        console.log("this.state.piechartResponse");
        console.log(this.state.piechartResponse);

    }

    render() {
        const {strategyList} = this.state;
        let isSecondStrategyPresent = false;

        let formatedSelectedItems;
        if (strategyList.length === 2) {
            formatedSelectedItems = strategyList.join(" & ");
            isSecondStrategyPresent = true;
        }
        else {
            formatedSelectedItems = strategyList;
        }

        return (
            <div className="ResultApp container-fluid">
                 <div className='row heading'><h2 className='headingh2'>Stock Recommendation App</h2></div>
                <div className='row'>
                <div className="box effect1 col-sm">
                    {/* <Typography>
                        <div style={{textAlign: 'center'}}>

                            <Title level={3}> <a href="/">Stock Portfolio Suggestion Engine </a></Title>

                        </div>
                        <Divider/>
                    </Typography> */}
                    <Spin tip="Loading..." spinning={this.state.loading}>
                        <div>
                            <Text strong>Amount: </Text> <Text>$ {this.state.amount}</Text>
                            <br></br>
                            <div style={{float: 'left'}}>
                                <Text strong>Strategies: </Text><Text>{formatedSelectedItems}</Text>
                            </div>
                        </div>
                        <Divider/>

                        {!isSecondStrategyPresent &&
                        <div>
                            <div style={{textAlign: 'center'}}><Title level={4}>{strategyList} </Title></div>
                            <br/>
                            <div style={{padding: '30px'}}>
                                <Row gutter={16}>
                                    <StockCard data={this.state.strategyResponse[0]}
                                               amount={this.state.amountResponse[0]}/>
                                    <StockCard data={this.state.strategyResponse[1]}
                                               amount={this.state.amountResponse[1]}/>
                                    <StockCard data={this.state.strategyResponse[2]}
                                               amount={this.state.amountResponse[2]}/>
                                </Row>
                            </div>
                        </div>
                        }

                        {isSecondStrategyPresent &&
                        <div>
                            <div style={{textAlign: 'center'}}><Title level={4}>{strategyList[0]} </Title></div>
                            <br/>
                            <div style={{padding: '30px'}}>
                                <Row gutter={16}>
                                    <StockCard data={this.state.strategyResponse[0]}
                                               amount={this.state.amountResponse[0]}/>
                                    <StockCard data={this.state.strategyResponse[1]}
                                               amount={this.state.amountResponse[1]}/>
                                    <StockCard data={this.state.strategyResponse[2]}
                                               amount={this.state.amountResponse[2]}/>
                                </Row>
                            </div>
                            <Divider/>
                            <div style={{textAlign: 'center'}}><Title level={4}>{strategyList[1]} </Title></div>
                            <div style={{padding: '30px'}}>
                                <Row gutter={16}>
                                    <StockCard data={this.state.strategyResponse[3]}
                                               amount={this.state.amountResponse[0]}/>
                                    <StockCard data={this.state.strategyResponse[4]}
                                               amount={this.state.amountResponse[1]}/>
                                    <StockCard data={this.state.strategyResponse[5]}
                                               amount={this.state.amountResponse[2]}/>
                                </Row>
                            </div>
                        </div>
                        }

                    </Spin>
                </div>
                <div className="box effect1 col-sm">
                <div style={{textAlign: 'center'}}><Title level={4}>Graphical Representation</Title></div>
                <StockPieChart data={this.state.piechartResponse}/>
                </div>
                </div>
            </div>
        );
    }
}


export default ResultApp;
