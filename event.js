!(function(e) {
  function t(n) {
    if (r[n]) return r[n].exports;
    var a = (r[n] = { exports: {}, id: n, loaded: !1 });
    return e[n].call(a.exports, a, a.exports, t), (a.loaded = !0), a.exports;
  }
  var r = {};
  return (t.m = e), (t.c = r), (t.p = ""), t(0);
})([
  function(e, t) {
    AFRAME.registerComponent("proxy-event", {
      schema: {
        captureBubbles: { default: !1 },
        enabled: { default: !0 },
        event: { type: "string" },
        from: { type: "string" },
        to: { type: "string" },
        as: { type: "string" },
        bubbles: { default: !1 }
      },
      multiple: !0,
      init: function() {
        var e,
          t,
          r,
          n = this.data,
          a = this.el,
          l = this;
        if (
          (n.from
            ? (e =
                "PARENT" === n.from
                  ? [a.parentNode]
                  : document.querySelectorAll(n.from))
            : (r =
                "CHILDREN" === n.to
                  ? a.querySelectorAll("*")
                  : "SELF" === n.to
                  ? [a]
                  : document.querySelectorAll(n.to)),
          n.from)
        )
          for (t = 0; t < e.length; t++) this.addEventListenerFrom(e[t]);
        else
          a.addEventListener(n.event, function(e) {
            var n = l.data;
            if (n.enabled && (n.captureBubbles || e.target === a))
              for (t = 0; t < r.length; t++)
                r[t].emit(
                  n.as || n.event,
                  e.detail ? e.detail : null,
                  n.bubbles
                );
          });
      },
      addEventListenerFrom: function(e) {
        var t = this.data,
          r = this;
        e.addEventListener(t.event, function(t) {
          var n = r.data;
          n.enabled &&
            (n.captureBubbles || t.target === e) &&
            r.el.emit(n.as || n.event, t.detail ? t.detail : null, !1);
        });
      }
    });
  }
]);
