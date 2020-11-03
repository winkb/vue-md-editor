import { defineComponent, ref, watchEffect } from "vue";
import marked from "marked";
import Prism from "prismjs";
import "../assets/css/prism.scss"
import { toRefValue } from './utils/convert';

function initMarked() {
    // 新建渲染器
    const renderer = new marked.Renderer()

    renderer.code = (code: string, language: string, isEscaped: boolean) => {
        let hled = Prism.highlight(
            code,
            Prism.languages["javascript"],
            language
        )

        return `<pre><code class="language-${language}">${hled}</code></pre>`
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

        const markedContent = (content: any) => {
            htmlContent.value = marked(toRefValue(content))
        }

        initMarked()

        watchEffect(() => markedContent(props.content))

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