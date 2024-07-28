const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data", "scripts.json");

const saveData = (data) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Data successfully saved to scripts.json");
    }
  });
};

// Example data to save
const scripts = [
  {
    title: "Story Title 1",
    content: "Content of story 1...",
  },
  {
    title: "Story Title 2",
    content: "Content of story 2...",
  },
];

// Save data
saveData(scripts);
