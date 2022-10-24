<template>
  <div>
    <h1>災害名の編集</h1>
    <b-form-group
      description="災害名を20文字内で入力"
      :invalid-feedback="invalidDisasterName"
      :state="!isTringToSave || disasterNameState"
    >
      災害名: <b-form-input class="disaster-name-input" type="text" v-model="disasterForm.name"></b-form-input>
    </b-form-group>

    <b-form-group
      description="発災日を入力"
      :invalid-feedback="invalidOccurredDate"
      :state="!isTringToSave || occurredDateState"
    >
      発災日: <b-form-input class="occurred-date-input" type="date" v-model="disasterForm.occurredDate"></b-form-input>
    </b-form-group>

    <b-form-group
      :state="!isTringToSave || typesState"
      :invalid-feedback="invalidTypesState"
    >
      調査票の種類: <b-form-checkbox-group
        class="disaster-types-input"
        v-model="disasterForm.types"
        :options="disastersOptions"
      >
      </b-form-checkbox-group>
    </b-form-group>

    <b-form-group
      :state="!isTringToSave || recommendedState"
      :invalid-feedback="invalidRecommended"
    >
      推奨調査票: <b-form-select v-model="disasterForm.recommended" :options="disastersOptions"></b-form-select>
    </b-form-group>

    <b-button variant="primary" @click="trySave" class="save-button">保存</b-button>
    <b-modal v-model="isShowModal" id="modal-pressed-save-button" :title="titleResultTriedSave" hide-footer>
      <p>{{ bodyResultTriedSave }}</p>
      <b-button @click="isShowModal = false">閉じる</b-button>
    </b-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch
} from '@vue/composition-api'
type DisasterType = 'flood' | 'earthquake' | 'ground' | 'wind'
interface DisasterJob {
  name: string
  occurredDate: string
  recommended: string
  types: DisasterType[]
}
export default defineComponent({
  name: 'disasterEditor',
  setup () {
    const disasterForm = reactive<DisasterJob>({
      name: '',
      occurredDate: '',
      recommended: '',
      types: []
    })
    const disastersOptions = reactive([
      { text: '水害', value: 'flood' },
      { text: '地震', value: 'earthquake' },
      { text: '風害', value: 'wind' },
      { text: '地盤', value: 'ground' }
    ])

    const isTringToSave = ref<boolean>(false)

    const disasterNameState = computed(
      () => disasterForm.name.length > 0 && disasterForm.name.length <= 20
    )
    const invalidDisasterName = computed(() => {
      if (disasterForm.name.length > 20) {
        return '災害名は20文字以内です。'
      }
      return '災害名は入力必須です。'
    })
    
    const occurredDateState = computed(() => disasterForm.occurredDate !== '')
    const invalidOccurredDate = '発災日は入力必須です。'
    
    const typesState = computed(
      () => disasterForm.types.length !== 0 && !(disasterForm.types.length === 1 && disasterForm.types[0] === 'ground')
    )
    const invalidTypesState = computed(() => {
      if (disasterForm.types[0] === 'ground') {
        return '地盤のみの選択は出来ません。他の調査票も含めてチェックしてください。'
      }
      return '調査票の種類は1つ以上選択してください。'
    })
    
    const recommendedState = computed(() => disasterForm.recommended !== '')
    const invalidRecommended = '推奨調査票は入力必須です。'
    
    const isShowModal = ref<boolean>(false)
    const titleResultTriedSave = ref<string>('')
    const bodyResultTriedSave = ref<string>('')

    const trySave = () => {
      isTringToSave.value = true
      if (disasterNameState.value && occurredDateState.value && typesState.value && recommendedState.value) {
        titleResultTriedSave.value = '保存完了'
        bodyResultTriedSave.value = `${disasterForm.name}を保存しました。`
      } else {
        titleResultTriedSave.value = '入力エラー'
        bodyResultTriedSave.value = '閉じるボタンを押してエラー内容を確認してください。'
      }
      isShowModal.value = true
    }
    
    watch(disasterForm, () => {
      isTringToSave.value = false
    })

    return {
      disasterForm,
      disastersOptions,
      isTringToSave,
      disasterNameState,
      invalidDisasterName,
      occurredDateState,
      invalidOccurredDate,
      recommendedState,
      invalidRecommended,
      typesState,
      invalidTypesState,
      titleResultTriedSave,
      bodyResultTriedSave,
      trySave,
      isShowModal
    }
  }
})
</script>
