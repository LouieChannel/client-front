import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { requestLogout } from '../../api/auth';
import { getFromLocalStorage } from '../../utils/helpers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function Header(props) {
	const classes = useStyles();
	const username = getFromLocalStorage('username');

	return (
		<div className={classes.root}>
			<AppBar position="static" style={{ background: '#2E3B55' }}>
				<Toolbar>
					<Typography
						variant="h6"
						className={classes.title}
						onClick={() => {
							window.location = '/';
						}}
					>
						Главная
					</Typography>
					<Typography variant="h6" className={classes.title}>
						{props.name ? props.name : 'Ascalon'}
					</Typography>
					{props.navBar && props.navBar}

					<div>
						{username && <span style={{ padding: '0 10px' }}>{username}</span>}

						<Button
							color="inherit"
							onClick={() => {
								requestLogout();
							}}
						>
							<ExitToAppIcon />
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
