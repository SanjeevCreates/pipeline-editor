import React from "react";

const UploadJsonButton = ({ onChange }) => (
  <label style={{ marginRight: "10px", padding: "8px 12px", border: "1px solid white", cursor: "pointer" }}>
    Upload JSON
    <input type="file" accept=".json" onChange={onChange} style={{ display: "none" }} />
  </label>
);

export default UploadJsonButton;
