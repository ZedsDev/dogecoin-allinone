let rate = 1;

const PopupPage = {

  /**
   * Get wallets informations
   */
  getWalletsInfos: function () {
    const wallets = JSON.parse(Config.user.wallets),
      walletsSize = Object.keys(wallets).length,
      walletsListContainer = $('.js--wallets-container');

    // Reset list
    walletsListContainer.html('');

    // Append templates
    let tpl, walletValue, walletCurrency;
    for (let i = 1; i <= walletsSize; i++) {
      tpl = $('.js--wallet-tpl').html().replace(new RegExp("{{id}}", 'g'), i).replace('{{col}}', '6');
      walletsListContainer.append(tpl);

      // Call API asynchronously
      App.getAddressInfo(wallets[i].address, function (response) {
        if (response.readyState === XMLHttpRequest.DONE) {
          if (response.status === 200) {
            const json = JSON.parse(response.responseText);

            $('.js--wallet-' + i + '-name').html(wallets[i].name);

            if (json['error'] !== undefined) {
              walletValue = 'ERROR';
              walletCurrency = 'ERROR';
            } else {
              walletValue = json['balance'];
              walletCurrency = walletValue * rate;
            }
            $('.js--wallet-' + i + '-value').html(walletValue);
            $('.js--wallet-' + i + '-currency').html(App.priceFormatter(walletCurrency + ""));
          }
        }
      });
    }

    // if 0 wallet
    if (walletsSize === 0) {
      $('.no-wallet-info').removeClass('d-none');
    }
  },

  /**
   * Get Dogecoin prices
   */
  getTickerPrices: function () {
    const percentHtml = $('.js--percentage');

    App.getTicker((response) => {
      if (response.readyState === XMLHttpRequest.DONE) {
        if (response.status === 200) {
          const res = JSON.parse(response.responseText)['result']['XDG' + Config.user.currency],
            price = rate = res['c'][0],
            opening = res['o'],
            high = res['h'][1],
            low = res['l'][1],
            perf = ((price - opening) / opening) * 100;
          const perfPrefix = (perf > 0) ? "+" : '';

          $('.js--ticker-price').html(App.priceFormatter(price, 2, 10));
          $('.js--ticker-opening').html(App.priceFormatter(opening, 2, 10));
          $('.js--ticker-high').html(App.priceFormatter(high, 2, 10));
          $('.js--ticker-low').html(App.priceFormatter(low, 2, 10));
          percentHtml.html(perfPrefix + parseFloat(perf).toFixed(2) + "%");

          if (perf > 0) {
            percentHtml.addClass('ticker__percentage--green').removeClass('ticker__percentage--red');
          } else {
            percentHtml.addClass('ticker__percentage--red').removeClass('ticker__percentage--green');
          }

          this.getWalletsInfos();
        }
      }
    });
  },

  /**
   * Init the popup
   */
  init: function () {
    App.updateConfig();
    this.getTickerPrices();

    // Open settings
    $('.js--open-settings').on('click', function () {
      if (chrome.runtime.openOptionsPage) {
        // New way to open options pages, if supported (Chrome 42+).
        chrome.runtime.openOptionsPage();
      } else {
        // Reasonable fallback.
        window.open(chrome.runtime.getURL('options/options.html'));
      }
    });

    // Open manifest.json
    $('.js--open-manifest').on('click', function () {
      window.open(chrome.runtime.getURL('manifest.json'));
    });
  }

};

PopupPage.init();