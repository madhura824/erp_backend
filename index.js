const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT;

app.use(cors())
const studentRoutes = require("./Routes/studentRoutes");
app.use("/api/student", studentRoutes);
const subjectRoutes = require("./Routes/SubjectRoutes")
app.use("/api/subjects", subjectRoutes);
const teacherRoutes = require("./Routes/teacherRoutes")
app.use("/api/teachers", teacherRoutes);
const adminRoutes = require("./Routes/adminRoutes")
app.use("/api/admin", adminRoutes);
const courseRoutes = require("./Routes/CourseRoutes")
app.use("/api/courses", courseRoutes);

const aluminiRoutes=require("./Routes/aluminiRoutes");
app.use("/api/alumini",aluminiRoutes);

const login = require("./Routes/loginRoutes")
app.use("/api/login", login);
const notices = require("./Routes/noticeRoutes")
app.use("/api/notice", notices);
const result = require("./Routes/ResultRoutes")
app.use("/api/result", result);
const cbcs = require("./Routes/cbcsRoutes")
app.use("/api", cbcs);

const isAdminFrontend = require("./Middlewares/isAdminFrontend")
app.use("/isAdminFrontend", isAdminFrontend);

const isadmin = require("./Middlewares/isAdmin")
app.use("/verifyAdmin", isadmin);
const isStudent = require("./Middlewares/isStudent")
app.use("/verifyStudent", isStudent);
const isTeacher = require("./Middlewares/isTeacher")
app.use("/verifyTeacher", isTeacher);
const dbConnection = async () => {
    try {
        await mongoose.connect("");
    } catch (err) {
        console.log(err);
    }
}

dbConnection()

app.use(express.json());

app.listen(PORT, () => {
    console.log("Listening on: http://localhost:" + PORT);
});



