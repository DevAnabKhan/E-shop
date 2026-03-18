import React from "react";
import EventCard from "./EventCard";
import styles from "../../../styles/styles";

const Events = () => {
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>
      <div className="w-full grid">
        <EventCard />
      </div>
    </div>
  );
};

export default Events;
