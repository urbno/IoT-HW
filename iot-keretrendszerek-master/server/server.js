const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const socketio = require('socket.io');
const http = require('http');
const EventHubReader = require('./event-hub-reader.js');
const iotHubConnectionString = "HostName=iot-hf-10.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=sGKJlyehodbCBvKk5Q+lN/sTpUnE3Va3aZt3F5ekuV8=";
const eventHubConsumerGroup = "$default";
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.sockets.on('connection', (socket) => {
    console.log(`new connection id: ${socket.id}`);
    sendData(socket);
    socket.on('disconnect', () => {
        console.log('Disconnected');
    })
})

router.get('*', (req, res) => {
    res.send('Server is running');
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors());
app.use(router);
server.listen(PORT, () => console.log('Server is running on port', PORT));

function sendData(socket) {
    const eventHubReader = new EventHubReader(iotHubConnectionString, eventHubConsumerGroup);

    (async () => {
        await eventHubReader.startReadMessage((message, date) => {
            try {
                const payload = {
                    ...message,
                    date: date.toISOString()
                };

                console.log("payload: ", payload);
                socket.emit('payload', payload);
            } catch (err) {
                console.error('Error broadcasting: [%s] from [%s].', err, message);
            }
        });
    })().catch();
}
