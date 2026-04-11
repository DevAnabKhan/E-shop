import React from "react";
import EventCard from "./EventCard";
import styles from "../../../styles/styles";
import { useSelector } from "react-redux";

const Events = () => {
  const { allUserEvents, isUserEventsLoading } = useSelector(
    (state) => state.event,
  );
  return (
    <div>
      {!isUserEventsLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {allUserEvents.length !== 0 && (
              <EventCard data={allUserEvents && allUserEvents[0]} />
            )}
            <h4>{allUserEvents?.length === 0 && "No Events have!"}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
