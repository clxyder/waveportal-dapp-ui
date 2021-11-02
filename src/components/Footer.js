import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      A big thanks to <a href="https://about.fmoliveira.dev/">Filipe Oliveira</a> for open sourcing his <a href="https://github.dev/fmoliveira/wave-portal-frontend/">UI code</a>, as it has helped me learn more about React.
      I could not have done this without him!
      <span className="buttonEmoji" role="img" aria-label="PrayerHands"> 🙏</span>
      <p>
        Go send him a <a href="https://wave.fmoliveira.dev/">wave too<span role="img" aria-label="Wave">👋</span></a>!
      </p>
    </div>
  );
}