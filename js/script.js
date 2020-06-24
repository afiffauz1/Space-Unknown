const menuToggle = document.querySelector(".menu-toggle input");
const nav = document.querySelector("nav ul");
const btnKonversi = document.querySelector("#konversi");

btnKonversi.addEventListener("click", function () {
    const nilaiAwal = document.querySelector("#nilai-awal").value;
    const display = document.querySelector(".display");
    let hasil = 0;
    if (!Number(nilaiAwal)) {
        display.innerHTML = `
            <h3>
                <strong>Error: </strong>
                Tolong masukkan data berupa angka
            </h3>
        `
    } else {
        display.innerHTML = `
            <h3>
                ${hasil = nilaiAwal * 9422760000000} Kilometer
            </h3>
        `
    }

})

menuToggle.addEventListener("click", function () {
    nav.classList.toggle("slide");
})