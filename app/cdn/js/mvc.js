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
      ajax(api.endpoint+"/v1/points/read"+"?limit=54&orderBy=created DESC")
        .then((d,data=JSON.parse(d)) => {
          console.log("data",{data});
          var rows = data.rows;
          if(rows.length > 0) {            
            var blocks = rout.er().find('blocks');
            var p = 0; do {
              var row = rows[p];
              var html = `<block><section><box class="line-height-50px"><section><text class="bolder">`+row.type+row.unit+``+row.id+`</text><text class="padding-x-10px">`+row.created+`</text></section></box></block>`;
              blocks.insertAdjacentHTML('beforeend',html);
              p++;
            } while(p < rows.length);           
          }
        });
      resolve(route);
    }

  });
};

window.mvc.c = () => {

};