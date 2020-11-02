import { defineComponent, provide, ref } from 'vue'
import EditorComponent from './Editor'
import EditorHeaderComponent from './header/Header'
import PreviewComponent from './Preview'
import "./editor.scss"
import { usePasteImage, usePasteImageInsertToEditor } from './use/useEditor'
import { useProvideCenterHandles } from './use/useClickCommand'


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
        const centerHandles: EditorCenterHandles = {
            upload(fileBlob) {
                return new Promise(r => {
                    r({ path: "https://pic1.zhimg.com/80/v2-2655b868e875f5c76de3e7e4fae118c6_1440w.jpg?source=1940ef5c" })
                })
            }
        }
        //提供一些基础方法给(子组件/扩展组件)使用
        useProvideCenterHandles(centerHandles)

        //提供给header按钮组件点击
        provide("clickButton", (cmd: EditorHeaderBtnCommand) => {
            //editor需要知道命令名称和命令的数据
            editorRef.value.onAdornText(cmd)
        })

        //提供给编辑器的监听事件
        provide("event", {
            paste: (cm: CodeMirrorAdapter, e: any) => {
                let fileBlob = usePasteImage(e)
                fileBlob && handlePasteUpload(cm, fileBlob)
            }
        })

        //图片上传处理
        const handlePasteUpload = async (cm: CodeMirrorAdapter, fileBlob: Blob) => {
            let { path } = await centerHandles.upload(fileBlob)
            usePasteImageInsertToEditor(cm, "图片", path)
        }

        //监听内容变化，发送给预览组件
        const onMarkdownChange = (newContent: string) => {
            if (typeof newContent == "string") htmlContent.value = newContent
        }

        return {
            htmlContent, markdownContent, onMarkdownChange, editorRef
        }
    },
    render() {

        return (
            <div class="w-full h-full p-3 markdown-editor">
                <div class=" bg-white w-full h-full flex border flex-col shadow p-0 rounded ">
                    {/* top */}
                    <div class="md:h-16 w-full border-b">
                        <EditorHeaderComponent />
                    </div>
                    {/* body */}
                    <div class=" w-full flex flex-1 justify-center h-64 ">
                        {/* left */}
                        <div class=" text-black w-1/2 overflow-x-hidden break-words break-all">
                            <EditorComponent ref="editorRef" onChange={this.onMarkdownChange} content={this.markdownContent} />
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