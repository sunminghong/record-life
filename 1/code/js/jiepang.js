window.JIEPANG_JS_VERSION = 8; (function() {
    if (! (window.google && google.gears)) {
        var j = null;
        if (typeof GearsFactory != "undefined") j = new GearsFactory;
        else try {
            j = new ActiveXObject("Gears.Factory");
            j.getBuildInfo().indexOf("ie_mobile") != -1 && j.privateSetGlobalObject(this)
        } catch(u) {
            if (typeof navigator.mimeTypes != "undefined" && navigator.mimeTypes["application/x-googlegears"]) {
                j = document.createElement("object");
                j.style.display = "none";
                j.width = j.height = 0;
                j.type = "application/x-googlegears";
                document.documentElement.appendChild(j)
            }
        }
        if (j) {
            window.google || (google = {});
            if (!google.gears) google.gears = {
                factory: j
            }
        }
    }
})();
window.jiepang = {
    version: function(j) {
        j > JIEPANG_JS_VERSION && location.reload()
    },
    ha_count: 0
};
window.onload = function() {
    var j = function(a, b) {
        var c;
        for (c = 0; c < a.length; c++) b(c, a[c])
    };
    window.$ = function(a) {
        var b, c = typeof a;
        if (c == "string") b = document.querySelectorAll(a);
        if (c == "undefined") b = [];
        if (c == "object") b = [a];
        b.css = function(d, e) {
            j(this,
            function(h, f) {
                f.style[d] = e
            });
            return this
        };
        b.show = function() {
            j(this,
            function(d, e) {
                e.style.display = e.tagName == "SPAN" ? "inline": "block"
            });
            return this
        };
        b.hide = function() {
            j(this,
            function(d, e) {
                e.style.display = "none"
            });
            return this
        };
        b.width = function() {
            if (this.length) return this[0].offsetWidth
        };
        b.height = function() {
            if (this.length) return this[0].offsetHeight
        };
        b.attr = function(d, e) {
            if (e) j(this,
            function(h, f) {
                f.setAttribute(d, e)
            });
            else if (this.length) return this[0].getAttribute(d)
        };
        b.click = function(d) {
            if (d) j(this,
            function(e, h) {
                h.onclick = d
            });
            else if (this.length) this[0].onclick();
            return this
        };
        b.val = function(d) {
            if (this.length) if (d) {
                this[0].value = d;
                return this
            } else return this[0].value
        };
        b.each = function(d) {
            j(this, d);
            return this
        };
        b.html = b.text = function(d) {
            j(this,
            function(e, h) {
                h.innerHTML = d;
                var f = RegExp(/<script.*?>([\s\S]+?)<\/script>/g);
                f.lastIndex = 0;
                for (var g; (g = f.exec(d)) != null;) try {
                    eval(g[1])
                } catch(n) {
                    alert(n)
                }
            });
            return this
        };
        b.addClass = function(d) {
            j(this,
            function(e, h) {
                var f;
                f = h.className.split(" ");
                f.indexOf(d) == -1 && f.push(d);
                f = f.join(" ");
                h.className = f
            });
            return this
        };
        b.removeClass = function(d) {
            j(this,
            function(e, h) {
                var f;
                f = h.className.split(" ");
                var g;
                if ((g = f.indexOf(d)) != -1) f[g] = "";
                f = f.join(" ");
                h.className = f
            });
            return this
        };
        b.hasClass = function(d) {
            if (this.length) return this[0].className.split(" ").indexOf(d) != -1
        };
        b.empty = function() {
            b.html("")
        };
        b.remove = function() {
            j(this,
            function(d, e) {
                e.parentNode.removeChild(e)
            });
            return this
        };
        b.bind = function(d, e) {
            j(this,
            function(h, f) {
                f["on" + d] = e
            });
            return this
        };
        b.append = function(d) {
            j(this,
            function(e, h) {
                h.appendChild(d)
            });
            return this
        };
        b.replaceWith = function(d) {
            if (typeof d == "string") {
                var e = document.createElement("span");
                e.innerHTML = d;
                d = e
            }
            e = window.scrollY;
            j(this,
            function(h, f) {
                var g = f.nextSibling,
                n = f.parentNode;
                g ? n.insertBefore(d, g) : n.appendChild(d);
                n.removeChild(f)
            });
            window.scroll(0, e)
        };
        return b
    };
    navigator.userAgent.indexOf("Android") != -1 && $("#install-android-entry").show();
    var u = function() {},
    B = function(a) {
        var b, c = [];
        for (b in a) c.push((encodeURIComponent(b) + "=" + encodeURIComponent(a[b])).replace("%20", "+"));
        return c.join("&")
    },
    E = function(a, b) {
        if (b) for (var c in b) a[c] = b[c]
    },
    F = function() {
        var a = $("#loading-box").show();
        a.css("left", (document.body.clientWidth - a.width()) / 2 + "px");
        a.css("top", scrollY + 100 + "px")
    },
    G = function(a) {
        var b = {
            type: "GET",
            timeout: 0
        };
        E(b, a);
        var c = false,
        d, e;
        if (window.XMLHttpRequest) e = new window.XMLHttpRequest;
        else a: {
            try {
                e = new window.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch(h) {}
            e = void 0
        }
        var f = e;
        if (f) {
            if (b.data && typeof b.data !== "string") b.data = B(b.data);
            if (b.data && b.data.length > 80) b.type = "POST";
            var g = f.onreadystatechange = function(l) {
                if (!f || f.readyState === 0 || l === "abort") {
                    c = true;
                    $("#loading-box").hide();
                    if (f) f.onreadystatechange = u
                } else if (!c && f && (f.readyState === 4 || l === "timeout")) {
                    c = true;
                    $("#loading-box").hide();
                    f.onreadystatechange = u;
                    var o;
                    if (typeof l == "string") o = l;
                    else {
                        a: {
                            try {
                                o = !f.status && location.protocol === "file:" || f.status >= 200 && f.status < 300 || f.status === 304 || f.status === 1223 || f.status === 0;
                                break a
                            } catch(N) {}
                            o = false
                        }
                        o = o ? "success": "error"
                    }
                    status = o;
                    if (status === "success") {
                        d = f.responseText;
                        if (f.getResponseHeader("X-Jiepang-Auth-Fail")) b.authfail && b.authfail(f.getResponseHeader("X-Jiepang-Auth-Fail"));
                        else b.success && b.success(d)
                    }
                    l === "timeout" && f.abort();
                    f = null
                }
            };
            f.open(b.type, b.url + (b.type === "GET" ? (b.url.indexOf("?") == -1 ? "?": "&") + b.data: ""), 1);
            b.type === "POST" && f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            f.send(b.type === "POST" || b.type === "PUT" || b.type === "DELETE" ? b.data: null);
            try {
                var n = f.abort;
                f.abort = function() {
                    g("abort");
                    f && n.call(f)
                }
            } catch(q) {}
            F();
            b.timeout > 0 && setTimeout(function() {
                f && !c && g("timeout")
            },
            b.timeout);
            return f
        }
    },
    r = function(a, b, c) {
        if (typeof b != "undefined") {
            c = c || {};
            if (b === null) {
                b = "";
                c.expires = -1
            }
            var d = "";
            if (c.expires && (typeof c.expires == "number" || c.expires.toUTCString)) {
                if (typeof c.expires == "number") {
                    d = new Date;
                    d.setTime(d.getTime() + c.expires * 864E5)
                } else d = c.expires;
                d = "; expires=" + d.toUTCString()
            }
            c = c.path ? "; path=" + c.path: "";
            document.cookie = [a, "=", encodeURIComponent(b), d, c].join("")
        } else {
            b = null;
            if (document.cookie && document.cookie != "") {
                c = document.cookie.split(";");
                for (d = 0; d < c.length; d++) {
                    var e = (c[d] || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
                    if (e.substring(0, a.length + 1) == a + "=") {
                        b = decodeURIComponent(e.substring(a.length + 1));
                        break
                    }
                }
            }
            return b
        }
    };
    jiepang.lang = function(a) {
        r("JIEPANGLANG", a, {
            expires: 30
        });
        location.replace(location.href)
    };
    jiepang.latlng = "";
    var v = navigator.geolocation ? navigator.geolocation: window.google && google.gears ? google.gears.factory.create("beta.geolocation") : null,
    t = null,
    s = {
        maximumAge: 2E9,
        gearsRequestAddress: true,
        gearsAddressLanguage: "zh-CN",
        gearsLocationProviderUrls: ["http://www.google.cn/loc/json"],
        enableHighAccuracy: false,
        timeout: 0
    },
    H = function(a) {
        if (a.coords) {
            s.enableHighAccuracy && $("#location-bar").text("���ҵ�����λ��");
            jiepang.latlng = a.coords.latitude + "," + a.coords.longitude + "," + (a.coords.accuracy ? a.coords.accuracy / 3 : 100);
            jiepang.lat = a.coords.latitude;
            jiepang.lon = a.coords.longitude;
            jiepang.city = "";
            if (a.gearsAddress) jiepang.city = a.gearsAddress.city;
            if (s.enableHighAccuracy) {
                jiepang.ha_count++;
                jiepang.ha_count == 1 && $("input.afterlocation").each(function(b, c) {
                    eval(c.value)
                })
            } else {
                s.enableHighAccuracy = true;
                s.maximumAge = 0;
                s.timeout = 3E4;
                y();
                w()
            }
        }
    },
    I = function(a) {
        if (!jiepang.latlng) if (a.code == a.TIMEOUT) {
            s.timeout = 3E4;
            y();
            w()
        } else $("#location-bar").text("�޷��ҵ�����λ�ã����˳�������")
    },
    y = function() {
        if (v && t) {
            v.clearWatch(t);
            t = null
        }
    },
    w = function() {
        if (v && !t) t = v.watchPosition(H, I, s)
    },
    C = null;
    w();
    window.onscroll = window.onclick = function() {
        clearTimeout(C);
        C = setTimeout(y, 6E4);
        w()
    };
    var z = null,
    x = {};
    window.urlhistory = [];
    var p = function() {
        x = {};
        urlhistory = [];
        $("#goback").hide()
    };
    window.flushhistory = p;
    var i = window.ajax = function(a, b, c, d) {
        z && z.abort();
        if (typeof b == "function") {
            d = c;
            c = b;
            b = {}
        }
        b.latlng = jiepang.latlng;
        b.ha_count = jiepang.ha_count;
        b = B(b);
        var e = a + ":" + b;
        if (d && typeof x[e] != "undefined") c(x[e]);
        else {
            window.pageTracker && pageTracker._trackPageview(a);
            z = G({
                url: a,
                data: b,
                success: function(h) {
                    typeof c == "function" && c(h);
                    x[e] = h;
                    r("PHPSESSID") && window.localStorage && window.localStorage.setItem("PHPSESSID", r("PHPSESSID"))
                },
                error: function(h, f) {
                    alert(f)
                },
                authfail: function(h) {
                    if (h == 26) if (a == "action.php?a=login") alert("�û������������");
                    else {
                        alert("�û�����������������µ�¼");
                        logout()
                    } else {
                        h == 22 ? alert("�� Email ��δ�����ʹ���û�����¼��") : alert("�����µ�¼");
                        logout()
                    }
                }
            })
        }
    };
    window.ajaxReplace = function(a, b, c, d) {
        if (typeof b != "object") {
            d = c;
            c = b;
            b = {}
        }
        i(a, b,
        function(e) {
            window.gobackhook = null;
            if (urlhistory.length > 0 && urlhistory[urlhistory.length - 1][0] == a) urlhistory[urlhistory.length - 1][1] = b;
            else urlhistory.push([a, b]);
            urlhistory.length > 1 ? $("#goback").show() : $("#goback").hide();
            $("#main").html(e);
            var h = $("ul#subnav span").each(function(f, g) {
                g.onclick = function() {
                    $("ul#subnav span").removeClass("selected");
                    $(g).addClass("selected");
                    $("#main .tab-page").hide();
                    $("#main #" + $(g).attr("showid")).show()
                }
            });
            $(h[0]).click();
            $("input.afterrender").each(function(f, g) {
                eval(g.value)
            });
            typeof c == "function" && c(e);
            $(".what").css("width", document.body.clientWidth - 80 + "px")
        },
        d)
    };
    window.goback = function(a) {
        var b, c;
        if (typeof window.gobackhook == "function") {
            a = window.gobackhook;
            window.gobackhook = null;
            a();
            urlhistory.length <= 1 && $("#goback").hide()
        } else {
            urlhistory.pop();
            b = urlhistory.pop();
            if (typeof b == "function") b();
            else {
                c = b[1];
                b = b[0];
                ajaxReplace(b, c, u, !a)
            }
        }
    };
    window.shout = function() {
        var a = document.shoutform.status.value,
        b = [],
        c;
        for (c = 0; c < m.length; c++) document.shoutform["sync" + m[c]] && document.shoutform["sync" + m[c]].checked && b.push(m[c]);
        b = b.join(",");
        i("action.php?a=shoutdo", {
            status: a,
            syncs: b
        },
        function(d) {
            if (d == "ok") {
                p();
                ajaxReplace("action.php?a=events")
            } else alert(d)
        })
    };
    window.checkin = function() {
        var a = document.checkinform.guid.value,
        b = document.checkinform.status.value,
        c = document.checkinform.privacy.checked ? 1 : 0,
        d = [],
        e;
        for (e = 0; e < m.length; e++) document.checkinform["sync" + m[e]] && document.checkinform["sync" + m[e]].checked && d.push(m[e]);
        d = d.join(",");
        ajaxReplace("action.php?a=checkindo", {
            guid: a,
            status: b,
            syncs: d,
            privacy: c
        })
    };
    window.tip = function(a) {
        var b = prompt("���ⷢ����ʲô����ģ��óԵģ��ÿ��ģ�д�����Ը������Ѱ�:");
        b != null && i("action.php?a=tip", {
            id: a,
            status: b
        },
        function(c) {
            if (c == "ok") {
                p();
                ajaxReplace("action.php?a=venue&id=" + a,
                function() {
                    $("span[showid=tips]").click()
                });
                alert("�ɹ�����")
            } else alert(c)
        })
    };
    window.addtip = function() {
        var a = document.addtipform.guid.value,
        b = document.addtipform.status.value;
        if (b) {
            var c = [],
            d;
            for (d = 0; d < m.length; d++) document.addtipform["sync" + m[d]] && document.addtipform["sync" + m[d]].checked && c.push(m[d]);
            c = c.join(",");
            i("action.php?a=addtipdo", {
                guid: a,
                status: b,
                syncs: c
            },
            function(e) {
                if (e == "ok") {
                    p();
                    ajaxReplace("action.php?a=venue&id=" + a,
                    function() {
                        $("span[showid=tips]").click()
                    });
                    alert("���Է���ɹ������Ļ���+1���������Ϊ���ʹ��ԣ�������+10")
                } else alert(e)
            })
        } else alert("����д�������ݡ�")
    };
    window.schedule = function() {
        var a = document.scheduleform.guid.value,
        b = document.scheduleform.status.value,
        c = [],
        d;
        for (d = 0; d < m.length; d++) document.scheduleform["sync" + m[d]] && document.scheduleform["sync" + m[d]].checked && c.push(m[d]);
        c = c.join(",");
        i("action.php?a=scheduledo", {
            guid: a,
            status: b,
            syncs: c
        },
        function(e) {
            if (e == "ok") {
                p();
                ajaxReplace("action.php?a=venue&id=" + a);
                alert("�����ɹ���")
            } else alert(e)
        })
    };
    window.venue = function(a, b) {
        ajaxReplace("action.php?a=venue&id=" + a,
        function() {
            window.scroll(0, 0);
            typeof b != "undefined" && $("span[showid=" + b + "]").click()
        })
    };
    window.mainnav = function(a) {
        $("ul#nav span").removeClass("selected");
        $("span#nav-" + a).addClass("selected")
    };
    window.user = function(a, b) {
        ajaxReplace("action.php?a=user&id=" + a,
        function() {
            window.scroll(0, 0);
            typeof b != "undefined" && $("span[showid=" + b + "]").click()
        })
    };
    window.search = function(a) {
        ajaxReplace("action.php?a=venues&q=" + a)
    };
    var J = $("ul#nav span[href]").each(function(a, b) {
        b.onclick = function() {
            $("ul#nav span").removeClass("selected");
            $(b).addClass("selected");
            ajaxReplace(b.getAttribute("href"));
            p()
        }
    });
    window.login = function(a, b) {
        var c = function() {
            $("#password").val("");
            $("#loginform").hide();
            $("ul#nav").show();
            $("#more").show();
            $("#logouttext").show();
            $("#buds-banner") != null && $("#buds-banner").show();
            $("#buds-small") != null && $("#buds-small").hide();
            b ? ajaxReplace("action.php?a=more&reg=1") : $(J[0]).click()
        };
        if (a) if (typeof navigator.onLine != "undefined" && !navigator.onLine) $("#loginform").html('<h3>����</h3><p>�������������ʹ�ý��ԡ�</p><div class="hasPadding"><div class="big-button" onclick="location.reload()">����</div></div>').show();
        else {
            r("jiepang_cookie_test", 1);
            if (r("jiepang_cookie_test")) {
                r("jiepang_cookie_test", null); ! r("PHPSESSID") && window.localStorage && window.localStorage.PHPSESSID && r("PHPSESSID", window.localStorage.PHPSESSID, {
                    path: "/",
                    expires: 30
                });
                b || r("PHPSESSID") ? c() : $("#loginform").show()
            } else $("#loginform").text("���������� cookie ���ܺ���ʹ�ý��ԡ�").show()
        } else {
            var d = $("#loginform #username").val(),
            e = $("#loginform #password").val();
            if (d && e) i("action.php?a=login", {
                username: d,
                password: e
            },
            function(h) {
                p();
                try {
                    var f = eval("(" + h + ")");
                    if (f.error) alert("����");
                    else {
                        $("#city-bar").text(f.city);
                        c()
                    }
                } catch(g) {
                    alert("�����������Ժ�����")
                }
            });
            else {
                $("#loginform").show();
                alert("����д�û���������")
            }
        }
    };
    login(1);
    window.showlatlng = function() {};
    window.logout = function() {
        i("action.php?a=logout",
        function() {
            p();
            $("ul#nav").hide();
            $("#more").hide();
            $("#main").empty();
            $("#loginform").show();
            $("#logouttext").hide();
            $("#buds-banner") != null && $("#buds-banner").hide();
            $("#buds-small") != null && $("#buds-small").show();
            $("#city-bar").text("");
            window.localStorage && window.localStorage.removeItem("PHPSESSID")
        })
    };
    window.signup = function() {
        var a = $("#susername").val(),
        b = $("#semail").val(),
        c = $("#spassword").val(),
        d = $("#city").val();
        if (a) if (b) c ? i("action.php?a=signupdo", {
            username: a,
            password: c,
            email: b,
            city: d,
            vendor: document.location.href
        },
        function(e) {
            p();
            if (e == "ok") {
                alert("��ϲ�㣬ע��ɹ���");
                login(1, 1)
            } else alert(e)
        }) : alert("����д����");
        else alert("����дEmail");
        else alert("����д�û���")
    };
    window.addvenue = function() {
        var a = document.addvenueform.city.value,
        b = document.addvenueform.name.value;
        if (b == "") alert("����д�ص�����");
        else {
            var c = document.addvenueform.addr.value;
            c == "" ? alert("����д��ַ") : i("action.php?a=addvenuedo", {
                city: a,
                name: b,
                addr: c
            },
            function(d) {
                p();
                try {
                    var e = eval("(" + d + ")");
                    if (e) if (e.error) alert(e.error.message);
                    else {
                        venue(e.location.guid);
                        alert("�ص���ӳɹ���")
                    }
                } catch(h) {
                    alert(d)
                }
            })
        }
    };
    window.mayors = function() {};
    window.badges = function(a) {
        var b, c = "�õ������»��£�\n";
        for (b = 0; b < a.length; b++) c += "* " + a[b].name + " (" + a[b].description + ")\n";
        alert(c)
    };
    window.fav = function(a, b) {
        $obj = $(a);
        if ($obj.hasClass("fav-star")) {
            $obj.removeClass("fav-star");
            i("action.php?a=fav", {
                id: b,
                fav: 0
            })
        } else {
            $obj.addClass("fav-star");
            i("action.php?a=fav", {
                id: b,
                fav: 1
            })
        }
    };
    window.friend = function(a, b, c) { (b || confirm(c ? "ȷ��Ҫ�����ע��": "ȷ��Ҫ���������")) && i("action.php?a=friend", {
            id: a,
            add: b
        },
        function() {
            if (b && c) ajaxReplace("action.php?a=sync_follow&id=" + a,
            function() {
                window.scroll(0, 0)
            });
            else {
                $("#friend-status").text(b ? "���������ѷ���": c ? "��ȡ����ע": "�����ѽ��");
                $("#friend-status-" + a).text(b ? "���������ѷ���": c ? "��ȡ����ע": "�����ѽ��")
            }
        })
    };
    window.friendreply = function(a, b, c) {
        i("action.php?a=friendreply", {
            id: a,
            reply: b
        },
        function() {
            $("#inv-" + a).remove();
            $(".inv").length == 0 && $("#invitations").remove();
            c && c()
        })
    };
    window.inlinefriendreply = function(a, b) {
        i("action.php?a=friendreply", {
            id: a,
            reply: b
        },
        function() {
            b == 1 ? $("#user_is_inviter").replaceWith('<p style ="color: #555555">�ѽ��ܺ�������</p>') : $("#user_is_inviter").replaceWith('<p style ="color: #555555">�Ѻ��Ժ�������</p>')
        })
    };
    var K = {
        renren: "����",
        kaixin001: "����",
        sina: "����΢��",
        douban: "����",
        facebook: "Facebook",
        twitter: "Twitter",
        plurk: "Plurk",
        wretch: "Wretch",
        fanfou: "����"
    },
    m = ["kaixin001", "sina", "douban", "renren", "facebook", "twitter", "plurk", "wretch", "fanfou"];
    window.sync = function(a) {
        var b = document["syncform_" + a].username.value,
        c = document["syncform_" + a].password.value;
        b && c ? i("action.php?a=sync", {
            service: a,
            susername: b,
            spassword: c
        },
        function(d) {
            if (d == "ok") {
                $("#syncform_" + a).hide();
                $("#syncsuccess_" + a).show()
            } else alert(d)
        }) : alert("������" + K[a] + "���û���������")
    };
    window.cancelsync = function(a) {
        confirm("���ͬ���������ǽ����ܵ�֪���Ķ�̬�����Ҫ�����") && i("action.php?a=cancelsync", {
            service: a
        },
        function() {
            $("#syncsuccess_" + a).hide();
            $("#syncform_" + a).show()
        })
    };
    window.addfriend = function() {
        i("action.php?a=addfriend", {
            friendusername: document.addfriendform.friendusername.value
        },
        function(a) { (a = parseInt(a)) ? user(a) : alert("�Ҳ������û�")
        })
    };
    window.changecity = function() {
        i("action.php?a=changecitydo", {
            city: document.changecityform.city.value
        },
        function() {
            p();
            ajaxReplace("action.php?a=venues")
        })
    };
    window.getComments = function(a, b, c, d) {
        if (document.getElementById("reply-text-" + b).innerHTML == c) {
            $("#reply-text-" + b).html(d);
            showComments(a, b)
        } else {
            $("#reply-text-" + b).html(c);
            $("#status-comments-" + b).addClass("comment-noshow")
        }
    };
    window.showComments = function(a, b) {
        data = {};
        data.id = a;
        data.show_id = b;
        i("action.php?a=getcomments", data,
        function(c) {
            $("#status-comments-" + b).html(c);
            $("#status-comments-" + b).removeClass("comment-noshow")
        })
    };
    window.addComment = function(a, b) {
        data = {};
        data.reply_post_id = a;
        data.comment = $("#comment-reply-" + b).val();
        i("action.php?a=addcomment", data,
        function() {
            showComments(a, b)
        })
    };
    window.deleteComment = function(a, b, c) {
        if (confirm(c)) {
            $("#comment-entry-" + b).addClass("comment-noshow");
            data = {};
            data.id = b;
            i("action.php?a=deletecomment", data,
            function() {})
        }
    };
    window.replySomeone = function(a, b, c) {
        if (addReply(a)) {
            $("#comment-reply-" + a).html(c + b + ": ");
            a = document.getElementById("comment-reply-" + a);
            a.focus();
            a.select();
            window.getSelection().collapseToEnd();
            b = a.createTextRange();
            b.text = a.value;
            b.select();
            b.collapse(false)
        }
    };
    window.addReply = function(a) {
        if ($("#comment-reply-" + a).attr("class") == "comment-reply comment-disabled") {
            $("#comment-reply-btn-" + a).removeClass("comment-noshow");
            $("#comment-reply-" + a).html("");
            $("#comment-reply-" + a).removeClass("comment-disabled")
        }
        return true
    };
    window.togglePraise = function(a, b, c) {
        data = {};
        data.id = a;
        data.status = c;
        i("action.php?a=praise", data,
        function(d) {
            try {
                d = eval("(" + d + ")");
                if (d.status == 1) $("#start-praise-" + b).replaceWith('<a id="start-praise-' + b + '" class="start-praise-yes" onclick="togglePraise(' + a + "," + b + ',-1);">��(' + d.num_likes + ")</a>");
                else d.status == -1 && $("#start-praise-" + b).replaceWith('<a id="start-praise-' + b + '" class="start-praise-no" onclick="togglePraise(' + a + "," + b + ',1);">��(' + d.num_likes + ")</a>")
            } catch(e) {
                alert("���ִ���������")
            }
        })
    };
    window.usecoupon = function(a) {
        confirm("ȷ��Ҫʹ���ػ���") && i("action.php?a=usecoupon", {
            id: a
        },
        function() {
            $("#usecoupon").click(function() {}).addClass("big-button-disabled").text("�ػ�ʹ�óɹ�")
        })
    };
    window.show_province_city = function(a, b, c) {
        var d = ["����", "�Ϻ�", "���", "����", "�ӱ�,ʯ��ׯ,��ɽ,�ػʵ�,����,��̨,����,�żҿ�,�е�,����,�ȷ�,��ˮ", "ɽ��,̫ԭ,��ͬ,��Ȫ,����,����,˷��,����,�˳�,����,�ٷ�,����", "���ɹ�,���ͺ���,��ͷ,�ں�,���,ͨ��,������˹,���ױ���,�����׶�,�����첼,�˰�,���ֹ���,������", "����,����,����,��ɽ,��˳,��Ϫ,����,����,��«��,Ӫ��,�̽�,����,����,����,����", "����,����,����,��ƽ,��Դ,ͨ��,��ɽ,��ԭ,�׳�,�ӱ�", "����,�Ͼ�,����,����,����,����,��ͨ,���Ƹ�,����,�γ�,����,��,̩��,��Ǩ", "�㽭,����,����,����,����,����,����,��,����,��ɽ,̨��,��ˮ", "����,�Ϸ�,�ߺ�,����,����,��ɽ,����,ͭ��,����,��ɽ,����,����,����,����,����,����,����,����", "����,����,����,����,����,Ȫ��,����,��ƽ,����,����", "����,�ϲ�,������,Ƽ��,����,�Ž�,ӥ̶,����,����,�˴�,����,����", "ɽ��,����,�ൺ,�Ͳ�,��ׯ,��Ӫ,Ϋ��,��̨,����,����,̩��,����,����,����,����,�ĳ�,����,����", "����,֣��,����,����,ƽ��ɽ,����,�ױ�,����,����,���,���,���,����Ͽ,����,����,����,�ܿ�,פ���,��Դ", "����,�人,��ʯ,�差,ʮ��,����,�˲�,����,����,Т��,�Ƹ�,����,����,��ʩ,����,����,Ǳ��,��ũ��", "����,��ɳ,����,��̶,����,����,����,����,�żҽ�,����,����,����,����,¦��,����", "����,����,����,����,��,�Ĳ�,����,����,��ָɽ,����,�ֶ�,����,�Ͳ�,�ٸ�,��ɳ,��ͤ,��ˮ,����,����,��ɳ,��ɳ,��ɳ", "�㶫,����,����,�麣,��ͷ,�ع�,��ɽ,����,տ��,ï��,����,����,÷��,��β,��Դ,����,��Զ,��ݸ,��ɽ,����,����,�Ƹ�", "����,����,����,����,����,����,���Ǹ�,����,���,����,��ɫ,����,�ӳ�,����,����", "�Ĵ�,�ɶ�,�Թ�,��֦��,����,����,����,��Ԫ,����,�ڽ�,��ɽ,�ϳ�,�˱�,�㰲,����,üɽ,�Ű�,����,����,����,����,��ɽ", "����,����,����ˮ,����,��˳,ͭ��,�Ͻ�,ǭ����,ǭ����,ǭ��", "����,����,����,��Ϫ,��ɽ,��ͨ,����,˼é,�ٲ�,����,����,����,º��,�ն�,���,��ɽ,��˫����,�º�,ŭ��,����", "����,����,����,ɽ��,�տ���,����,����,��֥", "����,����,ͭ��,����,����,μ��,�Ӱ�,����,����,����,����", "����,����,���,����,��ˮ,������,����,��Ҵ,ƽ��,��Ȫ,����,����,¤��,����,����,����", "�ຣ,����,����,����,����,����,����,����,����,�����,���ľ", "����,����,ʯ��ɽ,����,��ԭ,����", "�½�,��³ľ��,��������,��³��,����,����,������,��ʲ,��������,��������,��������,����,��ͼʲ,�����,����,����,����,����,����̩,ʯ����,������,ͼľ���,�����", "������,������,�������,�׸�,˫Ѽɽ,����,����,����,ĵ����,��ľ˹,��̨��,�ں�,�绯,���˰���", "���", "����", "̨��,��¡,̨��,�±�,�҈@,����,����,̨��,�û�,��Ͷ,���,���x,̨��,����,���|,���m,��ɏ,̨�|,���,���T", "����"],
        e = [],
        h = {},
        f = {},
        g,
        n;
        for (g = 0; g < d.length; g++) {
            d[g] = d[g].split(",");
            for (n = 0; n < d[g].length; n++) f[d[g][n]] = d[g][0];
            e.push(d[g][0]);
            h[d[g][0]] = d[g]
        }
        $province = $(a);
        $city = $(b);
        for (g = 0; g < e.length; g++) {
            a = document.createElement("option");
            a.innerHTML = a.value = e[g];
            $province.append(a)
        }
        e = function() {
            var q, l, o = h[$province.val()];
            $city.empty();
            if (o.length == 1) {
                l = document.createElement("option");
                l.innerHTML = l.value = o[0];
                $city.append(l);
                $city.hide()
            } else {
                for (q = 1; q < o.length; q++) {
                    l = document.createElement("option");
                    l.innerHTML = l.value = o[q];
                    $city.append(l)
                }
                $city.show()
            }
        };
        $province.bind("keyup", e);
        $province.bind("change", e);
        if (c && f[c]) {
            $province.val(f[c]);
            e();
            $city.val(c)
        } else e()
    };
    window.show_province_city_zh_tw = function(a, b, c) {
        var d = ["���", "���T", "̨��,��¡,̨��,�±�,�҈@,����,����,̨��,�û�,��Ͷ,���,���x,̨��,����,���|,���m,��ɏ,̨�|,���,���T", "����"],
        e = [],
        h = {},
        f = {},
        g,
        n;
        for (g = 0; g < d.length; g++) {
            d[g] = d[g].split(",");
            for (n = 0; n < d[g].length; n++) f[d[g][n]] = d[g][0];
            e.push(d[g][0]);
            h[d[g][0]] = d[g]
        }
        $province = $(a);
        $city = $(b);
        for (g = 0; g < e.length; g++) {
            a = document.createElement("option");
            a.innerHTML = a.value = e[g];
            $province.append(a)
        }
        e = function() {
            var q, l, o = h[$province.val()];
            $city.empty();
            if (o.length == 1) {
                l = document.createElement("option");
                l.innerHTML = l.value = o[0];
                $city.append(l);
                $city.hide()
            } else {
                for (q = 1; q < o.length; q++) {
                    l = document.createElement("option");
                    l.innerHTML = l.value = o[q];
                    $city.append(l)
                }
                $city.show()
            }
        };
        $province.bind("keyup", e);
        $province.bind("change", e);
        if (c && f[c]) {
            $province.val(f[c]);
            e();
            $city.val(c)
        } else e()
    };
    window.feedback = function() {
        i("action.php?a=feedbackdo", {
            type: document.feedbackform.type.value,
            body: document.feedbackform.body.value
        },
        function() {
            goback();
            alert("��л���ķ�����")
        })
    };
    window.report = function() {
        i("action.php?a=reportdo", {
            title: document.reportform.title.value,
            body: document.reportform.body.value
        },
        function(a) {
            if (a == "ok") {
                goback();
                alert("��л���ķ�����")
            } else alert(a)
        })
    };
    window.submit_audition = function() {
        i("action.php?a=editlocationdo", {
            city: document.editlocationform.city.value,
            province: document.editlocationform.province.value,
            location_name: document.editlocationform.location_name.value,
            guid: document.editlocationform.guid.value,
            location_addr: document.editlocationform.location_addr.value,
            location_tel: document.editlocationform.location_tel.value,
            map_error: document.editlocationform.map_error.checked,
            lat: document.editlocationform.lat.value,
            lon: document.editlocationform.lon.value,
            type_of: document.editlocationform.type_of.value
        },
        function(a) {
            if (a == "ok") {
                goback();
                alert("��л���Խ��Ե�֧�֣����ǽ�����˺���µص���Ϣ��")
            } else alert(a)
        })
    };
    window.events_more = function(a) {
        i("action.php?a=events&max_id=" + a,
        function(b) {
            $("#events-more").replaceWith(b)
        })
    };
    window.boards_more = function(a, b) {
        i("action.php?a=board&max_id=" + a + "&id=" + b,
        function(c) {
            $("#boards-more").replaceWith(c)
        })
    };
    window.photos_more = function(a, b, c) {
        i("action.php?a=photos&max_id=" + a + "&type=" + b + "&id=" + c,
        function(d) {
            $("#photos-more").replaceWith(d)
        })
    };
    window.venues_more = function(a, b) {
        i("action.php?a=venues", {
            q: a,
            page: b
        },
        function(c) {
            $("#venues-more").replaceWith(c)
        })
    };
    window.friends_more = function(a, b) {
        i("action.php?a=findfriend", {
            q: a,
            page: b
        },
        function(c) {
            $("#friends-more").replaceWith(c)
        })
    };
    window.notification_delete = function(a) {
        var b = null;
        k("/notifications/read", {
            id: a
        });
        $("#notify-row-" + a).remove()
    };
    window.switch_to_native = function(a, b) {
        confirm("ȷ��Ҫ�л���Ԥ������") && i("action.php?a=androidswitch&sn=" + a + "&m=" + b,
        function(c) {
            c == "ok" ? alert("�л��ɹ����������ͻ�����Ч��") : alert(c)
        })
    };
    var k = function(a, b, c) {
        return i("apiproxy.php?api=" + a, b,
        function(d) {
            try {
                d = eval("(" + d + ")");
                c && c(d)
            } catch(e) {
                alert("���ִ���������")
            }
        })
    },
    L = function(a, b, c) {
        return i(a, b,
        function(d) {
            try {
                d = eval("(" + d + ")");
                c && c(d)
            } catch(e) {
                alert("���ִ���������")
            }
        })
    },
    M = window.japi2 = function(a, b) {
        return i("apiproxy2.php", {
            apis: JSON.stringify(a)
        },
        function(c) {
            try {
                c = eval("(" + c + ")");
                b(c)
            } catch(d) {
                alert("���ִ���������")
            }
        })
    };
    jiepang.discover_dist = 500;
    window.load_discover = function(a) {
        if (jiepang.latlng) {
            if (typeof a == "undefined") a = jiepang.discover_dist;
            jiepang.discover_lat = jiepang.lat;
            jiepang.discover_lon = jiepang.lon;
            k("/discover/summary", {
                lat: jiepang.discover_lat,
                lon: jiepang.discover_lon,
                dist: a,
                source: "s"
            },
            function(b) {
                jiepang.discover_dist = a;
                k("/calendar/discover_show", {},
                function(c) {
                    b.calendar_count = c.length;
                    if (b.calendar_count) b.calendar_today = c[0];
                    mainnav("discover");
                    $("#main").html(template_table.discover(b))
                })
            })
        } else {
            mainnav("discover");
            $("#main").html(template_table["discover-noposition"]())
        }
        p();
        urlhistory.push(load_discover)
    };
    window.load_discover_calendar = function(a, b) {
        a === "discover" && urlhistory.push(load_discover);
        ajaxReplace("action.php?a=schedule&guid=" + b,
        function() {
            window.scroll(0, 0)
        })
    };
    window.sub_calendar = function(a, b, c) {
        confirm("���ĺ�ÿ�������ǻ����һ�ܵ��з������˽�ŵķ�ʽ���͸�����") && k("/calendar/subscribe", {
            city: a,
            source: "s"
        },
        function() {
            ajaxReplace("action.php?a=" + b + "&page=" + c, {})
        })
    };
    window.unsub_calendar = function(a, b, c) {
        confirm("�˶����������ٻ��յ���һ�ܵ��з����֪ͨ��") && k("/calendar/unsubscribe", {
            city: a,
            source: "s"
        },
        function() {
            ajaxReplace("action.php?a=" + b + "&page=" + c, {})
        })
    };
    window.load_all_calendars = function(a) {
        ajaxReplace("action.php?a=all_calendars&page=" + a,
        function() {
            window.scroll(0, 0)
        })
    };
    window.urlhistory_add = function(a) {
        urlhistory.push(a);
        $("#goback").show()
    };
    var A = function(a) {
        jiepang.more = function(b, c) {
            var d = {
                lat: jiepang.discover_lat,
                lon: jiepang.discover_lon,
                dist: jiepang.discover_dist,
                max_id: b
            };
            if (c) d.noposition = 1;
            k(a, d,
            function(e) {
                $("#events-more").replaceWith(template_table["discover-tips"]({
                    is_ajax: 1,
                    tips: e.tips,
                    has_more: e.has_more
                }))
            })
        }
    };
    window.load_discover_checkins = function() {
        k("/discover/friends_checkins", {
            lat: jiepang.discover_lat,
            lon: jiepang.discover_lon,
            dist: jiepang.discover_dist
        },
        function(a) {
            mainnav("discover");
            $("#main").html(template_table["discover-friends"]({
                checkins: a
            }));
            urlhistory.push(load_discover_checkins);
            $("#goback").show()
        })
    };
    window.load_discover_schedules = function() {
        k("/discover/schedules", {
            lat: jiepang.discover_lat,
            lon: jiepang.discover_lon,
            dist: jiepang.discover_dist
        },
        function(a) {
            mainnav("discover");
            $("#main").html(template_table["discover-schedules"]({
                schedules: a
            }));
            urlhistory.push(load_discover_schedules);
            $("#goback").show()
        })
    };
    window.load_discover_favorites = function() {
        k("/discover/favorite_tips", {
            lat: jiepang.discover_lat,
            lon: jiepang.discover_lon,
            dist: jiepang.discover_dist
        },
        function(a) {
            mainnav("discover");
            $("#main").html(template_table["discover-tips"]({
                title: "�������ղصĹ���",
                tips: a.tips,
                has_more: a.has_more
            }));
            urlhistory.push(load_discover_favorites);
            $("#goback").show();
            A("/discover/favorite_tips")
        })
    };
    window.load_discover_friends_tips = function(a) {
        var b = a ? "/discover/friends_tips_noposition": "/discover/friends_tips";
        k(b, {
            lat: jiepang.discover_lat,
            lon: jiepang.discover_lon,
            dist: jiepang.discover_dist
        },
        function(c) {
            mainnav("discover");
            $("#main").html(template_table["discover-tips"]({
                title: a ? "���ѵĹ���": "�������ѵĹ���",
                tips: c.tips,
                has_more: c.has_more
            }));
            urlhistory.push(function() {
                load_discover_friends_tips(a)
            });
            $("#goback").show();
            A(b)
        })
    };
    window.load_discover_great_tips = function() {
        k("/discover/great_tips", {
            lat: jiepang.discover_lat,
            lon: jiepang.discover_lon,
            dist: jiepang.discover_dist
        },
        function(a) {
            mainnav("discover");
            $("#main").html(template_table["discover-tips"]({
                title: "���������ʹ���",
                tips: a.tips,
                has_more: a.has_more
            }));
            urlhistory.push(load_discover_great_tips);
            $("#goback").show();
            A("/discover/great_tips")
        })
    };
    window.load_discover_coupon_venues = function() {
        k("/discover/coupon_venues", {
            lat: jiepang.discover_lat,
            lon: jiepang.discover_lon,
            dist: jiepang.discover_dist
        },
        function(a) {
            mainnav("discover");
            $("#main").html(template_table["discover-coupon-venues"]({
                locations: a
            }));
            urlhistory.push(load_discover_coupon_venues);
            $("#goback").show()
        })
    };
    window.load_discover_coupon_tip_venues = function() {
        k("/discover/coupon_tip_venues", {
            lat: jiepang.discover_lat,
            lon: jiepang.discover_lon,
            dist: jiepang.discover_dist
        },
        function(a) {
            mainnav("discover");
            $("#main").html(template_table["discover-coupon-tip-venues"]({
                locations: a
            }));
            urlhistory.push(load_discover_coupon_tip_venues);
            $("#goback").show()
        })
    };
    window.load_discover_groupbuy_venues = function() {
        k("/discover/groupbuy_venues", {
            lat: jiepang.discover_lat,
            lon: jiepang.discover_lon,
            dist: jiepang.discover_dist
        },
        function(a) {
            mainnav("discover");
            $("#main").html(template_table["discover-groupbuy-venues"]({
                locations: a
            }));
            urlhistory.push(load_discover_coupon_tip_venues);
            $("#goback").show()
        })
    };
    window.load_inbox = function() {
        k("/messages/list", {},
        function(a) {
            mainnav("");
            $("#main").html(template_table.inbox({
                messages: a.messages,
                has_more: a.has_more
            }));
            $(".what").css("width", document.body.clientWidth - 80 + "px");
            urlhistory.push(load_inbox);
            $("#goback").show();
            jiepang.more = function(b) {
                k("/messages/list", {
                    max_id: b
                },
                function(c) {
                    $("#events-more").replaceWith(template_table.inbox({
                        messages: c.messages,
                        has_more: c.has_more,
                        is_more: 1
                    }));
                    $(".what").css("width", document.body.clientWidth - 80 + "px")
                })
            }
        })
    };
    window.load_inbox_user = function(a) {
        k("/messages/view", {
            peer_id: a
        },
        function(b) {
            mainnav("");
            $("#main").html(template_table["inbox-user"](b));
            urlhistory.push(function() {
                load_inbox_user(a)
            });
            $("#goback").show();
            jiepang.more = function(c) {
                k("/messages/view", {
                    peer_id: a,
                    max_id: c
                },
                function(d) {
                    d.is_more = 1;
                    $("#events-more").replaceWith(template_table["inbox-user"](d))
                })
            }
        })
    };
    window.load_user = function(a) {
        M([["/users/show", {
            id: a
        }], ["/events/user_timeline", {
            id: a,
            types: 1
        }], ["/friends/list", {
            id: a,
            count: 200
        }], ["/events/user_timeline", {
            id: a,
            types: 2
        }]],
        function(b) {
            alert(b[0].name);
            alert(b[2][0].name);
            alert(JSON.stringify(b[0]).length);
            alert(JSON.stringify(b[1]).length);
            alert(JSON.stringify(b[2]).length);
            alert(JSON.stringify(b[3]).length)
        })
    };
    window.load_zone = function(a) {
        k("/zones/show", {
            id: a
        },
        function(b) {
            $("#main").html(template_table.zone({
                zone: b
            }));
            urlhistory.push(function() {
                load_zone(a)
            })
        })
    };
    window.load_zone_category = function(a, b, c, d) {
        k("/zones/locations_list", {
            id: c,
            category_id: a
        },
        function(e) {
            $("#main").html(template_table["zone-category"]({
                category_id: a,
                category_name: b,
                zone_id: c,
                zone_name: d,
                locations: e.items
            }));
            urlhistory.push(function() {
                load_zone_category(a, b, c, d)
            })
        })
    };
    window.message_send = function(a) {
        var b = document.messageform.body.value;
        b == "" ? alert("������˽�����ݡ�") : k("/messages/send", {
            peer_id: a,
            body: b
        },
        function(c) {
            if (c.error) alert(c.error.message);
            else {
                load_inbox_user(a);
                urlhistory.pop()
            }
        })
    };
    window.load_language = function() {
        $("#main").html(template_table.language());
        urlhistory.push(this)
    };
    window.import_contacts = function(a, b, c) {
        if (b) c ? L("action.php?a=importcontact", {
            service: a,
            username: b,
            password: c
        },
        function(d) {
            if (d.error) alert(d.error.message);
            else if (d.length == 0) alert("���� " + a + " ��ϵ����û�н����û������Ѽ�Ϊ���ѡ�");
            else {
                $("#main").html(template_table["import-contacts"]({
                    users: d
                }));
                urlhistory.push(function() {})
            }
        }) : alert("������ " + a + " ����");
        else alert("������ " + a + " �û���")
    };
    window.import_sina_contacts = function() {
        k("/friends/importSina.json", {},
        function(a) {
            if (a.error) alert(a.error.message);
            else if (a.length == 0) alert("��������΢����û�н����û������Ѽ�Ϊ���ѡ�");
            else {
                $("#main").html(template_table["import-sina"]({
                    users: a
                }));
                urlhistory.push(function() {})
            }
        })
    };
    window.import_facebook_contacts = function(a) {
        k("/friends/importFacebook.json", {
            uids: a
        },
        function(b) {
            if (b.error) alert(b.error.message);
            else if (b.length == 0) alert("����Facevook��û�н����û������Ѽ�Ϊ���ѡ�");
            else {
                $("#main").html(template_table["import-facebook"]({
                    users: b
                }));
                urlhistory.push(function() {})
            }
        })
    };
    window.avatar = function(a, b) {
        var c;
        if (typeof b == "undefined") b = 48; (c = b <= 48 ? a.avatar_thumb: b <= 60 ? a.avatar_small: a.avatar) || (c = "/static/s/avatar-default-48.png");
        return '<img src="' + c + '" width="' + b + '" height="' + b + '" />'
    };
    if (window.welcome) {
        $("#loginform").hide();
        $("#main").html(template_table.welcome())
    }
    var D = function() {
        if (!window._gat) return setTimeout(D, 200); (window.pageTracker = _gat._getTracker("UA-15994184-3"))._trackPageview()
    };
    D();
    window.h = function(a) {
        if (typeof a == "string") {
            a = a.replace(/&/g, "&amp;");
            a = a.replace(/"/g, "&quot;");
            a = a.replace(/'/g, "&#039;");
            a = a.replace(/</g, "&lt;");
            a = a.replace(/>/g, "&gt;")
        }
        return a
    };
    window.nl2br = function(a) {
        if (typeof a == "string") a = a.replace(/\n/g, "<br>").replace(/\r/g, "");
        return a
    };
    window.friendlyTime = function(a) {
        var b = RegExp(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
        b.lastIndex = 0;
        b = b.exec(a);
        a = new Date;
        a.setUTCFullYear(b[1]);
        a.setUTCMonth(b[2] - 1);
        a.setUTCDate(b[3]);
        a.setUTCHours(b[4]);
        a.setUTCMinutes(b[5]);
        a.setUTCSeconds(b[6]);
        a.setUTCMilliseconds(0);
        b = new Date;
        a.setTime(a.getTime() + 288E5);
        b.setTime(b.getTime() + 288E5);
        var c = [[1, "��"], [60, "����"], [3600, "Сʱ"]],
        d,
        e = (b.getTime() - a.getTime()) / 1E3;
        e = e > 0 ? e: 1;
        var h = "";
        for (d = 0; d < c.length; d++) if (c[d + 1] && e < c[d + 1][0]) {
            h += Math.round(e / c[d][0]) + " " + c[d][1];
            break
        }
        if (h != "") {
            if (e >= 3600) h = "Լ " + h;
            h += "ǰ"
        } else h = a.getUTCFullYear() == b.getUTCFullYear() && a.getUTCMonth() == b.getUTCMonth() && a.getUTCDate() == b.getUTCDate() ? "���� " + a.getUTCHours() + ":" + (a.getUTCMinutes() < 10 ? "0" + a.getUTCMinutes() : a.getUTCMinutes()) : a.getUTCMonth() + 1 + "��" + a.getUTCDate() + "�� " + a.getUTCHours() + ":" + (a.getUTCMinutes() < 10 ? "0" + a.getUTCMinutes() : a.getUTCMinutes());
        return h
    };
    window.sync_follow = function() {
        var a = document.followform.target_uid.value,
        b = [],
        c;
        for (c = 0; c < m.length; c++) document.followform["sync" + m[c]] && document.followform["sync" + m[c]].checked && b.push(m[c]);
        b = b.join(",");
        i("action.php?a=sync_follow_do", {
            syncs: b,
            id: a
        },
        function(d) {
            if (d == "ok") {
                p();
                user(a)
            } else alert(d)
        })
    };
    window.addboard = function(a) {
        var b = document.addboardform.body.value;
        b ? k("/boards/add", {
            user_id: a,
            body: b
        },
        function() {
            user(a, "board")
        }) : alert("����д�������ݡ�")
    };
    window.submit_close_down = function(a, b) {
        if (b == 1) var c = "F";
        else if (b == -1) c = "P";
        else return false;
        k("/locations/save_type_info", {
            type: c,
            guid: a
        },
        function() {
            venue(a);
            alert("�޸�����Ч����л���Խ��Ե�֧�֣���")
        })
    }
};