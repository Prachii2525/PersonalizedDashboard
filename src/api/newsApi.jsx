export const fetchNewsData = async () => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    console.error('API key is missing');
    return [];
  }

  try {
    // Updated URL for the Currents API
    const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // No need for 'Connection: upgrade' header
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }

    const data = await response.json();

    // Ensure that the response contains news
    return data.news || [];
  } catch (error) {
    console.error('Error fetching news data:', error);
    return [];
  }
};
