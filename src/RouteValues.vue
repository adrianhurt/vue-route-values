<script>
import {
    transformOptions,
    getAllDecodedValuesFromRoute,
    updateRoute,
} from './utils'

export default {
    name: 'RouteValues',
    props: {
        optsByName: {
            type: Object,
            required: true,
        },
        keepsQuery: {
            type: Boolean,
            default: undefined,
        },
        affectsHistory: {
            type: Boolean,
            default: undefined,
        },
        navigationInterceptor: {
            type: Function,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        actualOptionsByName () {
            return Object.keys(this.optsByName).reduce(
                (acc, name) => {
                    const opts = this.optsByName[name] || {}
                    return {
                        ...acc,
                        [name]: transformOptions({
                            ...opts,
                            name,
                            urlName: name,
                            keepsQuery: opts.keepsQuery ?? this.keepsQuery,
                            affectsHistory: opts.affectsHistory ?? this.affectsHistory,
                            navigationInterceptor: opts.navigationInterceptor ?? this.navigationInterceptor,
                        }),
                    }
                },
                {},
            )
        },
        valuesByName () {
            return getAllDecodedValuesFromRoute.call(this, this.actualOptionsByName)
        },
    },
    watch: {
        valuesByName (newValue, oldValue) {
            this.$emit('change', newValue, oldValue)
        },
    },
    methods: {
        set (name, newValue) {
            const oldValue = this.valuesByName[name]
            if (newValue !== oldValue && !this.disabled) {
                updateRoute.call(this, newValue, this.valuesByName[name], this.actualOptionsByName[name])
                this.$emit('change-value', name, newValue, oldValue)
            }
            return newValue
        },
        resetToDefault (name) {
            this.set(name, this.defaultValue)
        },
    },
    render () {
        return this.$scopedSlots.default({
            ...(
                Object.keys(this.valuesByName).reduce((acc, name) => ({ ...acc, [name]: this.valuesByName[name] }), {})
            ),
            disabled: this.disabled,
            set: this.set,
            resetToDefault: this.resetToDefault,
        })
    },
}
</script>
