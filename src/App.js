import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Timeline from "./pages/Timeline";
import TambahProduk from "./pages/TambahProduk";
import StoryScriptForm from "./pages/StoryScriptForm";
import StoryScriptList from "./pages/StoryScriptList";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    const storedScripts = localStorage.getItem("scripts");
    if (storedScripts) {
      setScripts(JSON.parse(storedScripts));
    }
  }, []);

  const addData = (newItem) => {
    setData([...data, newItem]);
  };

  const addScript = (newScript) => {
    const updatedScripts = [...scripts, newScript];
    setScripts(updatedScripts);
    localStorage.setItem("scripts", JSON.stringify(updatedScripts));
  };

  const deleteScript = (index) => {
    const updatedScripts = scripts.filter((_, i) => i !== index);
    setScripts(updatedScripts);
    localStorage.setItem("scripts", JSON.stringify(updatedScripts));
  };

  const updateScript = (id, updatedData) => {
    const updatedScripts = scripts.map((script, index) =>
      index === id ? { ...script, ...updatedData } : script
    );
    setScripts(updatedScripts);
    localStorage.setItem("scripts", JSON.stringify(updatedScripts));
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
