const Options = {
  availableWallets: 2,

  // Badge
  badgeRefreshInterval: 300000, // 5 min
  badgeColorGreen: '#388E3C',
  badgeColorRed: '#D32F2F'
};

let Config = {
  user: {},
  default: {
    "currency": "USD",
    "wallets": '{}'
  }
};

const Currency = {
  'USD': {
    "locale": "en-US"
  },
  'EUR': {
    "locale": "fr-FR"
  }
};