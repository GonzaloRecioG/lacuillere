! function(t, e) {
    if ("function" == typeof define && define.amd) define("shopify-buy", ["module"], e);
    else if ("undefined" != typeof exports) e(module);
    else {
        var r = {
            exports: {}
        };
        e(r), t.ShopifyBuy = r.exports
    }
}(this, function(t) {
    "use strict";

    function e(t) {
        if (Array.isArray(t)) {
            for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
            return r
        }
        return Array.from(t)
    }

    function r(t, e) {
        return e = {
            exports: {}
        }, t(e, e.exports), e.exports
    }

    function n(t, e) {
        ei[t] || (ei[t] = e)
    }

    function i(t) {
        return ei[t]
    }

    function o(t, e) {
        function r() {
            var r = this.super;
            this.super = function() {
                return e.apply(this, arguments)
            };
            var n = t.apply(this, arguments);
            return this.super = r, n
        }
        return r.wrappedFunction = t, r
    }

    function a(t, e, r) {
        var n = Object.getPrototypeOf(r);
        t.forEach(function(t) {
            var i = Object.getOwnPropertyDescriptor(e, t),
                a = n.hasOwnProperty(t) && Object.getOwnPropertyDescriptor(n, t);
            if ("function" == typeof a.value && "function" == typeof i.value) {
                var u = o(i.value, a.value);
                Object.defineProperty(r, t, {
                    value: u
                })
            } else Object.defineProperty(r, t, i)
        })
    }

    function u(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Object,
            r = o(t.constructor, e),
            n = Object.getOwnPropertyNames(t).filter(function(t) {
                return !ai(["constructor", "static"], t)
            });
        ii(r, e), r.prototype = Object.create(e.prototype), a(n, t, r.prototype), r.prototype.constructor = r;
        var i = t.static;
        if (i) {
            var u = Object.getOwnPropertyNames(i);
            a(u, i, r)
        }
        return r
    }

    function s(t) {
        var r = function() {
            var e = void 0;
            e = console[t] ? Function.prototype.bind.call(console[t], console) : Function.prototype.bind.call(console.log, console), e.apply(void 0, arguments)
        };
        return function() {
            var t = [].concat(Array.prototype.slice.call(arguments));
            t.unshift("[JS-BUY-SDK]: "), r.apply(void 0, e(t))
        }
    }

    function c(t, e) {
        var r = void 0;
        if (e.headers && Object.keys(e.headers).forEach(function(t) {
                "authorization" === t.toLowerCase() && (r = e.headers[t])
            }), r) {
            var n = r.split(" ").slice(-1)[0];
            try {
                var i = atob(n),
                    o = void 0;
                return o = t.indexOf("?") > -1 ? t + "&_x_http_authorization=" + i : t + "?_x_http_authorization=" + i
            } catch (t) {}
        }
        return t
    }

    function f(t, e, r) {
        return new Promise(function(n, i) {
            function o() {
                i(new Error("There was an error with the XDR"))
            }
            var a = new XDomainRequest;
            a.onload = function() {
                try {
                    var t = JSON.parse(a.responseText);
                    n({
                        json: t,
                        originalResponse: a,
                        isJSON: !0
                    })
                } catch (t) {
                    n({
                        text: a.responseText,
                        originalResponse: a,
                        isText: !0
                    })
                }
            }, a.onerror = o, a.ontimeout = o, a.open(t, c(e, r)), a.send(r.data)
        })
    }

    function l() {
        var t = "undefined" == typeof window,
            e = "function" == typeof require;
        return t && e
    }

    function h(t) {
        if (t.status >= 200 && t.status < 300) return t;
        var e = new Error(t.statusText);
        throw e.status = t.status, e.response = t, e
    }

    function p(t) {
        return t.json().then(function(e) {
            return {
                json: e,
                originalResponse: t,
                isJSON: !0
            }
        }).catch(function() {
            var e = t.clone();
            return e.text().then(function(t) {
                return {
                    text: t,
                    originalResponse: e,
                    isText: !0
                }
            })
        })
    }

    function d(t, e) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (!l()) {
            var n = new XMLHttpRequest;
            if (!("withCredentials" in n)) return f.apply(void 0, arguments)
        }
        return r.method = t, r.mode = "cors", fetch(e, r).then(h).then(p)
    }

    function v() {
        return ++xi
    }

    function m(t) {
        if (t && t[wi]) return t[wi];
        if (void 0 === t) return "(undefined)";
        if (null === t) return "(null)";
        var e = "undefined" == typeof t ? "undefined" : b(t),
            r = void 0;
        switch (e) {
            case "number":
                r = ji[t], r || (r = ji[t] = "nu" + t);
                break;
            case "string":
                r = Ti[t], r || (r = Ti[t] = "st" + v());
                break;
            case "boolean":
                r = t ? "(true)" : "(false)";
                break;
            default:
                if (t === Object) {
                    r = "(Object)";
                    break
                }
                if (t === Array) {
                    r = "(Array)";
                    break
                }
                r = _i + "." + v(), null === t[wi] ? t[wi] = r : (Oi.value = r, Object.defineProperty(t, wi, Oi))
        }
        return r
    }

    function y(t, e) {
        return t === e || Object.keys(t).every(function(r) {
            return t[r] instanceof Date ? t[r].toString() === e[r].toString() : "object" === b(t[r]) ? y(t[r], e[r]) : t[r] === e[r]
        })
    }

    function g(t, e) {
        var r = void 0;
        switch (t) {
            case "all":
                r = function() {
                    return this.fetchAll(e)
                };
                break;
            case "one":
                r = function() {
                    return this.fetch.apply(this, [e].concat(Array.prototype.slice.call(arguments)))
                };
                break;
            case "query":
                r = function() {
                    return this.fetchQuery.apply(this, [e].concat(Array.prototype.slice.call(arguments)))
                }
        }
        return r
    }
    var b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    ! function() {
        function t(t) {
            if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
            return t.toLowerCase()
        }

        function e(t) {
            return "string" != typeof t && (t = String(t)), t
        }

        function r(t) {
            this.map = {}, t instanceof r ? t.forEach(function(t, e) {
                this.append(e, t)
            }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                this.append(e, t[e])
            }, this)
        }

        function n(t) {
            return t.bodyUsed ? Promise.reject(new TypeError("Already read")) : void(t.bodyUsed = !0)
        }

        function i(t) {
            return new Promise(function(e, r) {
                t.onload = function() {
                    e(t.result)
                }, t.onerror = function() {
                    r(t.error)
                }
            })
        }

        function o(t) {
            var e = new FileReader;
            return e.readAsArrayBuffer(t), i(e)
        }

        function a(t) {
            var e = new FileReader;
            return e.readAsText(t), i(e)
        }

        function u() {
            return this.bodyUsed = !1, this._initBody = function(t) {
                if (this._bodyInit = t, "string" == typeof t) this._bodyText = t;
                else if (p.blob && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t;
                else if (p.formData && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
                else if (t) {
                    if (!p.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t)) throw new Error("unsupported BodyInit type")
                } else this._bodyText = ""
            }, p.blob ? (this.blob = function() {
                var t = n(this);
                if (t) return t;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function() {
                return this.blob().then(o)
            }, this.text = function() {
                var t = n(this);
                if (t) return t;
                if (this._bodyBlob) return a(this._bodyBlob);
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }) : this.text = function() {
                var t = n(this);
                return t ? t : Promise.resolve(this._bodyText)
            }, p.formData && (this.formData = function() {
                return this.text().then(f)
            }), this.json = function() {
                return this.text().then(JSON.parse)
            }, this
        }

        function s(t) {
            var e = t.toUpperCase();
            return d.indexOf(e) > -1 ? e : t
        }

        function c(t, e) {
            e = e || {};
            var n = e.body;
            if (c.prototype.isPrototypeOf(t)) {
                if (t.bodyUsed) throw new TypeError("Already read");
                this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new r(t.headers)), this.method = t.method, this.mode = t.mode, n || (n = t._bodyInit, t.bodyUsed = !0)
            } else this.url = t;
            if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new r(e.headers)), this.method = s(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(n)
        }

        function f(t) {
            var e = new FormData;
            return t.trim().split("&").forEach(function(t) {
                if (t) {
                    var r = t.split("="),
                        n = r.shift().replace(/\+/g, " "),
                        i = r.join("=").replace(/\+/g, " ");
                    e.append(decodeURIComponent(n), decodeURIComponent(i))
                }
            }), e
        }

        function l(t) {
            var e = new r,
                n = t.getAllResponseHeaders().trim().split("\n");
            return n.forEach(function(t) {
                var r = t.trim().split(":"),
                    n = r.shift().trim(),
                    i = r.join(":").trim();
                e.append(n, i)
            }), e
        }

        function h(t, e) {
            e || (e = {}), this._initBody(t), this.type = "default", this.status = e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = e.statusText, this.headers = e.headers instanceof r ? e.headers : new r(e.headers), this.url = e.url || ""
        }
        if (!self.fetch) {
            r.prototype.append = function(r, n) {
                r = t(r), n = e(n);
                var i = this.map[r];
                i || (i = [], this.map[r] = i), i.push(n)
            }, r.prototype.delete = function(e) {
                delete this.map[t(e)]
            }, r.prototype.get = function(e) {
                var r = this.map[t(e)];
                return r ? r[0] : null
            }, r.prototype.getAll = function(e) {
                return this.map[t(e)] || []
            }, r.prototype.has = function(e) {
                return this.map.hasOwnProperty(t(e))
            }, r.prototype.set = function(r, n) {
                this.map[t(r)] = [e(n)]
            }, r.prototype.forEach = function(t, e) {
                Object.getOwnPropertyNames(this.map).forEach(function(r) {
                    this.map[r].forEach(function(n) {
                        t.call(e, n, r, this)
                    }, this)
                }, this)
            };
            var p = {
                    blob: "FileReader" in self && "Blob" in self && function() {
                        try {
                            return new Blob, !0
                        } catch (t) {
                            return !1
                        }
                    }(),
                    formData: "FormData" in self,
                    arrayBuffer: "ArrayBuffer" in self
                },
                d = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            c.prototype.clone = function() {
                return new c(this)
            }, u.call(c.prototype), u.call(h.prototype), h.prototype.clone = function() {
                return new h(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new r(this.headers),
                    url: this.url
                })
            }, h.error = function() {
                var t = new h(null, {
                    status: 0,
                    statusText: ""
                });
                return t.type = "error", t
            };
            var v = [301, 302, 303, 307, 308];
            h.redirect = function(t, e) {
                if (v.indexOf(e) === -1) throw new RangeError("Invalid status code");
                return new h(null, {
                    status: e,
                    headers: {
                        location: t
                    }
                })
            }, self.Headers = r, self.Request = c, self.Response = h, self.fetch = function(t, e) {
                return new Promise(function(r, n) {
                    function i() {
                        return "responseURL" in a ? a.responseURL : /^X-Request-URL:/m.test(a.getAllResponseHeaders()) ? a.getResponseHeader("X-Request-URL") : void 0
                    }
                    var o;
                    o = c.prototype.isPrototypeOf(t) && !e ? t : new c(t, e);
                    var a = new XMLHttpRequest;
                    a.onload = function() {
                        var t = 1223 === a.status ? 204 : a.status;
                        if (t < 100 || t > 599) return void n(new TypeError("Network request failed"));
                        var e = {
                                status: t,
                                statusText: a.statusText,
                                headers: l(a),
                                url: i()
                            },
                            o = "response" in a ? a.response : a.responseText;
                        r(new h(o, e))
                    }, a.onerror = function() {
                        n(new TypeError("Network request failed"))
                    }, a.open(o.method, o.url, !0), "include" === o.credentials && (a.withCredentials = !0), "responseType" in a && p.blob && (a.responseType = "blob"), o.headers.forEach(function(t, e) {
                        a.setRequestHeader(e, t)
                    }), a.send("undefined" == typeof o._bodyInit ? null : o._bodyInit)
                })
            }, self.fetch.polyfill = !0
        }
    }();
    var w = {}.toString,
        _ = function(t) {
            return w.call(t).slice(8, -1)
        },
        O = r(function(t) {
            var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = e)
        }),
        x = O,
        j = "__core-js_shared__",
        T = x[j] || (x[j] = {}),
        S = function(t) {
            return T[t] || (T[t] = {})
        },
        P = 0,
        A = Math.random(),
        E = function(t) {
            return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++P + A).toString(36))
        },
        I = r(function(t) {
            var e = S("wks"),
                r = E,
                n = O.Symbol,
                i = "function" == typeof n,
                o = t.exports = function(t) {
                    return e[t] || (e[t] = i && n[t] || (i ? n : r)("Symbol." + t))
                };
            o.store = e
        }),
        F = _,
        C = I("toStringTag"),
        R = "Arguments" == F(function() {
            return arguments
        }()),
        z = function(t, e) {
            try {
                return t[e]
            } catch (t) {}
        },
        k = function(t) {
            var e, r, n;
            return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(r = z(e = Object(t), C)) ? r : R ? F(e) : "Object" == (n = F(e)) && "function" == typeof e.callee ? "Arguments" : n
        },
        M = function(t) {
            return "object" === ("undefined" == typeof t ? "undefined" : b(t)) ? null !== t : "function" == typeof t
        },
        U = M,
        q = function(t) {
            if (!U(t)) throw TypeError(t + " is not an object!");
            return t
        },
        D = function(t) {
            try {
                return !!t()
            } catch (t) {
                return !0
            }
        },
        B = !D(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        }),
        L = M,
        K = O.document,
        N = L(K) && L(K.createElement),
        V = function(t) {
            return N ? K.createElement(t) : {}
        },
        H = !B && !D(function() {
            return 7 != Object.defineProperty(V("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        }),
        G = M,
        X = function(t, e) {
            if (!G(t)) return t;
            var r, n;
            if (e && "function" == typeof(r = t.toString) && !G(n = r.call(t))) return n;
            if ("function" == typeof(r = t.valueOf) && !G(n = r.call(t))) return n;
            if (!e && "function" == typeof(r = t.toString) && !G(n = r.call(t))) return n;
            throw TypeError("Can't convert object to primitive value")
        },
        J = q,
        Q = H,
        W = X,
        Y = Object.defineProperty,
        $ = B ? Object.defineProperty : function(t, e, r) {
            if (J(t), e = W(e, !0), J(r), Q) try {
                return Y(t, e, r)
            } catch (t) {}
            if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
            return "value" in r && (t[e] = r.value), t
        },
        Z = {
            f: $
        },
        tt = function(t, e) {
            return {
                enumerable: !(1 & t),
                configurable: !(2 & t),
                writable: !(4 & t),
                value: e
            }
        },
        et = Z,
        rt = tt,
        nt = B ? function(t, e, r) {
            return et.f(t, e, rt(1, r))
        } : function(t, e, r) {
            return t[e] = r, t
        },
        it = {}.hasOwnProperty,
        ot = function(t, e) {
            return it.call(t, e)
        },
        at = r(function(t) {
            var e = t.exports = {
                version: "2.4.0"
            };
            "number" == typeof __e && (__e = e)
        }),
        ut = r(function(t) {
            var e = O,
                r = nt,
                n = ot,
                i = E("src"),
                o = "toString",
                a = Function[o],
                u = ("" + a).split(o);
            at.inspectSource = function(t) {
                return a.call(t)
            }, (t.exports = function(t, o, a, s) {
                var c = "function" == typeof a;
                c && (n(a, "name") || r(a, "name", o)), t[o] !== a && (c && (n(a, i) || r(a, i, t[o] ? "" + t[o] : u.join(String(o)))), t === e ? t[o] = a : s ? t[o] ? t[o] = a : r(t, o, a) : (delete t[o], r(t, o, a)))
            })(Function.prototype, o, function() {
                return "function" == typeof this && this[i] || a.call(this)
            })
        }),
        st = k,
        ct = {};
    ct[I("toStringTag")] = "z", ct + "" != "[object z]" && ut(Object.prototype, "toString", function() {
        return "[object " + st(this) + "]"
    }, !0);
    var ft = Math.ceil,
        lt = Math.floor,
        ht = function(t) {
            return isNaN(t = +t) ? 0 : (t > 0 ? lt : ft)(t)
        },
        pt = function(t) {
            if (void 0 == t) throw TypeError("Can't call method on  " + t);
            return t
        },
        dt = ht,
        vt = pt,
        mt = function(t) {
            return function(e, r) {
                var n, i, o = String(vt(e)),
                    a = dt(r),
                    u = o.length;
                return a < 0 || a >= u ? t ? "" : void 0 : (n = o.charCodeAt(a), n < 55296 || n > 56319 || a + 1 === u || (i = o.charCodeAt(a + 1)) < 56320 || i > 57343 ? t ? o.charAt(a) : n : t ? o.slice(a, a + 2) : (n - 55296 << 10) + (i - 56320) + 65536)
            }
        },
        yt = !1,
        gt = function(t) {
            if ("function" != typeof t) throw TypeError(t + " is not a function!");
            return t
        },
        bt = gt,
        wt = function(t, e, r) {
            if (bt(t), void 0 === e) return t;
            switch (r) {
                case 1:
                    return function(r) {
                        return t.call(e, r)
                    };
                case 2:
                    return function(r, n) {
                        return t.call(e, r, n)
                    };
                case 3:
                    return function(r, n, i) {
                        return t.call(e, r, n, i)
                    }
            }
            return function() {
                return t.apply(e, arguments)
            }
        },
        _t = O,
        Ot = at,
        xt = nt,
        jt = ut,
        Tt = wt,
        St = "prototype",
        Pt = function t(e, r, n) {
            var i, o, a, u, s = e & t.F,
                c = e & t.G,
                f = e & t.S,
                l = e & t.P,
                h = e & t.B,
                p = c ? _t : f ? _t[r] || (_t[r] = {}) : (_t[r] || {})[St],
                d = c ? Ot : Ot[r] || (Ot[r] = {}),
                v = d[St] || (d[St] = {});
            c && (n = r);
            for (i in n) o = !s && p && void 0 !== p[i], a = (o ? p : n)[i], u = h && o ? Tt(a, _t) : l && "function" == typeof a ? Tt(Function.call, a) : a, p && jt(p, i, a, e & t.U), d[i] != a && xt(d, i, u), l && v[i] != a && (v[i] = a)
        };
    _t.core = Ot, Pt.F = 1, Pt.G = 2, Pt.S = 4, Pt.P = 8, Pt.B = 16, Pt.W = 32, Pt.U = 64, Pt.R = 128;
    var At = Pt,
        Et = {},
        It = _,
        Ft = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
            return "String" == It(t) ? t.split("") : Object(t)
        },
        Ct = Ft,
        Rt = pt,
        zt = function(t) {
            return Ct(Rt(t))
        },
        kt = ht,
        Mt = Math.min,
        Ut = function(t) {
            return t > 0 ? Mt(kt(t), 9007199254740991) : 0
        },
        qt = ht,
        Dt = Math.max,
        Bt = Math.min,
        Lt = function(t, e) {
            return t = qt(t), t < 0 ? Dt(t + e, 0) : Bt(t, e)
        },
        Kt = zt,
        Nt = Ut,
        Vt = Lt,
        Ht = function(t) {
            return function(e, r, n) {
                var i, o = Kt(e),
                    a = Nt(o.length),
                    u = Vt(n, a);
                if (t && r != r) {
                    for (; a > u;)
                        if (i = o[u++], i != i) return !0
                } else
                    for (; a > u; u++)
                        if ((t || u in o) && o[u] === r) return t || u || 0; return !t && -1
            }
        },
        Gt = S("keys"),
        Xt = E,
        Jt = function(t) {
            return Gt[t] || (Gt[t] = Xt(t))
        },
        Qt = ot,
        Wt = zt,
        Yt = Ht(!1),
        $t = Jt("IE_PROTO"),
        Zt = function(t, e) {
            var r, n = Wt(t),
                i = 0,
                o = [];
            for (r in n) r != $t && Qt(n, r) && o.push(r);
            for (; e.length > i;) Qt(n, r = e[i++]) && (~Yt(o, r) || o.push(r));
            return o
        },
        te = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
        ee = Zt,
        re = te,
        ne = Object.keys || function(t) {
            return ee(t, re)
        },
        ie = Z,
        oe = q,
        ae = ne,
        ue = B ? Object.defineProperties : function(t, e) {
            oe(t);
            for (var r, n = ae(e), i = n.length, o = 0; i > o;) ie.f(t, r = n[o++], e[r]);
            return t
        },
        se = O.document && document.documentElement,
        ce = q,
        fe = ue,
        le = te,
        he = Jt("IE_PROTO"),
        pe = function() {},
        de = "prototype",
        ve = function() {
            var t, e = V("iframe"),
                r = le.length,
                n = "<",
                i = ">";
            for (e.style.display = "none", se.appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write(n + "script" + i + "document.F=Object" + n + "/script" + i), t.close(), ve = t.F; r--;) delete ve[de][le[r]];
            return ve()
        },
        me = Object.create || function(t, e) {
            var r;
            return null !== t ? (pe[de] = ce(t), r = new pe, pe[de] = null, r[he] = t) : r = ve(), void 0 === e ? r : fe(r, e)
        },
        ye = Z.f,
        ge = ot,
        be = I("toStringTag"),
        we = function(t, e, r) {
            t && !ge(t = r ? t : t.prototype, be) && ye(t, be, {
                configurable: !0,
                value: e
            })
        },
        _e = me,
        Oe = tt,
        xe = we,
        je = {};
    nt(je, I("iterator"), function() {
        return this
    });
    var Te = function(t, e, r) {
            t.prototype = _e(je, {
                next: Oe(1, r)
            }), xe(t, e + " Iterator")
        },
        Se = pt,
        Pe = function(t) {
            return Object(Se(t))
        },
        Ae = ot,
        Ee = Pe,
        Ie = Jt("IE_PROTO"),
        Fe = Object.prototype,
        Ce = Object.getPrototypeOf || function(t) {
            return t = Ee(t), Ae(t, Ie) ? t[Ie] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? Fe : null
        },
        Re = yt,
        ze = At,
        ke = ut,
        Me = nt,
        Ue = ot,
        qe = Et,
        De = Te,
        Be = we,
        Le = Ce,
        Ke = I("iterator"),
        Ne = !([].keys && "next" in [].keys()),
        Ve = "@@iterator",
        He = "keys",
        Ge = "values",
        Xe = function() {
            return this
        },
        Je = function(t, e, r, n, i, o, a) {
            De(r, e, n);
            var u, s, c, f = function(t) {
                    if (!Ne && t in d) return d[t];
                    switch (t) {
                        case He:
                            return function() {
                                return new r(this, t)
                            };
                        case Ge:
                            return function() {
                                return new r(this, t)
                            }
                    }
                    return function() {
                        return new r(this, t)
                    }
                },
                l = e + " Iterator",
                h = i == Ge,
                p = !1,
                d = t.prototype,
                v = d[Ke] || d[Ve] || i && d[i],
                m = v || f(i),
                y = i ? h ? f("entries") : m : void 0,
                g = "Array" == e ? d.entries || v : v;
            if (g && (c = Le(g.call(new t)), c !== Object.prototype && (Be(c, l, !0), Re || Ue(c, Ke) || Me(c, Ke, Xe))), h && v && v.name !== Ge && (p = !0, m = function() {
                    return v.call(this)
                }), Re && !a || !Ne && !p && d[Ke] || Me(d, Ke, m), qe[e] = m, qe[l] = Xe, i)
                if (u = {
                        values: h ? m : f(Ge),
                        keys: o ? m : f(He),
                        entries: y
                    }, a)
                    for (s in u) s in d || ke(d, s, u[s]);
                else ze(ze.P + ze.F * (Ne || p), e, u);
            return u
        },
        Qe = mt(!0);
    Je(String, "String", function(t) {
        this._t = String(t), this._i = 0
    }, function() {
        var t, e = this._t,
            r = this._i;
        return r >= e.length ? {
            value: void 0,
            done: !0
        } : (t = Qe(e, r), this._i += t.length, {
            value: t,
            done: !1
        })
    });
    var We = I("unscopables"),
        Ye = Array.prototype;
    void 0 == Ye[We] && nt(Ye, We, {});
    var $e = function(t) {
            Ye[We][t] = !0
        },
        Ze = function(t, e) {
            return {
                value: e,
                done: !!t
            }
        },
        tr = $e,
        er = Ze,
        rr = Et,
        nr = zt,
        ir = Je(Array, "Array", function(t, e) {
            this._t = nr(t), this._i = 0, this._k = e
        }, function() {
            var t = this._t,
                e = this._k,
                r = this._i++;
            return !t || r >= t.length ? (this._t = void 0, er(1)) : "keys" == e ? er(0, r) : "values" == e ? er(0, t[r]) : er(0, [r, t[r]])
        }, "values");
    rr.Arguments = rr.Array, tr("keys"), tr("values"), tr("entries");
    for (var or = ir, ar = ut, ur = O, sr = nt, cr = Et, fr = I, lr = fr("iterator"), hr = fr("toStringTag"), pr = cr.Array, dr = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], vr = 0; vr < 5; vr++) {
        var mr, yr = dr[vr],
            gr = ur[yr],
            br = gr && gr.prototype;
        if (br) {
            br[lr] || sr(br, lr, pr), br[hr] || sr(br, hr, yr), cr[yr] = pr;
            for (mr in or) br[mr] || ar(br, mr, or[mr], !0)
        }
    }
    var wr, _r, Or, xr = function(t, e, r, n) {
            if (!(t instanceof e) || void 0 !== n && n in t) throw TypeError(r + ": incorrect invocation!");
            return t
        },
        jr = q,
        Tr = function(t, e, r, n) {
            try {
                return n ? e(jr(r)[0], r[1]) : e(r)
            } catch (e) {
                var i = t.return;
                throw void 0 !== i && jr(i.call(t)), e
            }
        },
        Sr = Et,
        Pr = I("iterator"),
        Ar = Array.prototype,
        Er = function(t) {
            return void 0 !== t && (Sr.Array === t || Ar[Pr] === t)
        },
        Ir = k,
        Fr = I("iterator"),
        Cr = Et,
        Rr = at.getIteratorMethod = function(t) {
            if (void 0 != t) return t[Fr] || t["@@iterator"] || Cr[Ir(t)]
        },
        zr = r(function(t) {
            var e = wt,
                r = Tr,
                n = Er,
                i = q,
                o = Ut,
                a = Rr,
                u = {},
                s = {},
                c = t.exports = function(t, c, f, l, h) {
                    var p, d, v, m, y = h ? function() {
                            return t
                        } : a(t),
                        g = e(f, l, c ? 2 : 1),
                        b = 0;
                    if ("function" != typeof y) throw TypeError(t + " is not iterable!");
                    if (n(y)) {
                        for (p = o(t.length); p > b; b++)
                            if (m = c ? g(i(d = t[b])[0], d[1]) : g(t[b]), m === u || m === s) return m
                    } else
                        for (v = y.call(t); !(d = v.next()).done;)
                            if (m = r(v, g, d.value, c), m === u || m === s) return m
                };
            c.BREAK = u, c.RETURN = s
        }),
        kr = q,
        Mr = gt,
        Ur = I("species"),
        qr = function(t, e) {
            var r, n = kr(t).constructor;
            return void 0 === n || void 0 == (r = kr(n)[Ur]) ? e : Mr(r)
        },
        Dr = function(t, e, r) {
            var n = void 0 === r;
            switch (e.length) {
                case 0:
                    return n ? t() : t.call(r);
                case 1:
                    return n ? t(e[0]) : t.call(r, e[0]);
                case 2:
                    return n ? t(e[0], e[1]) : t.call(r, e[0], e[1]);
                case 3:
                    return n ? t(e[0], e[1], e[2]) : t.call(r, e[0], e[1], e[2]);
                case 4:
                    return n ? t(e[0], e[1], e[2], e[3]) : t.call(r, e[0], e[1], e[2], e[3])
            }
            return t.apply(r, e)
        },
        Br = wt,
        Lr = Dr,
        Kr = se,
        Nr = V,
        Vr = O,
        Hr = Vr.process,
        Gr = Vr.setImmediate,
        Xr = Vr.clearImmediate,
        Jr = Vr.MessageChannel,
        Qr = 0,
        Wr = {},
        Yr = "onreadystatechange",
        $r = function() {
            var t = +this;
            if (Wr.hasOwnProperty(t)) {
                var e = Wr[t];
                delete Wr[t], e()
            }
        },
        Zr = function(t) {
            $r.call(t.data)
        };
    Gr && Xr || (Gr = function(t) {
        for (var e = [], r = 1; arguments.length > r;) e.push(arguments[r++]);
        return Wr[++Qr] = function() {
            Lr("function" == typeof t ? t : Function(t), e)
        }, wr(Qr), Qr
    }, Xr = function(t) {
        delete Wr[t]
    }, "process" == _(Hr) ? wr = function(t) {
        Hr.nextTick(Br($r, t, 1))
    } : Jr ? (_r = new Jr, Or = _r.port2, _r.port1.onmessage = Zr, wr = Br(Or.postMessage, Or, 1)) : Vr.addEventListener && "function" == typeof postMessage && !Vr.importScripts ? (wr = function(t) {
        Vr.postMessage(t + "", "*")
    }, Vr.addEventListener("message", Zr, !1)) : wr = Yr in Nr("script") ? function(t) {
        Kr.appendChild(Nr("script"))[Yr] = function() {
            Kr.removeChild(this), $r.call(t)
        }
    } : function(t) {
        setTimeout(Br($r, t, 1), 0)
    });
    var tn = {
            set: Gr,
            clear: Xr
        },
        en = O,
        rn = tn.set,
        nn = en.MutationObserver || en.WebKitMutationObserver,
        on = en.process,
        an = en.Promise,
        un = "process" == _(on),
        sn = function() {
            var t, e, r, n = function() {
                var n, i;
                for (un && (n = on.domain) && n.exit(); t;) {
                    i = t.fn, t = t.next;
                    try {
                        i()
                    } catch (n) {
                        throw t ? r() : e = void 0, n
                    }
                }
                e = void 0, n && n.enter()
            };
            if (un) r = function() {
                on.nextTick(n)
            };
            else if (nn) {
                var i = !0,
                    o = document.createTextNode("");
                new nn(n).observe(o, {
                    characterData: !0
                }), r = function() {
                    o.data = i = !i
                }
            } else if (an && an.resolve) {
                var a = an.resolve();
                r = function() {
                    a.then(n)
                }
            } else r = function() {
                rn.call(en, n)
            };
            return function(n) {
                var i = {
                    fn: n,
                    next: void 0
                };
                e && (e.next = i), t || (t = i, r()), e = i
            }
        },
        cn = ut,
        fn = function(t, e, r) {
            for (var n in e) cn(t, n, e[n], r);
            return t
        },
        ln = O,
        hn = Z,
        pn = B,
        dn = I("species"),
        vn = function(t) {
            var e = ln[t];
            pn && e && !e[dn] && hn.f(e, dn, {
                configurable: !0,
                get: function() {
                    return this
                }
            })
        },
        mn = I("iterator"),
        yn = !1;
    try {
        var gn = [7][mn]();
        gn.return = function() {
            yn = !0
        }, Array.from(gn, function() {
            throw 2
        })
    } catch (t) {}
    var bn, wn, _n, On = function(t, e) {
            if (!e && !yn) return !1;
            var r = !1;
            try {
                var n = [7],
                    i = n[mn]();
                i.next = function() {
                    return {
                        done: r = !0
                    }
                }, n[mn] = function() {
                    return i
                }, t(n)
            } catch (t) {}
            return r
        },
        xn = yt,
        jn = O,
        Tn = wt,
        Sn = k,
        Pn = At,
        An = M,
        En = gt,
        In = xr,
        Fn = zr,
        Cn = qr,
        Rn = tn.set,
        zn = sn(),
        kn = "Promise",
        Mn = jn.TypeError,
        Un = jn.process,
        qn = jn[kn],
        Un = jn.process,
        Dn = "process" == Sn(Un),
        Bn = function() {},
        Ln = !! function() {
            try {
                var t = qn.resolve(1),
                    e = (t.constructor = {})[I("species")] = function(t) {
                        t(Bn, Bn)
                    };
                return (Dn || "function" == typeof PromiseRejectionEvent) && t.then(Bn) instanceof e
            } catch (t) {}
        }(),
        Kn = function(t, e) {
            return t === e || t === qn && e === _n
        },
        Nn = function(t) {
            var e;
            return !(!An(t) || "function" != typeof(e = t.then)) && e
        },
        Vn = function(t) {
            return Kn(qn, t) ? new Hn(t) : new wn(t)
        },
        Hn = wn = function(t) {
            var e, r;
            this.promise = new t(function(t, n) {
                if (void 0 !== e || void 0 !== r) throw Mn("Bad Promise constructor");
                e = t, r = n
            }), this.resolve = En(e), this.reject = En(r)
        },
        Gn = function(t) {
            try {
                t()
            } catch (t) {
                return {
                    error: t
                }
            }
        },
        Xn = function(t, e) {
            if (!t._n) {
                t._n = !0;
                var r = t._c;
                zn(function() {
                    for (var n = t._v, i = 1 == t._s, o = 0, a = function(e) {
                            var r, o, a = i ? e.ok : e.fail,
                                u = e.resolve,
                                s = e.reject,
                                c = e.domain;
                            try {
                                a ? (i || (2 == t._h && Wn(t), t._h = 1), a === !0 ? r = n : (c && c.enter(), r = a(n), c && c.exit()), r === e.promise ? s(Mn("Promise-chain cycle")) : (o = Nn(r)) ? o.call(r, u, s) : u(r)) : s(n)
                            } catch (t) {
                                s(t)
                            }
                        }; r.length > o;) a(r[o++]);
                    t._c = [], t._n = !1, e && !t._h && Jn(t)
                })
            }
        },
        Jn = function(t) {
            Rn.call(jn, function() {
                var e, r, n, i = t._v;
                if (Qn(t) && (e = Gn(function() {
                        Dn ? Un.emit("unhandledRejection", i, t) : (r = jn.onunhandledrejection) ? r({
                            promise: t,
                            reason: i
                        }) : (n = jn.console) && n.error && n.error("Unhandled promise rejection", i)
                    }), t._h = Dn || Qn(t) ? 2 : 1), t._a = void 0, e) throw e.error
            })
        },
        Qn = function t(e) {
            if (1 == e._h) return !1;
            for (var r, n = e._a || e._c, i = 0; n.length > i;)
                if (r = n[i++], r.fail || !t(r.promise)) return !1;
            return !0
        },
        Wn = function(t) {
            Rn.call(jn, function() {
                var e;
                Dn ? Un.emit("rejectionHandled", t) : (e = jn.onrejectionhandled) && e({
                    promise: t,
                    reason: t._v
                })
            })
        },
        Yn = function(t) {
            var e = this;
            e._d || (e._d = !0, e = e._w || e, e._v = t, e._s = 2, e._a || (e._a = e._c.slice()), Xn(e, !0))
        },
        $n = function t(e) {
            var r, n = this;
            if (!n._d) {
                n._d = !0, n = n._w || n;
                try {
                    if (n === e) throw Mn("Promise can't be resolved itself");
                    (r = Nn(e)) ? zn(function() {
                        var i = {
                            _w: n,
                            _d: !1
                        };
                        try {
                            r.call(e, Tn(t, i, 1), Tn(Yn, i, 1))
                        } catch (t) {
                            Yn.call(i, t)
                        }
                    }): (n._v = e, n._s = 1, Xn(n, !1))
                } catch (t) {
                    Yn.call({
                        _w: n,
                        _d: !1
                    }, t)
                }
            }
        };
    Ln || (qn = function(t) {
        In(this, qn, kn, "_h"), En(t), bn.call(this);
        try {
            t(Tn($n, this, 1), Tn(Yn, this, 1))
        } catch (t) {
            Yn.call(this, t)
        }
    }, bn = function(t) {
        this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
    }, bn.prototype = fn(qn.prototype, {
        then: function(t, e) {
            var r = Vn(Cn(this, qn));
            return r.ok = "function" != typeof t || t, r.fail = "function" == typeof e && e, r.domain = Dn ? Un.domain : void 0, this._c.push(r), this._a && this._a.push(r), this._s && Xn(this, !1), r.promise
        },
        catch: function(t) {
            return this.then(void 0, t)
        }
    }), Hn = function() {
        var t = new bn;
        this.promise = t, this.resolve = Tn($n, t, 1), this.reject = Tn(Yn, t, 1)
    }), Pn(Pn.G + Pn.W + Pn.F * !Ln, {
        Promise: qn
    }), we(qn, kn), vn(kn), _n = at[kn], Pn(Pn.S + Pn.F * !Ln, kn, {
        reject: function(t) {
            var e = Vn(this),
                r = e.reject;
            return r(t), e.promise
        }
    }), Pn(Pn.S + Pn.F * (xn || !Ln), kn, {
        resolve: function(t) {
            if (t instanceof qn && Kn(t.constructor, this)) return t;
            var e = Vn(this),
                r = e.resolve;
            return r(t), e.promise
        }
    }), Pn(Pn.S + Pn.F * !(Ln && On(function(t) {
        qn.all(t).catch(Bn)
    })), kn, {
        all: function(t) {
            var e = this,
                r = Vn(e),
                n = r.resolve,
                i = r.reject,
                o = Gn(function() {
                    var r = [],
                        o = 0,
                        a = 1;
                    Fn(t, !1, function(t) {
                        var u = o++,
                            s = !1;
                        r.push(void 0), a++, e.resolve(t).then(function(t) {
                            s || (s = !0, r[u] = t, --a || n(r))
                        }, i)
                    }), --a || n(r)
                });
            return o && i(o.error), r.promise
        },
        race: function(t) {
            var e = this,
                r = Vn(e),
                n = r.reject,
                i = Gn(function() {
                    Fn(t, !1, function(t) {
                        e.resolve(t).then(r.resolve, n)
                    })
                });
            return i && n(i.error), r.promise
        }
    });
    var Zn = at.Promise,
        ti = r(function(t, e) {
            ! function() {
                function t(t) {
                    this.message = t
                }
                var r = "undefined" != typeof e ? e : this,
                    n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                t.prototype = new Error, t.prototype.name = "InvalidCharacterError", r.btoa || (r.btoa = function(e) {
                    for (var r, i, o = String(e), a = 0, u = n, s = ""; o.charAt(0 | a) || (u = "=", a % 1); s += u.charAt(63 & r >> 8 - a % 1 * 8)) {
                        if (i = o.charCodeAt(a += .75), i > 255) throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                        r = r << 8 | i
                    }
                    return s
                }), r.atob || (r.atob = function(e) {
                    var r = String(e).replace(/=+$/, "");
                    if (r.length % 4 == 1) throw new t("'atob' failed: The string to be decoded is not correctly encoded.");
                    for (var i, o, a = 0, u = 0, s = ""; o = r.charAt(u++); ~o && (i = a % 4 ? 64 * i + o : o, a++ % 4) ? s += String.fromCharCode(255 & i >> (-2 * a & 6)) : 0) o = n.indexOf(o);
                    return s
                })
            }()
        }),
        ei = void 0;
    ei = "undefined" == typeof global ? window : global;
    var ri = {
        set: n,
        get: i
    };
    ri.set("btoa", ti.btoa), ri.set("atob", ti.atob), ri.set("Promise", Zn);
    var ni = void 0;
    ni = "function" == typeof Object.assign ? Object.assign : function(t) {
        if (void 0 === t || null === t) throw new TypeError("Cannot convert undefined or null to object");
        var e = Object(t),
            r = [].slice.call(arguments, 1);
        return r.length > 0 && r.forEach(function(t) {
            if (void 0 !== t && null !== t) {
                var r = void 0;
                for (r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            }
        }), e
    };
    var ii = ni,
        oi = void 0;
    oi = Array.prototype.includes ? function(t) {
        var e = [].slice.call(arguments, 1);
        return Array.prototype.includes.apply(t, e)
    } : function(t, e) {
        var r = Object(t),
            n = parseInt(r.length, 10) || 0;
        if (0 === n) return !1;
        var i = parseInt(arguments[2], 10) || 0,
            o = void 0;
        for (i >= 0 ? o = i : (o = n + i, o < 0 && (o = 0)); o < n;) {
            var a = r[o];
            if (e === a || e !== e && a !== a) return !0;
            o++
        }
        return !1
    };
    var ai = oi,
        ui = u({
            constructor: function() {},
            static: {
                extend: function(t) {
                    return u(t, this)
                }
            }
        }),
        si = ui.extend({
            constructor: function() {},
            debug: s("debug"),
            info: s("info"),
            warn: s("warn"),
            error: s("error")
        }),
        ci = new si,
        fi = ui.extend({
            constructor: function(t) {
                var e = this;
                Object.keys(this.deprecatedProperties).forEach(function(r) {
                    if (t.hasOwnProperty(r)) {
                        var n = e.deprecatedProperties[r],
                            i = e[n];
                        i(t[r], t)
                    }
                }), this.requiredProperties.forEach(function(r) {
                    if (!t.hasOwnProperty(r)) throw new Error("new Config() requires the option '" + r + "'");
                    e[r] = t[r]
                })
            },
            deprecatedProperties: {
                myShopifyDomain: "transformMyShopifyDomain"
            },
            transformMyShopifyDomain: function(t, e) {
                ci.warn("Config - ", "myShopifyDomain is deprecated, please use domain and provide the full shop domain."), e.domain = t + ".myshopify.com"
            },
            requiredProperties: ["apiKey", "appId", "domain"],
            apiKey: "",
            appId: "",
            domain: "",
            myShopifyDomain: ""
        }),
        li = void 0,
        hi = ui.extend({
            constructor: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                this.attrs = t, ii(this, e)
            },
            attrs: null,
            serializer: null,
            adapter: null,
            shopClient: null
        }),
        pi = hi.extend(Object.defineProperties({
            constructor: function() {
                this.super.apply(this, arguments), this.selected = this.values[0]
            }
        }, {
            name: {
                get: function() {
                    return this.attrs.name
                },
                configurable: !0,
                enumerable: !0
            },
            values: {
                get: function() {
                    return this.attrs.values
                },
                configurable: !0,
                enumerable: !0
            },
            selected: {
                get: function() {
                    return this._selected
                },
                set: function(t) {
                    if (!ai(this.values, t)) throw new Error("Invalid option selection for " + this.name + ".");
                    return this._selected = t, t
                },
                configurable: !0,
                enumerable: !0
            }
        })),
        di = hi.extend(Object.defineProperties({
            constructor: function() {
                this.super.apply(this, arguments)
            },
            checkoutUrl: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                    e = this.config,
                    r = "https://" + e.domain + "/cart",
                    n = this.id + ":" + parseInt(t, 10),
                    i = "api_key=" + e.apiKey;
                return r + "/" + n + "?" + i
            }
        }, {
            id: {
                get: function() {
                    return this.attrs.variant.id
                },
                configurable: !0,
                enumerable: !0
            },
            productId: {
                get: function() {
                    return this.attrs.product.id
                },
                configurable: !0,
                enumerable: !0
            },
            title: {
                get: function() {
                    return this.attrs.variant.title
                },
                configurable: !0,
                enumerable: !0
            },
            productTitle: {
                get: function() {
                    return this.attrs.product.title
                },
                configurable: !0,
                enumerable: !0
            },
            compareAtPrice: {
                get: function() {
                    return this.attrs.variant.compare_at_price
                },
                configurable: !0,
                enumerable: !0
            },
            price: {
                get: function() {
                    return this.attrs.variant.price
                },
                configurable: !0,
                enumerable: !0
            },
            formattedPrice: {
                get: function() {
                    return this.attrs.variant.formatted_price
                },
                configurable: !0,
                enumerable: !0
            },
            grams: {
                get: function() {
                    return this.attrs.variant.grams
                },
                configurable: !0,
                enumerable: !0
            },
            optionValues: {
                get: function() {
                    return this.attrs.variant.option_values
                },
                configurable: !0,
                enumerable: !0
            },
            available: {
                get: function() {
                    return this.attrs.variant.available
                },
                configurable: !0,
                enumerable: !0
            },
            image: {
                get: function() {
                    var t = this.id,
                        e = this.attrs.product.images,
                        r = e[0],
                        n = e.filter(function(e) {
                            return e.variant_ids.indexOf(t) !== -1
                        })[0];
                    return n || r
                },
                configurable: !0,
                enumerable: !0
            },
            imageVariants: {
                get: function() {
                    var t = this.image;
                    if (!t) return [];
                    var e = this.image.src,
                        r = e.lastIndexOf("."),
                        n = e.slice(0, r),
                        i = e.slice(r),
                        o = [{
                            name: "pico",
                            dimension: "16x16"
                        }, {
                            name: "icon",
                            dimension: "32x32"
                        }, {
                            name: "thumb",
                            dimension: "50x50"
                        }, {
                            name: "small",
                            dimension: "100x100"
                        }, {
                            name: "compact",
                            dimension: "160x160"
                        }, {
                            name: "medium",
                            dimension: "240x240"
                        }, {
                            name: "large",
                            dimension: "480x480"
                        }, {
                            name: "grande",
                            dimension: "600x600"
                        }, {
                            name: "1024x1024",
                            dimension: "1024x1024"
                        }, {
                            name: "2048x2048",
                            dimension: "2048x2048"
                        }];
                    return o.forEach(function(t) {
                        t.src = n + "_" + t.name + i
                    }), o
                },
                configurable: !0,
                enumerable: !0
            }
        })),
        vi = function(t) {
            return t.reduce(function(t, e) {
                return t.indexOf(e) < 0 && t.push(e), t
            }, [])
        },
        mi = "https://widgets.shopifyapps.com/assets/no-image.svg",
        yi = hi.extend(Object.defineProperties({
            constructor: function() {
                this.super.apply(this, arguments)
            }
        }, {
            id: {
                get: function() {
                    return this.attrs.product_id
                },
                configurable: !0,
                enumerable: !0
            },
            title: {
                get: function() {
                    return this.attrs.title
                },
                configurable: !0,
                enumerable: !0
            },
            description: {
                get: function() {
                    return this.attrs.body_html
                },
                configurable: !0,
                enumerable: !0
            },
            images: {
                get: function() {
                    return this.attrs.images
                },
                configurable: !0,
                enumerable: !0
            },
            memoized: {
                get: function() {
                    return this._memoized = this._memoized || {}, this._memoized
                },
                configurable: !0,
                enumerable: !0
            },
            options: {
                get: function() {
                    if (this.memoized.options) return this.memoized.options;
                    var t = this.attrs.options,
                        e = this.variants;
                    return this.memoized.options = t.map(function(t) {
                        var r = t.name,
                            n = e.reduce(function(e, r) {
                                var n = r.optionValues.filter(function(e) {
                                    return e.name === t.name
                                })[0];
                                return e.push(n.value), e
                            }, []),
                            i = vi(n);
                        return new pi({
                            name: r,
                            values: i
                        })
                    }), this.memoized.options
                },
                configurable: !0,
                enumerable: !0
            },
            variants: {
                get: function() {
                    var t = this;
                    return this.attrs.variants.map(function(e) {
                        return new di({
                            variant: e,
                            product: t
                        }, {
                            config: t.config
                        })
                    })
                },
                configurable: !0,
                enumerable: !0
            },
            selections: {
                get: function() {
                    return this.options.map(function(t) {
                        return t.selected
                    })
                },
                configurable: !0,
                enumerable: !0
            },
            selectedVariant: {
                get: function() {
                    var t = this.selections.join(" / ");
                    return this.variants.filter(function(e) {
                        return e.title === t
                    })[0] || null
                },
                configurable: !0,
                enumerable: !0
            },
            selectedVariantImage: {
                get: function() {
                    return this.selectedVariant ? this.selectedVariant.image : null
                },
                configurable: !0,
                enumerable: !0
            }
        })),
        gi = ui.extend({
            constructor: function(t) {
                this.config = t
            },
            rootKeyForType: function(t) {
                return t.slice(0, -1) + "_listing"
            },
            models: {
                collections: hi,
                products: yi
            },
            modelForType: function(t) {
                return this.models[t]
            },
            deserializeSingle: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    n = e[this.rootKeyForType(t)],
                    i = this.modelFromAttrs(t, n, r);
                return i
            },
            deserializeMultiple: function(t) {
                var e = this,
                    r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    i = r[this.rootKeyForType(t) + "s"];
                return i.map(function(r) {
                    var i = e.modelFromAttrs(t, r, n);
                    return i
                })
            },
            modelFromAttrs: function(t, e, r) {
                var n = this.modelForType(t);
                return r.config = this.config, new n(e, r)
            }
        }),
        bi = ui.extend(Object.defineProperties({
            ajax: d,
            constructor: function(t) {
                this.config = t
            },
            pathForType: function(t) {
                return "/" + t.slice(0, -1) + "_listings"
            },
            buildUrl: function(t, e, r) {
                switch (t) {
                    case "multiple":
                        return this.buildMultipleUrl(e, r);
                    case "single":
                        return this.buildSingleUrl(e, r);
                    default:
                        return ""
                }
            },
            buildMultipleUrl: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = "" + this.baseUrl + this.pathForType(t),
                    n = Object.keys(e);
                if (n.length > 0) {
                    var i = n.map(function(t) {
                        var r = void 0;
                        return r = Array.isArray(e[t]) ? e[t].join(",") : e[t], t + "=" + encodeURIComponent(r)
                    }).join("&");
                    return r + "?" + i
                }
                return r
            },
            buildSingleUrl: function(t, e) {
                return "" + this.baseUrl + this.pathForType(t) + "/" + e
            },
            fetchMultiple: function() {
                var t = this.buildUrl.apply(this, ["multiple"].concat(Array.prototype.slice.call(arguments)));
                return this.ajax("GET", t, {
                    headers: this.headers
                }).then(function(t) {
                    return t.json
                })
            },
            fetchSingle: function() {
                var t = this.buildUrl.apply(this, ["single"].concat(Array.prototype.slice.call(arguments)));
                return this.ajax("GET", t, {
                    headers: this.headers
                }).then(function(t) {
                    return t.json
                })
            }
        }, {
            base64ApiKey: {
                get: function() {
                    return btoa(this.config.apiKey)
                },
                configurable: !0,
                enumerable: !0
            },
            baseUrl: {
                get: function() {
                    var t = this.config,
                        e = t.domain,
                        r = t.appId;
                    return "https://" + e + "/api/apps/" + r
                },
                configurable: !0,
                enumerable: !0
            },
            headers: {
                get: function() {
                    return {
                        Authorization: "Basic " + this.base64ApiKey,
                        "Content-Type": "application/json",
                        "X-SDK-Variant": "javascript",
                        "X-SDK-Version": li
                    }
                },
                configurable: !0,
                enumerable: !0
            }
        })),
        wi = "shopify-buy-uuid",
        _i = "shopify-buy." + Date.now(),
        Oi = {
            writable: !0,
            configurable: !0,
            enumerable: !0,
            value: null
        },
        xi = 0,
        ji = {},
        Ti = {},
        Si = hi.extend(Object.defineProperties({
            constructor: function() {
                this.super.apply(this, arguments)
            }
        }, {
            id: {
                get: function() {
                    return this.attrs[wi]
                },
                configurable: !0,
                enumerable: !0
            },
            variant_id: {
                get: function() {
                    return this.attrs.variant_id
                },
                configurable: !0,
                enumerable: !0
            },
            product_id: {
                get: function() {
                    return this.attrs.product_id
                },
                configurable: !0,
                enumerable: !0
            },
            image: {
                get: function() {
                    return this.attrs.image
                },
                configurable: !0,
                enumerable: !0
            },
            title: {
                get: function() {
                    return this.attrs.title
                },
                configurable: !0,
                enumerable: !0
            },
            quantity: {
                get: function() {
                    return this.attrs.quantity
                },
                set: function(t) {
                    var e = parseInt(t, 10);
                    if (e < 0) throw new Error("Quantities must be positive");
                    if (e !== parseFloat(t)) throw new Error("Quantities must be whole numbers");
                    return this.attrs.quantity = e, this.attrs.quantity
                },
                configurable: !0,
                enumerable: !0
            },
            properties: {
                get: function() {
                    return this.attrs.properties || {}
                },
                set: function(t) {
                    return this.attrs.properties = t || {}, t
                },
                configurable: !0,
                enumerable: !0
            },
            variant_title: {
                get: function() {
                    return this.attrs.variant_title
                },
                configurable: !0,
                enumerable: !0
            },
            price: {
                get: function() {
                    return this.attrs.price
                },
                configurable: !0,
                enumerable: !0
            },
            compare_at_price: {
                get: function() {
                    return this.attrs.compare_at_price
                },
                configurable: !0,
                enumerable: !0
            },
            line_price: {
                get: function() {
                    return (this.quantity * parseFloat(this.price)).toFixed(2)
                },
                configurable: !0,
                enumerable: !0
            },
            grams: {
                get: function() {
                    return this.attrs.grams
                },
                configurable: !0,
                enumerable: !0
            }
        })),
        Pi = hi.extend(Object.defineProperties({
            constructor: function() {
                this.super.apply(this, arguments)
            },
            addVariants: function() {
                return ci.warn("CartModel - ", "addVariants is deprecated, please use createLineItemsFromVariants instead"), this.createLineItemsFromVariants.apply(this, arguments)
            },
            createLineItemsFromVariants: function() {
                var t = [].concat(Array.prototype.slice.call(arguments)).map(function(t) {
                        var e = {
                            image: t.variant.image,
                            variant_id: t.variant.id,
                            product_id: t.variant.productId,
                            title: t.variant.productTitle,
                            quantity: parseInt(t.quantity, 10),
                            properties: t.properties || {},
                            variant_title: t.variant.title,
                            price: t.variant.price,
                            compare_at_price: t.variant.compareAtPrice,
                            grams: t.variant.grams
                        };
                        return m(e), e
                    }),
                    r = this.attrs.line_items;
                r.push.apply(r, e(t));
                var n = r.reduce(function(t, e) {
                    var r = t.filter(function(t) {
                        return t.variant_id === e.variant_id && y(t.properties, e.properties)
                    })[0];
                    return r ? r.quantity = r.quantity + e.quantity : t.push(e), t
                }, []);
                return this.attrs.line_items = n.reduce(function(t, e) {
                    return e.quantity >= 1 && t.push(e), t
                }, []), this.updateModel()
            },
            updateLineItem: function(t, e) {
                if (e < 1) return this.removeLineItem(t);
                var r = this.lineItems.filter(function(e) {
                    return e.id === t
                })[0];
                return r ? (r.quantity = e, this.updateModel()) : new Promise(function(e, r) {
                    r(new Error("line item with id: " + t + " not found in cart#" + this.id))
                })
            },
            removeLineItem: function(t) {
                var e = this.lineItems.length,
                    r = this.lineItems.filter(function(e) {
                        return e.id !== t
                    }),
                    n = r.length;
                return n < e ? (this.attrs.line_items = r.map(function(t) {
                    return t.attrs
                }), this.updateModel()) : new Promise(function(e, r) {
                    r(new Error("line item with id: " + t + " not found in cart#" + this.id))
                })
            },
            clearLineItems: function() {
                return this.attrs.line_items = [], this.updateModel()
            },
            updateModel: function() {
                var t = this;
                return this.shopClient.update("carts", this).then(function(e) {
                    return ii(t.attrs, e.attrs), t
                })
            }
        }, {
            id: {
                get: function() {
                    return this.attrs[wi]
                },
                configurable: !0,
                enumerable: !0
            },
            lineItems: {
                get: function() {
                    return (this.attrs.line_items || []).map(function(t) {
                        return new Si(t)
                    })
                },
                configurable: !0,
                enumerable: !0
            },
            lineItemCount: {
                get: function() {
                    return this.lineItems.reduce(function(t, e) {
                        return t + e.quantity
                    }, 0)
                },
                configurable: !0,
                enumerable: !0
            },
            subtotal: {
                get: function() {
                    var t = this.lineItems.reduce(function(t, e) {
                        return t + parseFloat(e.line_price)
                    }, 0);
                    return t.toFixed(2)
                },
                configurable: !0,
                enumerable: !0
            },
            checkoutUrl: {
                get: function() {
                    var t = this.config,
                        e = "https://" + t.domain + "/cart",
                        r = ri.get("ga"),
                        n = this.lineItems.map(function(t) {
                            return t.variant_id + ":" + t.quantity
                        }),
                        i = "api_key=" + t.apiKey;
                    if ("function" == typeof r) {
                        var o = void 0;
                        r(function(t) {
                            o = t.get("linkerParam")
                        }), o && (i += "&" + o)
                    }
                    return e + "/" + n + "?" + i
                },
                configurable: !0,
                enumerable: !0
            }
        })),
        Ai = ui.extend({
            constructor: function(t) {
                this.config = t
            },
            rootKeyForType: function(t) {
                return t.slice(0, -1)
            },
            modelForType: function() {
                return Pi
            },
            deserializeSingle: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    n = e[this.rootKeyForType(t)],
                    i = this.modelFromAttrs(t, n, r);
                return i
            },
            modelFromAttrs: function(t, e, r) {
                var n = this.modelForType(t);
                return r.config = this.config, new n(e, r)
            },
            serialize: function(t, e) {
                var r = this.rootKeyForType(t),
                    n = {},
                    i = ii({}, e.attrs);
                return n[r] = i, delete i.attributes, Object.keys(i).forEach(function(t) {
                    var e = i[t];
                    (null === e || "string" == typeof e && 0 === e.length) && delete i[t]
                }), n
            }
        }),
        Ei = hi.extend(Object.defineProperties({
            constructor: function(t) {
                if (Object.keys(t).indexOf("referenceId") < 0) throw new Error("Missing key referenceId of reference. References to null are not allowed");
                this.super.apply(this, arguments)
            }
        }, {
            id: {
                get: function() {
                    return this.attrs[wi]
                },
                configurable: !0,
                enumerable: !0
            },
            referenceId: {
                get: function() {
                    return this.attrs.referenceId
                },
                set: function(t) {
                    return this.attrs.referenceId = t, t
                },
                configurable: !0,
                enumerable: !0
            }
        })),
        Ii = ui.extend({
            constructor: function(t) {
                this.config = t
            },
            modelForType: function() {
                return Ei
            },
            deserializeSingle: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    n = this.modelForType(t);
                return new n(e, r)
            },
            serialize: function(t, e) {
                var r = ii({}, e.attrs);
                return r
            }
        }),
        Fi = ui.extend({
            constructor: function() {
                this.localStorageAvailable = this.storageAvailable("localStorage"), this.cache = {}
            },
            setItem: function(t, e) {
                return this.localStorageAvailable ? localStorage.setItem(t, JSON.stringify(e)) : this.cache[t] = e, e
            },
            getItem: function(t) {
                if (!this.localStorageAvailable) return this.cache[t] || null;
                var e = localStorage.getItem(t);
                try {
                    return JSON.parse(e)
                } catch (t) {
                    return null
                }
            },
            storageAvailable: function(t) {
                try {
                    var e = ri.get(t),
                        r = "__storage_test__";
                    return e.setItem(r, r), e.removeItem(r), !0
                } catch (t) {
                    return !1
                }
            }
        }),
        Ci = ui.extend({
            constructor: function() {
                this.store = new Fi
            },
            idKeyForType: function() {
                return wi
            },
            fetchSingle: function(t, e) {
                var r = this;
                return new Promise(function(n, i) {
                    var o = r.store.getItem(r.storageKey(t, e));
                    return null === o ? void i(new Error(t + "#" + e + " not found")) : void n(o)
                })
            },
            create: function(t, e) {
                var r = this;
                return new Promise(function(n) {
                    var i = r.identify(e);
                    r.store.setItem(r.storageKey(t, i), e), n(e)
                })
            },
            update: function(t, e, r) {
                var n = this;
                return new Promise(function(i) {
                    n.store.setItem(n.storageKey(t, e), r), i(r)
                })
            },
            storageKey: function(t, e) {
                return t + "." + e
            },
            identify: function(t) {
                var e = Object.keys(t);
                return m(1 === e.length && "object" === b(t[e[0]]) ? t[e[0]] : t)
            }
        }),
        Ri = ui.extend(Object.defineProperties({
            constructor: function(t) {
                this.config = t, this.serializers = {
                    products: gi,
                    collections: gi,
                    carts: Ai,
                    references: Ii
                }, this.adapters = {
                    products: bi,
                    collections: bi,
                    carts: Ci,
                    references: Ci
                }
            },
            config: null,
            fetchAll: function(t) {
                var e = this,
                    r = new this.adapters[t](this.config);
                return r.fetchMultiple(t).then(function(n) {
                    return e.deserialize(t, n, r, null, {
                        multiple: !0
                    })
                })
            },
            fetch: function(t, e) {
                var r = this,
                    n = new this.adapters[t](this.config);
                return n.fetchSingle(t, e).then(function(e) {
                    return r.deserialize(t, e, n, null, {
                        single: !0
                    })
                })
            },
            fetchQuery: function(t, e) {
                var r = this,
                    n = new this.adapters[t](this.config);
                return n.fetchMultiple(t, e).then(function(e) {
                    return r.deserialize(t, e, n, null, {
                        multiple: !0
                    })
                })
            },
            create: function(t) {
                var e = this,
                    r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = new this.adapters[t](this.config),
                    i = new this.serializers[t](this.config),
                    o = i.modelForType(t),
                    a = new o(r, {
                        shopClient: this
                    }),
                    u = i.serialize(t, a);
                return n.create(t, u).then(function(r) {
                    return e.deserialize(t, r, n, i, {
                        single: !0
                    })
                })
            },
            update: function(t, e) {
                var r = this,
                    n = e.adapter,
                    i = e.serializer,
                    o = i.serialize(t, e),
                    a = e.attrs[n.idKeyForType(t)];
                return n.update(t, a, o).then(function(e) {
                    return r.deserialize(t, e, n, i, {
                        single: !0
                    })
                })
            },
            deserialize: function(t, e, r, n) {
                var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
                    o = n || new this.serializers[t](this.config),
                    a = {
                        shopClient: this,
                        adapter: r,
                        serializer: o,
                        type: t
                    },
                    u = void 0;
                return u = i.multiple ? o.deserializeMultiple(t, e, a) : o.deserializeSingle(t, e, a)
            },
            createCart: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    e = {
                        line_items: []
                    },
                    r = {};
                return ii(r, e), ii(r, t), this.create("carts", r)
            },
            updateCart: function(t) {
                return this.update("carts", t)
            },
            fetchCart: g("one", "carts"),
            fetchAllProducts: g("all", "products"),
            fetchAllCollections: g("all", "collections"),
            fetchProduct: g("one", "products"),
            fetchCollection: g("one", "collections"),
            fetchQueryProducts: g("query", "products"),
            fetchQueryCollections: g("query", "collections"),
            fetchRecentCart: function() {
                var t = this;
                return this.fetch("references", this.config.domain + ".recent-cart").then(function(e) {
                    var r = e.referenceId;
                    return t.fetchCart(r)
                }).catch(function() {
                    return t.createCart().then(function(e) {
                        var r = {
                            referenceId: e.id
                        };
                        return r[wi] = t.config.domain + ".recent-cart", t.create("references", r), e
                    })
                })
            }
        }, {
            serializers: {
                get: function() {
                    return ii({}, this.shadowedSerializers)
                },
                set: function(t) {
                    this.shadowedSerializers = ii({}, t)
                },
                configurable: !0,
                enumerable: !0
            },
            adapters: {
                get: function() {
                    return ii({}, this.shadowedAdapters)
                },
                set: function(t) {
                    this.shadowedAdapters = ii({}, t)
                },
                configurable: !0,
                enumerable: !0
            }
        }));
    if (l()) {
        var zi = require,
            ki = zi("node-fetch");
        ri.set("fetch", ki), ri.set("Response", ki.Response)
    }
    l() && ri.set("btoa", function(t) {
        return new Buffer(t).toString("base64")
    });
    var Mi = {
        ShopClient: Ri,
        Config: fi,
        version: li,
        NO_IMAGE_URI: mi,
        buildClient: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = new this.Config(t);
            return new this.ShopClient(e)
        }
    };
    t.exports = Mi
});