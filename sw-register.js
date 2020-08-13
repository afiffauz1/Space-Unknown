if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./sw.js")
        .then(function () {
            console.log("Service worker berhasil")
        })
        .catch(function () {
            console.log("service worker gagal")
        });
} else {
    console.log("service worker belum didukung oleh browser");
}