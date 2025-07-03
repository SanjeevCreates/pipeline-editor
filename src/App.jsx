import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

import AddNodeButton from "./components/AddNodeButton";
import AutoLayoutButton from "./components/AutoLayoutButton";
import ValidateButton from "./components/ValidateButton";
import DeleteSelectedButton from "./components/DeleteSelectedButton";
import DownloadJsonButton from "./components/DownloadJsonButton";
import SaveFlowButton from "./components/SaveFlowButton";
import LoadFlowButton from "./components/LoadFlowButton";
import UploadJsonButton from "./components/UploadJsonButton";
import StatusDisplay from "./components/StatusDisplay";

const nodeWidth = 172;
const nodeHeight = 36;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
  });

  return { nodes: layoutedNodes, edges };
};

let id = 0;
const getId = () => `node_${id++}`;

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [status, setStatus] = useState("Total nodes: 0");

  useEffect(() => {
    setStatus(`Total nodes: ${nodes.length}`);
  }, [nodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onSelectionChange = useCallback(({ nodes, edges }) => {
    setSelectedNodes(nodes);
    setSelectedEdges(edges);
  }, []);

  const addNode = () => {
    const newNode = {
      id: getId(),
      data: { label: `Node ${nodes.length + 1}` },
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const autoLayout = () => {
    if (nodes.length === 0 || edges.length === 0) {
      setStatus("⚠️ Connect at least one node to layout.");
      return;
    }
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  };

  const validateFlow = () => {
    const nodeIds = nodes.map((node) => node.id);
    const connectedNodeIds = new Set();

    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    const unconnected = nodeIds.filter((id) => !connectedNodeIds.has(id));

    if (unconnected.length === 0) {
      setStatus("✅ All nodes are connected!");
    } else {
      setStatus(`⚠️ Unconnected nodes: ${unconnected.join(", ")}`);
    }
  };

  const deleteSelected = () => {
    if (selectedNodes.length === 0 && selectedEdges.length === 0) {
      setStatus("⚠️ Please select nodes or edges to delete.");
      return;
    }

    const selectedNodeIds = new Set(selectedNodes.map((n) => n.id));
    const selectedEdgeIds = new Set(selectedEdges.map((e) => e.id));

    const newNodes = nodes.filter((node) => !selectedNodeIds.has(node.id));
    const newEdges = edges.filter((edge) => !selectedEdgeIds.has(edge.id));

    setNodes(newNodes);
    setEdges(newEdges);
    setStatus("🗑️ Deleted selected items.");
  };

  const downloadJSON = () => {
    const flowData = { nodes, edges };
    const json = JSON.stringify(flowData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");

    link.download = "flow.json";
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const uploadJSON = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const json = JSON.parse(event.target.result);
      setNodes(json.nodes || []);
      setEdges(json.edges || []);
    };
    fileReader.readAsText(e.target.files[0]);
  };

  const saveFlow = () => {
    const flowData = { nodes, edges };
    localStorage.setItem("savedFlow", JSON.stringify(flowData));
    setStatus("✅ Flow saved to local storage.");
  };

  const loadFlow = () => {
    const saved = localStorage.getItem("savedFlow");
    if (saved) {
      const flowData = JSON.parse(saved);
      setNodes(flowData.nodes || []);
      setEdges(flowData.edges || []);
      setStatus("✅ Flow loaded from local storage.");
    } else {
      setStatus("⚠️ No flow found in local storage.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          background: "#1e1e1e",
        }}
      >
        <AddNodeButton onClick={addNode} />
        <AutoLayoutButton onClick={autoLayout} />
        <ValidateButton nodes={nodes} edges={edges} setStatus={setStatus} />
        <DeleteSelectedButton onClick={deleteSelected} />
        <DownloadJsonButton onClick={downloadJSON} />
        <SaveFlowButton onClick={saveFlow} />
        <LoadFlowButton onClick={loadFlow} />
        <UploadJsonButton onChange={uploadJSON} />
        <StatusDisplay message={status} />
      </div>

      <div style={{ flexGrow: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={() => {}}
          onSelectionChange={onSelectionChange}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default App;
