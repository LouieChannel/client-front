import React, { useEffect } from 'react';
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

export default function CreateTask() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    register({ name: 'email' });
    register({ name: 'password' });
  }, [register]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Header name="Create task" />
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
              />
              <Typography
                component="h1"
                variant="h6"
                style={{ marginTop: '10px' }}
              >
                Задание
              </Typography>

              <Grid>
                <TextField
                  variant="outlined"
                  margin="normal"
                  id="latitude_1"
                  label="Широта"
                  name="latitude_1"
                  inputRef={register}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  id="longitude_2"
                  label="Долгота"
                  name="longitude_2"
                  inputRef={register}
                />
              </Grid>

              <Grid>
                <TextField
                  variant="outlined"
                  margin="normal"
                  id="latitude_2"
                  label="Широта"
                  name="latitude_2"
                  inputRef={register}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  id="longitude_2"
                  label="Долгота"
                  name="longitude_2"
                  inputRef={register}
                />
              </Grid>

              <Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Сохранить
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Отменить
                </Button>
              </Grid>
            </form>
          </div>
        </Grid>
        <Grid item xs={false} sm={4} md={8}>
          <YMaps>
            <Map
              defaultState={{ center: [55.75, 37.57], zoom: 9 }}
              width="100%"
              height="100%"
            />
          </YMaps>
        </Grid>
      </Grid>
    </>
  );
}
