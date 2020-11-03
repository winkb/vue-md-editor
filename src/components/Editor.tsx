import { defineComponent, inject, onMounted, ref } from "vue";
import { useAdornTextCommand, useCodeMirror } from './use/useEditor';

function getEditorId() {
    return (new Date()).getTime() + "" + Math.random()
}

const EditorComponent = defineComponent({
    props: [
        "content",
    ],
    setup(props) {
        const editorId = getEditorId()
        let content = ref(props.content ? props.content : "")
        let codeMirrorInstance: CodeMirrorAdapter

        onMounted(() => {
            codeMirrorInstance = useCodeMirror(editorId, content, inject("event"))
        })

        const onAdornText = function (cmd: EditorHeaderBtnCommand) {
            cmd.name && useAdornTextCommand(codeMirrorInstance, cmd)
        }

        return {
            editorId, onAdornText
        }
    },
    render() {
        return (
            <>
                <div class=" h-full" id={this.editorId}></div>
            </>
        )
    }
})

export default EditorComponent