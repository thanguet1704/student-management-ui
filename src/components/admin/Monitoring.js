import InputBase from '@material-ui/core/InputBase';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactPlayer from 'react-player';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  monitoring: {
    width: '100%',
  },
});

export const Monitoring = (props) => {
  const classes = useStyles();
  const [age, setAge] = React.useState(10);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className={classes.monitoring}>
      <label>Phòng học: </label>
      <NativeSelect
        id="customized-select-native"
        value={age}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        <option value={10}>308-G2</option>
        <option value={20}>309-G2</option>
        <option value={30}>320-G2</option>
      </NativeSelect>
      <ReactPlayer
        with="100vw"
        height="60vh"
        controls
        style={{ margin: '0 auto' }}
        url="https://www.youtube.com/watch?v=iTRM_5v2GVQ"
      />
    </div>
  );
};
