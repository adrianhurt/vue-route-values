---
title: 'routeValuesMixin'
metaTitle: routeValuesMixin | Vue Route Values
description: routeValuesMixin documentation.
meta:
  - name: keywords
    content: vue values vue-route-values wrapper component url route router param query mixin
---

# routeValuesMixin

Mixin —indeed, it's a _mixin factory_— that allows you to manage multiple _route param and query values_.

For example, for URL `https://yourweb.com/user/adrianhurt/friends?page=2`, having a the route config `{ path: '/user/:username/friends' }`, you will be able to easily manage the `username` _route param value_ and `page` _route query value_.

```vue
<script>
import { routeValuesMixin } from 'vue-route-values'

export default {
	...,
    mixins: [routeValuesMixin(params)],
	...,
}
</script>
```

**`params` is an _OPTIONS_ object or an array of them.** Each _OPTIONS_ object determines the configuration and behaviour of the corresponding _Value_.
As you can see, the _OPTIONS_ object is very similar than the regular props of `RouteParamValue` and `RouteQueryValue`, and its practically the same as `RouteValues`'s `optsByName` prop.

| _OPTIONS_ fields         				| Type      | Default		| Description |
| ------------------------------------- | --------- | ------------- | ---- |
| **`where`**							| String	| `"query"`		| It could be `"params"` or `"query"`. |
| **`name`**							| String	| *Required*	| The name you will use for the value. |
| **`urlName`**							| String	| name's value	| The name of the route param or query param within URL. By default it uses the same as `name`. |
| **`urlName`**							| String	| *Required*	| The name of the route param or query param within URL. |
| **`defaultValue`**					| *any*		| `undefined`	| The default value. If current `value` is equal to `defaultValue` it will be removed from the URL. |
| **`type`**							| String	| `string`		| The value's type to automatically encode/decode from string. The possible values are `"string"`, `"number"` or `"boolean"`. |
| **`encode(value)`**					| Function	| `undefined` 	| The encode funtion from the route string value (`Any => String`). If it's present the `type` prop is ignored. |
| **`decode(stringValue)`**				| Function	| `undefined` 	| The decode funtion from the route string value (`String => Any`). If it's present the `type` prop is ignored. |
| **`keepsQuery`**						| Boolean	| `false` 		| `true` if you want to keep any previous route query param into the new navigation. |
| **`affectsHistory`**					| Boolean	| `true` 		| `true` if you want to use `$router.push`. `false` for `$router.replace`. |
| **`navigationInterceptor(params)`**	| Function	| `undefined` 	| It's called when a new navigation should be place instead of using the default behaviour. The `params` is an object with `{ router, route, name, newValue, encodedValue, options }` where in options appears all the component's props. |


## Example

```vue {3,4,6,13,19-23}
<template>
	<div class="flex-row">
		<p>Slug: <b>{{ slug }}</b></p>
		<Paginator v-model="page" />
		<SelectInput
			v-model="sort"
			:options="sortOptions"
		/>
	</div>
</template>

<script>
import { routeValuesMixin } from 'vue-route-values'
import { Paginator, SelectInput } from './components'

export default {
    name: 'RouteValuesMixinDemo',
    components: { Paginator, SelectInput },
    mixins: [routeValuesMixin([
        { where: 'params', name: 'slug' },
        { name: 'page', urlName: 'p', type: 'number', defaultValue: 1 },
        { name: 'sort', urlName: 's', defaultValue: 'option1' },
    ])],
    created () {
        this.sortOptions = [
            { key: 'option1', label: 'Option 1' },
            { key: 'option2', label: 'Option 2' },
            { key: 'option3', label: 'Option 3' },
        ]
    },
}
</script>
```

## Live examples

[Check here to see it in action](https://adrianhurt.github.io/vue-route-values-examples/route-query-value-mixin/foo-slug).
