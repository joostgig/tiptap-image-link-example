<template>
  <div class="editor" v-if="editor">
    <div style="margin: 20px 30px; display: flex; gap: 10px">
      <button
        :disabled="!editor.isActive('link')"
        @click="editor.chain().focus().toggleLink().run()"
      >
        removeLink
      </button>
      <button :disabled="!editor.isActive('link')" @click="setRandomSource">randomImage</button>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import { StarterKit } from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

const CustomImage = Image.extend({
  inline: true,
  marks: "link",
  group: "inline",
});

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, CustomImage, Link.configure()],
      editorProps: {
        attributes: {
          class: "Editor",
        },
      },
      content: `
        <h1>Image wrapped by Link example</h1>
        <p>Select the image and click on the <strong>randomImage</strong> button - it will remove the wrapping link</p>
        <a href="/click-me"><img src="https://i.picsum.photos/id/87/200/200.jpg?hmac=IHnh6D2-VHDRNEnAKr5_9gaKNH6PfBO0XifjLCb4GUY"></a>

      `,
    });
  },

  methods: {
    setRandomSource() {
      const sources = [
        "https://i.picsum.photos/id/520/200/200.jpg?hmac=gq6GVKg64GMqsvk_d6gzXZ7L1htska1jEdgBnAwm4xU",
        "https://i.picsum.photos/id/167/200/200.jpg?hmac=sv_8nQnuUO9QJ47YNgjG2iTmSnnzYA2ysw8JrvD5OTk",
        "https://i.picsum.photos/id/324/200/200.jpg?hmac=qhw4ORwk8T1r-Rxd2QREZORSVvc6l_R1S6F3Pl9mR_c",
      ];
      const randomSource = sources[Math.floor(Math.random() * sources.length)];
      this.editor.chain().focus().updateAttributes("image", { src: randomSource }).run();
    },
  },
};
</script>
