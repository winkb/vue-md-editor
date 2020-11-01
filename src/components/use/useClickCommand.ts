import { inject } from "vue";

export function useClickButtonCommand(name: string) {
    let clickButtonEvent: any = inject("clickButton")

    const clickButton = (cmd: EditorHeaderBtnCommand) => {
        cmd.name = name
        clickButtonEvent(cmd)
    }

    return clickButton
}