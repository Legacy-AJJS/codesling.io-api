import {
  historyQuery,
  historyQueryHelper
} from './historyQueries';
import {
  success,
  error
} from '../../lib/log';

export const historyController = async (req, res) => {
  const { url, method } = req;
  let payload;
  if (method === 'POST' || method === 'PUT') {
    payload = req.body;
  } else {
    payload = req.params;
  }
  try {
    const data = await historyQuery(payload, url);
    success('historyController - successfully retrieved data ', data)
    return res.status(200).send();
  } catch (err) {
    error('historyController - error= ', err);
    throw new Error(err);
  }
};

import { fetchUserQuery } from '../users/userQueries';

export const fetchHistoryController = async (req, res) => {
  
  try {
    const { rows } = await historyQueryHelper(req.params);
    for (var i = 0; i < rows.length; i++) {
     let user = await fetchUserQuery(rows[i].challenger_id);
     rows[i].receiver = user;
    }
    return res.status(200).send(rows);
  } catch (err) {
    error('error fetching messages ', err);
  }
};
