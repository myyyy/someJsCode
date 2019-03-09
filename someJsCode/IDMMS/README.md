## 环境搭建及项目启动

如果本地已经搭建了node的环境和browser-sync服务的话，可以直接在使用以下命令操作启动项目
#### npm run dev
运行以上命令后即可打开浏览器输入 http://localhost:3000浏览项目的页面情况

如果本地没有安装node环境的话可以先行安装node（官网下载node安装），再运行以下命令安装browser-sync,安装成功后执行以上命令
#### node安装说明（http://www.runoob.com/nodejs/nodejs-install-setup.html）
安装好node.js后控制台输入以下命令安装browser-sync
#### npm install browser-sync -g
browser-sync安装好后执行
#### npm run dev


browser-sync服务说明：启动该服务作用主要是将项目部署到本地的线上的运行环境，看到的效果更接近最后产品上线的效果。         

当前目录下必须要有package.json文件，才能启动服务

## 系统信息
南京智慧排水监测管理系统（Intelligent drainage monitoring and management system）
英文名称： IDMMS
svn地址 http://106.13.75.226:81/svn/testCode/