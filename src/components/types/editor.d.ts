interface EditorBtnCommandCaller {
    (editor: CodeMirrorAdapter, command: EditorHeaderBtnCommand)
}

interface EditorHeaderBtnCommand {
    name?: stirng
    data?: any
    callback: EditorBtnCommandCaller
}

//文件上传处理函数
type EditorCenterHandles = {
    upload: EditorUploadHandleInterface
    clickButton: (cmd: EditorHeaderBtnCommand)
}

//文件上传处理函数
interface EditorUploadHandleInterface {
    (fileBlob: Blob): Promise<{ path: string }>
}

interface CodeMirrorAdapter {
    //获取内容
    getValue(): string
    //获取滚动条坐标
    getScollXY(): { x: number, y: number, w: number, h: number }
    //当前行是否有内容
    isCurLineHasWord(): boolean
    //判断光标`左边的字符串
    leftWordsIs(word: string)
    //判断光标`右边的字符串
    rightWordsIs(word: string)
    //从行首位置开始删除字符
    lineStartRemove(len: number)
    //获取光标整行字符串
    getLineString()
    //增加一个空行，并且光标移动到空行起始位
    addEmptyLine(num: number = 1)
    //在光标当前位置插入内容
    insertContent(content: string)
    //在行首插入内容
    insertAtLineStart(content: string)
    //设置光标的新位置,如果line为null，选取光标当前行
    setCursor(charIndex: number, line: number = 0)
    //以当前位置为参考点，移动光标的相对位置
    moveCursorRelative(charStep: number, lineStep: number = 0)
    //光标移动到行尾
    execGoLineEnd()
    //光标移动到行首
    execGoLineStart()
    //撤销
    execUndo()
    //反撤销
    execRedo()
}