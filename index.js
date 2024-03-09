import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const allWritings = await axios.get(`${API_URL}/writings`);
    res.render("index.ejs", {
      writings: allWritings.data,
      writingCount: allWritings.data.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.get("/add-writing", (req, res) => {
  res.render("add-writing.ejs");
});

app.post("/api/add-writing", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/writings`, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post." });
  }
});

app.get("/writing-detail/:id", async (req, res) => {
  const response = await axios.get(
    `${API_URL}/writing-detail/${req.params.id}`
  );
  if (response.status == 200) {
    res.render("writing-detail.ejs", { writing: response.data });
  } else if (response.status == 404) {
    res.redirect("/");
  }
});

app.get("/writing-edit/:id", async (req, res) => {
  const response = await axios.get(
    `${API_URL}/writing-detail/${req.params.id}`
  );
  res.render("writing-edit.ejs", { writing: response.data });
});

app.post("/api/writing-edit/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${API_URL}/writings/${req.params.id}`,
      req.body
    );
    res.redirect(301, `/writing-detail/${req.params.id}`);
  } catch (error) {
    res.status(500).json({ message: "Error editing post." });
  }
});

app.get("/writing-delete/:id", async (req, res) => {
  res.render("writing-delete.ejs", { id: req.params.id });
});

app.post("/api/writing-delete/:id", async (req, res) => {
  const deleteDecision = req.body.choice;
  if (deleteDecision === "yes") {
    const response = await axios.delete(`${API_URL}/writings/${req.params.id}`);
  }
  res.redirect("/");
});

app.listen(port, (req, res) => {
  console.log(`Server started on port ${port}`);
});
