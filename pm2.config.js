module.exports = {
    apps: [
        {
            name: "maiji-tv",
            script: "npx nuxt",
            instances: 2,
            exec_mode: "fork",
            max_memory_restart: "500M",
            "max_restarts": 30,
            watch: false
        }
    ]
};
