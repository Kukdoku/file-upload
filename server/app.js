console.log("hi");
//[2, 4, 3, 5, 1, "b", "d", "a", "c", "e"];
let arr = [2, "b", 4, "d", 3, "a", "c", "e", 5, 1];

let arr1 = [];
let arr2 = [];

arr.map((i) => {
  if (typeof i == "number") {
    arr1.push(i);
  } else {
    arr2.push(i);
  }
});


arr1.sort(function (a, b) {
  return a-b;
});
arr2.sort()
console.log([...arr1,...arr2])


