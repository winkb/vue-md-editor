import { defineComponent, onMounted, ref, watch, watchEffect } from "vue";
import { useAdornTextCommand, useCodeMirror } from './use/useEditor';

function getEditorId() {
    return (new Date()).getTime() + "" + Math.random()
}

const EditorComponent: any = defineComponent({
    props: [
        "content",
    ],
    setup(props, { emit }) {
        const editorId = getEditorId()
        let content = ref(props.content ? props.content : "")
        let codeMirrorInstance: any

        onMounted(() => {
            codeMirrorInstance = useCodeMirror(editorId, content)
        })

        watch(content, () => {
            emit("change", content.value)
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