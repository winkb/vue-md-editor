import { defineComponent, ref, watch, watchEffect } from "vue";
import marked from "marked";
import Prism from "prismjs";
import "../assets/css/prism.scss"
import { toRefValue } from './utils/convert';
import { useClipboard, useThrottle } from '@vueuse/core'

function initMarked() {
    // 新建渲染器
    const renderer = new marked.Renderer()
    const { copy } = useClipboard()
    let w: any = window

    w.onCopy = (code: string) => {
        copy(code)
    }

    renderer.code = (code: string, language: string, isEscaped: boolean) => {
        let hled = Prism.highlight(
            code,
            Prism.languages["javascript"],
            language
        )

        const btnHtml = `<span onClick="onCopy(\`${code}\`)" class="py-0 px-2 bg-orange-300 rounded code-copy-button icon iconfont icon-copy hidden cursor-pointer text-white hover:text-green-500 text-xl absolute"></span>`
        const codeHtml = `<pre><code class="language-${language}">${hled}</code></pre>`

        return `<div class="hover-hidden-open relative" >${btnHtml}${codeHtml}</div>`
    }

    return marked.setOptions({
        renderer: renderer,
        breaks: true,//回车换行
    })
}

const PreviewComponent = defineComponent({
    props: [
        "content",
    ],
    setup(props) {
        let htmlContent = ref()
        let input = ref("")

        initMarked()

        const markedContent = (content: any) => {
            htmlContent.value = marked(toRefValue(content))
        }

        //防抖
        let throttled = useThrottle(input, 300)

        watch(throttled, () => markedContent(throttled.value))

        watchEffect(() => input.value = props.content)

        return {
            htmlContent
        }
    },
    render() {
        return (
            <div class="markdown-body theme-xonokai" innerHTML={this.htmlContent}></div>
        )
    }
})

export default PreviewComponent