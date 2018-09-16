import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  grid: {
    maxWidth: '97%',
    margin: '0 auto -8px'
  },

  cardDesktop: {
    display: 'flex',
    margin: '10px auto'
  },
  textDesktop: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '350px'
  },
  contentDesktop: {
    flex: '1 0 auto',
    paddingBottom: '0!important'
  },
  imageDesktop: {
    width: 189,
    height: 189,
    position: 'relative',
    margin: 'auto 0 auto 10px'
  },
  buttonsDesktop: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px'
  }
});
class TripCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} className={classes.grid}>
        <Card className={classes.cardDesktop}>
          <CardMedia
            className={classes.imageDesktop}
            image='https://www.nps.gov/common/uploads/structured_data/3C7D2FBB-1DD8-B71B-0BED99731011CFCE.jpg'
            title='Not sure what to put here'
          />
          <div className={classes.textDesktop}>
            <CardContent className={classes.contentDesktop}>
              <Typography variant="headline" paragraph>
                Trip {this.props.index}
              </Typography>
              <Typography variant="title">
              Parks
              </Typography>
              {this.props.trip.parks.map((park, index) => {
                return (
                  <Typography key={index} paragraph>
                    {park}
                  </Typography>
                );
              })}
              <Typography variant="title">
              Cities
              </Typography>
              {this.props.trip.cities.map((city, index) => {
                return (
                  <Typography key={index} paragraph>
                    {city}
                  </Typography>
                );
              })}
            </CardContent>
          </div>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(TripCard);