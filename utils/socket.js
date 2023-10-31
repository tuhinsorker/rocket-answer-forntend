import io from "socket.io-client";

let socket;

export const initiateSocket = () => {
  // socket = io("http://192.168.1.209:5005/");
  socket = io(process.env.NEXT_PUBLIC_BASE_URL_SOCKET);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const getSocket = () => {
  return socket;
};
