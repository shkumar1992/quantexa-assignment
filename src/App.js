import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import ApplicationBar from './components/ApplicationBar';
import Dashboard from './pages/Dashboard';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  }
});

class App extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <ApplicationBar name="Dashboard" avatarInitials="SK" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Dashboard />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);