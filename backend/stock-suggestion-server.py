# Import Flask packages
import os
import requests
import json
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin




# Define an instance of Flask object
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

""" Stocks for investment strategies"""

## Stocks as per the intense study and survey based on the strategies
ethical_investing = ["AAPL", "TSLA", "ADBE"]
growth_investing = ["OXLC", "ECC", "AMD"]
index_investing = ["VOO", "VTI", "ILTB"]
quality_investing = ["NVDA", "MU", "CSCO"]
value_investing = ["INTC", "BABA", "GE"]

def get_stock_quote(stock_list):
    """Function that calls stock API for each stock to fetch stock details"""

    # Filter defining the data requirement
    param_filter = '?token=pk_31638584dd6c4c04a550a33b66e50c33&filter=symbol,companyName,latestPrice,latestTime,change,changePercent'

    stock_quote = []

    # Loopping through given stock and appending data to result
    for ticker in stock_list:
        # HTTP GET call to stock API
        resp = requests.get('https://cloud.iexapis.com/v1/stock/{}/quote/{}'.format(ticker, param_filter))
        stock_quote.append(resp.json())

    return stock_quote

@app.route('/')
def hello_world():
    print ("hello world")

@app.route('/getData', methods=['POST'])
@cross_origin(origin='*')
def return_data():
    Strategies = request.json['Strategies']
    Amount = request.json['Amount']

    response = []
    amt1 = Amount*0.5
    amt2 = Amount*0.30
    amt3 = Amount*0.20
    responseAmount = []

    responseAmount.append(amt1)
    responseAmount.append(amt2)
    responseAmount.append(amt3)

    pieChart = []

    for x in Strategies:
        if x == "Ethical Investing":
            response.append(get_stock_quote(ethical_investing))
            pieChart.append({"title": ethical_investing[0], "value": amt1})
            pieChart.append({"title": ethical_investing[1], "value": amt2})
            pieChart.append({"title": ethical_investing[2], "value": amt3})
        elif x == "Growth Investing":
            response.append(get_stock_quote(growth_investing))
            pieChart.append({"title": growth_investing[0], "value": amt1})
            pieChart.append({"title": growth_investing[1], "value": amt2})
            pieChart.append({"title": growth_investing[2], "value": amt3})
        elif x == "Index Investing":
            response.append(get_stock_quote(index_investing))
            pieChart.append({"title": index_investing[0], "value": amt1})
            pieChart.append({"title": index_investing[1], "value": amt2})
            pieChart.append({"title": index_investing[2], "value": amt3})
        elif x == "Quality Investing":
            response.append(get_stock_quote(quality_investing))
            pieChart.append({"title": quality_investing[0], "value": amt1})
            pieChart.append({"title": quality_investing[1], "value": amt2})
            pieChart.append({"title": quality_investing[2], "value": amt3})
        elif x == "Value Investing":
            response.append(get_stock_quote(value_investing))
            pieChart.append({"title": value_investing[0], "value": amt1})
            pieChart.append({"title": value_investing[1], "value": amt2})
            pieChart.append({"title": value_investing[2], "value": amt3})
        else:
            response.append("Invalid Strategy")

    # get_stock_quote(value)
    dict1 = {"strategiesResponse": response, "amountResponse": responseAmount, "piechartResponse": pieChart}
    response=Response(json.dumps(dict1), mimetype='application/json')
    #response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000/")
    return response


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
