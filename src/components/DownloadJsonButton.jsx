import React from "react";

const DownloadJsonButton = ({ onClick }) => (
  <button onClick={onClick} style={{ marginRight: "10px", padding: "8px 12px" }}>
    Download JSON
  </button>
);

export default DownloadJsonButton;
