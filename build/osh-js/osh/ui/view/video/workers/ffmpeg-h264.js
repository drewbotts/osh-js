var OSH = (function () {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    if (typeof __filename !== 'undefined')
        _scriptDir = _scriptDir || __filename;
    return (function (OSH) {
        OSH = OSH || {};
        var c;
        c || (c = typeof OSH !== 'undefined' ? OSH : {});
        var aa, ca;
        c.ready = new Promise(function (a, b) { aa = a; ca = b; });
        var h = {}, p;
        for (p in c)
            c.hasOwnProperty(p) && (h[p] = c[p]);
        var da = "./this.program", ea = !1, u = !1, v = !1, fa = !1;
        ea = "object" === typeof window;
        u = "function" === typeof importScripts;
        v = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node;
        fa = !ea && !v && !u;
        var w = "", z, B, ha, ia;
        if (v)
            w = u ? require("path").dirname(w) + "/" : __dirname + "/", z = function (a, b) { var d = C(a); if (d)
                return b ? d : d.toString(); ha || (ha = require("fs")); ia || (ia = require("path")); a = ia.normalize(a); return ha.readFileSync(a, b ? null : "utf8"); }, B = function (a) { a = z(a, !0); a.buffer || (a = new Uint8Array(a)); assert(a.buffer); return a; }, 1 < process.argv.length && (da = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), process.on("uncaughtException", function (a) { throw a; }), process.on("unhandledRejection", D), c.inspect = function () { return "[Emscripten Module object]"; };
        else if (fa)
            "undefined" != typeof read && (z = function (a) { var b = C(a); return b ? ja(b) : read(a); }), B = function (a) { var b; if (b = C(a))
                return b; if ("function" === typeof readbuffer)
                return new Uint8Array(readbuffer(a)); b = read(a, "binary"); assert("object" === typeof b); return b; }, "undefined" !== typeof print && ("undefined" === typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);
        else if (ea || u)
            u ? w = self.location.href : document.currentScript && (w = document.currentScript.src),
                _scriptDir && (w = _scriptDir), 0 !== w.indexOf("blob:") ? w = w.substr(0, w.lastIndexOf("/") + 1) : w = "", z = function (a) { try {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.send(null);
                return b.responseText;
            }
            catch (d) {
                if (a = C(a))
                    return ja(a);
                throw d;
            } }, u && (B = function (a) { try {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.responseType = "arraybuffer";
                b.send(null);
                return new Uint8Array(b.response);
            }
            catch (d) {
                if (a = C(a))
                    return a;
                throw d;
            } });
        var ka = c.print || console.log.bind(console), F = c.printErr || console.warn.bind(console);
        for (p in h)
            h.hasOwnProperty(p) && (c[p] = h[p]);
        h = null;
        c.thisProgram && (da = c.thisProgram);
        var G;
        c.wasmBinary && (G = c.wasmBinary);
        var noExitRuntime;
        c.noExitRuntime && (noExitRuntime = c.noExitRuntime);
        "object" !== typeof WebAssembly && D("no native wasm support detected");
        var H, la, ma = !1;
        function assert(a, b) { a || D("Assertion failed: " + b); }
        function na(a) { var b = c["_" + a]; assert(b, "Cannot call unknown function " + a + ", make sure it is exported"); return b; }
        var oa = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
        function I(a, b, d) { var e = b + d; for (d = b; a[d] && !(d >= e);)
            ++d; if (16 < d - b && a.subarray && oa)
            return oa.decode(a.subarray(b, d)); for (e = ""; b < d;) {
            var f = a[b++];
            if (f & 128) {
                var g = a[b++] & 63;
                if (192 == (f & 224))
                    e += String.fromCharCode((f & 31) << 6 | g);
                else {
                    var k = a[b++] & 63;
                    f = 224 == (f & 240) ? (f & 15) << 12 | g << 6 | k : (f & 7) << 18 | g << 12 | k << 6 | a[b++] & 63;
                    65536 > f ? e += String.fromCharCode(f) : (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
                }
            }
            else
                e += String.fromCharCode(f);
        } return e; }
        function pa(a, b, d, e) { if (!(0 < e))
            return 0; var f = d; e = d + e - 1; for (var g = 0; g < a.length; ++g) {
            var k = a.charCodeAt(g);
            if (55296 <= k && 57343 >= k) {
                var m = a.charCodeAt(++g);
                k = 65536 + ((k & 1023) << 10) | m & 1023;
            }
            if (127 >= k) {
                if (d >= e)
                    break;
                b[d++] = k;
            }
            else {
                if (2047 >= k) {
                    if (d + 1 >= e)
                        break;
                    b[d++] = 192 | k >> 6;
                }
                else {
                    if (65535 >= k) {
                        if (d + 2 >= e)
                            break;
                        b[d++] = 224 | k >> 12;
                    }
                    else {
                        if (d + 3 >= e)
                            break;
                        b[d++] = 240 | k >> 18;
                        b[d++] = 128 | k >> 12 & 63;
                    }
                    b[d++] = 128 | k >> 6 & 63;
                }
                b[d++] = 128 | k & 63;
            }
        } b[d] = 0; return d - f; }
        function qa(a) { for (var b = 0, d = 0; d < a.length; ++d) {
            var e = a.charCodeAt(d);
            55296 <= e && 57343 >= e && (e = 65536 + ((e & 1023) << 10) | a.charCodeAt(++d) & 1023);
            127 >= e ? ++b : b = 2047 >= e ? b + 2 : 65535 >= e ? b + 3 : b + 4;
        } return b; }
        function ra(a, b) { J.set(a, b); }
        var K, J, L, sa, M, ta, ua, va = c.INITIAL_MEMORY || 134217728;
        c.wasmMemory ? H = c.wasmMemory : H = new WebAssembly.Memory({ initial: va / 65536, maximum: va / 65536 });
        H && (K = H.buffer);
        va = K.byteLength;
        var N = K;
        K = N;
        c.HEAP8 = J = new Int8Array(N);
        c.HEAP16 = sa = new Int16Array(N);
        c.HEAP32 = M = new Int32Array(N);
        c.HEAPU8 = L = new Uint8Array(N);
        c.HEAPU16 = new Uint16Array(N);
        c.HEAPU32 = new Uint32Array(N);
        c.HEAPF32 = ta = new Float32Array(N);
        c.HEAPF64 = ua = new Float64Array(N);
        var wa = [], xa = [], ya = [], za = [];
        function Aa() { var a = c.preRun.shift(); wa.unshift(a); }
        var O = 0, Ba = null, P = null;
        function Ca() { O++; c.monitorRunDependencies && c.monitorRunDependencies(O); }
        function Da() { O--; c.monitorRunDependencies && c.monitorRunDependencies(O); if (0 == O && (null !== Ba && (clearInterval(Ba), Ba = null), P)) {
            var a = P;
            P = null;
            a();
        } }
        c.preloadedImages = {};
        c.preloadedAudios = {};
        function D(a) { if (c.onAbort)
            c.onAbort(a); F(a); ma = !0; a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info."); ca(a); throw a; }
        function Ea(a, b) { return String.prototype.startsWith ? a.startsWith(b) : 0 === a.indexOf(b); }
        if (!Ea(Q, Fa)) {
            var Ga = Q;
            Q = c.locateFile ? c.locateFile(Ga, w) : w + Ga;
        }
        function Ha() { try {
            if (G)
                return new Uint8Array(G);
            var a = C(Q);
            if (a)
                return a;
            if (B)
                return B(Q);
            throw "both async and sync fetching of the wasm failed";
        }
        catch (b) {
            D(b);
        } }
        function Ia() { return G || !ea && !u || "function" !== typeof fetch || Ea(Q, "file://") ? Promise.resolve().then(Ha) : fetch(Q, { credentials: "same-origin" }).then(function (a) { if (!a.ok)
            throw "failed to load wasm binary file at '" + Q + "'"; return a.arrayBuffer(); }).catch(function () { return Ha(); }); }
        var S, T;
        function Ja(a) { for (; 0 < a.length;) {
            var b = a.shift();
            if ("function" == typeof b)
                b(c);
            else {
                var d = b.Eb;
                "number" === typeof d ? void 0 === b.ya ? la.get(d)() : la.get(d)(b.ya) : d(void 0 === b.ya ? null : b.ya);
            }
        } }
        function Ka(a) { return a.replace(/\b_Z[\w\d_]+/g, function (b) { return b === b ? b : b + " [" + b + "]"; }); }
        function La(a) { return M[Ma() >> 2] = a; }
        function Na(a, b) { for (var d = 0, e = a.length - 1; 0 <= e; e--) {
            var f = a[e];
            "." === f ? a.splice(e, 1) : ".." === f ? (a.splice(e, 1), d++) : d && (a.splice(e, 1), d--);
        } if (b)
            for (; d; d--)
                a.unshift(".."); return a; }
        function Oa(a) { var b = "/" === a.charAt(0), d = "/" === a.substr(-1); (a = Na(a.split("/").filter(function (e) { return !!e; }), !b).join("/")) || b || (a = "."); a && d && (a += "/"); return (b ? "/" : "") + a; }
        function Pa(a) { var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1); a = b[0]; b = b[1]; if (!a && !b)
            return "."; b && (b = b.substr(0, b.length - 1)); return a + b; }
        function U(a) { if ("/" === a)
            return "/"; a = Oa(a); a = a.replace(/\/$/, ""); var b = a.lastIndexOf("/"); return -1 === b ? a : a.substr(b + 1); }
        function V(a, b) { return Oa(a + "/" + b); }
        function Qa() { if ("object" === typeof crypto && "function" === typeof crypto.getRandomValues) {
            var a = new Uint8Array(1);
            return function () { crypto.getRandomValues(a); return a[0]; };
        } if (v)
            try {
                var b = require("crypto");
                return function () { return b.randomBytes(1)[0]; };
            }
            catch (d) { } return function () { D("randomDevice"); }; }
        function W() { for (var a = "", b = !1, d = arguments.length - 1; -1 <= d && !b; d--) {
            b = 0 <= d ? arguments[d] : X.cwd();
            if ("string" !== typeof b)
                throw new TypeError("Arguments to path.resolve must be strings");
            if (!b)
                return "";
            a = b + "/" + a;
            b = "/" === b.charAt(0);
        } a = Na(a.split("/").filter(function (e) { return !!e; }), !b).join("/"); return (b ? "/" : "") + a || "."; }
        function Ra(a, b) { function d(k) { for (var m = 0; m < k.length && "" === k[m]; m++)
            ; for (var q = k.length - 1; 0 <= q && "" === k[q]; q--)
            ; return m > q ? [] : k.slice(m, q - m + 1); } a = W(a).substr(1); b = W(b).substr(1); a = d(a.split("/")); b = d(b.split("/")); for (var e = Math.min(a.length, b.length), f = e, g = 0; g < e; g++)
            if (a[g] !== b[g]) {
                f = g;
                break;
            } e = []; for (g = f; g < a.length; g++)
            e.push(".."); e = e.concat(b.slice(f)); return e.join("/"); }
        var Sa = [];
        function Ta(a, b) { Sa[a] = { input: [], output: [], ga: b }; X.Na(a, Ua); }
        var Ua = { open: function (a) { var b = Sa[a.node.rdev]; if (!b)
                throw new X.F(43); a.tty = b; a.seekable = !1; }, close: function (a) { a.tty.ga.flush(a.tty); }, flush: function (a) { a.tty.ga.flush(a.tty); }, read: function (a, b, d, e) { if (!a.tty || !a.tty.ga.$a)
                throw new X.F(60); for (var f = 0, g = 0; g < e; g++) {
                try {
                    var k = a.tty.ga.$a(a.tty);
                }
                catch (m) {
                    throw new X.F(29);
                }
                if (void 0 === k && 0 === f)
                    throw new X.F(6);
                if (null === k || void 0 === k)
                    break;
                f++;
                b[d + g] = k;
            } f && (a.node.timestamp = Date.now()); return f; }, write: function (a, b, d, e) {
                if (!a.tty || !a.tty.ga.Ka)
                    throw new X.F(60);
                try {
                    for (var f = 0; f < e; f++)
                        a.tty.ga.Ka(a.tty, b[d + f]);
                }
                catch (g) {
                    throw new X.F(29);
                }
                e && (a.node.timestamp = Date.now());
                return f;
            } }, Wa = { $a: function (a) {
                if (!a.input.length) {
                    var b = null;
                    if (v) {
                        var d = Buffer.ea ? Buffer.ea(256) : new Buffer(256), e = 0;
                        try {
                            e = ha.readSync(process.stdin.fd, d, 0, 256, null);
                        }
                        catch (f) {
                            if (-1 != f.toString().indexOf("EOF"))
                                e = 0;
                            else
                                throw f;
                        }
                        0 < e ? b = d.slice(0, e).toString("utf-8") : b = null;
                    }
                    else
                        "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" ==
                            typeof readline && (b = readline(), null !== b && (b += "\n"));
                    if (!b)
                        return null;
                    a.input = Va(b);
                }
                return a.input.shift();
            }, Ka: function (a, b) { null === b || 10 === b ? (ka(I(a.output, 0)), a.output = []) : 0 != b && a.output.push(b); }, flush: function (a) { a.output && 0 < a.output.length && (ka(I(a.output, 0)), a.output = []); } }, Xa = { Ka: function (a, b) { null === b || 10 === b ? (F(I(a.output, 0)), a.output = []) : 0 != b && a.output.push(b); }, flush: function (a) { a.output && 0 < a.output.length && (F(I(a.output, 0)), a.output = []); } }, Y = { V: null, L: function () {
                return Y.createNode(null, "/", 16895, 0);
            }, createNode: function (a, b, d, e) {
                if (X.Gb(d) || X.isFIFO(d))
                    throw new X.F(63);
                Y.V || (Y.V = { dir: { node: { S: Y.H.S, O: Y.H.O, lookup: Y.H.lookup, X: Y.H.X, rename: Y.H.rename, unlink: Y.H.unlink, rmdir: Y.H.rmdir, readdir: Y.H.readdir, symlink: Y.H.symlink }, stream: { T: Y.I.T } }, file: { node: { S: Y.H.S, O: Y.H.O }, stream: { T: Y.I.T, read: Y.I.read, write: Y.I.write, ia: Y.I.ia, ma: Y.I.ma, pa: Y.I.pa } }, link: { node: { S: Y.H.S, O: Y.H.O, readlink: Y.H.readlink }, stream: {} }, Ra: { node: { S: Y.H.S, O: Y.H.O }, stream: X.tb } });
                d = X.createNode(a, b, d, e);
                X.M(d.mode) ?
                    (d.H = Y.V.dir.node, d.I = Y.V.dir.stream, d.G = {}) : X.isFile(d.mode) ? (d.H = Y.V.file.node, d.I = Y.V.file.stream, d.J = 0, d.G = null) : X.fa(d.mode) ? (d.H = Y.V.link.node, d.I = Y.V.link.stream) : X.qa(d.mode) && (d.H = Y.V.Ra.node, d.I = Y.V.Ra.stream);
                d.timestamp = Date.now();
                a && (a.G[b] = d);
                return d;
            }, ac: function (a) { if (a.G && a.G.subarray) {
                for (var b = [], d = 0; d < a.J; ++d)
                    b.push(a.G[d]);
                return b;
            } return a.G; }, bc: function (a) { return a.G ? a.G.subarray ? a.G.subarray(0, a.J) : new Uint8Array(a.G) : new Uint8Array(0); }, Wa: function (a, b) {
                var d = a.G ? a.G.length :
                    0;
                d >= b || (b = Math.max(b, d * (1048576 > d ? 2 : 1.125) >>> 0), 0 != d && (b = Math.max(b, 256)), d = a.G, a.G = new Uint8Array(b), 0 < a.J && a.G.set(d.subarray(0, a.J), 0));
            }, Qb: function (a, b) { if (a.J != b)
                if (0 == b)
                    a.G = null, a.J = 0;
                else {
                    if (!a.G || a.G.subarray) {
                        var d = a.G;
                        a.G = new Uint8Array(b);
                        d && a.G.set(d.subarray(0, Math.min(b, a.J)));
                    }
                    else if (a.G || (a.G = []), a.G.length > b)
                        a.G.length = b;
                    else
                        for (; a.G.length < b;)
                            a.G.push(0);
                    a.J = b;
                } }, H: { S: function (a) {
                    var b = {};
                    b.dev = X.qa(a.mode) ? a.id : 1;
                    b.ino = a.id;
                    b.mode = a.mode;
                    b.nlink = 1;
                    b.uid = 0;
                    b.gid = 0;
                    b.rdev = a.rdev;
                    X.M(a.mode) ? b.size = 4096 : X.isFile(a.mode) ? b.size = a.J : X.fa(a.mode) ? b.size = a.link.length : b.size = 0;
                    b.atime = new Date(a.timestamp);
                    b.mtime = new Date(a.timestamp);
                    b.ctime = new Date(a.timestamp);
                    b.rb = 4096;
                    b.blocks = Math.ceil(b.size / b.rb);
                    return b;
                }, O: function (a, b) { void 0 !== b.mode && (a.mode = b.mode); void 0 !== b.timestamp && (a.timestamp = b.timestamp); void 0 !== b.size && Y.Qb(a, b.size); }, lookup: function () { throw X.Ba[44]; }, X: function (a, b, d, e) { return Y.createNode(a, b, d, e); }, rename: function (a, b, d) {
                    if (X.M(a.mode)) {
                        try {
                            var e = X.W(b, d);
                        }
                        catch (g) { }
                        if (e)
                            for (var f in e.G)
                                throw new X.F(55);
                    }
                    delete a.parent.G[a.name];
                    a.name = d;
                    b.G[d] = a;
                    a.parent = b;
                }, unlink: function (a, b) { delete a.G[b]; }, rmdir: function (a, b) { var d = X.W(a, b), e; for (e in d.G)
                    throw new X.F(55); delete a.G[b]; }, readdir: function (a) { var b = [".", ".."], d; for (d in a.G)
                    a.G.hasOwnProperty(d) && b.push(d); return b; }, symlink: function (a, b, d) { a = Y.createNode(a, b, 41471, 0); a.link = d; return a; }, readlink: function (a) { if (!X.fa(a.mode))
                    throw new X.F(28); return a.link; } }, I: { read: function (a, b, d, e, f) {
                    var g = a.node.G;
                    if (f >= a.node.J)
                        return 0;
                    a = Math.min(a.node.J - f, e);
                    if (8 < a && g.subarray)
                        b.set(g.subarray(f, f + a), d);
                    else
                        for (e = 0; e < a; e++)
                            b[d + e] = g[f + e];
                    return a;
                }, write: function (a, b, d, e, f, g) {
                    if (!e)
                        return 0;
                    a = a.node;
                    a.timestamp = Date.now();
                    if (b.subarray && (!a.G || a.G.subarray)) {
                        if (g)
                            return a.G = b.subarray(d, d + e), a.J = e;
                        if (0 === a.J && 0 === f)
                            return a.G = b.slice(d, d + e), a.J = e;
                        if (f + e <= a.J)
                            return a.G.set(b.subarray(d, d + e), f), e;
                    }
                    Y.Wa(a, f + e);
                    if (a.G.subarray && b.subarray)
                        a.G.set(b.subarray(d, d + e), f);
                    else
                        for (g = 0; g < e; g++)
                            a.G[f + g] = b[d +
                                g];
                    a.J = Math.max(a.J, f + e);
                    return e;
                }, T: function (a, b, d) { 1 === d ? b += a.position : 2 === d && X.isFile(a.node.mode) && (b += a.node.J); if (0 > b)
                    throw new X.F(28); return b; }, ia: function (a, b, d) { Y.Wa(a.node, b + d); a.node.J = Math.max(a.node.J, b + d); }, ma: function (a, b, d, e, f, g) {
                    assert(0 === b);
                    if (!X.isFile(a.node.mode))
                        throw new X.F(43);
                    a = a.node.G;
                    if (g & 2 || a.buffer !== K) {
                        if (0 < e || e + d < a.length)
                            a.subarray ? a = a.subarray(e, e + d) : a = Array.prototype.slice.call(a, e, e + d);
                        e = !0;
                        g = 16384 * Math.ceil(d / 16384);
                        for (b = Ya(g); d < g;)
                            J[b + d++] = 0;
                        d = b;
                        if (!d)
                            throw new X.F(48);
                        J.set(a, d);
                    }
                    else
                        e = !1, d = a.byteOffset;
                    return { jc: d, Ub: e };
                }, pa: function (a, b, d, e, f) { if (!X.isFile(a.node.mode))
                    throw new X.F(43); if (f & 2)
                    return 0; Y.I.write(a, b, 0, e, d, !1); return 0; } } }, X = { root: null, oa: [], Ua: {}, streams: [], Lb: 1, U: null, Ta: "/", Fa: !1, eb: !0, N: {}, jb: { hb: { nb: 1, ob: 2 } }, F: null, Ba: {}, Cb: null, ua: 0, cc: function (a) {
                if (!(a instanceof X.F)) {
                    a: {
                        var b = Error();
                        if (!b.stack) {
                            try {
                                throw Error();
                            }
                            catch (d) {
                                b = d;
                            }
                            if (!b.stack) {
                                b = "(no stack trace available)";
                                break a;
                            }
                        }
                        b = b.stack.toString();
                    }
                    c.extraStackTrace && (b += "\n" + c.extraStackTrace());
                    b = Ka(b);
                    throw a + " : " + b;
                }
                return La(a.P);
            }, K: function (a, b) {
                a = W(X.cwd(), a);
                b = b || {};
                if (!a)
                    return { path: "", node: null };
                var d = { Aa: !0, Ma: 0 }, e;
                for (e in d)
                    void 0 === b[e] && (b[e] = d[e]);
                if (8 < b.Ma)
                    throw new X.F(32);
                a = Na(a.split("/").filter(function (k) { return !!k; }), !1);
                var f = X.root;
                d = "/";
                for (e = 0; e < a.length; e++) {
                    var g = e === a.length - 1;
                    if (g && b.parent)
                        break;
                    f = X.W(f, a[e]);
                    d = V(d, a[e]);
                    X.$(f) && (!g || g && b.Aa) && (f = f.na.root);
                    if (!g || b.R)
                        for (g = 0; X.fa(f.mode);)
                            if (f = X.readlink(d), d = W(Pa(d), f), f = X.K(d, { Ma: b.Ma }).node, 40 < g++)
                                throw new X.F(32);
                }
                return { path: d, node: f };
            }, Z: function (a) { for (var b;;) {
                if (X.ra(a))
                    return a = a.L.gb, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
                b = b ? a.name + "/" + b : a.name;
                a = a.parent;
            } }, Ea: function (a, b) { for (var d = 0, e = 0; e < b.length; e++)
                d = (d << 5) - d + b.charCodeAt(e) | 0; return (a + d >>> 0) % X.U.length; }, bb: function (a) { var b = X.Ea(a.parent.id, a.name); a.ba = X.U[b]; X.U[b] = a; }, cb: function (a) { var b = X.Ea(a.parent.id, a.name); if (X.U[b] === a)
                X.U[b] = a.ba;
            else
                for (b = X.U[b]; b;) {
                    if (b.ba === a) {
                        b.ba = a.ba;
                        break;
                    }
                    b = b.ba;
                } }, W: function (a, b) {
                var d = X.Ib(a);
                if (d)
                    throw new X.F(d, a);
                for (d = X.U[X.Ea(a.id, b)]; d; d = d.ba) {
                    var e = d.name;
                    if (d.parent.id === a.id && e === b)
                        return d;
                }
                return X.lookup(a, b);
            }, createNode: function (a, b, d, e) { a = new X.kb(a, b, d, e); X.bb(a); return a; }, za: function (a) { X.cb(a); }, ra: function (a) { return a === a.parent; }, $: function (a) { return !!a.na; }, isFile: function (a) { return 32768 === (a & 61440); }, M: function (a) { return 16384 === (a & 61440); }, fa: function (a) { return 40960 === (a & 61440); }, qa: function (a) { return 8192 === (a & 61440); }, Gb: function (a) { return 24576 === (a & 61440); }, isFIFO: function (a) {
                return 4096 ===
                    (a & 61440);
            }, isSocket: function (a) { return 49152 === (a & 49152); }, Db: { r: 0, rs: 1052672, "r+": 2, w: 577, wx: 705, xw: 705, "w+": 578, "wx+": 706, "xw+": 706, a: 1089, ax: 1217, xa: 1217, "a+": 1090, "ax+": 1218, "xa+": 1218 }, Kb: function (a) { var b = X.Db[a]; if ("undefined" === typeof b)
                throw Error("Unknown file open mode: " + a); return b; }, Xa: function (a) { var b = ["r", "w", "rw"][a & 3]; a & 512 && (b += "w"); return b; }, da: function (a, b) {
                if (X.eb)
                    return 0;
                if (-1 === b.indexOf("r") || a.mode & 292) {
                    if (-1 !== b.indexOf("w") && !(a.mode & 146) || -1 !== b.indexOf("x") && !(a.mode &
                        73))
                        return 2;
                }
                else
                    return 2;
                return 0;
            }, Ib: function (a) { var b = X.da(a, "x"); return b ? b : a.H.lookup ? 0 : 2; }, Ja: function (a, b) { try {
                return X.W(a, b), 20;
            }
            catch (d) { } return X.da(a, "wx"); }, sa: function (a, b, d) { try {
                var e = X.W(a, b);
            }
            catch (f) {
                return f.P;
            } if (a = X.da(a, "wx"))
                return a; if (d) {
                if (!X.M(e.mode))
                    return 54;
                if (X.ra(e) || X.Z(e) === X.cwd())
                    return 10;
            }
            else if (X.M(e.mode))
                return 31; return 0; }, Jb: function (a, b) { return a ? X.fa(a.mode) ? 32 : X.M(a.mode) && ("r" !== X.Xa(b) || b & 512) ? 31 : X.da(a, X.Xa(b)) : 44; }, mb: 4096, Mb: function (a, b) {
                b = b || X.mb;
                for (a =
                    a || 0; a <= b; a++)
                    if (!X.streams[a])
                        return a;
                throw new X.F(33);
            }, ja: function (a) { return X.streams[a]; }, Ab: function (a, b, d) { X.va || (X.va = function () { }, X.va.prototype = { object: { get: function () { return this.node; }, set: function (g) { this.node = g; } } }); var e = new X.va, f; for (f in a)
                e[f] = a[f]; a = e; b = X.Mb(b, d); a.fd = b; return X.streams[b] = a; }, ub: function (a) { X.streams[a] = null; }, tb: { open: function (a) { a.I = X.Fb(a.node.rdev).I; a.I.open && a.I.open(a); }, T: function () { throw new X.F(70); } }, Ia: function (a) { return a >> 8; }, ec: function (a) {
                return a &
                    255;
            }, aa: function (a, b) { return a << 8 | b; }, Na: function (a, b) { X.Ua[a] = { I: b }; }, Fb: function (a) { return X.Ua[a]; }, Za: function (a) { var b = []; for (a = [a]; a.length;) {
                var d = a.pop();
                b.push(d);
                a.push.apply(a, d.oa);
            } return b; }, ib: function (a, b) {
                function d(k) { X.ua--; return b(k); }
                function e(k) { if (k) {
                    if (!e.Bb)
                        return e.Bb = !0, d(k);
                }
                else
                    ++g >= f.length && d(null); }
                "function" === typeof a && (b = a, a = !1);
                X.ua++;
                1 < X.ua && F("warning: " + X.ua + " FS.syncfs operations in flight at once, probably just doing extra work");
                var f = X.Za(X.root.L), g = 0;
                f.forEach(function (k) {
                    if (!k.type.ib)
                        return e(null);
                    k.type.ib(k, a, e);
                });
            }, L: function (a, b, d) { var e = "/" === d, f = !d; if (e && X.root)
                throw new X.F(10); if (!e && !f) {
                var g = X.K(d, { Aa: !1 });
                d = g.path;
                g = g.node;
                if (X.$(g))
                    throw new X.F(10);
                if (!X.M(g.mode))
                    throw new X.F(54);
            } b = { type: a, ic: b, gb: d, oa: [] }; a = a.L(b); a.L = b; b.root = a; e ? X.root = a : g && (g.na = b, g.L && g.L.oa.push(b)); return a; }, lc: function (a) {
                a = X.K(a, { Aa: !1 });
                if (!X.$(a.node))
                    throw new X.F(28);
                a = a.node;
                var b = a.na, d = X.Za(b);
                Object.keys(X.U).forEach(function (e) { for (e = X.U[e]; e;) {
                    var f = e.ba;
                    -1 !== d.indexOf(e.L) && X.za(e);
                    e = f;
                } });
                a.na = null;
                a.L.oa.splice(a.L.oa.indexOf(b), 1);
            }, lookup: function (a, b) { return a.H.lookup(a, b); }, X: function (a, b, d) { var e = X.K(a, { parent: !0 }).node; a = U(a); if (!a || "." === a || ".." === a)
                throw new X.F(28); var f = X.Ja(e, a); if (f)
                throw new X.F(f); if (!e.H.X)
                throw new X.F(63); return e.H.X(e, a, b, d); }, create: function (a, b) { return X.X(a, (void 0 !== b ? b : 438) & 4095 | 32768, 0); }, mkdir: function (a, b) { return X.X(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0); }, fc: function (a, b) {
                a = a.split("/");
                for (var d = "", e = 0; e < a.length; ++e)
                    if (a[e]) {
                        d += "/" + a[e];
                        try {
                            X.mkdir(d, b);
                        }
                        catch (f) {
                            if (20 != f.P)
                                throw f;
                        }
                    }
            }, ta: function (a, b, d) { "undefined" === typeof d && (d = b, b = 438); return X.X(a, b | 8192, d); }, symlink: function (a, b) { if (!W(a))
                throw new X.F(44); var d = X.K(b, { parent: !0 }).node; if (!d)
                throw new X.F(44); b = U(b); var e = X.Ja(d, b); if (e)
                throw new X.F(e); if (!d.H.symlink)
                throw new X.F(63); return d.H.symlink(d, b, a); }, rename: function (a, b) {
                var d = Pa(a), e = Pa(b), f = U(a), g = U(b);
                var k = X.K(a, { parent: !0 });
                var m = k.node;
                k = X.K(b, { parent: !0 });
                k = k.node;
                if (!m || !k)
                    throw new X.F(44);
                if (m.L !== k.L)
                    throw new X.F(75);
                var q = X.W(m, f);
                e = Ra(a, e);
                if ("." !== e.charAt(0))
                    throw new X.F(28);
                e = Ra(b, d);
                if ("." !== e.charAt(0))
                    throw new X.F(55);
                try {
                    var l = X.W(k, g);
                }
                catch (n) { }
                if (q !== l) {
                    d = X.M(q.mode);
                    if (f = X.sa(m, f, d))
                        throw new X.F(f);
                    if (f = l ? X.sa(k, g, d) : X.Ja(k, g))
                        throw new X.F(f);
                    if (!m.H.rename)
                        throw new X.F(63);
                    if (X.$(q) || l && X.$(l))
                        throw new X.F(10);
                    if (k !== m && (f = X.da(m, "w")))
                        throw new X.F(f);
                    try {
                        X.N.willMovePath && X.N.willMovePath(a, b);
                    }
                    catch (n) {
                        F("FS.trackingDelegate['willMovePath']('" + a + "', '" + b + "') threw an exception: " + n.message);
                    }
                    X.cb(q);
                    try {
                        m.H.rename(q, k, g);
                    }
                    catch (n) {
                        throw n;
                    }
                    finally {
                        X.bb(q);
                    }
                    try {
                        if (X.N.onMovePath)
                            X.N.onMovePath(a, b);
                    }
                    catch (n) {
                        F("FS.trackingDelegate['onMovePath']('" + a + "', '" + b + "') threw an exception: " + n.message);
                    }
                }
            }, rmdir: function (a) {
                var b = X.K(a, { parent: !0 }).node, d = U(a), e = X.W(b, d), f = X.sa(b, d, !0);
                if (f)
                    throw new X.F(f);
                if (!b.H.rmdir)
                    throw new X.F(63);
                if (X.$(e))
                    throw new X.F(10);
                try {
                    X.N.willDeletePath && X.N.willDeletePath(a);
                }
                catch (g) {
                    F("FS.trackingDelegate['willDeletePath']('" + a + "') threw an exception: " + g.message);
                }
                b.H.rmdir(b, d);
                X.za(e);
                try {
                    if (X.N.onDeletePath)
                        X.N.onDeletePath(a);
                }
                catch (g) {
                    F("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + g.message);
                }
            }, readdir: function (a) { a = X.K(a, { R: !0 }).node; if (!a.H.readdir)
                throw new X.F(54); return a.H.readdir(a); }, unlink: function (a) {
                var b = X.K(a, { parent: !0 }).node, d = U(a), e = X.W(b, d), f = X.sa(b, d, !1);
                if (f)
                    throw new X.F(f);
                if (!b.H.unlink)
                    throw new X.F(63);
                if (X.$(e))
                    throw new X.F(10);
                try {
                    X.N.willDeletePath && X.N.willDeletePath(a);
                }
                catch (g) {
                    F("FS.trackingDelegate['willDeletePath']('" +
                        a + "') threw an exception: " + g.message);
                }
                b.H.unlink(b, d);
                X.za(e);
                try {
                    if (X.N.onDeletePath)
                        X.N.onDeletePath(a);
                }
                catch (g) {
                    F("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + g.message);
                }
            }, readlink: function (a) { a = X.K(a).node; if (!a)
                throw new X.F(44); if (!a.H.readlink)
                throw new X.F(28); return W(X.Z(a.parent), a.H.readlink(a)); }, stat: function (a, b) { a = X.K(a, { R: !b }).node; if (!a)
                throw new X.F(44); if (!a.H.S)
                throw new X.F(63); return a.H.S(a); }, lstat: function (a) { return X.stat(a, !0); }, chmod: function (a, b, d) { var e; "string" === typeof a ? e = X.K(a, { R: !d }).node : e = a; if (!e.H.O)
                throw new X.F(63); e.H.O(e, { mode: b & 4095 | e.mode & -4096, timestamp: Date.now() }); }, lchmod: function (a, b) { X.chmod(a, b, !0); }, fchmod: function (a, b) { a = X.ja(a); if (!a)
                throw new X.F(8); X.chmod(a.node, b); }, chown: function (a, b, d, e) { var f; "string" === typeof a ? f = X.K(a, { R: !e }).node : f = a; if (!f.H.O)
                throw new X.F(63); f.H.O(f, { timestamp: Date.now() }); }, lchown: function (a, b, d) { X.chown(a, b, d, !0); }, fchown: function (a, b, d) {
                a = X.ja(a);
                if (!a)
                    throw new X.F(8);
                X.chown(a.node, b, d);
            }, truncate: function (a, b) { if (0 > b)
                throw new X.F(28); var d; "string" === typeof a ? d = X.K(a, { R: !0 }).node : d = a; if (!d.H.O)
                throw new X.F(63); if (X.M(d.mode))
                throw new X.F(31); if (!X.isFile(d.mode))
                throw new X.F(28); if (a = X.da(d, "w"))
                throw new X.F(a); d.H.O(d, { size: b, timestamp: Date.now() }); }, $b: function (a, b) { a = X.ja(a); if (!a)
                throw new X.F(8); if (0 === (a.flags & 2097155))
                throw new X.F(28); X.truncate(a.node, b); }, mc: function (a, b, d) { a = X.K(a, { R: !0 }).node; a.H.O(a, { timestamp: Math.max(b, d) }); }, open: function (a, b, d, e, f) {
                if ("" ===
                    a)
                    throw new X.F(44);
                b = "string" === typeof b ? X.Kb(b) : b;
                d = b & 64 ? ("undefined" === typeof d ? 438 : d) & 4095 | 32768 : 0;
                if ("object" === typeof a)
                    var g = a;
                else {
                    a = Oa(a);
                    try {
                        g = X.K(a, { R: !(b & 131072) }).node;
                    }
                    catch (m) { }
                }
                var k = !1;
                if (b & 64)
                    if (g) {
                        if (b & 128)
                            throw new X.F(20);
                    }
                    else
                        g = X.X(a, d, 0), k = !0;
                if (!g)
                    throw new X.F(44);
                X.qa(g.mode) && (b &= -513);
                if (b & 65536 && !X.M(g.mode))
                    throw new X.F(54);
                if (!k && (d = X.Jb(g, b)))
                    throw new X.F(d);
                b & 512 && X.truncate(g, 0);
                b &= -131713;
                e = X.Ab({ node: g, path: X.Z(g), flags: b, seekable: !0, position: 0, I: g.I, Tb: [], error: !1 }, e, f);
                e.I.open && e.I.open(e);
                !c.logReadFiles || b & 1 || (X.La || (X.La = {}), a in X.La || (X.La[a] = 1, F("FS.trackingDelegate error on read file: " + a)));
                try {
                    X.N.onOpenFile && (f = 0, 1 !== (b & 2097155) && (f |= X.jb.hb.nb), 0 !== (b & 2097155) && (f |= X.jb.hb.ob), X.N.onOpenFile(a, f));
                }
                catch (m) {
                    F("FS.trackingDelegate['onOpenFile']('" + a + "', flags) threw an exception: " + m.message);
                }
                return e;
            }, close: function (a) { if (X.la(a))
                throw new X.F(8); a.Da && (a.Da = null); try {
                a.I.close && a.I.close(a);
            }
            catch (b) {
                throw b;
            }
            finally {
                X.ub(a.fd);
            } a.fd = null; }, la: function (a) {
                return null ===
                    a.fd;
            }, T: function (a, b, d) { if (X.la(a))
                throw new X.F(8); if (!a.seekable || !a.I.T)
                throw new X.F(70); if (0 != d && 1 != d && 2 != d)
                throw new X.F(28); a.position = a.I.T(a, b, d); a.Tb = []; return a.position; }, read: function (a, b, d, e, f) {
                if (0 > e || 0 > f)
                    throw new X.F(28);
                if (X.la(a))
                    throw new X.F(8);
                if (1 === (a.flags & 2097155))
                    throw new X.F(8);
                if (X.M(a.node.mode))
                    throw new X.F(31);
                if (!a.I.read)
                    throw new X.F(28);
                var g = "undefined" !== typeof f;
                if (!g)
                    f = a.position;
                else if (!a.seekable)
                    throw new X.F(70);
                b = a.I.read(a, b, d, e, f);
                g || (a.position += b);
                return b;
            }, write: function (a, b, d, e, f, g) {
                if (0 > e || 0 > f)
                    throw new X.F(28);
                if (X.la(a))
                    throw new X.F(8);
                if (0 === (a.flags & 2097155))
                    throw new X.F(8);
                if (X.M(a.node.mode))
                    throw new X.F(31);
                if (!a.I.write)
                    throw new X.F(28);
                a.seekable && a.flags & 1024 && X.T(a, 0, 2);
                var k = "undefined" !== typeof f;
                if (!k)
                    f = a.position;
                else if (!a.seekable)
                    throw new X.F(70);
                b = a.I.write(a, b, d, e, f, g);
                k || (a.position += b);
                try {
                    if (a.path && X.N.onWriteToFile)
                        X.N.onWriteToFile(a.path);
                }
                catch (m) {
                    F("FS.trackingDelegate['onWriteToFile']('" + a.path + "') threw an exception: " +
                        m.message);
                }
                return b;
            }, ia: function (a, b, d) { if (X.la(a))
                throw new X.F(8); if (0 > b || 0 >= d)
                throw new X.F(28); if (0 === (a.flags & 2097155))
                throw new X.F(8); if (!X.isFile(a.node.mode) && !X.M(a.node.mode))
                throw new X.F(43); if (!a.I.ia)
                throw new X.F(138); a.I.ia(a, b, d); }, ma: function (a, b, d, e, f, g) { if (0 !== (f & 2) && 0 === (g & 2) && 2 !== (a.flags & 2097155))
                throw new X.F(2); if (1 === (a.flags & 2097155))
                throw new X.F(2); if (!a.I.ma)
                throw new X.F(43); return a.I.ma(a, b, d, e, f, g); }, pa: function (a, b, d, e, f) { return a && a.I.pa ? a.I.pa(a, b, d, e, f) : 0; }, hc: function () { return 0; },
            fb: function (a, b, d) { if (!a.I.fb)
                throw new X.F(59); return a.I.fb(a, b, d); }, readFile: function (a, b) { b = b || {}; b.flags = b.flags || "r"; b.encoding = b.encoding || "binary"; if ("utf8" !== b.encoding && "binary" !== b.encoding)
                throw Error('Invalid encoding type "' + b.encoding + '"'); var d, e = X.open(a, b.flags); a = X.stat(a).size; var f = new Uint8Array(a); X.read(e, f, 0, a, 0); "utf8" === b.encoding ? d = I(f, 0) : "binary" === b.encoding && (d = f); X.close(e); return d; }, writeFile: function (a, b, d) {
                d = d || {};
                d.flags = d.flags || "w";
                a = X.open(a, d.flags, d.mode);
                if ("string" ===
                    typeof b) {
                    var e = new Uint8Array(qa(b) + 1);
                    b = pa(b, e, 0, e.length);
                    X.write(a, e, 0, b, void 0, d.sb);
                }
                else if (ArrayBuffer.isView(b))
                    X.write(a, b, 0, b.byteLength, void 0, d.sb);
                else
                    throw Error("Unsupported data type");
                X.close(a);
            }, cwd: function () { return X.Ta; }, chdir: function (a) { a = X.K(a, { R: !0 }); if (null === a.node)
                throw new X.F(44); if (!X.M(a.node.mode))
                throw new X.F(54); var b = X.da(a.node, "x"); if (b)
                throw new X.F(b); X.Ta = a.path; }, wb: function () { X.mkdir("/tmp"); X.mkdir("/home"); X.mkdir("/home/web_user"); }, vb: function () {
                X.mkdir("/dev");
                X.Na(X.aa(1, 3), { read: function () { return 0; }, write: function (b, d, e, f) { return f; } });
                X.ta("/dev/null", X.aa(1, 3));
                Ta(X.aa(5, 0), Wa);
                Ta(X.aa(6, 0), Xa);
                X.ta("/dev/tty", X.aa(5, 0));
                X.ta("/dev/tty1", X.aa(6, 0));
                var a = Qa();
                X.Y("/dev", "random", a);
                X.Y("/dev", "urandom", a);
                X.mkdir("/dev/shm");
                X.mkdir("/dev/shm/tmp");
            }, yb: function () {
                X.mkdir("/proc");
                X.mkdir("/proc/self");
                X.mkdir("/proc/self/fd");
                X.L({ L: function () {
                        var a = X.createNode("/proc/self", "fd", 16895, 73);
                        a.H = { lookup: function (b, d) {
                                var e = X.ja(+d);
                                if (!e)
                                    throw new X.F(8);
                                b = { parent: null, L: { gb: "fake" }, H: { readlink: function () { return e.path; } } };
                                return b.parent = b;
                            } };
                        return a;
                    } }, {}, "/proc/self/fd");
            }, zb: function () { c.stdin ? X.Y("/dev", "stdin", c.stdin) : X.symlink("/dev/tty", "/dev/stdin"); c.stdout ? X.Y("/dev", "stdout", null, c.stdout) : X.symlink("/dev/tty", "/dev/stdout"); c.stderr ? X.Y("/dev", "stderr", null, c.stderr) : X.symlink("/dev/tty1", "/dev/stderr"); X.open("/dev/stdin", "r"); X.open("/dev/stdout", "w"); X.open("/dev/stderr", "w"); }, Va: function () {
                X.F || (X.F = function (a, b) {
                    this.node = b;
                    this.Rb =
                        function (d) { this.P = d; };
                    this.Rb(a);
                    this.message = "FS error";
                }, X.F.prototype = Error(), X.F.prototype.constructor = X.F, [44].forEach(function (a) { X.Ba[a] = new X.F(a); X.Ba[a].stack = "<generic error, no stack>"; }));
            }, Sb: function () { X.Va(); X.U = Array(4096); X.L(Y, {}, "/"); X.wb(); X.vb(); X.yb(); X.Cb = { MEMFS: Y }; }, ka: function (a, b, d) { X.ka.Fa = !0; X.Va(); c.stdin = a || c.stdin; c.stdout = b || c.stdout; c.stderr = d || c.stderr; X.zb(); }, quit: function () { X.ka.Fa = !1; var a = c._fflush; a && a(0); for (a = 0; a < X.streams.length; a++) {
                var b = X.streams[a];
                b && X.close(b);
            } },
            Ca: function (a, b) { var d = 0; a && (d |= 365); b && (d |= 146); return d; }, Zb: function (a, b) { a = X.wa(a, b); if (a.exists)
                return a.object; La(a.error); return null; }, wa: function (a, b) { try {
                var d = X.K(a, { R: !b });
                a = d.path;
            }
            catch (f) { } var e = { ra: !1, exists: !1, error: 0, name: null, path: null, object: null, Nb: !1, Pb: null, Ob: null }; try {
                d = X.K(a, { parent: !0 }), e.Nb = !0, e.Pb = d.path, e.Ob = d.node, e.name = U(a), d = X.K(a, { R: !b }), e.exists = !0, e.path = d.path, e.object = d.node, e.name = d.node.name, e.ra = "/" === d.path;
            }
            catch (f) {
                e.error = f.P;
            } return e; }, Xb: function (a, b) {
                a =
                    "string" === typeof a ? a : X.Z(a);
                for (b = b.split("/").reverse(); b.length;) {
                    var d = b.pop();
                    if (d) {
                        var e = V(a, d);
                        try {
                            X.mkdir(e);
                        }
                        catch (f) { }
                        a = e;
                    }
                }
                return e;
            }, xb: function (a, b, d, e, f) { a = V("string" === typeof a ? a : X.Z(a), b); return X.create(a, X.Ca(e, f)); }, Sa: function (a, b, d, e, f, g) {
                a = b ? V("string" === typeof a ? a : X.Z(a), b) : a;
                e = X.Ca(e, f);
                f = X.create(a, e);
                if (d) {
                    if ("string" === typeof d) {
                        a = Array(d.length);
                        b = 0;
                        for (var k = d.length; b < k; ++b)
                            a[b] = d.charCodeAt(b);
                        d = a;
                    }
                    X.chmod(f, e | 146);
                    a = X.open(f, "w");
                    X.write(a, d, 0, d.length, 0, g);
                    X.close(a);
                    X.chmod(f, e);
                }
                return f;
            }, Y: function (a, b, d, e) {
                a = V("string" === typeof a ? a : X.Z(a), b);
                b = X.Ca(!!d, !!e);
                X.Y.Ia || (X.Y.Ia = 64);
                var f = X.aa(X.Y.Ia++, 0);
                X.Na(f, { open: function (g) { g.seekable = !1; }, close: function () { e && e.buffer && e.buffer.length && e(10); }, read: function (g, k, m, q) { for (var l = 0, n = 0; n < q; n++) {
                        try {
                            var r = d();
                        }
                        catch (x) {
                            throw new X.F(29);
                        }
                        if (void 0 === r && 0 === l)
                            throw new X.F(6);
                        if (null === r || void 0 === r)
                            break;
                        l++;
                        k[m + n] = r;
                    } l && (g.node.timestamp = Date.now()); return l; }, write: function (g, k, m, q) {
                        for (var l = 0; l < q; l++)
                            try {
                                e(k[m + l]);
                            }
                            catch (n) {
                                throw new X.F(29);
                            }
                        q && (g.node.timestamp = Date.now());
                        return l;
                    } });
                return X.ta(a, b, f);
            }, Ya: function (a) {
                if (a.Ga || a.Hb || a.link || a.G)
                    return !0;
                var b = !0;
                if ("undefined" !== typeof XMLHttpRequest)
                    throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
                if (z)
                    try {
                        a.G = Va(z(a.url)), a.J = a.G.length;
                    }
                    catch (d) {
                        b = !1;
                    }
                else
                    throw Error("Cannot load without read() or XMLHttpRequest.");
                b || La(29);
                return b;
            }, Wb: function (a, b, d, e, f) {
                function g() { this.Ha = !1; this.ea = []; }
                g.prototype.get = function (l) { if (!(l > this.length - 1 || 0 > l)) {
                    var n = l % this.chunkSize;
                    return this.ab(l / this.chunkSize | 0)[n];
                } };
                g.prototype.lb = function (l) { this.ab = l; };
                g.prototype.Qa = function () {
                    var l = new XMLHttpRequest;
                    l.open("HEAD", d, !1);
                    l.send(null);
                    if (!(200 <= l.status && 300 > l.status || 304 === l.status))
                        throw Error("Couldn't load " + d + ". Status: " + l.status);
                    var n = Number(l.getResponseHeader("Content-length")), r, x = (r = l.getResponseHeader("Accept-Ranges")) &&
                        "bytes" === r;
                    l = (r = l.getResponseHeader("Content-Encoding")) && "gzip" === r;
                    var y = 1048576;
                    x || (y = n);
                    var t = this;
                    t.lb(function (E) {
                        var ba = E * y, R = (E + 1) * y - 1;
                        R = Math.min(R, n - 1);
                        if ("undefined" === typeof t.ea[E]) {
                            var mb = t.ea;
                            if (ba > R)
                                throw Error("invalid range (" + ba + ", " + R + ") or no bytes requested!");
                            if (R > n - 1)
                                throw Error("only " + n + " bytes available! programmer error!");
                            var A = new XMLHttpRequest;
                            A.open("GET", d, !1);
                            n !== y && A.setRequestHeader("Range", "bytes=" + ba + "-" + R);
                            "undefined" != typeof Uint8Array && (A.responseType = "arraybuffer");
                            A.overrideMimeType && A.overrideMimeType("text/plain; charset=x-user-defined");
                            A.send(null);
                            if (!(200 <= A.status && 300 > A.status || 304 === A.status))
                                throw Error("Couldn't load " + d + ". Status: " + A.status);
                            ba = void 0 !== A.response ? new Uint8Array(A.response || []) : Va(A.responseText || "");
                            mb[E] = ba;
                        }
                        if ("undefined" === typeof t.ea[E])
                            throw Error("doXHR failed!");
                        return t.ea[E];
                    });
                    if (l || !n)
                        y = n = 1, y = n = this.ab(0).length, ka("LazyFiles on gzip forces download of the whole file when length is accessed");
                    this.qb = n;
                    this.pb = y;
                    this.Ha =
                        !0;
                };
                if ("undefined" !== typeof XMLHttpRequest) {
                    if (!u)
                        throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                    var k = new g;
                    Object.defineProperties(k, { length: { get: function () { this.Ha || this.Qa(); return this.qb; } }, chunkSize: { get: function () { this.Ha || this.Qa(); return this.pb; } } });
                    k = { Ga: !1, G: k };
                }
                else
                    k = { Ga: !1, url: d };
                var m = X.xb(a, b, k, e, f);
                k.G ? m.G = k.G : k.url && (m.G = null, m.url = k.url);
                Object.defineProperties(m, { J: { get: function () { return this.G.length; } } });
                var q = {};
                Object.keys(m.I).forEach(function (l) { var n = m.I[l]; q[l] = function () { if (!X.Ya(m))
                    throw new X.F(29); return n.apply(null, arguments); }; });
                q.read = function (l, n, r, x, y) { if (!X.Ya(m))
                    throw new X.F(29); l = l.node.G; if (y >= l.length)
                    return 0; x = Math.min(l.length - y, x); if (l.slice)
                    for (var t = 0; t < x; t++)
                        n[r + t] = l[y + t];
                else
                    for (t = 0; t < x; t++)
                        n[r + t] = l.get(y + t); return x; };
                m.I = q;
                return m;
            }, Yb: function (a, b, d, e, f, g, k, m, q, l) {
                function n(x) {
                    function y(E) { l && l(); m || X.Sa(a, b, E, e, f, q); g && g(); Da(); }
                    var t = !1;
                    c.preloadPlugins.forEach(function (E) {
                        !t &&
                            E.canHandle(r) && (E.handle(x, r, y, function () { k && k(); Da(); }), t = !0);
                    });
                    t || y(x);
                }
                Za.ka();
                var r = b ? W(V(a, b)) : a;
                Ca();
                "string" == typeof d ? Za.Vb(d, function (x) { n(x); }, k) : n(d);
            }, indexedDB: function () { return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB; }, Oa: function () { return "EM_FS_" + window.location.pathname; }, Pa: 20, ha: "FILE_DATA", kc: function (a, b, d) {
                b = b || function () { };
                d = d || function () { };
                var e = X.indexedDB();
                try {
                    var f = e.open(X.Oa(), X.Pa);
                }
                catch (g) {
                    return d(g);
                }
                f.onupgradeneeded = function () {
                    ka("creating db");
                    f.result.createObjectStore(X.ha);
                };
                f.onsuccess = function () { var g = f.result.transaction([X.ha], "readwrite"), k = g.objectStore(X.ha), m = 0, q = 0, l = a.length; a.forEach(function (n) { n = k.put(X.wa(n).object.G, n); n.onsuccess = function () { m++; m + q == l && (0 == q ? b() : d()); }; n.onerror = function () { q++; m + q == l && (0 == q ? b() : d()); }; }); g.onerror = d; };
                f.onerror = d;
            }, dc: function (a, b, d) {
                b = b || function () { };
                d = d || function () { };
                var e = X.indexedDB();
                try {
                    var f = e.open(X.Oa(), X.Pa);
                }
                catch (g) {
                    return d(g);
                }
                f.onupgradeneeded = d;
                f.onsuccess = function () {
                    var g = f.result;
                    try {
                        var k = g.transaction([X.ha], "readonly");
                    }
                    catch (r) {
                        d(r);
                        return;
                    }
                    var m = k.objectStore(X.ha), q = 0, l = 0, n = a.length;
                    a.forEach(function (r) { var x = m.get(r); x.onsuccess = function () { X.wa(r).exists && X.unlink(r); X.Sa(Pa(r), U(r), x.result, !0, !0, !0); q++; q + l == n && (0 == l ? b() : d()); }; x.onerror = function () { l++; q + l == n && (0 == l ? b() : d()); }; });
                    k.onerror = d;
                };
                f.onerror = d;
            } }, $a = void 0;
        function ab() { $a += 4; return M[$a - 4 >> 2]; }
        function Z(a) { a = X.ja(a); if (!a)
            throw new X.F(8); return a; }
        function bb() { void 0 === bb.start && (bb.start = Date.now()); return 1E3 * (Date.now() - bb.start) | 0; }
        var cb = {};
        function db() { if (!eb) {
            var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: da || "./this.program" }, b;
            for (b in cb)
                a[b] = cb[b];
            var d = [];
            for (b in a)
                d.push(b + "=" + a[b]);
            eb = d;
        } return eb; }
        var eb;
        function fb(a, b, d, e) { a || (a = this); this.parent = a; this.L = a.L; this.na = null; this.id = X.Lb++; this.name = b; this.mode = d; this.H = {}; this.I = {}; this.rdev = e; }
        Object.defineProperties(fb.prototype, { read: { get: function () { return 365 === (this.mode & 365); }, set: function (a) { a ? this.mode |= 365 : this.mode &= -366; } }, write: { get: function () { return 146 === (this.mode & 146); }, set: function (a) { a ? this.mode |= 146 : this.mode &= -147; } }, Hb: { get: function () { return X.M(this.mode); } }, Ga: { get: function () { return X.qa(this.mode); } } });
        X.kb = fb;
        X.Sb();
        var Za, gb = !1;
        function Va(a) { var b = Array(qa(a) + 1); a = pa(a, b, 0, b.length); b.length = a; return b; }
        function ja(a) { for (var b = [], d = 0; d < a.length; d++) {
            var e = a[d];
            255 < e && (gb && assert(!1, "Character code " + e + " (" + String.fromCharCode(e) + ")  at offset " + d + " not in 0x00-0xFF."), e &= 255);
            b.push(String.fromCharCode(e));
        } return b.join(""); }
        var hb = "function" === typeof atob ? atob : function (a) {
            var b = "", d = 0;
            a = a.replace(/[^A-Za-z0-9\+\/=]/g, "");
            do {
                var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++));
                var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++));
                var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++));
                var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++));
                e = e << 2 | f >> 4;
                f = (f & 15) << 4 | g >> 2;
                var m = (g & 3) << 6 | k;
                b += String.fromCharCode(e);
                64 !== g && (b += String.fromCharCode(f));
                64 !== k && (b += String.fromCharCode(m));
            } while (d < a.length);
            return b;
        };
        function C(a) { if (Ea(a, Fa)) {
            a = a.slice(Fa.length);
            if ("boolean" === typeof v && v) {
                try {
                    var b = Buffer.from(a, "base64");
                }
                catch (g) {
                    b = new Buffer(a, "base64");
                }
                var d = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
            }
            else
                try {
                    var e = hb(a), f = new Uint8Array(e.length);
                    for (b = 0; b < e.length; ++b)
                        f[b] = e.charCodeAt(b);
                    d = f;
                }
                catch (g) {
                    throw Error("Converting base64 string to bytes failed.");
                }
            return d;
        } }
        xa.push({ Eb: function () { ib(); } });
        var jb = { m: function (a, b, d) { $a = d; try {
                var e = Z(a);
                switch (b) {
                    case 0:
                        var f = ab();
                        return 0 > f ? -28 : X.open(e.path, e.flags, 0, f).fd;
                    case 1:
                    case 2: return 0;
                    case 3: return e.flags;
                    case 4: return f = ab(), e.flags |= f, 0;
                    case 12: return f = ab(), sa[f + 0 >> 1] = 2, 0;
                    case 13:
                    case 14: return 0;
                    case 16:
                    case 8: return -28;
                    case 9: return La(28), -1;
                    default: return -28;
                }
            }
            catch (g) {
                return "undefined" !== typeof X && g instanceof X.F || D(g), -g.P;
            } }, e: function (a, b, d) {
                $a = d;
                try {
                    var e = a ? I(L, a, void 0) : "", f = ab();
                    return X.open(e, b, f).fd;
                }
                catch (g) {
                    return "undefined" !==
                        typeof X && g instanceof X.F || D(g), -g.P;
                }
            }, l: function (a, b, d) { try {
                var e = Z(a);
                return X.read(e, J, b, d);
            }
            catch (f) {
                return "undefined" !== typeof X && f instanceof X.F || D(f), -f.P;
            } }, b: function () { D(); }, k: bb, o: function (a, b, d) { L.copyWithin(a, b, b + d); }, n: function () { D("OOM"); }, g: function (a, b) { var d = 0; db().forEach(function (e, f) { var g = b + d; f = M[a + 4 * f >> 2] = g; for (g = 0; g < e.length; ++g)
                J[f++ >> 0] = e.charCodeAt(g); J[f >> 0] = 0; d += e.length + 1; }); return 0; }, h: function (a, b) {
                var d = db();
                M[a >> 2] = d.length;
                var e = 0;
                d.forEach(function (f) { e += f.length + 1; });
                M[b >> 2] = e;
                return 0;
            }, d: function (a) { try {
                var b = Z(a);
                X.close(b);
                return 0;
            }
            catch (d) {
                return "undefined" !== typeof X && d instanceof X.F || D(d), d.P;
            } }, i: function (a, b) { try {
                var d = Z(a);
                J[b >> 0] = d.tty ? 2 : X.M(d.mode) ? 3 : X.fa(d.mode) ? 7 : 4;
                return 0;
            }
            catch (e) {
                return "undefined" !== typeof X && e instanceof X.F || D(e), e.P;
            } }, j: function (a, b, d, e, f) {
                try {
                    var g = Z(a);
                    a = 4294967296 * d + (b >>> 0);
                    if (-9007199254740992 >= a || 9007199254740992 <= a)
                        return -61;
                    X.T(g, a, e);
                    T = [g.position >>> 0, (S = g.position, 1 <= +Math.abs(S) ? 0 < S ? (Math.min(+Math.floor(S / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((S - +(~~S >>> 0)) / 4294967296) >>> 0 : 0)];
                    M[f >> 2] = T[0];
                    M[f + 4 >> 2] = T[1];
                    g.Da && 0 === a && 0 === e && (g.Da = null);
                    return 0;
                }
                catch (k) {
                    return "undefined" !== typeof X && k instanceof X.F || D(k), k.P;
                }
            }, c: function (a, b, d, e) { try {
                a: {
                    for (var f = Z(a), g = a = 0; g < d; g++) {
                        var k = X.write(f, J, M[b + 8 * g >> 2], M[b + (8 * g + 4) >> 2], void 0);
                        if (0 > k) {
                            var m = -1;
                            break a;
                        }
                        a += k;
                    }
                    m = a;
                }
                M[e >> 2] = m;
                return 0;
            }
            catch (q) {
                return "undefined" !== typeof X && q instanceof X.F || D(q), q.P;
            } }, f: function (a) {
                var b = Date.now();
                M[a >> 2] = b / 1E3 | 0;
                M[a + 4 >> 2] = b % 1E3 * 1E3 |
                    0;
                return 0;
            }, a: H };
        (function () {
            function a(f) { c.asm = f.exports; la = c.asm.p; Da(); }
            function b(f) { a(f.instance); }
            function d(f) { return Ia().then(function (g) { return WebAssembly.instantiate(g, e); }).then(f, function (g) { F("failed to asynchronously prepare wasm: " + g); D(g); }); }
            var e = { a: jb };
            Ca();
            if (c.instantiateWasm)
                try {
                    return c.instantiateWasm(e, a);
                }
                catch (f) {
                    return F("Module.instantiateWasm callback failed with error: " + f), !1;
                }
            (function () {
                if (G || "function" !== typeof WebAssembly.instantiateStreaming || Ea(Q, Fa) || Ea(Q, "file://") || "function" !==
                    typeof fetch)
                    return d(b);
                fetch(Q, { credentials: "same-origin" }).then(function (f) { return WebAssembly.instantiateStreaming(f, e).then(b, function (g) { F("wasm streaming compile failed: " + g); F("falling back to ArrayBuffer instantiation"); return d(b); }); });
            })();
            return {};
        })();
        var ib = c.___wasm_call_ctors = function () { return (ib = c.___wasm_call_ctors = c.asm.q).apply(null, arguments); };
        c._av_frame_alloc = function () { return (c._av_frame_alloc = c.asm.r).apply(null, arguments); };
        c._avcodec_register_all = function () { return (c._avcodec_register_all = c.asm.s).apply(null, arguments); };
        c._avcodec_find_decoder_by_name = function () { return (c._avcodec_find_decoder_by_name = c.asm.t).apply(null, arguments); };
        c._av_init_packet = function () { return (c._av_init_packet = c.asm.u).apply(null, arguments); };
        c._av_packet_from_data = function () { return (c._av_packet_from_data = c.asm.v).apply(null, arguments); };
        c._avcodec_decode_video2 = function () { return (c._avcodec_decode_video2 = c.asm.w).apply(null, arguments); };
        c._avcodec_alloc_context3 = function () { return (c._avcodec_alloc_context3 = c.asm.x).apply(null, arguments); };
        c._avcodec_open2 = function () { return (c._avcodec_open2 = c.asm.y).apply(null, arguments); };
        c._avcodec_flush_buffers = function () { return (c._avcodec_flush_buffers = c.asm.z).apply(null, arguments); };
        var Ma = c.___errno_location = function () { return (Ma = c.___errno_location = c.asm.A).apply(null, arguments); }, kb = c.stackSave = function () { return (kb = c.stackSave = c.asm.B).apply(null, arguments); }, lb = c.stackRestore = function () { return (lb = c.stackRestore = c.asm.C).apply(null, arguments); }, nb = c.stackAlloc = function () { return (nb = c.stackAlloc = c.asm.D).apply(null, arguments); }, Ya = c._malloc = function () { return (Ya = c._malloc = c.asm.E).apply(null, arguments); };
        c._ff_h264_cabac_tables = 110714;
        c.ccall = function (a, b, d, e) { var f = { string: function (l) { var n = 0; if (null !== l && void 0 !== l && 0 !== l) {
                var r = (l.length << 2) + 1;
                n = nb(r);
                pa(l, L, n, r);
            } return n; }, array: function (l) { var n = nb(l.length); ra(l, n); return n; } }, g = na(a), k = []; a = 0; if (e)
            for (var m = 0; m < e.length; m++) {
                var q = f[d[m]];
                q ? (0 === a && (a = kb()), k[m] = q(e[m])) : k[m] = e[m];
            } d = g.apply(null, k); d = function (l) { return "string" === b ? l ? I(L, l, void 0) : "" : "boolean" === b ? !!l : l; }(d); 0 !== a && lb(a); return d; };
        c.setValue = function (a, b, d) { d = d || "i8"; "*" === d.charAt(d.length - 1) && (d = "i32"); switch (d) {
            case "i1":
                J[a >> 0] = b;
                break;
            case "i8":
                J[a >> 0] = b;
                break;
            case "i16":
                sa[a >> 1] = b;
                break;
            case "i32":
                M[a >> 2] = b;
                break;
            case "i64":
                T = [b >>> 0, (S = b, 1 <= +Math.abs(S) ? 0 < S ? (Math.min(+Math.floor(S / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((S - +(~~S >>> 0)) / 4294967296) >>> 0 : 0)];
                M[a >> 2] = T[0];
                M[a + 4 >> 2] = T[1];
                break;
            case "float":
                ta[a >> 2] = b;
                break;
            case "double":
                ua[a >> 3] = b;
                break;
            default: D("invalid type for setValue: " + d);
        } };
        c.getValue = function (a, b) { b = b || "i8"; "*" === b.charAt(b.length - 1) && (b = "i32"); switch (b) {
            case "i1": return J[a >> 0];
            case "i8": return J[a >> 0];
            case "i16": return sa[a >> 1];
            case "i32": return M[a >> 2];
            case "i64": return M[a >> 2];
            case "float": return ta[a >> 2];
            case "double": return ua[a >> 3];
            default: D("invalid type for getValue: " + b);
        } return null; };
        c.writeArrayToMemory = ra;
        c.FS = X;
        var ob;
        P = function pb() { ob || qb(); ob || (P = pb); };
        function qb() {
            function a() { if (!ob && (ob = !0, c.calledRun = !0, !ma)) {
                c.noFSInit || X.ka.Fa || X.ka();
                Ja(xa);
                X.eb = !1;
                Ja(ya);
                aa(c);
                if (c.onRuntimeInitialized)
                    c.onRuntimeInitialized();
                if (c.postRun)
                    for ("function" == typeof c.postRun && (c.postRun = [c.postRun]); c.postRun.length;) {
                        var b = c.postRun.shift();
                        za.unshift(b);
                    }
                Ja(za);
            } }
            if (!(0 < O)) {
                if (c.preRun)
                    for ("function" == typeof c.preRun && (c.preRun = [c.preRun]); c.preRun.length;)
                        Aa();
                Ja(wa);
                0 < O || (c.setStatus ? (c.setStatus("Running..."), setTimeout(function () {
                    setTimeout(function () { c.setStatus(""); }, 1);
                    a();
                }, 1)) : a());
            }
        }
        c.run = qb;
        if (c.preInit)
            for ("function" == typeof c.preInit && (c.preInit = [c.preInit]); 0 < c.preInit.length;)
                c.preInit.pop()();
        noExitRuntime = !0;
        qb();
        return OSH.ready;
    });
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = OSH;
else if (typeof define === 'function' && define['amd'])
    define([], function () { return OSH; });
else if (typeof exports === 'object')
    exports["OSH"] = OSH;
//# sourceMappingURL=ffmpeg-h264.js.map