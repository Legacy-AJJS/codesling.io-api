import db from '../../config/database';
import {
  fetchAllUserHelper,
  fetchUserHelper,
  fetchUserByEmailHelper
} from './userSQLHelpers';
import {
  success,
  error
} from '../../lib/log';

export const fetchAllUserQuery = async () => {
  try {
    const queryString = fetchAllUserHelper();
    const data = await db.queryAsync(queryString);
    success('fetchAllUserQuery - successfully fetched all users ', data);
    return data;
  } catch (err) {
    error('fetchAllUserQuery - error= ', err);
    throw new Error(err);
  }
};

export const fetchUserQuery = async (payload) => {
  try {
    const queryString = fetchUserHelper(payload);
    const data = db.queryAsync(queryString);
    success('fetchUserQuery - successfully fetched all users ', data);
    return data;
  } catch (err) {
    error('fetchUserQuery - error= ', err);
  }
};

export const fetchUserByEmailQuery = async (payload) => {
  try {
    const queryString = fetchUserByEmailHelper(payload);
    const data = db.queryAsync(queryString);
    success('fetchUserByEmailQuery - successfully fetched user ', data);
    return data;
  } catch (err) {
    error('fetchUserByEmail - error= ', err);
  }
};
