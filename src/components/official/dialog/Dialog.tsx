import { computed, defineComponent, h, ref, render, watch } from "vue";

const EdirotDialogComponent: any = defineComponent({
    props: {
        is_open: Boolean,
        header: String,
        scopedSlots: {
            default: {
                default: () => <div>主体</div>,
            }
        },
    },
    setup(props, { emit }) {
        let isOpen = ref(false)

        const open = () => isOpen.value = true

        const close = () => {
            isOpen.value = false
            emit("close")
        }

        let getHeader = computed(() => {
            return props.header ? props.header : "Model Header"
        })

        let modalWrapperClass = computed(() => {
            return (isOpen.value) ? "modal-wrapper modal-is-open" : "modal-wrapper "
        })

        watch(() => props.is_open, () => {
            isOpen.value = props.is_open
        })

        return {
            modalWrapperClass,
            getHeader,
            open,
            close
        }
    },
    render() {

        return (
            <div class={this.modalWrapperClass}>
                <div class="overlay close-modal"></div>
                <div class="modal modal-centered">
                    <div class="modal-content shadow-lg p-5">
                        <div class="border-b p-2 pb-3 pt-0 mb-4">
                            <div class="flex justify-between items-center">
                                <h1 class="text-gray-900">
                                    {this.getHeader}
                                </h1>
                                <span onClick={this.close} class='close-modal cursor-pointer px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200'>
                                    <span class="fas fa-times text-gray-500">Close</span>
                                </span>
                            </div>
                        </div>
                        {/* <!-- Modal content --> */}
                        <div>
                            {h("div", this.scopedSlots.default())}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

export default EdirotDialogComponent