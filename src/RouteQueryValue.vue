<script>
import routeValueComponentMixin from './routeValueComponentMixin'

export default {
    name: 'RouteQueryValue',
    mixins: [routeValueComponentMixin('query')],
    props: {
        keepsQuery: {
            type: Boolean,
            default: true,
        },
        affectsHistory: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
