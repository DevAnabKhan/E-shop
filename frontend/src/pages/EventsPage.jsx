import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Route/Events/EventCard";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allUserEvents, isUserEventsLoading } = useSelector(
    (state) => state.event,
  );

  return (
    <>
      {isUserEventsLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <EventCard active={true} data={allUserEvents && allUserEvents[0]} />
        </div>
      )}
    </>
  );
};

export default EventsPage;
