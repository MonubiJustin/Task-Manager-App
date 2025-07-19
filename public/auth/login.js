document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const authMsg = document.getElementById('auth-msg');

        try {
            const url = BASE_URL.replace('/tasks', '/users/login');
            const response = await fetch(url, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json()
            
            if(!response.ok) {
                authMsg.textContent = data.message
                authMsg.style.color = 'red'
            } else {
                
                authMsg.textContent = data.message;
                authMsg.style.color = 'green'

                //store the token in localstorage
                localStorage.setItem("token", data.data);
                setTimeout(() => {
                    window.location.href = "../index.html"
                }, 2000)
            }
        } catch (err) {
            authMsg.textContent = err
            authMsg.style.color = 'red'
        }
    })
})