const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "scripts.json");
const dirPath = path.dirname(filePath);

const ensureDirectoryExists = async (dir) => {
  try {
    await fs.access(dir);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(dir, { recursive: true });
    } else {
      throw error;
    }
  }
};

const readJsonFile = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

const writeJsonFile = async (data) => {
  try {
    await ensureDirectoryExists(dirPath);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing file:", error);
  }
};

module.exports = { readJsonFile, writeJsonFile };
