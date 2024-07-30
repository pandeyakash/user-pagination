getData(`https://jsonplaceholder.typicode.com/users?_page=1&_limit=2`);

async function getData(url) {
  try {
    const response = await fetch(url);
    const totalData = response.headers.get("X-Total-count");
    const data = await response.json();
    console.log(data);
    displayData(data);
    pagination(totalData, 2);
  } catch (err) {
    console.log(err);
  }
}

const container = document.querySelector(".users-container");
function displayData(data) {
  container.innerHTML = "";
  data.forEach((ele, i) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const name = document.createElement("h3");
    name.textContent = ele.name;

    const email = document.createElement("div");
    email.textContent = ele.email;

    card.append(name, email);
    container.appendChild(card);
  });
}

const paginationDiv = document.querySelector(".pagination");
let currentPage = 1;
function pagination(totalData, limit) {
  paginationDiv.innerHTML = "";
  const prev = document.createElement("button");
  prev.textContent = "Prev";
  paginationDiv.append(prev);

  prev.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      getData(
        `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${limit}`
      );
    }
  });

  const totalButtons = Math.ceil(totalData / limit);

  for (let i = 1; i <= totalButtons; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    paginationDiv.append(button);

    button.addEventListener("click", () => {
      getData(
        `https://jsonplaceholder.typicode.com/users?_page=${i}&_limit=${limit}`
      );
      currentPage = i;
    });
  }

  const next = document.createElement("button");
  next.textContent = "Next";
  paginationDiv.append(next);

  next.addEventListener("click", () => {
    if (currentPage < totalButtons) {
      currentPage++;
      getData(
        `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${limit}`
      );
    }
  });
}
