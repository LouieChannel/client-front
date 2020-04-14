import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as signalR from '@microsoft/signalr';
import Header from '../components/header/Header';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: 1200,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const BASE_URL = process.env.BASE_URL || 'http://34.77.137.219';

export default function Album() {
  const classes = useStyles();

  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${BASE_URL}/logist/`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  hubConnection
    .start()
    .then((a) => {
      if (hubConnection.connectionId) {
        hubConnection.send('GetAllTasks');
      }
    })
    .catch((e) => console.log(e));

  useEffect(() => {
    hubConnection.on('GetAllTasks', (message) => {
      console.log('data', message);
    });
  }, [hubConnection]);
  return (
    <>
      <CssBaseline />
      <Header name="Логист" />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="l">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name} hover>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
        </Container>
      </main>
      {/* End footer */}
    </>
  );
}
