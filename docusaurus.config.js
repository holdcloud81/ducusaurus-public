// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // docs: {
        //   sidebarPath: './sidebars.js',
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        docs: false, // 플러그인에서 직접 관리        
        blog: false, // 플러그인에서 직접 관리 
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    // docs/* 모든 디렉터리 
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'default',
        path: 'docs',
        routeBasePath: '/docs', // URL이 /docs 부터 시작
        sidebarPath: './sidebars.js', // 공용 사이드바
      },
    ],  
    
    //  로컬 검색 docusaurus-lunr-search
    [
      require.resolve('docusaurus-lunr-search'),
      {
        docsPluginId: 'default', // 위에서 설정한 플러그인 ID
        languages: ["en", "ko"], //  다국어 검색 가능 (영어, 한국어)
        includeRoutes: ["/docs/**"],  //  /docs/ 시작
        excludeRoutes: ["/blog/**"], // `/blog/` 제외
        //indexBlog: true,  //  블로그 검색 활성화
        indexBaseUrl: true,
        assetUrl: "/", //  검색 인덱스를 루트 경로에서 찾도록 설정
        highlightResult: true, //  검색된 단어를 페이지에서 강조 표시
        fields: {
          title: { boost: 200 },   //  제목(title)의 중요도를 가장 높게 설정
          content: { boost: 100 }, //  본문(content)의 중요도를 중간 정도로 설정
          keywords: { boost: 50 }  //  키워드의 중요도를 낮게 설정
        },
      },
    ],        
  ],
    
  //  테마 및 UI 설정
  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ ({
    image: "img/docusaurus-social-card.jpg", //  SNS 공유 시 표시될 이미지 설정
    navbar: {
      title: "holdCloud Docs",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs", //  네비게이션 바에서 'Docs'로 표시됨
        },
        {
          href: "https://github.com/facebook/docusaurus",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [{ label: "Tutorial", to: "/docs/intro" }],
        },
        {
          title: "Community",
          items: [
            { label: "Stack Overflow", href: "https://stackoverflow.com/tagged/docusaurus" },
            { label: "Discord", href: "https://discordapp.com/invite/docusaurus" },
            { label: "X", href: "https://x.com/docusaurus" },
          ],
        },
        {
          title: "More",
          items: [
            { label: "GitHub", href: "https://github.com/facebook/docusaurus" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github, //  코드 블록 기본 테마
      darkTheme: prismThemes.dracula, //  다크 모드 테마
    },
  }),
};

export default config;
