const body = document.querySelector('body');

let usersCompany = [];

async function getUsers() {
  const response = await fetch('db.json');

  // Only proceed once its resolved
  const data = await response.json();

  return data;
}

getUsers()
  .then(async function getAllElements(data) {
    for (let i = 0; i < data.companies.length; i++) {
      usersCompany.push(data.companies[i]);
      usersCompany[i].users = [];
      usersCompany[i].userCount = 0;
      for (j = 0; j < data.users.length; j++) {
        if (data.users[j].uris.company === data.companies[i].uri) {
          usersCompany[i].users.push(data.users[j]);
          usersCompany[i].userCount++;
        }
      }
    }
    usersCompany = usersCompany.sort((a, b) => a.userCount - b.userCount);
  })
  .then(function() {
    for (let k = 0; k < usersCompany.length; k++) {
      const a = document.createElement('a');
      a.className = 'btn btn-primary';
      a.dataset.toggle = 'collapse';
      a.href = '#user' + k;
      a.role = 'button';
      a.setAttribute('aria-expanded', false);
      a.setAttribute('aria-controls', 'collapseExample');
      body.appendChild(a);

      let textNode = document.createTextNode(usersCompany[k].name);
      const element = document.createElement('div');
      element.className = 'rectangle';
      element.setAttribute('id', k);
      element.appendChild(textNode);
      a.appendChild(element);

      const userShow = document.createElement('div');
      userShow.className = 'collapse';
      userShow.id = 'user' + k;
      element.appendChild(userShow);
      for (l = 0; l < usersCompany[k].users.length; l++) {
        let userTextNode = document.createTextNode(
          usersCompany[k].users[l].name
        );

        userShow.appendChild(userTextNode);
        userShow.appendChild(document.createElement('br'));
      }
    }
  });
