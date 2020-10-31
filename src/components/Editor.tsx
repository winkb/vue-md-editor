import { defineComponent, onMounted, ref, watch, watchEffect } from "vue";
import { adornTextCommand, useCodeMirror } from './use/useEditor';

function getEditorId() {
    return (new Date()).getTime() + "" + Math.random()
}

const EditorComponent: any = defineComponent({
    props: [
        "content",
        "command"
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

        watchEffect(() => {
            let { name, data } = props.command
            if (!name) {
                return
            }
            name && codeMirrorInstance && adornTextCommand(codeMirrorInstance, { name, data })
        })

        return {
            editorId
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