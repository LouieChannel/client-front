import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../../components/header/Header';
import buildConnection from '../../utils/signalRconnection';
import useStyles from './style';
import Button from '@material-ui/core/Button';
import Popup from '../../components/popup/Popup';
import UpdateTask from '../UpdateTask/UpdateTask';
import { convertArrayToObject } from '../../utils/helpers';
import Spinner from '../../components/spinner/Spinner';

const BASE_URL = process.env.BASE_URL || 'http://34.77.137.219';

export default function Driver() {
	const [data, setData] = useState([]);
	const [isShow, setShow] = useState(false);
	const [currentDriver, setCurrentDriver] = useState({});

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

		hubConnection.on('GetDriverTasks', (data) => {
			const receiveData = convertArrayToObject(JSON.parse(data), 'Id');
			setData(receiveData);
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

		return () => {
			hubConnection.stop();
		};
		// eslint-disable-next-line
	}, []);

	function handleOpen(item) {
		console.log(item);
		setCurrentDriver(item);
		setShow(!isShow);
	}

	return (
		<>
			<Header name="Driver" />
			<CssBaseline />
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth="xl">
						{Object.keys(data).length > 0 ? (
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label="simple table">
									<TableBody>
										{Object.keys(data)
											.reverse()
											.map((i) => {
												let item = data[i];
												return (
													<TableRow
														key={item.Id}
														hover
														onDoubleClick={() => setShow(!isShow)}
													>
														<TableCell component="th" scope="row">
															Driver :{item.Driver.FullName}
														</TableCell>
														<TableCell component="th" scope="row">
															Status :{item.Status}
														</TableCell>
														<TableCell align="right">
															Logist :{item.Logist.FullName}
														</TableCell>
														<TableCell align="right">CreatedAt :{item.CreatedAt}</TableCell>
														<TableCell align="right">
															<Button
																variant="contained"
																onClick={() => handleOpen(item)}
															>
																Открыть
															</Button>
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
			</main>
			{/* End footer */}

			<Popup visible={isShow} onClose={() => setShow(false)}>
				{' '}
				<UpdateTask data={currentDriver} onClose={() => setShow(false)} />
			</Popup>
		</>
	);
}
