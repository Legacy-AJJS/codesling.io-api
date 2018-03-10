import axios from 'axios';

import { success } from './lib/log';
import {
  serverInitialState,
  serverChanged,
  serverLeave,
  serverRun,
  serverMessage,
  serverEmail,
  serverDisconnect
} from './serverEvents';

/**
 *
 *  Client emissions (server listeners)
 *
 *  more on socket emissions:
 *  @url {https://socket.io/docs/emit-cheatsheet/}
 *
 *  @param room is an ES6 Map, containing { id, state }
 *  @url {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map}
 *
 */
const clientReady = ({ io, client, room }, payload) => {
  success('client ready heard');
  serverInitialState({ io, client, room }, payload);
};

const clientUpdate = ({ io, client, room }, payload) => {
  const { text, email } = payload;
  success('client update heard. payload.text = ', payload);
  room.set('text', text);
  room.set('email', email);
  serverChanged({ io, client, room });
};

const clientDisconnect = ({ io, room }) => {
  success('client disconnected');
  serverLeave({ io, room });
};

const clientRun = async ({ io, room }, payload) => {
  success('running code from client. room.get("text") = ', room.get('text'));
  const { text, email, challengeId } = payload;
  const url = process.env.CODERUNNER_SERVICE_URL;

  try {
    const { data } = await axios.post(`${url}/submit-code`, { code: text, id: challengeId });
    const stdout = data;
    serverRun({ io, room }, { stdout, email });
  } catch (e) {
    success('error posting to coderunner service from socket server. e = ', e);
  }
};

const clientMessage = async ({ io, room }, payload) => {
  success('client message heard');
  const url = process.env.REST_SERVER_URL;
  try {
    const { data } = await axios.post(`${url}/messages/`, payload);
    serverMessage({ io, room }, data);
  } catch (e) {
    success('error saving message to the database. e = ', e);
  }
};

const clientRecordHistory = async ({ io, room }, payload) => {
  const { challenge, winner, loser, time } = payload;

  try {
    success('posting history for this challenge');
    const winnerData = await axios.get(`http://localhost:3396/api/users/fetchUserByEmail/${winner}`);
    const winnerId = winnerData.data.rows[0].id;

    const loserData = await axios.get(`http://localhost:3396/api/users/fetchUserByEmail/${loser}`);
    const loserId = loserData.data.rows[0].id;

    let winnerHistory = {
      outcome: 1,
      time: time,
      clout: 0,
      user_id: winnerId,
      challenger_id: loserId,
      challenge_id: challenge.id
    }

    let loserHistory = {
      outcome: 0,
      time: time,
      clout: 0,
      user_id: loserId,
      challenger_id: winnerId,
      challenge_id: challenge.id
    }

    await axios.post(`http://localhost:3396/api/history/addHistory`, winnerHistory);
    await axios.post(`http://localhost:3396/api/history/addHistory`, loserHistory);

    serverDisconnect({ io, room });

  } catch (e) {
    success('error posting history to database. e= ', e);
  }

};



const clientEmitters = {
  'client.ready': clientReady,
  'client.update': clientUpdate,
  'client.disconnect': clientDisconnect,
  'client.run': clientRun,
  'client.message': clientMessage,
  'client.recordHistory': clientRecordHistory
};

export default clientEmitters;
