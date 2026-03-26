const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

// store uploaded files
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;

    // suspicious extensions
    const suspiciousExtensions = [".exe", ".bat", ".sh"];

    let isSuspicious = suspiciousExtensions.some(ext =>
        file.originalname.toLowerCase().endsWith(ext)
    );

    if (isSuspicious) {
        return res.json({ status: "❌ Suspicious File Detected" });
    }

    res.json({ status: "✅ File is Safe" });
});

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});