"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// Import routes
const businessRoute_1 = __importDefault(require("./routes/businessRoute"));
const rankDataRoute_1 = __importDefault(require("./routes/rankDataRoute"));
const reviewsRoute_1 = __importDefault(require("./routes/reviewsRoute"));
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
const feedbackLinkRoute_1 = __importDefault(require("./routes/feedbackLinkRoute"));
// Configurations
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// Routes
app.get("/", (req, res) => {
    res.send("This is overview route");
});
// Get all businesses from db
app.use("/business", businessRoute_1.default);
app.use("/rankData", rankDataRoute_1.default);
app.use("/reviews", reviewsRoute_1.default);
app.use("/tasks", taskRoute_1.default);
app.use("/feedback", feedbackLinkRoute_1.default);
// Server
const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port: ${port}`);
});
