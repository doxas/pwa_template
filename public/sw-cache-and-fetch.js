
// event.waitUntil は状態が完了になるのを待つ
// わかりやすく言えば Promise の完了を待っている
// これは正常に処理が完了したことを契機に処理が実行されるようにするため

self.addEventListener('install', (eve) => {
    // install 後、すぐに activation を行う場合 skipWaiting を呼ぶ
    self.skipWaiting();
    eve.waitUntil(
        // v1 という名前のキャッシュを設定する
        caches.open('v1')
        .then((cache) => {
            return cache.addAll([
                './image/doxas.png'
            ]);
        })
    );
});

self.addEventListener('activate', (eve) => {
    // active になっても実際には次にページが表示されたときにならないと
    // SW がページをコントロール開始しないが claim でそれを即座に開始する
    eve.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (eve) => {
    // respondWith によってブラウザの規定の fetch をフックする
    eve.respondWith(
        // 該当するキャッシュがあるか調べる
        caches.match(eve.request)
        .then((response) => {
            console.log('in respondwith...');
            console.log(response);
            // キャッシュがあればそれを返しなければ従来と同じ挙動になるよう fetch を返す
            return response ? response : fetch(eve.request);
        })
    );
});

