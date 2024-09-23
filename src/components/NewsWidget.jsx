import React, { useEffect, useState } from 'react';
import Widget from './Widget';
import { fetchNewsData } from '../api/newsApi';

const NewsWidget = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNewsData();
        setNews(newsData);
      } catch (err) {
        setError('Failed to load news data');
        console.error(err);
      }
    };

    loadNews();
  }, []);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  const displayedNews = showAll ? news : news.slice(0, 2);

  return (
    <Widget title="News">
      {error ? (
        <div className="text-red-500 font-bold">{error}</div>
      ) : news.length > 0 ? (
        <div className="space-y-4">
          <ul className="space-y-4">
            {displayedNews.map((article, index) => (
              <li key={index} className="border-b pb-2">
                <h3 className="text-lg font-bold text-teal-600">{article.title}</h3>
                {article.description && (
                  <p className="text-gray-600 text-sm mt-1">{article.description}</p>
                )}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline mt-2 inline-block"
                >
                  Read more
                </a>
              </li>
            ))}
          </ul>
          {news.length > 2 && (
            <button
              onClick={handleShowMore}
              className="text-blue-600 font-semibold hover:text-blue-800 transition mt-4"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No news available</p>
      )}
    </Widget>
  );
};

export default NewsWidget;
