import { defineComponent, inject, reactive, ref, watch } from 'vue'
import EditorComponent from './Editor'
import EditorHeaderComponent from './header/Header'
import PreviewComponent from './Preview'
import "./editor.scss"
import { useEditorEventsListener, useProvideCenterHandles } from './use/useEvent'
import { toRefValue } from './utils/convert'
import EditorLoadingComponent from './Loading'
import EditorLayoutBtnCompoent from './header/LayoutBtn'

type LayoutEventName = "thisScreen" | "lianDong"

const MkEditorComponent = defineComponent({
    props: {
        content: {
            type: String, default: `## Markdown\n`
        },
        config: {
            type: Object
        }
    },
    setup(props) {
        let state = reactive({
            isLoading: false,
            lianDong: true,
            thisScreen: 2,//1全屏 2分屏  3预览
            lastScreen: 2,
            scollY: 0
        })
        let editorBox = ref("")
        let editorRef = ref("")
        let previewBoxRef = ref("")
        let htmlContent = ref(props.content)
        let markdownContent = ref(props.content)
        //接收父组件配置的上传服务器的方法
        let uploadApi = props.config?.upload || (() => new Promise(r => r(console.error("上传文件:没有处理函数"))))

        //监听布局按钮的点击事件
        const onLayoutChange = (name: LayoutEventName, v: number) => {
            name == "lianDong" && (state.lianDong = !state.lianDong)
            name == "thisScreen" && (v == -1 ? (state.thisScreen = state.lastScreen) : (state.thisScreen = v))
            name == "thisScreen" && v != 3 && (state.lastScreen = state.thisScreen)

            //取消分屏，自动取消联动
            state.thisScreen != 2 && (state.lianDong = false)
            //设置预览滚动条Top值
            state.lianDong && (toRefValue(previewBoxRef).scrollTop = state.scollY)
        }

        //提供一些基础方法给(子组件/扩展组件)使用
        const { sonComState, centerHandles } = useProvideCenterHandles(uploadApi)

        //注册Editor事件响应处理函数
        const edStatus = useEditorEventsListener(centerHandles)

        const computedScrollTop = (t1: number, h1: number, h2: number, screenHeight: number) => {
            return (h2 - screenHeight) * (t1 / (h1 - screenHeight))
        }

        //观察Progress状态
        watch(() => sonComState.isLoading, () => state.isLoading = sonComState.isLoading)

        //观察Header按钮发出来的指令---触发Editor命令，回调内容修饰函数
        watch(() => sonComState.cmd, () => toRefValue(editorRef).onAdornText(sonComState.cmd))

        //观察Editor内容变化，传递给预览组件
        watch(() => edStatus.newContent, () => htmlContent.value = edStatus.newContent)

        //观察滚动条值变动
        watch(() => edStatus.scollY, () => {
            if (!state.lianDong) return
            let pDom = toRefValue(previewBoxRef)
            let [t, h] = [edStatus.scollY, edStatus.scollH]
            state.scollY = t
            pDom.scrollTop = computedScrollTop(t, h, pDom.scrollHeight, toRefValue(editorBox).clientHeight)
        })

        return {
            htmlContent, markdownContent, editorRef, state, onLayoutChange, previewBoxRef, editorBox
        }
    },
    render() {
        const loadingHtml = this.state.isLoading ? (<EditorLoadingComponent />) : ("");
        const previewBoxClass = this.state.thisScreen == 3 ? ("w-full") : (this.state.thisScreen == 2 ? "w-1/2" : "hidden")
        const layoutHtml = (
            <EditorLayoutBtnCompoent thisScreen={this.state.thisScreen} changeEvent={this.onLayoutChange} lianDong={this.state.lianDong} />
        )

        return (
            <div class="w-full h-full p-3 markdown-editor">
                <div class=" bg-white relative w-full h-full flex border flex-col shadow p-0 rounded ">
                    {/* progress遮罩 */}
                    {loadingHtml}
                    {/* top */}
                    <div class="md:h-16 flex flex-col md:flex-row w-full border-b">
                        {/* 功能性按钮 */}
                        <div class="flex flex-1 md:h-full">
                            <EditorHeaderComponent />
                        </div>
                        {/* 布局配置按钮 */}
                        <div class="md:w-64 md:h-full border-l border-gray-200 overflow-hidden">
                            {layoutHtml}
                        </div>
                    </div>
                    {/* body */}
                    <div class="w-full flex flex-1 justify-center h-64" ref="editorBox">
                        {/* left */}
                        <div class=" text-black flex-1  overflow-x-hidden break-words break-all">
                            <EditorComponent ref="editorRef" content={this.markdownContent} />
                        </div>
                        {/* right */}
                        <div ref="previewBoxRef" class={" text-black  border-l border-gray-300 h-full overflow-y-scroll " + previewBoxClass}>
                            <PreviewComponent content={this.htmlContent} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})



export default MkEditorComponent