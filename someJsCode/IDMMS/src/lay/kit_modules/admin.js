/** kitadmin-v2.1.0 MIT License By http://kit.zhengjinfan.cn Author Van Zheng */
; "use strict";
var mods = ["element", "sidebar", "mockjs", "select", "tabs", "menu", "route", "utils", "component", "kit"];
layui.define(mods, function (e) {
    layui.element;
    var t = layui.utils,
        a = layui.jquery,
        n = (layui.lodash, layui.route),
        i = layui.tabs,
        l = layui.layer,
        o = layui.menu,
        m = layui.component,
        s = layui.kit,
        p = function () {
            this.config = {
                elem: "#app",
                loadType: "SPA"
            },
                this.version = "1.0.0"
        };

    p.prototype.ready = function (e) {
        var i = this.config, o = (0, t.localStorage.getItem)("KITADMIN_SETTING_LOADTYPE"); null !== o && void 0 !== o.loadType && (i.loadType = o.loadType), s.set({ type: i.loadType }).init(), u.routeInit(i), u.menuInit(i), "TABS" === i.loadType && u.tabsInit(), "" === location.hash && t.setUrlState("主页", "#/"),
            layui.sidebar.render({
                elem: "#ccleft",
                title: "这是左侧打开的栗子",
                shade: !0,
                direction: "left",
                dynamicRender: !0,
                url: "views/table/teble2.html",
                width: "50%"
            }),
            a("#cc").on("click", function () {
                layui.sidebar.render({
                    elem: this,
                    title: "这是表单盒子",
                    shade: !0,
                    dynamicRender: !0,
                    url: "views/form/index.html",
                    width: "50%"
                })
            }),
            m.on("nav(header_right)", function (e) {
                var t = e.elem.attr("kit-target");
                "setting" === t && layui.sidebar.render({
                    elem: e.elem,
                    title: "设置",
                    shade: !0,
                    dynamicRender: !0,
                    url: "views/setting.html"
                }),
                    "help" === t && l.alert("帮助")
            }),
            layui.mockjs.inject(APIs), "SPA" === i.loadType && n.render(), "function" == typeof e && e()
    };
    var u = {
        routeInit: function (e) {
            var t = this,
                a = {
                    r: [
                        {
                            path: "/user/index",
                            component: "/views/user/index.html",
                            name: "用户列表",
                            children: [
                                {
                                    path: "/user/create",
                                    component: "views/user/create.html",
                                    name: "新增用户"
                                },
                                {
                                    path: "/user/edit",
                                    component: "views/user/edit.html",
                                    name: "编辑用户"
                                }
                            ]
                        }],
                    routes: [
                        { path: "/", component: "views/app.html", name: "主页" },
                        { path: "/user/my", component: "views/user/profile.html", name: "用户中心" },
                        /* ***************系统管理****************** */
                        //用户管理
                        { path: "/sys/sysUser/sysUser", component: "views/sys/sysUser/sysUser.html", name: "用户列表" },
                        { path: "/sys/sysUser/sysUserAdd", component: "views/sys/sysUser/sysUserAdd.html", name: "新增用户" },
                        { path: "/sys/sysUser/sysUserEdit", component: "views/sys/sysUser/sysUserEdit.html", name: "编辑用户" },
                        { path: "/sys/sysUser/sysUserAuth", component: "views/sys/sysUser/sysUserAuth.html", name: "用户权限" },
                        //角色管理
                        { path: "/sys/sysRole/sysRole", component: "views/sys/sysRole/sysRole.html", name: "角色列表" },
                        { path: "/sys/sysRole/sysRoleAdd", component: "views/sys/sysRole/sysRoleAdd.html", name: "新增角色" },
                        //权限管理
                        { path: "/sys/sysJurisdiction/sysJurisdiction", component: "views/sys/sysJurisdiction/sysJurisdiction.html", name: "权限列表" },
                        { path: "/sys/sysJurisdiction/sysJurisdictionAuth", component: "views/sys/sysJurisdiction/sysJurisdictionAuth.html", name: "权限管理" },
                        //栏目管理
                        { path: "/sys/sysMenu/sysMenu", component: "views/sys/sysMenu/sysMenu.html", name: "栏目列表" },
                        { path: "/sys/sysMenu/sysMenuAdd", component: "views/sys/sysMenu/sysMenuAdd.html", name: "新增栏目" },
                        { path: "/sys/sysMenu/sysMenuEdit", component: "views/sys/sysMenu/sysMenuEdit.html", name: "编辑栏目" },
                        { path: "/sys/sysMenu/menuIcon", component: "views/sys/sysMenu/menuIcon.html", name: "栏目图标" },
                        //数据字典管理
                        { path: "/sys/codemap/codemap", component: "views/sys/codemap/codemap.html", name: "数据字典列表" },
                        { path: "/sys/codemap/codemapAdd", component: "views/sys/codemap/codemapAdd.html", name: "数据字典新增" },
                        { path: "/sys/codemap/codeitemAdd", component: "views/sys/codemap/codeitemAdd.html", name: "数据字典项管理" },
                        //日志管理
                        { path: "/sys/sysLog/sysLog", component: "views/sys/sysLog/sysLog.html", name: "日志列表" },
                        { path: "/sys/sysLog/sysLogEdit", component: "views/sys/sysLog/sysLogEdit.html", name: "日志编辑" },
                        //错误页
                        { path: "/exception/403", component: "views/exception/403.html", name: "403" },
                        { path: "/exception/404", component: "views/exception/404.html", name: "404" },
                        { path: "/exception/500", component: "views/exception/500.html", name: "500" }
                    ]
                };
            return "TABS" === e.loadType && (a.onChanged = function () { i.existsByPath(location.hash) ? i.switchByPath(location.hash) : t.addTab(location.hash, (new Date).getTime()) }), n.setRoutes(a), this
        },
        addTab: function (e, t) {
            var a = n.getRoute(e);
            a && i.add({ id: t, title: a.name, path: e, component: a.component, rendered: !1, icon: "&#xe62e;" })
        },
        menuInit: function (e) {
            var t = this;
            return o.set({ dynamicRender: !1, isJump: "SPA" === e.loadType, onClicked: function (a) { if ("TABS" === e.loadType && !a.hasChild) { var n = a.data, i = n.href, l = n.layid; t.addTab(i, l) } }, elem: "#menu-box", remote: { url: "/api/getmenus", method: "post" }, cached: !1 }).render(), t
        },
        tabsInit: function () {
            i.set({ onChanged: function (e) { } }).render(function (e) { e.isIndex && n.render("#/") })
        }
    }; (new p).ready(function () { console.log("Init successed.") }), e("admin", {})
});
//# sourceMappingURL=admin.js.map
