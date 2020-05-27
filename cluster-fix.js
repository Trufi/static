"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e5) { throw _e5; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e6) { didErr = true; err = _e6; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, e) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module))) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {
    var o = e();

    for (var n in o) {
      ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports : t)[n] = o[n];
    }
  }
}(window, function () {
  return function (t) {
    var e = {};

    function o(n) {
      if (e[n]) return e[n].exports;
      var r = e[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return t[n].call(r.exports, r, r.exports, o), r.l = !0, r.exports;
    }

    return o.m = t, o.c = e, o.d = function (t, e, n) {
      o.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: n
      });
    }, o.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, o.t = function (t, e) {
      if (1 & e && (t = o(t)), 8 & e) return t;
      if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
      var n = Object.create(null);
      if (o.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t) for (var r in t) {
        o.d(n, r, function (e) {
          return t[e];
        }.bind(null, r));
      }
      return n;
    }, o.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return o.d(e, "a", e), e;
    }, o.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, o.p = "/", o(o.s = 0);
  }([function (t, e, o) {
    "use strict";

    o.r(e), o.d(e, "Clusterer", function () {
      return j;
    });
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
    
    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
    
    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var _n = function n(t, e) {
      return (_n = Object.setPrototypeOf || _instanceof({
        __proto__: []
      }, Array) && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var o in e) {
          e.hasOwnProperty(o) && (t[o] = e[o]);
        }
      })(t, e);
    };

    var _r = function r() {
      return (_r = Object.assign || function (t) {
        for (var e, o = 1, n = arguments.length; o < n; o++) {
          for (var r in e = arguments[o]) {
            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          }
        }

        return t;
      }).apply(this, arguments);
    };

    function i(t, e, o, n, r, u) {
      if (r - n <= o) return;
      var a = n + r >> 1;
      !function t(e, o, n, r, i, u) {
        for (; i > r;) {
          if (i - r > 600) {
            var _s = i - r + 1,
                _a2 = n - r + 1,
                _c2 = Math.log(_s),
                _p2 = .5 * Math.exp(2 * _c2 / 3),
                _l = .5 * Math.sqrt(_c2 * _p2 * (_s - _p2) / _s) * (_a2 - _s / 2 < 0 ? -1 : 1),
                _h = Math.max(r, Math.floor(n - _a2 * _p2 / _s + _l)),
                _f = Math.min(i, Math.floor(n + (_s - _a2) * _p2 / _s + _l));

            t(e, o, n, _h, _f, u);
          }

          var _a = o[2 * n + u];
          var _c = r,
              _p = i;

          for (s(e, o, r, n), o[2 * i + u] > _a && s(e, o, r, i); _c < _p;) {
            for (s(e, o, _c, _p), _c++, _p--; o[2 * _c + u] < _a;) {
              _c++;
            }

            for (; o[2 * _p + u] > _a;) {
              _p--;
            }
          }

          o[2 * r + u] === _a ? s(e, o, r, _p) : (_p++, s(e, o, _p, i)), _p <= n && (r = _p + 1), n <= _p && (i = _p - 1);
        }
      }(t, e, a, n, r, u % 2), i(t, e, o, n, a - 1, u + 1), i(t, e, o, a + 1, r, u + 1);
    }

    function s(t, e, o, n) {
      u(t, o, n), u(e, 2 * o, 2 * n), u(e, 2 * o + 1, 2 * n + 1);
    }

    function u(t, e, o) {
      var n = t[e];
      t[e] = t[o], t[o] = n;
    }

    function a(t, e, o, n) {
      var r = t - o,
          i = e - n;
      return r * r + i * i;
    }

    var c = function c(t) {
      return t[0];
    },
        p = function p(t) {
      return t[1];
    };

    var l = /*#__PURE__*/function () {
      function l(t) {
        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : c;
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : p;
        var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 64;
        var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Float64Array;

        _classCallCheck(this, l);

        this.nodeSize = n, this.points = t;
        var s = t.length < 65536 ? Uint16Array : Uint32Array,
            u = this.ids = new s(t.length),
            a = this.coords = new r(2 * t.length);

        for (var _n2 = 0; _n2 < t.length; _n2++) {
          u[_n2] = _n2, a[2 * _n2] = e(t[_n2]), a[2 * _n2 + 1] = o(t[_n2]);
        }

        i(u, a, n, 0, u.length - 1, 0);
      }

      _createClass(l, [{
        key: "range",
        value: function range(t, e, o, n) {
          return function (t, e, o, n, r, i, s) {
            var u = [0, t.length - 1, 0],
                a = [];
            var c, p;

            for (; u.length;) {
              var _l2 = u.pop(),
                  _h2 = u.pop(),
                  _f2 = u.pop();

              if (_h2 - _f2 <= s) {
                for (var _s2 = _f2; _s2 <= _h2; _s2++) {
                  c = e[2 * _s2], p = e[2 * _s2 + 1], c >= o && c <= r && p >= n && p <= i && a.push(t[_s2]);
                }

                continue;
              }

              var _d = Math.floor((_f2 + _h2) / 2);

              c = e[2 * _d], p = e[2 * _d + 1], c >= o && c <= r && p >= n && p <= i && a.push(t[_d]);

              var _m = (_l2 + 1) % 2;

              (0 === _l2 ? o <= c : n <= p) && (u.push(_f2), u.push(_d - 1), u.push(_m)), (0 === _l2 ? r >= c : i >= p) && (u.push(_d + 1), u.push(_h2), u.push(_m));
            }

            return a;
          }(this.ids, this.coords, t, e, o, n, this.nodeSize);
        }
      }, {
        key: "within",
        value: function within(t, e, o) {
          return function (t, e, o, n, r, i) {
            var s = [0, t.length - 1, 0],
                u = [],
                c = r * r;

            for (; s.length;) {
              var _p3 = s.pop(),
                  _l3 = s.pop(),
                  _h3 = s.pop();

              if (_l3 - _h3 <= i) {
                for (var _r2 = _h3; _r2 <= _l3; _r2++) {
                  a(e[2 * _r2], e[2 * _r2 + 1], o, n) <= c && u.push(t[_r2]);
                }

                continue;
              }

              var _f3 = Math.floor((_h3 + _l3) / 2),
                  _d2 = e[2 * _f3],
                  _m2 = e[2 * _f3 + 1];

              a(_d2, _m2, o, n) <= c && u.push(t[_f3]);

              var _g = (_p3 + 1) % 2;

              (0 === _p3 ? o - r <= _d2 : n - r <= _m2) && (s.push(_h3), s.push(_f3 - 1), s.push(_g)), (0 === _p3 ? o + r >= _d2 : n + r >= _m2) && (s.push(_f3 + 1), s.push(_l3), s.push(_g));
            }

            return u;
          }(this.ids, this.coords, t, e, o, this.nodeSize);
        }
      }]);

      return l;
    }();

    var h = {
      minZoom: 0,
      maxZoom: 16,
      radius: 40,
      extent: 512,
      nodeSize: 64,
      log: !1,
      generateId: !1,
      reduce: null,
      map: function map(t) {
        return t;
      }
    };

    var f = /*#__PURE__*/function () {
      function f(t) {
        _classCallCheck(this, f);

        this.options = x(Object.create(h), t), this.trees = new Array(this.options.maxZoom + 1);
      }

      _createClass(f, [{
        key: "load",
        value: function load(t) {
          var _this$options = this.options,
              e = _this$options.log,
              o = _this$options.minZoom,
              n = _this$options.maxZoom,
              r = _this$options.nodeSize;
          e && console.time("total time");
          var i = "prepare ".concat(t.length, " points");
          e && console.time(i), this.points = t;
          var s = [];

          for (var _e = 0; _e < t.length; _e++) {
            t[_e].geometry && s.push(m(t[_e], _e));
          }

          this.trees[n + 1] = new l(s, M, w, r, Float32Array), e && console.timeEnd(i);

          for (var _t = n; _t >= o; _t--) {
            var _o = +Date.now();

            s = this._cluster(s, _t), this.trees[_t] = new l(s, M, w, r, Float32Array), e && console.log("z%d: %d clusters in %dms", _t, s.length, +Date.now() - _o);
          }

          return e && console.timeEnd("total time"), this;
        }
      }, {
        key: "getClusters",
        value: function getClusters(t, e) {
          var o = ((t[0] + 180) % 360 + 360) % 360 - 180;
          var n = Math.max(-90, Math.min(90, t[1]));
          var r = 180 === t[2] ? 180 : ((t[2] + 180) % 360 + 360) % 360 - 180;
          var i = Math.max(-90, Math.min(90, t[3]));
          if (t[2] - t[0] >= 360) o = -180, r = 180;else if (o > r) {
            var _t2 = this.getClusters([o, n, 180, i], e),
                _s3 = this.getClusters([-180, n, r, i], e);

            return _t2.concat(_s3);
          }

          var s = this.trees[this._limitZoom(e)],
              u = s.range(v(o), _(i), v(r), _(n)),
              a = [];

          var _iterator = _createForOfIteratorHelper(u),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _t3 = _step.value;
              var _e2 = s.points[_t3];
              a.push(_e2.numPoints ? g(_e2) : this.points[_e2.index]);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return a;
        }
      }, {
        key: "getChildren",
        value: function getChildren(t) {
          var e = this._getOriginId(t),
              o = this._getOriginZoom(t),
              n = "No cluster with the specified id.",
              r = this.trees[o];

          if (!r) throw new Error(n);
          var i = r.points[e];
          if (!i) throw new Error(n);
          var s = this.options.radius / (this.options.extent * Math.pow(2, o - 1)),
              u = r.within(i.x, i.y, s),
              a = [];

          var _iterator2 = _createForOfIteratorHelper(u),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _e3 = _step2.value;
              var _o2 = r.points[_e3];
              _o2.parentId === t && a.push(_o2.numPoints ? g(_o2) : this.points[_o2.index]);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          if (0 === a.length) throw new Error(n);
          return a;
        }
      }, {
        key: "getLeaves",
        value: function getLeaves(t, e, o) {
          e = e || 10, o = o || 0;
          var n = [];
          return this._appendLeaves(n, t, e, o, 0), n;
        }
      }, {
        key: "getTile",
        value: function getTile(t, e, o) {
          var n = this.trees[this._limitZoom(t)],
              r = Math.pow(2, t),
              _this$options2 = this.options,
              i = _this$options2.extent,
              s = _this$options2.radius,
              u = s / i,
              a = (o - u) / r,
              c = (o + 1 + u) / r,
              p = {
            features: []
          };

          return this._addTileFeatures(n.range((e - u) / r, a, (e + 1 + u) / r, c), n.points, e, o, r, p), 0 === e && this._addTileFeatures(n.range(1 - u / r, a, 1, c), n.points, r, o, r, p), e === r - 1 && this._addTileFeatures(n.range(0, a, u / r, c), n.points, -1, o, r, p), p.features.length ? p : null;
        }
      }, {
        key: "getClusterExpansionZoom",
        value: function getClusterExpansionZoom(t) {
          var e = this._getOriginZoom(t) - 1;

          for (; e <= this.options.maxZoom;) {
            var _o3 = this.getChildren(t);

            if (e++, 1 !== _o3.length) break;
            t = _o3[0].properties.cluster_id;
          }

          return e;
        }
      }, {
        key: "_appendLeaves",
        value: function _appendLeaves(t, e, o, n, r) {
          var i = this.getChildren(e);

          var _iterator3 = _createForOfIteratorHelper(i),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _e4 = _step3.value;
              var _i = _e4.properties;
              if (_i && _i.cluster ? r + _i.point_count <= n ? r += _i.point_count : r = this._appendLeaves(t, _i.cluster_id, o, n, r) : r < n ? r++ : t.push(_e4), t.length === o) break;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          return r;
        }
      }, {
        key: "_addTileFeatures",
        value: function _addTileFeatures(t, e, o, n, r, i) {
          var _iterator4 = _createForOfIteratorHelper(t),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _s4 = _step4.value;
              var _t4 = e[_s4],
                  _u = _t4.numPoints,
                  _a3 = {
                type: 1,
                geometry: [[Math.round(this.options.extent * (_t4.x * r - o)), Math.round(this.options.extent * (_t4.y * r - n))]],
                tags: _u ? y(_t4) : this.points[_t4.index].properties
              };

              var _c3 = void 0;

              _u ? _c3 = _t4.id : this.options.generateId ? _c3 = _t4.index : this.points[_t4.index].id && (_c3 = this.points[_t4.index].id), void 0 !== _c3 && (_a3.id = _c3), i.features.push(_a3);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      }, {
        key: "_limitZoom",
        value: function _limitZoom(t) {
          return Math.max(this.options.minZoom, Math.min(t, this.options.maxZoom + 1));
        }
      }, {
        key: "_cluster",
        value: function _cluster(t, e) {
          var o = [],
              _this$options3 = this.options,
              n = _this$options3.radius,
              r = _this$options3.extent,
              i = _this$options3.reduce,
              s = n / (r * Math.pow(2, e));

          for (var _n3 = 0; _n3 < t.length; _n3++) {
            var _r3 = t[_n3];
            if (_r3.zoom <= e) continue;
            _r3.zoom = e;

            var _u2 = this.trees[e + 1],
                _a4 = _u2.within(_r3.x, _r3.y, s);

            var _c4 = _r3.numPoints || 1,
                _p4 = _r3.x * _c4,
                _l4 = _r3.y * _c4,
                _h4 = i && _c4 > 1 ? this._map(_r3, !0) : null;

            var _f4 = (_n3 << 5) + (e + 1) + this.points.length;

            var _iterator5 = _createForOfIteratorHelper(_a4),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var _t5 = _step5.value;
                var _o4 = _u2.points[_t5];
                if (_o4.zoom <= e) continue;
                _o4.zoom = e;

                var _n4 = _o4.numPoints || 1;

                _p4 += _o4.x * _n4, _l4 += _o4.y * _n4, _c4 += _n4, _o4.parentId = _f4, i && (_h4 || (_h4 = this._map(_r3, !0)), i(_h4, this._map(_o4)));
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }

            1 === _c4 ? o.push(_r3) : (_r3.parentId = _f4, o.push(d(_p4 / _c4, _l4 / _c4, _f4, _c4, _h4)));
          }

          return o;
        }
      }, {
        key: "_getOriginId",
        value: function _getOriginId(t) {
          return t - this.points.length >> 5;
        }
      }, {
        key: "_getOriginZoom",
        value: function _getOriginZoom(t) {
          return (t - this.points.length) % 32;
        }
      }, {
        key: "_map",
        value: function _map(t, e) {
          if (t.numPoints) return e ? x({}, t.properties) : t.properties;
          var o = this.points[t.index].properties,
              n = this.options.map(o);
          return e && n === o ? x({}, n) : n;
        }
      }]);

      return f;
    }();

    function d(t, e, o, n, r) {
      return {
        x: t,
        y: e,
        zoom: 1 / 0,
        id: o,
        parentId: -1,
        numPoints: n,
        properties: r
      };
    }

    function m(t, e) {
      var _t$geometry$coordinat = _slicedToArray(t.geometry.coordinates, 2),
          o = _t$geometry$coordinat[0],
          n = _t$geometry$coordinat[1];

      return {
        x: v(o),
        y: _(n),
        zoom: 1 / 0,
        index: e,
        parentId: -1
      };
    }

    function g(t) {
      return {
        type: "Feature",
        id: t.id,
        properties: y(t),
        geometry: {
          type: "Point",
          coordinates: [(e = t.x, 360 * (e - .5)), b(t.y)]
        }
      };
      var e;
    }

    function y(t) {
      var e = t.numPoints,
          o = e >= 1e4 ? "".concat(Math.round(e / 1e3), "k") : e >= 1e3 ? "".concat(Math.round(e / 100) / 10, "k") : e;
      return x(x({}, t.properties), {
        cluster: !0,
        cluster_id: t.id,
        point_count: e,
        point_count_abbreviated: o
      });
    }

    function v(t) {
      return t / 360 + .5;
    }

    function _(t) {
      var e = Math.sin(t * Math.PI / 180),
          o = .5 - .25 * Math.log((1 + e) / (1 - e)) / Math.PI;
      return o < 0 ? 0 : o > 1 ? 1 : o;
    }

    function b(t) {
      var e = (180 - 360 * t) * Math.PI / 180;
      return 360 * Math.atan(Math.exp(e)) / Math.PI - 90;
    }

    function x(t, e) {
      for (var _o5 in e) {
        t[_o5] = e[_o5];
      }

      return t;
    }

    function M(t) {
      return t.x;
    }

    function w(t) {
      return t.y;
    }

    var S = function () {
      function t() {
        this.events = {};
      }

      return t.prototype.on = function (t, e) {
        var o = this.events[t];
        return o || (o = this.events[t] = []), o.push(e), this;
      }, t.prototype.once = function (t, e) {
        var o = this,
            n = function n(r) {
          o.off(t, n), e.call(o, r);
        };

        return this.on(t, n), this;
      }, t.prototype.off = function (t, e) {
        var o = this.events[t];
        if (!o) return this;
        var n = o.indexOf(e);
        return -1 !== n && o.splice(n, 1), this;
      }, t.prototype.emit = function (t, e) {
        var o = this.events[t];
        if (!o) return this;

        for (var n = o.slice(), r = 0; r < n.length; r++) {
          n[r].call(this, e);
        }

        return this;
      }, t;
    }(),
        I = ["click", "dblclick", "mousemove", "mouseover", "mouseout", "mousedown", "mouseup", "touchstart", "touchend"];

    var j = function (t) {
      function e(o, n) {
        var i;
        void 0 === n && (n = {});
        var s = t.call(this) || this;
        s._updateVisibleObjects = function () {
          var t = s._getVisibleObjects();

          s.markers.forEach(function (t) {
            t.hide();
          }), s.clusters.forEach(function (t) {
            t.hide();
          }), t.forEach(function (t) {
            if (function (t) {
              return t.properties.cluster;
            }(t)) {
              var e = t.properties.cluster_id,
                  o = s.clusters.get(e);
              o ? o.show() : s._createCluster(e, t.geometry.coordinates, t.properties.point_count);
            } else {
              var n = t.properties.index,
                  r = s.markers.get(n);
              r ? r.show() : s._createMarker(n, t.geometry.coordinates);
            }
          });
        }, s._updateVisibleObjects = function (t, e) {
          var o, n;

          function r() {
            o = !1, n && (i.apply(void 0, n), n = !1);
          }

          function i() {
            for (var i = [], s = 0; s < arguments.length; s++) {
              i[s] = arguments[s];
            }

            o ? n = i : (t.apply(void 0, i), setTimeout(r, e), o = !0);
          }

          return i;
        }(s._updateVisibleObjects, 100);
        var u = null !== (i = n.radius) && void 0 !== i ? i : e.options.radius,
            a = e.options.clusterStyle;
        return n.clusterStyle && (a = "function" == typeof n.clusterStyle ? n.clusterStyle : _r(_r({}, a), n.clusterStyle)), s.options = {
          radius: u,
          clusterStyle: a
        }, s.map = o, s.inputMarkers = [], s.supercluster = new f({
          minZoom: 0,
          maxZoom: 20,
          radius: s.options.radius
        }), s.markers = new Map(), s.clusters = new Map(), s.map.on("move", s._updateVisibleObjects), s.map.on("resize", s._updateVisibleObjects), s;
      }

      return function (t, e) {
        function o() {
          this.constructor = t;
        }

        _n(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o());
      }(e, t), e.prototype.load = function (t) {
        this._clear(), this.inputMarkers = t, this.supercluster.load(function (t) {
          return t.map(function (t, e) {
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: t.coordinates
              },
              properties: {
                index: e,
                cluster: !1
              }
            };
          });
        }(t)), this._updateVisibleObjects();
      }, e.prototype.destroy = function () {
        this._clear(), this.map.off("move", this._updateVisibleObjects), this.map.off("resize", this._updateVisibleObjects);
      }, e.prototype._clear = function () {
        this.markers.forEach(function (t) {
          t.destroy();
        }), this.clusters.forEach(function (t) {
          t.destroy();
        }), this.markers.clear(), this.clusters.clear(), this.supercluster.load([]), this.inputMarkers = [];
      }, e.prototype._getVisibleObjects = function () {
        var t = Math.floor(this.map.getZoom()),
            e = this._getBounds();

        return this.supercluster.getClusters(e, t);
      }, e.prototype._getBounds = function () {
        var t = this.map.getSize(),
            e = .06 * t[0],
            o = .06 * t[1],
            n = this.map.unproject([-e, t[1] + o]),
            r = this.map.unproject([t[0] + e, t[1] + o]),
            i = this.map.unproject([t[0] + e, -o]),
            s = this.map.unproject([-e, -o]);
        return [Math.min(n[0], r[0], i[0], s[0]), Math.min(n[1], r[1], i[1], s[1]), Math.max(n[0], r[0], i[0], s[0]), Math.max(n[1], r[1], i[1], s[1])];
      }, e.prototype._createMarker = function (t, e) {
        var o = this,
            n = this.inputMarkers[t],
            r = n.icon,
            i = n.size,
            s = n.anchor,
            u = n.hoverIcon,
            a = n.hoverSize,
            c = n.hoverAnchor,
            p = n.label,
            l = new mapgl.Marker(this.map, {
          coordinates: e,
          icon: r,
          size: i,
          anchor: s,
          hoverIcon: u,
          hoverSize: a,
          hoverAnchor: c,
          label: p
        });
        I.forEach(function (t) {
          return l.on(t, function (e) {
            var r = {
              originalEvent: e.originalEvent,
              lngLat: e.lngLat,
              point: e.point,
              target: {
                type: "marker",
                data: n
              }
            };
            o.emit(t, r);
          });
        }), this.markers.set(t, l);
      }, e.prototype._createCluster = function (t, o, n) {
        var i,
            s = this,
            u = "function" == typeof this.options.clusterStyle ? _r(_r({}, e.options.clusterStyle), this.options.clusterStyle(n)) : this.options.clusterStyle,
            a = new mapgl.Marker(this.map, {
          coordinates: o,
          zIndex: 0,
          icon: u.icon,
          size: u.size,
          anchor: u.anchor,
          hoverIcon: u.hoverIcon,
          hoverSize: u.hoverSize,
          hoverAnchor: u.hoverAnchor,
          label: {
            text: null !== (i = u.labelText) && void 0 !== i ? i : String(n),
            color: u.labelColor,
            fontSize: u.labelFontSize,
            haloRadius: u.labelHaloRadius,
            haloColor: u.labelHaloColor,
            letterSpacing: u.labelLetterSpacing,
            anchor: u.labelAnchor
          }
        }),
            c = this.supercluster.getLeaves(t, 1 / 0).map(function (t) {
          return s.inputMarkers[t.properties.index];
        });
        I.forEach(function (t) {
          return a.on(t, function (e) {
            var o = {
              originalEvent: e.originalEvent,
              lngLat: e.lngLat,
              point: e.point,
              target: {
                type: "cluster",
                data: c
              }
            };
            s.emit(t, o);
          });
        }), this.clusters.set(t, a);
      }, e.options = {
        radius: 80,
        clusterStyle: {
          icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj48Y2lyY2xlIGZpbGw9IiM0OGQ5NWQiIGN4PSIxNSIgY3k9IjE1IiByPSIxNSIvPjwvc3ZnPg==",
          labelColor: "#000000",
          labelFontSize: 14,
          labelText: void 0
        }
      }, e;
    }(S);

    "mapgl" in window ? mapgl.Clusterer = j : console.error("Looks like you did not load MapGL API correctly");
  }]);
});