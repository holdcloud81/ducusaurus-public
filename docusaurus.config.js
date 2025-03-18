// @ts-check
// `@type` JSDoc 주석을 사용하여 코드 자동 완성 및 타입 검사를 활성화함
// (VSCode 등의 에디터에서 유용함)
// Docusaurus 설정 관련 문서는 다음 링크에서 확인 가능: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "holdCloud",
  tagline: "holdCloud no money",
  favicon: "img/favicon.ico",

  //  사이트 URL 및 기본 경로 설정
  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",

  //  GitHub 배포 설정 (필요하면 수정 가능)
  organizationName: "facebook", // GitHub 조직 또는 사용자 이름
  projectName: "docusaurus", // GitHub 저장소 이름

  //  오류 발생 시 처리 방식 설정
  onBrokenLinks: "throw", // 깨진 링크가 있으면 오류 발생
  onBrokenMarkdownLinks: "throw", // Markdown 내부의 깨진 링크가 있으면 오류 발생

  //  다국어(i18n) 설정
  i18n: {
    defaultLocale: "en", // 기본 언어 설정 (영어)
    locales: ["en"], // 지원하는 언어 목록 (추가 가능: ["en", "ko"])
  },

  //  Docusaurus 프리셋 설정 (기본 테마 및 기능 설정)
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false, //  문서 기능 비활성화 (플러그인으로 관리)
        blog: false, //  블로그 기능 비활성화
        theme: {
          customCss: require.resolve("./src/css/custom.css"), //  사용자 정의 CSS 추가
        },
      }),
    ],
  ],

  //  플러그인 설정
  plugins: [
    // ✅ 문서 관리 플러그인 설정
    [
      require.resolve("@docusaurus/plugin-content-docs"),
      {
        id: "default", // 중복 오류 방지용 ID 설정
        path: "docs", //  문서 폴더 경로
        routeBasePath: "docs", //  문서 경로 기본값 설정
        sidebarPath: require.resolve("./sidebars.js"), //  사이드바 설정 파일 지정
        
        //  사이드바 자동 생성 시 모든 카테고리에 폴더 아이콘 추가하는 기능
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          
          function addFolderIconsToCategories(items) {
            return items.map((item) => {
              if (item.type === "category") {
                return {
                  ...item,
                  label: `${item.label}`, //  카테고리 앞에 폴더 아이콘 추가
                  collapsible: true, //  카테고리를 접을 수 있도록 설정
                  collapsed: false, //  기본적으로 펼쳐진 상태 유지
                  items: addFolderIconsToCategories(item.items),
                };
              }
              return item;
            });
          }
  
          return addFolderIconsToCategories(sidebarItems);
        },
      },
    ],

    // ✅ 로컬 검색 기능 추가 (`docusaurus-lunr-search` 플러그인 사용)
    [
      require.resolve("docusaurus-lunr-search"),
      {
        languages: ["en", "ko"], //  다국어 검색 가능 (영어, 한국어)
        includeRoutes: ["/docs/**"],  //  문서 검색 활성화
        excludeRoutes: ["/docs/private/", "/blog/"], // `/docs/private/` 및 `/blog/` 제외
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
          sidebarId: "mySidebar",
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
