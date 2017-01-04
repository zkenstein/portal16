module.exports = (function () {
    if (document.compatMode == 'CSS1Compat') {
        var tabsFixedContainer = document.getElementById('tabsFixedContainer');
        var navbarHeight = 0; //TODO should build stylus variables to js
        if (tabsFixedContainer) {
            navbarHeight = 46;
        }
        var submenuWrapper = document.getElementById('submenuWrapper');
        var submenu = document.getElementById('submenu');

        if (submenuWrapper && submenu) {
            var submenuHeight = submenu.scrollHeight;
            window.addEventListener('scroll', positionSubmenu);
            window.addEventListener('resize', positionSubmenu);
        }
    }

    function positionSubmenu() {
        var submenuWrapper = document.getElementById('submenuWrapper');
        var submenu = document.getElementById('submenu');
        var subMenuWrapperPosition = submenuWrapper.getBoundingClientRect();
        //var submenuPosition = submenu.getBoundingClientRect();

        if (subMenuWrapperPosition.bottom - submenuHeight < navbarHeight) {
            submenu.classList.add('submenu--bottom');
            submenu.classList.remove('submenu--fixed');
        } else if (subMenuWrapperPosition.top > navbarHeight) {
            submenu.classList.remove('submenu--fixed');
            submenu.classList.remove('submenu--bottom');
        } else if (subMenuWrapperPosition.top < navbarHeight) {
            submenu.classList.add('submenu--fixed');
            submenu.classList.remove('submenu--bottom');
        }
    }
})();

module.exports = (function () {
    if (document.compatMode == 'CSS1Compat') {
        var navbarHeight = 0; //TODO should build stylus variables to js navbar + tabbar height
        var tabsFixedContainer = document.getElementById('tabsFixedContainer');
        var tabsScrollable = document.getElementById('tabsScrollable');


        if (tabsFixedContainer && tabsScrollable) {
            window.addEventListener('scroll', positionTabsBar);
            window.addEventListener('resize', positionTabsBar);
        }
    }

    function positionTabsBar() {
        tabsFixedContainer = document.getElementById('tabsFixedContainer');
        tabsScrollable = document.getElementById('tabsScrollable');
        var tabsScrollablePosition = tabsScrollable.getBoundingClientRect();
        if (tabsScrollablePosition.top < navbarHeight) {
            tabsFixedContainer.classList.add('is-visible');
        } else {
            tabsFixedContainer.classList.remove('is-visible');
        }
    }
})();