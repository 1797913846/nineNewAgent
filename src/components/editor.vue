<template>
    <div id="wangeditor">
        <div ref="editorElem" style="text-align:left;"></div>
    </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "Editor",
  data() {
    return {
      editor: null,
      editorContent: ""
    };
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ["catchData"], // 接收父组件的方法
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.config.onchange = html => {
      this.editorContent = html;
      console.log("我是内容", this.editorContent);
      this.$emit("childByValue", this.editorContent);
    };
    this.editor.create(); // 创建富文本实例
    this.editor.txt.html(this.catchData);
  }
};
</script>