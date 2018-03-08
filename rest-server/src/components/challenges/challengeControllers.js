import {
  addChallengeQuery
} from './challengeQueries';
import {
  addUserChallengeQuery
} from '../usersChallenges/usersChallengesQueries';
import {
  success,
  error
} from '../../lib/log';
import {
  addTestCaseQuery
} from '../testCases/testCasesQuery';

export const addChallengeController = async (req, res) => {
  try {
    /**
     * 
     */
    console.log(req.body)
    const { rows } = await addChallengeQuery(req.body);
    console.log(rows[0].id)
    success('addChallengeController - successfully added challenge ', rows[0]);
    req.body.challenge_id = rows[0].id;
    await addUserChallengeQuery(req.body);
    await addTestCaseQuery(req.body.testCase, rows[0].id);
    success('addUserChallengeQuery - successfully added user challenge ');
    return res.status(200).send(rows[0]);
  } catch (err) {
    error('addChallengeController - error= ', error);
  }
};

