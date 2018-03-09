import { escape } from 'pg-escape';

export const addTestCaseHelper = ({ content, challenge_id }) => {
  return escape(`
    INSERT INTO testCases (content, challenge_id)
    VALUES ('${content}', ${challenge_id})
  `);
};

export const getTestCaseHelper = (challenge_id) => {
  return `
    SELECT content FROM testCases WHERE challenge_id=${challenge_id}
  `
};