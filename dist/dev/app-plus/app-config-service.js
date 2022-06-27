
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#F8F8F8","titleText":"蔓草","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"蔓草兴趣","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.4.15","entryPagePath":"pages/index/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#7A7E83","selectedColor":"#3cc51f","borderStyle":"black","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","text":"兴趣"},{"pagePath":"pages/find/index","text":"分享"},{"pagePath":"pages/message/index","text":"消息"},{"pagePath":"pages/user/index","text":"我的"}],"selectedIndex":0,"shown":true},"locales":{}};
  const __uniRoutes = [{"path":"pages/index/index","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"navigationBar":{"titleText":"兴趣爱好"},"isNVue":false}},{"path":"pages/user/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":3,"enablePullDownRefresh":false,"titleNView":false,"navigationBar":{"titleText":"user","style":"custom"},"isNVue":false}},{"path":"pages/find/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"enablePullDownRefresh":false,"navigationBar":{"titleText":"分享"},"isNVue":false}},{"path":"pages/message/index","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"enablePullDownRefresh":false,"navigationBar":{"titleText":"聊天消息"},"isNVue":false}},{"path":"pages/login/index","meta":{"enablePullDownRefresh":false,"titleNView":false,"navigationBar":{"titleText":"","style":"custom"},"isNVue":false}},{"path":"pages/index/HobbyDetailMountain","meta":{"navigationBar":{"titleText":"登山"},"isNVue":false}},{"path":"pages/message/Chat","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"pages/hobby/index","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"hobby"},"isNVue":false}},{"path":"pages/user/info/index","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"pages/user/info/Follow","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"pages/user/info/User","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"pages/user/info/Editor","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":""},"isNVue":false}},{"path":"pages/user/info/School","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"学校"},"isNVue":false}},{"path":"pages/user/gender/index","meta":{"enablePullDownRefresh":false,"titleNView":false,"navigationBar":{"titleText":"","style":"custom"},"isNVue":false}},{"path":"pages/user/info/PublicDetail","meta":{"titleNView":false,"navigationBar":{"style":"custom"},"isNVue":false}},{"path":"pages/user/info/EditDetail","meta":{"titleNView":false,"navigationBar":{"style":"custom"},"isNVue":false}},{"path":"pages/user/info/LikeDetail","meta":{"titleNView":false,"navigationBar":{"style":"custom"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  