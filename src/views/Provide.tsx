import { defineComponent, inject } from "vue";

const ProvideComponent = defineComponent({
    setup() {

        console.log("event", inject("event"))
        console.log("centerHandles", inject("centerHandles"))

        return () => (
            <div>
                Provideass
            </div>
        )
    }
})

export default ProvideComponent