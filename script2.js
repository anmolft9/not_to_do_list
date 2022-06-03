let entryList = [];
let badList = [];

const handleOnSubmit = (e) => {
  const formdDt = new FormData(e);
  const task = formdDt.get("task");
  const hr = formdDt.get("hr");

  //   console.log(task);
  //   console.log(hr);

  const obj = { task, hr };

  entryList.push(obj);

  display(entryList);
};

const display = (list) => {
  let str = "";
  list.map((item, i) => {
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
      </tr>`;
    console.log(i);
  });
  //   console.log(i);
  console.log(
    "============================================================================="
  );
  document.getElementById("entryList").innerHTML = str;
};

const handleOnDeleteEntryList = (i) => {
  const filteredEntryList = entryList.filter((item, index) => index !== i);
  entryList = filteredEntryList;
  console.log(entryList);
  display(entryList);
};
