import { useClickButtonCommand } from '@/components/use/useClickCommand';
import { defineComponent } from "vue";

const FontSuperscriptComponent = defineComponent({

    setup() {
        const useClickEvent = useClickButtonCommand("superscript")
        const onClick = () => {
            useClickEvent({
                callback: (ed) => {
                    var replaced = "<sup>角</sup>"

                    //1 在光标之前插入标识 
                    ed.insertContent(replaced)

                    //2 将光标移入标识中心
                    ed.moveCursorRelative(replaced.length - 6)
                }
            })
        }
        return () => (
            <button onClick={() => onClick()} class=" button iconfont icon-shangjiaobiao"></button>
        )
    }
});

export default FontSuperscriptComponent 