function getCookie(cookieName) {
    let value = null;
    document.cookie.split(";").forEach((e) => {
      if (e.includes(cookieName)) {
        value = e.split("=")[1];
      }
    });
    return value;
  }


  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }