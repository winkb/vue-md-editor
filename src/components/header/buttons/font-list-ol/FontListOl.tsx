import { useClickButtonCommand } from 'MkEditor/use/useEvent';
import { defineComponent } from "vue";

const FontListOlComponent = defineComponent({
    setup() {
        const useClickEvent = useClickButtonCommand("listOl")
        const onClick = () => {
            useClickEvent({
                callback: (ed) => {
                    var curLineChars = ed.getLineString()

                    //1 已存在，清空掉
                    var mch = curLineChars.match(/^1. /)
                    if (mch) {
                        ed.lineStartRemove(mch[0].length)
                        return
                    }

                    //2 在光标之前插入标识 
                    ed.insertAtLineStart("1. ")

                    //3 光标移动到行尾
                    ed.execGoLineEnd()
                }
            })
        }

        return () => (
            <button onClick={() => onClick()} class=" button iconfont icon-youxuliebiao"></button>
        )
    }
});

export default FontListOlComponent 