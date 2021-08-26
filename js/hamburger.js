
var showing = false;

function onClickHamburger() {

    if(showing) {

        hideMenu();
    }
    else {

        showMenu();
    }

    showing = !showing;
}

function hideMenu() {

    $("#main-navigation").removeClass("menu-show");
    $("#hamburger-menu-cover").removeClass("menu-show");
    $("#hamburger img").attr("src", "/images/icons/hamburger.svg");
}

function showMenu() {

    $("#main-navigation").addClass("menu-show");
    $("#hamburger-menu-cover").addClass("menu-show");
    $("#hamburger img").attr("src", "/images/icons/close.svg");
}
