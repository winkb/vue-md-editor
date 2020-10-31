import { defineComponent } from "vue";
import { useClickButtonCommand } from '../useClickCommand';

const FontCodeComponent = defineComponent({
    setup() {
        return () => <button onClick={useClickButtonCommand("code")} class="button iconfont icon-daima"></button>
    }
});

export default FontCodeComponent