import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

const Copyright= () => {
  return (
    <Container>
      <Typography variant="body2" color="textPrimary" align="center">
        CỔNG THÔNG TIN ĐIỆN TỬ HỌC VIỆN CHÍNH TRỊ QUỐC GIA HỒ CHÍ MINH
      </Typography>
      <Typography variant="body2" color="textPrimary" align="center">
        Giấy phép thông tin số 99/GP-TTDT của Bộ TTTT cấp ngày 11/ 09/2008
      </Typography>
      <Typography variant="body2" color="textPrimary" align="center">
        Tổng biên tập: PGS.TS Nguyễn Viết Thảo
      </Typography>
      <Typography variant="body2" color="textPrimary" align="center">
        Bản quyền: Học viện Chính trị quốc gia Hồ Chí Minh - 135 Nguyễn Phong Sắc – Nghĩa Tân – Cầu Giấy – Hà Nội
      </Typography>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    background: 'linear-gradient(180deg, #ffa91c 0%, #ea5c06 100%)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(180deg, #ffa91c 0%, #ea5c06 100%)',
  },
  input: {
    border: '1px solid #ea5c06',
  }
}));

export const Login = () => {
  const classes = useStyles();

  return (
    <Container>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Tên đăng nhập"
            name="email"
            autoComplete="email"
            autoFocus
          ></TextField>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
            label="Nhớ mật khẩu"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <Link to="/"></Link>
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color="inherit">
              Quên mật khẩu?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
  );
}