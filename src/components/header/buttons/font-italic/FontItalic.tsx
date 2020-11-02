import { defineComponent } from "vue";
import { useClickButtonCommand } from '../../../use/useClickCommand';

const FontItalicComponent = defineComponent({
    setup() {
        const useClickEvent = useClickButtonCommand("italic")
        const onClick = () => {
            useClickEvent({
                callback(ed) {

                    var replaced = "*斜*"
                    //-前面字符如果是*加一个空格
                    if (ed.leftWordsIs("*")) {
                        replaced = " " + replaced
                    }

                    //1 在光标之前插入标识 
                    ed.insertContent(replaced)

                    //2 将光标移入标识中心
                    ed.moveCursorRelative(replaced.length - 1)
                }
            })
        }

        return () => (
            <button onClick={() => onClick()} class=" button iconfont icon-xieti"></button>
        )
    }
});

export default FontItalicComponent