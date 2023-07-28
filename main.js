let isChanged = false;

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
const checkBox = document.querySelector('.header__checkBox');
const resetBtn = document.querySelector('.header__resetBtn');
const saveBtn = document.querySelector('.header__saveBtn');

window.addEventListener('beforeunload', event => {
  if (isChanged) {
    event.preventDefault();
    event.returnValue =
      '저장 되지않은 리스트가 있습니다. 정말로 떠나시겠습니까?';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const itemString = localStorage.getItem('itemsData');
  // onLoadItem(itemArray);
  const itemArray = JSON.parse(itemString);
  onLoadItem(itemArray);
});

saveBtn.addEventListener('click', () => {
  const itemArray = items.querySelectorAll('.item');
  const dataArray = [];

  itemArray.forEach(item => {
    const name = item.querySelector('.item__left__name').textContent;
    const count = item.querySelector('.item__middle__count').textContent;
    const itemInfo = {
      name: name,
      count: count,
    };
    dataArray.push(itemInfo);
  });

  const dataJSON = JSON.stringify(dataArray);
  localStorage.setItem('itemsData', dataJSON);
  isChanged = false;
});

checkBox.addEventListener('change', event => {
  const itemArray = items.querySelectorAll('.item__left__checkBox');
  for (const checkBox of itemArray) {
    checkBox.checked = event.target.checked;
  }
});

resetBtn.addEventListener('click', () => {
  const itemArray = items.querySelectorAll('.item__row');
  for (const item of itemArray) {
    const itemCheckBox = item.querySelector('.item__left__checkBox');
    const itemStatus = itemCheckBox.checked;
    if (itemStatus) {
      items.removeChild(item);
    }
  }
  checkBox.checked = false;
  isChanged = true;
});

addBtn.addEventListener('click', () => {
  if (!input.value) {
    input.focus();
    return;
  }
  const itemArray = items.querySelectorAll('.item__left__name');

  for (const itemName of itemArray) {
    if (itemName.textContent === input.value) {
      onAddCount(itemName);
      return;
    }
  }
  onAddNewItem();
  isChanged = true;
});

input.addEventListener('keydown', event => {
  if (!input.value) {
    input.focus();
    return;
  }

  if (event.key === 'Enter') {
    const itemArray = items.querySelectorAll('.item__left__name');

    for (const itemName of itemArray) {
      if (itemName.textContent === input.value) {
        onAddCount(itemName);
        input.value = '';
        return;
      }
    }
    onAddNewItem();
    input.value = '';
  }
  isChanged = true;
  console.log(isChanged);
});

function onAddNewItem() {
  const text = input.value;
  const item = createItem(text);
  items.appendChild(item);
  console.log(isChanged);
  item.scrollIntoView({ behavior: 'smooth' });
  input.value = '';
  input.focus();
}

function createItem(text, count = 1) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const itemLeft = document.createElement('div');
  itemLeft.setAttribute('class', 'item__left');
  const itemCheckbox = document.createElement('input');
  itemCheckbox.setAttribute('type', 'checkbox');
  itemCheckbox.setAttribute('class', 'item__left__checkBox');

  const itemName = document.createElement('span');
  itemName.setAttribute('class', 'item__left__name');
  itemName.innerText = text;

  itemLeft.appendChild(itemCheckbox);
  itemLeft.appendChild(itemName);

  const itemMiddle = document.createElement('div');
  itemMiddle.setAttribute('class', 'item__middle');
  const plusBtn = document.createElement('button');
  plusBtn.setAttribute('class', 'item__middle__plusBtn');
  plusBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';

  plusBtn.addEventListener('click', () => {
    let countValue = Number(countElement.textContent) + 1;
    countElement.innerText = countValue;
    isChanged = true;
    console.log(isChanged);
  });

  const countElement = document.createElement('span');
  countElement.setAttribute('class', 'item__middle__count');
  countElement.innerText = `${count}`;
  const minusBtn = document.createElement('button');
  minusBtn.setAttribute('class', 'item__middle__minusBtn');
  minusBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
  minusBtn.addEventListener('click', () => {
    let countValue = Number(countElement.textContent) - 1;
    if (countValue <= 0) {
      items.removeChild(itemRow);
      return;
    }
    countElement.innerText = countValue;
    isChanged = true;
    console.log(isChanged);
  });

  itemMiddle.appendChild(plusBtn);
  itemMiddle.appendChild(countElement);
  itemMiddle.appendChild(minusBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'item__right__deleteBtn');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  deleteBtn.addEventListener('click', () => {
    items.removeChild(itemRow);
  });

  item.appendChild(itemLeft);
  item.appendChild(itemMiddle);
  item.appendChild(deleteBtn);

  itemRow.appendChild(item);
  return itemRow;
}

function onAddCount(itemName) {
  const item = itemName.parentNode.parentNode;
  const count = item.querySelector('.item__middle__count');
  let countValue = count.textContent;
  count.innerText = Number(countValue) + 1;
  input.value = '';
}

function onLoadItem(itemArray) {
  itemArray.forEach(item => {
    const { name, count } = item;
    const itemValue = createItem(name, count);
    items.appendChild(itemValue);
  });
}
