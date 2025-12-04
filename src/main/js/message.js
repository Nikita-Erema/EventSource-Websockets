import { ws, person } from "./script";
const messages = document.querySelector('.messages');
const inputChat = document.querySelector('.chat_input');
const persons = document.querySelector('.persons');

export function updatePerson() {
    persons.innerHTML = '';
}

export function loadPerson(name, itYou) {
    const person = document.createElement('div');
    person.classList.add('person');

    if (itYou) {    
        person.classList.add('you');
        person.textContent = 'You'
    }
    else { person.textContent = name };

    persons.append(person);
};

export function createMessage(messageText, messageName) {
    const message = document.createElement('div');
    message.classList.add('message');
    
    const text = document.createElement('div');
    const name = document.createElement('span');
    
    if (messageName) {
        name.textContent = messageName
        
    } else {
        message.classList.add('you');
        name.textContent = 'You'
    }

    text.textContent = messageText;

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