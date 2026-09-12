const CACHE_NAME = "atendeia-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./manifest.json"
];


self.addEventListener("install", function(event){

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(function(cache){

            return cache.addAll(ARQUIVOS);

        })

    );

    self.skipWaiting();

});


self.addEventListener("activate", function(event){

    event.waitUntil(

        caches.keys()
        .then(function(chaves){

            return Promise.all(

                chaves
                .filter(function(chave){

                    return chave !== CACHE_NAME;

                })
                .map(function(chave){

                    return caches.delete(chave);

                })

            );

        })

    );

    self.clients.claim();

});


self.addEventListener("fetch", function(event){

    if(event.request.method !== "GET"){

        return;

    }


    event.respondWith(

        caches.match(event.request)
        .then(function(resposta){

            if(resposta){

                return resposta;

            }


            return fetch(event.request);

        })

    );

});
