import React from "react";
import PropTypes from "prop-types";
import "./SideScroll.css";

const SideScroll = props => {
  const { title, opening_crawl, release_date } = props.episodeData;
  return (
    <div className="SideScroll">
      <div className="scroll">
        <p className="scrollText">{opening_crawl}</p>
        <p className="scrollText">{title}</p>
        <p className="scrollText">{release_date}</p>
      </div>
    </div>
  );
};

SideScroll.propTypes = {
  episodeData: PropTypes.object
};

export default SideScroll;
