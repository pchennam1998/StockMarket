import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";

import {
  Steps,
  Row,
  Col,
  Button,
  message,
  Form,
  InputNumber,
  Select,
  Typography,
  Divider,
} from "antd";
import { history } from "./history";
import "bootstrap/dist/css/bootstrap.css";
const queryString = require("query-string");

const { Title, Paragraph, Text } = Typography;

const Step = Steps.Step;
const OPTIONS = [
  "Ethical Investing",
  "Growth Investing",
  "Index Investing",
  "Quality Investing",
  "Value Investing",
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

function validateNumber(number) {
  if (number < 5000) {
    return "error";
  }

  return "success";
}

class App extends Component {
  state = {
    current: 0,
    showSubmit: false,
    showTrend: false,
    enableBack: false,
    validateNumberStatus: "success",
    validateOptionStatus: "success",
    amount: 5000,
    selectedItems: [],
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      width: "700",
      height: "500",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      plotLineColorGrowing: "rgba(41, 98, 255, 1)",
      plotLineColorFalling: "rgba(41, 98, 255, 1)",
      gridLineColor: "rgba(240, 243, 250, 0)",
      scaleFontColor: "rgba(106, 109, 120, 1)",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: [
        {
          title: "Indices",
          symbols: [
            {
              s: "FOREXCOM:SPXUSD",
              d: "S&P 500",
            },
            {
              s: "FOREXCOM:NSXUSD",
              d: "US 100",
            },
            {
              s: "FOREXCOM:DJI",
              d: "Dow 30",
            },
            {
              s: "INDEX:NKY",
              d: "Nikkei 225",
            },
            {
              s: "INDEX:DEU40",
              d: "DAX Index",
            },
            {
              s: "FOREXCOM:UKXGBP",
              d: "UK 100",
            },
          ],
          originalTitle: "Indices",
        },
        {
          title: "Futures",
          symbols: [
            {
              s: "CME_MINI:ES1!",
              d: "S&P 500",
            },
            {
              s: "CME:6E1!",
              d: "Euro",
            },
            {
              s: "COMEX:GC1!",
              d: "Gold",
            },
            {
              s: "NYMEX:CL1!",
              d: "Crude Oil",
            },
            {
              s: "NYMEX:NG1!",
              d: "Natural Gas",
            },
            {
              s: "CBOT:ZC1!",
              d: "Corn",
            },
          ],
          originalTitle: "Futures",
        },
        {
          title: "Bonds",
          symbols: [
            {
              s: "CME:GE1!",
              d: "Eurodollar",
            },
            {
              s: "CBOT:ZB1!",
              d: "T-Bond",
            },
            {
              s: "CBOT:UB1!",
              d: "Ultra T-Bond",
            },
            {
              s: "EUREX:FGBL1!",
              d: "Euro Bund",
            },
            {
              s: "EUREX:FBTP1!",
              d: "Euro BTP",
            },
            {
              s: "EUREX:FGBM1!",
              d: "Euro BOBL",
            },
          ],
          originalTitle: "Bonds",
        },
        {
          title: "Forex",
          symbols: [
            {
              s: "FX:EURUSD",
              d: "EUR/USD",
            },
            {
              s: "FX:GBPUSD",
              d: "GBP/USD",
            },
            {
              s: "FX:USDJPY",
              d: "USD/JPY",
            },
            {
              s: "FX:USDCHF",
              d: "USD/CHF",
            },
            {
              s: "FX:AUDUSD",
              d: "AUD/USD",
            },
            {
              s: "FX:USDCAD",
              d: "USD/CAD",
            },
          ],
          originalTitle: "Forex",
        },
      ],
    });
    document.getElementById("marketgraph").appendChild(script);
  }

  handleNext = () => {
    if (this.state.current === 1 && this.state.selectedItems.length > 2) {
      message.error("Select maximum of 2 Investment strategies");
      this.setState({ validateOptionStatus: "error" });
    } else if (
      this.state.current === 1 &&
      this.state.selectedItems.length === 0
    ) {
      message.error("Please select at-least 1 Investment strategy");
      this.setState({ validateOptionStatus: "error" });
    } else if (this.state.current === 0 && this.state.amount < 5000) {
      message.error("Please select valid amount");
    } else {
      this.setState({ validateOptionStatus: "success" });
      let newVal = this.state.current + 1;
      if (newVal === 2) {
        this.setState({ showSubmit: true });
      }
      this.setState({ current: newVal });
      this.setState({ enableBack: true });
    }
  };

  handleBack = () => {
    let newVal = this.state.current - 1;
    if (newVal === 0) {
      this.setState({ enableBack: false });
    }
    this.setState({ showSubmit: false });
    this.setState({ current: newVal });
  };

  handleSubmit = () => {
    this.setState({ current: 3 });
    message.info("Fetching Results");
    let query = {};
    query.amount = this.state.amount;
    query.strategy = this.state.selectedItems;

    const stringified = queryString.stringify(query);

    history.push("/results?" + stringified);
  };

  handleNumberChange = (value) => {
    this.setState({
      validateNumberStatus: validateNumber(value),
      amount: value,
    });
  };

  handleOptionChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  handleShowTrend = () => {
    this.setState({ showTrend: !this.state.showTrend });
  };

  render() {
    const { selectedItems } = this.state;
    const formatedSelectedItems = selectedItems.join(" & ");
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

    return (
      <div className="App container-fluid">
        <div className="row heading">
          <h2 className="headingh2">Stock Recommendation App</h2>
        </div>
        <div className="row">
          <div className="box effect1 col-sm box1">
            {/* <Typography>
                        <div style={{textAlign: 'center'}}>
                            <Title level={3}> <a href="/">Stock Portfolio Suggestion Engine </a></Title>
                        </div>
                        <Divider/>
                    </Typography> */}
            <Row>
              <Col span={16}>
                <div className="stepsClass">
                  <Steps
                    direction="horizontal"
                    size="small"
                    current={this.state.current}
                  >
                    <Step
                      title="Investment Amount"
                      description="Investment Amount (in $)"
                    />
                    <Step
                      title="Select Strategy"
                      description="upto 2 Strategies"
                    />
                    <Step title="Confirm" description="Check Input" />
                  </Steps>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <div
                  className="contentClass"
                  style={{ marginTop: "60px", marginLeft: "20px" }}
                >
                  <Form {...formItemLayout}>
                    {(this.state.current === 0 && (
                      <div>
                        <Form.Item
                          validateStatus={this.state.validateNumberStatus}
                          help="Amount should be greater than $5000"
                          style={{ width: "120%" }}
                        >
                          <InputNumber
                            placeholder="Enter Amount"
                            defaultValue={5000}
                            value={this.state.amount}
                            formatter={(value) =>
                              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            style={{ width: "180%" }}
                            onChange={this.handleNumberChange}
                          />
                        </Form.Item>
                      </div>
                    )) ||
                      (this.state.current === 1 && (
                        <div>
                          <Form.Item
                            help="Pick one or two Investment strategies"
                            validateStatus={this.state.validateOptionStatus}
                            style={{ width: "100%" }}
                          >
                            <Select
                              mode="multiple"
                              placeholder="Investment strategies"
                              value={selectedItems}
                              onChange={this.handleOptionChange}
                              style={{ width: "200%" }}
                            >
                              {filteredOptions.map((item) => (
                                <Select.Option key={item} value={item}>
                                  {item}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      )) ||
                      (this.state.current === 2 && (
                        <div>
                          <Text strong>Amount: </Text>{" "}
                          <Text>{this.state.amount}</Text>
                          <br />
                          <Text strong>Investing Strategies: </Text>
                          <Text>{formatedSelectedItems}</Text>
                        </div>
                      ))}
                  </Form>
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={6} offset={10}>
                {!this.state.enableBack && (
                  <Button
                    onClick={this.handleBack}
                    style={{ marginRight: 20 }}
                    disabled
                  >
                    Back
                  </Button>
                )}

                {this.state.enableBack && (
                  <Button onClick={this.handleBack} style={{ marginRight: 20 }}>
                    Back
                  </Button>
                )}

                {!this.state.showSubmit && (
                  <Button
                    type="primary"
                    onClick={this.handleNext}
                    style={{ backgroundColor: "#284c5a" }}
                  >
                    Next
                  </Button>
                )}

                {this.state.showSubmit && (
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#284c5a" }}
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </Col>
              <Button onClick={this.handleShowTrend}>
                {this.state.showTrend == true ? "Hide trend" : "Show trend"}
              </Button>
            </Row>
          </div>

          <div
            className={
              this.state.showTrend == true
                ? "box effect1 col-sm-6 show"
                : "box effect1 col-sm-6 hide"
            }
            style={{ textAlign: "center" }}
          >
            <Row>
              <Col>
                <Typography>
                  <Title level={4}> Market Trend</Title>
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col span={16} offset={0}>
                <div id="marketgraph">
                  <div className="tradingview-widget-container">
                    <div className="tradingview-widget-container__widget"></div>
                  </div>
                </div>
              </Col>
              <Col span={12}></Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
