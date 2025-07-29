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

## Public link

- https://crego-loan-management.netlify.app/

