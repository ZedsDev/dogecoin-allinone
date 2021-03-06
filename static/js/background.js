const Background = {

  /**
   * Change badge text and color on Chrome icon
   * @param text
   * @param color
   */
  changeBadge: function (text, color) {
    chrome.browserAction.setBadgeText({
      text: text
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color: color
    })
  },

  /**
   * Call Kraken API and show the ticker price in the badge with the right background color
   */
  getTickerPrice: function () {
    App.getTicker((response) => {
      let res, price;

      if (response.readyState === XMLHttpRequest.DONE) {
        if (response.status === 200) {
          res = JSON.parse(response.responseText)['result']['XDG' + Config.user.currency];
          price = res['c'][0];

          let color = Options.badgeColorGreen
          if (price < res['o']) {
            color = Options.badgeColorRed
          }

          this.changeBadge(App.priceFormatter(price, 2, 4, false), color);
        }
      }
    });
  },

  /**
   * Init and start the interval
   */
  init: function () {
    App.updateConfig();
    this.getTickerPrice();

    window.setInterval(() => {
      App.updateConfig();
      this.getTickerPrice();
    }, Options.badgeRefreshInterval);
  }

};

Background.init();