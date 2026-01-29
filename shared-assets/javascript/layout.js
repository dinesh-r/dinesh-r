(function () {
    const path = window.location.pathname.toLowerCase();
    const parts = path.split('/');

    const states = ["co", "tx"];

    if (states.includes(parts[1])) {
        localStorage.setItem("state", parts[1]);
    }
})();
document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    let state = params.get("state");

    //  From localStorage (legal pages)
    if (!state) {
        state = localStorage.getItem("state");
    }

    //  From URL path (/co/page.html)
    if (!state) {
        state = window.location.pathname.split('/')[1];
    }

    //  Default fallback
    if (!state) state = "co";

    console.log("STATE =", state);

    const headerPath = `/component/header-${state}.html`;
    const footerPath = `/component/footer-${state}.html`;

    fetch(headerPath)
        .then(res => res.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
            initHeaderLogic();
            document.body.classList.add("loaded");
        });

    fetch(footerPath)
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });
});
