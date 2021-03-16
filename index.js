let namesArray = [];

const sortNames = () => {
  let resultsDiv = document.querySelector("#results-div");
  resultsDiv.innerHTML = `
                <div>
                  <ul class="users-list"> </ul>
                </div>`;
  let usersList = document.querySelector(".users-list");
  namesArray.sort().forEach((name) => {
    usersList.innerHTML += `<li>${name}</li>`;
  });
  namesArray = [];
};
const displayData = (data) => {
  let selectBtn = document.querySelector("#select-btn").value;
  let searchField = document.getElementById("searchField").value;

  let resultsDiv = document.querySelector("#results-div");
  resultsDiv.innerHTML = `
                <div>
                  <ul class="users-list"> </ul>
                </div>`;
  let usersList = document.querySelector(".users-list");

  if (selectBtn === "name") {
    data
      .filter((user) =>
        user.name.toLowerCase().includes(searchField.toLowerCase())
      )
      .forEach((user) => {
        usersList.innerHTML += `<li><a href="details.html?id=${user.id}">${user.name}</a></li>`;
        namesArray.push(user.name);
      });
  }
  console.log(namesArray.sort());
  if (selectBtn === "username") {
    data.forEach((user) => {
      usersList.innerHTML += `<li><a href="details.html?id=${user.id}">${user.username}</a></li>`;
    });
  }
  if (selectBtn === "email") {
    data.forEach((user) => {
      usersList.innerHTML += `<li><a href="details.html?id=${user.id}">${user.email}</a></li>`;
    });
  }
  if (selectBtn === "address") {
    let addressArray = [];
    data.forEach((user) => {
      let addresses = `${user.name}, ${user.address.street}, ${user.address.city}, (${user.address.zipcode})`;
      addressArray.push(addresses);

      usersList.innerHTML += `<li>${addresses}</li>`;
    });
    console.log(addressArray);
  }
};

const retrieveUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(data);
  displayData(data);
};

const retrieveAll = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  let resultsDiv = document.querySelector("#results-div");
  resultsDiv.innerHTML = `
                <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>


        </tbody>
      </table>`;
  let tableBody = document.querySelector("tbody");
  data.forEach((user) => {
    tableBody.innerHTML += `<tr>
            <th scope="row">${user.id}</th>
            <td><a href="details.html?id=${user.id}">${user.name}</a></td>
            <td>${user.username}</td>
            <td>${user.email}</td>
          </tr> `;
  });
};
