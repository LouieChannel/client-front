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
import useStyles from './style';

const BASE_URL = process.env.BASE_URL || 'http://34.77.137.219';

export default function Logist() {
  const [data, setData] = useState([]);
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
      console.log('data', data);
      setData(JSON.parse(data));
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header name="Logist" />
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            {data.length > 0 && (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item.Id} hover>
                        <TableCell component="th" scope="row">
                          Driver :{item.Driver.FullName}
                        </TableCell>
                        <TableCell align="right">
                          {' '}
                          Logist :{item.Logist.FullName}
                        </TableCell>
                        <TableCell align="right">
                          CreatedAt :{item.CreatedAt}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
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
