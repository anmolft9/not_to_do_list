// let entryList = [{ task: "tv tv tv", hr: 40 }]; //empty array to hold the obj,, here puttin some default value for convinience
let entryList = []; //empty array to hold the obj,
let badList = []; //empty array to hold the obj,
const handleOnSubmit = (e) => {
  const formDt = new FormData(e); ///object for manipulation
  const task = formDt.get("task"); //assigning the task
  const hr = formDt.get("hr"); //assigning the hours

  const obj = { task, hr }; ///creating the object
  entryList.push(obj); ///object pushed into array entryList

  display(entryList);

  //   console.log(task, hr);
};
//display entry list on the dom
const display = (taskArg) => {
  let str = "";

  taskArg.map((item, i) => {
    str += `<tr>
  <td>
  ${item.task}
  </td>
  <td>${item.hr}</td>
  <td class="text-end">
    <button onclick="handleOnDeleteEntryList(${i})" class="btn btn-danger">
      <i class="fa-solid fa-trash-can"></i>
    </button>
    <button onclick="swtchToBadList(${i})" class="btn btn-success">
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  </td>
</tr>
`;
  });
  document.getElementById("entryList").innerHTML = str;
};

//display bad list on the dom

const badListDisplay = (arg) => {
  let str = "";

  arg.map((item, i) => {
    str += `<tr>
<td>
${item.task}
</td>
<td>${item.hr}</td>
<td class="text-end">
  <button onclick="handleOnDeleteBadList(${i})" class="btn btn-danger">
    <i class="fa-solid fa-trash-can"></i>
  </button>
  <button onclick="swtchToEntryList(${i})" class="btn btn-success">
    <i class="fa-solid fa-arrow-left"></i>
  </button>
</td>
</tr>
`;
  });
  document.getElementById("badList").innerHTML = str;
};

///delete item from the Entry list
const handleOnDeleteEntryList = (i) => {
  if (!confirm("Are you sure?")) return;
  const filteredArg = entryList.filter((item, index) => index !== i);
  entryList = filteredArg;
  display(entryList); //have to display from the bad list display
};

///delete item from the Bad list
const handleOnDeleteBadList = (i) => {
  if (!confirm("Are you sure?")) return;
  const filteredArg = badList.filter((item, index) => index !== i);
  badList = filteredArg;

  badListDisplay(badList); //have to display from the bad list display
};

//switch items from entry list to bad list
const swtchToBadList = (i) => {
  const itemToBeSwitched = entryList.splice(i, 1);
  badList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
};

//switch items from bad list to entry list
const swtchToEntryList = (i) => {
  const itemToBeSwitched = badList.splice(i, 1);
  entryList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
};
