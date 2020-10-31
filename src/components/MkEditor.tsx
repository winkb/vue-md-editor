import { defineComponent, provide, reactive, ref } from 'vue'
import EditorComponent from './Editor'
import EditorHeaderComponent from './header/Header'
import PreviewComponent from './Preview'
import "./editor.scss"


function getMarkdownDefaultContent() {
    return `
\`\`\`javascript
let a = 1
\`\`\`
\`\`\`php
$a = 1
\`\`\`
\`\`\`javascript
let a = 1
\`\`\`
    `
}

const MkEditorComponent = defineComponent({
    setup() {
        let markdownContent = getMarkdownDefaultContent()
        let htmlContent = ref(markdownContent)
        let adornCommand = reactive({
            name: "",
            data: {}
        })

        function onMarkdownChange(newContent: string) {
            htmlContent.value = newContent
        }

        //提供给header按钮组件点击
        provide("clickButton", (name: string, data: any) => {
            //editor需要知道命令名称和命令的数据
            adornCommand.name = name
            adornCommand.data = data
        })

        return {
            htmlContent, markdownContent, onMarkdownChange, adornCommand
        }
    },
    render() {

        return (
            <div class="w-full h-full p-3 markdown-editor">
                <div class=" bg-white w-full h-full flex border flex-col shadow p-0 rounded ">
                    {/* top */}
                    <div class="h-16 w-full border-b">
                        <EditorHeaderComponent />
                    </div>
                    {/* body */}
                    <div class=" w-full flex flex-1 justify-center h-64 ">
                        {/* left */}
                        <div class=" text-black w-1/2 overflow-x-hidden break-words break-all">
                            <EditorComponent command={this.adornCommand} onChange={this.onMarkdownChange} content={this.markdownContent} />
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