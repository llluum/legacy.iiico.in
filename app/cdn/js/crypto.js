window.Crypto = crypt = cx = {
  uid: {
    create: x => {
      if (window.crypto || window.msCrypto) {
        var array = new Uint32Array(x);
        window.crypto.getRandomValues(array);
        return array;
      } else {
        throw new Error("Your browser can't generate secure random numbers");
      }
    }
  }
};