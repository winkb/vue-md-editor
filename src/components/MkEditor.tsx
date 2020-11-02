import { defineComponent, provide, reactive, ref } from 'vue'
import EditorComponent from './Editor'
import EditorHeaderComponent from './header/Header'
import PreviewComponent from './Preview'
import "./editor.scss"
import { useIsPasteImageFromDisk, usePasteImage, usePasteImageInsertToEditor } from './use/useEditor'
import { useProvideCenterHandles } from './use/useClickCommand'
import { toRefValue } from './utils/convert'
import EditorLoadingComponent from './Loading'


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
        let editorRef: any = ref(null)
        let state = reactive({
            isLoading: false
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

        return {
            htmlContent, markdownContent, editorRef, state
        }
    },
    render() {
        let loadingHtml = this.state.isLoading ? (<EditorLoadingComponent />) : ("");

        return (
            <div class="w-full h-full p-3 markdown-editor">
                <div class=" bg-white relative w-full h-full flex border flex-col shadow p-0 rounded ">
                    {/* progress遮罩 */}
                    {loadingHtml}
                    {/* top */}
                    <div class="md:h-16 w-full border-b">
                        <EditorHeaderComponent />
                    </div>
                    {/* body */}
                    <div class="w-full flex flex-1 justify-center h-64 ">
                        {/* left */}
                        <div class=" text-black w-1/2 overflow-x-hidden break-words break-all">
                            <EditorComponent ref="editorRef" content={this.markdownContent} />
                        </div>
                        {/* right */}
                        <div class="  text-black w-1/2 border-l border-gray-300 h-full overflow-y-scroll">
                            <PreviewComponent content={this.htmlContent} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
})



export default MkEditorComponent