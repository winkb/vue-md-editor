import { inject, provide } from "vue";
import { toAny } from '../utils/convert';

export function useClickButtonCommand(name: string) {
    let clickButtonEvent: any = inject("clickButton")

    const clickButton = (cmd: EditorHeaderBtnCommand) => {
        cmd.name = name
        clickButtonEvent(cmd)
    }

    return clickButton
}

export function useProvideCenterHandles(centerHandles: EditorCenterHandles) {
    provide("centerHandles", centerHandles)
}

export function useInjectCenterHandles(): EditorCenterHandles {
    return toAny(inject("centerHandles"))
}