import { computed, defineComponent } from "vue";

const EditorLayoutBtnCompoent = defineComponent({
    props: [
        "lianDong",
        "fenPing",
        "changeEvent"
    ],
    setup(props) {

        let lianDongClass = computed(() => {
            return "button iconfont icon-ziyuan " + (props.lianDong ? "text-green-500" : "")
        })

        let fenPingClass = computed(() => {
            return "button iconfont icon-fenping " + (props.fenPing ? "text-green-500" : "")
        })

        const emitChangeEvent = (name: string) => {
            props.changeEvent(name)
        }

        const onClickLianDong = () => {
            emitChangeEvent("lianDong")
        }

        const onClickFenPing = () => {
            emitChangeEvent("fenPing")
        }

        return () => (
            <div class="header flex flex-wrap items-center h-full w-full">
                <button onClick={onClickLianDong} class={lianDongClass.value}></button>
                <button onClick={onClickFenPing} class={fenPingClass.value}></button>
            </div>
        )
    }
})

export default EditorLayoutBtnCompoent
