import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import SortableTable from './visualisations/SortableTable';

function descendingComparator(a, b, orderBy) {
  if(orderBy === "Date") {
    if(a[orderBy] && b[orderBy]) {
        a = new Date(a[orderBy].substring(3,5)+"/"+a[orderBy].substring(0,2)+"/"+a[orderBy].substring(6));
        b = new Date(b[orderBy].substring(3,5)+"/"+b[orderBy].substring(0,2)+"/"+b[orderBy].substring(6));
        if(b < a) {
            return -1;
        }
        if(b > a) {
            return 1;
        }
    }
    return 0;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => -descendingComparator(a, b, orderBy)
    : (a, b) => descendingComparator(a, b, orderBy);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

export default function TransactionsTable (props) {
  const classes = useStyles();

  const { rows } = props;

  return (
    <div className={classes.root}>
      <SortableTable rows={rows} getComparator={getComparator} name="Transactions" />
    </div>
  );
}

TransactionsTable.propTypes = {
  rows: PropTypes.array.isRequired
};