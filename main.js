const form = document.forms["formFood"];
// Declare
let getList = localStorage.getItem("getList")
  ? JSON.parse(localStorage.getItem("getList"))
  : [];
let chooseBtn = document.getElementById("btn-add");

let getID = document.getElementById("foodID");
let getName = document.getElementById("foodName");
let getCost = document.getElementById("foodCost");

let findNamebtn = document.getElementById("findByName");
let searchInput = document.getElementById("searchInput");

let currentID = "";
document.getElementById("foodID").value = 1;

//add & edit item

function updateFood() {
  let idFood = getID.value;
  let nameFood = getName.value;
  let costFood = getCost.value;
  if (!nameFood) {
    document.getElementById("name-messages").innerHTML =
      "Name is not invalid, please check !";
    nameFood = "";
  } else {
    document.getElementById("name-messages").innerHTML = "";
  }

  if (nameFood) {
    if (currentID === "") {
      getList.push({
        idFood: idFood,
        nameFood: nameFood,
        costFood: costFood,
      });
    } else {
      getList.splice(currentID, 1, {
        idFood,
        nameFood,
        costFood,
      });
      currentID = "";
      chooseBtn.innerHTML = "Add";
    }
    localStorage.setItem("getList", JSON.stringify(getList));
    renderList();

    nameFood = document.getElementById("foodName").value = "";
    costFood = document.getElementById("foodCost").value = "";
  }
}
//render list
function renderList() {
  if (!getList.length) {
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
  getList.forEach((food, id) => {
    id++;
    listFood += `
      <tr id = "tr-food">
          <td id= "td-id">${food.idFood}</td>
          <td id= "td-name"> ${food.nameFood}</td>
          <td id= "td-cost"> ${food.costFood}</td>
          <td id= "td-select"><a href='#' id = "edit" onclick = "editID(${food.idFood})" >Edit</a> 
            | <a href='#' onclick = "deleteFood(${food.idFood})">Delete</a></td>
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
  let foodfinded = getList.find(foodFind);

  currentID = getList.indexOf(foodfinded);

  getID.value = foodfinded["idFood"];
  getName.value = foodfinded["nameFood"];
  getCost.value = foodfinded["costFood"];

  chooseBtn.innerHTML = "Save";
}

//delete item by id

const deleteFood = (id) => {
  const indexFind = getList.findIndex((food) => food.idFood == id);

  if (indexFind > -1) {
    const confirmDelete = confirm("Are you sure that delete this Food ???");
    if (confirmDelete) {
      getList.splice(indexFind, 1);
      localStorage.setItem("getList", JSON.stringify(getList));
      renderList();
    }
  }
};

const totalCost = getList.reduce(sumCost, 0);

function sumCost(cost, currentCost) {
  return cost + Number(currentCost.costFood);
}
document.getElementById("total").innerHTML = totalCost;

//
//Sort

function sortBySelect() {
  let selectValue = document.getElementById("foodSort").value;
  //sort by ID
  if (selectValue === "option1") {
    getList.sort((item1, item2) => {
      return item1.idFood - item2.idFood;
    });
    renderList();
  }
  //sort by Name
  else if (selectValue === "option2") {
    getList.sort((item1, item2) => {
      if (item1.nameFood < item2.nameFood) {
        return -1;
      }
    });
    renderList();
  }
  // sort by cost
  else if (selectValue === "option3") {
    getList.sort((item1, item2) => {
      return item1.costFood - item2.costFood;
    });
    renderList();
  }
}

//Find by field

function searchFood() {
  let findNamebtn = document.getElementById("findByName").checked;
  let convertValue = searchInput.value.toLocaleLowerCase();
  if (!searchInput.value) {
    window.location.reload();
  }
  if (findNamebtn) {
    getList = getList.filter((listFind) => {
      return listFind.nameFood.toLocaleLowerCase().includes(convertValue);
    });
    renderList();
  } else {
    getList = getList.filter((listFind) => {
      return listFind.costFood.toLocaleLowerCase().includes(convertValue);
    });
    renderList();
  }
}
