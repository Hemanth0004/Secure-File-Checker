async function uploadFile(event) {
    if (event) event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file!");
        return;
    }

    document.getElementById("fileName").innerText = "Selected: " + file.name;
    document.getElementById("result").innerText = "Checking... ⏳";

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    const resultElement = document.getElementById("result");
    resultElement.innerText = data.status;

    if (data.status.includes("Safe")) {
        resultElement.style.color = "green";
    } else {
        resultElement.style.color = "red";
    }
}