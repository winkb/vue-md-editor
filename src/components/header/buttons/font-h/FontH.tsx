
import { defineComponent } from "vue";
import { useClickButtonCommand } from '../useClickCommand';

const FontHComponent = defineComponent({

    setup() {

        const onClickH = useClickButtonCommand("h")

        return () => (
            <div class="relative hover-hidden-open">
                <button class="button iconfont icon-biaoti"></button>
                <div class=" hidden absolute z-10 bg-white  w-24 rounded border shadow-lg">
                    <span onClick={() => onClickH(1)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H1
                    </span>
                    <span onClick={() => onClickH(2)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H2
                    </span>
                    <span onClick={() => onClickH(3)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H3
                    </span>
                    <span onClick={() => onClickH(4)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H4
                    </span>
                    <span onClick={() => onClickH(5)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H5
                    </span>
                    <span onClick={() => onClickH(6)} class=" text-gray-600 hover:bg-indigo-100 hover:text-black text-xs cursor-pointer block px-4 py-2 ">
                        标题H6
                    </span>
                </div>
            </div>
        )
    }
});


export default FontHComponent
