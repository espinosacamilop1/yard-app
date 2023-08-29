import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const apiUrl = 'http://localhost:3000/api/clients'; // Replace with your API URL
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json({ responseData: data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
