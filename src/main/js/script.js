import { newUser} from "./serverRequest";
import { loadPerson, createMessage, updatePerson } from "./message";
export const ws = new WebSocket('https://server-sse-project.onrender.com');
export const chatBox = document.querySelector('.chat-box');
export let person = {
  user: {
    id: '0',
    name: ''
  }
};
const login = document.querySelector('.login');
const buttonLogin = login.querySelector('.login_button');
const input = login.querySelector('.login_input');
let dataSafe;
buttonLogin.addEventListener('click', async () => {
    person.user.name = input.value;
    if (input.value.trim() == '') { return ;}
    person = await (newUser(input.value));
    if (person.user.id !== '0') {
        login.classList.add('visibility_hiden');
        chatBox.classList.remove('visibility_hiden');
    } else {
        input.value = ''
        input.placeholder = 'Занят. Пожалуйста поменяйте псевдоним'
    }
});

ws.addEventListener('message', (e) => { 
    const data = JSON.parse(e.data);
    console.log(data);
    if (data.type == 'send') {
        if (data.user.name == person.user.name) {   return  }
        console.log('new message');
        createMessage(data.message, data.user.name);
    } else if (!data.type && data.length > 0)   {
        updatePerson();
        data.forEach(element => {
            if (element.name == person.user.name) {
                loadPerson('You', true);
            } else {
                loadPerson(element.name);
                console.log("добавил " + element.name)
            }
        });
    }
});

window.addEventListener('beforeunload', () => {
    if (person.user.id == '0') return;
    ws.send(JSON.stringify({
        type: 'exit',
        user: {
            name: `${person.user.name}`,
            id: `${person.user.id}`
        }
    }));
})