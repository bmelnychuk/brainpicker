/* @flow */

import express from 'express';
import bodyParser from 'body-parser';

import * as functions from 'firebase-functions';
import alexaMiddleware from './client/alexa';
import dialogFlowMiddleware from './client/dialogflow';


const app = express();
app.use(bodyParser.json());

const middleware = [
    alexaMiddleware,
    dialogFlowMiddleware
];

app.post('/:client', ...middleware, (request, response) => {
    const { client: clientId } = request.params;
    response
        .status(400)
        .json({ error: `Client '${clientId}' is not supported` });
});

app.listen(3000);
exports.brainpicker = functions.https.onRequest(app);
