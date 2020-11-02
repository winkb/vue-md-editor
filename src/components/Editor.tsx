import { defineComponent, inject, onMounted, ref, toRef, watch, watchEffect } from "vue";
import { useAdornTextCommand, useCodeMirror } from './use/useEditor';

function getEditorId() {
    return (new Date()).getTime() + "" + Math.random()
}

const EditorComponent: any = defineComponent({
    props: [
        "content",
    ],
    setup(props) {
        const editorId = getEditorId()
        let content = ref(props.content ? props.content : "")
        let codeMirrorInstance: any

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