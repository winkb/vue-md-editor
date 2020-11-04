import { useClickButtonCommand } from 'MkEditor/use/useEvent';
import { defineComponent } from "vue";

const FontStrikethroughComponent = defineComponent({
    setup() {
        const useClickEvent = useClickButtonCommand("underline")
        const onClick = () => {
            useClickEvent({
                callback(ed) {
                    var replaced = "~~S~~"

                    //-前面字符如果是`~` 就追加一个`空格`
                    if (ed.leftWordsIs("~")) {
                        replaced = " " + replaced
                    }

                    //1 在光标之前插入标识 
                    ed.insertContent(replaced)

                    //2 将光标移入标识中心
                    ed.moveCursorRelative(replaced.length - 2)
                }
            })
        }
        return () => (
            <button onClick={() => { onClick() }} class=" button iconfont icon--loach-strike"></button>
        )
    }
});

export default FontStrikethroughComponent 