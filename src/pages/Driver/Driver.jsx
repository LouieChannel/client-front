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

const BASE_URL = process.env.BASE_URL || 'http://34.77.137.219';

export default function Driver() {
  const [data, setData] = useState([]);

  const classes = useStyles();
  const token = localStorage.getItem('access_token');

  const hubConnection = buildConnection(`${BASE_URL}/driver/`, {
    accessTokenFactory: () => token,
  });

  useEffect(() => {
    function startConnection() {
      hubConnection
        .start()
        .then(() => {
          if (hubConnection.connectionId) {
            hubConnection.send('GetDriverTasks');
          }
        })
        .catch((e) => console.log(e));
    }
    startConnection();

    hubConnection.on('GetDriverTasks', (data) => {
      setData(JSON.parse(data));
    });

    return () => {
      hubConnection.stop();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header name="Driver" />
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="xl">
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
      </main>
      {/* End footer */}
    </>
  );
}
