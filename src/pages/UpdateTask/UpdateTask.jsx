import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { YMaps, Map } from 'react-yandex-maps';
import useStyles from './style';
import buildConnection from '../../utils/signalRconnection';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { BASE_URL } from './config';

export default function UpdateTask(props) {
	const classes = useStyles();
	const token = localStorage.getItem('access_token');

	const hubConnection = buildConnection(`${BASE_URL}/driver/`, {
		accessTokenFactory: () => token,
	});

	function startConnection() {
		hubConnection
			.start()
			.then(() => {
				if (hubConnection.connectionId) {
					hubConnection.invoke('GetDriverTasks');
				}
			})
			.catch((e) => console.log(e));
	}

	useEffect(() => {
		startConnection();
		// eslint-disable-next-line
	}, []);

	function handleClick(type) {
		if (type === 'start') {
			const data = { ...props.data, Status: 1 };
			return handleUpdate(data);
		}

		if (type === 'done') {
			const data = { ...props.data, Status: 2 };
			return handleUpdate(data);
		}
	}

	async function handleUpdate(data) {
		console.log({ hubConnection, data });
		if (hubConnection.connectionId) {
			await hubConnection.send('UpdateStatus', JSON.stringify(data));
			await props.onClose();
		}
	}

	if (!props.data) return <div> ...loading</div>;

	return (
		<>
			<Grid container className={classes.root}>
				<CssBaseline />
				<Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
					<div className={classes.paper}>
						<Typography component="h1" variant="h5">
							Получение маршутного задания
						</Typography>
						<form className={classes.form}>
							<TextField
								id="time"
								type="text"
								margin="normal"
								fullWidth
								label="Описание"
								variant="outlined"
								name="Description"
								value={props.data.Description}
								disabled
							/>
							<Typography component="h1" variant="h6" style={{ marginTop: '10px' }}>
								Задание
							</Typography>

							<Grid>
								<TextField
									variant="outlined"
									margin="normal"
									id="StartLatitude"
									label="Широта"
									disabled
									name="StartLatitude"
									value={props.data.StartLatitude}
								/>
								<TextField
									variant="outlined"
									margin="normal"
									id="StartLongitude"
									label="Долгота"
									disabled
									name="StartLongitude"
									value={props.data.StartLongitude}
								/>
							</Grid>

							<Grid>
								<TextField
									disabled
									variant="outlined"
									margin="normal"
									id="EndLatitude"
									label="Широта"
									name="EndLatitude"
									value={props.data.EndLatitude}
								/>
								<TextField
									variant="outlined"
									margin="normal"
									disabled
									id="EndLongitude"
									label="Долгота"
									name="EndLongitude"
									value={props.data.EndLongitude}
								/>
							</Grid>

							<Grid style={{ marginTop: '20px' }}>
								<div>Выберите условие:</div>

								<Select
									labelId="demo-simple-select-label"
									id="condition-select"
									name="condition-select"
									value={1}
									style={{ width: '100%', maxWidth: '350px' }}
									className="text-capitalize"
									disabled
								>
									<MenuItem value={1} className="text-capitalize">
										{props.data.Entity}
									</MenuItem>
								</Select>
							</Grid>

							<div style={{ display: 'flex', marginTop: '20px' }}>
								{props.data.Status === 0 && (
									<Button
										variant="contained"
										color="primary"
										className={classes.submit}
										onClick={() => handleClick('start')}
										name="start"
									>
										Начать задание
									</Button>
								)}

								{props.data.Status === 1 && (
									<Button
										variant="contained"
										color="secondary"
										className={classes.submit}
										onClick={() => handleClick('done')}
										name="done"
									>
										Завершить задание
									</Button>
								)}
							</div>
						</form>
					</div>
				</Grid>
				<Grid item xs={false} sm={4} md={8}>
					<YMaps>
						<Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width="100%" height="100%" />
					</YMaps>
				</Grid>
			</Grid>
		</>
	);
}
