import CodeMirror from "codemirror/lib/codemirror"
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/markdown/markdown'
import { Ref } from "vue";

// 加粗，code，标题等等命令
export function adornTextCommand(myCodeMirror: any, command: { name: string, data: any }) {
    /* ---- 情况1. 没有选中文本 ***/

    //1. 获取光标位置 

    //2. 检查光标前后字符串

    //3. 计算替换的起始位置和结束位置

    //3. 替换文本

    /* ---- 情况2. 选中文本  ***/
}

export function useCodeMirror(editorId: string, content: Ref) {
    const myCodeMirror = CodeMirror(
        document.getElementById(editorId),
        {
            mode: {
                name: "markdown",
            },
            lineNumbers: true,
            matchBrackets: true,
            indentUnit: 0,
            lineWrapping: "wrap",//在长行时文字是换行(wrap)还是滚动(scroll)，默认为滚动(scroll)。
            tabSize: 2,
            value: content.value,
            theme: "monokai",
            extraKeys: {
                Tab: (cm: any) => {
                    if (cm.somethingSelected()) {      // 存在文本选择
                        cm.indentSelection('add');    // 正向缩进文本
                    } else {                    // 无文本选择  
                        cm.indentLine(cm.getCursor().line, "add");  // 整行缩进 不符合预期
                        // cm.replaceSelection(Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");  // 光标处插入 indentUnit 个空格
                    }
                }
            }
        });

    myCodeMirror.setSize('auto', '100%');

    myCodeMirror.on("change", function (cm: any) {
        content.value = cm.getValue()
    })

    return myCodeMirror
}