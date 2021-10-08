window.mvc.m = () => {

};

window.mvc.v = function(route) {
  return new Promise(async function (resolve, reject) {

    //console.log(3,{route});
    var path = route.path;
    var get = route ? route.GOT : rout.ed.dir(dom.body.dataset.path);
    var root = get[0];
    GET = window.GET ? GET : rout.ed.dir(dom.body.dataset.path);

    if(root) {

      if(root === "config") {
        resolve(route);
      }

      if(root === "earn") {
        resolve(route);
      }

      if(root === "mine") {
        resolve(route);
      }

    } else {
        resolve(route);
    }

  });
};

window.mvc.c = () => {

};