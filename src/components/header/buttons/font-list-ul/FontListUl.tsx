import { useClickButtonCommand } from '@/components/use/useClickCommand';
import { defineComponent } from "vue";

const FontListUlComponent = defineComponent({

    setup() {
        const useClickEvent = useClickButtonCommand("listUl")
        const onClick = () => {
            useClickEvent({
                callback: (ed) => {
                    var curLineChars = ed.getLineString()

                    //1 已存在，清空掉
                    var mch = curLineChars.match(/^- /)
                    if (mch) {
                        ed.lineStartRemove(mch[0].length)
                        return
                    }

                    //2 在光标之前插入标识 
                    ed.insertAtLineStart("- ")

                    //3 光标移动到行尾
                    ed.execGoLineEnd()
                }
            })
        }

        return () => (
            <button onClick={() => onClick()} class=" button iconfont icon-wuxuliebiao"></button>
        )
    }
});

export default FontListUlComponent 