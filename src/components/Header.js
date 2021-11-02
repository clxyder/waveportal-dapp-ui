import React from "react";

import TwitterIcon from "./TwitterIcon";

export default function Header() {
  return (
    <div className="header">
			<div>
        <h1>Hey there!</h1>
				<span role="img" aria-label="Wave">
					👋
				</span>
			</div>
			<div className="twitterHeader">
        Connect with me on Twitter
				<a
					href="https://twitter.com/Carlos_A_Wong"
					aria-label="Follow me on Twitter"
					title="Follow me on Twitter"
				>
					<TwitterIcon />
				</a>
			</div>
		</div>
  );
}