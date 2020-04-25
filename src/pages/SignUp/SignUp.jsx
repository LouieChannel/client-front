import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { requestSignUp } from '../../api/auth';
import useStyles from './style';
import Copyright from '../../components/Copyright';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

export default function SignUp() {
  const [value, setValue] = React.useState('driver');

  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    register({ name: 'email' });
    register({ name: 'password' });
    register({ name: 'fullname' });
    register({ name: 'role' });
  }, [register]);

  const onSubmit = (data) => {
    requestSignUp({
      email: data.email,
      password: data.password,
      fullName: data.fullname,
      role: value === 'driver' ? 2 : 1,
    });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              inputRef={register}
              error={errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register}
              error={errors.password}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="Full Name"
              name="fullname"
              autoComplete="fullName"
              inputRef={register}
              error={errors.fullName}
            />
            <FormLabel component="legend" style={{ marginTop: '10px' }}>
              Роль
            </FormLabel>
            <RadioGroup value={value} onChange={handleChange}>
              <FormControlLabel value={'logist'} control={<Radio />} label="Логист" />
              <FormControlLabel value={'driver'} control={<Radio />} label="Водитель" />
            </RadioGroup>

            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign Up
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}