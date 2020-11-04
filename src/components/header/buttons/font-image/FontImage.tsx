import EdirotDialogComponent from 'MkEditor/official/dialog/Dialog';
import { useClickButtonCommand, useInjectCenterHandles } from 'MkEditor/use/useEvent';
import { toAny } from 'MkEditor/utils/convert';
import { defineComponent, provide, ref } from "vue";
import FontImageFormComponent from './Form';

const FontImageComponent = defineComponent({
    setup() {
        const dialog: any = ref(null)
        const fileInputRef = ref(null)
        const centerHandles = useInjectCenterHandles()
        const useClickEvent = useClickButtonCommand("image")
        const onClick = (tag: string) => {
            tag == "upload" ? handleUpload() : handleForm()
        }

        const triggerEvent = (title: string, link: string) => {
            useClickEvent({
                callback: (ed) => {
                    title = title ? title : link.substring(0, 6)
                    var replaced = `![${title}](${link})`

                    //1 在光标之前插入标识 
                    ed.insertContent(replaced)

                    //2 将光标移入标识中心
                    ed.moveCursorRelative(replaced.length)
                }
            })
        }

        const onSubmit = (form: any) => {
            dialog.value.close()
            triggerEvent(form.title, form.link)
        }

        //提供给表单子组件用的方法
        provide("onCancel", () => dialog.value.close())
        provide("onSubmit", onSubmit)

        const handleForm = () => {
            dialog.value.open()
        }

        const handleUpload = () => {
            toAny(fileInputRef.value).click()
        }

        const formSlot = {
            default: () => <FontImageFormComponent />
        }

        //上传文件到服务器
        const apiUpload = (file: Blob) => {
            return centerHandles.upload(file)
        }

        //监听文件上传事件
        const onFileChange = async (e: any) => {
            let fileInfo = e.target.files[0]

            let { path } = await apiUpload(fileInfo)

            triggerEvent(fileInfo.type, path)

            //情况file标签的值，否则同名文件上传不会触发onChange事件
            toAny(fileInputRef.value).value = ""
        }

        return () => (
            <div class="relative hover-hidden-open">
                <EdirotDialogComponent header="在线图片" ref={dialog} scopedSlots={formSlot} />
                <span>
                    <input class="hidden" ref={fileInputRef} onChange={onFileChange} type="file" />
                </span>
                <button class=" button iconfont icon-tupian"></button>
                <div class=" hidden absolute z-10 bg-white  w-24 rounded border shadow-lg">
                    <span onClick={() => onClick("remote")} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        在线链接
                    </span>
                    <span onClick={() => onClick("upload")} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        上传图片
                    </span>
                </div>
            </div>
        )
    }
});

export default FontImageComponent