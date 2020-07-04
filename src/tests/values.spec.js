import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { RouteParamValue, RouteQueryValue, RouteValues } from '../main'
import Tester from './Tester.vue'

const route = {
    params: {},
    query: {},
}
const routerPush = ({ params, query }) => {
    if (params) {
        route.params = params
    }
    if (query) {
        route.query = query
    }
}
const router = {
    push: jest.fn().mockImplementation(routerPush),
    replace: jest.fn().mockImplementation(routerPush),
}

beforeEach(() => {
    route.params = { fooParam: 'foo' }
    route.query = { fooQuery: 'bar' }
    router.push.mockClear()
    router.replace.mockClear()
})

const getWrapper = (Component, props = {}) => mount(Component, {
    propsData: props,
    scopedSlots: {
        default: '<Tester v-bind="props" />',
    },
    stubs: { Tester },
    mocks: {
        $router: router,
        $route: route,
    },
})
const getWrapperUtilities = (...args) => {
    const wrapper = getWrapper(...args)
    const tester = wrapper.findComponent(Tester)
    return { wrapper, tester, getAttrs: () => tester.vm.$attrs }
}

describe('RouteParamValue', () => {
    const getUtilities = (props = {}) => getWrapperUtilities(RouteParamValue, { name: 'fooParam', ...props })

    it('It renders correctly', async () => {
        const { wrapper } = getUtilities()
        expect(wrapper.findAllComponents(Tester)).toHaveLength(1)
    })
    it('Value is correctly retrieved from route', async () => {
        const { getAttrs } = getUtilities()
        expect(getAttrs().value).toStrictEqual('foo')
    })
    it('Value is undefined if it is not present on route', async () => {
        const { getAttrs } = getUtilities({ name: 'none' })
        expect(getAttrs().value).toStrictEqual(undefined)
    })
    it('Value as defaultValue if it is not present on route', async () => {
        const { getAttrs } = getUtilities({ name: 'none', defaultValue: 'qux' })
        expect(getAttrs().value).toStrictEqual('qux')
    })
    it('Value works with custom decode', async () => {
        route.params = { foo: '1' }
        const { getAttrs } = getUtilities({ name: 'foo', decode: (x) => Number(x) })
        expect(getAttrs().value).toStrictEqual(1)
    })
    it('Value works with type "number"', async () => {
        route.params = { foo: '1' }
        const { getAttrs } = getUtilities({ name: 'foo', type: 'number' })
        expect(getAttrs().value).toStrictEqual(1)
    })
    it('Value works with type "boolean"', async () => {
        route.params = { foo: 'true' }
        const { getAttrs } = getUtilities({ name: 'foo', type: 'boolean' })
        expect(getAttrs().value).toStrictEqual(true)
    })
    it('Value is set with a new value', async () => {
        const { getAttrs } = getUtilities()
        expect(getAttrs().value).toStrictEqual('foo')
        getAttrs().set('qux')
        expect(router.push).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: {} })
        await Vue.nextTick()
        expect(getAttrs().value).toStrictEqual('qux')
    })
    it('change event is emitted', async () => {
        const { wrapper, getAttrs } = getUtilities()
        getAttrs().set('qux')
        await Vue.nextTick()
        expect(wrapper.emitted('change')[0]).toEqual(['qux', 'foo'])
    })
    it('change event not emitted for same value', async () => {
        const { wrapper, getAttrs } = getUtilities()
        getAttrs().set('foo')
        await Vue.nextTick()
        expect(wrapper.emitted('change')).toBe(undefined)
    })
    it('Custom encode', async () => {
        route.params = { foo: '1' }
        const { getAttrs } = getUtilities({
            name: 'foo',
            encode: (x) => String(x),
            decode: (x) => Number(x),
        })
        expect(getAttrs().value).toStrictEqual(1)
        getAttrs().set(2)
        expect(router.push).toHaveBeenCalledWith({ params: { foo: '2' }, query: {} })
        await Vue.nextTick()
        expect(getAttrs().value).toStrictEqual(2)
    })
    it('Set new value works with type "number"', async () => {
        route.params = { foo: '1' }
        const { getAttrs } = getUtilities({ name: 'foo', type: 'number' })
        expect(getAttrs().value).toStrictEqual(1)
        getAttrs().set(2)
        expect(router.push).toHaveBeenCalledWith({ params: { foo: '2' }, query: {} })
        await Vue.nextTick()
        expect(getAttrs().value).toStrictEqual(2)
    })
    it('Set new value works with type "boolean"', async () => {
        route.params = { foo: 'true' }
        const { getAttrs } = getUtilities({ name: 'foo', type: 'boolean' })
        expect(getAttrs().value).toStrictEqual(true)
        getAttrs().set(false)
        expect(router.push).toHaveBeenCalledWith({ params: { foo: 'false' }, query: {} })
        await Vue.nextTick()
        expect(getAttrs().value).toStrictEqual(false)
    })
    it('Uses "router.push" and does not keep query by default', async () => {
        const { getAttrs } = getUtilities()
        getAttrs().set('qux')
        expect(router.push).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: {} })
    })
    it('Keeps query if keepsQuery is true', async () => {
        const { getAttrs } = getUtilities({ keepsQuery: true })
        getAttrs().set('qux')
        expect(router.push).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: { fooQuery: 'bar' } })
    })
    it('Uses "router.replace" if affectsHistory is false', async () => {
        const { getAttrs } = getUtilities({ affectsHistory: false })
        getAttrs().set('qux')
        expect(router.replace).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: {} })
    })
    it('Custom navigationInterceptor', async () => {
        const navigationInterceptor = jest.fn()
        const { wrapper, getAttrs } = getUtilities({ navigationInterceptor })
        getAttrs().set('qux')
        expect(navigationInterceptor).toHaveBeenCalledWith({
            router,
            route,
            name: 'value',
            newValue: 'qux',
            encodedValue: 'qux',
            options: wrapper.vm.options,
        })
        expect(router.push).toHaveBeenCalledTimes(0)
        expect(router.replace).toHaveBeenCalledTimes(0)
    })
})

describe('RouteQueryValue', () => {
    const getUtilities = (props = {}) => getWrapperUtilities(RouteQueryValue, { name: 'fooQuery', ...props })

    it('It renders correctly', async () => {
        const { wrapper } = getUtilities()
        expect(wrapper.findAllComponents(Tester)).toHaveLength(1)
    })
    it('Value is correctly retrieved from route', async () => {
        const { getAttrs } = getUtilities()
        expect(getAttrs().value).toStrictEqual('bar')
    })
    it('Value is undefined if it is not present on route', async () => {
        const { getAttrs } = getUtilities({ name: 'none' })
        expect(getAttrs().value).toStrictEqual(undefined)
    })
    it('Value as defaultValue if it is not present on route', async () => {
        const { getAttrs } = getUtilities({ name: 'none', defaultValue: 'qux' })
        expect(getAttrs().value).toStrictEqual('qux')
    })
    it('Value works with custom decode', async () => {
        route.query = { foo: '1' }
        const { getAttrs } = getUtilities({ name: 'foo', decode: (x) => Number(x) })
        expect(getAttrs().value).toStrictEqual(1)
    })
    it('Value works with type "number"', async () => {
        route.query = { foo: '1' }
        const { getAttrs } = getUtilities({ name: 'foo', type: 'number' })
        expect(getAttrs().value).toStrictEqual(1)
    })
    it('Value works with type "boolean"', async () => {
        route.query = { foo: 'true' }
        const { getAttrs } = getUtilities({ name: 'foo', type: 'boolean' })
        expect(getAttrs().value).toStrictEqual(true)
    })
    it('Value is set with a new value', async () => {
        const { getAttrs } = getUtilities()
        expect(getAttrs().value).toStrictEqual('bar')
        getAttrs().set('qux')
        expect(router.replace).toHaveBeenCalledWith({ query: { fooQuery: 'qux' } })
        await Vue.nextTick()
        expect(getAttrs().value).toStrictEqual('qux')
    })
    it('change event is emitted', async () => {
        const { wrapper, getAttrs } = getUtilities()
        getAttrs().set('qux')
        await Vue.nextTick()
        expect(wrapper.emitted('change')[0]).toEqual(['qux', 'bar'])
    })
    it('change event not emitted for same value', async () => {
        const { wrapper, getAttrs } = getUtilities()
        getAttrs().set('bar')
        await Vue.nextTick()
        expect(wrapper.emitted('change')).toBe(undefined)
    })
    it('Custom encode', async () => {
        route.query = { foo: '1' }
        const { getAttrs } = getUtilities({
            name: 'foo',
            encode: (x) => String(x),
            decode: (x) => Number(x),
        })
        expect(getAttrs().value).toStrictEqual(1)
        getAttrs().set(2)
        expect(router.replace).toHaveBeenCalledWith({ query: { foo: '2' } })
        await Vue.nextTick()
        expect(getAttrs().value).toStrictEqual(2)
    })
    it('Set new value works with type "number"', async () => {
        route.query = { foo: '1' }
        const { getAttrs } = getUtilities({ name: 'foo', type: 'number' })
        expect(getAttrs().value).toStrictEqual(1)
        getAttrs().set(2)
        expect(router.replace).toHaveBeenCalledWith({ query: { foo: '2' } })
        await Vue.nextTick()
        expect(getAttrs().value).toStrictEqual(2)
    })
    it('Set new value works with type "boolean"', async () => {
        route.query = { foo: 'true' }
        const { getAttrs } = getUtilities({ name: 'foo', type: 'boolean' })
        expect(getAttrs().value).toStrictEqual(true)
        getAttrs().set(false)
        expect(router.replace).toHaveBeenCalledWith({ query: { foo: 'false' } })
        await Vue.nextTick()
        expect(getAttrs().value).toStrictEqual(false)
    })
    it('Uses "router.replace" and keeps query by default', async () => {
        route.query = { fooQuery: 'foo', barQuery: 'bar' }
        const { getAttrs } = getUtilities()
        getAttrs().set('qux')
        expect(router.replace).toHaveBeenCalledWith({ query: { fooQuery: 'qux', barQuery: 'bar' } })
    })
    it('Does not keep query if keepsQuery is false', async () => {
        route.query = { fooQuery: 'foo', barQuery: 'bar' }
        const { getAttrs } = getUtilities({ keepsQuery: false })
        getAttrs().set('qux')
        expect(router.replace).toHaveBeenCalledWith({ query: { fooQuery: 'qux' } })
    })
    it('Uses "router.push" if affectsHistory is true', async () => {
        const { getAttrs } = getUtilities({ affectsHistory: true })
        getAttrs().set('qux')
        expect(router.push).toHaveBeenCalledWith({ query: { fooQuery: 'qux' } })
    })
    it('Custom navigationInterceptor', async () => {
        const navigationInterceptor = jest.fn()
        const { wrapper, getAttrs } = getUtilities({ navigationInterceptor })
        getAttrs().set('qux')
        expect(navigationInterceptor).toHaveBeenCalledWith({
            router,
            route,
            name: 'value',
            newValue: 'qux',
            encodedValue: 'qux',
            options: wrapper.vm.options,
        })
        expect(router.replace).toHaveBeenCalledTimes(0)
        expect(router.push).toHaveBeenCalledTimes(0)
    })
})

describe('RouteValues', () => {
    const defaultOptsByName = {
        fooParam: {
            where: 'params',
        },
        fooQuery: undefined,
    }
    const getUtilities = (props = {}) => getWrapperUtilities(RouteValues, { optsByName: defaultOptsByName, ...props })

    it('It renders correctly', async () => {
        const { wrapper } = getUtilities()
        expect(wrapper.findAllComponents(Tester)).toHaveLength(1)
    })
    it('Values are correctly retrieved from route', async () => {
        const { getAttrs } = getUtilities()
        expect(getAttrs().fooParam).toStrictEqual('foo')
        expect(getAttrs().fooQuery).toStrictEqual('bar')
    })
    it('Any value is undefined if it is not present on route', async () => {
        const { getAttrs } = getUtilities({ optsByName: { quxParam: { where: 'params' }, quxQuery: undefined } })
        expect(getAttrs().quxParam).toStrictEqual(undefined)
        expect(getAttrs().quxQuery).toStrictEqual(undefined)
    })
    it('Values as their defaultValue if it is not present on route', async () => {
        const { getAttrs } = getUtilities({ optsByName: { quxParam: { where: 'params', defaultValue: 'foo' }, quxQuery: { defaultValue: 'bar' } } })
        expect(getAttrs().quxParam).toStrictEqual('foo')
        expect(getAttrs().quxQuery).toStrictEqual('bar')
    })
    it('Values work with custom decode', async () => {
        route.params = { foo: '1' }
        route.query = { bar: '2' }
        const decode = (x) => Number(x)
        const { getAttrs } = getUtilities({ optsByName: { foo: { where: 'params', decode }, bar: { decode } } })
        expect(getAttrs().foo).toStrictEqual(1)
        expect(getAttrs().bar).toStrictEqual(2)
    })
    it('Values work with type "number"', async () => {
        route.params = { foo: '1' }
        route.query = { bar: '2' }
        const { getAttrs } = getUtilities({ optsByName: { foo: { where: 'params', type: 'number' }, bar: { type: 'number' } } })
        expect(getAttrs().foo).toStrictEqual(1)
        expect(getAttrs().bar).toStrictEqual(2)
    })
    it('Values work with type "boolean"', async () => {
        route.params = { foo: 'true' }
        route.query = { bar: 'false' }
        const { getAttrs } = getUtilities({ optsByName: { foo: { where: 'params', type: 'boolean' }, bar: { type: 'boolean' } } })
        expect(getAttrs().foo).toStrictEqual(true)
        expect(getAttrs().bar).toStrictEqual(false)
    })
    it('Values are set with a new value', async () => {
        const { getAttrs } = getUtilities()
        expect(getAttrs().fooParam).toStrictEqual('foo')
        expect(getAttrs().fooQuery).toStrictEqual('bar')
        getAttrs().set('fooParam', 'qux')
        expect(router.push).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: {} })
        getAttrs().set('fooQuery', 'qux')
        expect(router.replace).toHaveBeenCalledWith({ query: { fooQuery: 'qux' } })
        await Vue.nextTick()
        expect(getAttrs().fooParam).toStrictEqual('qux')
        expect(getAttrs().fooQuery).toStrictEqual('qux')
    })
    it('change event is emitted', async () => {
        const { wrapper, getAttrs } = getUtilities()
        getAttrs().set('fooParam', 'qux')
        await Vue.nextTick()
        expect(wrapper.emitted('change')[0]).toEqual([{ fooParam: 'qux', fooQuery: undefined }, { fooParam: 'foo', fooQuery: 'bar' }])
    })
    it('change-value event is emitted', async () => {
        const { wrapper, getAttrs } = getUtilities()
        getAttrs().set('fooParam', 'qux')
        await Vue.nextTick()
        expect(wrapper.emitted('change-value')[0]).toEqual(['fooParam', 'qux', 'foo'])
    })
    it('change event not emitted for same value', async () => {
        const { wrapper, getAttrs } = getUtilities()
        getAttrs().set('fooParam', 'foo')
        await Vue.nextTick()
        expect(wrapper.emitted('change')).toBe(undefined)
        expect(wrapper.emitted('change-value')).toBe(undefined)
    })
    it('Custom encode', async () => {
        route.params = { foo: '1' }
        route.query = { bar: '2' }
        const encode = (x) => String(x)
        const decode = (x) => Number(x)
        const { getAttrs } = getUtilities({ optsByName: { foo: { where: 'params', encode, decode }, bar: { encode, decode } } })
        expect(getAttrs().foo).toStrictEqual(1)
        expect(getAttrs().bar).toStrictEqual(2)
        getAttrs().set('foo', 3)
        expect(router.push).toHaveBeenCalledWith({ params: { foo: '3' }, query: {} })
        getAttrs().set('bar', 4)
        expect(router.replace).toHaveBeenCalledWith({ query: { bar: '4' } })
        await Vue.nextTick()
        expect(getAttrs().foo).toStrictEqual(3)
        expect(getAttrs().bar).toStrictEqual(4)
    })
    it('Set new values works with type "number"', async () => {
        route.params = { foo: '1' }
        route.query = { bar: '2' }
        const { getAttrs } = getUtilities({ optsByName: { foo: { where: 'params', type: 'number' }, bar: { type: 'number' } } })
        expect(getAttrs().foo).toStrictEqual(1)
        expect(getAttrs().bar).toStrictEqual(2)
        getAttrs().set('foo', 3)
        expect(router.push).toHaveBeenCalledWith({ params: { foo: '3' }, query: {} })
        getAttrs().set('bar', 4)
        expect(router.replace).toHaveBeenCalledWith({ query: { bar: '4' } })
        await Vue.nextTick()
        expect(getAttrs().foo).toStrictEqual(3)
        expect(getAttrs().bar).toStrictEqual(4)
    })
    it('Set new values works with type "boolean"', async () => {
        route.params = { foo: 'true' }
        route.query = { bar: 'false' }
        const { getAttrs } = getUtilities({ optsByName: { foo: { where: 'params', type: 'boolean' }, bar: { type: 'boolean' } } })
        expect(getAttrs().foo).toStrictEqual(true)
        expect(getAttrs().bar).toStrictEqual(false)
        getAttrs().set('foo', false)
        expect(router.push).toHaveBeenCalledWith({ params: { foo: 'false' }, query: {} })
        getAttrs().set('bar', true)
        expect(router.replace).toHaveBeenCalledWith({ query: { bar: 'true' } })
        await Vue.nextTick()
        expect(getAttrs().foo).toStrictEqual(false)
        expect(getAttrs().bar).toStrictEqual(true)
    })
    it('For Params: Uses "router.push" and does not keep query by default', async () => {
        const { getAttrs } = getUtilities()
        getAttrs().set('fooParam', 'qux')
        expect(router.push).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: {} })
    })
    it('For Query: Uses "router.replace" and keeps query by default', async () => {
        route.query = { fooQuery: 'foo', barQuery: 'bar' }
        const { getAttrs } = getUtilities()
        getAttrs().set('fooQuery', 'qux')
        expect(router.replace).toHaveBeenCalledWith({ query: { fooQuery: 'qux', barQuery: 'bar' } })
    })
    it('For Params: Keeps query if keepsQuery is true', async () => {
        const { getAttrs } = getUtilities({ optsByName: { fooParam: { where: 'params', keepsQuery: true } } })
        getAttrs().set('fooParam', 'qux')
        expect(router.push).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: { fooQuery: 'bar' } })
    })
    it('For Query: Does not keep query if keepsQuery is false', async () => {
        route.query = { fooQuery: 'foo', barQuery: 'bar' }
        const { getAttrs } = getUtilities({ optsByName: { fooQuery: { keepsQuery: false } } })
        getAttrs().set('fooQuery', 'qux')
        expect(router.replace).toHaveBeenCalledWith({ query: { fooQuery: 'qux' } })
    })
    it('For Params: Uses "router.replace" if affectsHistory is false', async () => {
        const { getAttrs } = getUtilities({ optsByName: { fooParam: { where: 'params', affectsHistory: false } } })
        getAttrs().set('fooParam', 'qux')
        expect(router.replace).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: {} })
    })
    it('For Query: Uses "router.push" if affectsHistory is true', async () => {
        const { getAttrs } = getUtilities({ optsByName: { fooQuery: { affectsHistory: true } } })
        getAttrs().set('fooQuery', 'qux')
        expect(router.push).toHaveBeenCalledWith({ query: { fooQuery: 'qux' } })
    })
    it('Form Params: Custom navigationInterceptor', async () => {
        const navigationInterceptor = jest.fn()
        const { wrapper, getAttrs } = getUtilities({ optsByName: { fooParam: { where: 'params', navigationInterceptor } } })
        getAttrs().set('fooParam', 'qux')
        expect(navigationInterceptor).toHaveBeenCalledWith({
            router,
            route,
            name: 'fooParam',
            newValue: 'qux',
            encodedValue: 'qux',
            options: wrapper.vm.actualOptionsByName.fooParam,
        })
        expect(router.replace).toHaveBeenCalledTimes(0)
        expect(router.push).toHaveBeenCalledTimes(0)
    })
    it('Form Query: Custom navigationInterceptor', async () => {
        const navigationInterceptor = jest.fn()
        const { wrapper, getAttrs } = getUtilities({ optsByName: { fooQuery: { navigationInterceptor } } })
        getAttrs().set('fooQuery', 'qux')
        expect(navigationInterceptor).toHaveBeenCalledWith({
            router,
            route,
            name: 'fooQuery',
            newValue: 'qux',
            encodedValue: 'qux',
            options: wrapper.vm.actualOptionsByName.fooQuery,
        })
        expect(router.replace).toHaveBeenCalledTimes(0)
        expect(router.push).toHaveBeenCalledTimes(0)
    })
    it('Custom navigationInterceptor', async () => {
        const navigationInterceptor = jest.fn()
        const { wrapper, getAttrs } = getUtilities({ navigationInterceptor })
        getAttrs().set('fooQuery', 'qux')
        expect(navigationInterceptor).toHaveBeenCalledWith({
            router,
            route,
            name: 'fooQuery',
            newValue: 'qux',
            encodedValue: 'qux',
            options: wrapper.vm.actualOptionsByName.fooQuery,
        })
        expect(router.replace).toHaveBeenCalledTimes(0)
        expect(router.push).toHaveBeenCalledTimes(0)
    })
})
