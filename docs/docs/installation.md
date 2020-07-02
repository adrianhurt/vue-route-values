---
title: Installation
description: Explains how to install the library.
meta:
  - name: keywords
    content: vue values vue-route-values wrapper component url route router param query installation
---

# Installation

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
    <Value #default="{ value, set }">
        ...
    </Value>
</template>

<script>
import { Value } from 'vue-route-values'

export default {
    name: 'ValueExample',
    components: { Value },
}
</script>
```