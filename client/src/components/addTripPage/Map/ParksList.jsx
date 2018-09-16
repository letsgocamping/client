import React from 'react';
import ParkCard from './ParkCard.jsx';
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

class ParksList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.background}>
        <Grid container className={classes.grid}>
          {this.props.parks.map((park, index) => {
            return <ParkCard
              key={park.id || index}
              park={park}
            />;
          })}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ParksList);