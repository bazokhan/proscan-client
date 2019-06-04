const path = require("path");
module.exports = {
  title: "Quiz App Documentation",
  version: "0.0.1",
  //   components: [
  //     "src/pages/**/[A-Z]*.js",
  //     "src/components/**/[A-Z]*.js",
  //     "src/layout/**/[A-Z]*.js"
  //   ],
  sections: [
    // {
    //   name: "Introduction",
    //   content: "docs/introduction.md"
    // },
    // {
    //   name: "Documentation",
    //   sections: [
    //     {
    //       name: "Installation",
    //       content: "docs/installation.md",
    //       description: "The description for the installation section"
    //     },
    //     {
    //       name: "Configuration",
    //       content: "docs/configuration.md"
    //     },
    //     {
    //       name: "Live Demo",
    //       external: true,
    //       href: "http://example.com"
    //     }
    //   ]
    // },
    {
      name: "UI Components",
      //   content: "docs/ui.md",
      components: "src/layout/**/[A-Z]*.js",
      exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
      usageMode: "expand", // 'hide' | 'collapse' | 'expand'
      pagePerSection: true
    },
    {
      name: "Logic Components",
      //   content: "docs/ui.md",
      components: "src/components/**/[A-Z]*.js",
      exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
      usageMode: "expand", // 'hide' | 'collapse' | 'expand'
      pagePerSection: true
    },
    {
      name: "Pages Components",
      //   content: "docs/ui.md",
      components: "src/pages/**/[A-Z]*.js",
      exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
      usageMode: "expand", // 'hide' | 'collapse' | 'expand'
      pagePerSection: true
    },
    {
      name: "Hooks Components",
      //   content: "docs/ui.md",
      components: "src/hooks/**/[A-Z]*.js",
      exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
      usageMode: "expand", // 'hide' | 'collapse' | 'expand'
      pagePerSection: true
    }
  ],
  pagePerSection: true,
  theme: {
    baseBackground: "#fdfdfc",
    link: "#274e75",
    linkHover: "#90a7bf",
    border: "#e0d2de",
    font: ["Helvetica", "sans-serif"]
  },
  //   usageMode: "expand",
  styles: {
    Playground: {
      preview: {
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: [[0, 0, 1, 0]],
        borderRadius: 0
      }
    },
    Markdown: {
      pre: {
        border: 0,
        background: "none"
      },
      code: {
        fontSize: 14
      }
    }
  },
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, ".js");
    return `import { ${name} } from '${componentPath}';`;
  }
};
