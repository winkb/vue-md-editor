import { useClickButtonCommand } from '@/components/use/useEvent';
import { defineComponent } from "vue";

const FontTableComponent = defineComponent({
    setup() {

        const useClickEvent = useClickButtonCommand("table")
        const onClick = () => {
            useClickEvent({
                callback: (ed) => {
                    var h = "|column1|column2|column3|"
                    var border = "|-|-|-|"
                    var body = "|1|2|3|"

                    //- 如果当前行有内容， 另起一行
                    if (ed.isCurLineHasWord()) {
                        ed.addEmptyLine(2)
                    }

                    //1 在光标之前插入标识 
                    ed.insertContent([h, border, body].join("\n"))

                    //2 将光标移动到内容区域
                    ed.moveCursorRelative(2, 2)
                }
            })
        }

        return () => (
            <button onClick={() => onClick()} class=" button iconfont icon-biaoge"></button>
        )
    }
});

export default FontTableComponent