import React from 'react';
import './App.css';
import CalendarStripe from './component/CalendarStripe';

function App() {

  const calendarProps = {
    enableDays: 180,
    enableScroll: false,
    selectedDay: 10,
  }

  return (
    <div className="content">
      <CalendarStripe {...calendarProps} />
    </div>
  );
}

export default App;