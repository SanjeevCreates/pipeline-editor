import React from "react";

const DeleteSelectedButton = ({ onClick }) => (
  <button onClick={onClick} style={{ padding: "8px 12px" }}>
    Delete Selected
  </button>
);

export default DeleteSelectedButton;
