(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{360:function(t,e,a){"use strict";a.r(e);var s=a(25),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"routevalues"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#routevalues"}},[t._v("#")]),t._v(" <RouteValues />")]),t._v(" "),a("p",[t._v("Component that allows you to manage multiple "),a("em",[t._v("route param and query values")]),t._v(".")]),t._v(" "),a("p",[t._v("For example, for URL "),a("code",[t._v("https://yourweb.com/user/adrianhurt/friends?page=2")]),t._v(", having a the route config "),a("code",[t._v("{ path: '/user/:username/friends' }")]),t._v(", you will be able to easily manage the "),a("code",[t._v("username")]),t._v(" "),a("em",[t._v("route param value")]),t._v(" and "),a("code",[t._v("page")]),t._v(" "),a("em",[t._v("route query value")]),t._v(".")]),t._v(" "),a("h2",{attrs:{id:"props"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[t._v("#")]),t._v(" Props")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Props")]),t._v(" "),a("th",[t._v("Type")]),t._v(" "),a("th",[t._v("Default")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("strong",[a("code",[t._v("optsByName")])])]),t._v(" "),a("td",[t._v("Object")]),t._v(" "),a("td",[a("em",[t._v("Required")])]),t._v(" "),a("td",[t._v("Object where each key is the a name of a managed value you want and its value is an "),a("em",[t._v("OPTIONS")]),t._v(" object that determines its configuration and behaviour.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("keepsQuery")])])]),t._v(" "),a("td",[t._v("Boolean")]),t._v(" "),a("td",[a("code",[t._v("true")])]),t._v(" "),a("td",[a("code",[t._v("true")]),t._v(" if you want to keep any previous route query param into the new navigation. It's used only as a fallback if the corresponding value's "),a("code",[t._v("keepsQuery")]),t._v(" is not present.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("affectsHistory")])])]),t._v(" "),a("td",[t._v("Boolean")]),t._v(" "),a("td",[a("code",[t._v("false")])]),t._v(" "),a("td",[a("code",[t._v("true")]),t._v(" if you want to use "),a("code",[t._v("$router.push")]),t._v(". "),a("code",[t._v("false")]),t._v(" for "),a("code",[t._v("$router.replace")]),t._v(". It's used only as a fallback if the corresponding value's "),a("code",[t._v("keepsQuery")]),t._v(" is not present.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("navigationInterceptor(params)")])])]),t._v(" "),a("td",[t._v("Function")]),t._v(" "),a("td",[a("code",[t._v("undefined")])]),t._v(" "),a("td",[t._v("It's called when a new navigation should be place instead of using the default behaviour. The "),a("code",[t._v("params")]),t._v(" is an object with "),a("code",[t._v("{ router, route, name, newValue, encodedValue, options }")]),t._v(" where in options appears all the component's props.  It's used only as a fallback if the corresponding value's "),a("code",[t._v("keepsQuery")]),t._v(" is not present.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("disabled")])])]),t._v(" "),a("td",[t._v("Boolean")]),t._v(" "),a("td",[a("code",[t._v("false")])]),t._v(" "),a("td",[a("code",[t._v("true")]),t._v(" for disable any value mutation.")])])])]),t._v(" "),a("p",[a("code",[t._v("optsByName")]),t._v(" is an object to declare every value you want to manage. Each "),a("em",[t._v("key")]),t._v(" is the name of the value you want to manage and its value is an "),a("em",[t._v("OPTIONS")]),t._v(" object that determines its configuration and behaviour.\nAs you can see, the "),a("em",[t._v("OPTIONS")]),t._v(" object is very similar than the regular props of "),a("code",[t._v("RouteParamValue")]),t._v(" and "),a("code",[t._v("RouteQueryValue")]),t._v(".")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[a("em",[t._v("OPTIONS")]),t._v(" fields")]),t._v(" "),a("th",[t._v("Type")]),t._v(" "),a("th",[t._v("Default")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("strong",[a("code",[t._v("where")])])]),t._v(" "),a("td",[t._v("String")]),t._v(" "),a("td",[a("code",[t._v('"query"')])]),t._v(" "),a("td",[t._v("It could be "),a("code",[t._v('"params"')]),t._v(" or "),a("code",[t._v('"query"')]),t._v(".")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("urlName")])])]),t._v(" "),a("td",[t._v("String")]),t._v(" "),a("td",[t._v("key's name")]),t._v(" "),a("td",[t._v("The name of the route param or query param within URL. By default it uses the corresponding "),a("em",[t._v("key's")]),t._v(" name (i.e. the param's name).")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("defaultValue")])])]),t._v(" "),a("td",[a("em",[t._v("any")])]),t._v(" "),a("td",[a("code",[t._v("undefined")])]),t._v(" "),a("td",[t._v("The default value. If current "),a("code",[t._v("value")]),t._v(" is equal to "),a("code",[t._v("defaultValue")]),t._v(" it will be removed from the URL.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("type")])])]),t._v(" "),a("td",[t._v("String")]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",[t._v("The value's type to automatically encode/decode from string. The possible values are "),a("code",[t._v('"string"')]),t._v(", "),a("code",[t._v('"number"')]),t._v(" or "),a("code",[t._v('"boolean"')]),t._v(".")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("encode(value)")])])]),t._v(" "),a("td",[t._v("Function")]),t._v(" "),a("td",[a("code",[t._v("undefined")])]),t._v(" "),a("td",[t._v("The encode funtion from the route string value ("),a("code",[t._v("Any => String")]),t._v("). If it's present the "),a("code",[t._v("type")]),t._v(" prop is ignored.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("decode(stringValue)")])])]),t._v(" "),a("td",[t._v("Function")]),t._v(" "),a("td",[a("code",[t._v("undefined")])]),t._v(" "),a("td",[t._v("The decode funtion from the route string value ("),a("code",[t._v("String => Any")]),t._v("). If it's present the "),a("code",[t._v("type")]),t._v(" prop is ignored.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("keepsQuery")])])]),t._v(" "),a("td",[t._v("Boolean")]),t._v(" "),a("td",[a("code",[t._v("false")])]),t._v(" "),a("td",[a("code",[t._v("true")]),t._v(" if you want to keep any previous route query param into the new navigation.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("affectsHistory")])])]),t._v(" "),a("td",[t._v("Boolean")]),t._v(" "),a("td",[a("code",[t._v("true")])]),t._v(" "),a("td",[a("code",[t._v("true")]),t._v(" if you want to use "),a("code",[t._v("$router.push")]),t._v(". "),a("code",[t._v("false")]),t._v(" for "),a("code",[t._v("$router.replace")]),t._v(".")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("navigationInterceptor(params)")])])]),t._v(" "),a("td",[t._v("Function")]),t._v(" "),a("td",[a("code",[t._v("undefined")])]),t._v(" "),a("td",[t._v("It's called when a new navigation should be place instead of using the default behaviour. The "),a("code",[t._v("params")]),t._v(" is an object with "),a("code",[t._v("{ router, route, name, newValue, encodedValue, options }")]),t._v(" where in options appears all the component's props.")])])])]),t._v(" "),a("h2",{attrs:{id:"scoped-props-default-slot"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scoped-props-default-slot"}},[t._v("#")]),t._v(" Scoped props (default slot)")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Scoped props")]),t._v(" "),a("th",[t._v("Type")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("strong",[t._v("Each name")])]),t._v(" "),a("td",[a("em",[t._v("any")])]),t._v(" "),a("td",[t._v("Every value declared on "),a("code",[t._v("optsByName")]),t._v(" will output here its corresponding current value with it's name.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("disabled")])])]),t._v(" "),a("td",[t._v("Boolean")]),t._v(" "),a("td",[t._v("The current disabled value.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("set(name, newValue)")])])]),t._v(" "),a("td",[t._v("Function")]),t._v(" "),a("td",[t._v("Sets a new value for the corresponding name and returns it. Only if its not disabled.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("resetToDefault(name)")])])]),t._v(" "),a("td",[t._v("Function")]),t._v(" "),a("td",[t._v("Resets the value for the corresponding name with the default one. Only if its not disabled.")])])])]),t._v(" "),a("h2",{attrs:{id:"events"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[t._v("#")]),t._v(" Events")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Events")]),t._v(" "),a("th",[t._v("Arguments")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("strong",[a("code",[t._v("change")])])]),t._v(" "),a("td",[a("code",[t._v("(newValues, oldValues)")])]),t._v(" "),a("td",[t._v("Emitted when any value changes.")])]),t._v(" "),a("tr",[a("td",[a("strong",[a("code",[t._v("change-value")])])]),t._v(" "),a("td",[a("code",[t._v("(name, newValue, oldValue)")])]),t._v(" "),a("td",[t._v("Emitted when the corresnponding value changes.")])])])]),t._v(" "),a("h2",{attrs:{id:"example"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[t._v("#")]),t._v(" Example")]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("RouteValues")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":optsByName")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("{\n\t\t\tslug: {\n\t\t\t\twhere: 'params',\n\t\t\t},\n\t\t\tpage: {\n\t\t\t\ttype: 'number',\n\t\t\t\tdefaultValue: 1,\n\t\t\t},\n\t\t\tsort: {\n\t\t\t\tdefaultValue: 'option1',\n\t\t\t},\n\t\t}"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("#default")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("{ slug, page, sort, set }"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("flex-row"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t\t\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Slug: "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{{ slug }}"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t\t\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Paginator")]),t._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":value")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("page"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@input")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("set('page', $event)"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n\t\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\t\t\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("SelectInput")]),t._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":value")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("sort"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":options")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("sortOptions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n\t\t\t\t"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@input")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("set('sort', $event)"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n\t\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("RouteValues")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" RouteValues "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vue-route-values'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tcomponents"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" RouteValues "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h2",{attrs:{id:"live-examples"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#live-examples"}},[t._v("#")]),t._v(" Live examples")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://adrianhurt.github.io/vue-route-values-examples/route-values/foo-slug",target:"_blank",rel:"noopener noreferrer"}},[t._v("Check here to see it in action"),a("OutboundLink")],1),t._v(".")])])}),[],!1,null,null,null);e.default=n.exports}}]);