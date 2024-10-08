document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    //den input som användaren skriver in
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },

            body: JSON.stringify({ username, password })

        });

        if(!response.ok) {
            throw new Error("Login failed")
        }


        const data = await response.json();
        const token = data.response.token
        localStorage.setItem("token", token);

        const isValid = await verifyToken(token);

        // Om token är giltig, omdirigera användaren
        if (isValid) {
            window.location.href = "admin.html";
        } else {
            throw new Error("Ogiltig token");
        }

    } catch (error) {
        console.log("Server fel inträffade: " + error.message);
    }
});


async function verifyToken(token) {

    console.log(token);

    try {
        const response = await fetch('/api/protected', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    
        if(!response.ok) {
            throw new Error("Access denied");
        }
        return true; // Token är giltig om allt gick bra

    } catch (err) {
        console.error("Ett fel inträffade vid verifiering av token:", err.message);
        return false; // Token är ogiltig eller servern avvisade begäran
    }
}
