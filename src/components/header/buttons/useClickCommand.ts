import { inject } from "vue";

export function useClickButtonCommand(name: string) {
    let clickButtonEvent: any = inject("clickButton")

    const clickButton = (data: any) => {
        clickButtonEvent(name, data ? data : {})
    }

    return clickButton
}