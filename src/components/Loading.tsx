import { defineComponent } from "vue";

const EditorLoadingComponent = defineComponent({
    setup() {
        return () => (
            <div class="absolute flex flex-col items-center z-50 justify-center w-full h-full bg-black bg-opacity-25" >
                <div class="text-sm mb-1 text-orange-800">
                    图片正在上传中...
                </div>
                <div class="rounded-full animate-spin opacity-50  bg-gradient-to-r from-black to-white   h-12 w-12 flex items-center justify-center">
                    <div class="rounded-full bg-white bg-opacity h-10 w-10 flex items-center justify-center text-white text-xs">
                    </div>
                </div>
            </div>
        )
    }
})

export default EditorLoadingComponent