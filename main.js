const form = document.forms["formFood"];
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
// Declare
let menuFood = localStorage.getItem("menuFood")
  ? JSON.parse(localStorage.getItem("menuFood"))
  : [];
let updateBtn = document.getElementById("btn-update");
let foodSort = document.getElementById("foodSort");
let deleteBtn = document.getElementById("delete-btn");

let getID = document.getElementById("foodID");
let getName = document.getElementById("foodName");
let getCost = document.getElementById("foodCost");

let findNamebtn = document.getElementById("findByName");
let searchInput = document.getElementById("searchInput");
let bodyReload = document.getElementsByTagName("body");
let currentID = "";
document.getElementById("foodID").value = 1;
//
// add & save btn
updateBtn.addEventListener("click", updateFood);
function updateFood() {
  let idFood = getID.value;
  let nameFood = getName.value;
  let costFood = getCost.value;

  let listID = menuFood.reduce((list, item) => {
    return list.concat(item.idFood);
  }, []);
  const isValid = listID.includes(idFood);
  if (isValid) {
    document.getElementById("id-messages").innerHTML =
      "ID is exist, please check !!!";
  } else if (!nameFood) {
    document.getElementById("name-messages").innerHTML =
      "Name is not invalid, please check !";
    nameFood = "";
  } else {
    document.getElementById("name-messages").innerHTML = "";
    document.getElementById("id-messages").innerHTML = "";
  }

  if (!isValid && nameFood) {
    if (currentID === "") {
      menuFood.push({
        idFood: idFood,
        nameFood: nameFood,
        costFood: costFood,
      });
    } else {
      menuFood.splice(currentID, 0, {
        idFood,
        nameFood,
        costFood,
      });
      currentID = "";
      updateBtn.innerHTML = "Add";
    }
    localStorage.setItem("menuFood", JSON.stringify(menuFood));
    renderList();

    nameFood = document.getElementById("foodName").value = "";
    costFood = document.getElementById("foodCost").value = "";
  }
}
//render list
bodyReload.addEventListener = ("load", renderList());
function renderList() {
  if (!menuFood.length) {
    return;
  }
  let listFood = `
    <tr id = >
        <td > ID</td>
        <td > NAME</td>
        <td > COST</td>
        <td > SELECT</td>
    </tr>
    `;
  menuFood.forEach((food, id) => {
    id++;
    listFood += `
      <tr id = "tr-food">
          <td id= "td-id">${food.idFood}</td>
          <td id= "td-name"> ${food.nameFood}</td>
          <td id= "td-cost"> ${food.costFood}</td>
          <td id= "td-select"><a href='#' id = "edit-btn" onclick = "editID(${food.idFood})" >Edit</a> 
            | <a href='#' id = "delete-btn" onclick = "deleteFood(${food.idFood})">Delete</a></td>
      </tr>
      `;

    getID.value = ++id;
  });
  document.getElementById("list-food").innerHTML = listFood;
}
// fill data to edit

function editID(id) {
  function foodFind(food) {
    return food.idFood == id;
  }
  let foodfinded = menuFood.find(foodFind);
  currentID = menuFood.indexOf(foodfinded);
  menuFood.splice(currentID, 1);
  getID.value = foodfinded["idFood"];
  getName.value = foodfinded["nameFood"];
  getCost.value = foodfinded["costFood"];
  getID.style.pointerEvents = "none";
  updateBtn.innerHTML = "Save";
}

//delete item by id

const deleteFood = (id) => {
  const indexFind = menuFood.findIndex((food) => food.idFood == id);
  if (indexFind > -1) {
    const confirmDelete = confirm("Are you sure that delete this Food ???");
    if (confirmDelete) {
      menuFood.splice(indexFind, 1);
      localStorage.setItem("menuFood", JSON.stringify(menuFood));
      renderList();
    }
  }
};

const totalCost = menuFood.reduce(sumCost, 0);

function sumCost(cost, currentCost) {
  return cost + Number(currentCost.costFood);
}
document.getElementById("total").innerHTML = totalCost;

//Sort
foodSort.addEventListener("change", sortBySelect);
function sortBySelect() {
  let selectValue = document.getElementById("foodSort").value;
  //sort by ID
  if (selectValue === "option1") {
    menuFood.sort((item1, item2) => {
      return item1.idFood - item2.idFood;
    });
    renderList();
  }
  //sort by Name
  else if (selectValue === "option2") {
    menuFood.sort((item1, item2) => {
      if (item1.nameFood < item2.nameFood) {
        return -1;
      }
    });
    renderList();
  }
  // sort by cost
  else if (selectValue === "option3") {
    menuFood.sort((item1, item2) => {
      return item1.costFood - item2.costFood;
    });
    renderList();
  }
}

//Find by field
searchInput.addEventListener("keyup", searchFood);
function searchFood() {
  let findNamebtn = document.getElementById("findByName").checked;
  let convertValue = searchInput.value.toLocaleLowerCase();
  if (!searchInput.value) {
    window.location.reload();
  }
  if (findNamebtn) {
    menuFood = menuFood.filter((listFind) => {
      return listFind.nameFood.toLocaleLowerCase().includes(convertValue);
    });
    renderList();
  } else {
    menuFood = menuFood.filter((listFind) => {
      return listFind.costFood.toLocaleLowerCase().includes(convertValue);
    });
    renderList();
  }
}
