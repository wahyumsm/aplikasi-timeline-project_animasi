import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Timeline from "./pages/Timeline";
import TambahProduk from "./pages/TambahProduk";
import StoryScriptForm from "./pages/StoryScriptForm";
import StoryScriptList from "./pages/StoryScriptList";
import "./App.css";

const App = () => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("projectData");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [scripts, setScripts] = useState(() => {
    const storedScripts = localStorage.getItem("scripts");
    return storedScripts ? JSON.parse(storedScripts) : [];
  });

  useEffect(() => {
    localStorage.setItem("projectData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("scripts", JSON.stringify(scripts));
  }, [scripts]);

  const addData = (newItem) => {
    const newItemWithId = { ...newItem, id: Date.now() }; // Ensure unique ID
    setData((prevData) => [...prevData, newItemWithId]);
  };

  const addScript = (newScript) => {
    const newScriptWithId = { ...newScript, id: Date.now() }; // Ensure unique ID
    setScripts((prevScripts) => [...prevScripts, newScriptWithId]);
  };

  const deleteData = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const deleteScript = (id) => {
    setScripts((prevScripts) =>
      prevScripts.filter((script) => script.id !== id)
    );
  };

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div
          className="content"
          style={{ marginLeft: "250px", padding: "20px" }}
        >
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route
              path="/tambah-produk"
              element={<TambahProduk addData={addData} />}
            />
            <Route
              path="/timeline"
              element={<Timeline data={data} setData={setData} />}
            />
            <Route
              path="/story-script"
              element={
                <>
                  <StoryScriptForm addScript={addScript} />
                  <StoryScriptList
                    scripts={scripts}
                    deleteScript={deleteScript}
                  />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
