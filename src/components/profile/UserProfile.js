import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './UserProfile.css';

Chart.register(...registerables);

const UserProfile = () => {
  const { userData } = useUser();
  const [problemRatings, setProblemRatings] = useState([]);
  const [submissionLanguages, setSubmissionLanguages] = useState([]);
  const [verdicts, setVerdicts] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    if (userData) {
      const storedProblemRatings = localStorage.getItem('problemRatings');
      const storedSubmissionLanguages = localStorage.getItem('submissionLanguages');
      const storedVerdicts = localStorage.getItem('verdicts');

      if (storedProblemRatings && storedSubmissionLanguages && storedVerdicts) {
        setProblemRatings(JSON.parse(storedProblemRatings));
        setSubmissionLanguages(JSON.parse(storedSubmissionLanguages));
        setVerdicts(JSON.parse(storedVerdicts));
      } else {
        fetchProblemRatingsData();
        fetchSubmissionLanguagesData();
        fetchVerdictData();
      }
    }
  }, [userData]);

  const fetchProblemRatingsData = async () => {
    const response = await fetch(`https://codeforces.com/api/user.status?handle=${userData.codeforcesInfo.handle}`);
    const data = await response.json();
    const ratings = data.result.reduce((acc, submission) => {
      if (submission.verdict === 'OK' && submission.problem.rating) {
        acc[submission.problem.rating] = (acc[submission.problem.rating] || 0) + 1;
      }
      return acc;
    }, {});
    const ratingsArray = Object.keys(ratings).map(rating => ({
      rating: parseInt(rating),
      count: ratings[rating]
    }));
    setProblemRatings(ratingsArray);
    localStorage.setItem('problemRatings', JSON.stringify(ratingsArray));
  };

  const fetchSubmissionLanguagesData = async () => {
    const response = await fetch(`https://codeforces.com/api/user.status?handle=${userData.codeforcesInfo.handle}`);
    const data = await response.json();
    const languages = data.result.reduce((acc, submission) => {
      const language = submission.programmingLanguage;
      acc[language] = (acc[language] || 0) + 1;
      return acc;
    }, {});
    const languagesArray = Object.keys(languages).map(language => ({
      language: language,
      count: languages[language]
    }));
    setSubmissionLanguages(languagesArray);
    localStorage.setItem('submissionLanguages', JSON.stringify(languagesArray));
  };

  const fetchVerdictData = async () => {
    const response = await fetch(`https://codeforces.com/api/user.status?handle=${userData.codeforcesInfo.handle}`);
    const data = await response.json();
    const verdicts = data.result.reduce((acc, submission) => {
      const verdict = submission.verdict;
      acc[verdict] = (acc[verdict] || 0) + 1;
      return acc;
    }, {});
    const verdictsArray = Object.keys(verdicts).map(verdict => ({
      verdict: verdict,
      count: verdicts[verdict]
    }));
    setVerdicts(verdictsArray);
    localStorage.setItem('verdicts', JSON.stringify(verdictsArray));
  };

  const handleRefresh = () => {
    fetchProblemRatingsData();
    fetchSubmissionLanguagesData();
    fetchVerdictData();
  };

  if (!userData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">No user data available</Typography>
      </Box>
    );
  }

  const { codeforcesInfo, ratingChanges } = userData;

  const ratingChangeData = {
    labels: ratingChanges.map(change => new Date(change.contestTime * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Rating',
        data: ratingChanges.map(change => change.newRating),
        borderColor: '#FFA500',
        fill: false,
        backgroundColor: '#FFA500',
      },
    ],
  };

  const ratingChangeOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const idx = tooltipItems[0].dataIndex;
            return `Contest: ${ratingChanges[idx].contestName}`;
          },
          label: (tooltipItem) => {
            const idx = tooltipItem.dataIndex;
            const change = ratingChanges[idx];
            return [
              `Rank: ${change.rank}`,
              `Old Rating: ${change.oldRating}`,
              `New Rating: ${change.newRating}`,
              `Change: ${change.newRating - change.oldRating}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Rating'
        }
      }
    }
  };

  const submissionLanguagesData = {
    labels: submissionLanguages.map(lang => lang.language),
    datasets: [
      {
        label: 'Submissions',
        data: submissionLanguages.map(lang => lang.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const problemRatingsData = {
    labels: problemRatings.map(rating => rating.rating),
    datasets: [
      {
        label: 'Problems Solved',
        data: problemRatings.map(rating => rating.count),
        backgroundColor: [
          'rgba(128, 128, 128, 0.6)',
          'rgba(192, 192, 192, 0.6)',
          'rgba(144, 238, 144, 0.6)',
          'rgba(0, 128, 0, 0.6)',
          'rgba(0, 255, 255, 0.6)',
          'rgba(0, 0, 255, 0.6)',
          'rgba(128, 0, 128, 0.6)',
        ],
        borderColor: [
          'rgba(128, 128, 128, 1)',
          'rgba(192, 192, 192, 1)',
          'rgba(144, 238, 144, 1)',
          'rgba(0, 128, 0, 1)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(128, 0, 128, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const verdictsData = {
    labels: verdicts.map(verdict => verdict.verdict),
    datasets: [
      {
        label: 'Verdicts',
        data: verdicts.map(verdict => verdict.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box className="user-profile-container">
      <Box className="user-info">
        <Typography variant="h4" gutterBottom>
          {codeforcesInfo.handle}'s Profile
        </Typography>
        <Typography variant="subtitle1">Rank: {codeforcesInfo.rank}</Typography>
        <Typography variant="subtitle1">Rating: {codeforcesInfo.rating}</Typography>
        <Typography variant="subtitle1">Max Rank: {codeforcesInfo.maxRank}</Typography>
        <Typography variant="subtitle1">Max Rating: {codeforcesInfo.maxRating}</Typography>
      </Box>

      <Button variant="contained" color="primary" onClick={handleRefresh}>Refresh</Button>

      <Typography variant="h5" gutterBottom>
        Rating Changes
      </Typography>
      <TableContainer component={Paper} className="rating-changes-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Contest Name</TableCell>
              <TableCell align="right">Rank</TableCell>
              <TableCell align="right">Old Rating</TableCell>
              <TableCell align="right">New Rating</TableCell>
              <TableCell align="right">Rating Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratingChanges.map(change => (
              <TableRow key={change.contestId}>
                <TableCell>{change.contestName}</TableCell>
                <TableCell align="right">{change.rank}</TableCell>
                <TableCell align="right">{change.oldRating}</TableCell>
                <TableCell align="right">{change.newRating}</TableCell>
                <TableCell align="right">{change.newRating - change.oldRating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="chart-container">
        <Typography variant="h5" gutterBottom>
          Rating Change Over Time
        </Typography>
        <Line ref={chartRef} data={ratingChangeData} options={ratingChangeOptions} />
      </Box>

      <Box className="chart-container">
        <Typography variant="h5" gutterBottom>
          Submission Languages
        </Typography>
        <Bar data={submissionLanguagesData} />
      </Box>

      <Box className="chart-container">
        <Typography variant="h5" gutterBottom>
          Problem Ratings
        </Typography>
        <Bar data={problemRatingsData} />
      </Box>

      <Box className="chart-container">
        <Typography variant="h5" gutterBottom>
          Submission Verdicts
        </Typography>
        <Bar data={verdictsData} />
      </Box>
    </Box>
  );
};

export default UserProfile;