// Elements from Login form
const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-signup');


// Elements from User form
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editAvatarURL = document.querySelector('.edit-avatar');
const userAvatarElem = document.querySelector('.user-avatar');

// Regex for email validation
const regExValidEmail = /^\w+@\w+\.\w{2,}$/;

// Get posts
const postsWrapper = document.querySelector('.posts');

// Dummy users
const listUsers = [
  {
    email: 'alexandra@mail.com',
    password: '12345',
    displayName: 'Alexandra_JS'
  },
  {
    email: 'bruce@mail.com',
    password: 'brbrbr',
    displayName: 'Bruce the Moose'
  }
];


// Object to manipulate user
const setUsers = {
  user: null,
  logIn(email, password, handler) {
    //Email validation
    if (!regExValidEmail.test(email)) {
      alert('Email is not valid.');
      return
    }
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('User credentials not found.')
    }
  },
  logOut(handler) {
    this.user = null;
    handler();

  },
  signUp(email, password, handler) {
    //Email validation
    if (!regExValidEmail.test(email)) {
      alert('Email is not valid.');
      return
    }

    // Disable registration with empty credentials    
    if (!email.trim() || !password.trim()) {
      alert('Enter the credentials.');
      return
    }

    if (!this.getUser(email)) {
      const user = {
        email,
        password,
        displayName: email.split("@")[0]
      }
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('User with this email address already exists.')
    }
  },
  editUserData(userName, userAvatar, handler) {
    if (userName) {
      this.user.displayName = userName;
    }

    if (userAvatar) {
      this.user.avatar = userAvatar;
    }

    handler();
  },
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  }
};

// Object to manipulate posts
const setPosts = {
  allPosts: [
    {
      title: 'Post Title',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      tags: ['new', 'hot', 'mine', 'chance'],
      author: 'bruce@mail.com',
      date: '11.11.2020, 20:50:00',
      likes: 15,
      comments: 13
    },
    {
      title: 'Another Post Title',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      tags: ['new', 'hot', 'mine'],
      author: 'alexandra@mail.com',
      date: '05.11.2020, 10:01:03',
      likes: 5,
      comments: 10
    }
  ]

};

// Switch between User and Authorization forms
const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.avatar ? user.avatar : userAvatarElem.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none'
  }
};


const showAllPosts = () => {

  let postsHTML = '';

  setPosts.allPosts.forEach(({ title, body, date, likes, comments, tags }) => {
    postsHTML += `
      <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p>${body}</p>
          <div class="tags">
            <a href="#" class="tag">#new</a>
            <a href="#" class="tag">#hot</a>
            <a href="#" class="tag">#mine</a>
            <a href="#" class="tag">#chance</a>
          </div>
        </div>
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${likes}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">arteislamov</a>
              <span class="post-time">5 minutes ago</span>
            </div>
            <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
          </div>
        </div>
    </section>
    `;
    postsWrapper.innerHTML = postsHTML;
  })
}

// Function to invoke other functions
const init = () => {

  // Add event listeners to elements of Authorization form
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  });

  loginSignUp.addEventListener('click', event => {
    event.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  });

  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  })


  // When clicking Edit button, show form to edit user data
  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });

  editContainer.addEventListener('submit', event => {
    event.preventDefault();

    setUsers.editUserData(editUsername.value, editAvatarURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });

  showAllPosts();
  toggleAuthDom();
}

// Wait DOM to load to invoke functions
document.addEventListener('DOMContentLoaded', init);