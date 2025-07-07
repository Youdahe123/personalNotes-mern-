const submit = document.getElementById('Submit');
const signIn = document.getElementById('signIn');
const notes = document.getElementById('notesList');

function logIn() {
    const title = document.getElementById('noteTitle')
    const content = document.getElementById('noteContent')
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
    if(!username || !password){
        window.alert('Unsuccessful try again')
    }else{
        window.alert('Successful!')
    }
}

function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const token = localStorage.getItem('token')
    fetch('/api/notes/postNote',{
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        body: new URLSearchParams({
            title,content
        })
    })
}



function submitForm() {
    submit.style.display = 'block';
    signIn.style.display = 'none';
}

function signInA() {
    submit.style.display = 'none';
    signIn.style.display = 'block';
}

function Add(){
    const signUppage = document.getElementById('signUpPage')
    const noteForm = document.getElementById('addNoteForm')
    signUppage.style.display = 'none'
    noteForm.style.display = 'block'

}
function goBack(){
    const signUppage = document.getElementById('signUpPage')
    const noteForm = document.getElementById('addNoteForm')

    signUppage.style.display = 'block'
    noteForm.style.display = 'none'
}
