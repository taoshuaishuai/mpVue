require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([2],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(104);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_0a6ce3bc_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(107);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(105)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_0a6ce3bc_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\search\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a6ce3bc", Component.options)
  } else {
    hotAPI.reload("data-v-0a6ce3bc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 105:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_douban__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_product__ = __webpack_require__(38);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            page: 1,
            size: 20,
            subtitle: '请在此输入搜索内容',
            list: [],
            search: '恐怖',
            loading: false,
            hasMore: false
        };
    },


    methods: {
        loadList: function loadList() {
            var _this = this;

            this.subtitle = '加载中...';
            this.hasMore = true;
            this.loading = true;
            var start = (this.page - 1) * this.size; //计算开始条数
            this.page = this.page + 1;
            // console.log('https://douban.uieee.com/v2/movie/search?q=' + this.data.search + '&start=' + start + '&count=' + this.data.size);
            Object(__WEBPACK_IMPORTED_MODULE_0__utils_douban__["a" /* default */])({
                url: '/v2/movie/search',
                data: {
                    tag: this.search,
                    start: start,
                    count: this.size
                }
            }).then(function (res) {
                _this.subtitle = res.data.title;
                _this.hasMore = false;
                _this.loading = false;
                if (!res.data.subjects.length) {
                    return;
                }

                var result = [];
                res.data.subjects.map(function (item) {
                    result.push({
                        image: item.images.small,
                        id: item.id,
                        title: item.title,
                        average: item.rating.average,
                        original_title: item.original_title,
                        year: item.year,
                        directors: item.directors.length && item.directors[0].name || '-'
                    });
                });
                _this.list = _this.list.concat(result);

                global.mpvue.stopPullDownRefresh(); //停止下拉刷新UI
            });
        },
        handleSearch: function handleSearch(e) {
            if (!e.target.value) return;
            this.list = [];
            this.page = 1;

            this.subtitle = '加载中...';
            this.hasMore = true;
            this.loading = true;
            this.search = e.target.value;
            this.loadList();
        }
    },

    onPullDownRefresh: function onPullDownRefresh() {
        console.log('onPullDownRefresh');
        this.list = [];
        this.page = 1;
        this.loadList();
        // app.wechat.original.stopPullDownRefresh(); //停止下拉刷新UI
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function onReachBottom() {
        console.log('onReachBottom');
        this.loadList(); //加载更多
    },

    components: {
        product: __WEBPACK_IMPORTED_MODULE_1__components_product__["a" /* default */]
    }
});

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "search"
  }, [_c('input', {
    staticClass: "search-input",
    attrs: {
      "focus": "",
      "placeholder": _vm.subtitle,
      "eventid": '0'
    },
    on: {
      "change": _vm.handleSearch
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "list"
  }, [(_vm.loading) ? _c('div', {
    staticClass: "tips"
  }, [_vm._m(0)]) : _vm._e(), _vm._v(" "), _vm._l((_vm.list), function(item, index) {
    return _c('navigator', {
      key: item.id,
      attrs: {
        "url": '../item/main?id=' + item.id
      }
    }, [_c('product', {
      attrs: {
        "item": item,
        "mpcomid": '0_' + index
      }
    })], 1)
  }), _vm._v(" "), (_vm.list.length > 0) ? _c('div', {
    staticClass: "tips"
  }, [(_vm.hasMore) ? _c('div', [_c('img', {
    staticClass: "tips-img",
    attrs: {
      "src": "/static/images/loading.gif",
      "mode": "aspectFill"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "span"
  }, [_vm._v("玩了命的加载中...")])]) : _c('div', [_c('span', [_vm._v("没有更多内容了")])])]) : _vm._e()], 2)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('img', {
    staticClass: "tips-img",
    attrs: {
      "src": "/static/images/loading.gif",
      "mode": "aspectFill"
    }
  }), _vm._v(" "), _c('span', [_vm._v("刷新中...")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0a6ce3bc", esExports)
  }
}

/***/ })

},[103]);