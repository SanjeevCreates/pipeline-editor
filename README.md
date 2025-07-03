# Pipeline Editor - React Flow App

A web-based pipeline editor built using React and React Flow. 

This app allows users to visually add, connect, auto-layout, validate, save/load, and manage nodes in a flow-based interface.

# Screenshot of App Interface 

https://drive.google.com/file/d/10znqblVTuL1iuur54nFLB2SysweTGyyn/view?usp=sharing

# Live Demo 

https://drive.google.com/file/d/1PVDhXdTt3_y1mQ-FvZyq2hi2A2aj9xQd/view?usp=sharing


# Deployed App Link

https://pipeline-editor-7sfv-61eugdiv8-sanjeevcreates-projects.vercel.app/


# Tech Stack & Libraries

- **React** – Frontend framework
- **React Flow** – For interactive flow diagrams
- **Dagre** – Used for automatic graph layout
- **LocalStorage** – For saving/loading flow state
- **Blob API** – For exporting flows to JSON
- **React Flow Components**:
- # Nodes
- # Edges
- # MiniMap
- # Controls
- # Background



## Folder Structure

pipeline-editor/
├── public/
├── src/
│ ├── components/ # Feature UI button components (Add, Delete, Save, etc.)
│ ├── App.jsx # Main app logic
│ └── index.js
├── .gitignore
├── package.json
└── README.md


## Project Setup

### Choose CRA or Vite  

We choose Vite for faster development.

We Ran this in our terminal:

npm create vite@latest pipeline-editor -- --template react
cd pipeline-editor
npm install

## Install Dependencies

We Ran this in our terminal:

npm install reactflow dagre react-icons

We used the npm run dev command to start the development server and launch the application locally.

## Available UI Features

Add Node

Auto Layout

Validate Flow

Delete Selected

Download JSON

Upload JSON

Save to Local Storage

Load from Local Storage

Status Panel

## Key Architectural Decisions

1. **Vite for Project Scaffolding**  
   Chose Vite over Create React App (CRA) for its significantly faster startup time, hot module replacement (HMR), and modern tooling support. This led to quicker development cycles.

2. **Component-Based Architecture**  
   Each major UI feature (e.g., Add Node, Validate, Save Flow, etc.) is encapsulated in its own component under the `components/` folder. This improves code readability, reusability, and maintainability.

3. **React Flow for Graph UI**  
   React Flow was selected to efficiently handle rendering, dragging, connecting, and editing nodes/edges. It's highly customizable and integrates well with state management.

4. **Dagre Layout for Auto-Positioning**  
   Implemented the Dagre layout engine to calculate optimal node positions for a clean visual layout, ensuring that connected nodes don’t overlap and stay aligned.

5. **Local Storage for Persistence**  
   Used `localStorage` for saving and loading the flow without requiring a backend. This keeps the app lightweight and fully client-side.

6. **State Management Using React Flow Hooks**  
   Employed `useNodesState` and `useEdgesState` hooks provided by React Flow for efficient local state management of graph elements.

7. **Separation of Concerns for Logic**  
   Core logic (e.g., layout, validation, persistence) was gradually moved from `App.jsx` to individual components to avoid bloated code and promote modular thinking.

8. **Full-Screen Flex Layout**  
   Used a flexible layout (`flex-grow`, `height: 100vh`) to ensure the React Flow canvas stretches to fill the viewport, giving users an optimal design surface.


## Challenges Faced

### 1. Node Auto Layout Misalignment
- **Problem:** Nodes were stacking horizontally despite using Dagre for layout.
- **Solution:** Ensured that edges were present before applying the layout. Applied `dagre.layout()` only after confirming node connections.

### 2. Status UI vs Alerts
- **Problem:** The application originally used `alert()` for showing validation messages, which disrupted the user experience.
- **Solution:** Replaced alerts with a `StatusDisplay` component that updates the status bar dynamically, providing a smoother experience.

### 3. Cluttered App.jsx
- **Problem:** All logic and UI components were placed in a single `App.jsx` file, making the codebase hard to maintain and scale.
- **Solution:** Refactored the project into 8 separate components — one for each feature — improving readability, maintainability, and scalability.

### 4. Delete Selected Not Working
- **Problem:** React Flow’s selection model was not being detected properly, preventing the deletion of selected nodes or edges.
- **Solution:** Implemented `onSelectionChange` to track selected elements. Verified `.type === undefined` to distinguish nodes from edges, allowing accurate deletion logic.

