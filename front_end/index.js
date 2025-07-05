const submit = document.getElementById('Submit');
const signIn = document.getElementById('signIn');
const notes = document.getElementById('notesList');

function logIn() {
    const title = document.getElementById('title')
    const content = document.getElementById('content')
    const username = document.querySelector('#loginForm input[name="username"]').value
    const password = document.querySelector('#loginForm input[name="password"]').value
    fetch('/api/users/signIn', {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            username,password
        })
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('token', data.token);

        fetch('/api/notes/getNote', {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        })
        .then(res => res.json())
        .then(notesData => {
            if(!notesData.notes[0].title){
                title.textContent = `Title: Empty Title please put something here!` 
            }else{
                title.textContent = `Title ${notesData.notes[0].title}` 
            }
            if(!notesData.notes[0].content){
                content.textContent = `Content: Empty Content please put something here!`
            }else{
                content.textContent = `Content: ${notesData.notes[0].content}`
            }
            
        })
    });
}

function submitForm() {
    submit.style.display = 'block';
    signIn.style.display = 'none';
}

function signInA() {
    submit.style.display = 'none';
    signIn.style.display = 'block';
}
