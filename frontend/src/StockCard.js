import React, { Component } from 'react';
import { Typography, Divider, Spin, Row, Col, Card, Icon, Modal, Button } from 'antd';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';
import axios from 'axios';

const queryString = require('query-string');

const {Title, Paragraph, Text} = Typography;


const cardPositive = {

    boxShadow: '0 3px 8px rgba(106, 204, 66, 0.65)',
};


const cardNegative = {

    boxShadow: '0 3px 8px rgba(238, 78, 90, 0.65)',
};

class StockCard extends Component {


    info = async () => {

        const data = [
            {
                "date": "2019-04-15",
                "open": 197.8182,
                "high": 199.0834,
                "low": 197.2504,
                "close": 198.4658,
                "volume": 17536646,
                "unadjustedVolume": 17536646,
                "change": 0.358619,
                "changePercent": 0.181,
                "vwap": 198.2139,
                "label": "Apr 15",
                "changeOverTime": 0
            }, {
                "date": "2019-04-16",
                "open": 198.6949,
                "high": 200.5975,
                "low": 197.7983,
                "close": 198.4857,
                "volume": 25696385,
                "unadjustedVolume": 25696385,
                "change": 0.019923,
                "changePercent": 0.01,
                "vwap": 199.136,
                "label": "Apr 16",
                "changeOverTime": 0.000100269164762931
            }, {
                "date": "2019-04-17",
                "open": 198.7746,
                "high": 202.5998,
                "low": 197.8481,
                "close": 202.3508,
                "volume": 28906780,
                "unadjustedVolume": 28906780,
                "change": 3.8651,
                "changePercent": 1.947,
                "vwap": 201.0345,
                "label": "Apr 17",
                "changeOverTime": 0.019575161060495012
            }, {
                "date": "2019-04-18",
                "open": 202.3408,
                "high": 203.3669,
                "low": 201.7431,
                "close": 203.078,
                "volume": 24195766,
                "unadjustedVolume": 24195766,
                "change": 0.7272,
                "changePercent": 0.359,
                "vwap": 202.7264,
                "label": "Apr 18",
                "changeOverTime": 0.023239268428112053
            }, {
                "date": "2019-04-22",
                "open": 202.0519,
                "high": 204.1539,
                "low": 201.5638,
                "close": 203.7454,
                "volume": 19439545,
                "unadjustedVolume": 19439545,
                "change": 0.66743,
                "changePercent": 0.329,
                "vwap": 203.4256,
                "label": "Apr 22",
                "changeOverTime": 0.026602064436290724
            }, {
                "date": "2019-04-23",
                "open": 203.6458,
                "high": 206.9531,
                "low": 203.1178,
                "close": 206.6841,
                "volume": 23322991,
                "unadjustedVolume": 23322991,
                "change": 2.9387,
                "changePercent": 1.442,
                "vwap": 205.6954,
                "label": "Apr 23",
                "changeOverTime": 0.041409149586477866
            }, {
                "date": "2019-04-24",
                "open": 206.5646,
                "high": 207.6803,
                "low": 206.2558,
                "close": 206.3653,
                "volume": 17540609,
                "unadjustedVolume": 17540609,
                "change": -0.318773,
                "changePercent": -0.154,
                "vwap": 206.8578,
                "label": "Apr 24",
                "changeOverTime": 0.03980282748967323
            }, {
                "date": "2019-04-25",
                "open": 206.0366,
                "high": 206.963,
                "low": 204.3332,
                "close": 204.4925,
                "volume": 18543206,
                "unadjustedVolume": 18543206,
                "change": -1.8728,
                "changePercent": -0.908,
                "vwap": 205.2752,
                "label": "Apr 25",
                "changeOverTime": 0.0303664409686707
            }, {
                "date": "2019-04-26",
                "open": 204.114,
                "high": 204.2136,
                "low": 201.3447,
                "close": 203.5163,
                "volume": 18649102,
                "unadjustedVolume": 18649102,
                "change": -0.976241,
                "changePercent": -0.477,
                "vwap": 203.2958,
                "label": "Apr 26",
                "changeOverTime": 0.025447709378643574
            }, {
                "date": "2019-04-29",
                "open": 203.6159,
                "high": 205.1799,
                "low": 203.078,
                "close": 203.8251,
                "volume": 22204716,
                "unadjustedVolume": 22204716,
                "change": 0.308811,
                "changePercent": 0.152,
                "vwap": 204.1957,
                "label": "Apr 29",
                "changeOverTime": 0.027003644960491884
            }, {
                "date": "2019-04-30",
                "open": 202.2811,
                "high": 202.6198,
                "low": 198.3462,
                "close": 199.9002,
                "volume": 46534923,
                "unadjustedVolume": 46534923,
                "change": -3.9249,
                "changePercent": -1.926,
                "vwap": 200.0774,
                "label": "Apr 30",
                "changeOverTime": 0.007227441705321576
            }, {
                "date": "2019-05-01",
                "open": 209.0749,
                "high": 214.4841,
                "low": 208.4274,
                "close": 209.7124,
                "volume": 64827328,
                "unadjustedVolume": 64827328,
                "change": 9.8122,
                "changePercent": 4.909,
                "vwap": 211.9056,
                "label": "May 1",
                "changeOverTime": 0.056667697910672776
            }, {
                "date": "2019-05-02",
                "open": 209.0351,
                "high": 211.8343,
                "low": 207.3316,
                "close": 208.3477,
                "volume": 31996324,
                "unadjustedVolume": 31996324,
                "change": -1.3647,
                "changePercent": -0.651,
                "vwap": 209.3998,
                "label": "May 2",
                "changeOverTime": 0.049791450214596175
            }, {
                "date": "2019-05-03",
                "open": 210.081,
                "high": 211.0274,
                "low": 209.4236,
                "close": 210.9377,
                "volume": 20892378,
                "unadjustedVolume": 20892378,
                "change": 2.59,
                "changePercent": 1.243,
                "vwap": 210.3181,
                "label": "May 3",
                "changeOverTime": 0.06284155758825956
            }, {
                "date": "2019-05-06",
                "open": 203.5063,
                "high": 208.0389,
                "low": 202.7194,
                "close": 207.6803,
                "volume": 32443113,
                "unadjustedVolume": 32443113,
                "change": -3.2575,
                "changePercent": -1.544,
                "vwap": 206.548,
                "label": "May 6",
                "changeOverTime": 0.04642865420641736
            }, {
                "date": "2019-05-07",
                "open": 205.0902,
                "high": 206.6218,
                "low": 200.0546,
                "close": 202.0818,
                "volume": 38763698,
                "unadjustedVolume": 38763698,
                "change": -5.5984,
                "changePercent": -2.696,
                "vwap": 202.7622,
                "label": "May 7",
                "changeOverTime": 0.018219763808172418
            }, {
                "date": "2019-05-08",
                "open": 201.1255,
                "high": 204.5523,
                "low": 200.9761,
                "close": 202.1217,
                "volume": 26339504,
                "unadjustedVolume": 26339504,
                "change": 0.039847,
                "changePercent": 0.02,
                "vwap": 202.955,
                "label": "May 8",
                "changeOverTime": 0.01842080600284786
            }, {
                "date": "2019-05-09",
                "open": 199.6313,
                "high": 200.9064,
                "low": 195.9056,
                "close": 199.95,
                "volume": 34908607,
                "unadjustedVolume": 34908607,
                "change": -2.1716,
                "changePercent": -1.074,
                "vwap": 198.5261,
                "label": "May 9",
                "changeOverTime": 0.007478366549803478
            }, {
                "date": "2019-05-10",
                "open": 197.419,
                "high": 198.85,
                "low": 192.77,
                "close": 197.18,
                "volume": 41208712,
                "unadjustedVolume": 41208712,
                "change": -2.77,
                "changePercent": -1.385,
                "vwap": 195.937,
                "label": "May 10",
                "changeOverTime": -0.006478698093071928
            }, {
                "date": "2019-05-13",
                "open": 187.71,
                "high": 189.48,
                "low": 182.85,
                "close": 185.72,
                "volume": 57430623,
                "unadjustedVolume": 57430623,
                "change": -11.46,
                "changePercent": -5.812,
                "vwap": 186.6812,
                "label": "May 13",
                "changeOverTime": -0.06422164423291067
            }, {
                "date": "2019-05-14",
                "open": 186.41,
                "high": 189.7,
                "low": 185.41,
                "close": 188.66,
                "volume": 36529677,
                "unadjustedVolume": 36529677,
                "change": 2.94,
                "changePercent": 1.583,
                "vwap": 187.9622,
                "label": "May 14",
                "changeOverTime": -0.04940800883577929
            }, {
                "date": "2019-05-15",
                "open": 186.27,
                "high": 191.75,
                "low": 186.02,
                "close": 190.92,
                "volume": 26544718,
                "unadjustedVolume": 26544718,
                "change": 2.26,
                "changePercent": 1.198,
                "vwap": 189.7151,
                "label": "May 15",
                "changeOverTime": -0.03802065645567153
            }, {
                "date": "2019-05-16",
                "open": 189.91,
                "high": 192.4689,
                "low": 188.84,
                "close": 190.08,
                "volume": 33031364,
                "unadjustedVolume": 33031364,
                "change": -0.84,
                "changePercent": -0.44,
                "vwap": 190.3896,
                "label": "May 16",
                "changeOverTime": -0.042253123711994654
            }, {
                "date": "2019-05-17",
                "open": 186.93,
                "high": 190.9,
                "low": 186.76,
                "close": 189,
                "volume": 32879090,
                "unadjustedVolume": 32879090,
                "change": -1.08,
                "changePercent": -0.568,
                "vwap": 188.8989,
                "label": "May 17",
                "changeOverTime": -0.04769486732726748
            }
        ];


        let response = await axios.get(`https://cloud.iexapis.com/v1/stock/${this.props.data.symbol}/chart/5d?token=pk_31638584dd6c4c04a550a33b66e50c33`)

        console.log(response.data);
        Modal.success({
            title: `Stock Details for ${this.props.data.companyName} (${this.props.data.symbol})`,
            width: 700,
            content: (
                <div className="tradingview-widget-container" id="stockChart">

                    <LineChart width={600} height={200} data={response.data}
                               margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="label">
                            <Label value="Date" offset={0} position="insideBottom"/>
                        </XAxis>
                        <YAxis label={{value: 'Price($)', angle: -90, position: 'insideLeft'}}/>
                        <Tooltip/>
                        <Line connectNulls={true} type='monotone' dataKey='close' stroke='#82ca9d' fill='#82ca9d'/>
                        <Line connectNulls={true} type='monotone' dataKey='open' stroke='#8884d8' fill='#8884d8'/>
                    </LineChart>

                </div>

            ),
            onOk() {
            },
        })

    }


    render() {
        let cardStyle = {};
        const props = this.props.data;
        let icon = "arrow-up";
        cardStyle = cardPositive;
        let iconColor = "#52c41a";
        if (props) {
            if (props.change < 0) {
                icon = "arrow-down";
                iconColor = "#ee4e5a"
                cardStyle = cardNegative;
            }
        }


        return (
            <div>
                {props
                &&
                <Col span={8}>
                    <Card title={props.companyName} bordered={false} className="stockCard" extra={<p>{props.symbol}</p>}
                          onClick={this.info}
                          hoverable
                          style={cardStyle}>
                        <Text strong>Price: </Text>{props.latestPrice} $
                        <br/>
                        <Text strong>Invest Amount: </Text>{Math.round(this.props.amount)} $
                        <br/>
                        <Icon type={icon} style={{
                            color: iconColor,
                            fontSize: 20
                        }}/> {props.change} $
                        <Text style={{fontSize: 10}}>( {(props.changePercent * 100).toFixed(2)} % )</Text>
                        <br/>
                        <div style={{textAlign: 'right'}}>
                            <Text style={{fontSize: 10}}>{props.latestTime} </Text>
                        </div>
                    </Card>
                </Col>
                }
            </div>
        );
    }
}


export default StockCard;
