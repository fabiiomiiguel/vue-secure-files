; (function () {
  var vueSecureFiles = {};
  var axios = typeof require === 'function'
    ? require('axios')
    : window.Axios;

  if (!axios) {
    throw new Error('[vue-secure-files] cannot locate Axios');
  }

  function setFile(el, binding) {
    if (
      binding.value !== null && binding.value !== undefined &&
      (binding.oldValue === undefined || binding.value !== binding.oldValue)
    ) {
      var fileUrl = binding.value;
      axios({
        method: 'get',
        url: fileUrl,
        responseType: 'arraybuffer'
      })
        .then(function (resp) {
          var mimeType = resp.headers['content-type'].toLowerCase();
          var fileBase64 = new Buffer(resp.data, 'binary').toString('base64');
          if (el.tagName.toLowerCase() === 'img') {
            el.src = 'data:' + mimeType + ';base64,' + fileBase64;
          } else {
            el.href = 'data:' + mimeType + ';base64,' + fileBase64;
            el.download = '';
          }
        }).catch((function () {
          if (el.tagName.toLowerCase() === 'img') {
            el.src = fileUrl;
          } else if (el.tagName.toLowerCase() === 'a') {
            el.href = fileUrl;
          }
        }));
    }
  }

  vueSecureFiles.install = function (Vue) {
    Vue.directive('sec-file', {
      bind: function (el, binding) {
        setFile(el, binding);
      },
      componentUpdated: function (el, binding) {
        setFile(el, binding);
      }
    });
  };

  if (typeof exports == 'object') {
    module.exports = vueSecureFiles;
  } else if (typeof define == 'function' && define.amd) {
    define([], function () {
      return vueSecureFiles;
    });
  } else if (window.Vue) {
    window.vueSecureFiles = vueSecureFiles;
    Vue.use(vueSecureFiles);
  }
})();
