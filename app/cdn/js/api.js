window.location.app = window.location.hostname.split('.')[window.location.hostname.split('.').length-2];
window.location.tld = window.location.hostname.split('.')[window.location.hostname.split('.').length-1];

window.api = {
    endpoint: window.location.protocol+'//api.'+window.location.app+'.'+window.location.tld
};