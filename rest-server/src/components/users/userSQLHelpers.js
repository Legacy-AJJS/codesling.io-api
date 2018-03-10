export const fetchAllUserHelper = () => {
  return `
    SELECT id, email, username, password, clout, kdr
    FROM users
  `;
}

export const fetchUserHelper = (user_id) => {
  return `
    SELECT id, email, username, password, clout, kdr
    FROM users
    WHERE id=${user_id}
  `;
};

export const fetchUserByEmailHelper = (user_email) => {
  return `
    SELECT id
    FROM users
    WHERE email='${user_email}'
  `;
};
