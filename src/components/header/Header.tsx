import { defineComponent } from 'vue'
import FontBlodComponent from './buttons/font-blod/FontBlod'
import FontCodeComponent from './buttons/font-code/Code';
import FontHComponent from './buttons/font-h/FontH';
import FontImageComponent from './buttons/font-image/FontImage';
import FontItalicComponent from './buttons/font-italic/FontItalic';
import FontLinkComponent from './buttons/font-link/FontLink';
import FontListOlComponent from './buttons/font-list-ol/FontListOl';
import FontListUlComponent from './buttons/font-list-ul/FontListUl';
import FontQuoteLeftComponent from './buttons/font-quote-left/FontQuoteLeft';
import FontRedoComponent from './buttons/font-redo/FontRedo';
import FontSmallBlockComponent from './buttons/font-small-block/FontSmallBlock';
import FontStrikethroughComponent from './buttons/font-strikethrough/FontStrikethrough';
import FontSubscriptComponent from './buttons/font-subscript/FontSubscript';
import FontSuperscriptComponent from './buttons/font-superscript/FontSuperscript';
import FontTableComponent from './buttons/font-table/FontTable';
import FontTackComponent from './buttons/font-tack/FontTack';
import FontUnderlineComponent from './buttons/font-underline/FontUnderline';
import FontUndoComponent from './buttons/font-undo/FontUndo';


const EditorHeaderComponent = defineComponent({
    render() {
        return (
            <div class="header flex flex-wrap items-center h-full w-full">
                <div title="代码"><FontCodeComponent /></div>
                <div title="粗体"><FontBlodComponent /></div>
                <div title="斜体"><FontItalicComponent /></div>
                <div title=""><FontHComponent /></div>
                <div title="有序列表"><FontListOlComponent /></div>
                <div title="无序列表"><FontListUlComponent /></div>
                <div title="下划线"><FontUnderlineComponent /></div>
                <div title="中划线"><FontStrikethroughComponent /></div>
                <div title="块"><FontSmallBlockComponent /></div>
                <div title="链接"><FontLinkComponent /></div>
                <div title=""><FontImageComponent /></div>
                <div title="表格"><FontTableComponent /></div>
                <div title="段落"><FontQuoteLeftComponent /></div>
                <div title="标记"><FontTackComponent /></div>
                <div title="上角标"><FontSuperscriptComponent /></div>
                <div title="下角标"><FontSubscriptComponent /></div>
                <div title="撤销一步"><FontUndoComponent /></div>
                <div title="反撤销一步"><FontRedoComponent /></div>
            </div>
        )
    }
});

export default EditorHeaderComponent