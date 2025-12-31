self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("quiz-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/sign-up.html",
        "/section.html",
        "/maths.html",
        "/physics.html",
        "/technology.html",
        "/sign-up.css",
        "/section.css",
        "/maths.css",
        "/physics.css",
        "/technology.css",
        "/style.css",
        "/sign-up.js",
        "/section.js",
        "/maths.js",
        "/physics.js",
        "/technology.js",
        "/image/logo-final192.png",
        "/image/logo-final512.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((resp) => {
      return resp || fetch(e.request);
    })
  );
});
