import { defineComponent, provide, reactive, ref } from 'vue'
import EditorComponent from './Editor'
import EditorHeaderComponent from './header/Header'
import PreviewComponent from './Preview'
import "./editor.scss"
import { useIsPasteImageFromDisk, usePasteImage, usePasteImageInsertToEditor } from './use/useEditor'
import { useProvideCenterHandles } from './use/useClickCommand'
import { toRefValue } from './utils/convert'
import EditorLoadingComponent from './Loading'
import EditorLayoutBtnCompoent from './header/LayoutBtn'

type LayoutEventName = "fenPing" | "lianDong"


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
        let markdownContent = ref(props.content)
        let htmlContent = ref(markdownContent)
        let editorRef = ref("")
        let previewBoxRef = ref("")
        let state = reactive({
            isLoading: false,
            lianDong: true,
            fenPing: true,
            scollY: 0,
        })

        //接收父组件配置的上传服务器的方法
        let uploadApi = props.config?.upload || (() => new Promise(r => r(console.error("上传文件:没有处理函数"))))

        const centerHandles: EditorCenterHandles = {
            upload: async (fileBlob) => {//上传都会先走这里
                state.isLoading = true
                return uploadApi(fileBlob).finally(() => {
                    state.isLoading = false
                })
            },
            clickButton(cmd) {//提供给header按钮组件点击
                //editor需要知道命令名称和命令的数据
                toRefValue(editorRef).onAdornText(cmd)
            }
        }
        //提供一些基础方法给(子组件/扩展组件)使用
        useProvideCenterHandles(centerHandles)

        //提供给编辑器的监听事件
        provide("event", {
            change: (cm: CodeMirrorAdapter) => {
                onMarkdownChange(cm.getValue())
            },
            paste: (cm: CodeMirrorAdapter, e: any, b: any) => {
                let fileBlob = usePasteImage(e)
                if (!fileBlob) return

                //- 从磁盘上复制的文件要回退，因为ed默认插入了文件名，而我们不需要
                useIsPasteImageFromDisk(e) && setTimeout(() => cm.execUndo(), 2)

                handlePasteUpload(cm, fileBlob)
            },
            scroll(cm: CodeMirrorAdapter) {//监听滚动条
                let { y } = cm.getScollXY()
                let pDom = toRefValue(previewBoxRef)
                //存储Editor滚动条Top值
                state.scollY = y

                if (state.lianDong) pDom.scrollTop = y
            }
        })

        //图片上传处理
        const handlePasteUpload = async (cm: CodeMirrorAdapter, fileBlob: Blob) => {
            let { path } = await centerHandles.upload(fileBlob)
            usePasteImageInsertToEditor(cm, "图片", path)
        }

        //监听内容变化，发送给预览组件
        const onMarkdownChange = (newContent: string) => {
            if (typeof newContent != "string") return;

            htmlContent.value = newContent
        }

        //监听布局按钮的点击事件
        const onLayoutChange = (name: LayoutEventName) => {
            state[name] = !state[name]

            //取消分屏，联动自动取消
            state.fenPing || (state.lianDong = false)
            //设置预览滚动条Top值
            state.lianDong && (toRefValue(previewBoxRef).scrollTop = state.scollY)
        }

        return {
            htmlContent, markdownContent, editorRef, state, onLayoutChange, previewBoxRef
        }
    },
    render() {
        const loadingHtml = this.state.isLoading ? (<EditorLoadingComponent />) : ("");
        const previewBoxClass = this.state.fenPing ? "w-1/2" : "hidden"
        const layoutHtml = (
            <EditorLayoutBtnCompoent changeEvent={this.onLayoutChange} fenPing={this.state.fenPing} lianDong={this.state.lianDong} />
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
                    <div class="w-full flex flex-1 justify-center h-64 ">
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