fetch("https://www.cbr-xml-daily.ru/daily_json.js")
  .then((response) => response.json())
  .then((currencies) => {
    for (let [key, value] of Object.entries(currencies.Valute)) {
      rates.push(value);
    }
    rates.push(RUB);
    sortCurrencies();
    handleCurrencies();
  });