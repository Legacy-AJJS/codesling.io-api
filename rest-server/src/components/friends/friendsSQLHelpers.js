export const addFriendHelper = ({ user_id, friend_id }) => {
  return `
    INSERT INTO friends (user_id, friend_id)
    VALUES (${user_id}, ${friend_id})
    RETURNING id, user_id, friend_id
  `;
};

export const removeFriendHelper = ({ user_id, friend_id }) => {
  return `
    DELETE FROM friends
    WHERE user_id=${user_id} AND friend_id=${friend_id}
    RETURNING id, user_id, friend_id
  `;
};

export const fetchAllFriendsHelper = ({ user_id }) => {
  return `
    SELECT u.id, u.email, u.username, u.clout, u.kdr
    FROM users AS u
      INNER JOIN friends AS f
      ON (u.id=f.friend_id)
      WHERE f.user_id=${user_id}
  `;
};