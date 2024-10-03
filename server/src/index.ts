import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Import routes
import businessRoute from "./routes/businessRoute";
import rankDataRoute from "./routes/rankDataRoute";
import reviewsRoute from "./routes/reviewsRoute";
import taskRoute from "./routes/taskRoute";

// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("This is overview route");
})

// Get all businesses from db
app.use("/business", businessRoute)
app.use("/rankData", rankDataRoute)
app.use("/reviews", reviewsRoute)
app.use("/tasks", taskRoute)

// Server
const port = Number(process.env.PORT) || 3000;

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port: ${port}`);
})