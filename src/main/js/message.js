import { ws, person } from "./script";
const messages = document.querySelector('.messages');
const inputChat = document.querySelector('.chat_input');
const persons = document.querySelector('.persons');

export function loadPerson(name, itYou) {
    const person = document.createElement('div');
    person.classList.add('person');

    if (itYou) {    
        person.classList.add('you');
        person.textContent = 'You'
    }
    else { person.textContent = name };

    persons.append(person);
}; //Думал надо будет добавлять всех кто есть,
   //но в серверной части нету GET (получение всех пользователей)
   // поэтому только You и будет
   // Впринципе если нужно могу попробовать сам добавить эту часть
   // в проект

function createMessage(messageText) {
    const message = document.createElement('div');
    message.classList.add('you');
    message.classList.add('message');

    const text = document.createElement('div');
    const name = document.createElement('span');

    text.textContent = messageText;
    name.textContent = 'You'

    message.append(name);
    message.append(text);

    messages.append(message);
}

inputChat.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && inputChat.value.trim() !== '') {
        event.preventDefault();
        console.log('Send Message');
        ws.send(JSON.stringify({
            type: 'send',
            message: `${inputChat.value}`,
            user: {
                name: `${person.user.name}`,
                id: `${person.user.id}`
            }
        }));
        createMessage(inputChat.value);
        inputChat.value = ''
    };
});