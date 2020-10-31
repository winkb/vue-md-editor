import { defineComponent, watch } from 'vue'
import FontBlodComponent from './buttons/font-blod/FontBlod'
import FontCodeComponent from './buttons/font-code/Code';
import FontHComponent from './buttons/font-h/FontH';
import FontImageComponent from './buttons/font-image/FontImage';
import FontItalicComponent from './buttons/font-italic/FontItalic';
import FontLinkComponent from './buttons/font-link/FontLink';
import FontListOlComponent from './buttons/font-list-ol/FontListOl';
import FontListUlComponent from './buttons/font-list-ul/FontListUl';
import FontQuoteLeftComponent from './buttons/font-quote-left/FontQuoteLeft';
import FontStrikethroughComponent from './buttons/font-strikethrough/FontStrikethrough';
import FontSubscriptComponent from './buttons/font-subscript/FontSubscript';
import FontSuperscriptComponent from './buttons/font-superscript/FontSuperscript';
import FontTableComponent from './buttons/font-table/FontTable';
import FontTackComponent from './buttons/font-tack/FontTack';
import FontUnderlineComponent from './buttons/font-underline/FontUnderline';


const EditorHeaderComponent = defineComponent({
    setup(props, { emit }) {
    },
    render() {
        return (
            <div class="header flex flex-wrap items-center h-full w-full">
                <FontCodeComponent />
                <FontBlodComponent />
                <FontItalicComponent />
                <FontHComponent />
                <FontListOlComponent />
                <FontListUlComponent />
                <FontUnderlineComponent />
                <FontStrikethroughComponent />
                <FontLinkComponent />
                <FontImageComponent />
                <FontTableComponent />
                <FontQuoteLeftComponent />
                <FontTackComponent />
                <FontSuperscriptComponent />
                <FontSubscriptComponent />
            </div>
        )
    }
});

export default EditorHeaderComponent