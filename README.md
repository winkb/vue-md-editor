[在线demo](https://blog.gongle.cc/index.html#/article/edit/0)

# 使用方法

- 引入组件

```
<template>
    <MkEditorComponent :config="config" class="h-full" />
</template>
```

- 配置

```javascript
const config = {
    upload() { // 上传处理函数， 返回Promise<{path:string}>
        return new Promise((r) => {
        setTimeout(
            () =>
            r({
                path:
                "https://pic1.zhimg.com/80/v2-2655b868e875f5c76de3e7e4fae118c6_1440w.jpg?source=1940ef5c",
            }),
            3000
        );
        });
    },
}
```

