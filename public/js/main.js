
//registrering
document.getElementById("registration-form").addEventListener("submit", async function(event) {

    event.preventDefault();

    const username = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },

            body: JSON.stringify({ username, password })


        });

        const result = await response.json();

        if(response.ok) {
            const noticeEl = document.getElementById("notice");
            noticeEl.textContent = "Användare registrerad!";
            noticeEl.classList.remove("hidden");
            noticeEl.classList.add("show");

            setTimeout(() => {
                noticeEl.classList.remove("show");
                noticeEl.classList.add("hidden");
            }, 2000);
        } else {
            const errorNoticeEl = document.getElementById("errorNotice");
            errorNoticeEl.textContent = result.error;
            errorNoticeEl.classList.remove("hidden");
            errorNoticeEl.classList.add("show");

            setTimeout(() => {
                errorNoticeEl.classList.remove("show");
                errorNoticeEl.classList.add("hidden");
            }, 2000);
        }

    } catch (error) {
        console.log("Server fel inträffade")
    }
});


