async function postSignIn() {
    const form = document.getElementById('signin');
    let submitted = false;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (submitted) return;

        submitted = true;

        const { 0: email, 1: password } = form;
        const data = {
            email: email.value,
            password: password.value
        }

        const signin = await fetch("signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!signin.ok) return console.error(signin);

        const cookie = await signin.json();
        document.cookie = `jwt=${cookie.jwt}`;

        window.location.href = await fetch("payment", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => { return res.url });
    });
}
