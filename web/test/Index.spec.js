import { mount, createLocalVue } from '@vue/test-utils'
import Index from '@/pages/Index.vue'
import BootstrapVue, { BButton } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

const goToAccount = jest.fn()

const wrapper = mount(Index, {
  localVue,
  methods: { goToAccount },
})

describe('Index Page', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('goToAccount to be called on click', async () => {
    const button = wrapper.find({ref: 'loginButton'})
    expect(button.exists()).toBe(true)

    button.trigger('click')
    expect(goToAccount).toBeCalled()
  })
})
