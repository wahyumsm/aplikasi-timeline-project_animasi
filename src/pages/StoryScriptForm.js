import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const StoryScriptForm = ({ addScript }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(`Contoh Template Storyboard Animasi:
Judul: [Masukkan Judul Animasi]

1. Scene 1:
- Deskripsi: [Deskripsi singkat tentang scene]
- Aksi: [Aksi yang terjadi dalam scene ini]
- Dialog: [Dialog yang terjadi dalam scene ini]
- Catatan: [Catatan tambahan untuk scene ini]

2. Scene 2:
- Deskripsi: [Deskripsi singkat tentang scene]
- Aksi: [Aksi yang terjadi dalam scene ini]
- Dialog: [Dialog yang terjadi dalam scene ini]
- Catatan: [Catatan tambahan untuk scene ini]

Tambahkan lebih banyak scene sesuai kebutuhan Anda.
`);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const newScript = { title, content, image };
      addScript(newScript);
      setTitle("");
      setContent(`Contoh Template Storyboard Animasi:
Judul: [Masukkan Judul Animasi]

1. Scene 1:
- Deskripsi: [Deskripsi singkat tentang scene]
- Aksi: [Aksi yang terjadi dalam scene ini]
- Dialog: [Dialog yang terjadi dalam scene ini]
- Catatan: [Catatan tambahan untuk scene ini]

2. Scene 2:
- Deskripsi: [Deskripsi singkat tentang scene]
- Aksi: [Aksi yang terjadi dalam scene ini]
- Dialog: [Dialog yang terjadi dalam scene ini]
- Catatan: [Catatan tambahan untuk scene ini]

Tambahkan lebih banyak scene sesuai kebutuhan Anda.
`);
      setImage(null); // Clear the image after submission
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "20px auto",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#1baa75",
        }}
      >
        Tulis Script Cerita
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label style={{ fontWeight: "bold", color: "#555" }}>
            Judul
          </Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul cerita"
            style={{
              border: "1px solid #C4C4C4",
              borderRadius: "4px",
              padding: "10px",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: "bold", color: "#555" }}>
            Konten
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              border: "1px solid #C4C4C4",
              borderRadius: "4px",
              padding: "10px",
              fontSize: "14px",
              marginBottom: "20px",
              height: "auto",
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: "bold", color: "#555" }}>
            Gambar
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              border: "1px solid #C4C4C4",
              borderRadius: "4px",
              padding: "10px",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          />
          {image && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <img
                src={image}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: "#1baa75",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
          }}
        >
          Simpan
        </Button>
      </Form>
    </div>
  );
};

export default StoryScriptForm;
