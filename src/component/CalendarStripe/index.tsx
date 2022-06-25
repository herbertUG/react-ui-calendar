import React, { useEffect, useState } from 'react'
import {
  format,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  isSameDay,
  isBefore
} from "date-fns";
import { Waypoint } from "react-waypoint";
import "./calendar-stripe.css";

interface Props {
  enableDays: number,
  enableScroll: boolean,
  selectedDay:  Date | number
}

const CalendarStripe:React.FC<Props> = ({enableScroll, enableDays, selectedDay}) =>{

  const [selectedDate, setSelectedDate] = useState< Date | number>(new Date());
  const [headingDate, setHeadingDate] = useState< Date | number>(new Date());
  const [currentWeek, setCurrentWeek] = useState< Date | number>(new Date());
  const [currentDate] = useState< Date | number>(new Date());
  const scrollWidth = 250;
  enableScroll = enableScroll || false;
  enableDays = enableScroll === true ? enableDays || 90 : 7;

  useEffect(() => { console.log(headingDate);}, [headingDate]);

  const applyStyles = (day: Date | number) => {
    const classes = [];
    if (isSameDay(day, selectedDate)) {
      classes.push(" date-day-Item-selected");
    }

    if (isBefore(day, currentDate)) {
      classes.push(" date-day-item-disabled");
    }
    return classes.join(" ");
  };

  const handlePosition = (pos: Waypoint.CallbackArgs, date: Date | number) => {
    let currentPosition = pos.currentPosition;
    let previousPosition = pos.previousPosition;

    if (previousPosition === "inside" && currentPosition === "above") {
      setHeadingDate(date);
    }
    if (previousPosition === "above" && currentPosition === "inside") {
      setHeadingDate(addDays(date, -1));
    }
  };

  const verticalList = () => {
    const dayFormat = "E";
    const dateFormat = "dd";
    const verticalListItems = [];
    const startDay = subDays(currentWeek, 1);

    for (let i = 0; i < enableDays; i++) {
      let day = format(addDays(startDay, i), dayFormat);
      let _date: Date | number | string = format(addDays(startDay, i), dateFormat);

      const checkValue = () => {
        let getDay =format(addDays(startDay, i), dateFormat)
        if(parseInt(getDay) ===  1){
          return true;
        } else return false;
      }

      verticalListItems.push(
        <Waypoint
          key={i}
          horizontal={true}
          onPositionChange={pos =>
            _date === 1 ? handlePosition(pos, addDays(startDay, i)) : ""
          }
        >
          <div className="wrapper">
            {checkValue() ? (
              <div className="scroll-head">
                {format(addDays(startDay, i), "MMM")}
              </div>
            ) : (
              <div className="blank-space-div"></div>
            )}
            <div
              className={`datepicker-date-day-Item wrapper ${applyStyles(
                addDays(startDay, i)
              )}`}
              onClick={() => onDateClick(addDays(startDay, i))}
            >
              <div className="datepicker-day-label ">{day}</div>
              <div className="datepicker-date-label ripple ">{_date}</div>
            </div>
          </div>
        </Waypoint>
      );
    }

    return (
      <div
        id="container"
        className={
          enableScroll === true
            ? " datepicker-datelist-scrollable"
            : " datepicker-dateList"
        }
      >
        {verticalListItems}
      </div>
    );
  };

  const onDateClick = (day:Date | number ) => {
    setSelectedDate(day);
    // selectedDay(day);
  };

  const nextScroll = () => {
    const container = document.getElementById('container') as HTMLDivElement | null;

    enableScroll
      ? (container!.scrollLeft += scrollWidth)
      : setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const prevScroll = () => {
    const container = document.getElementById('container') as HTMLDivElement | null;

    enableScroll
      ? (container!.scrollLeft -= scrollWidth)
      : setCurrentWeek(subWeeks(currentWeek, 1));
  };

  return (
    <div className="datepicker-strip">
      <span className="datepicker-month-label ">
        {format(selectedDate, "dd MMM yyy")}
      </span>
      <div className="datepicker">
        <div className="wrapper">
          <div className="scroll-head">{format(headingDate, "MMM")}</div>
          <div className="button-previous">
            {" "}
            <button className="datepicker-button-previous" onClick={prevScroll}>
              &#10132;
            </button>
          </div>
        </div>
        {verticalList()}
        <div className="wrapper">
          <div className="blank-space-div"></div>
          <div className="button-previous">
            {" "}
            <button className="datepicker-button-next" onClick={nextScroll}>
              &#10132;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CalendarStripe;
