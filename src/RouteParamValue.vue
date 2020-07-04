<script>
import routeValueComponentMixin from './routeValueComponentMixin'

export default {
    name: 'RouteParamValue',
    mixins: [routeValueComponentMixin('params')],
    props: {
        keepsQuery: {
            type: Boolean,
            default: false,
        },
        affectsHistory: {
            type: Boolean,
            default: true,
        },
    },
}
</script>
