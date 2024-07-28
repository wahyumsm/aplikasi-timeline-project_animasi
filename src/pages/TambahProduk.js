import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TambahProduk = ({ addData }) => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    namaproduk: "",
    status: "",
    project: "",
    tugas: "",
    tanggalmulai: "",
    tanggalselesai: "",
    catatan: "",
    hasilakhir: "",
    dibuatoleh: "",
  });

  const navigate = useNavigate();

  const handleChangeSelected = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const newItem = {
      id: Date.now(),
      ...formData,
      status,
    };
    addData(newItem);

    // Reset form
    setFormData({
      namaproduk: "",
      status: "",
      project: "",
      tugas: "",
      tanggalmulai: "",
      tanggalselesai: "",
      catatan: "",
      hasilakhir: "",
      dibuatoleh: "",
    });
    setStatus("");

    // Display success alert
    window.alert("Data berhasil ditambahkan!");

    // Navigate to the timeline page
    navigate("/timeline");
  };

  return (
    <div
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <h1
        style={{
          display: "inline-block",
          fontSize: 24,
          fontWeight: 600,
          verticalAlign: "middle",
        }}
      >
        <FaPlus style={{ marginRight: "10px" }} /> Tambah Project Animasi
      </h1>
      <div
        className="container"
        style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
      >
        <div
          className="box"
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <Form>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <div style={{ flex: "1 1 45%" }}>
                <Form.Group controlId="project">
                  <Form.Label style={{ marginRight: 9 }}>
                    Nama Project
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="project"
                    placeholder="Masukkan Nama Project"
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: "4px",
                      padding: "10px",
                      fontSize: "14px",
                      backgroundColor: "rgba(128, 128, 128, 0.1)",
                      width: "60%",
                    }}
                    value={formData.project}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div style={{ flex: "1 1 45%" }}>
                <Form.Group controlId="createdBy">
                  <Form.Label style={{ marginRight: 9 }}>Tugas</Form.Label>
                  <Form.Control
                    type="text"
                    name="tugas"
                    placeholder="Masukkan Tugas"
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: "4px",
                      padding: "10px",
                      fontSize: "14px",
                      backgroundColor: "rgba(128, 128, 128, 0.1)",
                      width: "60%",
                    }}
                    value={formData.tugas}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div style={{ flex: "1 1 45%" }}>
                <Form.Group controlId="tanggalmulai">
                  <Form.Label style={{ marginRight: 9 }}>
                    Tanggal Mulai
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggalmulai"
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: "4px",
                      padding: "10px",
                      fontSize: "14px",
                      backgroundColor: "rgba(128, 128, 128, 0.1)",
                      width: "60%",
                    }}
                    value={formData.tanggalmulai}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div style={{ flex: "1 1 45%" }}>
                <Form.Group controlId="stok">
                  <Form.Label style={{ marginRight: 7 }}>Selesai</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggalselesai"
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: "4px",
                      padding: "10px",
                      fontSize: "14px",
                      backgroundColor: "rgba(128, 128, 128, 0.1)",
                      width: "60%",
                    }}
                    value={formData.tanggalselesai}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div style={{ flex: "1 1 45%" }}>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: "4px",
                      padding: "10px",
                      fontSize: "14px",
                      marginLeft: 8,
                      backgroundColor: "rgba(128, 128, 128, 0.1)",
                      width: "70%",
                    }}
                    value={status}
                    onChange={handleChangeSelected}
                  >
                    <option value="InProgress">InProgress</option>
                    <option value="In-Waiting">In-Waiting</option>
                    <option value="Completed">Completed</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div style={{ flex: "1 1 45%" }}>
                <Form.Group controlId="catatan">
                  <Form.Label>Catatan</Form.Label>
                  <Form.Control
                    type="text"
                    name="catatan"
                    placeholder="Masukkan Catatan"
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: "8px",
                      padding: "10px",
                      fontSize: "14px",
                      marginLeft: 8,
                      backgroundColor: "rgba(128, 128, 128, 0.1)",
                      width: "60%",
                    }}
                    value={formData.catatan}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div style={{ flex: "1 1 45%" }}>
                <Form.Group controlId="hasilakhir">
                  <Form.Label>Hasil Akhir</Form.Label>
                  <Form.Control
                    type="text"
                    name="hasilakhir"
                    placeholder="Masukkan Hasil Akhir"
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: "4px",
                      padding: "10px",
                      fontSize: "14px",
                      marginLeft: 8,
                      backgroundColor: "rgba(128, 128, 128, 0.1)",
                      width: "60%",
                    }}
                    value={formData.hasilakhir}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div style={{ flex: "1 1 45%" }}>
                <Form.Group controlId="dibuatoleh">
                  <Form.Label>Dibuat Oleh</Form.Label>
                  <Form.Control
                    type="text"
                    name="dibuatoleh"
                    placeholder="Dibuat Oleh"
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: "8px",
                      padding: "10px",
                      fontSize: "14px",
                      marginLeft: 10,
                      backgroundColor: "rgba(128, 128, 128, 0.1)",
                      width: "60%",
                    }}
                    value={formData.dibuatoleh}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#1baa75",
                fontSize: "16px",
                padding: "10px 20px",
                borderRadius: "4px",
                color: "white",
                fontWeight: "bold",
                marginTop: "1rem",
                display: "block",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
                outline: "none",
                border: "none",
              }}
              type="button"
            >
              Tambah Data
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TambahProduk;
