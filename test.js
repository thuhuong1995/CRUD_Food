// function foodHandler(getList) {
//   console.log(getList);
// }
// let newList = getList.map(foodHandler);

// let newArray = [1, 2, 3, [4, 5, 6], 7, 8, 9, [10, 11, 12]];

// let flatArray = newArray.reduce(function (flatOutput, item) {
//   return flatOutput.concat(item);
// }, []);

// console.log(flatArray);

// let foods = [
//   {
//     title: "Hotfood",
//     menuFood: [
//       {
//         hotFood: "Hot 1",
//         coldFood: "Cold1",
//       },
//       {
//         hotFood: "Hot 2",
//         coldFood: "Cold1",
//       },
//     ],
//   },
//   {
//     title: "HotDrink",
//     menuFood: [
//       {
//         hotDrink: "Hot 3",
//         coldDrink: "Cold1",
//       },
//       {
//         hotDrink: "Hot 4",
//         coldDrink: "Cold1",
//       },
//     ],
//   },
// ];

// let Menu = foods.reduce((list, item) => {
//   return list.concat(item.menuFood);
// }, []);
// console.log(Menu);
//\
//
//
// let listSortByName = getList.reduce((outputList, field) => {
//   return outputList.concat(field.nameFood);
// }, []);
// console.log(listSortByName, "list sort by name");
// function sortName() {
//   listSortByName.sort();
//   console.log(listSortByName);
// }
// sortName();

// users.sort(function (a, b) {
//   return a.firstname.localeCompare(b.firstname);
// });
