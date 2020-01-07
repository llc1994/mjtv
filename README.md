# maijitv

#### 介绍

麦咭 TV

#### 软件架构

nuxt

#### 本地开发教程

1. 搭建 node.js 环境（最新稳定版，大概10.x版本）
2. 下载此仓库
3. npm install 安装项目依赖
4. npm run dev（开发环境用此命令）

#### 部署安装教程
1. 进入 nodejs 官网 https://nodejs.org/en/
2. 点击当前的 LTS 长期支持稳定版下的 other Downloads 其他下载方式
3. 右键 Linux Binaries (x64) 版本后的下载地址，复制下载地址
4. 进入 linux 环境，使用wget https://nodejs.org/dist/v10.16.3/node-v10.16.3-linux-x64.tar.xz(比如是这个版本) 下载nodejs
5. xz -d node-v10.16.3-linux-x64.tar.xz 解压nodejs压缩包
6. tar -xvf node-v10.16.3-linux-x64.tar 解压第二层
7. 将 node-v10.16.3-linux-x64 目录下的文件放到合适的地方，或者不移动
8. 编辑 ~/.bashrc 文件，设置环境变量，指向nodejs的解压目录
9. nodejs 的解压目录下，创建etc目录，其下再创建一个npmrc文件
10. 编辑npmrc文件，设置参数 registry=https://registry.npm.taobao.org
11. git clone 本仓库地址 (下载此仓库)
12. npm install (安装项目依赖)
13. npm install pm2 -g 全局命令安装 pm2（部署时用）
14. npm run build (编译项目，部署时用)
15. pm2 start npm --name=maiji-tv -- run start（用 pm2 管理并启动）

#### 重启教程
1. 本地npm run build
2. 将 .nuxt 和 static文件覆盖服务器上的文件
3. pm2 restart maiji-tv 重启即可