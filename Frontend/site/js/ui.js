const input = document.getElementById("url");
const button = document.getElementById("parseBtn");
const result = document.getElementById("result");

button.addEventListener("click", function () {
    const url = input.value.trim();

    if (!url) {
        result.textContent = "Enter URL!";
        return;
    }

    result.textContent = "Loading...";

    fetch("http://127.0.0.1:8000/parse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: url })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            result.textContent = data.title || "No title found";
        })
        .catch(error => {
            result.textContent = "Error: " + error.message;
        });
});