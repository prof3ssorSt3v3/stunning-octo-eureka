//imports
import { FetchError } from './utils.js';

//global variables
let cache = null; //reference to cache
const cacheName = 'UniqueNameOfOurCache';
const storageName = 'UniqueNameOfOutStorage';
const baseUrl = 'https://dummyjson.com';

document.addEventListener('DOMContentLoaded', init);

function init() {
  //when the page loads
  addListeners();
  connectToCache();
  let storageObject = loadStorageData();
  getInitialDataForPage();
  pageSpecific();
}

function addListeners() {
  document.querySelector('nav form').addEventListener('submit', handleSearch);
  document.getElementById('btnAction').addEventListener('click', mainTask);
}

function pageSpecific() {
  let id = document.body.id;
  switch (id) {
    case 'home':
      import('./iter-enum.js');
      break;
    case 'products':
      break;
    case 'contact':
      break;
    default:
  }
}

function handleSearch(ev) {
  ev.preventDefault();
  //handle the search
}

function mainTask(ev) {
  //handle the main call to action task
}

async function connectToCache() {
  //get the reference to the cache as global
  //because it is an async task
  cache = await caches.open(cacheName);
}

function loadStorageData() {
  let storage = localStorage.getItem(storageName);
  if (storage) {
    return JSON.parse(storage);
  } else {
    //set the default in localStorage
    localStorage.setItem(storageName, JSON.stringify([]));
    return [];
  }
}

function getInitialDataForPage() {
  //create a url object
  let url = new URL(`/some/endpoint`, baseUrl);
  //create a query string object
  let params = new URLSearchParams();
  params.set('keyword', 'some default param');
  //add the querystring to the url object
  url.search = '?' + params.toString();
  //add the url as the href
  document.querySelector('a').href = url.href;
  //or use it in a fetch
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new FetchError('Bad Fetch request', response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.warn(err.name);
      console.warn(err.message);
      console.warn(err.status);
      console.warn(err.response);
    });
  //handle the fetch
}
