import db from '../../config/database';
import {
  fetchAllUserQuery,
  fetchUserQuery,
  fetchUserByEmailQuery
} from './userQueries';
import {
  success,
  error
} from '../../lib/log';

export const fetchAllUserController = async (req, res) => {
  try {
    const data = await fetchAllUserQuery();
    success('fetchAllUserController - successfully fetched data ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('fetchAllUserController - error= ', err);
    throw new Error(err);
  }
};

export const fetchSingleUserController = async (req, res) => {
  try {
    let user_id = parseInt(req.params.id);
    const data = await fetchUserQuery(user_id);
    success('fetchSingleUserController - successfully fetched data ', data);
    //console.log(data)
    return res.status(200).send(data);
  } catch (err) {
    error('fetchSingleUserController - error= ', err);
    throw new Error(err);
  }
};

export const fetchSingleUserByEmailController = async (req, res) => {
  try {
    let email = req.params.email;
    const data = await fetchUserByEmailQuery(email);
    success('fetchSingleUserByEmailController - successfully fetched data ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('fetchSingleUserByEmailController - error= ', err);
    throw new Error(err);
  }
}