import { useClickButtonCommand } from '@/components/use/useClickCommand';
import { defineComponent } from "vue";

const FontSubscriptComponent = defineComponent({

    setup() {
        const useClickEvent = useClickButtonCommand("subscript")
        const onClick = () => {
            useClickEvent({
                callback: (ed) => {
                    var replaced = "<sub>角</sub>"

                    //1 在光标之前插入标识 
                    ed.insertContent(replaced)

                    //2 将光标移入标识中心
                    ed.moveCursorRelative(replaced.length - 6)
                }
            })
        }
        return () => (
            <button onClick={() => { onClick() }} class=" button iconfont icon-xiajiaobiao"></button>
        )
    }
});

export default FontSubscriptComponent 