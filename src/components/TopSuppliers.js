import React from 'react';
import PropTypes from 'prop-types';

import SankeyChart from './visualisations/SankeyChart';

function getSupplierSpend(data) {
    let transactions = data;
    let supplierSpends = [];
    for(let i=0; i<transactions.length; i++) {
      if(transactions[i]["Supplier"]) {
        let index = supplierSpends.findIndex(element => element[1] === transactions[i]["Supplier"]);
        if(index === -1) {
          supplierSpends.push([transactions[i]["Entity"], transactions[i]["Supplier"], transactions[i]["Amount"]]);
        } else {
          supplierSpends[index][2] += transactions[i]["Amount"];
        }
      }
    }
    supplierSpends.sort((a,b) => (a[2] > b[2]) ? -1 : ((b[2] > a[2]) ? 1 : 0));
    return supplierSpends.slice(0,10);
}

export default function TopSuppliers(props) {
    const { data } = props;
    const supplierSpending = getSupplierSpend(data);

    return (
        <div>
            <SankeyChart series={supplierSpending} title="Top Ten Suppliers by Spending" seriesName="Top Ten Suppliers" />
        </div>
    );
}

TopSuppliers.propTypes = {
  data: PropTypes.array.isRequired
}