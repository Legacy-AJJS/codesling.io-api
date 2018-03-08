import db from '../../config/database';
import {
  addTestCaseHelper,
  getTestCaseHelper
} from './testCasesSQLHelpers';
import {
  success,
  error
} from '../../lib/log';

export const addTestCaseQuery = async (test, id) => {
  try {
    let body = {content: test, challenge_id: id};
    const queryString = addTestCaseHelper(body);
    const data = db.queryAsync(queryString);
    success('addTestCaseQuery - successfully added test case ', data);
    return data;
  } catch (err) {
    error('addTestCaseQuery - error= ', err);
  }
};

export const getTestCaseQuery = async (id) => {
  try {
    const queryString = getTestCaseHelper(id);
    const data = db.queryAsync(queryString);
    success('getTestCaseQuery - successfully fetched test case ', data);
    return data;
  } catch (err) {
    error('getTestCaseQuery - error= ', err);
  }
};
