import { computed, defineComponent, inject, reactive } from 'vue'

const FontLinkFormComponent = defineComponent({
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

        const onSubmit = () => {
            if (!form.link) {
                return
            }

            handleSubmit(form)
        }

        const linkClass = computed(() => {
            return "mb-4 rounded " + ((form.link) ? "" : "border border-red-200")
        })

        return () => (
            <form class="bg-white w-full  rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <input v-model={form.title} class=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " type="text" placeholder="输入描述" />
                </div>
                <div class={linkClass.value}>
                    <input v-model={form.link} class=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " type="text" placeholder="输入链接" />
                </div>
                <div class="flex mt-2 items-center justify-between">
                    <button onClick={onCancel} class=" bg-white hover:bg-gray-100 border text-gray-800 font-bold py-2 px-6 rounded focus:outline-none" type="button"> 取消</button>
                    <button onClick={onSubmit} class=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded focus:outline-none" type="button">确定</button>
                </div>
            </form>
        )
    }
})
export default FontLinkFormComponent