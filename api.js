import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let writingCount = 3;

let writings = [
  {
    id: 0,
    writingHeader: "Lorem 1",
    writingContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 1,
    writingHeader: "Lorem 2",
    writingContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    writingHeader: "Lorem 3",
    writingContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

app.get("/writings", (req, res) => {
  res.status(200).json(writings);
});

app.post("/writings", (req, res) => {
  const writingHeader = req.body.writingHeader;
  const writingContent = req.body.writingContent;
  const newWriting = {
    id: writingCount,
    writingHeader: writingHeader,
    writingContent: writingContent,
  };
  writings.push(newWriting);
  writingCount++;
  res.status(200).json(newWriting);
});

app.get("/writing-detail/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const selectedWriting = writings.find((writing) => id === writing.id);
  if (!selectedWriting)
    return res.status(404).json({ message: "Post not found" });
  res.json(selectedWriting);
});

app.patch("/writings/:id", (req, res) => {
  const writing = writings.find((p) => p.id === parseInt(req.params.id));
  if (!writing) return res.status(404).json({ message: "Writing not found." });

  if (req.body.writingHeader) writing.writingHeader = req.body.writingHeader;
  if (req.body.writingContent) writing.writingContent = req.body.writingContent;

  res.json(writing);
});

app.delete("/writings/:id", (req, res) => {
  const selectedWritingIndex = writings.findIndex(
    (writing) => writing.id === parseInt(req.params.id)
  );
  if (selectedWritingIndex === -1)
    return res.status(404).json({ message: "Post not found" });

  writings.splice(selectedWritingIndex, 1);
  res.status(200).json({ message: "Post deleted." });
});

app.listen(port, (req, res) => {
  console.log(`API is running on port ${port}`);
});
