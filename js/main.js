//imports
import { FetchError, SearchError } from './utils.js'; //this runs first and then runs utils.js second

//global variables
let cache = null; //reference to cache to use memory to save time
const cacheName = 'UniqueNameOfOurCache';
const storageName = 'UniqueNameOfOutStorage';
const baseUrl = 'https://dummyjson.com';
//Do NOT put DOM elements into global variables

document.addEventListener('DOMContentLoaded', init); //this runs third

function init() {
  //when the page loads
  //this runs fourth
  addListeners();
  connectToCache();
  let globalStorageObject = loadStorageData(storageName);
  let params = readFromQueryString();
  console.log(params); // {pageNum: 4, keyword: 'Aymen'}
  getInitialDataForPage(params);
  pageSpecific();
}

function getInitialDataForPage(_params) {
  //create a url object
  let url = new URL(`/some/endpoint`, baseUrl);
  //create a query string object
  let params = new URLSearchParams();
  params.set('keyword', _params.keyword);
  params.set('page', _params.pageNum + 1);
  params.set('sort', 'name');
  params.set('q', 'cheese');

  //add the querystring to the url object
  url.search = '?' + params.toString();
  //add the url as the href
  document.querySelector('nav > a').href = url.href; //the string version of the whole URL

  //or use it in a fetch
  fetch(url)
    .then((response) => {
      //always check for a valid response
      if (!response.ok) throw new FetchError('Bad Fetch request', response, url);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      if (err.name === 'BeerError') {
        //beer error
      } else if (err.name === 'SearchError') {
        //search input error
      } else if (err instanceof FetchError) {
        // err.constructor.name === 'FetchError'
        console.warn(err.name);
        console.warn(err.message);
        console.warn(err.status);
        console.warn(err.response);
        console.warn(err.request);
      } else {
        //generic error
      }
    });
  //handle the fetch
}

function readFromQueryString() {
  console.log(window.location === location); // true
  let url = new URL(location.href);
  console.log(url.href); // full url string
  console.log(url.origin); /// http://127.0.0.1:5500
  console.log(url.pathname); //  folder/filename
  console.log(url.search); //string
  console.log(url.searchParams); // Object
  // let newParams = new URLSearchParams(); //empty object
  let params = url.searchParams;
  let page = params.get('page');
  let keyword = params.get('keyword');
  let sort = params.get('sort');
  console.log(keyword, sort);
  //above variables are ALL STRINGS
  // let pageNum = parseInt(page);
  // let pageNum = Number(page);
  let pageNum = page ? +page : 0; //turn the string into a number
  if (keyword) {
    document.getElementById('search').value = keyword;
  }
  return { pageNum, keyword };
}

function addListeners() {
  document.querySelector('nav form').addEventListener('submit', handleSearch);
  document.getElementById('btnAction').addEventListener('click', mainTask);
  window.addEventListener('load', () => {
    //only if it is one or two commands that will not be ever called again in the same order
  });
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
  let input = document.getElementById('search');
  throw new SearchError('Missing search keyword', input);
}

function mainTask(ev) {
  //handle the main call to action task
}

async function connectToCache() {
  //get the reference to the cache as global
  //because it is an async task
  cache = await caches.open(cacheName);
}

function loadStorageData(_storageName) {
  let storage = localStorage.getItem(_storageName);
  if (storage) {
    return JSON.parse(storage);
  } else {
    //set the default in localStorage
    localStorage.setItem(_storageName, JSON.stringify([]));
    return [];
  }
}
