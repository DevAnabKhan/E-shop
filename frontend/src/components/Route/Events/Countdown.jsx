import React, { useEffect, useState } from "react";

function calculateTimeLeft() {
  const difference = +new Date("2026-12-31") - +new Date(); // ✅ future date
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60), // ✅ fixed formula
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
}

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      // ✅ setInterval not setTimeout
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer); // ✅ cleanup
  }, []); // ✅ run once

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) return null;
    return (
      <span key={interval} className="text-[25px] text-[#475ad2] mr-2">
        {timeLeft[interval]} {interval} {/* ✅ [] not () */}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's Up!</span>
      )}
    </div>
  );
};

export default Countdown;
