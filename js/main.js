
// Load currencies

let rates = []

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
    console.log(rates)
    rates.push(RUB)
    sortCurrencies()
    handleCurrencies()
  });


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



const cardsWrapper = document.querySelector('.currency__cards')

let page = 1


  
function handleCurrencies(){
  const correctedCurrencies = rates.filter(currency => currency.CharCode !== activeCurrencyCharCode)

  renderCurrencyCards(correctedCurrencies)
  renderSelectorList(correctedCurrencies)
  setActiveCurrency(activeCurrencyCharCode)
}

function renderCurrencyCards(currencies){
  let n = 0;
  cardsWrapper.innerHTML = ''
  currencies.forEach((currency, index) => {
    if (page * 10 <= index){
      return
    }
    let html = `
      <div class="col">
        <div class="card text-bg-dark h-100">
          <div class="card-body d-flex flex-column h-100">
            <h5 class="card-title fw-normal">${currency['CharCode']}</h5>
            <h6 class="card-subtitle mb-3 text-muted fw-normal">${currency['Name']}</h6>
            <h2 class="text-end fw-normal mt-auto">${(currency['Value'] / currency['Nominal']).toFixed(2)}</h2>
          </div>
        </div>
      </div>
    `
    cardsWrapper.insertAdjacentHTML('beforeend', html)
    n++
  })
}

// Converter

const fromInput = document.querySelector('#fromInput'),
      toInput = document.querySelector('#toInput')

fromInput.addEventListener('input', () => {

})

const selectorActiveButton = document.getElementById('active-selected-value'),
      selectorActiveWrapper = document.getElementById('active-selector-container'),
      selectorSecondaryButton = document.getElementById('secondary-selected-value'),
      selectorSecondaryWrapper = document.getElementById('secondary-selector-container')



selectorActiveButton.addEventListener('click', () => {
  if (selectorActiveWrapper.classList.contains('d-none')){
    selectorActiveWrapper.classList.remove('d-none')
    selectorSecondaryWrapper.classList.add('d-none')
  } else
    selectorActiveWrapper.classList.add('d-none')
})

selectorSecondaryButton.addEventListener('click', () => {
  if (selectorSecondaryWrapper.classList.contains('d-none')){
    selectorSecondaryWrapper.classList.remove('d-none')
    selectorActiveWrapper.classList.add('d-none')
  } else
    selectorSecondaryWrapper.classList.add('d-none')
})

window.addEventListener('click', e => {
  const target = e.target

  if (
    !target.closest(".select-input-field__selector-container") &&
    !target.closest(".select-input-field__selected-value")
  ) {
    selectorActiveWrapper.classList.add("d-none");
    selectorSecondaryWrapper.classList.add("d-none");
  }
})

// Rescacheal button animation

const rescachualButton = document.querySelector('.converter__rescachual')

rescachualButton.addEventListener('click', () => {
  rescachualButton.classList.add('rotate-animation')
})
rescachualButton.addEventListener('animationend', () => {
  rescachualButton.classList.remove('rotate-animation')
})

// More
const moreButton = document.getElementById('more')

moreButton.addEventListener('click', () => {
  page++
  handleCurrencies(rates)
  if (page * 10 > rates.length){
    moreButton.style.display = 'none'
  }
})

// Selector list

const selectorList = document.querySelector('.select-input-field__selector-list')

function renderSelectorList(currencies) {
  selectorList.innerHTML = ''

  currencies.forEach(currency => {
    let html = `
      <div class="select-input-field__selector-item" data-currency="${currency.CharCode}">
        <span class="select-input-field__selector-code">${currency.CharCode}</span>
        ${currency.Name}
      </div>
    `
    selectorList.insertAdjacentHTML('beforeend', html)
  })
}

// Search by selector list

const inputSearchCurrency = document.getElementById('search-currency')

inputSearchCurrency.addEventListener('input', () => {
  let value = inputSearchCurrency.value
  let reg = value.toUpperCase()

  currentRates = rates.filter((rate) => rate.Name.toUpperCase().includes(reg) || rate.CharCode.includes(reg) && rate.CharCode !== activeCurrencyCharCode)

  console.log(currentRates)
  renderSelectorList(currentRates)
})

// Select active currency

let activeCurrencyCharCode = 'RUB'
const activeCurrencySpan = document.getElementById('activeCurrencyCharCode'),
      activeCurrencyTitle = document.getElementById('activeCurrencyName')

selectorList.addEventListener('click', (e) => {
  let target = e.target

  activeCurrencyCharCode = target.closest('.select-input-field__selector-item').dataset.currency

  setActiveCurrency(activeCurrencyCharCode)
  handleCurrencies()
  inputSearchCurrency.value = ''
})


function setActiveCurrency(CharCode){
  const activeCurrency = rates.find(currency => currency.CharCode === CharCode)

  console.log(rates[0].CharCode)

  activeCurrencySpan.textContent = activeCurrency.CharCode
  activeCurrencyTitle.textContent = activeCurrency.Name


  selectorActiveWrapper.insertAdjacentHTML('afterbegin', `
    <div class="select-input-field__selector-item" data-value="${activeCurrency.CharCode}" id="activeCurrency">
      <span class="select-input-field__selector-code">${activeCurrency.CharCode}</span>
      ${activeCurrency.Name}
    </div>
  `)
}





// Select secondary currency

let secondaryCurrencyCharCode = 'USD'
const secondaryCurrencySpan = document.getElementById('secondaryCurrencyCharCode'),
      secondaryCurrencyTitle = document.getElementById('secondaryCurrencyName')

function setSecondaryCurrency(CharCode){
  const secondaryCurrency = rates.find(currency => currency.CharCode === CharCode)

  secondaryCurrencySpan.textContent = secondaryCurrency.CharCode
  secondaryCurrencyTitle.textContent = secondaryCurrency.Name

  selectorActiveWrapper.insertAdjacentHTML('afterbegin', `
    <div class="select-input-field__selector-item" data-value="${secondaryCurrency.CharCode}" id="activeCurrency">
      <span class="select-input-field__selector-code">${secondaryCurrency.CharCode}</span>
      ${secondaryCurrency.Name}
    </div>
  `)
}

// Set active curr
