const OptionsPage = {

    /**
     * Init the general form
     */
    initFormGeneral: function () {
        // General
        const currency = localStorage['currency'] || Config.default.currency;
        $('#currency').find('option[value="' + currency + '"]').prop('selected', true);

        // Forms event
        $('.js--general-form').on('submit', function (e) {
            localStorage.setItem('currency', $("#currency").find("option:selected").val());
            return false;
        });
    },

    /**
     * Init the wallets form
     */
    initFormWallets: function () {
        // Wallets
        const wallets = localStorage['wallets'] || '{}',
            tplHtml = $('.js--wallet-tpl').html(),
            walletFormContainer = $('.js--wallets-form-container');
        const parsedWallets = JSON.parse(wallets);
        let tpl;

        for (let i = 1; i <= Options.availableWallets; i++) {
            tpl = tplHtml.replace(new RegExp("{{id}}", 'g'), i);
            walletFormContainer.append(tpl);

            if (parsedWallets[i]) {
                $('#wallet-' + i + '-name').val(parsedWallets[i].name);
                $('#wallet-' + i + '-address').val(parsedWallets[i].address);
            }
        }

        // Form event
        $('.js--wallets-form').on('submit', function (e) {
            let formWallets = {}, name, address;

            for (let i = 1; i <= Options.availableWallets; i++) {
                name = $('#wallet-' + i + '-name').val();
                address = $('#wallet-' + i + '-address').val();

                if (address !== '') {
                    formWallets[i] = {
                        name: (name === "") ? 'Wallet' : name,
                        address: address
                    };
                }
            }
            localStorage.setItem('wallets', JSON.stringify(formWallets));
            return false;
        });
    },

    /**
     * Init
     */
    init: function () {
        this.initFormGeneral();
        this.initFormWallets();
    }

};

OptionsPage.init();