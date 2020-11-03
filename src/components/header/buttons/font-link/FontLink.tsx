import EdirotDialogComponent from '@/components/official/dialog/Dialog';
import { useClickButtonCommand } from '@/components/use/useEvent';
import { defineComponent, provide, ref } from "vue";
import FontLinkFormComponent from './Form';

const FontLinkComponent = defineComponent({
    setup() {

        const useClickEvent = useClickButtonCommand("blod")
        const onClick = () => {
            dialog.value.open()

        }
        const dispatchEvent = (title: string, link: string) => {
            useClickEvent({
                callback: (ed) => {
                    title = title ? title : link

                    var replaced = `[${title}](${link})`

                    //1 在光标之前插入标识 
                    ed.insertContent(replaced)

                    //2 将光标移入标识中心
                    ed.moveCursorRelative(replaced.length)
                }
            })
        }

        const dialog: any = ref(null)

        const onSubmit = (form: any) => {
            dialog.value.close()
            dispatchEvent(form.title, form.link)
        }

        //提供给表单子组件用的方法
        provide("onCancel", () => dialog.value.close())
        provide("onSubmit", onSubmit)

        const formSlot = {
            default: () => <FontLinkFormComponent />
        }

        return () => (
            <div class="flex">
                <EdirotDialogComponent scopedSlots={formSlot} header="添加链接" ref={dialog} />
                <button onClick={() => onClick()} class=" button iconfont icon-lianjie"></button>
            </div>
        )
    }
});

export default FontLinkComponent