function switchTab(tab) {
    $('.tab').addClass('tab--hidden');
    $('.tab[data-tab="' + tab + '"]').removeClass('tab--hidden');
}

// ON INIT
$(function () {
    // Tabs events
    $('.js--tab-switcher').on('click', function (e) {
        $('.tab--selected').removeClass('tab--selected');
        $(this).addClass('tab--selected');
        switchTab($(this).data('goto'));
    });
});