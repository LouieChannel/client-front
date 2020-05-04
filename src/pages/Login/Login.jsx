import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useForm, Controller } from 'react-hook-form';
import { requestLogin } from '../../api/auth';
import useStyles from './style';
import Copyright from '../../components/Copyright';

export default function SignInSide() {
	const classes = useStyles();
	const { control, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(JSON.stringify(data));
		requestLogin({
			email: data.email,
			password: data.password,
		});
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
						Sign in
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<Controller
							as={TextField}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							control={control}
							defaultValue=""
						/>
						<Controller
							as={TextField}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							control={control}
							defaultValue=""
						/>

						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							Sign In
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
