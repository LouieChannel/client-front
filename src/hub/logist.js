import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl('http://34.77.137.219')
  .configureLogging(signalR.LogLevel.Information);

async function start() {
  try {
    await connection.start();
    console.log('connected');
  } catch (err) {
    console.log(err);
    setTimeout(() => start(), 5000);
  }
}

// connection.onclose(async () => {
//   await start();
// });

export { start, connection };
