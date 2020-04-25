import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { YMaps, Map } from 'react-yandex-maps';
import Header from '../../components/header/Header';
import useStyles from './style';
import buildConnection from '../../utils/signalRconnection';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { BASE_URL, conditions, statuses, TOKEN } from './config';

export default function CreateTask() {
	const classes = useStyles();
	const { register, handleSubmit } = useForm();

	const [drivers, setDrivers] = useState([]);
	const [driverValue, setDriverValue] = useState(2);
	const [statusValue, setStatusValue] = useState(1);
	const [conditionValue, setConditionValue] = useState(1);

	const handleChangeSelect = (e) => {
		const setValue = {
			'driver-select': (value) => {
				setDriverValue(value);
			},
			'status-select': (value) => {
				setStatusValue(value);
			},
			'condition-select': (value) => {
				setConditionValue(value);
			},
		};

		setValue[e.target.name](e.target.value);
	};

	const hubConnection = buildConnection(`${BASE_URL}/logist/`, {
		accessTokenFactory: () => TOKEN,
	});

	useEffect(() => {
		function startConnection() {
			hubConnection
				.start()
				.then(() => {
					hubConnection.send('GetAllDrivers');
				})
				.catch((e) => console.log(e));
		}

		startConnection();

		return () => {
			hubConnection.stop();
		};
	}, [hubConnection]);

	useEffect(() => {
		register({ name: 'Description' });
		register({ name: 'StartLatitude' });
		register({ name: 'StartLongitude' });
		register({ name: 'EndLatitude' });
		register({ name: 'EndLongitude' });
	}, [register]);

	useEffect(() => {
		hubConnection.on('GetAllDrivers', (data) => {
			if (drivers.length === 0) {
				const parsedData = JSON.parse(data);
				setDrivers(parsedData);
			}
		});
		// eslint-disable-next-line
	}, []);

	const onSubmit = (data) => {
		const Driver = drivers.filter((item) => item.Id === driverValue);
		const Entity = conditions.filter((item) => item.id === conditionValue);

		const sendingData = {
			...data,
			Driver: Driver.length > 0 ? { Id: Driver[0].Id, FullName: Driver[0].FullName } : {},
			Entity: Entity[0].value,
			Status: statusValue,
		};

		console.log(sendingData);

		hubConnection.send('CreateTask', JSON.stringify(sendingData)).then((e) => (window.href = '/'));
	};

	return (
		<>
			<Header name="Create task for driver" />
			<Grid container component="main" className={classes.root}>
				<CssBaseline />
				<Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
					<div className={classes.paper}>
						<Typography component="h1" variant="h5">
							Создание маршутных заданий
						</Typography>
						<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
							<TextField
								id="time"
								type="text"
								margin="normal"
								fullWidth
								label="Описание"
								variant="outlined"
								name="Description"
								inputRef={register}
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
									name="StartLatitude"
									inputRef={register}
								/>
								<TextField
									variant="outlined"
									margin="normal"
									id="StartLongitude"
									label="Долгота"
									name="StartLongitude"
									inputRef={register}
								/>
							</Grid>

							<Grid>
								<TextField
									variant="outlined"
									margin="normal"
									id="EndLatitude"
									label="Широта"
									name="EndLatitude"
									inputRef={register}
								/>
								<TextField
									variant="outlined"
									margin="normal"
									id="EndLongitude"
									label="Долгота"
									name="EndLongitude"
									inputRef={register}
								/>
							</Grid>

							<Grid style={{ marginTop: '20px' }}>
								<div>Выберите водителя:</div>
								{drivers.length > 0 ? (
									<Select
										labelId="demo-simple-select-label"
										id="driver-select"
										name="driver-select"
										value={driverValue}
										style={{ width: '100%', maxWidth: '350px' }}
										onChange={handleChangeSelect}
										className="text-capitalize"
									>
										{console.log(drivers)}

										{drivers.map((item) => (
											<MenuItem key={item.Id} value={item.Id} className="text-capitalize">
												{item.FullName}
											</MenuItem>
										))}
									</Select>
								) : (
									<div>...Loading drivers</div>
								)}
							</Grid>
							<Grid style={{ marginTop: '20px' }}>
								<div>Выберите состояние:</div>

								<Select
									labelId="demo-simple-select-label"
									id="status-select"
									name="status-select"
									value={statusValue}
									style={{ width: '100%', maxWidth: '350px' }}
									className="text-capitalize"
									onChange={handleChangeSelect}
								>
									{statuses.map((item) => (
										<MenuItem key={item.id} className="text-capitalize" value={item.id}>
											{item.value}
										</MenuItem>
									))}
								</Select>
							</Grid>

							<Grid style={{ marginTop: '20px' }}>
								<div>Выберите условие:</div>

								<Select
									labelId="demo-simple-select-label"
									id="condition-select"
									name="condition-select"
									value={conditionValue}
									style={{ width: '100%', maxWidth: '350px' }}
									onChange={handleChangeSelect}
									className="text-capitalize"
								>
									{conditions.map((item) => (
										<MenuItem key={item.id} value={item.id} className="text-capitalize">
											{item.value}
										</MenuItem>
									))}
								</Select>
							</Grid>

							<Grid>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									style={{ marginTop: '20px' }}
									className={classes.submit}
								>
									Сохранить
								</Button>
								{/* <Button
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={onSubmit}
                >
                  Отменить
                </Button> */}
							</Grid>
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
