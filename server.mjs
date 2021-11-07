import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(morgan("short"));

app.get("/", (req, res) => {
  res.send("simple quiz api");
});

let quizArr = [];

app.post("/quiz", (req, res) => {
  if (
    !req.body.question ||
    !req.body.correct_answer ||
    !req.body.solution ||
    !req.body.options
  ) {
    res.status(400).send("invalid data");
  } else {
    quizArr.push({
      question: req.body.question,
      correct_answer: req.body.correct_answer,
      solution: req.body.solution,
      options: req.body.options,
    });
    res.status(200).send("question Added");
  }
});

app.get("/quiz", (req, res) => {
  res.send(quizArr);
});

app.listen(port, () => {
  console.log(`listening to http://localhost:${port}`);
});
