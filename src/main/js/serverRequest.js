export async function newUser(name) {
    const responce = await fetch('https://server-sse-project.onrender.com/new-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    });

    if (responce.ok) {
        console.log('name Save')
        const data = await responce.json();
        return data;
    } else {
        console.log('error')
    }
}

// export async function getPersons() {
//     const responce = await fetch('https://server-sse-project.onrender.com/new-user');
//     const result = await responce.json();

//     if (result[0] == undefined) {return false}
//     return result;
// }