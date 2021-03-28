import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
    padding: 20,
  },
}));

export const TotalCard = (props) => {
  const classes = useStyles();

  return props.totals.map((total) => {
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={total.icon}
          action={<Typography>{total.rate}</Typography>}
          title={total.total}
          subheader={total.title}
        />
      </Card>
    );
  });
};
