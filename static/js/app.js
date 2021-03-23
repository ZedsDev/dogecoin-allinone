const App = {

  /**
   * Get user configuration or default one
   */
  updateConfig: function () {
    for (const k in Config.default) {
      Config.user[k] = localStorage[k] || Config.default[k];
    }
  },

  /**
   * Format price by using user configuration
   * @param price
   * @param minimumFractionDigits
   * @param maximumFractionDigits
   * @param currency
   * @returns String
   */
  priceFormatter: function (price, minimumFractionDigits = 2, maximumFractionDigits = 2, currency = true) {
    let options = {
      currency: Config.user.currency,

      minimumFractionDigits: minimumFractionDigits,
      maximumFractionDigits: maximumFractionDigits
    };
    if(currency) {
      options.style = 'currency';
    }

    const formatter = new Intl.NumberFormat(Currency[Config.user.currency].locale, options);
    return formatter.format(price);
  },

  /**
   * Get ticker by using user configuration
   * @param callback
   */
  getTicker: function (callback) {
    const xhr = new XMLHttpRequest(),
      url = 'https://api.kraken.com/0/public/Ticker?pair=XDG' + Config.user.currency;

    xhr.onreadystatechange = function (event) {
      if (typeof callback === 'function') {
        callback(this);
      }
    };

    xhr.open('GET', url, true);
    xhr.send(null);
  },

  getAddressInfo: function (address, callback) {
    const xhr = new XMLHttpRequest(),
      url = 'https://dogechain.info/api/v1/address/balance/' + address;

    xhr.onreadystatechange = function (event) {
      if (typeof callback === 'function') {
        callback(this);
      }
    };

    xhr.open('GET', url, true);
    xhr.send(null);
  }

};