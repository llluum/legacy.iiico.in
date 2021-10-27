window.on = {}

window.on.contextmenu = () => {

}

window.on.touch = {
    start: (event,type) => {
      var target = event.target;
      spriii.llips.isnt(target);
      if(1>0) {
        console.log('on.touch.start',type);
      }
      var el = target.closest('#building-blocks');
      if(el) {
        //console.log('touchstart.block',{element,box},box.clientWidth);
      }
    },
    move: (event,type) => {
      if(1>0) {
        console.log('on.touch.move',type);
      }
      var target = event.target;
      var el = target.closest('#building-blocks');
      if(el && type === "drag") {

        var box = target.closest('box');
        var element = box.cloneNode(true);
        element.style.position = "fixed";
        box.parentNode.previousElementSibling ? null : el.insertAdjacentHTML('beforebegin',element.outerHTML);
        element = el.previousElementSibling;
        element.style.height = box.clientHeight+"px";
        element.style.width = box.clientWidth+"px";
        element.dataset.zIndex = 10;
        var tagName = box.find('text').placeholder;
        var index = 1;

        element.style.left = left = (event.changedTouches[0].clientX - element.clientWidth/2)+"px";
        element.style.top = head = (event.changedTouches[0].clientY - element.clientHeight/2)+"px";

        box.classList.add('dragging');

        var element = el.previousElementSibling;
        var x = event.changedTouches[0].clientX - element.clientWidth/2;
        var y = event.changedTouches[0].clientY - element.clientHeight/2;
        element.style.left = left = x+"px";
        element.style.top = head = y+"px";
        element.classList.add('opacity-50pc');

        var win = byId('editor').contentWindow;
        var behind = win.document.elementFromPoint(x,y);
        var box = target.closest('#building-blocks > box');
        var tagName = box.find('text').dataset.before;
        var shell = box.hasAttribute('data-shell');
        var blocks = behind ? behind.closest('blocks') : null;
        var block = blocks ? behind.closest('blocks > :not(ghost)') : null; //|| behind.closest('body > .body-header') || behind.closest('body > .body-nav')  || behind.closest('body > .body-section')  || behind.closest('body > .body-footer');
        var ghost = win.byId('ghost');
        ghost ? ghost.remove() : null;
        //console.log('tagName',{blocks,tagName});

        if(shell) {
          if(["header", "navigation", "section", "footer"].includes(tagName)) {
            console.log("shell: "+tagName);
          }
        }
        else {
          if(block) {
            var os = offset(block);
            var up = true;
            if(up) {
              var spacer = document.createElement('ghost');
              spacer.id = "ghost";
              spacer.dataset.width = "100%";
              spacer.dataset.height = "50px";
              spacer.className = 'border-5px-dashed';
              var index = 1;
              var tagName = "header";
              ghost ? ghost.remove() : null;
              //console.log('touchmove.block',{block},{x,y},os);
              block ? block.insertAdjacentHTML('beforebegin',spacer.outerHTML) : null;
            }
          }
        }
      }
    },
    end: (event,type) => {
      var target = event.target;
      var el = target.closest('#building-blocks');
      if(el && type === "drag") {
        var win = byId('editor').contentWindow;
        var element = el.previousElementSibling;
        if(element) {
          element.classList.add('dragging');
          element.remove();

          var tagName = element.find('text').getAttribute('placeholder');
          var box = target.closest('box');
          var shell = box.hasAttribute('data-shell');
          var html = box.find('template').innerHTML;
          console.log('touch.end',{shell,tagName,html});

          var ghost = win.document.body.find('ghost');
          if(ghost) {
            var innerHTML = element.find('template').innerHTML;
            ghost.insertAdjacentHTML('beforebegin',innerHTML);
            ghost.previousElementSibling.classList.add('active');
            ghost.remove();
          }
        }
      }
      if(1<0) {
        console.log('on.touch.end');
      }
    }
};
window.on['touch']["dbltap"] = async(event) =>  {
  console.log("dbltap",{iframe:self===top},event.type);
  var target = event.target;
  var elem = target.closest('[data-dbltap]');
  if(elem) {
  }
},
window.on['touch']["drag"] = async(e,el) =>  {

    var target = e.target;

    var el = touch.local.drag.elem;
    var x = touch.local.drag.currentX;
    var y = touch.local.drag.currentY;
    //console.log('touch.drag', e, {x, y}, [el]);

    if(el) {
        setTranslate(x, y, el);
    }

    document.body.dataset.touch = "drag";

},
window.on['touch']["swipe"] = {
  start: () => {
    console.log(34,"touch.swipe.start");
  },
  drag: () => {
    console.log(37,"touch.swipe.drag");
  },
  end: () => {
    console.log(40,"touch.swipe.drop");
  }
},
window.on['touch']["press"] = async(event) =>  {

    var target = event.target;
    var body = target.closest('body');
    var className = target.className;
    var classList = target.classList;  

},

window.spriii = {

  llips: {

    is: target => {

      var elem = target;
      var type = elem.dataset.spriii;
      if(type === "llipsis") {
        var llipsis = elem.children;
        var l = 0; do {
          var lps = llipsis[l];
          lps.dataset.width = "30px";
          lps.dataset.height = "30px";
          var span = lps.firstElementChild;
          span ? span.classList.remove('hide') : null;
          lps.dataset.background = "transparent";
        l++; } while(l < llipsis.length);
      }

    },

    isnt: target => {
      el = document.body.all('[data-spriii]')
      if(el.length > 0) {
        var m = 0; do {
          var elem = el[m];
          var type = elem.dataset.spriii;
          if(type === "llipsis") {
            var llipsis = elem.children;
            var l = 0; do {
              if(elem !== target.closest('[data-spriii]')) {
                var lps = llipsis[l];
                lps.dataset.width = "10px";
                lps.dataset.height = "10px";
                var span = lps.firstElementChild;
                span ? span.classList.add('hide') : null;
                lps.removeAttribute('data-background');
              }
            l++; } while(l < llipsis.length);
          }
        m++; } while(m < el.length);
      }
    }

  }

};

window.on['touch']["tap"] = async(event) => {
    //console.log("tap",{iframe:self===top},event.type);
    var el, target = event.target; //console.log('tap',{event,target});

    //RESET
    $('.jiggle').removeClass('jiggle');

    //EVENTS
    el = target.closest("[id]");
    if(el) {
        var id = el.id;
        if(id.split('-')[0] === "miner") {
            var power = el.find('ico n');
            if(power.classList.contains('off')) {
                var stars = byId('stars');
                var starred = stars.all('.starred');
                var task = Crypto.uid.create(1)[0];
                var uid = Crypto.uid.create(starred.length+2);
                var u = 0, arr = []; do {
                    var num = uid[u];
                    var str = num.toString();
                    var sum = num % 9 || 9;
                    arr[u] = sum;
                    console.log(task,{num,sum});
                u++; } while(u < uid.length);
                arr = parseInt(arr.join(""));
                console.log(task,{arr});
                byId('calculation').textContent = arr;
                apiendpoint = 1>0 ? "http://api.onyx.tld" : "https://api.onyx.sbs";
                ajax(apiendpoint+'/v1/cmd/ping/').then((a,b) => {
                  console.log({a,b});
                });
                ajax(apiendpoint+'/v1/points/create/').then((a,b) => {
                  console.log({a,b});
                });
            }
            if(power.classList.contains('on')) {
                var stars = byId('stars');
                var starred = stars.all('.starred');
            }
            $(power).toggleClass('on').toggleClass('off');
        }        
        if(id === "stars") {
            var ico = target.closest('ico');
            if(ico) {
                var stars = byId('stars');
                var icos = stars.all('ico');
                var index = ico.index();
                var power = index + 1;                
                var g = 1; do {
                    var star = icos[g];
                    if(g < power) {
                        star.firstElementChild.classList.add('starred');
                    } else {                        
                        star.firstElementChild.classList.remove('starred');
                    }
                g++; } while(g < icos.length);       
            }
        }
    }

    var el = target.closest('[data-window]')
    if(el) {
      window.open(el.dataset.window, '_blank').focus();
    }

    var elem = target.closest('[data-href]');
    if(elem) {
        //elem.dataset.href.router({cookie:elem.dataset.cookie});
        var href = elem.dataset.href; //alert(href);
        var body = target.closest('body');
        if(!body.classList.contains('editor')) {
          body.classList.contains('iframe') ?
            window.parent.api.message['state'](window.parent.rout.e(href)) :
            href.router({href});
        }
    }

    var elem = target.closest('[data-input]');
    if(elem) {
      var input = elem.dataset.input;
      if(input === "submit") {
        var submit = elem.find('input[type="submit"]');
        submit.click();
      }
    }

    var elem = target.closest('[data-modal]');
    if(elem) { console.log({elem});
      var func = elem.dataset.await ? eval(elem.dataset.await) : null;
      var call = typeof callBack === 'function' ? callBack() : null;
      var html = elem.dataset.template ? byId(elem.dataset.template).innerHTML : '';
      modal[elem.dataset.modal](html,call).then((ppp) => { console.log({ppp});
        ppp.onclick = event => {
            event.target.tagName === "ASIDE" ? modal.exit(event.target) : null;
        }
      });
    }

    var el = target.closest('[data-tab]');
    if(el) {
        var tab = el.dataset.tab;
        if(tab) {
          var tabs = rout.ed.dir(tab);
          var d = 0; do {
              var dir = tabs[d];
              if(dir.charAt(0) === "*") {
                dir = GET[d];
              }
              if(dir.charAt(0) === ":") {
                dir = dir.substring(1);
                if(dir === "color") {
                  dir = colors.random();
                }
              }
              tabs[d] = dir;
          d++; } while(d < tabs.length);
          console.log({tabs});
          if(dir) {
            var href = rout.ed.url(tabs);
            console.log(href, {tabs, tab});
            href.router();
          }
        }
        //elem.dataset.tabs = tab.index() + 1;
    }

    var elem = target.closest('[data-tap]');
    if(elem) {
        var x = eval(elem.dataset.tap);
        typeof x === 'function' ? x() : null;
    }

    var ev = target.closest("[data-evt]");
    if(ev) { //console.log(ev);
        var evt = ev.dataset.evt;
        evt ? dataset = ev.dataset : null;
        if(evt === "blur") {
            target.dataset && target.dataset.evt === "blur" ? modal.exit(target) : null;
        }
        if(evt === 'toggle') {
            var el;
            if(ev.dataset.elem === "parent") { el = ev.parentNode; }
            if(ev.dataset.class) { $(el).toggleClass(ev.dataset.class); }
        }
    }

    var elem = target.closest('[data-toggle]');
    if(elem) {
       var ind = byId(elem.dataset.toggle);
       $(ind).toggleClass(elem.dataset.class);
    }

    var el = target.closest('[data-browse]');
    if(el) {
        if(el.dataset.browse === "back") {
          history.length > 0 ? history.back() : (el.dataset.fallback).router();
        }
        if(el.dataset.browse === "hide") {
            event.target.closest('aside').classList.add('hide');
        }
        if(el.dataset.browse === "exit") {
            modal.exit(el);
        }
    }

    var library = target.closest('[data-api]');
    if(library) {
        //console.log({library},library.dataset);
        window[library.dataset.api][library.dataset.method][library.dataset.resource](target);
    }

};

window.on["focus"] = {
    in: { },
    out: { }
};

window.on["change"] = {

    file: (event,s) => {

      return new Promise((resolve,reject) => {

       var target = event.target;
       var dataset= target.dataset;
       var FR = new FileReader();

           var files = target.files; console.log({files},{s,event,target,dataset});
           if(files && files.length > 0) {
             if(files.length === 1) {
                 var reader = FR;
                 var file = files[0];
                 var s = {};
                 if(dataset.onload) {
                    //var x = eval(dataset.onload);
                    //if(typeof x === 'function') { s.onload = x(); }
                 }
                 reader.readAsDataURL(file);
                 if(s) {
                   reader.onload = onLoad;
                   s.onloadstart ? reader.onloadstart = s.onloadstart : null;
                   s.onprogress ? reader.onprogress = s.onprogress : null;
                   s.onabort ? reader.onabort = s.onabort : null;
                   s.onerror ? reader.onerror = s.onerror : null;
                 } else {
                   reader.onload = onLoad;
                 }
                 function onLoad() {
                   s.onload ? s.onload : null;
                   resolve(reader.result);
                   target.insertAdjacentHTML('afterend',target.cloneNode().outerHTML);
                   target.remove();
                 }
                 function onProgress(e) {
                     if (e.lengthComputable) {
                         var percentLoaded = Math.round((e.loaded / e.total) * 100);
                         if(percentLoaded < 100) { console.log(percentLoaded); }
                     }
                 }
             }
           }

       });

    },

};

window.on["mouse"] = {

  enter: {
    spriii: target => {
      target.classList.add('hover');
      console.log('mouse.enter');
    }
  },

  leave: {
    spriii: target => {
      target.classList.remove('hover');
      console.log('mouse.leave');
    }
  }

}

window.on["submit"] = {
    my: {  },
}
