import React from "react";

const ValidateButton = ({ nodes, edges, setStatus }) => {
  const handleValidate = () => {
    const targetNodeIds = new Set(edges.map((edge) => edge.target));
    const orphanNodes = nodes.filter((node) => !targetNodeIds.has(node.id));

    if (orphanNodes.length > 1) {
      setStatus("❌ Validation failed: Some nodes are not connected.");
    } else {
      setStatus("✅ Validation passed: All nodes are connected.");
    }
  };

  return (
    <button onClick={handleValidate} className="btn">
      Validate
    </button>
  );
};

export default ValidateButton;
