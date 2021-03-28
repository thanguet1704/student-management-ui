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
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';

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
  },
  appBar: {
    height: '8vh',
    background: '#ffffff',
  },
  logo: {
    width: 60,
    height: 60,
  },
  loginForm: {
    top: 10,
    height: '82vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    bottom: 0,
    padding: 10,
    background: 'linear-gradient(180deg, #ffa91c 0%, #ea5c06 100%)',
    width: '100%',
    height: '10%',
  },
}));

const onSubmit = () => {
  console.log('click submit');
};

export const Login = () => {
  const classes = useStyles();

  return (
    <Container>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <img
              src="https://hcma.vn/Publishing/images/badge.png"
              alt="logo"
              className={classes.logo}
            />
            <Typography
              component="h1"
              variant="h6"
              color="textPrimary"
              noWrap
              className={classes.title}
            >
              Cổng thông tin đào tạo
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={clsx(classes.paper, classes.loginForm)}>
          <Avatar className={classes.avatar}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <form className={classes.form} noValidate onSubmit={() => onSubmit()}>
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
              control={<Checkbox value="remember" color="primary" />}
              label="Nhớ mật khẩu"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2" color="inherit">
                  Quên mật khẩu?
                </Link>
              </Grid>
            </Grid>
          </form>
          <Box mt={3} position="absolute" className={classes.footer} fullWidth>
            <Copyright />
          </Box>
        </div>
      </Container>
    </Container>
  );
};

const Copyright = () => {
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
        Bản quyền: Học viện Chính trị quốc gia Hồ Chí Minh - 135 Nguyễn Phong
        Sắc – Nghĩa Tân – Cầu Giấy – Hà Nội
      </Typography>
    </Container>
  );
};
