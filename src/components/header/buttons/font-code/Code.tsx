import { defineComponent } from "vue";
import { useClickButtonCommand } from '../../../use/useEvent';

const FontCodeComponent = defineComponent({
    setup() {
        const useClickEvent = useClickButtonCommand("code")
        const onClickButton = () => {
            useClickEvent({
                callback: (editor) => {
                    //- 本行有文字 移动到下一行
                    if (editor.isCurLineHasWord()) {
                        editor.addEmptyLine()
                    }

                    //1 插入代码块标识
                    editor.insertContent("```\n\n" + "```")
                    //2 光标下移一行
                    editor.moveCursorRelative(0, 1)
                }
            })
        }

        return () => <button onClick={onClickButton} class="button iconfont icon-daima"></button>
    }
});

export default FontCodeComponent