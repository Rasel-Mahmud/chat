import express from "express";
import type {Request, Response} from 'express';

const app = express();
const port = process.env.PORT || 300;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
});

app.listen(port, ()=> {
  console.log(`App is runnung at http://localhost:${port}`)
})