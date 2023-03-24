let entryList = [];
let badList = [];

const weeklyHours = 24 * 7;

const handleOnSubmit = (e) => {
  const formDt = new FormData(e);

  const task = formDt.get("task");
  const hr = +formDt.get("hr");

  let obj = { task, hr };

  const ttl = totalHours();

  if (ttl + hr > weeklyHours) {
    return alert("You cannot add more hours");
  }

  entryList.push(obj);
  display(entryList);
  totalHours();
};

const display = (obj) => {
  let str = "";

  obj.map((item, i) => {
    str += `<tr>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-center">
    <button onClick="handleOnDeleteEntryList(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash-can"></i></button>
    <button onClick="switchToBadList(${i})" class="btn btn-success"> <i class="fa-solid fa-arrow-right"></i></button>
    </td>
    </tr>
    `;
  });
  document.getElementById("entryList").innerHTML = str;
};
const badListDisplay = (obj) => {
  let str = "";

  obj.map((item, i) => {
    str += `<tr>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-center">
    <button onClick="handleOnDeleteBadList(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash-can"></i></button>
    <button onClick="switchToEntryList(${i})" class="btn btn-success"> <i class="fa-solid fa-arrow-left"></i></button>
    </td>
    </tr>
    `;
  });
  document.getElementById("badList").innerHTML = str;
  totalBadHours();
};

const handleOnDeleteEntryList = (i) => {
  const filteredEntryList = entryList.filter((item, index) => index !== i);
  entryList = filteredEntryList;
  display(entryList);
};

const handleOnDeleteBadList = (i) => {
  const filteredBadList = badList.filter((item, index) => index !== i);
  badList = filteredBadList;
  badListDisplay(badList);
};

const switchToEntryList = (i) => {
  const itemToBeSwitched = badList.splice(i, 1);

  entryList.push(itemToBeSwitched[0]);

  display(entryList);
  badListDisplay(badList);
};
const switchToBadList = (i) => {
  const itemToBeSwitched = entryList.splice(i, 1);

  badList.push(itemToBeSwitched[0]);

  display(entryList);

  badListDisplay(badList);
};

const totalHours = () => {
  const entryHours = entryList.reduce((acc, item) => acc + item.hr, 0);
  const badHours = badList.reduce((acc, item) => acc + item.hr, 0);

  const total = entryHours + badHours;

  document.getElementById("totalHours").innerText = total;
  return total;
};

const totalBadHours = () => {
  const badHours = badList.reduce((acc, item) => acc + item.hr, 0);

  document.getElementById("badTotalHours").innerText = badHours;
  return;
};
