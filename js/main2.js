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


