var result_data={},result_data_len=0,site_version="0.1",site_loaded=0,initial_decrypt_load=1,path_def={DATABASE:"6e6973746576696e6f726d616c6e692e",DATA:"44454a5441",METADATA_FILE:"m",COVER_IMAGE_FILE:"c"},qs=t=>document.querySelector(t),sqa=t=>document.querySelectorAll(t);function backtrackQuick(t,e,r,a=0){return t[e]==r?t:t.backtrack(function(t){if(t[e]instanceof Array&&"object"==typeof t[e]){if(t[e].join(" ").includes(r))return t}else if("string"==typeof t[e]&&t[e].includes(r)||t[e]==r)return t;return null},a)}function str_isolate(t,e=" 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",r=!1){var a="";for(i=0,j=t.length;i<j;i++){var n=t[i];!1==r&&-1!==e.indexOf(n)?a+=n:!0==r&&-1===e.indexOf(n)&&(a+=n)}return a}function array_remove_value(t,e){var r=[];for(var a of t)e!=a&&(r[r.length]=a);return r}function bin2hex(t=null){if(null==t)return null;var e=t.length,r="";for(let a=0;a<e;a++){var n=t.charCodeAt(a).toString(16);2>n.length&&(n="0"+n),r+=n}return r}function hex2bin(t=null){if(null==t)return null;var e=(t=t.toLowerCase()).length;if(e%2)return -1;for(let r=0;r<e;r++){var a=Number(t.charCodeAt(r));if(!(a>47&&a<58||a>96&&a<103))return -2}var n="";for(let o=0;o<e;o+=2)n+=String.fromCharCode(parseInt(t.substr(o,2),16));return n}function xhr_fix_bytes(t){for(var e=(t=t.split("")).length,r=0;r<e;r++){var a=bin2hex(t[r]);a.length>2&&(a=a.substr(2,2),t[r]=hex2bin(a))}return t.join("")}Element.prototype.qs=function(t){return this.querySelector(t)},Element.prototype.qsa=function(t){return this.querySelectorAll(t)},Element.prototype.show=function(){return this.setAttribute("data-hidden","0")},Element.prototype.hide=function(){return this.setAttribute("data-hidden","1")},Element.prototype.backtrack=function(t={},e=!1){var r="function"==typeof t,a="object"==typeof t;if(!r&&!a||0==t.length)return null;if(a){var n=Object.keys(t),o={};for(var s of n)o[s]=t[s];t=o}var l=null;for(l=e?this:this.parentElement;null!==l;){var d=!1;if(r&&(d=t(l)),a)for(var s in t){var c=t[s];if(s in l){if(l[s]!==c)continue;d=!0}}if(d)return l;l=l.parentElement}return null},String.prototype.isolate=function(t=" 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"){if(""==t)return e;var e="";for(i=0,j=this.length;i<j;i++){var r=this[i];-1!=t.indexOf(r)&&(e+=r)}return e};var uploaders=[0,"AiTB","Ali-TPB","Sunblock.","ThumperTM","dauphong","extremezone","fitgirl","haxnode","l.diliberto","rjaa"],uploaders_length=11;function get_uploader_name_by_id(t){return t>uploaders_length?"":uploaders[t].toString().trim()}var state_bit={VIP:1,TRUSTED:2,APPROVED:4,UNTESTED:8},state_desc={[state_bit.VIP]:"VIP",[state_bit.TRUSTED]:"Trusted",[state_bit.APPROVED]:"Approved",[state_bit.UNTESTED]:"Untested"};function set_state_icons(t){var e="<span class=state_icons>";for(var r of Object.values(state_bit))(t&r)==r&&(e+=`<img src="/img/state/${r}.png" title="${state_desc[r]}">`);return e+"</span>"}var last_search_query="";function hide_all_records(){for(let t=1;t<=result_data_len;t++)result_data[t].ref.hide()}function search_records(t){if(hide_all_records(),0!=t.length){for(last_search_query=t=t.toString().toLowerCase().trim();-1!=t.indexOf("  ");)t=t.replace("  "," ");if(0==t.length)return!1;var e=[];for(let r=1;r<=result_data_len;r++){let a=result_data[r];var n=!1;a.name_lc.indexOf(t)>-1&&(n=!0),n&&0!=filter_state.bit&&(a.category&filter_state.bit)!=filter_state.bit&&(n=!1),n&&filter_state.uploaders.length>0&&!filter_state.uploaders.includes(a.uploaded_by.toString())&&(n=!1),n&&(e[e.length]=a.id)}if(0!=e.length)for(var o of e)result_data[o].ref.show()}}var language_bit={ENGLISH:1,RUSSIAN:2,ANY:4},language_desc={[language_bit.ENGLISH]:"English",[language_bit.RUSSIAN]:"Russian",[language_bit.ANY]:"Any"};function str_xor(t,e){for(var r=t.length,a=e.length,n="",o=0;o<r;o++)n+=String.fromCharCode(t.charCodeAt(o)^e.charCodeAt(o%a));return n}var platform_bit={APPLE:1,CPU:2,CPU32:4,CPU64:8,LINUX:16,WIN:32,WIN7:64,WIN10:128,WIN11:256,WINXP:512,MSSTORE:1024},platform_desc={[platform_bit.APPLE]:"Apple Platform",[platform_bit.CPU]:"CPU (Any)",[platform_bit.CPU32]:"CPU 32-bit",[platform_bit.CPU64]:"CPU 64-bit",[platform_bit.LINUX]:"Linux",[platform_bit.WIN]:"Windows (Any)",[platform_bit.WIN7]:"Windows 7",[platform_bit.WIN10]:"Windows 10",[platform_bit.WIN11]:"Windows 11",[platform_bit.WINXP]:"Windows XP",[platform_bit.MSSTORE]:"Microsoft Store Product"};function set_platform_icons(t){var e="<span class=platform_icons>";for(var r of Object.values(platform_bit))(t&r)==r&&(e+=`<img src="/img/glyph/${platform_glyph[r]}.png" title="${platform_desc[r]}">`);return e+"</span>"}var category_bit={TOOL:1,GAME:2,MEDIA:4,SIMULATION:8,STEALTH:16,SURVIVAL:32,HORROR:64,ACTION:128,SANDBOX:256,SHOOTER:512,RACING:1024,ADVENTURE:2048,ARCADE:4096,VIOLENCE:8192,FIRST_PERSON:16384,THIRD_PERSON:32768,OPEN_WORLD:65536,AUDIO_AUTHORING:131072,PHOTO_AUTHORING:262144,VIDEO_AUTHORING:524288,ADMINISTRATIVE:1048576,NETWORKING:2097152,OPERATING_SYSTEM:4194304,OFFICE:8388608,MODELLING:16777216,AUDIO:33554432,VIDEO:67108864,MOVIE:134217728,MUSIC:268435456,DOCUMENTARY:536870912,SERIES:1073741824,PRIVATE:-2147483648},category_desc={[category_bit.TOOL]:"Tool",[category_bit.GAME]:"Game",[category_bit.MEDIA]:"Media",[category_bit.SIMULATION]:"Simulation",[category_bit.STEALTH]:"Stealth",[category_bit.SURVIVAL]:"Survival",[category_bit.HORROR]:"Horror",[category_bit.ACTION]:"Action",[category_bit.SANDBOX]:"Sandbox",[category_bit.SHOOTER]:"Shooter",[category_bit.RACING]:"Racing",[category_bit.ADVENTURE]:"Adventure",[category_bit.ARCADE]:"Arcade",[category_bit.VIOLENCE]:"Violence",[category_bit.FIRST_PERSON]:"First-person",[category_bit.THIRD_PERSON]:"Third-person",[category_bit.OPEN_WORLD]:"Open world",[category_bit.AUDIO_AUTHORING]:"Audio Authoring",[category_bit.PHOTO_AUTHORING]:"Photo Authoring",[category_bit.VIDEO_AUTHORING]:"Video Authoring",[category_bit.ADMINISTRATIVE]:"Administrative",[category_bit.NETWORKING]:"Networking",[category_bit.OPERATING_SYSTEM]:"Operating System",[category_bit.OFFICE]:"Office",[category_bit.MODELLING]:"Modelling",[category_bit.AUDIO]:"Audio",[category_bit.VIDEO]:"Video",[category_bit.MOVIE]:"Movie",[category_bit.MUSIC]:"Music",[category_bit.DOCUMENTARY]:"Documentary",[category_bit.SERIES]:"Series",[category_bit.PRIVATE]:"Private"};function decypher_category(t){var e=[];for(var r of Object.values(category_bit))(t&r)==r&&e.push(category_desc[r]);return e}var platform_glyph={[platform_bit.APPLE]:"apple",[platform_bit.CPU]:"cpu",[platform_bit.CPU32]:"cpu32",[platform_bit.CPU64]:"cpu64",[platform_bit.LINUX]:"linux",[platform_bit.WIN]:"win",[platform_bit.WIN7]:"win7",[platform_bit.WIN10]:"win10",[platform_bit.WIN11]:"win11",[platform_bit.WINXP]:"winxp",[platform_bit.MSSTORE]:"msstore"},svgLogo='<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 151 192"><g transform="translate(0,192) scale(0.1,-0.1)" fill="#000" stroke="none"><path d="M591 1904 c-184 -49 -338 -151 -435 -287 -56 -79 -85 -139 -125 -254 l-31 -91 0 -590 c0 -353 4 -601 10 -616 5 -14 18 -34 30 -46 18 -18 32 -20 178 -20 129 0 162 3 181 16 51 36 51 42 51 642 0 606 2 627 56 699 25 33 102 93 118 92 5 0 12 4 16 11 4 6 36 16 72 22 59 10 70 9 119 -10 30 -12 61 -23 69 -24 28 -5 107 -95 136 -154 l29 -59 5 -587 5 -587 29 -30 30 -31 167 0 168 0 20 26 c21 26 21 34 21 643 0 366 -4 634 -10 661 -47 215 -199 408 -404 512 -113 57 -206 78 -340 77 -63 0 -134 -7 -165 -15z m-261 -1689 l0 -105 -105 0 -105 0 0 105 0 105 105 0 105 0 0 -105z m1070 0 l0 -105 -105 0 -105 0 0 105 0 105 105 0 105 0 0 -105z"/></g></svg>',input_placeholder_example_words=["Grand Theft Auto","Wondershare Filmora","Call of Duty","Adobe Photoshop","Forza Horizon","Need for Speed","FL Studio","WinRAR","Autodesk AutoCAD"],input_placeholder_example_words_length=9,filter_state={queue:null,bit:0,refs:[],uploaders:[]};function filter_queue(t){}var nav=qs(".nav"),nav_search=nav.qs("#search"),nav_extra=nav.qs(".extra"),nav_logo=nav.qs(".logo"),nav_version=nav_extra.qs(".version"),nav_records=nav_extra.qs(".records"),nav_filter=nav.qs(".filter button"),nav_filter_box=nav.qs(".filter .box"),xhr_results=qs(".xhr_results");function gen_result_item_inners(t){let e;return`
<div class="part cover">
    <img src="/${path_def.DATA}/t/${t.id.toString().split("").join("/")}/c">
</div>

<div class="part name">
    <span>${t.name}</span>
</div>

<div class="part uploaded_by">
    <span>${get_uploader_name_by_id(t.uploaded_by)}</span>
</div>

<div class="part size">
    <span>${t.size}</span>
</div>

<div class="part platforms">
    <span>${set_platform_icons(t.platforms)}</span>
</div>

<div class="part state">
    <span>${set_state_icons(t.state)}</span>
</div>

<div class="part category">
    <span>${decypher_category(t.category).join(", ")}</span>
</div>
`}function add_result_item(t){let e;return`
<div class="item" data-hidden="1" data-magnet="${t.magnet}">
    <div class="part cover">
        <img src="/${path_def.DATA}/t/${t.id.toString().split("").join("/")}/c">
    </div>

    <div class="part name">
        <span>${t.name}</span>
    </div>

    <div class="part uploaded_by">
        <span>${get_uploader_name_by_id(t.uploaded_by)}</span>
    </div>

    <div class="part size">
        <span>${t.size}</span>
    </div>

    <div class="part platforms">
        <span>${set_platform_icons(t.platforms)}</span>
    </div>

    <div class="part state">
        <span>${set_state_icons(t.state)}</span>
    </div>

    <div class="part category">
        <span>${decypher_category(t.category).join(", ")}</span>
    </div>
</div>
`}nav_search.placeholder="Try: "+input_placeholder_example_words[Math.random()*input_placeholder_example_words_length|0],nav_version.innerText=site_version,nav_records.innerText=56,nav_logo.innerHTML=svgLogo,filter_state.refs=nav_filter_box.qsa("input[id^=opt]");var db=null,data_load=0,dkey=null,response_a=null,response_b=null;function load_data(){var t=new XMLHttpRequest;t.onreadystatechange=()=>{if(4==t.readyState&&200==t.status){data_load=1,response_a=xhr_fix_bytes(t.response);try{db=JSON.parse(str_xor(xhr_fix_bytes(t.response),get_decryption_key())),result_data_len=Object.keys(db).length??0,make_data_useful(db)}catch(e){console.log(e),db={error:1}}}},t.open("GET","6e6973746576696e6f726d616c6e692e"),t.send()}var data_time_start=Number(new Date),data_time_end=data_time_start+5e3,data_load_check=setInterval(()=>{if(null==dkey)return clearInterval(data_load_check),0;if(Number(new Date)>data_time_end&&clearInterval(data_load_check),0==data_load){console.log("DB not loaded yet");return}if(1==data_load){console.log("DB loaded!"),clearInterval(data_load_check),console.log(db);return}},1e3);function make_data_useful(t){for(var e of t)result_data[e.id]=e,result_data[e.id].name_lc=result_data[e.id].name.toLowerCase(),result_data[e.id].ref=document.createElement("div"),result_data[e.id].ref.setAttribute("class","item"),result_data[e.id].ref.setAttribute("data-hidden","1"),result_data[e.id].ref.setAttribute("data-item-id",e.id),result_data[e.id].ref.innerHTML=gen_result_item_inners(e),xhr_results.append(result_data[e.id].ref)}var events={click:[],keyup:[]},EVENT_HALT=101;function process_events(t,e){for(var r in events[t])if("function"==typeof events[t][r]&&events[t][r](e)==EVENT_HALT)return}events.click.filter_btn=function(t){if("toggle_filter"==t.target.getAttribute("data-action"))return nav_filter_box.dataset.hidden^=1,EVENT_HALT},events.click.filter_bit=function(t){let e=t.target;if(null==(e=e.backtrack(function(t){return t.id.includes("opt")},1)))return;let r=e?.dataset?.filter;if(null==r)return;let a=r.split(":"),n=a[1].toUpperCase();if("uploader"==a[0])return filter_state.uploaders.includes(n)?filter_state.uploaders=array_remove_value(filter_state.uploaders,n):filter_state.uploaders[filter_state.uploaders.length]=n,search_records(last_search_query),EVENT_HALT;if(!(n in category_bit))return;let o=category_bit[n];if(o in category_desc)return(filter_state.bit&o)==o?filter_state.bit&=~o:filter_state.bit|=o,search_records(last_search_query),EVENT_HALT},events.click.filter_close=function(t){if("filter_close"==t.target.getAttribute("data-action"))return nav_filter_box.dataset.hidden=1,EVENT_HALT},events.click.filter_reset=function(t){if("filter_reset"==t.target.getAttribute("data-action")){for(var e of(filter_state.bit=0,filter_state.refs))e.checked=0;return search_records(last_search_query),t.shiftKey&&(nav_filter_box.dataset.hidden=1),EVENT_HALT}},events.click.do_search=function(t){if("do_search"==t.target.getAttribute("data-action"))return search_records(nav_search.value.toString().trim()),EVENT_HALT},events.click.handle_result_item=function(t){let e=t.target;if(null==(e=e.backtrack(function(t){return null!=t.getAttribute("data-item-id")},!0)))return;let r=result_data[e.getAttribute("data-item-id")],a=document.createElement("a");return a.setAttribute("href","magnet:?xt=urn:"+r.magnet),a.click(),a.remove(),EVENT_HALT},events.keyup.do_search=function(t){t.preventDefault(),t.stopPropagation();let e=t.target;if(null!=(e=e.backtrack(function(t){return"search"!=t.getAttribute("class")||"search"!=t.getAttribute("id")},!0))&&13==t.keyCode)return search_records(nav_search.value),EVENT_HALT},document.body.addEventListener("click",function(t){process_events("click",t)}),site_loaded=1,do_decrypt();