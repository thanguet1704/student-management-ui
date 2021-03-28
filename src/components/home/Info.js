import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const Info = () => {
  const classes = useStyles();
  return (
    <Paper>
      <form className={classes.form}>
        <div>
          <label for="name">Ma Sinh Vien: </label>
          <input
            type="text"
            name="name"
            id="name"
            disabled
            placeholder="17021037"
          ></input>
        </div>
        <div>
          <label for="name">Ma Sinh Vien</label>
          <input type="text" name="name" id="name"></input>
        </div>

        <input type="text" name="name"></input>
        <input type="text" name="name"></input>
        <input type="text" name="name"></input>
        <input type="text" name="name"></input>
        <input type="text" name="name"></input>
        <input type="text" name="name"></input>
        <input type="text" name="name"></input>
        <input type="text" name="name"></input>
        <input type="text" name="name"></input>
        <input type="text" name="name"></input>
        <input type="text" name="name"></input>
        <input type="text" name="name"></input>
      </form>
    </Paper>
  );
};
