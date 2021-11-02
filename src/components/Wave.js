import React from "react";
import Identicon from 'identicon.js';
import dayjs from "dayjs";

import { Reaction } from "../hooks/useWallet";

import "./Wave.css";

const ReactionEmojis = {
	[Reaction.Wave]: "👋",
	[Reaction.Rocket]: "🚀",
	[Reaction.World]: "🌎",
};

export default function Wave({ reaction, message, waver, timestamp }) {
  const pictureSize = 60;
  const iconOptions = {
    size: pictureSize,
    format: 'png',
  };
	return (
		<div className="wave">
      <img
        alt="profile icon" className='waverPicture ml-2 d-inline-block' width={pictureSize} height={pictureSize} title={waver}
        src={`data:image/png;base64,${new Identicon(waver, iconOptions).toString()}`}
      />
      <div className="body">
        <dl>
          <dt>From:</dt>
          <dd>{waver}</dd>
          <dt>Time:</dt>
          <dd>
            {formatDate(timestamp)} at {formatTime(timestamp)}
          </dd>
        </dl>
        <div className="message">
          {message}
        </div>
      </div>
      <div className="reaction">
          {ReactionEmojis[reaction]}
        </div>
		</div>
	);
}

function formatDate(timestamp) {
	return dayjs(timestamp).format("MMM D, YYYY");
}

function formatTime(timestamp) {
	return dayjs(timestamp).format("h:mm:ss a");
}
