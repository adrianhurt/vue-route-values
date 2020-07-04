import Vue from 'vue'
import { mount } from '@vue/test-utils'
import routeValuesMixin from '../routeValuesMixin'
import { transformOptions } from '../utils'
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

const defaultOpts = [
    { where: 'params', name: 'fooParam' },
    { name: 'fooQuery' },
]

const getWrapper = (opts = defaultOpts) => {
    const optsArray = Array.isArray(opts) ? opts : [opts]
    return mount({
        name: 'MixinTester',
        mixins: [routeValuesMixin(optsArray)],
        render (h) {
            return h(Tester, { props: optsArray.reduce((acc, { name }) => ({ ...acc, [name]: this[name] }), {}) })
        },
    }, {
        mocks: {
            $router: router,
            $route: route,
        },
    })
}

describe('routeValuesMixin', () => {
    it('Values are correctly retrieved from route', async () => {
        const wrapper = getWrapper()
        expect(wrapper.vm.fooParam).toStrictEqual('foo')
        expect(wrapper.vm.fooQuery).toStrictEqual('bar')
    })
    it('Any value is undefined if it is not present on route', async () => {
        const wrapper = getWrapper([{ where: 'params', name: 'quxParam' }, { name: 'quxQuery' }])
        expect(wrapper.vm.quxParam).toStrictEqual(undefined)
        expect(wrapper.vm.quxQuery).toStrictEqual(undefined)
    })
    it('Values as their defaultValue if it is not present on route', async () => {
        const wrapper = getWrapper([{ where: 'params', name: 'quxParam', defaultValue: 'foo' }, { name: 'quxQuery', defaultValue: 'bar' }])
        expect(wrapper.vm.quxParam).toStrictEqual('foo')
        expect(wrapper.vm.quxQuery).toStrictEqual('bar')
    })
    it('Values work with custom decode', async () => {
        route.params = { foo: '1' }
        route.query = { bar: '2' }
        const decode = (x) => Number(x)
        const wrapper = getWrapper([{ where: 'params', name: 'foo', decode }, { name: 'bar', decode }])
        expect(wrapper.vm.foo).toStrictEqual(1)
        expect(wrapper.vm.bar).toStrictEqual(2)
    })
    it('Values work with type "number"', async () => {
        route.params = { foo: '1' }
        route.query = { bar: '2' }
        const wrapper = getWrapper([{ where: 'params', name: 'foo', type: 'number' }, { name: 'bar', type: 'number' }])
        expect(wrapper.vm.foo).toStrictEqual(1)
        expect(wrapper.vm.bar).toStrictEqual(2)
    })
    it('Values work with type "boolean"', async () => {
        route.params = { foo: 'true' }
        route.query = { bar: 'false' }
        const wrapper = getWrapper([{ where: 'params', name: 'foo', type: 'boolean' }, { name: 'bar', type: 'boolean' }])
        expect(wrapper.vm.foo).toStrictEqual(true)
        expect(wrapper.vm.bar).toStrictEqual(false)
    })
    it('Values are set with a new value', async () => {
        const wrapper = getWrapper()
        expect(wrapper.vm.fooParam).toStrictEqual('foo')
        expect(wrapper.vm.fooQuery).toStrictEqual('bar')
        wrapper.vm.fooParam = 'qux'
        expect(router.push).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: {} })
        wrapper.vm.fooQuery = 'qux'
        expect(router.replace).toHaveBeenCalledWith({ query: { fooQuery: 'qux' } })
        await Vue.nextTick()
        expect(wrapper.vm.fooParam).toStrictEqual('qux')
        expect(wrapper.vm.fooQuery).toStrictEqual('qux')
    })
    it('Custom encode', async () => {
        route.params = { foo: '1' }
        route.query = { bar: '2' }
        const encode = (x) => String(x)
        const decode = (x) => Number(x)
        const wrapper = getWrapper([
            {
                where: 'params', name: 'foo', encode, decode,
            },
            { name: 'bar', encode, decode },
        ])
        expect(wrapper.vm.foo).toStrictEqual(1)
        expect(wrapper.vm.bar).toStrictEqual(2)
        wrapper.vm.foo = 3
        expect(router.push).toHaveBeenCalledWith({ params: { foo: '3' }, query: {} })
        wrapper.vm.bar = 4
        expect(router.replace).toHaveBeenCalledWith({ query: { bar: '4' } })
        await Vue.nextTick()
        expect(wrapper.vm.foo).toStrictEqual(3)
        expect(wrapper.vm.bar).toStrictEqual(4)
    })
    it('Set new values works with type "number"', async () => {
        route.params = { foo: '1' }
        route.query = { bar: '2' }
        const wrapper = getWrapper([{ where: 'params', name: 'foo', type: 'number' }, { name: 'bar', type: 'number' }])
        expect(wrapper.vm.foo).toStrictEqual(1)
        expect(wrapper.vm.bar).toStrictEqual(2)
        wrapper.vm.foo = 3
        expect(router.push).toHaveBeenCalledWith({ params: { foo: '3' }, query: {} })
        wrapper.vm.bar = 4
        expect(router.replace).toHaveBeenCalledWith({ query: { bar: '4' } })
        await Vue.nextTick()
        expect(wrapper.vm.foo).toStrictEqual(3)
        expect(wrapper.vm.bar).toStrictEqual(4)
    })
    it('Set new values works with type "boolean"', async () => {
        route.params = { foo: 'true' }
        route.query = { bar: 'false' }
        const wrapper = getWrapper([{ where: 'params', name: 'foo', type: 'boolean' }, { name: 'bar', type: 'boolean' }])
        expect(wrapper.vm.foo).toStrictEqual(true)
        expect(wrapper.vm.bar).toStrictEqual(false)
        wrapper.vm.foo = false
        expect(router.push).toHaveBeenCalledWith({ params: { foo: 'false' }, query: {} })
        wrapper.vm.bar = true
        expect(router.replace).toHaveBeenCalledWith({ query: { bar: 'true' } })
        await Vue.nextTick()
        expect(wrapper.vm.foo).toStrictEqual(false)
        expect(wrapper.vm.bar).toStrictEqual(true)
    })
    it('For Params: Uses "router.push" and does not keep query by default', async () => {
        const wrapper = getWrapper()
        wrapper.vm.fooParam = 'qux'
        expect(router.push).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: {} })
    })
    it('For Query: Uses "router.replace" and keeps query by default', async () => {
        route.query = { fooQuery: 'foo', barQuery: 'bar' }
        const wrapper = getWrapper()
        wrapper.vm.fooQuery = 'qux'
        expect(router.replace).toHaveBeenCalledWith({ query: { fooQuery: 'qux', barQuery: 'bar' } })
    })
    it('For Params: Keeps query if keepsQuery is true', async () => {
        const wrapper = getWrapper([{ where: 'params', name: 'fooParam', keepsQuery: true }])
        wrapper.vm.fooParam = 'qux'
        expect(router.push).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: { fooQuery: 'bar' } })
    })
    it('For Query: Does not keep query if keepsQuery is false', async () => {
        route.query = { fooQuery: 'foo', barQuery: 'bar' }
        const wrapper = getWrapper([{ name: 'fooQuery', keepsQuery: false }])
        wrapper.vm.fooQuery = 'qux'
        expect(router.replace).toHaveBeenCalledWith({ query: { fooQuery: 'qux' } })
    })
    it('For Params: Uses "router.replace" if affectsHistory is false', async () => {
        const wrapper = getWrapper([{ where: 'params', name: 'fooParam', affectsHistory: false }])
        wrapper.vm.fooParam = 'qux'
        expect(router.replace).toHaveBeenCalledWith({ params: { fooParam: 'qux' }, query: {} })
    })
    it('For Query: Uses "router.push" if affectsHistory is true', async () => {
        const wrapper = getWrapper([{ name: 'fooQuery', affectsHistory: true }])
        wrapper.vm.fooQuery = 'qux'
        expect(router.push).toHaveBeenCalledWith({ query: { fooQuery: 'qux' } })
    })
    it('Form Params: Custom navigationInterceptor', async () => {
        const navigationInterceptor = jest.fn()
        const encode = (x) => String(x)
        const decode = (x) => Number(x)
        const opts = {
            where: 'params', name: 'fooParam', navigationInterceptor, encode, decode,
        }
        const wrapper = getWrapper(opts)
        wrapper.vm.fooParam = 'qux'
        expect(navigationInterceptor).toHaveBeenCalledWith({
            router,
            route,
            name: 'fooParam',
            newValue: 'qux',
            encodedValue: 'qux',
            options: transformOptions(opts),
        })
        expect(router.replace).toHaveBeenCalledTimes(0)
        expect(router.push).toHaveBeenCalledTimes(0)
    })
    it('Form Query: Custom navigationInterceptor', async () => {
        const navigationInterceptor = jest.fn()
        const encode = (x) => String(x)
        const decode = (x) => Number(x)
        const opts = {
            name: 'fooQuery', navigationInterceptor, encode, decode,
        }
        const wrapper = getWrapper(opts)
        wrapper.vm.fooQuery = 'qux'
        expect(navigationInterceptor).toHaveBeenCalledWith({
            router,
            route,
            name: 'fooQuery',
            newValue: 'qux',
            encodedValue: 'qux',
            options: transformOptions(opts),
        })
        expect(router.replace).toHaveBeenCalledTimes(0)
        expect(router.push).toHaveBeenCalledTimes(0)
    })
})
