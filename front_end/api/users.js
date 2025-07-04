const API_BASE = '/api'

function getToken(){
    return localStorage.getItem('token')
}

export async function login(username,password){
    const res = await fetch(`${API_BASE}/users/signIn`, {
        method : "POST",
        headers : {"Content-Type":"applications/json"},
        body : JSON.stringify({username,password}),
    })
    if (!res.ok){
        console.log("Error on login")
    }
}

export async function signUp(username,password){
    const res = await fetch(`${API_BASE}/users/register`,{
        method:"POST",
        headers:{"Content-Type":"applications/json"},
        body : JSON.stringify({username,password})
    })
    if(!res.ok){
        console.log("Error on signup")
    }
}