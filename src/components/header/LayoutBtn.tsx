import { computed, defineComponent } from "vue";

const EditorLayoutBtnCompoent = defineComponent({
    props: [
        "lianDong",
        "thisScreen",
        "changeEvent",
    ],
    setup(props) {

        let lianDongClass = computed(() => {
            return "button iconfont icon-ziyuan " + (props.lianDong ? "text-green-500" : "")
        })

        let fenPingClass = computed(() => {
            return "button iconfont icon-fenping " + ((props.thisScreen == 2) ? "text-green-500" : "")
        })

        let isPreviewClass = computed(() => {
            return "button iconfont icon-yulan " + (props.thisScreen == 3 ? "text-green-500" : "")
        })

        const emitChangeEvent = (name: string, v?: number) => {
            props.changeEvent(name, v)
        }

        const onClickLianDong = () => {
            emitChangeEvent("lianDong")
        }

        const onClickFenPing = () => {
            emitChangeEvent("thisScreen", props.thisScreen == 2 ? 1 : 2)
        }

        const onClickIsPreview = () => {
            emitChangeEvent("thisScreen", props.thisScreen == 3 ? (-1) : 3)
        }

        return () => (
            <div class="header flex flex-wrap items-center h-full w-full">
                <button onClick={onClickLianDong} class={lianDongClass.value}></button>
                <button onClick={onClickFenPing} class={fenPingClass.value}></button>
                <button onClick={onClickIsPreview} class={isPreviewClass.value}></button>
            </div>
        )
    }
})

export default EditorLayoutBtnCompoent
