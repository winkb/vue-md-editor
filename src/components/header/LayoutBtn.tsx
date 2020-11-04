import { computed, defineComponent } from "vue";

const EditorLayoutBtnCompoent = defineComponent({
    props: [
        "lianDong",
        "thisScreen",
        "changeEvent",
        "quanPing"
    ],
    setup(props) {

        let lianDongClass = computed(() => {
            return (props.lianDong ? "text-green-500" : "")
        })

        let fenPingClass = computed(() => {
            return (props.thisScreen == 2) ? "text-green-500" : ""
        })

        let isPreviewClass = computed(() => {
            return (props.thisScreen == 3 ? "text-green-500" : "")
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

        const onClickQuanPing = () => {
            emitChangeEvent("quanPing")
        }

        return () => (
            <div class="header flex flex-wrap items-center h-full w-full">
                <button title="联动" onClick={onClickLianDong} class={"button iconfont icon-ziyuan " + lianDongClass.value}></button>
                <button title="分屏" onClick={onClickFenPing} class={"button iconfont icon-fenping " + fenPingClass.value}></button>
                <button title="预览" onClick={onClickIsPreview} class={"button iconfont icon-yulan " + isPreviewClass.value}></button>
                <button title="全屏" onClick={onClickQuanPing} class="button iconfont icon-quanping"></button>
            </div>
        )
    }
})

export default EditorLayoutBtnCompoent
