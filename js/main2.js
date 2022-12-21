// Load currencies

let rates = [],
    page = 1,
    activeCharCode = "RUB",
    secondaryCharCode = "USD",
    activeCurrency = {},
    secondaryCurrency = {}

const RUB = {
  CharCode: "RUB",
  Name: "Российский рубль",
  Nominal: 1,
  Value: 1
}

fetch("https://www.cbr-xml-daily.ru/daily_json.js")
  .then((response) => response.json())
  .then((currencies) => {
    for (let [key, value] of Object.entries(currencies.Valute)){
      rates.push(value)
    }
    rates.push(RUB)
    sortCurrencies()
    handleCurrencies()
  });


// More
const moreButton = document.getElementById("more");

moreButton.addEventListener("click", () => {
  page++;
  handleCurrencies(rates);
  if (page * 10 > rates.length) {
    moreButton.style.display = "none";
  }
});

// Rescacheal button animation

const rescachualButton = document.querySelector(".converter__rescachual");

rescachualButton.addEventListener("click", () => {
  rescachualButton.classList.add("rotate-animation");
});
rescachualButton.addEventListener("animationend", () => {
  rescachualButton.classList.remove("rotate-animation");
});

// Search by selector list

const inputsSearchCurrency = document.querySelectorAll("search-currency");

inputsSearchCurrency.forEach(input => {
  input.addEventListener("input", () => {
  let value = input.value;
  let reg = value.toUpperCase();

  currentRates = rates.filter(
    (rate) =>
      rate.Name.toUpperCase().includes(reg) ||
      (rate.CharCode.includes(reg) && rate.CharCode !== activeCurrencyCharCode)
  );

  console.log(currentRates);
  renderSelectorList(currentRates);
});
})

// Converter

fromInput.addEventListener("input", () => {
  let value = (
    fromInput.value /
    (activeCurrency.Nominal / activeCurrency.Value) /
    (secondaryCurrency.Value / secondaryCurrency.Nominal)
  ).toFixed(2);
  toInput.value = value;
});

// Show selector list

const selectorButtons = document.querySelectorAll(".select-input-field__selected-value")
const selectorWrappers = document.querySelectorAll(".select-input-field__selector-container")

selectorButtons.forEach( button => {
  button.addEventListener("click", () => {
    wrapper = button.nextSibling.nextSibling
    
    if (wrapper.classList.contains("d-none")) {
      hideSelectorWrappers()
      wrapper.classList.remove("d-none");
    } else wrapper.classList.add("d-none");
    
  })
})

window.addEventListener("click", (e) => {
  const target = e.target;

  if (
    !target.closest(".select-input-field__selector-container") &&
    !target.closest(".select-input-field__selected-value")
  ) {
    hideSelectorWrappers()
  }
});

// Set currencies

// function setActiveCurrency(CharCode) {
//   activeCurrency = rates.find(
//     (currency) => currency.CharCode === CharCode
//   );

//   activeCurrencySpan.textContent = activeCurrency.CharCode;
//   activeCurrencyTitle.textContent = activeCurrency.Name;

//   selectorActiveWrapper.insertAdjacentHTML(
//     "afterbegin",
//     `
//     <div class="select-input-field__selector-item" data-value="${activeCurrency.CharCode}" id="activeCurrency">
//       <span class="select-input-field__selector-code">${activeCurrency.CharCode}</span>
//       ${activeCurrency.Name}
//     </div>
//   `
//   );
// }

function setCurrencies(){
  
}



// Functions

function handleCurrencies(){
  const correctedCurrencies = filterCorrectCurrencies()

  renderCurrencyCards(correctedCurrencies)
  renderSelectorList(correctedCurrencies)
  setActiveCurrency(activeCharCode)
}

function filterCorrectCurrencies(){
  return rates.filter(currency => currency.CharCode !== activeCharCode && currency.CharCode !== secondaryCharCode)
}

function sortCurrencies(){
  rates = rates.sort((a, b) => {
    if (a.Name > b.Name){
      return 1;
    }
    if (a.Name < b.Name){
      return -1;
    }
    return 0;
  })
}

function renderCurrencyCards(currencies) {
  let n = 0;
  cardsWrapper.innerHTML = "";
  currencies.forEach((currency, index) => {
    if (page * 10 <= index) {
      return;
    }
    let html = `
      <div class="col">
        <div class="card text-bg-dark h-100">
          <div class="card-body d-flex flex-column h-100">
            <h5 class="card-title fw-normal">${currency.CharCode}</h5>
            <h6 class="card-subtitle mb-3 text-muted fw-normal">${
              currency.Name
            }</h6>
            <h2 class="text-end fw-normal mt-auto">${calcPriceForOne(
              currency.CharCode
            )}</h2>
          </div>
        </div>
      </div>
    `;
    cardsWrapper.insertAdjacentHTML("beforeend", html);
    n++;
  });
}

function renderSelectorList(currencies, selectorList) {
  selectorList.innerHTML = "";

  currencies.forEach((currency) => {
    let html = `
      <div class="select-input-field__selector-item" data-currency="${currency.CharCode}">
        <span class="select-input-field__selector-code">${currency.CharCode}</span>
        ${currency.Name}
      </div>
    `;
    selectorList.insertAdjacentHTML("beforeend", html);
  });
}

function hideSelectorWrappers(){
  selectorWrappers.forEach(wrapper => wrapper.classList.add("d-none"))
}

function calcPriceForOne(CharCode) {
  const currency = rates.find((currency) => currency.CharCode === CharCode);
  const price = (
    currency.Value /
    currency.Nominal /
    (activeCurrency.Value / activeCurrency.Nominal)
  ).toFixed(2);
  return price;
}