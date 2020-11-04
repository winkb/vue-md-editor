import { useClickButtonCommand } from 'MkEditor/use/useEvent';
import { defineComponent } from "vue";

const FontRedoComponent = defineComponent({
    setup() {
        const useClickEvent = useClickButtonCommand("undo")

        const onClick = () => {
            useClickEvent({
                callback(ed) {
                    ed.execRedo()
                }
            })
        }

        return () => <button onClick={() => onClick()} class="button iconfont icon-cancel"></button>
    }
});

export default FontRedoComponent