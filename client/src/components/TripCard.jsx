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
    flexDirection: 'column'
  },
  contentDesktop: {
    flex: '1 0 auto',
    paddingBottom: '0!important'
  },
  imageDesktop: {
    width: 189,
    height: 189,
    position: 'relative'
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
    this.state = {
      citiesString: '',
      parksString: ''
    };
  }

  componentDidMount() {
    this.getParksList();
    this.getCitiesList();
  }

  getParksList = () => {
    let string = '';
    let array = this.props.trip.parks;
    for (let i = 0; i < array.length; i++) {
      if (i === array.length - 1) {
        string = string.concat(array[i].fullName);
      } else {
        string = string.concat(array[i].fullName, ', ');
      }
    }

    this.setState({ parksString: string });
  }

  getCitiesList = () => {
    let string = '';
    let array = this.props.trip.cities;
    for (let i = 0; i < array.length; i++) {
      if (i === array.length - 1) {
        string = string.concat(array[i]);
      } else {
        string = string.concat(array[i], ', ');
      }
    }

    this.setState({ citiesString: string });
  }

  render() {
    const { classes } = this.props;
    console.log(this.props);

    return (
      <Grid item xs={12} className={classes.grid}>
        <Card className={classes.cardDesktop}>
          <CardMedia
            className={classes.imageDesktop}
            image={this.props.trip.parks[0].images[0].url}
            title={this.props.trip.parks[0].images[0].title}
          />
          <div className={classes.textDesktop}>
            <CardContent className={classes.contentDesktop}>
              <Typography variant="headline" paragraph>
                Trip {this.props.index}
              </Typography>
              <Typography variant="title">
              Parks
              </Typography>
              <Typography paragraph>
                {this.state.parksString}
              </Typography>
              <Typography variant="title">
              Cities
              </Typography>
              <Typography paragraph>
                {this.state.citiesString}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(TripCard);