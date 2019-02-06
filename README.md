# Hackernews

> A simple clone of [Hackernews](https://news.ycombinator.com/news). 
> The final product can be viewed [here](perfect-answer.surge.sh).

## Technologies
* **Frontend**

  * **VueJS:** A progressive JavaScript framework for building user interfaces
  * **Apollo Client:** Fully-featured, production ready caching GraphQL client
  
* **Backend:**

  * **Graphcool:** Flexible backend platform combining GraphQL + Serverless
  
## Features
* Display a list of links
* Search the list of links
* Users can authenticate
* Authenticated users can create new links
* Authenticated users can upvote links (one vote per link and user)
* Realtime updates when other users upvote a link or create a new one

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


The Fullstack Tutorial for GraphQL : https://github.com/howtographql/howtographql
