import React from "react";

import Wave from "./Wave";

import "./WaveFeed.css";

export default function WaveFeed({ waveList }) {
	if (!waveList) {
		return null;
	}

	return (
		<div className="waveFeed">
			{waveList.map((wave) => (
				<Wave
					key={wave.timestamp}
					reaction={wave.reaction}
					message={wave.message}
					waver={wave.waver}
					timestamp={wave.timestamp}
				/>
			))}
		</div>
	);
}
