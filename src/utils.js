export function getEncodeFunction (encode, type) {
    return encode
		|| (type && type !== 'string' && ((x) => String(x)))
		|| ((x) => x)
}
export function getDecodeFunction (decode, type) {
    return decode
		|| (type === 'number' && ((x) => Number(x)))
		|| (type === 'boolean' && ((x) => x === 'true'))
		|| ((x) => x)
}

export function transformOptions (opts) {
    const where = opts.where === 'params' ? 'params' : 'query'
    return {
        where,
        name: opts.name,
        urlName: opts.urlName || opts.name,
        defaultValue: opts.defaultValue,
        encode: getEncodeFunction(opts.encode, opts.type),
        decode: getDecodeFunction(opts.decode, opts.type),
        keepsQuery: opts.keepsQuery === true || (opts.keepsQuery === undefined && where === 'query') || false,
        affectsHistory: opts.affectsHistory === true || (opts.affectsHistory === undefined && where === 'params') || false,
        navigationInterceptor: opts.navigationInterceptor,
    }
}

export function valueFromRoute (route, where, urlName) {
    return route[where][urlName]
}

export function getDecodedValueFromRoute ({
    where, urlName, defaultValue, decode,
}) {
    return decode(valueFromRoute(this.$route, where, urlName) ?? defaultValue)
}

export function getAllDecodedValuesFromRoute (optionsByName) {
    return Object.keys(optionsByName).reduce(
        (acc, name) => ({
            ...acc,
            [name]: getDecodedValueFromRoute.call(this, optionsByName[name]),
        }),
        {},
    )
}

export function updateRoute (newValue, oldValue, options) {
    const {
        where, name, urlName, defaultValue, encode, keepsQuery, affectsHistory, navigationInterceptor,
    } = options
    if (newValue !== oldValue) {
        const encodedValue = newValue !== defaultValue ? encode(newValue) : undefined
        if (navigationInterceptor) {
            navigationInterceptor({
                router: this.$router,
                route: this.$route,
                name,
                newValue,
                encodedValue,
                options,
            })
        } else {
            const routeOptions = {
                query: keepsQuery ? { ...this.$route.query } : {},
            }
            if (where === 'params') {
                routeOptions.params = { ...this.$route.params, [urlName]: encodedValue }
            } else {
                routeOptions.query[urlName] = encodedValue
            }
            this.$router[affectsHistory ? 'push' : 'replace'](routeOptions)
        }
    }
}
