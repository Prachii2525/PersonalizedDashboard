export const fetchNewsData = async () => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    console.error('API key is missing');
    return [];
  }

  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Connection': 'upgrade', // Try adding this header
        // Add other headers if needed
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }

    const data = await response.json();

    // Ensure that the response contains articles
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching news data:', error);
    return [];
  }
};
