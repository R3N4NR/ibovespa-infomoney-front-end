import React, { useState, useEffect, useMemo } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { months, years } from '../../utils/dateConfig.js'; 
import './Date.css';
import { useDateSelectStore } from '../../store/useDateSelectStore';

function DateSelector() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const { setDate } = useDateSelectStore();

  const selectedDay = selectedDate.getDate();
  const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();

  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    const formatted = selectedDate.toISOString().split("T")[0]; 
    setDate(formatted);
  }, [selectedDate, setDate]);

  const scrollableMenuStyle = {
    maxHeight: '200px',
    overflowY: 'auto'
  };

  const handleDateChange = (part, value) => {
    const newDate = new Date(selectedDate);
    if (part === 'day') newDate.setDate(value);
    if (part === 'month') newDate.setMonth(value);
    if (part === 'year') newDate.setFullYear(value);
    setSelectedDate(newDate);
  };

  return (
    <div className='date-select'>
      <Dropdown>
        <Dropdown.Toggle variant="secondary">
          {selectedDay}
        </Dropdown.Toggle>
        <Dropdown.Menu style={scrollableMenuStyle}>
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
            <Dropdown.Item key={day} onClick={() => handleDateChange('day', day)}>
              {day}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle variant="secondary">
          {months[selectedMonth]}
        </Dropdown.Toggle>
        <Dropdown.Menu style={scrollableMenuStyle}>
          {months.map((month, i) => (
            <Dropdown.Item key={i} onClick={() => handleDateChange('month', i)}>
              {month}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle variant="secondary">
          {selectedYear}
        </Dropdown.Toggle>
        <Dropdown.Menu style={scrollableMenuStyle}>
          {years.map(year => (
            <Dropdown.Item key={year} onClick={() => handleDateChange('year', year)}>
              {year}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DateSelector;
