---
title: Introduction
description: Explains the library and introduces its main features.
meta:
  - name: keywords
    content: vue values vue-route-values wrapper component url route router param query introduction
---

# Introduction

**Vue-route-values** is a library that allows you to manage _route params_ and _route query params_ directly within your template —using [vue-router](https://router.vuejs.org/)— without any other scaffolding. That’s perfect for handle _route query params_ for pagination, filtering, sorting, tracking, etc. Using the _route params_ directly as regular reactive values instead of using them as readonly values, gives you the ability to have a verbose URL ready to share at anytime.

In short, _RouteParamValue_ and _RouteQueryValue_ components handle their corresponding values —you only need to declare the name they have within the route/URL— and exposes its current value together with some helper functions to mutate it:
- `value`
- `set(newValue)`
- `resetToDefault()`

This example will handle a route like `/items?page=2` or `/items` (page=1 as default):

```vue {2-7,9,10}
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
```

On the other hand, you can use _RouteValues_ to handle multiple _route params_ or _route query params_ at once. Check this example that handles a route like `/:username/friends?page=2&sort=name`:

```vue {2-16,18,20,21,24,26}
<template>
	<RouteValues
		:optsByName="{
			username: {
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
		#default="{ username, page, sort, set }"
	>
		<div class="flex-row">
			<p>Username: <b>{{ username }}</b></p>
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
```

Finally, you can use the _factory mixin_ `routeValuesMixin` to use this _route values_ directly within a custom component —it will add every _route value_ as a computed value with a setter—.
This example is equivalent to the previous one with a route like `/:username/friends?page=2&sort=name`:

```vue {3,4,6,13,19-23}
<template>
	<div class="flex-row">
		<p>Username: <b>{{ username }}</b></p>
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
        { where: 'params', name: 'username' },
        { name: 'page', type: 'number', defaultValue: 1 },
        { name: 'sort', defaultValue: 'option1' },
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
