import { useClickButtonCommand } from '@/components/use/useEvent';
import { defineComponent } from "vue";

const FontSmallBlockComponent = defineComponent({
    setup() {

        const useClickEvent = useClickButtonCommand("smallBlock")

        const onClick = () => {
            useClickEvent({
                callback(ed) {
                    var replaced = "`块`"

                    //-前面字符如果是'`' 就追加一个`空格`
                    if (ed.leftWordsIs("`")) {
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
            <button onClick={() => onClick()} class=" button iconfont icon-yinyong"></button>
        )
    }
});

export default FontSmallBlockComponent 