import "./styles.css";
import json from "./Components/data.json";
import { useState } from "react";
import { List } from "./Components/List";
export default function App() {
  const [data, setData] = useState(json);
  const renameFileFolder = (elementId) => {
    const changeName = prompt("New name please enter");
    const updateName = (list) => {
      return list.map((node) => {
        if (node.id === elementId) {
          return { ...node, name: changeName };
        }
        if (node.children) {
          return { ...node, children: updateName(node.children) };
        }
        return node;
      });
    };
    setData((prev) => updateName(prev));
  };
  const deleteFolder = (elementId) => {
    const deleteItems = (list) => {
      return list
        .filter((node) => node.id != elementId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: deleteItems(node.children) };
          }
          return node;
        });
    };
    setData((prev) => deleteItems(prev));
  };
  const addFolder = (parentId, isFolder) => {
    const name = prompt("Enter folder name");
    const addData = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now().toString(),
                name: name,
                isFolder: isFolder,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: addData(node.children) };
        }
        return node;
      });
    };
    setData((prev) => addData(prev));
  };
  return (
    <div className="App">
      <h1>vs Code Side-Bar / File Explorer</h1>
      <List
        list={data}
        addFolder={addFolder}
        deleteFolder={deleteFolder}
        renameFileFolder={renameFileFolder}
      />
    </div>
  );
}
