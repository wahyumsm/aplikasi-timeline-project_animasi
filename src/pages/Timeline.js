import React from "react";
import DataTable from "react-data-table-component";
import { Button, Badge, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// Helper function to render status badge
const statusBadge = (status) => {
  let variant;
  switch (status) {
    case "InProgress":
      variant = "warning";
      break;
    case "In-Waiting":
      variant = "secondary";
      break;
    case "Completed":
      variant = "success";
      break;
    default:
      variant = "light";
  }
  return <Badge variant={variant}>{status}</Badge>;
};

// Tooltips for action buttons
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    {props.children}
  </Tooltip>
);

const Timeline = ({ data, setData }) => {
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (row) => {
    // Implement edit functionality here
    console.log("Edit:", row);
  };

  const handleView = (row) => {
    // Implement view functionality here
    console.log("View:", row);
  };

  const columns = [
    {
      name: "PROJECT",
      selector: (row) => row.project,
      sortable: true,
      wrap: true,
    },
    {
      name: "DIBUAT OLEH",
      selector: (row) => row.dibuatoleh,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => statusBadge(row.status),
      sortable: true,
    },
    {
      name: "TUGAS",
      selector: (row) => row.tugas,
      sortable: true,
    },
    {
      name: "TANGGAL MULAI",
      selector: (row) => row.tanggalmulai,
      sortable: true,
    },
    {
      name: "TANGGAL SELESAI",
      selector: (row) => row.tanggalselesai,
      sortable: true,
    },
    {
      name: "CATATAN",
      selector: (row) => row.catatan,
    },
    {
      name: "HASIL AKHIR",
      selector: (row) => row.hasilakhir,
    },
    {
      name: "LINK YOUTUBE TIKTOK",
      cell: (row) => (
        <a href={row.link} target="_blank" rel="noopener noreferrer">
          View
        </a>
      ),
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <OverlayTrigger
            placement="top"
            overlay={renderTooltip({ children: "View" })}
          >
            <Button
              variant="info"
              size="sm"
              onClick={() => handleView(row)}
              style={{ marginRight: "5px", color: "#007bff" }}
            >
              <FaEye />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={renderTooltip({ children: "Edit" })}
          >
            <Button
              variant="warning"
              size="sm"
              onClick={() => handleEdit(row)}
              style={{ marginRight: "5px" }}
            >
              <FaEdit />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={renderTooltip({ children: "Delete" })}
          >
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(row.id)}
            >
              <FaTrash />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  return (
    <div className="timeline-table mt-4">
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        responsive
        dense
        noDataComponent="No data available"
      />
    </div>
  );
};

export default Timeline;
