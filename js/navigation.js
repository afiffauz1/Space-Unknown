document.addEventListener("DOMContentLoaded", function () {
    const navbarElement = document.querySelectorAll(".sidenav");
    M.Sidenav.init(navbarElement);
    loadNavBar();

    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    function loadNavBar() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                document.querySelectorAll(".topnav , .sidenav").forEach(element => {
                    element.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".topnav a , .sidenav a").forEach(element => {
                    element.addEventListener("click", function () {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    })
                });
            }
        }

        xhttp.open("GET", "./components/navigation.html", true);
        xhttp.send();
    }

    function loadPage(page) {
        const xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                const content = document.querySelector(".row");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 400) {
                    content.innerHTML = `<h2 class="center">Halaman tidak ditemukan</h2>`
                } else {
                    content.innerHTML = `<h2 className="center">Oops.. halaman tidak dapat diakses</h2>`
                }
            }

            document.querySelectorAll(".row a").forEach(elemen => {
                elemen.addEventListener("click", function (event) {
                    const getHref = event.target.getAttribute("href").substr(1);
                    loadDetail(getHref)
                })
            })
        }

        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();

    }

    function loadDetail(href) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                const content = document.querySelector(".row");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 400) {
                    content.innerHTML = `<h2 class="center">Halaman tidak ditemukan</h2>`
                } else {
                    content.innerHTML = `<h2 className="center">Oops.. halaman tidak dapat diakses</h2>`
                }
            }
        }

        xhttp.open("GET", `detail/${href}.html`, true);
        xhttp.send();
    }

})