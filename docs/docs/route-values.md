---
title: '&lt;RouteValues /&gt;'
metaTitle: RouteValues | Vue Route Values
description: RouteValues component's documentation.
meta:
  - name: keywords
    content: vue values vue-route-values wrapper component url route router param query
---

# &lt;RouteValues /&gt;

Component that allows you to manage multiple _route param and query values_.

For example, for URL `https://yourweb.com/user/adrianhurt/friends?page=2`, having a the route config `{ path: '/user/:username/friends' }`, you will be able to easily manage the `username` _route param value_ and `page` _route query value_.


## Props
| Props         						| Type      | Default		| Description |
| ------------------------------------- | --------- | ------------- | ---- |
| **`optsByName`**						| Object	| *Required*	| Object where each key is the a name of a managed value you want and its value is an _OPTIONS_ object that determines its configuration and behaviour. |
| **`keepsQuery`**						| Boolean	| `true` 		| `true` if you want to keep any previous route query param into the new navigation. It's used only as a fallback if the corresponding value's `keepsQuery` is not present. |
| **`affectsHistory`**					| Boolean	| `false` 		| `true` if you want to use `$router.push`. `false` for `$router.replace`. It's used only as a fallback if the corresponding value's `keepsQuery` is not present. |
| **`navigationInterceptor(params)`**	| Function	| `undefined` 	| It's called when a new navigation should be place instead of using the default behaviour. The `params` is an object with `{ router, route, name, newValue, encodedValue, options }` where in options appears all the component's props.  It's used only as a fallback if the corresponding value's `keepsQuery` is not present. |
| **`disabled`**						| Boolean	| `false` 		| `true` for disable any value mutation. |

`optsByName` is an object to declare every value you want to manage. Each _key_ is the name of the value you want to manage and its value is an _OPTIONS_ object that determines its configuration and behaviour.
As you can see, the _OPTIONS_ object is very similar than the regular props of `RouteParamValue` and `RouteQueryValue`.

| _OPTIONS_ fields         				| Type      | Default		| Description |
| ------------------------------------- | --------- | ------------- | ---- |
| **`where`**							| String	| `"query"`		| It could be `"params"` or `"query"`. |
| **`urlName`**							| String	| *Required*	| The name of the route param or query param within URL. |
| **`defaultValue`**					| *any*		| `undefined`	| The default value. If current `value` is equal to `defaultValue` it will be removed from the URL. |
| **`type`**							| String	| `string`		| The value's type to automatically encode/decode from string. The possible values are `"string"`, `"number"` or `"boolean"`. |
| **`encode(value)`**					| Function	| `undefined` 	| The encode funtion from the route string value (`Any => String`). If it's present the `type` prop is ignored. |
| **`decode(stringValue)`**				| Function	| `undefined` 	| The decode funtion from the route string value (`String => Any`). If it's present the `type` prop is ignored. |
| **`keepsQuery`**						| Boolean	| `false` 		| `true` if you want to keep any previous route query param into the new navigation. |
| **`affectsHistory`**					| Boolean	| `true` 		| `true` if you want to use `$router.push`. `false` for `$router.replace`. |
| **`navigationInterceptor(params)`**	| Function	| `undefined` 	| It's called when a new navigation should be place instead of using the default behaviour. The `params` is an object with `{ router, route, name, newValue, encodedValue, options }` where in options appears all the component's props. |


## Scoped props (default slot)
| Scoped props         			| Type    	| Description |
| ----------------------------- | --------- | ---- |
| **Each name**					| *any*		| Every value declared on `optsByName` will output here its corresponding current value with it's name. |
| **`disabled`**				| Boolean	| The current disabled value. |
| **`set(name, newValue)`**		| Function	| Sets a new value for the corresponding name and returns it. Only if its not disabled. |
| **`resetToDefault(name)`**	| Function	| Resets the value for the corresponding name with the default one. Only if its not disabled. |

## Events
| Events        		| Arguments						| Description |
| --------------------- | ----------------------------- | ---- |
| **`change`**			| `(newValues, oldValues)`		| Emitted when any value changes. |
| **`change-value`**	| `(name, newValue, oldValue)`	| Emitted when the corresnponding value changes. |

## Example

```vue {2-16,18,20,21,24,26,29}
<template>
	<RouteValues
		:optsByName="{
			slug: {
				where: 'params',
			},
			page: {
				type: 'number',
				defaultValue: 1,
			},
			sort: {
				defaultValue: 'option1',
			},
		}"
		#default="{ slug, page, sort, set }"
	>
		<div class="flex-row">
			<p>Slug: <b>{{ slug }}</b></p>
			<Paginator
				:value="page"
				@input="set('page', $event)"
			/>
			<SelectInput
				:value="sort"
				:options="sortOptions"
				@input="set('sort', $event)"
			/>
		</div>
	</RouteValues>
</template>

<script>
import { RouteValues } from 'vue-route-values'

export default {
	components: { RouteValues },
}
</script>
```

## Live examples

[Check here to see it in action](https://adrianhurt.github.io/vue-route-values-examples/route-values/foo-slug).
