import {
    transformOptions,
    getDecodedValueFromRoute,
    updateRoute,
} from './utils'

export default (options) => {
    const optsArray = (Array.isArray(options) ? options : [options]).map(transformOptions)

    return {
        computed: optsArray.reduce(
            (acc, opts) => ({
                ...acc,
                [opts.name]: {
                    get () {
                        return getDecodedValueFromRoute.call(this, opts)
                    },
                    set (newValue) {
                        updateRoute.call(this, newValue, this[opts.name], opts)
                    },
                },
            }),
            {},
        ),
    }
}
