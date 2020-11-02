declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{ title: string }, {}, any>
    export default component
}

declare module "codemirror/lib/codemirror"
declare module "marked"
declare module "prismjs"