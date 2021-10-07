String.prototype.router = async function(params) {

  var a = params;

  var cookie = a ? a.cookie : null;
  if(cookie) {
    if(localStorage) {
      var json = JSON.parse(cookie);
      var key = Object.keys(json)[0];
      var val = Object.values(json)[0];
      var get = localStorage.getItem(key);

      if(get) {
        localStorage.removeItem(key);
        //console.log(9,{json,key,val});
      }

      var data = localStorage[cookie];
    }
  }

  //Process URL Logic
  var uri = this.toString();
  var path = uri ? uri : a.href;
  var toURL = new URL(path,location.origin);
  path = toURL.pathname + toURL.search + toURL.hash;
  //self === top ? null : alert(path);
  window.paths = rout.e(path);
  var GOT = paths.GOT;
  var root = GOT[0];
  var tabs = await rout.ed.vars(rout.ed.dir(path));
  //console.log(3,{a,params,toURL,tabs},this,this.toString());

  //console.log(123,tabs);
  var goto = rout.ed.url(tabs);
  var route = paths = rout.e(goto);
  document.body.dataset.path = route.path;
  document.body.dataset.page = page = route.page;
  window.GET = paths.GOT;

  var pop = a ? a.pop : null;

  var active = document.querySelectorAll('.body-header .active');
  $(document.querySelectorAll('.body-header .active')).removeClass('active');

  await rout.ed.bang(route);

  //console.log(route);

  return new Promise(async function (resolve, reject) {

    if(route) {

      //console.log('truly', {route, mvc, GET});
      
      mvc.v(route).then(async(s) => {

          route.root = getRoot($('pages[data-root]'));

          var state = s ? s : route;
          var path = state.path;
          var page = state.page;
          var m = window.location.origin;
          var url = new URL(state.path, m === "null" ? "https://localhost" : m);
          var search = url.search;
          var path = url.pathname.replace(/\/?$/, "/");
          var pages =  dom.body.find('pages[data-root="'+route.root+'"]');
          var page = dom.body.find('page[data-page="'+route.page+'"]');
          var vp = page ? page : pages;
          var fet = dom.body.all('[data-html]:empty');

          if(fet.length > 0) {
            //alert(ch);
            var ch = 0; do {
              var el = fet[ch];
              if(el) {
                var get = el.dataset.html;
                var html = await ajax(get);
                el.innerHTML = html;
              }
            ch++; } while(ch < fet.length);
          }

          if(vp) {
            if(vp.find('[data-masonry]') && window.imagesLoaded && window.Masonry) {
              var i = 0; do {
                var mason = vp.all('[data-masonry]')[i];
                imagesLoaded(mason, function() {
                  var msnry = new Masonry(mason,mason.dataset && mason.dataset.masonry ? JSON.parse(mason.dataset.masonry) : null);
                });
              i++; } while(i < vp.all('[data-masonry]').length);
            }
            var fet = vp.all('[data-fetch]:empty');
            if(fet.length > 0) {//alert(fet.length);
              var ch = 0; do {
                var el = fet[ch];
                if(el) {
                  var get = el.dataset.fetch;
                  var html = await ajax(get);
                  el.innerHTML = html;
                  var srcs = el.all('[data-src]');
                  lazyLoad(srcs);
                }
              ch++; } while(ch < fet.length);
            }

            window.colors ? colorPicker(vp,{color:paths.GOT[2]}) : null;

            var srcs = vp.all('[data-src]');
            lazyLoad(srcs,vp);
            //console.log(135,{vp,srcs});
          }

          document.body.classList.contains("loading") ? document.body.classList.remove("loading") : null;

          rout.es.push(paths.path);
          if(!pop) {
            if(!["blob:"].includes(window.location.protocol)) {
              var link = paths.path;
              link = goto.split('?')[0].split('#')[0];
              history.pushState(goto,'',goto);
            }
          }

          //console.log(313,state,paths);
          //$(document.body.querySelectorAll('page.active')).removeClass("active"); alert(state.path + " - " + paths.page);

          if(uri) {
            var search = uri.split("?").length > 1 ? uri.split("?")[1].split("#")[0] : null;
            var hash = uri.split("?").length > 1 ? uri.split('#')[1] : null;
            search ? search = document.body.dataset.search = "?"+search : document.body.removeAttribute("data-search");
            hash ? hash = document.body.dataset.hash = "#"+hash: document.body.removeAttribute("data-hash");
          }

          got = paths.GOT = tabs;
          paths = rout.e(rout.ed.url(got));
          window.GET = paths.GOT;
          resolve(paths);
        })
        .catch((e) => {
          console.log(404, e);
          reject(e);
        });

    } else {
      reject({ code: 400 });
    }
  });
};
window.rout = {};
window.rout.e = (state,w) => {
  var win = w ? window : window; //console.log({GOT,state});
  var GOT = rout.ed.dir(state.split('#')[0].split('?')[0], 2);
  var n = 0,
    arr1 = [],
    arr2 = rout.ed.dir(state.split('#')[0].split('?')[0]);
  var root = GOT[0];

  if (GOT.length > 0) {
    if(win.pages) {
      var isRoot = win.pages ? win.pages.hasOwnProperty(root) : null;
      if(isRoot) {
        var pgs = pages[root];
        var len = arr2.length;
        if(len <= pgs.length) {
          var index = len - 1;
          var pg = pgs[index];
          arr1 = rout.ed.dir(pg);
        }
      }
    } else {
      do {
        var m = GOT[n];
        var bool = win.rout.ing(state, GOT, n);
        arr1[n] = bool ? "*" : m;
        n++;
      } while (n < GOT.length);
    }
  }
  var page = rout.ed.url(arr1);
  var path = rout.ed.url(arr2);
  var search = state.split('?').length > 1 ? state.split('?')[1].split('#')[0] : null;
  var rh = state.split("?")[0].split("/");
  var hr = state.split("?")[0].split("/");
  if(state.includes("?")) {
    method = hr[hr.length-1];
  } else {
    method = null;
  }
  path = hr.join("/").replace(/\/?(\?|#|$)/, '/$1').split('#')[0];
  //var path = hr.substring(0, hr.lastIndexOf("/") + 1)
  var data = {
    GOT: rout.ed.dir(path),
    hash: state.split('#').length > 1 ? state.split('#')[1] : null,
    method,
    page: page.split('/').join('/'),
    path,
    path,
    root,
    search,
    state
  };
  return data;
};
window.rout.ed = {
  bang: route => {
    return new Promise(async(resolve,reject) => {

      //Variables
      route.root = getRoot($('pages[data-root]'));
      var pages =  dom.body.find('pages[data-root="'+route.root+'"]');
      var page = dom.body.find('page[data-page="'+route.page+'"]');
      var vp = page ? page : pages;
      //console.log({route,vp});

      if(vp) {

        var wt = vp.tagName.toLowerCase();

        //View Route
        route.root ? document.body.dataset.root = route.root : document.body.removeAttribute('data-root');
        if(vp.closest('main')) {
          $('[data-root]').removeClass('active');
          $('[data-page]').removeClass("active");
        }

        vp.closest('main') ? dom.body.removeAttribute('data-ppp') : dom.body.setAttribute('data-ppp',paths.page);
        vp.innerHTML === "" ? vp.innerHTML = await ajax(vp.dataset.fetch) : null;
        $(vp).addClass('active');
        vp.dataset.path = paths.path+"?"+paths.search;

        var fet = vp.all('[data-fetch]:empty');
        if(fet.length > 0) {
          var ch = 0; do {
            var el = fet[ch];
            if(el) {
              var get = el.dataset.fetch;
              var html = await ajax(get);
              el.innerHTML = html;
              var srcs = el.all('[data-src]');
              lazyLoad(srcs);
            }
          ch++; } while(ch < fet.length);
        }
      }

      lazyLoad(dom.body.all('[data-src]'));

      $('[data-page="'+route.page+'"]').addClass("active");
      $(':not([data-page="'+route.page+'"])').removeClass("active");
      $('[data-root="'+route.root+'"]').addClass("active");
      var rs = $('[data-root]');
      if(rs.length > 0) { var i = 0; do {
        route.page.includes(rs[i].dataset.root) ? rs[i].classList.add('active') : null;
      i++; } while(i < rs.length); }

      resolve(route);

    });
  },
  dir: (url, num, g = []) => {
    if(url) {
      var split = url.split("/");
      split.forEach((a, i) => {
        i < split.length - 0 ? g[i] = a : null;
      });
      g[0] === "" ? g.shift() : null;
      g[g.length - 1] === "" ? g.pop() : null;
    }
    return g;
  },
  url: (dir) => {
    if(dir.length > 0) {
      var end = dir[dir.length-1];
      href = dir.length === 0 ? "/" : "/" + dir.join("/") + (end.includes("?") ? "" : "/");
    }
    else {
      href = "/";
    }
    return href;
  },
  vars: async function(tabs) {
    var d = 0, e = 0; do {
      var dir = tabs[d];
      if(dir && dir.length > 0) {
        if(dir.charAt(0) === "*") {
          dir = GOT[d];
        }
        if(dir.charAt(0) === ":") {
          dir = dir.substring(1);
          if(!isNaN(dir)) {
            var drc = rout.ed.dir(dom.body.dataset.path);
            console.log({dir, is: d >= parseInt(dir), drcd: drc[d]});
            if(drc[e-1] && d >= parseInt(dir)) {
              //alert('dir'+dir);
              e === 0 && d > 0 ? e = d + 1 : e;
              dir = drc[e];
              //d = d  1;
              e++;
            } else {
              dir = null;
              tabs.splice(d,1);
              d = tabs.length;//alert(1);
            }
          }
          if(dir === "app") {
            var name = generateName();
            var domain = name.toLowerCase().replace("-","").replace(" ","");
            dir = domain;
          }
          if(dir === "app") {
            var name = generateName();
            var domain = name.toLowerCase().replace("-","").replace(" ","");
            dir = domain;
          }
          if(dir === "color") {
            dir = colors.random();
          }
          if(dir === "domain") {
            if(window.GET && window.GET[d]) {
              dir = GET[d]; //alert(1);
            } else {
              dir = crypt.uid.create(1);
            }
          }
          if(dir === "get") {
              var drc = rout.ed.dir(dom.body.dataset.path);
              if(drc[d]) {
              dir = drc[d]; //alert(drc[d]);
              }else {
              dir = null;
              tabs.splice(d,1);
              d = tabs.length;//alert(1);
            }
          }
          if(is.json(decodeURI(dir))) {
            var str = decodeURI(dir);
            var json = JSON.parse(decodeURI(str));
            var drc = rout.ed.dir(dom.body.dataset.path);
            dir = drc[d]; //alert(1);
          }
          if(dir === "id") {
            var get = window.GET ? GET : rout.ed.dir(window.location.pathname);
            var domain = get[d];
            //alert(domain);
            var isApp = domain ? await is.app(domain) : false;
            var isNum = !isNaN(domain);

            console.log({isApp,isNum});
            if(domain) {
              dir = get[d];
              dir = Crypto.uid.create(1);
            } else {
              dir = Crypto.uid.create(1);
            }
          }
          if(dir === "iframe") {
            //alert(dir);
            dir = null;
          }
          if(dir === "last") {
            var get = window.GET ? GET : rout.ed.dir(window.location.pathname);
            var pagi = get[get.length-1];
            var i = get[d];
            var int = parseInt(pagi)-1; //alert('last:'+int);
            dir = int < 1 ? 'coochie' : int;
          }
          if(dir === "next") {
            var get = window.GET ? GET : rout.ed.dir(window.location.pathname);
            var pagi = get[get.length-1];
            var int = get[d];
            var dir = int === "%E2%88%9E" ? 1 : parseInt(int)+1;
          }
          if(dir === "path") {
            if(dom.body.dataset.path) {
              var drc = rout.ed.dir(dom.body.dataset.path);
              //alert(drc.length);
              if(drc.length > 1) {

              } else {
                dir = drc.join("/");
              }
            }
            d = tabs.length;
          }
          if(dir === "uid") {
            dir = crypt.uid.create(1);
          }
        }
        if(dir) {
          tabs[d] = dir.toString().split(":")[0];
        } else {
          tabs[d] = null;
        }
      }
    d++; } while(d < tabs.length);
    tabs = tabs.filter(function (el) { return el != null; });
    //console.log({tabs});
    return tabs;
  }
};
window.rout.ing = (href, GOT, n) => {
  return false;
};
window.rout.es = [];
window.rout.er = page => {
  return dom.body.find('page[data-page="'+(page ? page : dom.body.dataset.page)+'"]')
};