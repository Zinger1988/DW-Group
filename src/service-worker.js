const CACHE_NAME = "image-cache-v3"; // Назва кешу

// Подія встановлення Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker встановлено");
});

// Подія активації Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

const IMAGES_TO_CACHE = [
  "/assets/img/public/logo.svg",
  "/assets/img/public/logo-small.svg",
];

// Подія встановлення Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(IMAGES_TO_CACHE);
    })
  );
});

// Обробка fetch-запитів
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (
    event.request.url.endsWith("logo.svg") ||
    event.request.url.endsWith("logo-small.svg")
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Повертаємо кеш, якщо є
        if (cachedResponse) {
          return cachedResponse;
        }
        // Якщо немає в кеші, завантажуємо з мережі
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }

  if (request.destination === "style" || request.destination === "font") {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});
