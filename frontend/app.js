(function () {
  var SESSION_KEY = "acme.session";
  function cartKey(id) {
    return "acme.cart." + id;
  }

  var storedSession = null;
  var storedCart = null;
  try {
    storedSession = localStorage.getItem(SESSION_KEY);
    if (storedSession) {
      var parsed = JSON.parse(storedSession);
      if (parsed && parsed.id != null) {
        storedCart = localStorage.getItem(cartKey(parsed.id));
      }
    }
  } catch (e) {}

  var app = Elm.Main.init({
    node: document.getElementById("app"),
    flags: { session: storedSession, cart: storedCart },
  });

  app.ports.storeSession.subscribe(function (value) {
    try {
      if (value === null) {
        localStorage.removeItem(SESSION_KEY);
      } else {
        localStorage.setItem(SESSION_KEY, value);
      }
    } catch (e) {}
  });

  app.ports.storeCart.subscribe(function (data) {
    try {
      var key = cartKey(data.userId);
      if (data.cart === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, data.cart);
      }
    } catch (e) {}
  });

  app.ports.requestCart.subscribe(function (userId) {
    var value = null;
    try {
      value = localStorage.getItem(cartKey(userId));
    } catch (e) {}
    app.ports.receiveCart.send(value);
  });
})();
