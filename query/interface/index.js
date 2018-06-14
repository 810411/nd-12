const textArea = document.querySelector(`.chat-window`);

const name = document.querySelector(`.input-name`);
const lastname = document.querySelector(`.input-lastname`);
const phone = document.querySelector(`.input-phone`);

const updateId = document.querySelector(`.update-id`);
const updateName = document.querySelector(`.update-name`);
const updateLastname = document.querySelector(`.update-lastname`);
const updatePhone = document.querySelector(`.update-phone`);

const deleteId = document.querySelector(`.delete-id`);

const findName = document.querySelector(`.find-name`);
const findLastname = document.querySelector(`.find-lastname`);
const findPhone = document.querySelector(`.find-phone`);

const sendUserButton = document.querySelector(`.send-user`);
const getDataButtton = document.querySelector(`.get-data`);
const updateUserButton = document.querySelector(`.update-user`);
const findUserButton = document.querySelector(`.find-user`);
const deleteUserButton = document.querySelector(`.delete-user`);

const url = `http://localhost:1337/api/v1/users`;

const preprocessData = (data) => {
  let preprocessed = ``;
  data.forEach((user) => {
    const userData = `id: ${user._id},\nName: ${user.name} ${user.lastname},\nPhone: ${user.phone}\n`;
    preprocessed = preprocessed + `\n` + userData;
  });

  return preprocessed;
};

sendUserButton.addEventListener(`click`, (event) => {
  event.preventDefault();
  const user = {};
  user.name = name.value;
  user.lastname = lastname.value;
  user.phone = phone.value;

  name.value = ``;
  lastname.value = ``;
  phone.value = ``;

  const requestSettings = {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': `application/json`
    },
    method: `POST`
  };

  fetch(url, requestSettings)
    .then((data) => {
      console.log(`Request succeeded`);
      textArea.value = textArea.value + `\n Contact added \n`
    })
    .catch((err) => {
      textArea.value = textArea.value + `Request failed \n`;
      console.log(`Request failed`, err);
    })
});

getDataButtton.addEventListener(`click`, (event) => {
  event.preventDefault();
  textArea.value = ``;
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      textArea.value = textArea.value + preprocessData(data);
    })
    .catch((err) => {
      textArea.value = textArea.value + `Request failed \n`;
      console.log(`Request failed`, err);
    })
});

updateUserButton.addEventListener(`click`, (event) => {
  event.preventDefault();

  const user = {};
  user.id = updateId.value;
  user.name = updateName.value;
  user.lastname = updateLastname.value;
  user.phone = updatePhone.value;

  updateId.value = ``;
  updateName.value = ``;
  updateLastname.value = ``;
  updatePhone.value = ``;

  const requestSettings = {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': `application/json`
    },
    method: `PUT`
  };

  if (user.id !== ``) {
    fetch(url, requestSettings)
      .then((data) => {
        console.log(`Request succeeded`);
        textArea.value = textArea.value + `\n Contact updated \n`
      })
      .catch((err) => {
        textArea.value = textArea.value + `Request failed \n`;
        console.log(`Request failed`, err);
      })
  }
});

deleteUserButton.addEventListener(`click`, (event) => {
  event.preventDefault();

  const user = {};
  user.id = deleteId.value;

  deleteId.value = ``;

  const requestSettings = {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': `application/json`
    },
    method: `DELETE`
  };
  if (user.id !== ``) {
    fetch(url, requestSettings)
      .then((data) => {
        console.log(`Request succeeded`);
        textArea.value = textArea.value + `\n Contact deleted \n`
      })
      .catch((err) => {
        textArea.value = textArea.value + `Request failed \n`;
        console.log(`Request failed`, err);
      })
  }
});

findUserButton.addEventListener(`click`, (event) => {
  event.preventDefault();

  const user = {};
  user.name = findName.value;
  user.lastname = findLastname.value;
  user.phone = findPhone.value;

  findName.value = ``;
  findLastname.value = ``;
  findPhone.value = ``;

  const requestSettings = {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': `application/json`
    },
    method: `POST`
  };

  fetch(url + `/find`, requestSettings)
    .then((data) => data.json())
    .then((user) => {
      console.log(`Request succeeded`);
      textArea.value = textArea.value + `\n Contact found: ${preprocessData(user)} \n`
    })
    .catch((err) => {
      textArea.value = textArea.value + `Request failed \n`;
      console.log(`Request failed`, err);
    })
});