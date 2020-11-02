import CodeMirror from "codemirror/lib/codemirror"
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/markdown/markdown'
import { Ref } from "vue";
import CodeMirrorFacade from '../utils/code-mirror';

// 加粗，code，标题等等命令
export function useAdornTextCommand(cm: any, command: EditorHeaderBtnCommand) {
    /* ---- 情况1. 没有选中文本 ***/

    //1. 获取光标位置 
    //2. 检查光标前后字符串
    //3. 计算替换的起始位置和结束位置

    console.log("添加语法修饰片段", command.name)

    let cmFaced = new CodeMirrorFacade(cm)

    //3. 替换文本，交给自定义的扩展组件完成
    command.callback(cmFaced, command)
    cm.focus()

    /* ---- 情况2. 选中文本  ***/
}

export function useIsPasteImageFromDisk(e: any): Boolean {
    if (!e.clipboardData.items.length) {
        return false
    }

    let item = e.clipboardData.items[0]

    return e.clipboardData.files.length && item.kind == "string"
}

//获取编辑器粘贴的图片对象
export function usePasteImage(e: any): undefined | Blob {
    if (!e || !e.clipboardData) {
        return
    }

    let clipborardObj = e.clipboardData

    if (clipborardObj.files && clipborardObj.files.length) {
        return clipborardObj.files[0]
    }

    if (!clipborardObj.items || !clipborardObj.items.length) {
        return
    }

    let item = e.clipborardObj.items[0]

    if (!(/^image\//i).test(item.type)) {
        return
    }

    return item.getAsFile()
}

export function usePasteImageInsertToEditor(ed: CodeMirrorAdapter, title: string, link: string) {
    title = title ? title : link.substring(0, 6)
    var replaced = `![${title}](${link})`

    //1 在光标之前插入标识 
    ed.insertContent(replaced)

    //2 将光标移入标识中心
    ed.moveCursorRelative(replaced.length)
}

export function useCodeMirror(editorId: string, content: Ref, events?: { [key: string]: Function }) {
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
                        cm.indentLine(cm.getCursor().line, "add");  // 整行缩进
                    }
                }
            }
        });

    myCodeMirror.setSize('auto', '100%');

    if (events) {
        Object.keys(events).forEach(name => {
            myCodeMirror.on(name,
                (...args: any[]) => {
                    args.unshift(new CodeMirrorFacade(args.shift()))
                    events[name].apply(null, args)
                })
        })
    }

    return myCodeMirror
}