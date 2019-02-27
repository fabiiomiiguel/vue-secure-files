# vue-secure-files

A reusable directive for [Vue.js](https://github.com/vuejs/vue) that loads file
requiring authentication and includes it as data in-line in your web
pages.

## Overview

Browsers don't send custom headers such as `Authorization` when retrieving
resources specified in a `<a>` or `<img>` tags.

This Vue.js directive overcomes this limitation by providing a way to load your
files as any other resources and then embedding them into your web pages using
the `data:image/FILETYPE;base64` URI scheme.

## Requirements

- vue: \^2.0.0
- axios: >= 0.5.0

## Install

From npm:

``` sh
$ npm install vue-secure-files --save
```

From CDN:

``` html
<script src="https://raw.githubusercontent.com/logicalsafety/vue-secure-files/0.0.1/vue-secure-files.js"></script>
<!-- OR -->
<script src="https://raw.githubusercontent.com/logicalsafety/vue-secure-files/0.0.1/vue-secure-files.min.js"></script>
```

## API

### secure-files

A directive that requests an resources URI asynchronously and embed it into your `<a>`
`<img>` tag using the [data URI scheme](https://en.wikipedia.org/wiki/Data_URI_scheme).

``` js
import Vue from 'vue';
import VueSecureFiles from 'vue-secure-files';

// register vue-secure-files directive
Vue.use(VueSecureFiles);

// set Authorization header used by axios
var authHeader = 'Bearer ' + localStorage.getItem('id_token');
axios.defaults.headers.common['Authorization'] = authHeader;
```

Once the directive is registered, you can use it in your Vue templates.

``` html
<template>
  <div>
    <img v-sec-file="https://api.app.com/images/authenticatedImg.png">
  </div>
</template>
```

See `/example` for a demo. To build it, run `npm install && npm run build`.

## Credits

This project is based in [vue-auth-image](https://gitlab.com/jlalande/vue-auth-image) (by Jean Lalande).

## License

[MIT](https://opensource.org/licenses/MIT)
