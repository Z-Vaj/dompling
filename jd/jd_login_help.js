/**
 * 登录助手
 * 环境：qx,loon,surge
 *
 * [MITM] *.jd.com, *.*.jd.com, *.jingxi.com, *.*.jingxi.com
 *
 * [Rule]
 * 京喜：^https?:\/\/([\w-]+\.)?([\w-]+\.)jingxi\.com\/?((?!\.(js|json|gif|webp|dpg|flv|mp3|mp4)).)*$
 * 京东：^https?:\/\/([\w-]+\.)?([\w-]+\.)jd\.(com|hk)\/?((?!\.(js|json|gif|webp|dpg|flv|mp3|mp4)).)*$
 *
 * [Script]
 * https://raw.githubusercontent.com/dompling/Script/master/jd/jd_login_help.js
 *
 */

const $ = new API("jd_ck_remark"),
  APIKey = "CookiesJD",
  CacheKey = `#${APIKey}`,
  remark_key = `remark`;


($.url = $request.url), ($.html = $response.body);

let extraAction = [];
try {
  extraAction = JSON.parse($.read("actions") || "[]");
} catch (error) {
  $.error(`快捷跳转格式错误，请重新设置!` + error);
}

const cookieIndex = $.read(`#CookieIndex`) || 0;
const boxjs_host = $.read("#boxjs_host").indexOf("com") !== -1 ? "com" : "net";
const qlConfig = $.read("#ql");

const isLogin = $.url.indexOf("/login/login") > -1;

function getRem(n) {
  return `${25 * n}vw`;
}

function getUsername(str) {
  if (!str) return "";
  return decodeURIComponent(str);
}

// 初始化 boxjs 数据
function initBoxJSData() {
  const CookiesJD = JSON.parse($.read(CacheKey) || "[]").map((item) => {
    return { ...item, userName: getUsername(item.userName) };
  });

  let cookiesRemark = JSON.parse($.read(remark_key) || "[]");

  const cookiesFormat = {};

  cookiesRemark.forEach((item) => {
    const key = getUsername(item.username);
    cookiesFormat[key] = item;
  });

  cookiesRemark = CookiesJD.map((item) => ({
    nickname: getUsername(item.userName),
    ...cookiesFormat[item.userName],
    ...item,
    username: getUsername(item.userName),
  })).filter((item) => !!item.cookie);

  return cookiesRemark;
}

$.headers = $response.headers;
const cookiesRemark = initBoxJSData();
function createStyle() {
  return `
<style>
body #imk2FixedBottom.imk2b_wraper,
body #imk2FixedSide,
body #m_common_tip,
body .jumpJdApp,
body .modal,
body .modal,
body #imk2FixedBottom.imk2b_wraper + a,
body #plugIn_downloadAppPlugIn_loadIframe,
body div.download-pannel.download-noBg,
body div.bottom_tips_wrapper
{
  display:none !important;
}

#cus-mask{
  overflow:hidden
}
#cus-mask .iconfont{
  font-size: ${getRem(0.2)};
}
#cus-mask p,#cus-mask span{
 padding: 0;
 margin: 0;
}
.tool_bars{
 position: fixed;
 top:50%;
 right: 0;
 z-index: 9990;
 transform: translateY(-50%);
}
.tool_bar_jf{
 position: fixed;
 top: 80%;
 right: 0;
 z-index: 9990;
 transform: translateY(-50%);
}
.tool_bar{
 box-sizing: unset;
 display: flex;
 height:33px;
 width: max-content;
 align-items: center;
 justify-content: start;
 background: #f7bb10;
 padding-left: 2px;
 border-top-left-radius: 50%;
 border-bottom-left-radius: 50%;
 padding-right: 6px;
 color: #fff;
 font-size: ${getRem(0.1)};
 margin-bottom: ${getRem(0.1)};
 border-top: 1px solid #e8e8e8;
 border-bottom: 1px solid #e8e8e8;
 border-left: 1px solid #e8e8e8;
}


.wx_wrap .modal{
  display:none!important;
}


.tool_bar_jf{
 position: fixed;
 top: 80%;
 right: 0;
 z-index: 99901;
 transform: translateY(-50%);
}

.tool_bar_smzdm{
  position: fixed;
  top: 20%;
  z-index: 9991;
  transform: translateY(-50%);
 }


.tool_bar_farm{
  position: fixed;
  top: 28%;
  z-index: 9991;
  transform: translateY(-50%);
 }

.rightRadius{
  border-top-left-radius: unset;
  border-bottom-left-radius: unset;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  left: 0;
  padding-right:2px;
  padding-left:6px;
  border-left:unset;
  justify-content:end;
  border-right:1px solid #e8e8e8;
}

.tool_bar img,.tool_bar span{
 border-radius: 50%;
 border:1px solid #fff;
 width: 27px;
 height: 27px;
 line-height: 27px;
 text-align: center;
 display: block;
 font-size: 24px;
}

.cus-mask{
 position: fixed;
 top: -500vh;
 left: 50%;
 z-index: 9999;   
 transform: translate(-50%,-50%);
 -ms-transform: translate(-50%,-50%);
 -moz-transform: translate(-50%,-50%);
 -webkit-transform: translate(-50%,-50%);
 -o-transform: translate(-50%,-50%); 
}

.cus-mask_view{
 width: 90vw;
 background: #fff;
 border-radius: ${getRem(0.25)};
 overflow: hidden;
 color: #2e2d2d;
}
.cus-view{
 font-size: ${getRem(0.16)};
 font-family: PingFangSC-Semibold;
 text-align: center;
 padding: 0 ${getRem(0.13)} 0;
 position: absolute;
 top: ${getRem(0.1)};
 background: #fff;
 left: 50%;
 transform: translateX(-50%);
 z-index: 9991;
 display:flex;
 align-items: center;
 border-radius: ${getRem(0.1)};
 box-shadow: 0 2px 5px #ecc4d8;
}
.cus-content{
 font-family: PingFangSC-Regular;
 font-size: ${getRem(0.14)};
 line-height: ${getRem(0.22)};
 padding: ${getRem(0.25)} ${getRem(0.1)} 0;
 position: relative;
}
.cus-content label{
 color: rgba(0,0,0,.4);
 font-size: ${getRem(0.16)};
 margin-bottom: ${getRem(0.2)};
 display: block
}
.cus-content ul{
 padding-left: ${getRem(0.2)};
 color: rgba(0,0,0,.4);
 margin-top: ${getRem(0.1)};
 font-size: ${getRem(0.1)}
}
.cus-content li{
 list-style-type: cjk-ideographic;
}
.cus-footer{
 margin-top: ${getRem(0.09)};
 border-radius: ${getRem(0.1)};
 -webkit-box-shadow: 0 -${getRem(0.025)} ${getRem(0.05)} 0 rgb(0 0 0/10%);
 box-shadow: 0 -${getRem(0.025)} ${getRem(0.05)} 0 rgb(0 0 0/10%);
}
.cus-footer .abtn{
 display: inline-block;
 font-family: PingFangSC-Regular;
 font-size: ${getRem(0.15)};
 color: #2e2d2d;
 text-align: center;
 height: ${getRem(0.45)};
 line-height: ${getRem(0.45)};
 width: 100%;
 border-top: 1px solid #eaeaea;
}
.cus-footer span{
 font-size: ${getRem(0.15)};
}
.border-btn{
 border-left: 1px solid #eaeaea;
 border-top: 1px solid #eaeaea;
}
.cus-footer .btn-ok{
 color: #fff;
 background-image: -webkit-gradient(linear,left top,right top,from(#f7bb10),to(#ff4f18));
 background-image: -webkit-linear-gradient(left,#f7bb10,#ff4f18);
 background-image: -o-linear-gradient(left,#f7bb10,#ff4f18);
 background-image: linear-gradient(90deg,#f7bb10,#ff4f18);
 border-radius: 0 0 ${getRem(0.1)} 0;
}


#toast {
  position:fixed;
  list-style:none;
  padding:0;
  bottom:0;
  z-index:999999;
  font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size:14px;
  line-height:20px
}

#toast li {
  margin:0 0 10px 0;
  display:block;
  background-color:#fcf8e3;
  color:#c09853;
  border:1px solid #fbeed5;
  padding:5px 10px;
  border-radius:4px;
  -webkit-border-radius:4px;
  text-shadow:0 1px 0 rgba(255, 255, 255, 0.5);
  box-shadow:0 2px 5px rgba(0, 0, 0, .15);
  -webkit-box-shadow:0 2px 5px rgba(0, 0, 0, .15)
}

#toast li:first-child {
  margin-top:0
}

#toast li.danger {
  color:#b94a48;
  background-color:#f2dede;
  border-color:#eed3d7
}

#toast li.info {
  color:#3a87ad;
  background-color:#d9edf7;
  border-color:#bce8f1
}

#toast li.success {
  color:#468847;
  background-color:#dff0d8;
  border-color:#d6e9c6
}

#toast button.close {
  background:none;
  border:none;
  font-weight:bold;
  font-size:20px;
  line-height:20px;
  float:right;
  padding:0;
  margin:0 0 0 5px;
  color:rgba(0, 0, 0, .25);
  cursor:pointer
}

#toast h1, #toast h2, #toast h3, #toast h4 {
  display:inline
}

#account_list{
 border: 4px solid #f7bb10;
 border-radius: ${getRem(0.3)};
 height: ${getRem(3.69)};
 // min-height: ${getRem(1.98)};
 overflow-x: hidden;
 overflow-y: scroll;
 padding: ${getRem(0.06)} ${getRem(0.1)};
 box-sizing: border-box;
}
.cus-avatar{
  padding: ${getRem(0.05)};
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: ${getRem(0.2)};
  box-sizing: border-box;
  position: relative;
  margin-bottom: ${getRem(0.1)};
  height: ${getRem(0.5)};
}
.avatar_img{
 width:100%;
 height:100%;
 border-radius: 50%;
 font-size: ${getRem(0.1)};
 border: 1px solid #f7bb10;
 overflow: hidden;
 padding: ${getRem(0.1)};
 white-space: nowrap;
 background-size: contain;
 box-sizing: border-box;   
 position: absolute;
 z-index: 1; 
}
.cususer_info{
 margin-left: ${getRem(0.1)};
 display: flex;
 align-items: start;
 flex-direction: column;
 flex:1 0;
 width:30%;
 overflow: hidden;
}
.cus-icon{
 display: block;
 width: 5px;
 height: 5px;
 border-radius: 50%;
 border: 1px solid #52c41a;
 position: absolute;
 font-size: ${getRem(0.05)};
 right: ${getRem(0.15)};
 top: 50%;
 transform: translateY(-50%);
 text-align: center;
 line-height: ${getRem(0.3)};
 box-shadow: 0 0 4px #52c41a;
 animation: flash 2s linear infinite;
}
.cususer_info p {
 font-weight: bold;
 font-size: ${getRem(0.1)};
 line-height: 1.8;
}
.cususer_info span{
 font-weight: unset;
 color: #666;
 font-size: ${getRem(0.08)};
 line-height: 1.8;
 width: 100%;
 text-overflow: ellipsis;
 white-space: nowrap;
 overflow: hidden;
}
.not_content{
 text-align: center;
 height: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
}

.cus-err{
 border-color: red;
 animation: flashred 2s linear infinite;
 box-shadow: 0 0 4px red;
}

.cus-active{
 border-color: #91d5ff;
 box-shadow: 0 0 4px #91d5ff;
}

.cus-now_active{
 border-color: #a0d911;
 box-shadow: unset;
}

@keyframes flashred{
 0%{ box-shadow: 0 0 4px red}
 25%{ box-shadow: 0 0 6px red}
 50%{ box-shadow: 0 0 10px red}
 75%{ box-shadow: 0 0 6px red}
 100%{ box-shadow: 0 0 4px red}
}

@keyframes flash{
 0%{ box-shadow: 0 0 4px #52c41a}
 25%{ box-shadow: 0 0 6px #52c41a}
 50%{ box-shadow: 0 0 10px #52c41a}
 75%{ box-shadow: 0 0 6px #52c41a}
 100%{ box-shadow: 0 0 4px #52c41a}
}
.ant-tag{
font-size: ${getRem(0.08)} !important;
margin-right:${getRem(0.3)} !important;
}
.ant-tag-cyan{
 color: #ffa39e !important;
}
.ant-tag-magenta{
 color: #adc6ff !important;
}

.cus_input {
 border: none;
 background: none;
 flex: 1 0;
}
#cu_search{
 display: flex;
 height: ${getRem(0.25)};
 align-items: center;
}
.input{
 display: inline-block;
 width: 100%;
 border: none;
 background: #fff;
 font-size: ${getRem(0.1)};
 -webkit-box-align: center;
 line-height: ${getRem(0.32)};
 padding-left: 10px;
 box-sizing: border-box;
 border-radius: ${getRem(0.1)};
 height: ${getRem(0.32)};
 overflow: hidden;
}
.cu_search_input{
 display: flex;
}
#cus_cancel{
 font-weight: unset;
 margin-left: 3px !important;
 white-space: nowrap;
 font-size: ${getRem(0.1)};
}
.hidden {
 display: none !important;
}
#cus-mask .ant-ribbon {
 box-sizing: border-box;
 margin: 0 5px 0 0;
 color: #eb2f96;
 border-radius: 50%;
 opacity: 0.5;
 text-align: center;
 display:inline-block;
 transform: scale(0.7);
}
.avatar_container{
 position: relative;
 width: ${getRem(0.35)};
 height: ${getRem(0.35)};
 margin-left: ${getRem(0.05)};
}
.isPlus{
 width: ${getRem(0.4)};
 z-index:99;
 height: ${getRem(0.4)};
 position: absolute;
 left: -1px;
 top: -3px;
 pointer-events: none;
 background:url(https://img12.360buyimg.com/img/s115x118_jfs/t1/127010/39/7866/7131/5f18f9afE8e5c1d37/1713cb8c5a329d3f.png) no-repeat scroll 50%/cover
}
.avatar_img img{
 min-width: 1px;
 min-height: 1px;
 border-radius: 50%;
 width: 100%;
 height: auto;
 transform: translate3d(-50%,-50%,0);
 position: absolute;
 left: 50%;
 top: 50%;
 z-index:1;
}
.plus .avatar_img{
 border:none;
}
.jinfen_group li{
 margin-bottom:10px;
 list-style-type:none !important;
 display:flex;
 font-size: 14px;
}

.jinfen_group .iconfont{
 font-size: 18px;
}

.jinfen_group li span{
 margin-right:10px;
}

.jinfen_group li s{
  color: #888;
  transform: scale(0.7);
}

.jinfen_group .price{
 color:#f5222d !important;
}

.jinfen_group .commission{
 color: #faad14 !important;
}

.jinfen_group .coupon,.jinfen_group .coupon a{
 color: #13c2c2 !important;
}

.jinfen_group .cart,.jinfen_group .cart a{
 color: #1890ff !important;
}

.mask{
 position:fixed;
 width:100%;
 height:100%;
 top:0;
 left:0;
 z-index:9998;
 background:rgba(0,0,0,.2);
 display:none;
}
#edit-row {
 display:none;
}
.edit-form{
 position: absolute;
 width:100%;
 height:100%;
 z-index:9999;
 background: #fff;
 border-radius: ${getRem(0.25)};
 overflow: hidden;
 color: #2e2d2d;
 bottom: -500vh;
 box-sizing: border-box;
}
.edit-form .form-title{
 padding: 10px;
 height: 45px;
 text-align: center;
 font-size: 16px;
 color: #333;
 background:linear-gradient(180deg,#fff,#efefef);
 box-sizing: border-box;
}
#tool-bars-left{
  left:0;
  top:20%;
  width: fit-content;
  height: fit-content;
}

#eidt-form{
 padding:0 10px;
}
#cus-mask p.form-item{
 font-size: 12px;
 padding: 12px 10px 12px 75px;
 position: relative;
 box-sizing: border-box;
}
.form-item-label:after{
 content: "";
 position: absolute;
 z-index: 1;
 pointer-events: none;
 background-color: #cbcbcb;
 height: 1px;
 left: 0;
 right: 0;
 bottom: 0;
}
.form-item-label span{
 width: 65px;
 line-height: 1;
 position: absolute;
 top: 15px;
 left: 0;
 right: 0;
 margin: auto 0;
 padding: 0 10px;
 font-size: 14px;
 color: #999;
}
.form-item-input{
 height: 20px;
 line-height: normal;
 border: 0 none;
 font-size: 14px;
 width: 100%;
 -webkit-appearance: none;
 vertical-align: top;
 color: #333;
}
.form-container{
 position:relative;
 height:calc(100% - 45px)
}
.form-container .cus-footer{
 position: absolute;
 width:100%;
 bottom:0;
}
b.beanNum{
 color:#ef3620 !important;
 margin-right: 0 !important;
}
.beanNumValue{
 margin-right: ${getRem(0.15)};
}
.beanNumValue{
 display:flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
}

.hb_process{
 float:left;
 display: flex;
 align-items: center;
 width:${getRem(0.53)};
}

.hb_process img{
 width: 12px;
 height: 12px;
 border-radius:2px;
}

.async,.check{
  position:absolute;
  width:24px;
  height:24px;
  border-radius: 50%;
  z-index:99
}

.async{
right: 2px;
top: 50%;
background: #f7bb10;
}

.async img,.check img{
  width:100%;
  height:100%;
  filter: invert(100%) sepia(5%) saturate(7500%) hue-rotate( 
   170deg) brightness(106%) contrast(102%);
}

.loading{
animation: loading 2s linear infinite;
animation-play-state:running;
}
@-webkit-keyframes loading {
from {
  -webkit-transform: rotate(0deg);
}
to {
  -webkit-transform: rotate(360deg);
}
}
</style>
`;
}
const accounts = cookiesRemark
  .map((n, e) => {
    const t = "正常" === n.status;
    const beanNum = n.beanNum
      ? `<b class="ant-ribbon beanNum">京豆：${n.beanNum}</b>`
      : "";
    return `
<div class="cus-avatar" data-value="${n.mobile || ""}" data-name="${
      n.username
    }">

<div class="avatar_container ${"1" === n.isPlusVip ? "plus" : ""}">
 <div class="avatar_img">
   <img src="${
     n.avatar ||
     "//img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png"
   }" alt="${n.username}" />
 </div>
 ${"1" === n.isPlusVip ? `<div class="isPlus"></div>` : ""}
</div>
<div class="cususer_info">
  <p>${decodeURIComponent(n.nickname)}</p>
  <span><b class="ant-ribbon">${e + 1}</b>${n.username}</span>
</div>

<div class="beanNumValue">
 ${beanNum}  
 <div class="fruit_pet">
   ${
     n.fruit
       ? `<div class="hb_process">
   <img src="https://raw.githubusercontent.com/Former-Years/icon/master/jdnc.png" alt="fruit" />
   <b class="ant-ribbon beanNum">${parseInt(n.fruit)}%</b>
 </div>`
       : ""
   }
   ${
     n.jdPet
       ? `<div class="hb_process">
   <img src="https://raw.githubusercontent.com/Former-Years/icon/master/jdmc.png" alt="pet" />
   <b class="ant-ribbon beanNum">${parseInt(n.jdPet)}%</b>
 </div>`
       : ""
   }
 </div>
</div>
<span class="cus-icon ${t ? "" : "cus-err"}"></span>
</div>`;
  })
  .join("");

function createHTML() {
  return `
<div id="cus-mask" class="cus-mask">
<div class="edit-form">
   <h3 class="form-title" id="form-title"></h3>
   <div class="form-container">
     <form id="eidt-form"></form>
     <div class="cus-footer">
       <div class="btn-wrap" style="display: flex">
         <span class="abtn" id="form-cancel">取消</span>
         <span class="abtn btn-ok" id="form-ok">确定</span>
       </div>
     </div>
   </div>
</div>
<div class="cus-mask_view">
 <div class="cus-content">
   <div class="async">
      <img src="https://img.icons8.com/ios/72/circled-play--v1.png" alt="助手检测"/>
   </div>
   <div class="cus-view">
     <div id="cu_search_input" class="cu_search_input input hidden">
        <input placeholder="请输入昵称" type="text" class="cus_input"/>
        <span id="cu_search_close" class="iconfont icon-close"></span>
     </div>
     <span id="cus_cancel" class="hidden">取消</span>
    <div id="cu_search">
       <span id="cus-username">京东账号列表</span>
       <span class="iconfont icon-search"></span>
     </div>
   </div>
   <div id="account_list">
       ${
         accounts.length
           ? accounts
           : '<div class="not_content">未找到账号</div>'
       }
   </div>
 </div>
 <div class="cus-footer">
     <div class="btn-wrap" style="display: flex">
       <span class="abtn iconfont icon-bianji" id="edit-row"></span>
       <span class="abtn border-btn iconfont icon-dengchu" id="clear-ck"></span>
       <span class="abtn border-btn iconfont icon-fuzhi" id="copyCk"></span>
       <span class="abtn border-btn iconfont icon-shouye" id="fill-input" style="display:none"></span>
       <span class="abtn btn-ok iconfont ${
         isLogin ? "icon-denglu" : "icon-zhuanhuan"
       }" id="cus-mask-ok" ></span>
     </div>
 </div>
</div>
</div>
<div class="cus-mask" id="jf_mask">
 <div class="cus-mask_view" style="overflow: hidden;"></div>
</div>

<div class="tool_bars tool-left" id="tool-bars-left"></div>

<div class="tool_bars tool-right" id="tool-bars">
  <div id="boxjs" class="tool_bar">
    <img  src="https://raw.githubusercontent.com/chavyleung/scripts/master/BOXJS.png" />
  </div>
</div>
<div id="mask" class="mask"></div>
<ul id="toast" style="display: none;left: 50%;transform: translateX(-50%);"></ul>
`;
}

function createScript() {
  return `

<script type="text/javascript">
  (function($Query){
    var pk = getCookie("pt_key");
    var pp = decodeURIComponent(getCookie("pt_pin"));
    
    var isLogin = window.location.href.indexOf("/login/login")>-1;
    let jd_ck = ${JSON.stringify(cookiesRemark)};


    let defaultUserName = getQueryVariable("ptKey");  
    if(defaultUserName) {
      window.history.replaceState(null,"",window.location.href.replace("ptKey="+defaultUserName,""))
      btnSubmit(decodeURIComponent(defaultUserName));
    }

    console.log(jd_ck)
    registerClick();

    $Query("#cu_search").on("click",function(){
      $Query(this).toggleClass("hidden");
      $Query("#cus-username").toggleClass("hidden");
      $Query("#cu_search_input").toggleClass("hidden");
      $Query("#cus_cancel").toggleClass("hidden");
    })

    $Query("#cus_cancel").on("click",function(){
      $Query("#cu_search").click();
      $Query("#cu_search_close").click();
      registerClick();
    })

    $Query("#cu_search_close").on("click",function(){
      $Query("#cu_search_input input")[0].value="";
      $Query("#account_list").html(getAccountList(jd_ck));
      registerClick();
    })

    function getAccountList(cks){
    return  cks.map((item,index) => {
    const status = item.status === '正常';
    const beanNum = item.beanNum? \`<b class="ant-ribbon beanNum">京豆：\${item.beanNum}</b>\`:'';
    return \`
    <div class="cus-avatar" data-value="\${item.mobile||''}" data-name="\${item.username}">
    <div class="avatar_container \${item.isPlusVip==='1' ? 'plus' : ''}">
      <div class="avatar_img">
        <img src="\${
          item.avatar ||
          '//img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png'
        }" alt="\${item.username}" />
      </div>
      \${item.isPlusVip==='1' ? \`<div class="isPlus"></div>\` : ''}
    </div>

    <div class="cususer_info">
      <p>\${decodeURIComponent(item.nickname)}</p>
      <span><b class="ant-ribbon">\${index + 1}</b>\${item.username}</span>
    </div>
    <div class="beanNumValue">
      \${beanNum}
      <div class="fruit_pet">
      \${
        item.fruit
          ? \`<div class="hb_process">
      <img src="https://raw.githubusercontent.com/Former-Years/icon/master/jdnc.png" alt="fruit" />
      <b class="ant-ribbon beanNum">\${parseInt(item.fruit)}%</b>
    </div>\`
          : ''
      }
      \${
        item.jdPet
          ? \`<div class="hb_process">
      <img src="https://raw.githubusercontent.com/Former-Years/icon/master/jdmc.png" alt="pet" />
      <b class="ant-ribbon beanNum">\${parseInt(item.jdPet)}%</b>
    </div>\`
          : ''
      }
    </div>
    </div>
    <span class="cus-icon \${status ? '' : 'cus-err'}"></span>
    </div>\`;
    }).join('')
    }

    let timer = null;
    $Query("#cu_search_input input").on('input',function(event){
      console.log(event)
      const value = event.target.value;
      if(!value) return;
      let newList = [];
      if(timer) clearTimeout(timer);
      timer = setTimeout(()=>{ 
        newList = jd_ck.filter(item=>item.username.indexOf(value)>-1 || item.nickname.indexOf(value)>-1)
        if(!newList.length) return;
        $Query("#account_list").html(getAccountList(newList));
        registerClick()
      },500);
    })


    const avatarItem = jd_ck.find(item=> item.username === pp);
    if(avatarItem && avatarItem.avatar){
      $Query('#boxjs').html("<img src='"+ avatarItem.avatar +"' />");
    }

    if(pk === "" || !pk){
      $Query("#copyCk").hide();
      $Query("#clear-ck").hide();
    }

    if(pp){
        $Query("#cus-username").html(pp)
        var preIndex = null;
        var nextIndex = null;
        var current = null
        jd_ck.forEach((item,index)=>{
          if(decodeURIComponent(item.username) === pp){
            current = index;
            preIndex = index !== 0 ? index - 1 : null;
            nextIndex = index !== jd_ck.length - 1 ? index + 1 : null;
          }
        })
        if(preIndex!==null){
          $Query("#boxjs").before('<div id="preCK" class="tool_bar"><span class="iconfont icon-shangjiantou" /></div>')
        }
        if(nextIndex!==null){
          $Query("#boxjs").after('<div id="nextCK" class="tool_bar"><span class="iconfont icon-xiajiantou" /></div>')
        }
        if(current) animateScroll(current);
    };

    function animateScroll(key) {
      try{
      if($Query('.cus-now_active').position()) $Query("#account_list").animate({scrollTop: $Query('.cus-now_active').position().top - $Query('.cus-now_active').height() * 4 },1000);
      }catch(e){console.log(e)}
    }

    var preCK = $Query("#preCK");
    var nextCK = $Query("#nextCK");
    if(preCK){
      preCK.on('click',function() {
        if(preIndex !== null) changeIndex(preIndex);
      });
    }

    if(nextCK){
      nextCK.on('click',function() {
        if(nextIndex !== null) changeIndex(nextIndex);
      });
    }

    function changeIndex(key){
        $Query('.cus-avatar').attr("id","");
        $Query('.cus-avatar').attr("class","cus-avatar");
        $Query('.cus-avatar').each(function(index){
          if(index === key){
            $Query(this).addClass("cus-active");
            $Query(this).attr("id","jd_account");
          }
        })
        btnSubmit();
    }

    $Query(document).on('click','.cus-avatar',function(){
      $Query('.cus-avatar').removeClass("cus-active");
      $Query('.cus-avatar').attr("id","");
      $Query(this).attr("id","jd_account");
      $Query(this).addClass("cus-active");
      $Query("#edit-row").show();
      $Query("#form-title").html($Query(this).data('name'));
      $Query("#fill-input").hide();
      if($Query(this).data("value"))$Query("#fill-input").show();
    })

    $Query("#fill-input").on('click',function(){
      if(isLogin) fillInput();
      const mobile = $Query('#jd_account').data('value');
      copyToClip(mobile,'手机号复制成功')
    })

    $Query("#clear-ck").on('click',function(){
      sessionStorage.clear();
      localStorage.clear();
      setCookie('pt_key',"");
      setCookie("pt_pin","");
      window.location.reload();
    })

      function registerClick(){
        $Query('.cus-avatar').each(function(){
          const username = $Query(this).data('name') + '';
          if(username === pp) $Query(this).addClass("cus-now_active");
        })
      }
      
      const $container = $Query("#tool-bars");
      var nx,
        ny,
        wxX,
        wxY,
        isDown = false; //X Y坐标
      // H5页面
      $Query("#boxjs")
        .bind("touchstart", function (e) {
          //点击触发
          e.preventDefault();
          $Query(this).css("transform", "translate(0)");
          var touch = event.targetTouches[0];
          wxX = touch.clientX;
          wxY = touch.clientY;
          isDown = true;
          $Query(document).bind("touchmove", function (ev) {
            if (!isDown) return;
            //滑动触发
            e.preventDefault();

            var touch = event.targetTouches[0];
            ny = touch.clientY;
            nx = touch.clientX;
            $container.css("top", ny / ($Query(window).height() / 100) + "%");
          });
        })
        .bind("touchend", function (e) {
          //移开触发
          var touch = event.changedTouches[0];
          //判断跟初始坐标是否一致，一致则大概率为点击事件
          if (wxX === touch.clientX && wxY === touch.clientY) {
            maskVisible(true);
          } else {
            if ($Query(window).height() * 0.9 - $container.height() < ny) {
              $container.css({top: "90%"});
            } else if ($Query(window).height() * 0.1 > ny) {
              $container.css({ top: "12%" });
            }
          }
          isDown = false; //$Query('.service_s').hide()
        });

      $Query("#cus-mask-ok").on('click', function(){
        btnSubmit();
      });

      const form_field = {
          "avatar": {
              "label": "头像",
              "remark": "请输入头像链接"
          },
          "nickname": {
              "label": "姓名"
          },
          "mobile": {
              "label": "手机号"
          },
          "paymentCode": {
            "label": "支付密码"
          },
          "cardId": {
              "label": "身份证",
              "remark": "请输入身份证前两位和后四位"
          },
          "isPlusVip": {
              "label": "VIP",
              "remark": "1vip ，0 非 vip"
          },
          "qywxUserId": {
              "label": "企业微信",
              "remark": "企业微信 ID&（all 推送所有）"
          }
      };

      $Query("#edit-row").on('click',function(){
        $Query(".edit-form").show();
        $Query(".edit-form").animate({bottom:0});
        const selectPin = $Query("#jd_account").data("name")+'';
        const current = jd_ck.find(item=>item.username === \`\${selectPin}\`);
        if(!current)return;
        let form_html = \`
              <input 
                type="hidden"
                name="userName" 
                class="form-item-input" 
                value="\${selectPin}" 
              />
          \`;
        Object.keys(form_field).forEach((name)=>{
          const field = form_field[name];
          form_html+=\`<p class="form-item">
                        <label class="form-item-label" for="\${name}">
                          <span>\${field.label}</span>
                          <input 
                              name="\${name}" 
                              class="form-item-input" 
                              value="\${current[name]||""}" 
                              placeholder="\${field.remark||"请输入"}"
                          />
                        </label>
                      </p>\`
        })
        $Query("#eidt-form").html(form_html);
      });
      
      $Query('#form-ok').on('click',function(){
        const updateArr = $Query('#eidt-form').serializeArray();
        let updateItem = {};
        updateArr.forEach((item)=>{
          updateItem[item.name]=item.value;
        })
        const new_jd_ck = []
        const formValue = jd_ck.map((item,index)=>{
            const {wskey,cookie,userName,...temp} = item;
            if(item.userName === updateItem.userName){
              updateItem = {...temp , ...updateItem};
              new_jd_ck.push({...item , ...updateItem});
              return { index , ...updateItem}
            }
            new_jd_ck.push(item);
            return { index, ...temp}
        });
        
        const val = JSON.stringify(formValue, null, \`\t\`);
        $Query.ajax({
          method:"post",
          url:"//boxjs.${boxjs_host}/api/saveData/",
          data:JSON.stringify({key:"@jd_ck_remark.remark",val:val}),
          contentType:'application/x-www-form-urlencoded; charset=UTF-8',
          success:(response)=>{
            jd_ck = new_jd_ck;
            $Query("#account_list").html(getAccountList(jd_ck))
            registerClick()
            cusShowToast('保存成功',()=>{
              formHide();
              $Query("#edit-row").hide();
            })
          }
        })
      })

      function formHide(){
        $Query('.edit-form').animate({bottom:"-500vh"},function(){
          $Query(".edit-form").hide();
        });
      }

      $Query('#form-cancel').on('click',function(){
        formHide();
      })

      $Query("#copyCk").on('click',function(){
        const username = $Query(".cus-active").data("name")+'';
        const copyValue = jd_ck.find(item=>item.userName===username);
        copyToClip(copyValue.cookie,\`\${copyValue.nickname||username}-CK复制成功\`);
      })
      
      function cusShowToast(message,callback){
        $Query("#toast").html(\`<li class="info">\${message}</li>\`).fadeIn();
        setTimeout(function() {
          $Query("#toast").html("").fadeOut();
          if(callback)callback()
        },2000);
      }

      function maskVisible(visible){
        if(visible){
          $Query('#mask').show();
        }
        $Query('#cus-mask').animate({top:visible?"50%":"-500vh"},function(){
          if(!visible){
            $Query('#mask').hide();
            $Query('.edit-form').hide();
            $Query('.edit-form').animate({bottom:"-500vh"});
          }
        });
      }

      function fillInput(){
        const sbBtn = $Query('#jd_account');
        const cuMobile = sbBtn.data('value');
        console.log('快速填充号码：'+ cuMobile);
        const input = document.getElementsByClassName('acc-input mobile J_ping')[0];
        input.value = cuMobile;
        ev = document.createEvent("HTMLEvents");
        ev.initEvent("input", true,false );
        input.dispatchEvent(ev);
        maskVisible(false);
      }

      function clearAllCookie() {
          var keys = document.cookie.match(/[^ =;]+(?=\\=)/g);
          if (keys) {
              for (var i = keys.length; i--;){
                document.cookie = keys[i] + '=;path=/;domain=.jd.com;expires=' + new Date(0).toUTCString()
              }
          }
      }

    function btnSubmit(ptKey=false){
      let cuName;

      if(!ptKey){
        const sbBtn = $Query('#jd_account');
        if(!sbBtn) return alert("请选择需要登陆的账号");
        cuName = sbBtn.data('name');
      }
      
      const userName = ptKey||cuName;
      const login_ck = jd_ck.find(item=>item.username===\`\${userName}\`);
      if(!login_ck) return alert("未找到相关账号");

      let [ pt_key , pt_pin ] = login_ck.cookie.split(";");
      pt_key = pt_key.split("=");
      pt_pin = pt_pin.split("=");
      clearAllCookie();
      setCookie(pt_key[0],pt_key[1]);
      setCookie(pt_pin[0],pt_pin[1]);
      window.location.reload();
    }


    function setCookie(cname,cvalue){
        var ed = new Date();
        const mt = ed.getMonth()+1;
        ed.setMonth(mt);
        var expires = "expires="+ed.toGMTString();
        var after = window.location.host.split(".");
        after = after[after.length-1];
        document.cookie = cname+"="+cvalue+"; "+expires+"; path=/; domain=.jingxi.com";
        document.cookie = cname+"="+cvalue+"; "+expires+"; path=/; domain=.jd.com";
        document.cookie = cname+"="+cvalue+"; "+expires+"; path=/; domain=.jd." + after;
    }

    function getQueryVariable(variable){
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
              var pair = vars[i].split("=");
              if(pair[0] == variable){return pair[1];}
      }
      return false;
    }

    function getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
        }
        return "";
    }


    function copyToClip(text,notify=false){
      navigator.clipboard.writeText(text);
      if(notify)cusShowToast(notify);
    }

    $Query('#mask').on('click',function(){
      $Query("#jf_mask,#cus-mask").animate({top:"-500vh"},function(){
        formHide();
        $Query('#mask').hide();
      }) 
    })

    function runBoxJSScript(url,callback){
    const body = {"url":url,"isRemote":true};
    $Query.ajax({
      method:"post",
      timeout: 10000,
      url:"//boxjs.${boxjs_host}/api/runScript",
      data:JSON.stringify(body),
      contentType:'application/x-www-form-urlencoded; charset=UTF-8',
      success:callback
    })
    }

    $Query('.async').on('click',function(){
      const qlConfig = \`${qlConfig}\`
      if(qlConfig){
        $Query('.async').addClass('loading');
        runBoxJSScript('https://raw.githubusercontent.com/dompling/Script/master/jd/ql_sync_box.js',(result)=>{
          console.log(result)
          $Query('.async').removeClass('loading');
          cusShowToast("账号数据刷新成功",()=>{
            if(result) window.location.reload();
          })
        });
      }else{
        $Query('.async').addClass('loading');
        runBoxJSScript('https://raw.githubusercontent.com/dompling/Script/master/jd/jd_cookie_search.js',(res)=>{
          $Query('.async').removeClass('loading');
          cusShowToast("账号数据刷新成功",()=>{
            if(res) window.location.reload();
          })
        })
      }
      })

    if(avatarItem){
      const extraAction = ${JSON.stringify(extraAction)};
      extraAction.forEach(item=>{
        if(item.url.indexOf("3KSjXqQabiTuD1cJ28QskrpWoBKT")>-1) item.color = avatarItem.fruit.indexOf('100')!==-1?"#3ccab5":"#f8eed7";
        if(!item.where||(item.where&&location.origin.indexOf(item.where)>-1)){
          $Query("#tool-bars-left").append(\`
          <div class="tool_bar rightRadius" style="background:\${item.color||'#f7bb10'}" data-url="\${item.url}">
            <img src="\${item.icon}" />
          </div>\`)
        }
      })
    }

    $Query('.tool_bar.rightRadius').on('click',function(){
      const url = $Query(this).data('url');
      copyToClip('${$.url}','链接复制成功');
      window.open(url+'?ptKey=' + encodeURIComponent(getCookie(\`pt_pin\`)));
    })
  }($Query))

<\/script>
`;
}

function createHeader() {
  return `
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
  <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_2100531_8vma5eluuga.css" charset="utf-8"/>
  <script type="text/javascript" src="https://cdn.staticfile.org/jquery/1.10.0/jquery.min.js"><\/script>
  <script>
    if(window.$) {
      window.$Query=window.$;
      delete window.$
    }
  </script>
  <script src="//cdn.bootcdn.net/ajax/libs/eruda/2.5.0/eruda.min.js"><\/script>
  <script>
  
  var eruda_show = localStorage.getItem("eruda_show")||"0";
  if (eruda_show === "1") {
    window.eruda && eruda.init();
  }
  // 记录点击次数
  var clickCount = 0,initCount = 0;
  // 设置连点监听
  $Query(document).on('click', function() {
      clickCount++;
      if(initCount){
      clearTimeout(initCount)
      initCount = null
      }
      initCount = setTimeout(function() {
        clickCount = 0
      }, 200)
      if(clickCount === 3) showConsole();
  })
  
  function showConsole() {
    if (eruda_show === "0"){
      $Query('.tool-right').animate({right:"0"},1000);
      $Query('#tool-bars-left').animate({left:"0"},1000);
      window.eruda && eruda.init();
      eruda_show = "1"
    }else{
      $Query('.tool-right').animate({right:"-100px"},1000);
      $Query('#tool-bars-left').animate({left:"-100px"},1000);
      window.eruda && eruda.destroy();
      eruda_show = "0"
    }
    localStorage.setItem("eruda_show",eruda_show)
  }
  </script>`;
}

(async () => {
  if (typeof $.html === "string" && $.html.indexOf("</body>") > -1) {
    
    $.info(`重写URL：${$.url}`);
    const n = createStyle(),
      e = createScript(),
      t = createHTML(),
      i = `\n${n}\n${t}\n${e}\n`;

    $.html = $.html.replace("$.downloadAppPlugInOpenApp", "console.log");

    const headerTag = createHeader();
    $.html = $.html.replace(/(<head>)/, `$1${headerTag}`);
    if ($.url.indexOf(`h5.m.jd.com`) !== -1) {
      $.html = $.html.replace(/(<\/title>)/, `$1${i}`);
    } else {
      $.html = $.html.replace(/(<\/body>)(?![\s\S]*\1)/, `${i}$1`);
    }
  } else {
    $.done({ body: $.html });
  }
})()
  .catch((n) => {
    $.error(`错误URL：${$.url}\n错误信息：${JSON.stringify(n)}`);
  })
  .finally(() => {
    $.done({ body: $.html });
  });


/* prettier-ignore */
function ENV(){const isJSBox=typeof require=="function"&&typeof $jsbox!="undefined";return{isQX:typeof $task!=="undefined",isLoon:typeof $loon!=="undefined",isSurge:typeof $httpClient!=="undefined"&&typeof $utils!=="undefined",isBrowser:typeof document!=="undefined",isNode:typeof require=="function"&&!isJSBox,isJSBox,isRequest:typeof $request!=="undefined",isScriptable:typeof importModule!=="undefined",isShadowrocket:"undefined"!==typeof $rocket,isStash:"undefined"!==typeof $environment&&$environment["stash-version"]}}
/* prettier-ignore */
function HTTP(defaultOptions={baseURL:""}){const{isQX,isLoon,isSurge,isScriptable,isNode,isBrowser,isShadowrocket,isStash,}=ENV();const methods=["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"];const URL_REGEX=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;function send(method,options){options=typeof options==="string"?{url:options}:options;const baseURL=defaultOptions.baseURL;if(baseURL&&!URL_REGEX.test(options.url||"")){options.url=baseURL?baseURL+options.url:options.url}if(options.body&&options.headers&&!options.headers["Content-Type"]){options.headers["Content-Type"]="application/x-www-form-urlencoded"}options={...defaultOptions,...options};const timeout=options.timeout;const events={...{onRequest:()=>{},onResponse:(resp)=>resp,onTimeout:()=>{},},...options.events,};events.onRequest(method,options);let worker;if(isQX){worker=$task.fetch({method,...options})}else if(isLoon||isSurge||isNode||isShadowrocket||isStash){worker=new Promise((resolve,reject)=>{const request=isNode?require("request"):$httpClient;request[method.toLowerCase()](options,(err,response,body)=>{if(err)reject(err);else resolve({statusCode:response.status||response.statusCode,headers:response.headers,body,})})})}else if(isScriptable){const request=new Request(options.url);request.method=method;request.headers=options.headers;request.body=options.body;worker=new Promise((resolve,reject)=>{request.loadString().then((body)=>{resolve({statusCode:request.response.statusCode,headers:request.response.headers,body,})}).catch((err)=>reject(err))})}else if(isBrowser){worker=new Promise((resolve,reject)=>{fetch(options.url,{method,headers:options.headers,body:options.body,}).then((response)=>response.json()).then((response)=>resolve({statusCode:response.status,headers:response.headers,body:response.data,})).catch(reject)})}let timeoutid;const timer=timeout?new Promise((_,reject)=>{timeoutid=setTimeout(()=>{events.onTimeout();return reject(`${method}URL:${options.url}exceeds the timeout ${timeout}ms`)},timeout)}):null;return(timer?Promise.race([timer,worker]).then((res)=>{clearTimeout(timeoutid);return res}):worker).then((resp)=>events.onResponse(resp))}const http={};methods.forEach((method)=>(http[method.toLowerCase()]=(options)=>send(method,options)));return http}
/* prettier-ignore */
function API(name="untitled",debug=false){const{isQX,isLoon,isSurge,isScriptable,isNode,isShadowrocket,isStash,isJSBox}=ENV();return new(class{constructor(name,debug){this.name=name;this.debug=debug;this.http=HTTP();this.env=ENV();this.node=(()=>{if(isNode){const fs=require("fs");return{fs}}else{return null}})();this.initCache();const delay=(t,v)=>new Promise(function(resolve){setTimeout(resolve.bind(null,v),t)});Promise.prototype.delay=function(t){return this.then(function(v){return delay(t,v)})}}initCache(){if(isQX)this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}");if(isLoon||isSurge||isStash||isShadowrocket)this.cache=JSON.parse($persistentStore.read(this.name)||"{}");if(isNode){let fpath="root.json";if(!this.node.fs.existsSync(fpath)){this.node.fs.writeFileSync(fpath,JSON.stringify({}),{flag:"wx"},(err)=>console.log(err))}this.root={};fpath=`${this.name}.json`;if(!this.node.fs.existsSync(fpath)){this.node.fs.writeFileSync(fpath,JSON.stringify({}),{flag:"wx"},(err)=>console.log(err));this.cache={}}else{this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`))}}}persistCache(){const data=JSON.stringify(this.cache,null,2);if(isQX)$prefs.setValueForKey(data,this.name);if(isLoon||isSurge||isStash||isShadowrocket)$persistentStore.write(data,this.name);if(isNode){this.node.fs.writeFileSync(`${this.name}.json`,data,{flag:"w"},(err)=>console.log(err));this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},(err)=>console.log(err))}}write(data,key){this.log(`SET ${key}`);if(key.indexOf("#")!==-1){key=key.substr(1);if(isLoon||isSurge||isStash||isShadowrocket){return $persistentStore.write(data,key)}if(isQX){return $prefs.setValueForKey(data,key)}if(isNode){this.root[key]=data}}else{this.cache[key]=data}this.persistCache()}read(key){this.log(`READ ${key}`);if(key.indexOf("#")!==-1){key=key.substr(1);if(isLoon||isSurge||isStash||isShadowrocket){return $persistentStore.read(key)}if(isQX){return $prefs.valueForKey(key)}if(isNode){return this.root[key]}}else{return this.cache[key]}}delete(key){this.log(`DELETE ${key}`);if(key.indexOf("#")!==-1){key=key.substr(1);if(isLoon||isSurge||isStash||isShadowrocket){return $persistentStore.write(null,key)}if(isQX){return $prefs.removeValueForKey(key)}if(isNode){delete this.root[key]}}else{delete this.cache[key]}this.persistCache()}notify(title,subtitle="",content="",options={}){const openURL=options["open-url"];const mediaURL=options["media-url"];if(isQX)$notify(title,subtitle,content,options);if(isSurge){$notification.post(title,subtitle,content+`${mediaURL?"\n多媒体:"+mediaURL:""}`,{url:openURL})}if(isLoon||isStash||isShadowrocket){let opts={};if(openURL)opts["openUrl"]=openURL;if(mediaURL)opts["mediaUrl"]=mediaURL;if(JSON.stringify(opts)==="{}"){$notification.post(title,subtitle,content)}else{$notification.post(title,subtitle,content,opts)}}if(isNode||isScriptable){const content_=content+(openURL?`\n点击跳转:${openURL}`:"")+(mediaURL?`\n多媒体:${mediaURL}`:"");if(isJSBox){const push=require("push");push.schedule({title:title,body:(subtitle?subtitle+"\n":"")+content_,})}else{console.log(`${title}\n${subtitle}\n${content_}\n\n`)}}}log(msg){if(this.debug)console.log(`[${this.name}]LOG:${this.stringify(msg)}`)}info(msg){console.log(`[${this.name}]INFO:${this.stringify(msg)}`)}error(msg){console.log(`[${this.name}]ERROR:${this.stringify(msg)}`)}wait(millisec){return new Promise((resolve)=>setTimeout(resolve,millisec))}done(value={}){if(isQX||isLoon||isSurge||isStash||isShadowrocket){$done(value)}else if(isNode&&!isJSBox){if(typeof $context!=="undefined"){$context.headers=value.headers;$context.statusCode=value.statusCode;$context.body=value.body}}}stringify(obj_or_str){if(typeof obj_or_str==="string"||obj_or_str instanceof String)return obj_or_str;else try{return JSON.stringify(obj_or_str,null,2)}catch(err){return"[object Object]"}}})(name,debug)}
