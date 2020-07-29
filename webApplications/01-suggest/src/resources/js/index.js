const DELAY = 250;
let REQUEST_NUMBER = 0;

async function updateSuggest() {
  const localNumber = REQUEST_NUMBER++;
  await clearSuggest();
  const text = document.getElementById('search').value;
  if (text === '') {
    return;
  }
  const response = await fetch(
    `https://autocomplete.travelpayouts.com/places2?term=${text}&locale=ru&types[]=airport`
  );
  if (response.ok) {
    const cities = await response.json();
    setTimeout(() => {
      if (localNumber === REQUEST_NUMBER - 1) {
        let id = 0;
        cities.slice(0, Math.min(cities.length, 9)).forEach(city => {
          document
            .getElementsByClassName('search__input')[0]
            .appendChild(createSuggest(city.city_name, city.code, id++));
        });
      }
    }, DELAY);
  }
}

function createSuggest(city, code, id) {
  const element = document.createElement('button');
  element.type = 'button';
  element.className = 'search__suggest search__element_height';
  element.textContent = `${city} ${code}`;
  element.id = id;
  element.onclick = () => {
    changeInput(element);
    REQUEST_NUMBER += 1;
  };
  element.onkeydown = context => {
    const idElement = Number(context.srcElement.id);
    const elements = document.getElementsByClassName('search__suggest');
    switch (context.key) {
      case 'ArrowDown':
        if (idElement < elements.length - 1) {
          elements.item(idElement + 1).focus();
        }
        break;
      case 'ArrowUp':
        if (idElement > 0) {
          elements.item(idElement - 1).focus();
        }
        break;
      case 'Enter':
        window.location.href = `https://yandex.ru/search/?lr=2&text=${
          elements.item(idElement).textContent
        }`;
        break;
    }
  };

  return element;
}

function changeInput(element) {
  document.getElementById('search').value = element.innerText;
  document.getElementById('search').oninput(null);
}

function clearSuggest() {
  const elements = document.getElementsByClassName('search__suggest');
  const length = elements.length;
  for (let i = 0; i < length; i++) {
    elements.item(0).remove();
  }
}

function searchYandex() {
  const text = document.getElementById('search').value;
  if (text.length > 0) {
    window.location.href = `https://yandex.ru/search/?lr=2&text=${text}`;
  }
}
