import { useState } from "react";

export const List = ({ list, addFolder, deleteFolder, renameFileFolder }) => {
  const [show, setShow] = useState({});

  return (
    <div>
      {list.map((node, index) => (
        <div key={index}>
          <div>
            {node.isFolder && (
              <span
                onClick={() =>
                  setShow((prev) => ({
                    ...prev,
                    [node.name]: !prev[node.name],
                  }))
                }
              >
                {show?.[node.name] ? "-" : "+"}
              </span>
            )}
            <span onClick={() => renameFileFolder(node.id)}>{node.name}</span>
            {node.isFolder && (
              <div className="icons">
                <img
                  className="img-add"
                  src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/folder_add.png"
                  alt="icon-add"
                  onClick={() => addFolder(node.id, true)}
                />
                <img
                  className="img-add"
                  src="https://static.vecteezy.com/system/resources/previews/000/581/925/original/file-icon-vector-illustration.jpg"
                  alt="icon-add"
                  onClick={() => addFolder(node.id, false)}
                />
              </div>
            )}
            <img
              className="img-add"
              src="https://tse1.mm.bing.net/th/id/OIP.NlbUj2czKI4hBDjpU4jN3gHaII?pid=Api&P=0&h=180"
              alt="icon-add"
              onClick={() => deleteFolder(node.id)}
            />
          </div>
          <div className="childrens">
            {node.children && show?.[node.name] && (
              <List
                list={node.children}
                addFolder={addFolder}
                deleteFolder={deleteFolder}
                renameFileFolder={renameFileFolder}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
