# Crego Loan Management Tree Visualizer

This is a visual tool I built to represent and manage the hierarchy between accounts, loans, and collaterals. It's mainly designed to help understand the relationships and dependencies within a loan management structure in a more intuitive, tree-based format.

---

## 🚀 Features

- Add nodes like Account, Loan, and Collateral
- Only valid child types can be added (based on type rules)
- Handles connect automatically with visual edges
- Side panel shows node details when selected
- Fully responsive and smooth transitions
- Tree layout auto-adjusts when nodes are added/removed

---

## 🧠 Node Rules

Each node has allowed children:

- Account ➝ Loan, Collateral  
- Loan ➝ Collateral  
- Collateral ➝ no children

This structure is managed using Zustand store.

---

## 🛠️ Tech Stack

- React
- Zustand for state management
- TailwindCSS for styling
- React Flow for the visual editor
- Netlify (for deployment)

---

## 🌳 Tree Structure (Data Model)

The data is modeled using two arrays:

- `nodes`: stores all nodes in the tree.
- `edges`: stores connections between nodes.

Each node looks like:
```js
{
  id: 'unique-id',
  type: 'Account' | 'Loan' | 'Collateral',
  data: { label: 'Account' },
  position: { x: 0, y: 0 }
}
```
Each edge looks like:
```js
{
  id: 'parentId-childId',
  source: 'parentId',
  target: 'childId',
  type: 'default'
}
```
The state is managed globally using Zustand.

---

## 🔷 How Node Types Are Defined and Rendered

The `CustomNode.jsx` component handles rendering of each node.

- Based on the type (`Account`, `Loan`, or `Collateral`), different background and border colors are applied using Tailwind classes.
- React Flow’s `Handle` component is used to allow incoming and outgoing connections.
- Logic for what kind of children a node can have is enforced while rendering the "Add" buttons.

---

## 🧩 UX Decisions

### 🔹 Side Panel
- The side panel opens when a node is clicked and shows its basic details.
- It slides in smoothly from the right and auto-closes when not needed.
- The main tree canvas resizes dynamically when the panel opens or closes.

### ➕ Adding Nodes
- Root node (`Account`) can be added first.
- Valid child types are shown in the panel depending on the selected node.
- Tree layout is recalculated every time a node is added.

### ❌ Deleting Nodes
- Deleting a node removes all of its descendants as well.
- This avoids having disconnected or orphan nodes.

---

## ⚠️ Limitations / Trade‑offs

- No persistence — the data is in-memory only. A page refresh resets the tree.
- Only one root node is supported.
- Drag-and-drop repositioning isn’t allowed — layout is automatic.
- No inline editing of node labels yet.
- There's no confirmation or toast when an action fails (like invalid child types) — could be added later.
- Side panel is basic for now and can be expanded with more options or editing functionality.

---

## 🔗 Public Link

[https://crego-loan-management.netlify.app/](https://crego-loan-management.netlify.app/)


Happy shipping! 🚀

