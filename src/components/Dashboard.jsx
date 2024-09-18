import React from 'react';
import WeatherWidget from './WeatherWidget';
import NewsWidget from './NewsWidget';
import CalendarWidget from './CalendarWidget';
import TaskWidget from './TaskWidget';
import ThemeSwitcher from './ThemeSwitcher';

const Dashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-teal-500 to-blue-600">
      <h1 className="text-white text-4xl font-bold mb-8 text-center">
        My Personalized Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherWidget />
        <NewsWidget />
        <CalendarWidget />
        <TaskWidget />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Dashboard;
