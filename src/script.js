
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw-cache-and-fetch.js')
    .then((regist) => {
        console.log('ServiceWorker registration success');
        console.log(regist);
    })
    .catch((err) => {
        console.log('ServiceWorker registration failed');
        console.log(err);
    });
}
