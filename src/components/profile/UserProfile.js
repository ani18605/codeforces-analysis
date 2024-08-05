import React from 'react';
import { useUser } from '../../context/UserContext';


const UserProfile = () => {
  const { userData } = useUser();

  if (!userData) {
    return <div>No user data available</div>;
  }

  const { codeforcesInfo, ratingChanges } = userData;

  return (
    <div>
      <h1>{codeforcesInfo.handle}</h1>
      <p>Rank: {codeforcesInfo.rank}</p>
      <p>Rating: {codeforcesInfo.rating}</p>
      <p>Max Rank: {codeforcesInfo.maxRank}</p>
      <p>Max Rating: {codeforcesInfo.maxRating}</p>

      <h2>Rating Changes</h2>
      <table>
        <thead>
          <tr>
            <th>Contest Name</th>
            <th>Rank</th>
            <th>Old Rating</th>
            <th>New Rating</th>
            <th>Rating Change</th>
          </tr>
        </thead>
        <tbody>
          {ratingChanges.map(change => (
            <tr key={change.contestId}>
              <td>{change.contestName}</td>
              <td>{change.rank}</td>
              <td>{change.oldRating}</td>
              <td>{change.newRating}</td>
              <td>{change.newRating - change.oldRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
