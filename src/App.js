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
    setData((prevData) => [...prevData, newItem]);
  };

  const addScript = (newScript) => {
    setScripts((prevScripts) => [...prevScripts, newScript]);
  };

  const deleteData = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const editData = (id, updatedData) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? updatedData : item))
    );
  };

  const deleteScript = (index) => {
    setScripts((prevScripts) => prevScripts.filter((_, i) => i !== index));
  };

  const updateScript = (id, updatedData) => {
    setScripts((prevScripts) =>
      prevScripts.map((script, index) =>
        index === id ? { ...script, ...updatedData } : script
      )
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
              element={
                <Timeline data={data} onEdit={editData} onDelete={deleteData} />
              }
            />
            <Route
              path="/story-script"
              element={
                <>
                  <StoryScriptForm addScript={addScript} />
                  <StoryScriptList
                    scripts={scripts}
                    deleteScript={deleteScript}
                    updateScript={updateScript}
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
