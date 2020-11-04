import { useClickButtonCommand } from 'MkEditor/use/useEvent';
import { defineComponent } from "vue";

const FontTackComponent = defineComponent({
    setup() {
        const useClickEvent = useClickButtonCommand("tack")
        const onClick = () => {
            useClickEvent({
                callback: (ed) => {
                    var replaced = "<mark>标</mark>"

                    //1 在光标之前插入标识 
                    ed.insertContent(replaced)

                    //2 将光标移入标识中心
                    ed.moveCursorRelative(replaced.length - 7)
                }
            })
        }
        return () => (
            <button onClick={() => onClick()} class=" button iconfont icon-biaoji"></button>
        )
    }
});

export default FontTackComponent 