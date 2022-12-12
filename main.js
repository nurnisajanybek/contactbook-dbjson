let inpFirstName = document.querySelector("#inp-first-name");
let inpLastName = document.querySelector("#inp-last-name");
let inpPhone = document.querySelector("#inp-phone");
let inpImg = document.querySelector("#inp-img");
let btnAdd = document.getElementById("btn-add");

let api = "http://localhost:8000/info";

// ! Create
btnAdd.addEventListener("click", async () => {
  let newTodo = {
    firstName: inpFirstName.value,
    lastName: inpLastName.value,
    phone: inpPhone.value,
    image: inpImg.value,
  };
  if (
    newTodo.firstName.trim() === "" ||
    newTodo.lastName.trim() === "" ||
    newTodo.phone.trim() === "" ||
    newTodo.image.trim() === ""
  ) {
    alert("заполните поле!");
    return;
  }
  console.log(newTodo);
  await fetch(api, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  inpFirstName.value = "";
  inpLastName.value = "";
  inpImg.value = "";
  inpPhone.value = "";
  getTodos();
});
getTodos();

let list = document.querySelector("#list");
async function getTodos() {
  let response = await fetch(api).then((res) => res.json());
  // console.log(response);
  list.innerHTML = "";
  response.forEach((item) => {
    let div = document.createElement("div");
    div.id = item.id;
    let img = document.createElement("img");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";
    btnDelete.classList.add("btn-delete");
    btnEdit.classList.add("btn-edit");

    img.src = `${item.image}`;
    img.style.width = "100px";
    img.style.height = "80px";
    img.style.margin = "20px 0px";
    btnDelete.style.justifyContent = "center";

    div.innerHTML = `<span><strong>${item.firstName}</span> <br><span>${item.lastName}</span></strong><br> <span>${item.phone}</span>
        <br>`;

    div.style.border = "1px solid black";
    div.style.padding = "10px 10px 10px 10px";
    div.style.margin = "50px 0px 0px 100px";
    div.style.width = "150px";
    div.style.textAlign = "center";

    div.append(img);
    div.append(btnDelete, btnEdit);
    list.append(div);
  });
}

document.addEventListener("click", async (e) => {
  if (e.target.className == "btn-delete") {
    let id = e.target.parentNode.id;
    await fetch(`${api}/${id}`, {
      method: "DELETE",
    });
    getTodos();
  }
});

// ! Update

document.addEventListener("click", async (e) => {
  if (e.target.className == "btn-edit") {
    modalEdit.style.display = "flex";
    let id = e.target.parentNode.id;
    let response = await fetch(`${api}/${id}`)
      .then((res) => res.json())
      .catch((a) => console.log(a));

    editFirstName.value = response.firstName;
    editLastName.value = response.lastName;
    editPhone.value = response.phone;
    editImage.value = response.image;
    editFirstName.className = response.id;
    editLastName.className = response.id;
    editPhone.className = response.id;
    editImage.className = response.id;
    // console.log(response);
  }
});

let modalEdit = document.getElementById("modal-edit");
let modalEditClose = document.getElementById("modal-edit-close");
let editFirstName = document.getElementById("inp-edit-first-name");
let editLastName = document.getElementById("inp-edit-last-name");
let editPhone = document.getElementById("inp-edit-phone");
let editImage = document.getElementById("inp-edit-image");
let btnSaveEdit = document.getElementById("btn-save-edit");

btnSaveEdit.addEventListener("click", async () => {
  if (
    editFirstName.value.trim() == "" ||
    editLastName.value.trim() == "" ||
    editPhone.value.trim() == "" ||
    editImage.value.trim() == ""
  ) {
    alert("Заполните поле!");
    return;
  }
  let editedTodo = {
    firstName: editFirstName.value,
    lastName: editLastName.value,
    phone: editPhone.value,
    image: editImage.value,
  };

  let idf = editFirstName.className;
  let idl = editLastName.className;
  let idp = editPhone.className;
  let idi = editImage.className;

  await fetch(`${api}/${(idf, idi, idp, idi)}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });

  // console.log(editedTodo);
  modalEdit.style.display = "none";
  getTodos();
});
modalEdit.style.display = "none";
getTodos();

modalEditClose.addEventListener("click", () => {
  modalEdit.style.display = "none";
});
