import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import VueCompositionApi from '@vue/composition-api'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import DisasterEditor from '@/components/DisasterEditor.vue'
import DisasterSelector from '@/views/DisasterSelector.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(VueCompositionApi)
localVue.use(BootstrapVue)
localVue.use(IconsPlugin)

describe('災害の編集', () => {
  const wrapper = mount(DisasterSelector, { localVue })
  test('災害名が20文字を超えたときのエラー', async () => {
    const textInput = wrapper.find('.disaster-name-input')
    await textInput.setValue('20characterslongname!')
    const button = wrapper.find('.save-button')
    await button.trigger('click')
    const invalidMsg = wrapper.find('.disaster-name-input + .invalid-feedback')
    expect(invalidMsg.text()).toBe("災害名は20文字以内です。")
  })
  test('災害名が0文字のときのエラー', async () => {
    const textInput = wrapper.find('.disaster-name-input')
    await textInput.setValue('')
    const button = wrapper.find('.save-button')
    await button.trigger('click')
    const invalidMsg = wrapper.find('.disaster-name-input + .invalid-feedback')
    expect(invalidMsg.text()).toBe("災害名は入力必須です。")
  })
  test('発災日が入力されていなかったときのエラー', async () => {
    const textInput = wrapper.find('.occurred-date-input')
    await textInput.setValue('')
    const button = wrapper.find('.save-button')
    await button.trigger('click')
    const invalidMsg = wrapper.find('.occurred-date-input + .invalid-feedback')
    expect(invalidMsg.text()).toBe("発災日は入力必須です。")
  })
  test('調査票の種類を選択していなかったときのエラー', async () => {
    const textInput = wrapper.find('.disaster-types-input')
    await textInput.setValue('')
    const button = wrapper.find('.save-button')
    await button.trigger('click')
    const invalidMsg = wrapper.find('.occurred-date-input + .invalid-feedback')
    expect(invalidMsg.text()).toBe("発災日は入力必須です。")
    
  })
})