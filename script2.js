let entryList = [];
let badList = [];

const handleOnSubmit = (e) => {
  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = +formDt.get("hr");

  const obj = { task, hr };

  entryList.push(obj);
  display(entryList);
};

const display = (arr) => {
  str = "";
  arr.map((item, i) => {
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
  totalHours();
};

const badListDisplay = (arg) => {
  str = "";
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
  totalBadHours();
};

//delete item from list
const handleOnDeleteEntryList = (i) => {
  if (!confirm("Are you sure?")) return;
  const filteredArg = entryList.filter((item, index) => index !== i);
  entryList = filteredArg;
  display(entryList);
};

const handleOnDeleteBadList = (i) => {
  if (!confirm("Are you sure?")) return;
  const filteredArg = badList.filter((item, index) => index !== i);
  badList = filteredArg;
  badListDisplay(badList);
};

const swtchToBadList = (i) => {
  const itemToBeSwitched = entryList.splice(i, 1);

  badList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
};

const swtchToEntryList = (i) => {
  const itemToBeSwitched = badList.splice(i, 1);

  entryList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
};

const totalHours = () => {
  const ttlEntrylist = entryList.reduce((acc, item) => acc + item.hr, 0);

  const ttlBadlist = badList.reduce((acc, item) => acc + item.hr, 0);

  const ttlHrs = ttlEntrylist + ttlBadlist;

  document.getElementById("totalHours").innerText = ttlHrs;
  return;
};

const totalBadHours = () => {
  const ttlBadlist = badList.reduce((acc, item) => acc + item.hr, 0);

  document.getElementById("badTtlHrs").innerText = ttlBadlist;
};
