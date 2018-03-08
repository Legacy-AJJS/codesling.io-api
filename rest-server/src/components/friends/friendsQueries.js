import { globalQueryHelper } from '../../lib/components/globals';
import {
  addFriendHelper,
  removeFriendHelper,
  fetchAllFriendsHelper
} from './friendsSQLHelpers';

export const friendQuery = async (payload, url) => {
  if (url === '/addFriend') {
    let isFriend = +payload.user_id === payload.friend_id;
    let friends = await globalQueryHelper(payload, fetchAllFriendsHelper, 'fetchAllFriendQuery');
    
    isFriend = friends.rows.reduce((acc, friend) => {
      return friend.id === payload.friend_id || acc;
    }, false) || isFriend;

    if (!isFriend) {
      return await globalQueryHelper(payload, addFriendHelper, 'addFriendQuery');
    }
  } else if (url.includes('/deleteFriend')) {
    return await globalQueryHelper(payload, removeFriendHelper, 'deleteFriendQuery');
  } else {
    return await globalQueryHelper(payload, fetchAllFriendsHelper, 'fetchAllFriendQuery');
  }
};
