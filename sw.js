// Change this to your repository name
var GHPATH = '/suspicion_notebook';
 
// Choose a different app prefix name
var APP_PREFIX = 'snpwa_';
 
// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…). 
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = 'v23';
 
// The files to make available for offline use. make sure to add
// others to this list
var URLS = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/styles/style.css`,
  `${GHPATH}/styles/bootstrap.min.css`,
  `${GHPATH}/suspicion.js`,
  `${GHPATH}/images/pic3121492.png`,
  `${GHPATH}/images/icon.png`,
  `${GHPATH}/images/orange_gem.png`,
  `${GHPATH}/images/red_gem.png`,
  `${GHPATH}/images/green_gem.png`,
]

// Reply with the cache version when the page asks
self.addEventListener('message', function (event) {
  if (event.data === 'GET_VERSION' && event.ports && event.ports[0]) {
    event.ports[0].postMessage(VERSION);
  }
});