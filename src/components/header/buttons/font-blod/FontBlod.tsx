import { defineComponent } from "vue";
import { useClickButtonCommand } from '../../../use/useClickCommand';

const FontBlodComponent = defineComponent({

    setup() {

        const useClickEvent = useClickButtonCommand("blod")
        const onClick = () => {
            useClickEvent({
                callback: (editor) => {
                    var replaced = "****"

                    //-前面字符如果是`*` 就追加一个`空格`
                    if (editor.leftWordsIs("*")) {
                        replaced = " " + replaced
                    }

                    //1 在光标之前插入标识 
                    editor.insertContent(replaced)

                    //2 将光标移入标识中心
                    editor.moveCursorRelative(Math.ceil(replaced.length / 2))
                }
            })
        }

        return () => (
            <div>
                <button onClick={() => onClick()} class="button iconfont icon-jiacu"></button>
            </div>
        )
    }
});


export default FontBlodComponent
