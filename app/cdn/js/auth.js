window.auth = {
    config: {
        apiKey: "AIzaSyCtJU8ovDISGoQ_HJj441pPQtZW9HrjD9U",
        authDomain: "onyxsoft-546ca.firebaseapp.com",
        projectId: "onyxsoft-546ca",
        messagingSenderId: "423205545004",
        appId: "1:423205545004:web:f396844fbdb3986d7bdd89"        
    },
    change: (user) => { //console.log({user});
        return new Promise(async(resolve, reject, url) => {
            var goto = '/';
            if(user) { //console.log({user})
              auth.token().then(async(jwt) => { console.log({jwt});
                var data = { jwt };

                //dom.avi.innerHTML = '<img>';
                var img = document.createElement('img');
                img.className = "absolute absolute-full border-radius-50pc cell-30px margin-10px"
                img.src = user.photoURL;
                img.onerror = controller.error.avi;
                byId('avi') ? byId('avi').innerHTML = img.outerHTML : null;
                //dom.avi.firstElementChild.onerror = e => e.target.remove();

                dom.body.dataset.uid = auth.user().uid;
                //auth.user().photoURL ? byId('user').src = auth.user().photoURL : null;

                1<0 ? ajax(api.endpoint()+'/v2/users/'+user.uid+'/create/',{data,dataType:"POST"}).then(async(j,json=JSON.parse(j)) => {
                  var user = json.user; console.log({json});

                  window.customer = json.sql.customer;
                  global.plans = {
                      "startup": {
                          "monthly": "price_1IDVjkEfZ5B88flNiLPXsyPA",
                          "yearly": "price_1IDVjkEfZ5B88flNyFtVHa3K"
                      },
                      "entrepreneur": {
                          "monthly": "price_1IDVj3EfZ5B88flNUTEK8siy",
                          "yearly": "price_1IDVj3EfZ5B88flNSoqP327s"
                      },
                      "enterprise": {
                          "monthly": "price_1IDMfLEfZ5B88flNHzoja42B",
                          "yearly": "price_1IDMfLEfZ5B88flNXxkxv0Dm"
                      },
                  };

                  if(json.retrieve && json.retrieve.items.data.length > 0) {
                    window.p = [];
                    var subs = json.retrieve.items.data;
                    var i = 0; do {
                      p[i] = [];
                      p[i]["subscriptionId"] = subs[i].id;
                      p[i]["priceId"] = priceId = subs[i].plan.id;

                      if(
                        global.plans.startup.monthly === priceId ||
                        global.plans.startup.yearly === priceId ||
                        global.plans.entrepreneur.monthly === priceId ||
                        global.plans.entrepreneur.yearly === priceId ||
                        global.plans.enterprise.monthly === priceId ||
                        global.plans.enterprise.yearly === priceId
                      ) {
                          global.subscription = priceId;
                      }

                      var x = 0; do {
                      x++; } while(x < Object.keys(global.plans).length);

                    i++; } while(i < subs.length);
                  }
                  if(user.uid) {
                      resolve(goto);
                  } else {
                    reject();
                  }

                }).catch(async(e) => { console.log('error.subscription',e);
                    var error = await ajax('/cdn/html/error.500.plans.html'); console.log({error});
                    popup.card(error);
                    resolve(goto);
                }) : resolve();
                //goto = (document.body.dataset.page === '/my/account/' ? '/' : window.location.pathname)
              });
            } else {
                document.body.removeAttribute('data-uid');
                goto = window.location.pathname+window.location.hash+window.location.search;
                resolve(goto);
            }
        });
    },
    check: uid => {
        return new Promise((resolve, reject, url) => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(jwt => {
                ajax(api.endpoint()+'/auth/firebase/verify', {dataType: "POST", data: jwt})
                    .then((j,json=JSON.parse(j)) => {
                        var response = json.response; resolve(response);
                    }).catch(err => {
                        resolve(err);
                    })
            }).catch(error => console.log({error}));
        });
    },
    enticate: {
        guest: () => {
            dom.body.dataset.auth = localStorage.username = 'guest-'+rand(1000,9999);
            //wss("https://wss-spriii.herokuapp.com:443");
        }
    },
    profile: href => { (auth.user(  ) ? "/users/"+auth.user().uid+"/" : '/my/account/').router() },
    verify: uid => {
        return new Promise((resolve, reject, url) => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(jwt => {
                ajax(api.endpoint()+'/auth/firebase/verify', {dataType: "POST", data: jwt})
                    .then((j,json=JSON.parse(j)) => resolve(json));
            }).catch(error => console.log({error}));
        });
    },
    getIdToken: () => {
        return new Promise((resolve, reject, url) => {
            auth.user() ? auth.user().getIdToken(true).then(jwt => { resolve(jwt); }) : reject();
        });
    },
    token: () => {
        return new Promise((resolve, reject, url) => {
            auth.user() ? auth.user().getIdToken(true).then(jwt => { resolve(jwt); }) : reject();
        });
    },
        isEmail: email => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); },
    login: {
        user: (email,password) => {
        console.log({email,password});
        return new Promise((resolve, reject) => {

            firebase.auth().signInWithEmailAndPassword(email, password).then(e => {

              (localStorage.returnUrl ? localStorage.returnUrl : '/').router();
              resolve(e);

            }).catch(function(error) {

              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(error.code +': '+ error.message);
              console.log('There is no user matching these credentials',2);
              reject();

            });

        });
        }
    },
    profile: {
        update: (json) => {
            return new Promise((resolve, reject) => {
                auth.user().updateProfile(json).then(() => {
                    alert("Profile Updated");
                });
            });
        }
    },
    reset: email => {
        return new Promise((resolve, reject) => {
            firebase.auth().sendPasswordResetEmail(email,{url: window.location.hostname, handleCodeInApp: false }).then(function() {
                resolve();
            }).catch(function(error) {
                reject({error});
            });
        });
    },
    setup: {
        account: event => { alert(true);
            event.preventDefault();
            var target = event.target;
            var email = target.find('.email').value,
                password = target.find('.secret').value;
            console.log({target,email, auth: auth.user()});
            return new Promise((resolve, reject) => {
              ajax(api.endpoint()+'/v1/read/auth', {dataType: "POST", data: {email,password}}).then(e => {
                console.log(e);
                var results = JSON.parse(e), count = results.count, user = auth.user(); console.log(results,user);
                    if(count===0) {
                        if(auth.isEmail(email)) {
                            firebase.auth().createUserWithEmailAndPassword(email, password).then(f => { var uid = f.user.uid; console.log(uid);
                                console.log({email});
                                ajax(api.endpoint()+'/v1/create/users', {dataType: "POST", data: {email,password,uid}}).then(e => {
                                    console.log('CREATE',e,auth.user());
                                    //('/users/'+auth.user().uid+'/').router();
                                });
                            }).catch(err => { var notif; console.log(err,2);
                                if(err.code === "auth/email-already-in-use") { error = 'This user exists already. Sign in as this user in order to add password authentication.'; }
                                alert(error,3);
                            });
                        }
                        else { alert('You must register with a valid email address.',3); }
                    }
                    else { alert('This user exists already.',3); }

              })
            });
        },
        shop: () => {}
    },
    state: (event) => {
        if(typeof event === "string" || (typeof event === 'object')) {
          var oAuth = (net) => { var provider; firebase.auth().useDeviceLanguage();
            if(net === 'facebook') { provider = new firebase.auth.FacebookAuthProvider(); }
            else if(net === 'github') { provider = new firebase.auth.GithubAuthProvider(); }
            else if(net === 'google') { provider = new firebase.auth.GoogleAuthProvider(); provider.addScope('https://www.googleapis.com/auth/drive'); provider.addScope('https://www.googleapis.com/auth/drive.readonly'); provider.addScope('https://www.googleapis.com/auth/drive.appdata'); }
            else if(net === 'github') { provider = new firebase.auth.GithubAuthProvider(); }
            else if(net === 'microsoft') { provider = new firebase.auth.OAuthProvider('microsoft.com'); }
            else if(net === 'twitter') { provider = new firebase.auth.TwitterAuthProvider(); }
            isOnline() ? firebase.auth().currentUser.linkWithPopup(provider).then((result) => { var credential = result.credential, user = result.user;  }) :
              firebase.auth().signInWithPopup(provider).then(e => {
                localStorage[net+'Token'] = e.credential.accessToken;
                auth.check(uid).then(response => { console.log({response});
                    if(response === 1) { '/setup/account/'.router().then(resolve()); }
                    else {
                        if(document.body.dataset && (document.body.dataset.url || document.body.dataset.page)) {
                            if(document.body.dataset.ppp === '/setup/') {
                                goto = auth.user() ? '/users/'+auth.user().uid+'/' : '';
                                //('/users/'+auth.user().uid+'/').router().then(resolve());
                            }
                            else if(document.body.dataset.ppp === '/my/account/') {
                                goto = '/';
                                //'/home/'.router().then(resolve());
                            }
                            else {
                                goto = window.location.pathname;
                                //goto.router().then(resolve());
                            }
                        }
                        else {
                            //goto = window.location.pathname === '/my/account/' ? '/' : window.location.pathname;
                            goto = window.location.pathname;
                            //goto.router().then(resolve());
                        }
                    }
                    alert(goto);
                    goto.router().then(resolve());
                });
              }).catch(error => console.log(error.message,2));
          }
          if(typeof event === "object") { event.forEach(k => oAuth(k)); }
          else if(typeof event === "string") { oAuth(event); }
        }
    },
    session: {
        close: (network) => { return new Promise((resolve, reject) => firebase.auth().signOut().then(() => ("/my/").router(resolve()), error => reject(data))); },
        state: (framework) => { return framework.isauth && isOnline() ? 'isauth' : 'noauth'},
    },
    update: (displayName) => { isOnline() ? isOnline().updateProfile({displayName}).then(() => console.log('auth.js auth.update:',displayName), () => notify('There was an error changing your username.',2)) : notify('You must be logged in to change your username',2); },
    user: () => { return firebase.auth().currentUser; }
}
function isOnline() { return firebase.auth().currentUser; }