---
title: '&lt;RouteQueryValue /&gt;'
metaTitle: RouteQueryValue | Vue Route Values
description: RouteQueryValue component's documentation.
meta:
  - name: keywords
    content: vue values vue-route-values wrapper component url route router query
---

# &lt;RouteQueryValue /&gt;

Component that allows you to manage one single _route query value_.

For example, for URL `https://yourweb.com/items?page=2` you will be able to easily manage the `page` _route query value_.


## Props
| Props         						| Type      | Default		| Description |
| ------------------------------------- | --------- | ------------- | ---- |
| **`name`**							| String	| *Required*	| The name of the route query param. |
| **`defaultValue`**					| *any*		| `undefined`	| The default value. If current `value` is equal to `defaultValue` it will be removed from the URL. |
| **`type`**							| String	| `string`		| The value's type to automatically encode/decode from string. The possible values are `"string"`, `"number"` or `"boolean"`. |
| **`encode(value)`**					| Function	| `undefined` 	| The encode funtion from the route string value (`Any => String`). If it's present the `type` prop is ignored. |
| **`decode(stringValue)`**				| Function	| `undefined` 	| The decode funtion from the route string value (`String => Any`). If it's present the `type` prop is ignored. |
| **`keepsQuery`**						| Boolean	| `true` 		| `true` if you want to keep any previous route query param into the new navigation. |
| **`affectsHistory`**					| Boolean	| `false` 		| `true` if you want to use `$router.push`. `false` for `$router.replace`. |
| **`navigationInterceptor(params)`**	| Function	| `undefined` 	| It's called when a new navigation should be place instead of using the default behaviour. The `params` is an object with `{ router, route, name, newValue, encodedValue, options }` where in options appears all the component's props. |
| **`disabled`**						| Boolean	| `false` 		| `true` for disable any value mutation. |

## Scoped props (default slot)
| Scoped props         		| Type    	| Description |
| ------------------------- | --------- | ---- |
| **`value`**				| *any*		| The current value. |
| **`disabled`**			| Boolean	| The current disabled value. |
| **`set(newValue)`**		| Function	| Sets a new value and returns it. Only if its not disabled. |
| **`resetToDefault()`**	| Function	| Resets the value with the default one. Only if its not disabled. |

## Events
| Events        | Arguments					| Description |
| ------------- | ------------------------- | ---- |
| **`change`**	| `(newValue, oldValue)`	| Emitted when the value changes. |

## Example

```vue {2-6,8,9,11}
<template>
	<RouteQueryValue
		name="page"
		type="number"
		:defaultValue="1"
		#default="{ value, set }"
	>
		<Paginator
			:value="value"
			@input="set"
		/>
	</RouteQueryValue>
</template>

<script>
import { RouteQueryValue } from 'vue-route-values'

export default {
	components: { RouteQueryValue },
}
</script>
```

## Live examples

[Check here to see it in action](https://adrianhurt.github.io/vue-route-values-examples/route-query-value?page=2).
