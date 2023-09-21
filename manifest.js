parcelRequire = (function (e, r, t, n) {
    var i,
        o = "function" == typeof parcelRequire && parcelRequire,
        u = "function" == typeof require && require;
    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw ((c.code = "MODULE_NOT_FOUND"), c);
            }
            (p.resolve = function (r) {
                return e[t][1][r] || r;
            }),
                (p.cache = {});
            var l = (r[t] = new f.Module(t));
            e[t][0].call(l.exports, p, l, l.exports, this);
        }
        return r[t].exports;
        function p(e) {
            return f(p.resolve(e));
        }
    }
    (f.isParcelRequire = !0),
        (f.Module = function (e) {
            (this.id = e), (this.bundle = f), (this.exports = {});
        }),
        (f.modules = e),
        (f.cache = r),
        (f.parent = o),
        (f.register = function (r, t) {
            e[r] = [
                function (e, r) {
                    r.exports = t;
                },
                {},
            ];
        });
    for (var c = 0; c < t.length; c++)
        try {
            f(t[c]);
        } catch (e) {
            i || (i = e);
        }
    if (t.length) {
        var l = f(t[t.length - 1]);
        "object" == typeof exports && "undefined" != typeof module
            ? (module.exports = l)
            : "function" == typeof define && define.amd
            ? define(function () {
                  return l;
              })
            : n && (this[n] = l);
    }
    if (((parcelRequire = f), i)) throw i;
    return f;
})(
    {
        zVvH: [
            function (require, module, exports) {
                "use strict";
                Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.DEFAULT_MEMO = exports.STATIC_INDEX = exports.DRAG_INDEX = exports.GRID_SIZE = exports.MARGIN = void 0);
                const e = 48;
                exports.MARGIN = 48;
                const t = 1;
                exports.GRID_SIZE = 1;
                const o = "99999";
                exports.DRAG_INDEX = "99999";
                const s = "99998";
                exports.STATIC_INDEX = "99998";
                const n = {
                    id: "9346dc6c-f982-48ce-9e21-f6a334b367b3",
                    text:
                        "Manifest is a grid-based pinboard for note taking.\n\nSimply click and drag anywhere to create a memo and snap it to the grid. All memos can be moved, resized, deleted and are saved in your browser's local storage between sessions.\n\nTo toggle between dark and light modes you can press Alt + T.\n\nManifest is free and completely open-source. If you find a bug or have a suggestion feel free to file an issue on Github.\n\nhttps://github.com/jonathontoon/manifest/issues",
                    position: { top: 50, left: 50 },
                    size: { width: 379, height: 309 },
                };
                exports.DEFAULT_MEMO = n;
            },
            {},
        ],
        MgTz: [
            function (require, module, exports) {
                "use strict";
                Object.defineProperty(exports, "__esModule", { value: !0 }),
                    (exports.confirm = t),
                    (exports.setLocalStorageItem = o),
                    (exports.getLocalStorageItem = r),
                    (exports.snapToGrid = n),
                    (exports.checkBounds = x),
                    (exports.generateUUID = s),
                    (exports.decreaseAllMemoIndexes = i);
                var e = require("./globals");
                function t(e) {
                    // return window.confirm(e);
                    return true;
                }
                function o(e, t) {
                    return window.localStorage.setItem(`${e}`, JSON.stringify(t));
                }
                function r(e) {
                    return JSON.parse(window.localStorage.getItem(e));
                }
                function n(e, t) {
                    return t * Math.round(e / t);
                }
                function x(t, o) {
                    let r = null;
                    return (
                        t.top > o.top && (r = { edge: "top", offset: 0 }),
                        t.left > o.left && (r = { edge: "left", offset: 0 }),
                        t.top + t.height < o.top + o.height && (r = { edge: "bottom", offset: n(t.height - o.height, e.GRID_SIZE) }),
                        t.left + t.width < o.left + o.width && (r = { edge: "right", offset: n(t.width - o.width, e.GRID_SIZE) }),
                        r
                    );
                }
                function s() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                        var t = 0 | (16 * Math.random());
                        return ("x" === e ? t : 8 | (3 & t)).toString(16);
                    });
                }
                function i() {
                    const e = document.getElementsByClassName("memo");
                    for (const t of e) {
                        let e = t.style.zIndex;
                        t.style.zIndex = --e;
                    }
                }
            },
            { "./globals": "zVvH" },
        ],
        dKQo: [function (require, module, exports) {}, {}],
        QvaY: [
            function (require, module, exports) {
                "use strict";
                var e = require("./globals"),
                    t = require("./utils");
                require("../sass/index.scss");
                let s,
                    o,
                    n,
                    i,
                    c,
                    a,
                    d,
                    r = "light";
                function u(e) {
                    e.target === i ? E(e) : "drag" === e.target.classList[0] ? h(e) : "resize" === e.target.classList[0] && v(e);
                }
                function l(o, n, i, c) {
                    const a = document.createElement("div");
                    a.setAttribute("data-id", o),
                        a.classList.add("memo"),
                        (a.style.top = `${i.top}px`),
                        (a.style.left = `${i.left}px`),
                        (a.style.width = `${c.width}px`),
                        (a.style.height = `${c.height}px`),
                        (a.style.zIndex = e.STATIC_INDEX);
                    const d = document.createElement("textarea");
                    d.classList.add("input"),
                        d.setAttribute("placeholder", "Add a short memo..."),
                        d.setAttribute("autocomplete", !0),
                        n && (d.value = n),
                        d.addEventListener("focus", function (o) {
                            o.target.classList.add("active"), (0, t.decreaseAllMemoIndexes)(), ((s = o.target.parentNode).style.zIndex = e.STATIC_INDEX);
                        }),
                        d.addEventListener(
                            "blur",
                            function (e) {
                                e.target.classList.remove("active");
                            },
                            { passive: !1, useCapture: !1 }
                        ),
                        d.addEventListener(
                            "input",
                            function (e) {
                                const s = (0, t.getLocalStorageItem)("manifest_memos");
                                (s[o] = { ...s[o], text: e.target.value }), (0, t.setLocalStorageItem)("manifest_memos", s);
                            },
                            { passive: !1, useCapture: !1 }
                        ),
                        a.appendChild(d);
                    const r = document.createElement("div");
                    r.classList.add("drag"), r.addEventListener("mousedown", u), r.addEventListener("touchstart", u), a.appendChild(r);
                    const l = document.createElement("div");
                    l.classList.add("close"), (l.innerHTML = "–"), l.addEventListener("mouseup", g), l.addEventListener("touchend", g), a.appendChild(l);
                    const h = document.createElement("div");
                    return h.classList.add("resize"), h.addEventListener("mousedown", u), h.addEventListener("touchstart", u), a.appendChild(h), a;
                }
                function h(o) {
                    if (1 === o.which || o.touches) {
                        (0, t.decreaseAllMemoIndexes)(),
                            (s = o.target.parentNode).classList.add("active"),
                            (s.style.zIndex = e.STATIC_INDEX),
                            s.querySelectorAll(".input")[0].blur(),
                            (o.target.style.backgroundColor = "var(--gray)"),
                            (o.target.style.cursor = "grabbing"),
                            (document.body.style.cursor = "grabbing");
                        const n = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientX, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientX, e.GRID_SIZE),
                            i = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientY, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientY, e.GRID_SIZE);
                        (a = { x: n, y: i }),
                            document.addEventListener("mousemove", m, { passive: !1, useCapture: !1 }),
                            document.addEventListener("touchmove", m, { passive: !1, useCapture: !1 }),
                            document.addEventListener("mouseup", p, { passive: !1, useCapture: !1 }),
                            document.addEventListener("touchcancel", p, { passive: !1, useCapture: !1 }),
                            document.addEventListener("touchend", p, { passive: !1, useCapture: !1 });
                    }
                }
                function m(o) {
                    if (s.classList.contains("active")) {
                        const n = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientX, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientX, e.GRID_SIZE),
                            i = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientY, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientY, e.GRID_SIZE);
                        (s.style.top = `${s.offsetTop - (a.y - i)}px`), (s.style.left = `${s.offsetLeft - (a.x - n)}px`), (a = { x: n, y: i });
                    }
                }
                function p(o) {
                    const n = (0, t.checkBounds)(i.getBoundingClientRect(), s.getBoundingClientRect()),
                        c = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientX, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientX, e.GRID_SIZE),
                        d = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientY, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientY, e.GRID_SIZE);
                    let r = s.offsetTop - (a.y - d),
                        u = s.offsetLeft - (a.x - c);
                    n && ("top" === n.edge ? (r = n.offset) : "bottom" === n.edge ? (r = n.offset) : "left" === n.edge ? (u = n.offset) : "right" === n.edge && (u = n.offset)),
                        (s.style.top = `${r}px`),
                        (s.style.left = `${u}px`),
                        s.classList.remove("active");
                    const l = s.querySelectorAll(".drag")[0];
                    (l.style.cursor = "grab"), (l.style.backgroundColor = "transparent"), s.querySelectorAll(".input")[0].focus();
                    const h = s.dataset.id,
                        g = (0, t.getLocalStorageItem)("manifest_memos");
                    (g[h] = { ...g[h], position: { top: r, left: u } }),
                        (0, t.setLocalStorageItem)("manifest_memos", g),
                        (document.body.style.cursor = null),
                        (s = null),
                        (a = null),
                        document.removeEventListener("mousemove", m),
                        document.removeEventListener("touchmove", m),
                        document.removeEventListener("mouseup", p),
                        document.removeEventListener("touchcancel", p),
                        document.removeEventListener("touchend", p);
                }
                function g(e) {
                    if ((0, t.confirm)("Are you sure you want to remove this memo?")) {
                        const s = e.target.parentNode.dataset.id,
                            o = (0, t.getLocalStorageItem)("manifest_memos");
                        delete o[s], (0, t.setLocalStorageItem)("manifest_memos", o), i.removeChild(e.target.parentNode);
                    }
                }
                function v(o) {
                    if (1 === o.which || o.touches) {
                        (0, t.decreaseAllMemoIndexes)(),
                            (s = o.target.parentNode).classList.add("active"),
                            (s.style.zIndex = e.STATIC_INDEX),
                            s.querySelectorAll(".input")[0].blur(),
                            (document.body.style.cursor = "nw-resize"),
                            (o.target.style.backgroundColor = "var(--gray)");
                        const n = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientX, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientX, e.GRID_SIZE),
                            i = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientY, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientY, e.GRID_SIZE),
                            c = s.getBoundingClientRect(),
                            r = parseInt(c.width, 10),
                            u = parseInt(c.height, 10);
                        (a = { x: n, y: i }),
                            (d = { width: r, height: u }),
                            document.addEventListener("mousemove", f, { passive: !1, useCapture: !1 }),
                            document.addEventListener("touchmove", f, { passive: !1, useCapture: !1 }),
                            document.addEventListener("mouseup", I, { passive: !1, useCapture: !1 }),
                            document.addEventListener("touchcancel", I, { passive: !1, useCapture: !1 }),
                            document.addEventListener("touchend", I, { passive: !1, useCapture: !1 });
                    }
                }
                function f(o) {
                    if (s.classList.contains("active")) {
                        const n = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientX, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientX, e.GRID_SIZE),
                            i = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientY, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientY, e.GRID_SIZE),
                            c = d.width + (n - a.x) - 2,
                            r = d.height + (i - a.y) - 2;
                        (s.style.width = `${c}px`), (s.style.height = `${r}px`);
                    }
                }
                function I(o) {
                    const n = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientX, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientX, e.GRID_SIZE),
                        c = o.touches && 0 < o.touches.length ? (0, t.snapToGrid)(o.touches[0].clientY, e.GRID_SIZE) : (0, t.snapToGrid)(o.clientY, e.GRID_SIZE),
                        r = d.width + (n - a.x) - 2,
                        u = d.height + (c - a.y) - 2;
                    (s.style.width = `${r}px`), (s.style.height = `${u}px`);
                    const l = (0, t.checkBounds)(i.getBoundingClientRect(), s.getBoundingClientRect());
                    if (l) {
                        let e = s.offsetTop,
                            t = s.offsetLeft;
                        "top" === l.edge ? (e = l.offset) : "bottom" === l.edge ? (e = l.offset) : "left" === l.edge ? (t = l.offset) : "right" === l.edge && (t = l.offset), (s.style.top = `${e}px`), (s.style.left = `${t}px`);
                    }
                    const h = s.querySelectorAll(".resize")[0];
                    (h.style.cursor = "nw-resize"), (h.style.backgroundColor = "transparent"), s.classList.remove("active"), s.querySelectorAll(".input")[0].focus();
                    const m = s.dataset.id,
                        p = (0, t.getLocalStorageItem)("manifest_memos");
                    (p[m] = { ...p[m], size: { width: r, height: u } }),
                        (0, t.setLocalStorageItem)("manifest_memos", p),
                        (document.body.style.cursor = null),
                        (s = null),
                        (d = null),
                        document.removeEventListener("mousemove", f, { passive: !1, useCapture: !1 }),
                        document.removeEventListener("touchmove", f, { passive: !1, useCapture: !1 }),
                        document.removeEventListener("mouseup", I, { passive: !1, useCapture: !1 }),
                        document.removeEventListener("touchcancel", I, { passive: !1, useCapture: !1 }),
                        document.removeEventListener("touchend", I, { passive: !1, useCapture: !1 });
                }
                function E(s) {
                    if (1 === s.which || s.touches) {
                        (document.body.style.cursor = "crosshair"), i.classList.add("active");
                        const o = i.getBoundingClientRect(),
                            n = s.touches && 0 < s.touches.length ? (0, t.snapToGrid)(s.touches[0].clientX - o.left, e.GRID_SIZE) : (0, t.snapToGrid)(s.clientX - o.left, e.GRID_SIZE),
                            d = s.touches && 0 < s.touches.length ? (0, t.snapToGrid)(s.touches[0].clientY - o.top, e.GRID_SIZE) : (0, t.snapToGrid)(s.clientY - o.top, e.GRID_SIZE);
                        (a = { x: n, y: d }),
                            (c = document.createElement("div")).setAttribute("id", "selection"),
                            (c.style.zIndex = e.DRAG_INDEX),
                            i.appendChild(c),
                            document.addEventListener("mousemove", L),
                            document.addEventListener("touchmove", L),
                            document.addEventListener("mouseup", y),
                            document.addEventListener("touchcancel", y),
                            document.addEventListener("touchend", y);
                    }
                }
                function L(s) {
                    const o = i.getBoundingClientRect(),
                        n = s.touches && 0 < s.touches.length ? (0, t.snapToGrid)(s.touches[0].clientX - o.left, e.GRID_SIZE) : (0, t.snapToGrid)(s.clientX - o.left, e.GRID_SIZE),
                        d = s.touches && 0 < s.touches.length ? (0, t.snapToGrid)(s.touches[0].clientY - o.top, e.GRID_SIZE) : (0, t.snapToGrid)(s.clientY - o.top, e.GRID_SIZE),
                        r = 0 > d - a.y ? d : a.y,
                        u = 0 > n - a.x ? n : a.x,
                        l = Math.abs(n - a.x) + 1,
                        h = Math.abs(d - a.y) + 1;
                    (c.style.top = `${r}px`), (c.style.left = `${u}px`), (c.style.width = `${l}px`), (c.style.height = `${h}px`);
                }
                function y() {
                    const e = i.getBoundingClientRect(),
                        o = c.getBoundingClientRect(),
                        n = o.width - 2,
                        a = o.height - 2;
                    let d = o.top - e.top,
                        r = o.left - e.left;
                    const u = (0, t.checkBounds)(e, o);
                    if ((u && ("top" === u.edge ? (d = u.offset) : "bottom" === u.edge ? (d = u.offset) : "left" === u.edge ? (r = u.offset) : "right" === u.edge && (r = u.offset)), 80 <= n && 80 <= a)) {
                        const e = (0, t.generateUUID)(),
                            o = l(e, null, { top: d, left: r }, { width: n, height: a });
                        i.appendChild(o), o.querySelectorAll(".input")[0].focus();
                        const c = (0, t.getLocalStorageItem)("manifest_memos");
                        (c[e] = { text: null, position: { top: d, left: r }, size: { width: n, height: a } }), (0, t.setLocalStorageItem)("manifest_memos", c), (s = o);
                    }
                    (document.body.style.cursor = null),
                        i.classList.remove("active"),
                        i.removeChild(c),
                        document.removeEventListener("mousemove", L, { passive: !1, useCapture: !1 }),
                        document.removeEventListener("touchmove", L, { passive: !1, useCapture: !1 }),
                        document.removeEventListener("mouseup", y, { passive: !1, useCapture: !1 }),
                        document.removeEventListener("touchcancel", y, { passive: !1, useCapture: !1 }),
                        document.removeEventListener("touchend", y, { passive: !1, useCapture: !1 });
                }
                function G() {
                    // const e = document.querySelector("body");
                    // "light" === r ? (e.classList.add("dark"), (r = "dark"), (0, t.setLocalStorageItem)("manifest_theme", "dark")) : (e.classList.remove("dark"), (r = "light"), (0, t.setLocalStorageItem)("manifest_theme", "light")), C();
                }
                function S() {
                    const e = document.querySelector("body"),
                        s = (0, t.getLocalStorageItem)("manifest_theme");
                    return s
                        ? void ("dark" === s
                              ? (e.classList.add("dark"), (r = "dark"), (0, t.setLocalStorageItem)("manifest_theme", "dark"))
                              : (e.classList.remove("dark"), (r = "light"), (0, t.setLocalStorageItem)("manifest_theme", "light")))
                        : void (window.matchMedia("(prefers-color-scheme: dark)").matches && (e.classList.add("dark"), (r = "dark")));
                }
                function _(e) {
                    ("KeyT" === e.code || 84 === e.keyCode) && e.altKey && G();
                }
                function C() {
                    (o.style.width = `${window.innerWidth}px`), (o.style.height = `${window.innerHeight}px`);
                    const t = window.innerWidth - e.MARGIN - 1,
                        s = window.innerHeight - e.MARGIN + 1;
                    n.setAttribute("width", t), n.setAttribute("height", s), (n.style.top = `${e.MARGIN / 2}px`), (n.style.left = `${e.MARGIN / 2}px`), (n.style.width = `${t}px`), (n.style.height = `${s}px`);
                    const c = n.getContext("2d");
                    for (let o = 0; o <= t; o += e.GRID_SIZE) for (let t = 0; t <= s; t += e.GRID_SIZE) (c.fillStyle = "light" === r ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.4)"), c.beginPath(), c.rect(o, t, 1, 1), c.fill();
                    (i.style.top = `${e.MARGIN / 2}px`), (i.style.left = `${e.MARGIN / 2}px`), (i.style.width = `${t}px`), (i.style.height = `${s}px`), (a = null), (d = null);
                }
                function x() {
                    S(),
                        (o = document.createElement("main")).setAttribute("id", "app"),
                        (n = document.createElement("canvas")).setAttribute("id", "grid"),
                        (i = document.createElement("section")).setAttribute("id", "board"),
                        i.addEventListener("mousedown", u, { passive: !1, useCapture: !1 }),
                        i.addEventListener("touchstart", u, { passive: !1, useCapture: !1 }),
                        o.appendChild(n),
                        o.appendChild(i),
                        document.body.appendChild(o),
                        document.body.addEventListener(
                            "touchmove",
                            function (e) {
                                e.preventDefault();
                            },
                            { passive: !1, useCapture: !1 }
                        );
                    const s = (0, t.getLocalStorageItem)("manifest_memos");
                    if (s && 0 !== Object.keys(s).length)
                        for (const e of Object.keys(s)) {
                            const t = l(e, s[e].text, s[e].position, s[e].size);
                            i.appendChild(t);
                        }
                    else {
                        const s = l(e.DEFAULT_MEMO.id, e.DEFAULT_MEMO.text, e.DEFAULT_MEMO.position, e.DEFAULT_MEMO.size);
                        i.appendChild(s);
                        const o = {};
                        (o[e.DEFAULT_MEMO.id] = { text: e.DEFAULT_MEMO.text, position: e.DEFAULT_MEMO.position, size: e.DEFAULT_MEMO.size }), (0, t.setLocalStorageItem)("manifest_memos", o);
                    }
                    C();
                }
                window.addEventListener("resize", C), window.addEventListener("load", x), window.addEventListener("keydown", _);
            },
            { "./globals": "zVvH", "./utils": "MgTz", "../sass/index.scss": "dKQo" },
        ],
    },
    {},
    ["QvaY"],
    null
);
