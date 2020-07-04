# vue-route-values

A set of simple components to manage route and query params using Vue Router.

# Documentation

Please, check the [documentation page here](https://adrianhurt.github.io/vue-route-values/).
And here [some live examples](https://adrianhurt.github.io/vue-route-values-examples/).

## Install

```
yarn add vue-route-values
```
or
```
npm install vue-route-values --save
```

And that's all! Here you have a simple usage example.

```vue
<template>
    <RouteQueryValue
        #default="{ value, set }"
        :encode="x => String(x)"
        :decode="x => Number(x)"
        name="page"
        :defaultValue="1"
    >
        <div class="paginator">
            <a @click="set(value - 1)">prev</a>
            <div>{{ value }}</div>
            <a @click="set(value + 1)">next</a>
        </div>
    </RouteQueryValue>
</template>

<script>
import { RouteQueryValue } from 'vue-route-values'

export default {
    name: 'RouteQueryValueExample',
    components: { RouteQueryValue },
}
</script>
```