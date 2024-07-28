// saveData.js
const { writeJsonFile } = require("./fileUtil");

const saveData = async (data) => {
  await writeJsonFile(data);
  console.log("Data successfully saved.");
};

const newData = [
  {
    title: "Story Title 1",
    content: "Content of story 1...",
  },
  {
    title: "Story Title 2",
    content: "Content of story 2...",
  },
];

saveData(newData);
