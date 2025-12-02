import { newUser} from "./serverRequest";
import { loadPerson } from "./message";
export const ws = new WebSocket('wss://server-sse-project.onrender.com');
export const chatBox = document.querySelector('.chat-box');
export let person = undefined;
const login = document.querySelector('.login');
const buttonLogin = login.querySelector('.login_button');
const input = login.querySelector('.login_input');
buttonLogin.addEventListener('click', async () => {
    if (input.value.trim() == '') { return ;}
    person = await (newUser(input.value));
    if (person !== undefined) {
        login.classList.add('visibility_hiden');
        chatBox.classList.remove('visibility_hiden');
        loadPerson(person.user.name, true);
    } else {
        input.value = ''
        input.placeholder = 'Занят. Пожалуйста поменяйте псевдоним'
    }
});

ws.addEventListener('message', (e) => { 
    const data = JSON.parse(e.data);
    
    console.log(data);
    console.log('ws message');
});

window.addEventListener('beforeunload', () => {
    if (person == undefined) return;
    ws.send(JSON.stringify({
        type: 'exit',
        user: {
            name: `${person.user.name}`,
            id: `${person.user.id}`
        }
    }));
})