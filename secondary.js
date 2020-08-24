!(function(e) {
  function t(n) {
    if (i[n]) return i[n].exports;
    var a = (i[n] = { exports: {}, id: n, loaded: !1 });
    return e[n].call(a.exports, a, a.exports, t), (a.loaded = !0), a.exports;
  }
  var i = {};
  return (t.m = e), (t.c = i), (t.p = ""), t(0);
})([
  function(e, t) {
    function i(e, t, i) {
      var n,
        a,
        r,
        s,
        d,
        l,
        h = Math.ceil(t / e.columns);
      for (
        a = e.marginColumn,
          r = e.marginRow,
          i && ((a = e.margin), (r = e.margin)),
          d = o(e.align, h),
          s = o(e.align, e.columns),
          l = 0;
        l < h;
        l++
      )
        for (n = 0; n < e.columns; n++)
          p.set(0, 0, 0),
            0 === e.plane.indexOf("x") && (p.x = (n - s) * a),
            0 === e.plane.indexOf("y") && (p.y = (n - s) * a),
            1 === e.plane.indexOf("y") && (p.y = (l - d) * r),
            1 === e.plane.indexOf("z") && (p.z = (l - d) * r),
            u(p);
      return f;
    }
    function n(e, t) {
      var i, n;
      for (i = 0; i < t; i++)
        (n = isNaN(e.angle)
          ? (i * (2 * Math.PI)) / t
          : i * e.angle * 0.01745329252),
          p.set(0, 0, 0),
          0 === e.plane.indexOf("x") && (p.x = e.radius * Math.cos(n)),
          0 === e.plane.indexOf("y") && (p.y = e.radius * Math.cos(n)),
          1 === e.plane.indexOf("y") && (p.y = e.radius * Math.sin(n)),
          1 === e.plane.indexOf("z") && (p.z = e.radius * Math.sin(n)),
          u(p);
      return f;
    }
    function a(e, t) {
      return (e.columns = t), i(e, t, !0);
    }
    function r(e, t) {
      return (
        c(1, 0, 0, 0, 1, 0, 0, 0, 1, -1, 0, 0, 0, -1, 0, 0, 0, -1),
        l(e.radius / 2),
        f
      );
    }
    function s(e, t) {
      var i = (1 + Math.sqrt(5)) / 2,
        n = 1 / i,
        a = 2 - i,
        r = -1 * n,
        s = -1 * a;
      return (
        c(
          -1,
          a,
          0,
          -1,
          s,
          0,
          0,
          -1,
          a,
          0,
          -1,
          s,
          0,
          1,
          a,
          0,
          1,
          s,
          1,
          a,
          0,
          1,
          s,
          0,
          n,
          n,
          n,
          n,
          n,
          r,
          n,
          r,
          n,
          n,
          r,
          r,
          a,
          0,
          1,
          a,
          0,
          -1,
          r,
          n,
          n,
          r,
          n,
          r,
          r,
          r,
          n,
          r,
          r,
          r,
          s,
          0,
          1,
          s,
          0,
          -1
        ),
        l(e.radius / 2),
        f
      );
    }
    function d(e, t) {
      var i = Math.sqrt(3),
        n = -1 / Math.sqrt(3),
        a = 2 * Math.sqrt(2 / 3);
      return c(0, 0, i + n, -1, 0, n, 1, 0, n, 0, a, 0), l(e.radius / 2), f;
    }
    function o(e, t) {
      switch (e) {
        case "start":
          return t - 1;
        case "center":
          return (t - 1) / 2;
        case "end":
          return 0;
      }
    }
    function l(e) {
      var t;
      for (t = 0; t < f.length; t++) f[t] = f[t] * e;
    }
    function h(e, t, i) {
      var n, a, r;
      if (i)
        for (a = 0; a < e.length; a++)
          (n = e[a].getAttribute(i)),
            null !== n &&
              void 0 !== n &&
              ((r = 3 * parseInt(n, 10)),
              e[a].object3D.position.set(t[r], t[r + 1], t[r + 2]));
      else
        for (a = 0; a < t.length; a += 3) {
          if (!e[a / 3]) return;
          e[a / 3].object3D.position.set(t[a], t[a + 1], t[a + 2]);
        }
    }
    function c() {
      var e;
      for (e = 0; e < arguments.length; e++) f.push(e);
    }
    function u(e) {
      f.push(e.x), f.push(e.y), f.push(e.z);
    }
    var f = [],
      p = new THREE.Vector3();
    AFRAME.registerComponent("layout", {
      schema: {
        angle: {
          type: "number",
          default: !1,
          min: 0,
          max: 360,
          if: { type: ["circle"] }
        },
        columns: { default: 1, min: 0, if: { type: ["box"] } },
        margin: { default: 1, min: 0, if: { type: ["box", "line"] } },
        marginColumn: { default: 1, min: 0, if: { type: ["box"] } },
        marginRow: { default: 1, min: 0, if: { type: ["box"] } },
        orderAttribute: { default: "" },
        plane: { default: "xy" },
        radius: {
          default: 1,
          min: 0,
          if: { type: ["circle", "cube", "dodecahedron", "pyramid"] }
        },
        reverse: { default: !1 },
        type: {
          default: "line",
          oneOf: ["box", "circle", "cube", "dodecahedron", "line", "pyramid"]
        },
        fill: { default: !0, if: { type: ["circle"] } },
        align: { default: "end", oneOf: ["start", "center", "end"] }
      },
      init: function() {
        var e = this,
          t = this.el;
        (this.children = t.getChildEntities()),
          (this.initialPositions = []),
          this.children.forEach(function(t) {
            function i() {
              e.initialPositions.push(t.object3D.position.x),
                e.initialPositions.push(t.object3D.position.y),
                e.initialPositions.push(t.object3D.position.z);
            }
            return t.hasLoaded ? i() : void t.addEventListener("loaded", i);
          }),
          (this.handleChildAttached = this.handleChildAttached.bind(this)),
          (this.handleChildDetached = this.handleChildDetached.bind(this)),
          t.addEventListener("child-attached", this.handleChildAttached),
          t.addEventListener("child-detached", this.handleChildDetached),
          t.addEventListener("layoutrefresh", this.update.bind(this));
      },
      update: function(e) {
        var t,
          o,
          l,
          c = this.children,
          u = this.data,
          p = this.el;
        switch (((o = c.length), u.type)) {
          case "box":
            l = i;
            break;
          case "circle":
            l = n;
            break;
          case "cube":
            l = r;
            break;
          case "dodecahedron":
            l = s;
            break;
          case "pyramid":
            l = d;
            break;
          default:
            l = a;
        }
        (t = p.getDOMAttribute("layout")),
          (f.length = 0),
          (f = l(
            u,
            o,
            "string" == typeof t ? t.indexOf("margin") !== -1 : "margin" in t
          )),
          u.reverse && f.reverse(),
          h(c, f, u.orderAttribute);
      },
      remove: function() {
        this.el.removeEventListener("child-attached", this.handleChildAttached),
          this.el.removeEventListener(
            "child-detached",
            this.handleChildDetached
          ),
          h(this.children, this.initialPositions);
      },
      handleChildAttached: function(e) {
        var t = this.el;
        e.detail.el.parentNode === t &&
          (this.children.push(e.detail.el), this.update());
      },
      handleChildDetached: function(e) {
        this.children.indexOf(e.detail.el) !== -1 &&
          (this.children.splice(this.children.indexOf(e.detail.el), 1),
          this.initialPositions.splice(this.children.indexOf(e.detail.el), 1),
          this.update());
      }
    }),
      (e.exports.getBoxPositions = i),
      (e.exports.getCirclePositions = n),
      (e.exports.getLinePositions = a),
      (e.exports.getCubePositions = r),
      (e.exports.getDodecahedronPositions = s),
      (e.exports.getPyramidPositions = d);
  }
]);
