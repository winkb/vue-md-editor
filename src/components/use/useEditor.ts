import CodeMirror from "codemirror/lib/codemirror"
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/markdown/markdown'
import { Ref } from "vue";

// 加粗，code，标题等等命令
export function useAdornTextCommand(cm: any, command: { name: string, data: any }) {
    /* ---- 情况1. 没有选中文本 ***/

    //1. 获取光标位置 
    let cursor = cm.getCursor()
    let [cursorLine, cursorCharIndex] = [cursor.line, cursor.ch]

    //2. 检查光标前后字符串

    //3. 计算替换的起始位置和结束位置

    console.log("添加语法修饰片段", command.name)

    let newCursorLine = cursorLine

    //3. 替换文本
    switch (command.name) {
        case "code":
            var curLineChars = cm.getLine(cursorLine)

            //- 本行有文字 移动到下一行
            if (curLineChars.length > 0) {
                cm.replaceSelection("\n")
                newCursorLine++
            }

            newCursorLine++
            cm.replaceSelection("```\n\n" + "```")

            cm.setCursor({ line: newCursorLine, ch: 0 })

            break;
        case "h":
            var curLineChars = cm.getLine(cursorLine)
            var headerDesc = ""

            //1 已存在H标题，清空掉H标题
            var mch = curLineChars.match(/#+\s/)
            if (mch) {
                cm.replaceRange("", { line: cursorLine, ch: 0 }, { line: cursorLine, ch: mch[0].length })
            }

            //- 0表示清空h标题
            if (command.data == "0") {
                break;
            }

            //2 光标位置不是0，移动到行首
            if (cursorCharIndex > 0) {
                cm.execCommand("goLineStart")
            }

            //- 当前行没有字符，添加默认标题
            if (curLineChars == "") {
                headerDesc = "标题" + command.data
            }

            //3 光标后面无字符加上默认`标题index`字符
            cm.replaceSelection("#".repeat(command.data) + " " + headerDesc)

            //4 光标移动到行尾
            cm.execCommand("goLineEnd")

            break;
    }

    cm.focus()

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