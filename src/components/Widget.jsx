import React from 'react';

const Widget = ({ children, title }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
};

export default Widget;
