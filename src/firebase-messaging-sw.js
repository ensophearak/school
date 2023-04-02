importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  projectId: "espr-news",
  appId: "1:1012580389192:web:5d42acd82e3790d3a2a37d",
  databaseURL: "https://espr-news.firebaseio.com",
  storageBucket: "espr-news.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyDrCepDYawH59NN7fWeB5AzOqEaBPASxcU",
  authDomain: "espr-news.firebaseapp.com",
  messagingSenderId: "1012580389192",
  measurementId: "G-FXL7FJTRML",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async function (payload) {
  // self?.addEventListener('push', function (e) {
  //   const { data } = payload;
  //   const notificationTitle = data.title;
  //   const notificationOptions = {
  //     body: data.body,
  //     icon: data.icon,
  //   };
  //   e.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions)) 
  // })
  const { data } = payload;
  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body,
    icon: data.icon,
  };
  self.registration.showNotification(notificationTitle, notificationOptions)
});
