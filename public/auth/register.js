document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const authMsg = document.getElementById('auth-msg');

        try {
            const url = BASE_URL.replace('/tasks', '/users/register')
            const response = await fetch(url, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username, password })
            });

            const data = await response.json();

            if(!response.ok) {
                authMsg.textContent = data.msg
                authMsg.style.color = "red";
            } else {
                authMsg.textContent = data.msg;
                authMsg.style.color = 'green'
                setTimeout(() => {
                    window.location.href = "./login.html"
                }, 2000)
            }
        } catch (err) {
            authMsg.textContent = err
            authMsg.style.color = 'red'
        }
    })

})