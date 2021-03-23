import React from 'react';
import PropTypes from 'prop-types';

import BarChart from './visualisations/BarChart';

function getTotalSpend(data) {
    let transactions = data;
    let expenseTypes = [];
    for(let i=0; i<transactions.length; i++) {
      let index = expenseTypes.findIndex(element => element[0] === transactions[i]["Expense Type"]);
      if(index === -1) {
        expenseTypes.push([transactions[i]["Expense Type"], transactions[i]["Amount"]]);
      } else {
        expenseTypes[index][1] += transactions[i]["Amount"];
      }
    }
    expenseTypes.sort((a,b) => (a[1] > b[1]) ? -1 : ((b[1] > a[1]) ? 1 : 0));
    return expenseTypes.slice(0,10);
}

export default function TopExpenseTypes(props) {
    const { data } = props;

    const spendingData = getTotalSpend(data);

    return (
        <div>
            <BarChart series={spendingData} title="Top Ten Expense Types" yAxisTitle="Overall Expenditure (GBP)" />
        </div>
    );
}

TopExpenseTypes.propTypes = {
  data: PropTypes.array.isRequired
}