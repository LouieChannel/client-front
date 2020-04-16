import * as signalR from '@microsoft/signalr';

function buildConnection(url, options) {
  console.log(options);
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(url, options)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  return hubConnection;
}

export default buildConnection;
