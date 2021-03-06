export default class CodeMirrorFacade implements CodeMirrorAdapter {
    cm: any
    status = {
        line: 0,
        index: 0
    }

    constructor(cm: any) {
        this.cm = cm
        let cursor = this.cm.getCursor()
        this.status.line = cursor.line
        this.status.index = cursor.ch
    }

    getValue() {
        return this.cm.getValue()
    }

    isCurLineHasWord() {
        return this.getLineString().length > 0
    }

    getLineString() {
        return this.cm.getLine(this.status.line)
    }

    addEmptyLine(num: number = 1) {
        this.execGoLineEnd()
        this.cm.replaceSelection("\n".repeat(num))
        //修复光标的位置参数
        this.status.index = 0
        this.status.line += num
    }

    insertContent(content: string) {
        this.cm.replaceSelection(content)
    }

    insertAtLineStart(content: string) {
        this.execGoLineStart()
        this.cm.replaceSelection(content)
    }

    setCursor(charIndex: number, line: number = 0) {
        line = (line == 0) ? this.status.line : line

        this.cm.setCursor({ line: line, ch: charIndex })
        this.status.line = line
        this.status.index = charIndex
    }

    moveCursorRelative(charStep: number, lineStep?: number) {
        lineStep = lineStep == null ? 0 : lineStep;
        this.setCursor(this.status.index + charStep, this.status.line + lineStep)
    }

    leftWordsIs(word: string) {
        var curLineChars = this.getLineString()
        return curLineChars.substr(this.status.index - word.length, word.length) == word
    }

    rightWordsIs(word: string) {
        var curLineChars = this.getLineString()
        return curLineChars.substr(this.status.index + 1, this.status.index + 1 + word.length) == word
    }

    getScollXY() {
        let { left, top, width, height } = this.cm.getScrollInfo()
        return { x: left, y: top, w: width, h: height }
    }

    lineStartRemove(len: number) {
        this.cm.replaceRange("",
            { line: this.status.line, ch: 0 },
            { line: this.status.line, ch: len }
        )
    }

    execGoLineEnd() {
        this.cm.execCommand("goLineEnd")
        this.status.index = Math.max(this.getLineString().length - 1, 0)
    }

    execGoLineStart() {
        if (this.status.index == 0) return
        this.cm.execCommand("goLineStart")
        this.status.index = 0
    }

    execUndo() {
        this.cm.execCommand("undo")
    }

    execRedo() {
        this.cm.execCommand("redo")
    }
}
