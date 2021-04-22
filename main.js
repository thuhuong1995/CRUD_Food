const form = document.forms["formFood"];
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
// Declare
const updateBtn = document.getElementById("btn-update");
const foodSortSelect = document.getElementById("foodSortSelect");
const deleteBtn = document.getElementById("delete-btn");

const idInput = document.getElementById("foodID");
const nameInput = document.getElementById("foodName");
const costInput = document.getElementById("foodCost");

const findNamebtn = document.getElementById("findByName");
const searchInput = document.getElementById("searchInput");
let medialID = null;
// add & save btn
updateBtn.addEventListener("click", submitFood);
function submitFood() {
  let idFood = idInput.value;
  let nameFood = nameInput.value;
  let costFood = costInput.value;
  const checkIDExist = menuFood.some((item) => item.idFood === idFood);

  if (!idFood) {
    document.getElementById("id-messages").innerHTML =
      "Please enter ID food!!!";
  } else if (isNaN(idFood)) {
    document.getElementById("id-messages").innerHTML = "ID must is a Number";
    return;
  } else if (checkIDExist) {
    document.getElementById("id-messages").innerHTML =
      "ID is exist, please check !!!";
  } else {
    document.getElementById("id-messages").innerHTML = "";
  }
  if (!nameFood) {
    document.getElementById("name-messages").innerHTML =
      "Please enter name food";
    nameFood = "";
  } else {
    document.getElementById("name-messages").innerHTML = "";
  }
  if (idFood && !checkIDExist && nameFood) {
    if (!medialID) {
      menuFood.push({
        idFood: idFood,
        nameFood: nameFood,
        costFood: costFood,
      });
    } else {
      menuFood.splice(medialID, 0, {
        idFood,
        nameFood,
        costFood,
      });
      medialID = null;
      updateBtn.innerHTML = "Add";
    }
    localStorage.setItem("menuFood", JSON.stringify(menuFood));
    renderList();
    idInput.value = "";
    nameInput.value = "";
    costInput.value = "";
  }
}
let menuFood = localStorage.getItem("menuFood")
  ? JSON.parse(localStorage.getItem("menuFood"))
  : [];
//render list
window.addEventListener = ("load", renderList());
function renderList(listFood) {
  listFood = `
    <tr>
        <td>ID</td>
        <td>NAME</td>
        <td>COST</td>
        <td>SELECT</td>
    </tr>
    `;
  menuFood.forEach((food, index) => {
    listFood += `
      <tr>
          <td>${food.idFood}</td>
          <td> ${food.nameFood}</td>
          <td> ${food.costFood}</td>
          <td><a href='#' onclick="editID(${food.idFood})">Edit</a> 
          | <a href='#' onclick="deleteFood(${food.idFood})">Delete</a></td>
      </tr>
      `;
  });

  document.getElementById("list-food").innerHTML = listFood;
}

// fill data to edit
const editID = (id) => {
  const indexFind = menuFood.findIndex((food) => food.idFood === id.toString());

  idInput.value = menuFood[indexFind]["idFood"];
  nameInput.value = menuFood[indexFind]["nameFood"];
  costInput.value = menuFood[indexFind]["costFood"];
  idInput.style.pointerEvents = "none";
  updateBtn.innerHTML = "Save";
  menuFood.splice(indexFind, 1);
  // a cho cai nay de khi edit n se bo ID di
  // Neu khong co cai nay thi th ID n se k vuot qua dc validate
  medialID = indexFind;
  // cai nay de luu index da lay dc cho th save voi add dung
};

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
foodSortSelect.addEventListener("change", sortBySelect);
function sortBySelect() {
  const selectValue = document.getElementById("foodSortSelect").value;
  switch (selectValue) {
    //sort by Name
    case "sortByName":
      menuFood.sort((item1, item2) => {
        if (item1.nameFood < item2.nameFood) {
          return -1;
        }
      });
      renderList();
      break;
    //sort by Cost
    case "sortByCost":
      menuFood.sort((item1, item2) => item1.costFood - item2.costFood);
      renderList();
      break;
    // default is sort by ID
    default:
      menuFood.sort((item1, item2) => item1.idFood - item2.idFood);
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
    menuFood = menuFood.filter((listFind) =>
      listFind.nameFood.toLocaleLowerCase().includes(convertValue)
    );
    renderList(menuFood);
  } else {
    menuFood = menuFood.filter((listFind) =>
      listFind.costFood.toLocaleLowerCase().includes(convertValue)
    );
    renderList(menuFood);
  }
}
