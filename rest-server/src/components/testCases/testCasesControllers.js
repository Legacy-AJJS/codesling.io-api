import {
  addTestCaseQuery,
  getTestCaseQuery
} from './testCasesQuery';
import {
  success,
  error
} from '../../lib/log';

export const addTestCaseController = async (req, res) => {
  try {
    const data = await addTestCaseQuery(req.body);
    success('addTestCaseController - successfully added test case ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('addTestCaseController - error= ', err);
  }
};

export const getTestCaseController = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const data = await getTestCaseQuery(id);
    success('getTestCaseController - successfully fetched test case ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('getTestCaseController - error= ', err);
  }
};
