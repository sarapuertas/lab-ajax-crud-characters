const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/characters');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(response => {

        let text = ''

        response.data.forEach(eachCharacter => text += `
        <div class="character-info">
        <div class="name">${eachCharacter.name}</div>
        <div class="occupation">${eachCharacter.occupation}</div>
        <div class="cartoon">${eachCharacter.cartoon}</div>
        <div class="weapon">${eachCharacter.weapon}</div>
      </div>`)

        document.querySelector(".characters-container").innerHTML = text

      })
      .catch(err => console.log(err))
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    event.preventDefault()

    const chId = document.querySelector('#chId').value

    charactersAPI
      .getOneRegister(chId)
      .then(response => {

        const character = response.data

        let text = ''

        text += `
        <div class="character-info">
        <div class="name">${character.name}</div>
        <div class="occupation">${character.occupation}</div>
        <div class="cartoon">${character.cartoon}</div>
        <div class="weapon">${character.weapon}</div>
      </div>`

        document.querySelector(".characters-container").innerHTML = text

      })
      .catch(err => console.log(err))
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    const chId = document.querySelector('#delChId').value

    charactersAPI
      .deleteOneRegister(chId)
      .then(response => {
        if (response.data === null) {
          document.querySelector('#delete-one').classList.add('green')
        } else {
          document.querySelector('#delete-one').classList.add('red')
        }
      })
      .catch(err => console.log(err))
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')

    const chData = {
      id: inputs[0].value,
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }

    charactersAPI
      .updateOneRegister(chData)
      .then(response => {
        if (response.data) {
          document.querySelector('#send-dataUpdate').classList.add('green')
        }
      })
      .catch(err => {
        console.log(err)
        document.querySelector('#send-dataUpdate').classList.add('red')
      })
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')

    const chData = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
      .createOneRegister(chData)
      .then(response => {
        if (response.data) {
          document.querySelector('#send-dataCreate').classList.add('green')
        } else {
          document.querySelector('#send-dataCreate').classList.add('red')
        }
      })
      .catch(err => console.log(err))
  });
});
