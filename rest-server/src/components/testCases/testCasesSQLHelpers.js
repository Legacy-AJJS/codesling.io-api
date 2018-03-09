const escape = require('pg-escape');

export const addTestCaseHelper = ({ content, challenge_id }) => {
  return `
    INSERT INTO testCases (content, challenge_id)
    VALUES (${escape.literal(content)}, ${challenge_id})
  `;
};

export const getTestCaseHelper = (challenge_id) => {
  return `
    SELECT content FROM testCases WHERE challenge_id=${challenge_id}
  `
};