import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import buildConnection from '../../utils/signalRconnection';
import Header from '../../components/header/Header';
import Button from '@material-ui/core/Button';
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import { convertArrayToObject } from '../../utils/helpers';
import Spinner from '../../components/spinner/Spinner';
import { getStatusIcon } from '../../components/Icons';
import TableHead from '@material-ui/core/TableHead';
import format from 'date-fns/format';
import { ru } from 'date-fns/locale';

import State1Image from '../../assets/state1.png';
import State2Image from '../../assets/state2.png';
import State3Image from '../../assets/state3.png';
import State4Image from '../../assets/state4.png';
import State5Image from '../../assets/state5.png';

const BASE_URL = process.env.BASE_URL || 'http://34.77.137.219';

export default function Logist() {
	const [data, setData] = useState({});
	const classes = useStyles();
	const token = localStorage.getItem('access_token');

	const hubConnection = buildConnection(`${BASE_URL}/logist`, {
		accessTokenFactory: () => token,
	});

	useEffect(() => {
		function startConnection() {
			hubConnection
				.start()
				.then(() => {
					if (hubConnection.connectionId) {
						hubConnection.send('GetAllTasks');
					}
				})
				.catch((e) => console.log(e));
		}

		startConnection();
		hubConnection.on('GetAllTasks', (data) => {
			console.log('data', new Date(), data);
			const receiveData = convertArrayToObject(JSON.parse(data), 'Id');
			setData(receiveData);
		});

		hubConnection.on('UpdateTask', (data) => {
			console.log('data-UpdateTask', new Date(), data);
			const receiveData = JSON.parse(data);
			setData((state) => ({
				...state,
				[receiveData.Id]: { ...receiveData },
			}));
		});

		hubConnection.on('UpdateStatus', (data) => {
			console.log('data-UpdateStatus', new Date(), data);
			const receiveData = JSON.parse(data);
			setData((state) => ({
				...state,
				[receiveData.Id]: { ...receiveData },
			}));
		});

		hubConnection.on('CreateTask', (data) => {
			console.log('data-CreateTask', new Date(), data);
			const receiveData = JSON.parse(data);
			setData((state) => ({
				...state,
				[receiveData.Id]: { ...receiveData },
			}));
		});

		function setStateMachine(recievedData) {
			setData((state) => ({
				...state,
				[recievedData.Id]: { ...state[recievedData.Id], State: recievedData.State },
			}));
		}

		// setTimeout(() => {
		// 	setStateMachine({
		// 		Id: 47,
		// 		State: 5,
		// 	});
		// }, 5000);

		hubConnection.on('DumperStatus', (data) => {
			console.log('data-DumperStatus', new Date(), JSON.parse(data));
			const receiveData = JSON.parse(data);
			setStateMachine(receiveData);
		});

		return () => {
			hubConnection.stop();
		};
		// eslint-disable-next-line
	}, []);

	let history = useHistory();

	function handleClick() {
		history.push('/create-task');
	}

	return (
		<>
			<Header
				name="Логист"
				navBar={
					<Button variant="contained" onClick={handleClick}>
						Создать задачу
					</Button>
				}
			/>
			<CssBaseline />
			<div>
				<div className={classes.heroContent}>
					<Container maxWidth="lg">
						{Object.keys(data).length > 0 ? (
							<TableContainer component={Paper}>
								{console.log(data, '+++++++')}
								<Table className={classes.table} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Статус</TableCell>
											<TableCell>Дата</TableCell>
											<TableCell>Описание</TableCell>
											<TableCell>Цель</TableCell>
											<TableCell>Водитель</TableCell>
											<TableCell>Состояние</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{Object.keys(data)
											.reverse()
											.map((i) => {
												const item = data[i];
												return (
													<TableRow key={item.Id} hover>
														<TableCell component="th" scope="row">
															{getStatusIcon(item.Status)}
														</TableCell>
														<TableCell>
															{format(new Date(item.CreatedAt), 'd  MMMM h:m', {
																locale: ru,
															})}
														</TableCell>
														<TableCell>{item.Description}</TableCell>
														<TableCell>{item.Entity}</TableCell>
														<TableCell component="th" scope="row">
															{item.Driver.FullName}
														</TableCell>
														<TableCell>
															{item.State ? (
																<>
																	{item.State === 1 && (
																		<img src={State1Image} alt="State1Image" />
																	)}
																	{item.State === 2 && (
																		<img src={State2Image} alt="State2Image" />
																	)}
																	{item.State === 3 && (
																		<img src={State3Image} alt="State3Image" />
																	)}
																	{item.State === 4 && (
																		<img src={State4Image} alt="State4Image" />
																	)}
																	{item.State === 5 && (
																		<img src={State5Image} alt="State5Image" />
																	)}
																</>
															) : (
																'-'
															)}
														</TableCell>
													</TableRow>
												);
											})}
									</TableBody>
								</Table>
							</TableContainer>
						) : (
							<Spinner />
						)}
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth="md">
					{/* End hero unit */}
				</Container>
			</div>
			{/* End footer */}
		</>
	);
}
