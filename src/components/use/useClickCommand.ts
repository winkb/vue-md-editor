import { inject } from "vue";

export function useClickButtonCommand(name: string) {
    let clickButtonEvent: any = inject("clickButton")

    const clickButton = (cmd?: EditorHeaderBtnCommand | string | number) => {

        //这里是暂时的，要删掉的
        if (!cmd || typeof cmd != "object") {
            cmd = {
                name: name,
                callback: () => { },
                data: cmd
            }
        }

        cmd.name = name
        clickButtonEvent(cmd)
    }

    return clickButton
}