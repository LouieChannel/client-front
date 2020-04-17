import * as signalR from '@microsoft/signalr';

function buildConnection(url, options) {
  return new signalR.HubConnectionBuilder()
    .withUrl(url, options)
    .configureLogging(signalR.LogLevel.Information)
    .build();
}

export default buildConnection;
