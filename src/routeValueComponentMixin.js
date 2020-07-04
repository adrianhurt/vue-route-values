import {
    transformOptions,
    getDecodedValueFromRoute,
    updateRoute,
} from './utils'

export default (where) => ({
    props: {
        name: {
            type: String,
            required: true,
        },
        defaultValue: undefined,
        type: {
            type: String,
            default: 'string',
        },
        encode: {
            type: Function,
            default: undefined,
        },
        decode: {
            type: Function,
            default: undefined,
        },
        keepsQuery: {
            type: Boolean,
            default: false,
        },
        affectsHistory: {
            type: Boolean,
            default: true,
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
        options () {
            return transformOptions({
                where,
                name: 'value',
                urlName: this.name,
                defaultValue: this.defaultValue,
                type: this.type,
                encode: this.encode,
                decode: this.decode,
                keepsQuery: this.keepsQuery,
                affectsHistory: this.affectsHistory,
                navigationInterceptor: this.navigationInterceptor,
            })
        },
        value: {
            get () {
                return getDecodedValueFromRoute.call(this, this.options)
            },
            set (newValue) {
                updateRoute.call(this, newValue, this[this.options.name], this.options)
            },
        },
    },
    watch: {
        value (newValue, oldValue) {
            this.$emit('change', newValue, oldValue)
        },
    },
    methods: {
        set (newValue) {
            if (newValue !== this.value && !this.disabled) {
                this.value = newValue
            }
            return newValue
        },
        resetToDefault () {
            this.set(this.defaultValue)
        },
    },
    render () {
        return this.$scopedSlots.default({
            value: this.value,
            disabled: this.disabled,
            set: this.set,
            resetToDefault: this.resetToDefault,
        })
    },
})
