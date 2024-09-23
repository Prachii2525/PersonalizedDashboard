import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import WeatherWidget from './WeatherWidget';
import NewsWidget from './NewsWidget';
import CalendarWidget from './CalendarWidget';
import TaskWidget from './TaskWidget';
import ThemeSwitcher from './ThemeSwitcher';

// Define initial order of widgets with unique IDs
const initialWidgets = [
  { id: 'weather-widget', component: <WeatherWidget /> },
  { id: 'news-widget', component: <NewsWidget /> },
  { id: 'calendar-widget', component: <CalendarWidget /> },
  { id: 'task-widget', component: <TaskWidget /> },
  { id: 'theme-switcher-widget', component: <ThemeSwitcher /> },
];

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [widgets, setWidgets] = React.useState(initialWidgets);

  // Handle drag end event
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedWidgets = Array.from(widgets);
    const [movedWidget] = reorderedWidgets.splice(result.source.index, 1);
    reorderedWidgets.splice(result.destination.index, 0, movedWidget);

    setWidgets(reorderedWidgets);
  };

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-teal-500 to-blue-600'}`}>
      <h1 className="text-4xl font-bold mb-8 text-center">
        My Personalized Dashboard
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dashboard-droppable">
          {(provided) => (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {widgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800"
                    >
                      {widget.component}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
