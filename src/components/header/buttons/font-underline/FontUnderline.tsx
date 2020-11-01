import { defineComponent } from "vue";
import { useClickButtonCommand } from '../../../use/useClickCommand';

const FontUnderlineComponent = defineComponent({

    setup() {
        const useClickEvent = useClickButtonCommand("underline")
        const onClick = () => {
            useClickEvent({
                callback(ed) {
                    var replaced = "<u></u>"

                    //1 在光标之前插入标识 
                    ed.insertContent(replaced)

                    //2 将光标移入标识中心
                    ed.moveCursorRelative(Math.floor(replaced.length / 2))
                }
            })
        }

        return () => (
            <button onClick={() => onClick()} class=" button iconfont icon-xiahuaxian"></button>
        )
    }
});

export default FontUnderlineComponent 