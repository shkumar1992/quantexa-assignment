import React from 'react';
import PropTypes from 'prop-types';

import LineChart from './visualisations/LineChart';

function getDailySpend(data) {
    let transactions = data;
    let dailyTotalSpends = [];
    let dailytotalTrans = [];
    for(let i=0; i<transactions.length; i++) {
      if(transactions[i]["Date"]) {
        let currentDate = new Date(transactions[i]["Date"].substring(3,5)+"/"+transactions[i]["Date"].substring(0,2)+"/"+transactions[i]["Date"].substring(6));
        let index = dailyTotalSpends.findIndex(element => element.x.getTime() === currentDate.getTime());
        if(index === -1) {
          dailyTotalSpends.push({
            x: currentDate,
            y: transactions[i]["Amount"]
          });
          dailytotalTrans.push({
            x: currentDate,
            y: 1
          });
        } else {
          dailyTotalSpends[index].y += transactions[i]["Amount"];
          dailytotalTrans[index].y += 1;
        }
      }
      
    }
    return {
      dailyTotalSpends,
      dailytotalTrans
    };
}

export default function DailySpending(props) {
    const { data } = props;
    const dailySpending = getDailySpend(data);
    return (
        <div>
            <LineChart series={dailySpending} title="Daily Spending" yAxisTitle1="Number of Transactions" yAxisTitle2="Daily Spends" seriesName1="Daily Total Spending" seriesName2="Daily Total Transactions" />
        </div>
    );
}

DailySpending.propTypes = {
  data: PropTypes.array.isRequired
}