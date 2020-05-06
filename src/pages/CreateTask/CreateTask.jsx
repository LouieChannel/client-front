import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Controller, useForm } from 'react-hook-form';
import Header from '../../components/header/Header';
import useStyles from './style';
import buildConnection from '../../utils/signalRconnection';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { BASE_URL, conditions, TOKEN } from './config';
import { useHistory } from 'react-router-dom';
import CustomMap from './CustomMap';
import InputSearch from './InputSearch';
import { Map, YMaps } from 'react-yandex-maps';

export default function CreateTask() {
	const classes = useStyles();
	const { control, handleSubmit } = useForm();

	const [drivers, setDrivers] = useState([]);
	const [driverValue, setDriverValue] = useState(2);
	const [conditionValue, setConditionValue] = useState(1);

	const [startArray, setStartArray] = useState([]);
	const [endArray, setEndArray] = useState([]);
	const [mapReady, setMapReady] = useState(false);

	let history = useHistory();

	const handleChangeSelect = (e) => {
		const setValue = {
			'driver-select': (value) => {
				setDriverValue(value);
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

	const [remove, setRemove] = useState(true);

	useEffect(() => {
		if (!remove) {
			setTimeout(() => {
				setRemove(true);
			}, 400);
		}
	}, [remove]);

	useEffect(() => {
		function startConnection() {
			hubConnection
				.start()
				.then(() => {
					hubConnection.invoke('GetAllDrivers');
				})
				.catch((e) => console.log(e));
		}

		if (!hubConnection.connectionId) {
			startConnection();
		}

		return () => {
			hubConnection.stop();
		};
	}, [hubConnection]);

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
			StartLatitude: startArray[0],
			StartLongitude: startArray[1],
			EndLatitude: endArray[0],
			EndLongitude: endArray[1],
			Driver: Driver.length > 0 ? { Id: Driver[0].Id, FullName: Driver[0].FullName } : {},
			Entity: Entity[0].value,
			Status: 0,
		};

		console.log(sendingData);

		hubConnection.send('CreateTask', JSON.stringify(sendingData));

		history.push('/logist');
	};

	function handleChangeInputSearch(value) {
		if (startArray.length === 0) {
			setStartArray(value);
		} else {
			setEndArray(value);
		}

		setRemove(false);
	}

	function handleClick() {
		if (startArray.length > 0 && endArray.length > 0) {
			setMapReady(true);
		}
	}

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
							<Controller
								as={TextField}
								id="time"
								type="text"
								margin="normal"
								fullWidth
								label="Описание"
								variant="outlined"
								name="Description"
								control={control}
								defaultValue=""
							/>
							<Typography component="h1" variant="h6" style={{ marginTop: '10px' }}>
								Задание
							</Typography>

							{remove && <InputSearch onChange={handleChangeInputSearch} />}

							<Grid>
								<TextField
									variant="outlined"
									margin="normal"
									id="StartLatitude"
									label="Широта"
									name="StartLatitude"
									value={startArray.length > 0 ? startArray[0] : ''}
								/>
								<TextField
									variant="outlined"
									margin="normal"
									id="StartLongitude"
									label="Долгота"
									name="StartLongitude"
									value={startArray.length > 0 ? startArray[1] : ''}
								/>
							</Grid>

							<Grid>
								<TextField
									variant="outlined"
									margin="normal"
									id="EndLatitude"
									label="Широта"
									name="EndLatitude"
									value={endArray.length > 0 ? endArray[0] : ''}
								/>
								<TextField
									variant="outlined"
									margin="normal"
									id="EndLongitude"
									label="Долгота"
									name="EndLongitude"
									value={endArray.length > 0 ? endArray[1] : ''}
								/>
							</Grid>

							<Grid>
								<Button variant="contained" color="primary" onClick={handleClick}>
									Построить маршут
								</Button>
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
							</Grid>
						</form>
					</div>
				</Grid>
				<Grid item xs={false} sm={4} md={8}>
					{mapReady ? (
						<CustomMap route={[startArray, endArray]} />
					) : (
						<YMaps>
							<Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width="100%" height="100%" />
						</YMaps>
					)}
				</Grid>
			</Grid>
		</>
	);
}
