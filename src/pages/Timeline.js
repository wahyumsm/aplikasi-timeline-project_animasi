import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Badge, Tooltip, OverlayTrigger, Form } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

// Helper function to render status badge
const statusBadge = (status) => {
  let variant;
  switch (status) {
    case "InProgress":
      variant = "info";
      break;
    case "In-Waiting":
      variant = "warning";
      break;
    case "Completed":
      variant = "success";
      break;
    default:
      variant = "secondary";
  }
  return <Badge bg={variant}>{status}</Badge>;
};

const Timeline = ({ data, setData }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (row) => {
    setEditRowId(row.id);
    setEditData({ ...row });
  };

  const handleSave = () => {
    setData((prevData) =>
      prevData.map((item) => (item.id === editData.id ? editData : item))
    );
    setEditRowId(null);
  };

  const handleCancel = () => {
    setEditRowId(null);
  };

  const handleChange = (e, field) => {
    setEditData({
      ...editData,
      [field]: e.target.value,
    });
  };

  const columns = [
    {
      name: "Nama Project",
      selector: (row) =>
        editRowId === row.id ? (
          <Form.Control
            type="text"
            value={editData.project}
            onChange={(e) => handleChange(e, "project")}
          />
        ) : (
          row.project
        ),
      sortable: true,
    },
    {
      name: "Tugas",
      selector: (row) =>
        editRowId === row.id ? (
          <Form.Control
            type="text"
            value={editData.tugas}
            onChange={(e) => handleChange(e, "tugas")}
          />
        ) : (
          row.tugas
        ),
      sortable: true,
    },
    {
      name: "Tanggal Mulai",
      selector: (row) =>
        editRowId === row.id ? (
          <Form.Control
            type="date"
            value={editData.tanggalmulai}
            onChange={(e) => handleChange(e, "tanggalmulai")}
          />
        ) : (
          row.tanggalmulai
        ),
      sortable: true,
    },
    {
      name: "Tanggal Selesai",
      selector: (row) =>
        editRowId === row.id ? (
          <Form.Control
            type="date"
            value={editData.tanggalselesai}
            onChange={(e) => handleChange(e, "tanggalselesai")}
          />
        ) : (
          row.tanggalselesai
        ),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        editRowId === row.id ? (
          <Form.Select
            value={editData.status}
            onChange={(e) => handleChange(e, "status")}
          >
            <option value="InProgress">Sedang Berjalan</option>
            <option value="In-Waiting">Menunggu</option>
            <option value="Completed">Selesai</option>
          </Form.Select>
        ) : (
          statusBadge(row.status)
        ),
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) =>
        editRowId === row.id ? (
          <>
            <OverlayTrigger placement="top" overlay={<Tooltip>Simpan</Tooltip>}>
              <Button
                style={{
                  marginRight: "5px",
                  fontSize: 14,
                }}
                variant="success"
                size="sm"
                className="p-0 me-2"
                onClick={handleSave}
              >
                <FaSave style={{ color: "green" }} />
                Simpan
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Batal</Tooltip>}>
              <Button
                style={{
                  marginRight: "5px",
                  fontSize: 14,
                }}
                variant="danger"
                size="sm"
                className="p-0"
                onClick={handleCancel}
              >
                <FaTimes style={{ color: "red" }} />
                Batal
              </Button>
            </OverlayTrigger>
          </>
        ) : (
          <>
            <OverlayTrigger placement="top" overlay={<Tooltip>Lihat</Tooltip>}>
              <Button
                style={{
                  marginRight: "5px",
                  fontSize: 14,
                }}
                variant="info"
                size="sm"
                className="p-0 me-2"
                onClick={() => console.log("Lihat", row.id)}
              >
                <FaEye style={{ color: "blue" }} />
                Lihat
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
              <Button
                style={{
                  marginRight: "5px",
                  fontSize: 14,
                }}
                variant="warning"
                size="sm"
                className="p-0 me-2"
                onClick={() => handleEdit(row)}
              >
                <FaEdit style={{ color: "yellow" }} />
                Edit
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Hapus</Tooltip>}>
              <Button
                style={{
                  marginRight: "5px",
                  fontSize: 14,
                }}
                variant="dark"
                size="sm"
                className="p-0"
                onClick={() => console.log("Hapus", row.id)}
              >
                <FaTrash style={{ color: "black" }} />
                Hapus
              </Button>
            </OverlayTrigger>
          </>
        ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      pointerOnHover
      responsive
    />
  );
};

export default Timeline;
