import React from 'react';
import Header from './addTripPage/Header.jsx';
import TripCard from './TripCard.jsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  background: {
    backgroundColor: '#CFCFCE',
    paddingBottom: '1px',
    borderRadius: '0'
  },

  grid: {
    margin: '0 auto',
    width: '97%'
  },

  button: {
    margin: '0 auto'
  }
});

class TripList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToAddTrip: false
    };
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirectToAddTrip) {
      return (
        <Redirect to={{ pathname: '/add-trip' }} />
      );
    }

    return (
      <div>
        <Header /> 
        <div className={classes.background}>
          <Grid container className={classes.grid}>
            <Button
              onClick={() => this.setState({ redirectToAddTrip: true })}
              variant="contained"
              size="large"
              color="primary"
              className={classes.button} >
              Search For A New Trip
            </Button>
            {this.props.trips.map((trip, index) => {
              return <TripCard
                key={trip.id || index}
                trip={trip}
                index={index+1}
              />;
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TripList);