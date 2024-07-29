import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaTrash, FaEdit, FaFilePdf, FaTrashAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "bootstrap/dist/css/bootstrap.min.css";

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    {props.children}
  </Tooltip>
);

const StoryScriptList = ({ scripts, deleteScript, updateScript }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (row, rowIndex) => {
    setEditRowId(rowIndex);
    setEditData({ ...row });
  };

  const handleChange = (e, column) => {
    setEditData({ ...editData, [column]: e.target.value });
  };

  const handleSave = () => {
    updateScript(editRowId, editData);
    setEditRowId(null);
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditData({});
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.text("Daftar Script Cerita", 14, 16);
    doc.autoTable({
      head: [["No", "Judul", "Konten"]],
      body: scripts.map((script, index) => [
        index + 1,
        script.title,
        script.content,
      ]),
      startY: 20,
      styles: {
        fontSize: 10,
      },
    });
    doc.save("story_scripts.pdf");
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      center: true,
      style: {
        color: "#495057",
        fontWeight: "bold",
      },
      width: "60px",
    },
    {
      name: "Judul",
      selector: (row, index) =>
        editRowId === index ? (
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={(e) => handleChange(e, "title")}
            style={{ width: "100%" }}
          />
        ) : (
          row.title
        ),
      sortable: true,
      wrap: true,
      style: {
        color: "#495057",
        fontWeight: "bold",
      },
    },
    {
      name: "Konten",
      selector: (row, index) =>
        editRowId === index ? (
          <textarea
            name="content"
            value={editData.content}
            onChange={(e) => handleChange(e, "content")}
            style={{ width: "100%" }}
          />
        ) : (
          row.content
        ),
      wrap: true,
      grow: 2,
      style: {
        color: "#6c757d",
      },
    },
    {
      name: "Gambar",
      selector: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt="Preview"
            style={{ maxWidth: "100px", maxHeight: "50px", objectFit: "cover" }}
          />
        ) : (
          "Tidak ada gambar"
        ),
      center: true,
      width: "120px",
    },
    {
      name: "Aksi",
      cell: (row, index) =>
        editRowId === index ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="success"
              size="sm"
              onClick={handleSave}
              style={{
                backgroundColor: "#28a745",
                borderColor: "#28a745",
                boxShadow: "0 2px 6px rgba(40, 167, 69, 0.5)",
                marginRight: "5px",
              }}
            >
              Simpan
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              style={{
                backgroundColor: "#6c757d",
                borderColor: "#6c757d",
                boxShadow: "0 2px 6px rgba(108, 117, 125, 0.5)",
              }}
            >
              Batal
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <OverlayTrigger
              placement="top"
              overlay={renderTooltip({ children: "Edit" })}
            >
              <Button
                variant="warning"
                size="sm"
                onClick={() => handleEditClick(row, index)}
                style={{
                  backgroundColor: "#ffc107",
                  borderColor: "#ffc107",
                  boxShadow: "0 2px 6px rgba(255, 193, 7, 0.5)",
                  marginRight: "5px",
                }}
              >
                <FaEdit />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={renderTooltip({ children: "Hapus" })}
            >
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteScript(index)}
                style={{
                  backgroundColor: "#dc3545",
                  borderColor: "#dc3545",
                  boxShadow: "0 2px 6px rgba(220, 53, 69, 0.5)",
                }}
              >
                <FaTrashAlt />
              </Button>
            </OverlayTrigger>
          </div>
        ),
      center: true,
      width: "120px",
    },
  ];

  return (
    <div
      style={{
        padding: "15px",
        maxWidth: "90%",
        margin: "20px auto",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#1baa75",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontWeight: "700",
          }}
        >
          Daftar Script Cerita
        </h2>
        <Button
          variant="primary"
          onClick={exportToPdf}
          style={{
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            boxShadow: "0 2px 6px rgba(0, 123, 255, 0.5)",
          }}
        >
          <FaFilePdf /> Export ke PDF
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={scripts}
        pagination
        highlightOnHover
        responsive
        dense
        noDataComponent="Tidak ada data yang tersedia"
        customStyles={{
          rows: {
            style: {
              minHeight: "50px",
              "&:hover": {
                backgroundColor: "#f1f3f5",
                cursor: "pointer",
              },
            },
          },
          headCells: {
            style: {
              backgroundColor: "#e9ecef",
              fontSize: "15px",
              fontWeight: "bold",
              color: "#495057",
              borderTop: "2px solid #dee2e6",
              borderBottom: "2px solid #dee2e6",
              paddingLeft: "10px", // Menambahkan padding kiri
              paddingRight: "10px", // Menambahkan padding kanan
            },
          },
          cells: {
            style: {
              borderBottom: "2px solid #dee2e6",
              borderRight: "2px solid #dee2e6",
              paddingLeft: "10px", // Menambahkan padding kiri
              paddingRight: "10px", // Menambahkan padding kanan
              "&:last-of-type": {
                borderRight: "none",
              },
              transition: "background-color 0.3s ease-in-out",
            },
          },
          table: {
            style: {
              border: "2px solid #dee2e6",
              borderRadius: "10px",
              overflow: "hidden",
            },
          },
        }}
      />
    </div>
  );
};

export default StoryScriptList;
