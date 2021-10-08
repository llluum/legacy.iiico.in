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

    var el = tools = target.closest("tools");
    if(tools) {
        if(tools.dataset.mode === "dot") {
          tools.innerHTML = await window.parent.ajax('/cdn/html/tools/tool.bar.html');
          tools.dataset.mode === "dot";
        }
        else if(tools.dataset.mode === "tip") {
          var body = dom.editor.body = byId('editor').contentWindow.document.body;
          byId('editor').contentWindow.$('.focus').removeClass('focus');
          tools.innerHTML = await window.parent.ajax('/cdn/html/tools/tool.tip.html');
          tools.dataset.mode === "tip";
        }
        else if(tools.dataset.mode === "box") {
          var body = dom.editor.body = byId('editor').contentWindow.document.body;
          byId('editor').contentWindow.$('.focus').removeClass('focus');
          tools.innerHTML = await window.parent.ajax('/cdn/html/tools/tool.box.html');
          tools.dataset.mode === "box";
        }

        if(target.closest('body')) {
          tools.dataset.mode = mode;
        }

        var width = (50 * tools.all('ico').length);
        //tools.dataset.width = width+"px";
    }

    el = target.closest('apps');
    if(el) {
      var tagName = el.tagName.toLowerCase();
      var app = target.closest('apps > box');
      if(app) {
        $('apps .jiggle').removeClass('jiggle');
        $('apps [data-resource="delete"]').addClass('hide');
        $(app.find('[data-resource="delete"]')).removeClass('hide');
        $(app).addClass('jiggle');
      }
    }

    el = target.closest('body.editor .focus');
    $('.jiggle').removeClass('jiggle');
    if(el) {
      //window.parent.modal.confirm("Enable sort mode?", ["Yes", "No"], bool => {
        //if(bool) {
          var win = window;
          var body = target.closest('body');
          var focused = $('.focus')
          var focus = focused[focused.length-1];
          console.log(74,{focused,focus});
          focus.classList.add('jiggle');


          var sort = body.all('blocks block');
          for (var s = 0; s < sort.length; s++) {
            new win.Sortable(sort[s], { group: "block", animation: 150, ghostClass: 'sortable-ghost', fallbackOnBody: true, swapThreshold: 0.65 })
          }

          var sort = body.all('block > section');
          for (var s = 0; s < sort.length; s++) {
            new win.Sortable(sort[s], { group: "card", animation: 150, ghostClass: 'sortable-ghost', fallbackOnBody: true, swapThreshold: 0.65 })
          }

          var sort = body.all('card group');
          for (var s = 0; s < sort.length; s++) {
            new win.Sortable(sort[s], { animation: 150, ghostClass: 'sortable-ghost', fallbackOnBody: true, swapThreshold: 0.65 })
          }
        //}
      //});
    }

    spriii.llips.is(target);
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
    console.log("tap",{iframe:self===top},event.type);
    var target = event.target; console.log('tap',{event,target});

    //RESET
    $('.jiggle').removeClass('jiggle');
    $('apps [data-resource="delete"]').addClass('hide');
    var tools = window.parent.byId('tools');
    if(tools) {
      tools.dataset.mode = "dot";
      tools.innerHTML = `<group class="bg-white border-radius-50px">
        <ico class="border-radius-50pc margin-auto" data-mode="dot" data-href="/build/:get/blocks/:3" data-height="50px" data-width="50px"><n class="gg-math-plus"></n></ico>
      </group>`;
    }

    //EVENTS
    var el = target.closest(".block");
    if(el) {
      $('.block').removeClass('focus');
      $(target.closest('.block')).addClass('focus');
    }
    else {
      $('.block').removeClass('focus');
    }

    el = target.closest("[id]");
    if(el) {
        var id = el.id;
        if(id.split('-')[0] === "miner") {
            if(id === "miner-start") {
                var stars = byId('stars');
                var starred = stars.all('.starred');
                var uid = Crypto.uid.create(starred);
                console.log(uid);
            }
            if(id === "miner-stop") {
                var stars = byId('stars');
                var starred = stars.all('.starred');
            }
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
                    console.log({g,star});
                g++; } while(g < icos.length);
                console.log({uid});               
            }
        }
    }

    el = target.closest('[data-spriii]')
    if(el) {
      var type = el.dataset.spriii;
      if(type === "llipsis") {
        spriii.llips.is(el);
      }
    }

    var el = target.closest('[data-window]')
    if(el) {
      window.open(el.dataset.window, '_blank').focus();
    }

    var elem = target.closest('[data-hints]');
    if(elem) {
      var cookie = elem.dataset.hints;
      var json = JSON.parse(cookie);
      var key = Object.keys(json)[0];
      var val = Object.values(json)[0];

      var hints = localStorage.hints;
      if(hints) {
        if(key) {
          //console.log(30,{hints,json,key,val},JSON.parse(hints));
          if(val === true) {
            hints = JSON.parse(hints);
            hints.includes(key) ? null : hints.push(key);
            console.log({hints});
            localStorage.hints = JSON.stringify(hints);
            var lessons = JSON.parse(await ajax('/cdn/json/hints.json'))["developer"];
            var index = lessons.indexOf(key); //alert(index);
            //howto(lesson);
          }
          if(val === null) {
            hints = JSON.parse(hints).filter(h => h !== key);
            console.log({hints});
            localStorage.hints = JSON.stringify(hints);
          }
          console.log({json});
          //json = json.filter(json => json !== val);
          //alert(JSON.stringify(json));
        }
      } else {
        if(key) {
          if(val === true) {
            json = [];
            json.push(key);
            json = JSON.stringify(json);
            localStorage.hints = json;
          }
          //json = json.filter(json => json !== val);
        }
      }


      if(localStorage.hints && val === true) {
        var json = await ajax('/cdn/json/hints.json');
        var lessons = JSON.parse(json)["developer"];
        var lesson = lessons[lessons.indexOf(key)+1];
        if(lesson) {
          howto(lesson);
        }
      }

      elem.dataset.url ? elem.dataset.url.router() : null;
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

    var elem = target.closest('[data-href-parent]');
    if(elem) {
      var href = elem.dataset.hrefParent;
      window.parent.String().router({href,cookie:elem.dataset.cookie});
      self === top ? window.parent.String().router({href}) : href.router({href})
    }

    var elem = target.closest('[data-parent-href]');
    if(elem) {
        self === top ? null : elem.dataset.parentHref.router({href})
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

    var elem = target.closest('[data-audio]');
    if(elem) { //alert(123);
        if(elem.dataset.audio === "play") {
            if(audio.isPlaying()) {
                audio.pause();
                document.body.removeAttribute('data-audio');
            } else {
                audio.play();
                document.body.dataset.audio = "playing";
            }
        }
    }

    var elem = target.closest('[data-file]');
    if(elem) {
        console.log('data-file', elem, elem.find('input'));
        var file = elem.find('input'); //console.log(file,elem.dataset.input);
        if(file) {
            file.dataset.elem = elem.dataset.file;
            elem.dataset.accept ? file.accept = elem.dataset.accept : null;
            elem.dataset.onload ? file.dataset.onload = elem.dataset.onload : null;
            console.log('file',file);
            file.click();
        }
    }

    var ev = target.closest("[data-hide]");
    if(ev) {
      if(ev.dataset.hide === "next") {
        byId(ev.dataset.hide).classList.add('hide');
      } else {
        byId(ev.dataset.hide).classList.add('hide');
      }
    }

    var ev = target.closest("[data-hint]");
    if(ev) {
      ev.closest('hint').classList.add('hide');
      byId(ev.dataset.hint).classList.remove('hide');
    }

    var elem = target.closest('[data-select]');
    if (elem) { //alert(123);
        var select = target.closest("[data-select]");
        var selected = target.closest("[data-select] > *");
        $(selected).toggleClass(select.dataset.select);
    }

    var elem = target.closest('[data-expand]');
    if(elem) {
       var ind = byId(elem.dataset.expand);
       var chd = target.closest('ul > li');
       $(chd).toggleClass('expand');
       $(chd).siblings().removeClass('expand');
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