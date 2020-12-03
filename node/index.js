const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk');

const AddAccountInfoTransaction = require('../transactions/add-account-info');
const RegisterTravelTransaction = require('../transactions/register-travel');
const BookTravelTransaction = require('../transactions/book-travel');
const StartTravelransaction = require('../transactions/start-travel');
const EndTravelTransaction = require('../transactions/end-travel');

const { ExtendedHTTPApiModule } = require('@moosty/lisk-extended-api');


configDevnet.app.label = 'lisk-ride';
configDevnet.modules.http_api.access.public = true;
// configDevnet.components.storage.host = 'db';
const app = new Application(genesisBlockDevnet, configDevnet);

app.registerTransaction(AddAccountInfoTransaction);
app.registerTransaction(RegisterTravelTransaction);
app.registerTransaction(BookTravelTransaction);
app.registerTransaction(StartTravelransaction);
app.registerTransaction(EndTravelTransaction);

app.registerModule(ExtendedHTTPApiModule, {
    port: 2020,
    limit: 1000,
    assets: ['destination', 'pickUpLocation', 'pickUpDate', 'availableSeatCount', 'pricePerSeat', 'carId']
  });

app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(0);
    });