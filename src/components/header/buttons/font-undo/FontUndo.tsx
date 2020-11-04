import { useClickButtonCommand } from 'MkEditor/use/useEvent';
import { defineComponent } from "vue";

const FontUndoComponent = defineComponent({
    setup() {
        const useClickEvent = useClickButtonCommand("undo")

        const onClick = () => {
            useClickEvent({
                callback(ed) {
                    ed.execUndo()
                }
            })
        }

        return () => <button onClick={() => onClick()} class="button iconfont icon-chexiao"></button>
    }
});

export default FontUndoComponent