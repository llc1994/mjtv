export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        // title: process.env.npm_package_name || "",
        title: '麦咭TV',
        meta: [
            //
            { charset: 'utf-8' },
            { name: 'viewport', content: 'initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,width=device-width,viewport-fit=cover' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [
            //
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: '//at.alicdn.com/t/font_1421012_pf3n6e8zwms.css',
            },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: '/css/dialog.css',
            },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css',
            },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: '/layui/css/layui.css',
            }
            // {
            //     rel: 'stylesheet',
            //     type: 'text/css',
            //     href: '/js/social-share.js/dist/css/share.min.css',
            // }

        ],
        script: [
            {
                type: 'text/javascript',
                src: '/js/aliplayer-min.js',
            },
            {
                type: 'text/javascript',
                src: '/js/crypto-js.js',
            },
            {
                type: 'text/javascript',
                src: '/js/zepto.min.js',
            },
            {
                type: 'text/javascript',
                src: '/js/jquery.min.js',
            },
            {
                type: 'text/javascript',
                src: '/layui/layui.all.js',
            },
            {
                type: "text/javascript",
                src: "/js/social-share.js/dist/js/social-share.min.js"
            },
            {
                type: 'text/javascript',
                src: '/js/qrcode.js',
            },
            {
                type: 'text/javascript',
                src: '/js/message.js',
            },
            {
                type: 'text/javascript',
                src: '/js/dialog.min.js',
            },
            {
                type: 'text/javascript',
                src: '/js/store2.min.js',
            },
            {
                type: 'text/javascript',
                src: '/js/area.js',
            },
            {
                type: 'text/javascript',
                src: '/js/init.js',
            },
        ],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
        //
        '@assets/css/global.scss',
        // "element-ui/lib/theme-chalk/index.css"
        'swiper/dist/css/swiper.css',
        'social-share.js/dist/css/share.min.css'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        // {
        //     src: "~plugins/ElementUI",
        //     ssr: true
        // }
        {
            src: '~plugins/Swiper.js',
            ssr: false,
        },
        {
            src: '~plugins/Global.js',
        },
        // {
        //     src: "~plugins/Axios.js"
        // }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
        postcss: {
            // 添加插件名称作为键，参数作为值
            // 使用npm或yarn安装它们
            plugins: {
                // 通过传递 false 来禁用插件
            },
            // preset: {
            //     // 更改postcss-preset-env 设置
            //     autoprefixer: {
            //         browsers: ['last 2 versions', '> 1%']
            //     },
            // },
        },
    },
    server: {
        port: 3000,
    },
};
