import * as signalR from '@microsoft/signalr';

function buildConnection(url) {
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  return hubConnection;
}

export default buildConnection;
