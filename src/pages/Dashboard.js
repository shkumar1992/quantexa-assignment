import React from 'react';
import Papa from 'papaparse';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import TransactionsTable from '../components/TransactionsTable';
import TopExpenseTypes from '../components/TopExpenseTypes';
import DailySpending from '../components/DailySpending';
import TopSuppliers from '../components/TopSuppliers';

const styles = (theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
});

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        data: []
    };

    this.addData = this.addData.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
      this.getCsvData();
  }

  fetchCsv(path) {
    return fetch(path).then(function (response) {
        let reader = response.body.getReader();
        let decoder = new TextDecoder('utf-8');

        return reader.read().then(function (result) {
            return decoder.decode(result.value);
        });
    });
  }

  addData(result) {
    let data = this.state.data;
    for(let i=0; i<result.length; i++) {
      if(i>0) {
        if(result[i][2] !== "" && (result[i][6] !== "" || result[i][7] !== "")) {
          
          data.push({
            [result[0][0]]: result[i][0],
            [result[0][1]]: result[i][1],
            [result[0][2]]: result[i][2],
            [result[0][3]]: result[i][3],
            [result[0][4]]: result[i][4],
            [result[0][5]]: result[i][5],
            [result[0][6]]: Number(result[i][6]),
            [result[0][7]]: Number(result[i][7]),
            [result[0][8]]: result[i][8]
          });
        }
      }
    }
    this.setState({data: data});
  }

  getData(result) {
    let data = result.data;
    this.addData(data);
  }

  async getCsvData() {
    let paths = ['/data/Jun2016.csv', '/data/Jul2016.csv', '/data/Aug2016.csv', '/data/Sep2016.csv', '/data/Oct2016.csv'];

    for(let i=0; i<paths.length; i++) {
      let csvData = await this.fetchCsv(paths[i]);
      Papa.parse(csvData, {
          complete: this.getData
      });
    }
  }

  render() {
    const {classes} = this.props;

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                {/* List of Transactions */}
                <Grid item xs={12}>
                    <TransactionsTable rows={this.state.data} />
                </Grid>
                {/* Daily Spending */}
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <DailySpending data={this.state.data} />
                </Paper>
                </Grid>
                {/* Top 10 expense types by total spending */}
                <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                    <TopExpenseTypes data={this.state.data}/>
                </Paper>
                </Grid>
                {/* Top 10 suppliers by total spending */}
                <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                    <TopSuppliers data={this.state.data} />
                </Paper>
                </Grid>
            </Grid>
        </Container>
    );
  }
}

export default withStyles(styles)(Dashboard);