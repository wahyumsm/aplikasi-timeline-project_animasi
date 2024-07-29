import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Badge, Tooltip, OverlayTrigger, Form } from "react-bootstrap";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaFilePdf,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

const actionButtons = (row, isEditing, onEdit, onSave, onCancel, onDelete) => (
  <>
    {isEditing ? (
      <>
        <OverlayTrigger placement="top" overlay={<Tooltip>Simpan</Tooltip>}>
          <Button
            variant="link"
            size="sm"
            className="p-0 me-2"
            onClick={() => onSave(row.id)}
          >
            <FaSave />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Batal</Tooltip>}>
          <Button
            variant="link"
            size="sm"
            className="p-0"
            onClick={() => onCancel()}
          >
            <FaTimes />
          </Button>
        </OverlayTrigger>
      </>
    ) : (
      <>
        <OverlayTrigger placement="top" overlay={<Tooltip>Lihat</Tooltip>}>
          <Button variant="link" size="sm" className="p-0 me-2">
            <FaEye />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Button
            variant="link"
            size="sm"
            className="p-0 me-2"
            onClick={() => onEdit(row.id)}
          >
            <FaEdit />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Hapus</Tooltip>}>
          <Button
            variant="link"
            size="sm"
            className="p-0"
            onClick={() => onDelete(row.id)}
          >
            <FaTrash />
          </Button>
        </OverlayTrigger>
      </>
    )}
  </>
);

const Timeline = ({ data, onEdit, onDelete }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (id) => {
    setEditRowId(id);
    const item = data.find((item) => item.id === id);
    setEditData({ ...item });
  };

  const handleSave = (id) => {
    onEdit(id, editData);
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

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.text("Timeline Project Animasi", 14, 22);
    doc.autoTable({
      startY: 30,
      head: [
        [
          "No",
          "Nama Project",
          "Tugas",
          "Tanggal Mulai",
          "Tanggal Selesai",
          "Status",
          "Catatan",
          "Hasil Akhir",
          "Dibuat Oleh",
        ],
      ],
      body: data.map((item, index) => [
        index + 1,
        item.project,
        item.tugas,
        item.tanggalmulai,
        item.tanggalselesai,
        item.status,
        item.catatan,
        item.hasilakhir,
        item.dibuatoleh,
      ]),
    });
    doc.save("timeline.pdf");
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "50px",
    },
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
            <option value="InProgress">InProgress</option>
            <option value="In-Waiting">In-Waiting</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        ) : (
          statusBadge(row.status)
        ),
      sortable: true,
    },
    {
      name: "Catatan",
      selector: (row) =>
        editRowId === row.id ? (
          <Form.Control
            type="text"
            value={editData.catatan}
            onChange={(e) => handleChange(e, "catatan")}
          />
        ) : (
          row.catatan
        ),
      sortable: true,
    },
    {
      name: "Hasil Akhir",
      selector: (row) =>
        editRowId === row.id ? (
          <Form.Control
            type="text"
            value={editData.hasilakhir}
            onChange={(e) => handleChange(e, "hasilakhir")}
          />
        ) : (
          row.hasilakhir
        ),
      sortable: true,
    },
    {
      name: "Dibuat Oleh",
      selector: (row) =>
        editRowId === row.id ? (
          <Form.Control
            type="text"
            value={editData.dibuatoleh}
            onChange={(e) => handleChange(e, "dibuatoleh")}
          />
        ) : (
          row.dibuatoleh
        ),
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) =>
        actionButtons(
          row,
          editRowId === row.id,
          handleEdit,
          handleSave,
          handleCancel,
          onDelete
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={styles.heading}>
        Timeline Project Animasi
      </h2>
      <Button variant="primary" className="mb-4" onClick={handleExportPdf}>
        <FaFilePdf className="me-2" />
        Export ke PDF
      </Button>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        dense
        customStyles={customStyles}
      />
    </div>
  );
};

const styles = {
  heading: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
};

const customStyles = {
  rows: {
    style: {
      minHeight: "50px",
      "&:nth-of-type(even)": {
        backgroundColor: "#f9f9f9",
      },
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#f5f5f5",
      color: "#333",
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
};

export default Timeline;
