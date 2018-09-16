import React from 'react';
import Header from './addTripPage/Header.jsx';
import TripCard from './TripCard.jsx';
import Grid from '@material-ui/core/Grid';
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
  }
});

class TripList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header /> 
        <div className={classes.background}>
          <Grid container className={classes.grid}>
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