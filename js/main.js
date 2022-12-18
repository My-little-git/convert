const url = "https://www.cbr-xml-daily.ru/daily_json.js",
      cardsWrapper = document.querySelector('.currency__cards'),
      currenciesValues = {}

fetch(url)
  .then((response) => response.json())
  .then((currencies) => {
    currenciesValues = currencies.Valute
    handleCurrencies(currencies.Valute)
  });

function handleCurrencies(currencies){
  for (var [key, value] of Object.entries(currencies)){
    renderCurrencyCard(value)
  }
}

function renderCurrencyCard(currency){
  const html = `
    <div class="col">
      <div class="card text-bg-light mb-3">
        <div class="card-header d-flex align-items-center justify-content-between">
          <div class="currency__name d-inline">${currency["Name"]}</div>
          <div class="currency__code badge bg-secondary">${currency["CharCode"]}</div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${currency["Value"]}</h5>
        </div>
      </div>
    </div>
  `;

  cardsWrapper.insertAdjacentHTML('beforeend', html)
}

// Converter

const fromInput = document.querySelector('#fromInput'),
      toInput = document.querySelector('#toInput')

fromInput.addEventListener('input', () => {

})

const selectorButton = document.querySelector(
    ".select-input-field__selected-value"
  ),
      selectorWrapper = document.querySelector(
    ".select-input-field__selector-container"
  )

selectorButton.addEventListener('click', () => {
  if (selectorWrapper.classList.contains('d-none'))
    selectorWrapper.classList.remove('d-none')
  else
    selectorWrapper.classList.add('d-none')
})

window.addEventListener('click', e => {
  const target = e.target
  console.log(!target.closest('.select-input-field__selector-container'))
  console.log(!target.closest(".select-input-field__selected-value"));
  if (
    !target.closest(".select-input-field__selector-container") &&
    !target.closest(".select-input-field__selected-value") &&
    !selectorButton.classList.contains('d-none')
  ) {
    selectorWrapper.classList.add("d-none");
  }
})