import { computed, defineComponent, inject, reactive } from 'vue'

const FontImageFormComponent = defineComponent({
    setup() {

        const form = reactive({
            title: "",
            link: ""
        })

        const handleCancle: any = inject('onCancel')
        const handleSubmit: any = inject('onSubmit')

        const onCancel = () => {
            handleCancle()
        }

        const tipMsg = computed(() => {
            return form.link ? "正确" : "请输入图片链接"
        })

        const onSubmit = () => {
            if (!form.link) {
                return
            }

            handleSubmit(form)
        }

        return () => (
            <form class="bg-white w-full  rounded px-8 pt-2 pb-8 mb-4">
                <p class=" mb-3 italic flex text-green-700 items-center justify-center">
                    {tipMsg.value}
                </p>
                <div class="mb-4">
                    <input v-model={form.link} class=" appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " type="text" placeholder="输入图片链接" />
                </div>
                <div class="flex mt-2 items-center justify-between">
                    <button onClick={onCancel} class=" rounded-sm bg-white hover:bg-gray-100 border text-gray-800 font-bold py-2 px-5 focus:outline-none" type="button"> 取消</button>
                    <button onClick={onSubmit} class=" rounded-sm bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-5  focus:outline-none" type="button">确定</button>
                </div>
            </form>
        )
    }
})

export default FontImageFormComponent