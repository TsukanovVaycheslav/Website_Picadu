// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
});

const loginElem = document.querySelector('.login'),
    loginForm = document.querySelector('.login-form'),
    emailInput = document.querySelector('.login-email'),
    passwordInput = document.querySelector('.login-password'),
    loginSignup = document.querySelector('.login-signup'),

    userElem = document.querySelector('.user'),
    userNameElem = document.querySelector('.user-name');

const listUsers = [
    {
        id: '01',
        email: 'maks@mail.com',
        password: '12345',
        displayName: 'MaksJS'
    },
    {
        id: '02',
        email: 'ok@mail.ru',
        password: '98765',
        displayName: 'okJS'
    }
];

const setUsers = {
    user: null,

    logIn(email, password, handler) {
        const user = this.getUser(email);

        if (user && user.password === password) {
            this.autorizedUser(user);
            handler();
        } else {
            alert('Пользователь с такими данными не найден');
        }
    },

    logOut() {
        console.log('logout');
    },

    signUp(email, password, handler) {
        if (!this.getUser(email)) {
            const user = { email, password, displayName: email.split('@')[0] };
            listUsers.push(user);
            this.autorizedUser(user);
            handler();
        } else {
            alert('Пользователь с таким Email уже зарегистрирован');
        }
    },

    getUser(email) {
        return listUsers.find(item => item.email === email);
    },

    autorizedUser(user) {
        this.user = user;
    }
};

const toggleAuthDom = () => {
    const user = setUsers.user;

    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
    }
};

toggleAuthDom();

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
});

loginSignup.addEventListener('click', event => {
    event.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
});