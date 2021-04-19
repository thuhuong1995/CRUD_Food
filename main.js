const form = document.forms["formFood"];
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
// Declare
let menuFood = localStorage.getItem("menuFood")
  ? JSON.parse(localStorage.getItem("menuFood"))
  : [];
const updateBtn = document.getElementById("btn-update");
const foodSort = document.getElementById("foodSort");
const deleteBtn = document.getElementById("delete-btn");

const getID = document.getElementById("foodID");
const getName = document.getElementById("foodName");
const getCost = document.getElementById("foodCost");

const findNamebtn = document.getElementById("findByName");
const searchInput = document.getElementById("searchInput");
const bodyReload = document.getElementsByTagName("body");
let currentID = null;
getID.value = 1;
//
// add & save btn
updateBtn.addEventListener("click", updateFood);
function updateFood() {

  let idFood = getID.value;
  let nameFood = getName.value;
  let costFood = getCost.value;

  const checkID = menuFood.some((idList)=>{
    return idList.idFood === idFood;
  });
  
  if (checkID) {
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

  if (!checkID && nameFood) {
    if (currentID === null) {
      menuFood.push({
        idFood: idFood,
        nameFood: nameFood,
        costFood: costFood,
      });
    } else {
      let index = currentID;
      menuFood.splice(index, 0, {
        idFood,
        nameFood,
        costFood,
      });
      currentID = null;
      updateBtn.innerHTML = "Add";
    }
    localStorage.setItem("menuFood", JSON.stringify(menuFood));
    renderList();

    getName.value = "";
    getCost.value = "";
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
        <td >ID</td>
        <td >NAME</td>
        <td >COST</td>
        <td >SELECT</td>
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
  const indexFind = menuFood.find((food)=>{
    return food.idFood === id.toString();
  });
  const foodIndex = menuFood.indexOf(indexFind);
  menuFood.splice(foodIndex, 1);
  getID.value = indexFind["idFood"];
  getName.value = indexFind["nameFood"];
  getCost.value = indexFind["costFood"];
  getID.style.pointerEvents = "none";
  updateBtn.innerHTML = "Save";
  currentID = foodIndex;
}

//delete item by id
const deleteFood = (id) => {
  const indexFind = menuFood.findIndex((food) => food.idFood === id.toString());
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
//
//Sort
foodSort.addEventListener("change", sortBySelect);
function sortBySelect() {
  const selectValue = document.getElementById("foodSort").value;
  switch(selectValue){
    //sort by ID
    case "option1": menuFood.sort((item1, item2) => {
      return item1.idFood - item2.idFood;
    });
    renderList();
    break;
    //sort by Name
    case "option2": menuFood.sort((item1, item2) => {
      if (item1.nameFood < item2.nameFood) {
        return -1;
      }
    });
    renderList();
    break;
    //sort by Cost
    case "option3": menuFood.sort((item1, item2) => {
      return item1.costFood - item2.costFood;
    });
    renderList();
    break;
  }
}

//Find by field
searchInput.addEventListener("keyup", searchFood);
function searchFood() {
  let findNamebtn = document.getElementById("findByName").checked;
  let convertValue = searchInput.value.toLocaleLowerCase();
  if (!searchInput.value) {
    window.location.reload();
    //Phan nay a muon khi xoa noi dung cua o input thi se tu render data ra ngoai
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
