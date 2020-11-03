import { inject, provide, reactive } from "vue";
import { toAny } from '../utils/convert';
import { useIsPasteImageFromDisk, usePasteImage, usePasteImageInsertToEditor } from './useEditor';

export function useClickButtonCommand(name: string) {
    let clickButtonEvent = useInjectCenterHandles().clickButton

    const clickButton = (cmd: EditorHeaderBtnCommand) => {
        cmd.name = name
        clickButtonEvent(cmd)
    }

    return clickButton
}

/**
 * 此函数会提供一个 `event` 依赖
 */
export function useEditorEventsListener(centerHandles: EditorCenterHandles) {
    const vStatus = reactive({
        scollY: 0,
        newContent: ""
    })

    //图片上传处理
    const handlePasteUpload = async (cm: CodeMirrorAdapter, fileBlob: Blob) => {
        let { path } = await centerHandles.upload(fileBlob)
        usePasteImageInsertToEditor(cm, "图片", path)
    }

    //内容变动事件
    const change = (cm: CodeMirrorAdapter) => {
        let con = cm.getValue()
        if (typeof con != "string") return;
        vStatus.newContent = con
    }

    //粘贴事件
    const paste = (cm: CodeMirrorAdapter, e: any, b: any) => {
        let fileBlob = usePasteImage(e)
        if (!fileBlob) return

        //- 从磁盘上复制的文件要回退，因为ed默认插入了文件名，而我们不需要
        useIsPasteImageFromDisk(e) && setTimeout(() => cm.execUndo(), 2)

        handlePasteUpload(cm, fileBlob)
    }

    //滚动条事件
    const scroll = (cm: CodeMirrorAdapter) => {
        let { y } = cm.getScollXY()
        vStatus.scollY = y
    }

    //提供event依赖
    provide("event", { change, paste, scroll })

    return vStatus
}

/**
 * 提供一些基础方法给(子组件/扩展组件)使用
 * `centerHandles` 依赖
 * @param uploadApi 
 */
export function useProvideCenterHandles(uploadApi: EditorUploadHandleInterface) {
    const state: { isLoading: boolean, cmd: EditorHeaderBtnCommand } = reactive({
        isLoading: false,
        cmd: { name: "", callback: () => { } }
    })

    const centerHandles: EditorCenterHandles = {
        upload: async (fileBlob) => {//上传都会先走这里
            state.isLoading = true
            return uploadApi(fileBlob).finally(() => {
                state.isLoading = false
            })
        },
        clickButton(cmd) {//提供给header按钮组件点击
            //editor需要知道命令名称和命令的数据
            state.cmd = cmd
        }
    }

    provide("centerHandles", centerHandles)

    return { sonComState: state, centerHandles }
}

/**
 * centerHandles 注入
 */
export function useInjectCenterHandles(): EditorCenterHandles {
    return toAny(inject("centerHandles"))
}