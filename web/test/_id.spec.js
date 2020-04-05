import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Id from '@/pages/accounts/_id.vue'
import BootstrapVue, { BButton } from 'bootstrap-vue'
import VueRouter from 'vue-router'

const router = new VueRouter()

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(VueRouter)

const logout = jest.fn()

const wrapper = mount(Id, {
  localVue,
  router,
  methods: { logout },
})

describe('Id Page', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Show loading div at startup', () => {
    const loadingDiv = wrapper.find({ref: 'loading'})
    expect(loadingDiv.isVisible()).toBe(true)

    const containerDiv = wrapper.find({ref: 'container'})
    expect(containerDiv.exists()).toBe(false)
  })

  test('Show container div when loading is false', async () => {
    wrapper.setData({ loading: false })
    await Vue.nextTick()
    const containerDiv = wrapper.find({ref: 'container'})
    expect(containerDiv.exists()).toBe(true)
  })

  test('click newPayment button and show card', async () => {
    const button = wrapper.find({ref: 'newPayment'})
    expect(button.exists()).toBe(true)
    button.trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.showNewPaymentCard).toBe(true)
    const newPaymentCard = wrapper.find({ref: 'newPaymentCard'})
    expect(newPaymentCard.isVisible()).toBe(true)
  })

  test('click submit button emit submit event', async () => {
    const submitButton = wrapper.find({ ref: 'submitPayment' })
    expect(submitButton.exists()).toBe(true)

    // new payment data
    wrapper.setData({
      payment: {
        to: 2,
        amount: 10,
        details: 'test payment',
      }
    })

    submitButton.trigger('click')
    wrapper.emitted('onSubmit')
  })

  test('click logout button call logout method', () => {
    const logoutButton = wrapper.find({ ref: 'logoutButton' })
    expect(logoutButton.exists()).toBe(true)
    logoutButton.trigger('click')
    expect(logout).toBeCalled()
  })
})
