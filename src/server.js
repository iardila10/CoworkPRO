import express from "express"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"))

app.listen(8000, ()=>
    console.log("Server running")
);