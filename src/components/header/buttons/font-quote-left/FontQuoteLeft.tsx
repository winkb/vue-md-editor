import { useClickButtonCommand } from '@/components/use/useClickCommand';
import { defineComponent } from "vue";

const FontQuoteLeftComponent = defineComponent({

    setup() {

        const useClickEvent = useClickButtonCommand("quoteLeft")

        const onClick = () => {
            useClickEvent({
                callback(ed) {
                    var curLineChars = ed.getLineString()
                    var desc = curLineChars.length == 0 ? "段落引用" : ""

                    //1 已存在，清空掉
                    var mch = curLineChars.match(/^>\s?/)
                    if (mch) {
                        ed.lineStartRemove(mch[0].length)
                        return
                    }

                    //2 光标位置不是0，移动到行首
                    ed.execGoLineStart()

                    //3 光标后面无字符加上默认`标题index`字符
                    ed.insertContent("> " + desc)

                    //4 光标移动到行尾
                    ed.execGoLineEnd()
                }
            })
        }

        return () => (
            <button onClick={() => onClick()} class=" button iconfont icon-duanla"></button>
        )
    }
});

export default FontQuoteLeftComponent 