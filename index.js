import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let writingHeader = "";
let writingContent = "";
let writingCount = 0;

let writings = {};

function addWritingToObject(req) {
  writingHeader = req.body["writing-header"];
  writingContent = req.body["writing-content"];
  writings[writingCount] = {
    writingHeader: writingHeader,
    writingContent: writingContent,
  };
  writingCount++;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    writings: writings,
    writingCount: Object.keys(writings).length,
  });
});

app.get("/add-writing", (req, res) => {
  res.render("add-writing.ejs");
});

app.post("/add-writing", (req, res) => {
  addWritingToObject(req);
  res.render("writing-added.ejs");
});

app.get("/writing-detail/:writingId", (req, res) => {
  const writingId = req.params.writingId;
  res.render("writing-detail.ejs", { writings: writings, i: writingId });
});

app.get("/writing-edit/:writingId", (req, res) => {
  const writingId = req.params.writingId;
  res.render("writing-edit.ejs", { writings: writings, i: writingId });
});

app.post("/edit-writing", (req, res) => {
  writingHeader = req.body["writingHeader"];
  writingContent = req.body["writingContent"];
  const writingIndex = req.body["writingIndex"];

  writings[writingIndex]["writingHeader"] = writingHeader;
  writings[writingIndex]["writingContent"] = writingContent;

  res.redirect(301, `/writing-detail/${writingIndex}`);
});

app.get("/writing-delete/:writingId", (req, res) => {
  const writingId = req.params.writingId;
  res.render("writing-delete.ejs", { writings: writings, i: writingId });
});

app.post("/delete-writing", (req, res) => {
  const writingIndex = req.body["writingIndex"].toString();
  const deleteDecision = req.body["choice"];
  if (deleteDecision === "yes") {
    delete writings[writingIndex];
  }
  res.render("index.ejs", {
    writings: writings,
    writingCount: Object.keys(writings).length,
  });
});

app.listen(port, (req, res) => {
  console.log(`Server started on port ${port}`);
});
