import axios from 'axios';

export const fetchUserData = async (codeforcesId, codechefId) => {
  const userInfoUrl = `https://codeforces.com/api/user.info?handles=${codeforcesId}`;
  const ratingChangesUrl = `https://codeforces.com/api/user.rating?handle=${codeforcesId}`;

  try {
    const [userInfoResponse, ratingChangesResponse] = await Promise.all([
      axios.get(userInfoUrl),
      axios.get(ratingChangesUrl),
    ]);

    if (userInfoResponse.data.status !== 'OK' || ratingChangesResponse.data.status !== 'OK') {
      throw new Error('Failed to fetch data from Codeforces API');
    }

    return {
      codeforcesInfo: userInfoResponse.data.result[0],
      ratingChanges: ratingChangesResponse.data.result,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
