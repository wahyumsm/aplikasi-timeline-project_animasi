import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, OverlayTrigger, Tooltip, Modal, Form } from "react-bootstrap";
import { FaTrashAlt, FaEdit, FaFilePdf, FaImage } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "bootstrap/dist/css/bootstrap.min.css";
import AvatarEditor from "react-avatar-editor";

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    {props.children}
  </Tooltip>
);

const StoryScriptList = ({ scripts, deleteScript, updateScript }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, height: 30 });
  const [editedScript, setEditedScript] = useState(null);

  const handleEditClick = (row, rowIndex) => {
    setEditRowId(rowIndex);
    setEditData({ ...row });
  };

  const handleChange = (e, column) => {
    setEditData({ ...editData, [column]: e.target.value });
  };

  const handleSave = () => {
    if (editRowId !== null) {
      updateScript(editRowId, { ...editData, image: currentImage });
      setEditRowId(null);
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditData({});
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.text("Daftar Script Cerita", 14, 16);

    const columns = ["No", "Judul", "Konten", "Gambar"];
    const data = scripts.map((script, index) => [
      index + 1,
      script.title,
      script.content,
      script.image
        ? { image: script.image, width: 40, height: 30 }
        : "Tidak ada gambar",
    ]);

    doc.autoTable({
      head: [columns],
      body: data,
      startY: 20,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      columnStyles: {
        0: { halign: "center" },
        1: { valign: "middle" },
        2: { valign: "middle", cellWidth: "wrap" },
        3: { valign: "middle", cellWidth: 40 },
      },
      didDrawCell: (data) => {
        if (data.column.index === 3 && data.cell.raw.image) {
          doc.addImage(
            data.cell.raw.image,
            "JPEG",
            data.cell.x + 1,
            data.cell.y + 1,
            40,
            30
          );
        }
      },
    });

    doc.save("story_scripts.pdf");
  };

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
    setShowModal(true);
  };

  const handleEditImageClick = (imageSrc) => {
    setCurrentImage(imageSrc);
    setShowCropModal(true);
  };

  const handleCropComplete = () => {
    if (editRowId !== null) {
      const updatedScripts = [...scripts];
      updatedScripts[editRowId].image = currentImage;
      setEditedScript(updatedScripts);
    }
    setShowCropModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCurrentImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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
          <>
            <img
              src={row.image}
              alt="Preview"
              style={{
                maxWidth: "100px",
                maxHeight: "50px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(row.image)}
            />
            <Button
              variant="link"
              onClick={() => handleEditImageClick(row.image)}
              style={{ marginLeft: "10px" }}
            >
              <FaImage />
            </Button>
          </>
        ) : (
          "Tidak ada gambar"
        ),
      center: true,
      width: "160px",
    },
    {
      name: "Aksi",
      cell: (row, index) =>
        editRowId === index ? (
          <>
            <Button
              variant="success"
              onClick={handleSave}
              style={{ marginRight: "5px" }}
            >
              Simpan
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Batal
            </Button>
          </>
        ) : (
          <>
            <OverlayTrigger
              placement="top"
              overlay={renderTooltip({ children: <FaEdit /> })}
            >
              <Button
                variant="warning"
                onClick={() => handleEditClick(row, index)}
                style={{ marginRight: "5px" }}
              >
                <FaEdit />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={renderTooltip({ children: <FaTrashAlt /> })}
            >
              <Button
                variant="danger"
                onClick={() => deleteScript(index)}
                style={{ marginRight: "5px" }}
              >
                <FaTrashAlt />
              </Button>
            </OverlayTrigger>
          </>
        ),
      width: "150px",
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "20px auto",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="primary"
          onClick={exportToPdf}
          style={{ marginBottom: "10px" }}
        >
          Export to PDF
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={scripts}
        noDataComponent="Tidak ada data"
        pagination
        striped
        highlightOnHover
        responsive
        dense
        theme="solarized"
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Preview Gambar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={modalImage}
            alt="Gambar"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCropModal} onHide={() => setShowCropModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Gambar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Pilih gambar</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
          {currentImage && (
            <AvatarEditor
              image={currentImage}
              width={250}
              height={250}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1.2}
              rotate={0}
              borderRadius={125}
              onImageChange={(image) => setCurrentImage(image)}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCropModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleCropComplete}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StoryScriptList;
