import * as signalR from '@microsoft/signalr';

function start() {
  try {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://34.77.137.219/logist/')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    hubConnection.start().then((a) => {
      if (hubConnection.connectionId) {
        hubConnection.invoke('GetAllTasks');
      }
    });
  } catch (error) {
    console.log(error);
  }
}
export default start;
