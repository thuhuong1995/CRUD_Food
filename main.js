const form = document.forms["formFood"];
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
let getList = localStorage.getItem("getList")
  ? JSON.parse(localStorage.getItem("getList"))
  : [];
let chooseBtn = document.getElementById("btn-add");
let currentID = "";
document.getElementById("foodID").value = 1;

function updateFood() {
  let idFood = document.getElementById("foodID").value;
  let nameFood = document.getElementById("foodName").value;
  let costFood = document.getElementById("foodCost").value;

  if (nameFood == "") {
    document.getElementById("id-messages").innerHTML = "";

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
        idFood: idFood,
        nameFood: nameFood,
        costFood: costFood,
      });
      currentID = "";
      chooseBtn.innerHTML = "Add";
    }
    localStorage.setItem("getList", JSON.stringify(getList));
    this.renderList();

    nameFood = document.getElementById("foodName").value = "";
    costFood = document.getElementById("foodCost").value = "";
  }
}

function renderList() {
  if (getList === 0) {
    return false;
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
          <td id= "td-id">${id}</td>
          <td id= "td-name"> ${food.nameFood}</td>
          <td id= "td-cost"> ${food.costFood}</td>
          <td id= "td-select"><a href='#' id = "edit" onclick = "editID(${food.idFood})" >Edit</a> 
            | <a href='#' onclick = "deleteFood(${food.idFood})">Delete</a></td>
      </tr>
      `;
    document.getElementById("foodID").value = ++id;
  });

  document.getElementById("list-food").innerHTML = listFood;
}

const deleteFood = (id) => {
  const indexFind = getList.findIndex((food) => food.idFood == id);

  if (indexFind > -1) {
    let confirmDelete = confirm("Are you sure that delete this Food ???");
    if (confirmDelete == true) {
      getList.splice(indexFind, 1);
      localStorage.setItem("getList", JSON.stringify(getList));
      renderList();
    } else {
      return false;
    }
  }
};

function editID(id) {
  const indexFind = getList.findIndex((food) => food.idFood == id);
  let food = getList[indexFind];
  currentID = indexFind;
  document.getElementById("foodID").value = food["idFood"];
  document.getElementById("foodName").value = food["nameFood"];
  document.getElementById("foodCost").value = food["costFood"];

  chooseBtn.innerHTML = "Save";
}

const totalCost = getList.reduce(sumCost, 0);

function sumCost(cost, currentCost) {
  return cost + Number(currentCost.costFood);
}

document.getElementById("total").innerHTML = totalCost;

//
//Sort
function sortBySelect() {
  let selectValue = document.getElementById("foodSort").value;
  //sort by Name
  if (selectValue == "option2") {
    getList.sort((item1, item2) => {
      if (item1.nameFood < item2.nameFood) {
        return -1;
      }
      if (item1.nameFood > item2.nameFood) {
        return 1;
      }
      return 0;
    });
    localStorage.setItem("getList", JSON.stringify(getList));
    this.renderList();
  }
  // sort by cost
  else if (selectValue == "option3") {
    getList.sort((item1, item2) => {
      if (item1.costFood < item2.costFood) {
        return -1;
      }
      if (item1.costFood > item2.costFood) {
        return 1;
      }
      return 0;
    });
    localStorage.setItem("getList", JSON.stringify(getList));
    this.renderList();
  }
}
//

//Find by field
function searchFood() {
  let findCostbtn = document.getElementById("findByCost").checked;
  let searchInput = document.getElementById("searchInput").value;
  if (findCostbtn === true) {
    getList = getList.filter((listFind) => {
      return listFind.costFood === searchInput;
    });
    console.log(getList);
    this.renderList();
  } else {
    getList = getList.filter((listFind) => {
      return listFind.nameFood === searchInput;
    });
    console.log(getList);
    this.renderList();
  }
}
