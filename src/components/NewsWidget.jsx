import React, { useEffect, useState } from 'react';
import Widget from './Widget';
import { fetchNewsData } from '../api/newsApi';

const NewsWidget = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <Widget title="News">
      {error ? (
        <div className="text-red-500 font-bold">{error}</div>
      ) : news.length > 0 ? (
        <ul className="space-y-4">
          {news.map((article, index) => (
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
      ) : (
        <p className="text-gray-500">No news available</p>
      )}
    </Widget>
  );
};

export default NewsWidget;
