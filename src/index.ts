import express from "express";

const app = express();
const port = 3000;

app.get("/", (_, res) => {
  res.send("Hellllllloooo");
});

app.listen(3000, () => {
  // tslint:disable-next-line
  console.log(`App started on ${port}`);
});
