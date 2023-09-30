const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/user", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/api/user", async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
  });
  res.json(user);
});

app.post("/api/profile", async (req, res) => {
  const profile = await prisma.profile.create({
    data: req.body,
  });
  res.json(profile);
});

app.get("/api/profile", async (req, res) => {
  const profile = await prisma.profile.findMany();
  res.json(profile);
});

app.delete("/api/profile/:id", async (req, res) => {
  const profile = await prisma.profile.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json(profile);
});

app.put("/api/profile/:id", async (req, res) => {
  const profile = await prisma.profile.update({
    where: {
      id: req.params.id,
    },
    data: {
      address: req.body.address,
    },
  });
  res.json(profile);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
