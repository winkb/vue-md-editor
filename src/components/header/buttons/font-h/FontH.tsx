
import { defineComponent } from "vue";
import { useClickButtonCommand } from '../../../use/useClickCommand';

const FontHComponent = defineComponent({
    setup() {

        const useClickEvent = useClickButtonCommand("h")

        const onClickH = (n: number) => {
            useClickEvent({
                callback(ed) {
                    var curLineChars = ed.getLineString()
                    var headerDesc = ""

                    //1 已存在H标题，清空掉H标题
                    var mch = curLineChars.match(/^#+\s/)
                    if (mch) {
                        ed.lineStartRemove(mch[0].length)
                    }

                    //- 0表示清空h标题
                    if (n == 0) {
                        return
                    }

                    //2 光标位置不是0，移动到行首
                    ed.execGoLineStart()

                    //- 当前行没有字符，添加默认标题
                    if (curLineChars == "") {
                        headerDesc = "标题" + n
                    }

                    //3 光标后面无字符加上默认`标题index`字符
                    ed.insertContent("#".repeat(n) + " " + headerDesc)

                    //4 光标移动到行尾
                    ed.execGoLineEnd()
                }
            })
        }

        return () => (
            <div class="relative hover-hidden-open">
                <button class="button iconfont icon-biaoti"></button>
                <div class=" hidden absolute z-10 bg-white  w-24 rounded border shadow-lg">
                    <span onClick={() => onClickH(0)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        无标题
                    </span>
                    <span onClick={() => onClickH(1)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H1
                    </span>
                    <span onClick={() => onClickH(2)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H2
                    </span>
                    <span onClick={() => onClickH(3)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H3
                    </span>
                    <span onClick={() => onClickH(4)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H4
                    </span>
                    <span onClick={() => onClickH(5)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H5
                    </span>
                    <span onClick={() => onClickH(6)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H6
                    </span>
                </div>
            </div>
        )
    }
});


export default FontHComponent
