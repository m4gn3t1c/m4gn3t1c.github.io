var result_data={},result_data_len=0,site_version="0.1",site_loaded=0,initial_decrypt_load=1,path_def={DATABASE:"6e6973746576696e6f726d616c6e692e",DATA:"44454a5441",METADATA_FILE:"m",COVER_IMAGE_FILE:"c"},qs=t=>document.querySelector(t),sqa=t=>document.querySelectorAll(t);function backtrackQuick(t,e,a,r=0){return t[e]==a?t:t.backtrack(function(t){if(t[e]instanceof Array&&"object"==typeof t[e]){if(t[e].join(" ").includes(a))return t}else if("string"==typeof t[e]&&t[e].includes(a)||t[e]==a)return t;return null},r)}function str_isolate(t,e=" 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",a=!1){var r="";for(i=0,j=t.length;i<j;i++){var o=t[i];!1==a&&-1!==e.indexOf(o)?r+=o:!0==a&&-1===e.indexOf(o)&&(r+=o)}return r}function array_remove_value(t,e){var a=[];for(var r of t)e!=r&&(a[a.length]=r);return a}function bin2hex(t=null){if(null==t)return null;var e=t.length,a="";for(let r=0;r<e;r++){var o=t.charCodeAt(r).toString(16);2>o.length&&(o="0"+o),a+=o}return a}function hex2bin(t=null){if(null==t)return null;var e=(t=t.toLowerCase()).length;if(e%2)return -1;for(let a=0;a<e;a++){var r=Number(t.charCodeAt(a));if(!(r>47&&r<58||r>96&&r<103))return -2}var o="";for(let l=0;l<e;l+=2)o+=String.fromCharCode(parseInt(t.substr(l,2),16));return o}function xhr_fix_bytes(t){for(var e=(t=t.split("")).length,a=0;a<e;a++){var r=bin2hex(t[a]);r.length>2&&(r=r.substr(2,2),t[a]=hex2bin(r))}return t.join("")}function is_float(t){return t!==(0|t)}function set_float_precision(t,e=2){if(0>=e)return 0|t;let a=t+"",r=a.indexOf(".")+1,o=0,l=0;return r<0&&(l=String("0").repeat(e)),r>-1&&(l=a.substring(r,r+e)),l.length!=e&&(l+=String("0").repeat(e-l.length)),Number((o=a.substring(0,r-1))+"."+l)}function byte_unit_conv(t,e=2){if(!+t)return"0 Bytes";let a=Math.floor(Math.log(t)/Math.log(1e3));return`${parseFloat((t/Math.pow(1e3,a)).toFixed(e<0?0:e))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][a]}`}Element.prototype.qs=function(t){return this.querySelector(t)},Element.prototype.qsa=function(t){return this.querySelectorAll(t)},Element.prototype.show=function(){return this.setAttribute("data-hidden","0")},Element.prototype.hide=function(){return this.setAttribute("data-hidden","1")},Element.prototype.backtrack=function(t={},e=!1){var a="function"==typeof t,r="object"==typeof t;if(!a&&!r||0==t.length)return null;if(r){var o=Object.keys(t),l={};for(var n of o)l[n]=t[n];t=l}var s=null;for(s=e?this:this.parentElement;null!==s;){var d=!1;if(a&&(d=t(s)),r)for(var n in t){var c=t[n];if(n in s){if(s[n]!==c)continue;d=!0}}if(d)return s;s=s.parentElement}return null},String.prototype.isolate=function(t=" 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"){if(""==t)return e;var e="";for(i=0,j=this.length;i<j;i++){var a=this[i];-1!=t.indexOf(a)&&(e+=a)}return e};var sec_compare_data_enc="637E0D126772736F6D7F171D006D127572627D7D68677F6A1379677368710D7A041D79021D0C79676B6D7B70771D0B0208667E737F1979731617670E0C62746D1C7D6767720B741613036B6C717B616677136566657B7D070C7C1269037B65001B6177611C7973611D757D6A74060E0468127A6A7675657B607269167C7D1A6A78690700747573726D6914100C63036474696772726A6F610C647A6D707F1B60090B631B1116647A7A7E6C62700C091914707D796E19",sec_compare_data_dec="544849535F4B45595F49535F45585045435445445F544F5F574F524B5F46494E455F49465F4E4F545F5448454E5F49444B5F4D414E5F4C4554535F484F50455F594F555F4649475552455F544849535F4F55545F534F4D45484F575F454C53455F594F555F4D41595F42455F41424C455F544F5F4445524956455F5448455F534F5F43414C4C45445F5F505249564154455F5F4B45595F5448524F5547485F544849535F535452494E475F57494E4B5F57494E4B5F5F";function get_decryption_key(){return window.localStorage.magnetic_key??null}function check_decryption_key(t){if(128>(t=t?.toUpperCase()?.isolate("0123456789ABCDEF")?.trim()??"").length||t.length>128)return!1;var e=str_xor(hex2bin(sec_compare_data_enc),t),a=hex2bin(sec_compare_data_dec);return e==a}function save_decryption_key(t){window.localStorage.magnetic_key=t}function clear_decryption_key(){window.localStorage.magnetic_key=""}var decrypt_overlay=document.querySelector(".decrypt_overlay"),decrypt_box=document.querySelector(".decrypt_box"),kinput=document.querySelector(".kinput"),err=document.querySelector(".err");function do_decrypt(){if(check_decryption_key(get_decryption_key())){decrypt_overlay.dataset.hidden=1,generic_page_init();return}kinput.value=kinput.value.trim();if(128>kinput.value.length){decrypt_overlay.dataset.hidden=0,err.innerText="Key length must be 128 characters";return}err.innerText="";let t=kinput.value;if(!check_decryption_key(t=t.substring(0,128))){err.innerText="Incorrect key";return}decrypt_overlay.dataset.hidden=1,err.innerText="",save_decryption_key(t),generic_page_init()}var uploaders=[0,"AiTB","Ali-TPB","Sunblock.","ThumperTM","dauphong","extremezone","fitgirl","haxnode","l.diliberto","rjaa"],uploaders_length=11;function get_uploader_name_by_id(t){return t>uploaders_length?"":uploaders[t].toString().trim()}var state_bit={VIP:1,TRUSTED:2,APPROVED:4,UNTESTED:8},state_desc={[state_bit.VIP]:"VIP",[state_bit.TRUSTED]:"Trusted",[state_bit.APPROVED]:"Approved",[state_bit.UNTESTED]:"Untested"};function set_state_icons(t){var e="<span class=state_icons>";for(var a of Object.values(state_bit))(t&a)==a&&(e+=`<img src="/img/state/${a}.png" title="${state_desc[a]}">`);return e+"</span>"}var last_search_query="";function hide_all_records(){for(let t=1;t<=result_data_len;t++)result_data[t].ref.hide()}function search_records(t){if(hide_all_records(),0!=(t=str_isolate(t," 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")).length){for(last_search_query=t=t.toString().toLowerCase().trim();-1!=t.indexOf("  ");)t=t.replace("  "," ");if(0==t.length)return!1;var e=[];for(let a=1;a<=result_data_len;a++){let r=result_data[a];var o=!1;r.name_lc.indexOf(t)>-1&&(o=!0),o&&(o&&0!=filter_state.bit&&(r.category&filter_state.bit)!=filter_state.bit&&(o=!1),o&&filter_state.uploaders.length>0&&!filter_state.uploaders.includes(r.uploaded_by.toString())&&(o=!1),o&&(e[e.length]=r.id))}if(0!=e.length)for(var l of e)result_data[l].ref.show()}}var language_bit={ENGLISH:1,RUSSIAN:2,ANY:4},language_desc={[language_bit.ENGLISH]:"English",[language_bit.RUSSIAN]:"Russian",[language_bit.ANY]:"Any"};function str_xor(t,e){for(var a=t.length,r=e.length,o="",l=0;l<a;l++)o+=String.fromCharCode(t.charCodeAt(l)^e.charCodeAt(l%r));return o}var platform_bit={APPLE:1,CPU:2,CPU32:4,CPU64:8,LINUX:16,WIN:32,WIN7:64,WIN10:128,WIN11:256,WINXP:512,MSSTORE:1024},platform_desc={[platform_bit.APPLE]:"Apple Platform",[platform_bit.CPU]:"CPU (Any)",[platform_bit.CPU32]:"CPU 32-bit",[platform_bit.CPU64]:"CPU 64-bit",[platform_bit.LINUX]:"Linux",[platform_bit.WIN]:"Windows (Any)",[platform_bit.WIN7]:"Windows 7",[platform_bit.WIN10]:"Windows 10",[platform_bit.WIN11]:"Windows 11",[platform_bit.WINXP]:"Windows XP",[platform_bit.MSSTORE]:"Microsoft Store Product"};function set_platform_icons(t){var e="<span class=platform_icons>";for(var a of Object.values(platform_bit))(t&a)==a&&(e+=`<img src="/img/glyph/${platform_glyph[a]}.png" title="${platform_desc[a]}">`);return e+"</span>"}var category_bit={TOOL:1,GAME:2,MEDIA:4,SIMULATION:8,STEALTH:16,SURVIVAL:32,HORROR:64,ACTION:128,SANDBOX:256,SHOOTER:512,RACING:1024,ADVENTURE:2048,ARCADE:4096,VIOLENCE:8192,FIRST_PERSON:16384,THIRD_PERSON:32768,OPEN_WORLD:65536,AUDIO_AUTHORING:131072,PHOTO_AUTHORING:262144,VIDEO_AUTHORING:524288,ADMINISTRATIVE:1048576,NETWORKING:2097152,OPERATING_SYSTEM:4194304,OFFICE:8388608,MODELLING:16777216,AUDIO:33554432,VIDEO:67108864,MOVIE:134217728,MUSIC:268435456,DOCUMENTARY:536870912,SERIES:1073741824,PRIVATE:-2147483648},category_desc={[category_bit.TOOL]:"Tool",[category_bit.GAME]:"Game",[category_bit.MEDIA]:"Media",[category_bit.SIMULATION]:"Simulation",[category_bit.STEALTH]:"Stealth",[category_bit.SURVIVAL]:"Survival",[category_bit.HORROR]:"Horror",[category_bit.ACTION]:"Action",[category_bit.SANDBOX]:"Sandbox",[category_bit.SHOOTER]:"Shooter",[category_bit.RACING]:"Racing",[category_bit.ADVENTURE]:"Adventure",[category_bit.ARCADE]:"Arcade",[category_bit.VIOLENCE]:"Violence",[category_bit.FIRST_PERSON]:"First-person",[category_bit.THIRD_PERSON]:"Third-person",[category_bit.OPEN_WORLD]:"Open world",[category_bit.AUDIO_AUTHORING]:"Audio Authoring",[category_bit.PHOTO_AUTHORING]:"Photo Authoring",[category_bit.VIDEO_AUTHORING]:"Video Authoring",[category_bit.ADMINISTRATIVE]:"Administrative",[category_bit.NETWORKING]:"Networking",[category_bit.OPERATING_SYSTEM]:"Operating System",[category_bit.OFFICE]:"Office",[category_bit.MODELLING]:"Modelling",[category_bit.AUDIO]:"Audio",[category_bit.VIDEO]:"Video",[category_bit.MOVIE]:"Movie",[category_bit.MUSIC]:"Music",[category_bit.DOCUMENTARY]:"Documentary",[category_bit.SERIES]:"Series",[category_bit.PRIVATE]:"Private"};function decypher_category(t){var e=[];for(var a of Object.values(category_bit))(t&a)==a&&e.push(category_desc[a]);return e}var platform_glyph={[platform_bit.APPLE]:"apple",[platform_bit.CPU]:"cpu",[platform_bit.CPU32]:"cpu32",[platform_bit.CPU64]:"cpu64",[platform_bit.LINUX]:"linux",[platform_bit.WIN]:"win",[platform_bit.WIN7]:"win7",[platform_bit.WIN10]:"win10",[platform_bit.WIN11]:"win11",[platform_bit.WINXP]:"winxp",[platform_bit.MSSTORE]:"msstore"},svgLogo='<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 151 192"><g transform="translate(0,192) scale(0.1,-0.1)" fill="#000" stroke="none"><path d="M591 1904 c-184 -49 -338 -151 -435 -287 -56 -79 -85 -139 -125 -254 l-31 -91 0 -590 c0 -353 4 -601 10 -616 5 -14 18 -34 30 -46 18 -18 32 -20 178 -20 129 0 162 3 181 16 51 36 51 42 51 642 0 606 2 627 56 699 25 33 102 93 118 92 5 0 12 4 16 11 4 6 36 16 72 22 59 10 70 9 119 -10 30 -12 61 -23 69 -24 28 -5 107 -95 136 -154 l29 -59 5 -587 5 -587 29 -30 30 -31 167 0 168 0 20 26 c21 26 21 34 21 643 0 366 -4 634 -10 661 -47 215 -199 408 -404 512 -113 57 -206 78 -340 77 -63 0 -134 -7 -165 -15z m-261 -1689 l0 -105 -105 0 -105 0 0 105 0 105 105 0 105 0 0 -105z m1070 0 l0 -105 -105 0 -105 0 0 105 0 105 105 0 105 0 0 -105z"/></g></svg>',svgClose='<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g transform="translate(0,512) scale(0.1,-0.1)" fill="#000" stroke="none"><path d="M1052 4068 l-92 -93 707 -707 708 -708 -708 -708 -707 -707 92 -93 93 -92 707 707 708 708 708 -708 707 -707 93 92 92 93 -707 707 -708 708 708 708 707 707 -92 93 -93 92 -707 -707 -708 -708 -708 708 -707 707 -93 -92z"/></g></svg>',input_placeholder_example_words=["Grand Theft Auto","Wondershare Filmora","Call of Duty","Adobe Photoshop","Forza Horizon","Need for Speed","FL Studio","WinRAR","Autodesk AutoCAD"],input_placeholder_example_words_length=9,filter_state={queue:null,bit:0,refs:[],uploaders:[]};function filter_uncheck_generic(){filter_state.bit&=~(category_bit.TOOL|category_bit.GAME|category_bit.MEDIA),filter_state.refs[0].checked=filter_state.refs[1].checked=filter_state.refs[2].checked=!1}var nav=qs(".nav"),nav_search=nav.qs("#search"),nav_clear_search=nav.qs(".clear-search"),nav_extra=nav.qs(".extra"),nav_logo=nav.qs(".logo"),nav_version=nav_extra.qs(".version"),nav_records=nav_extra.qs(".records"),nav_filter=nav.qs(".filter button"),nav_filter_box=nav.qs(".filter .box"),xhr_results=qs(".xhr_results");function gen_result_item_inners(t){let e;return`
<div class="part cover">
    <img src="/${path_def.DATA}/t/${t.id.toString().split("").join("/")}/c">
</div>

<div class="part name">
    <div class="text">${t.name}</div>
    <div class="size">${byte_unit_conv(t.size)}</div>
</div>

<div class="part uploaded_by">
    <span>${get_uploader_name_by_id(t.uploaded_by)}</span>
</div>

<div class="part size" data-hidden="1">
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
`}function gen_filter_box_html(){return`
<div class="title"><div class="text">Filter</div> <div class="exit-icon" data-action="filter_close">${svgClose}</div></div>

<div class="group">
    <div class="cgroup">
        <div class="title2">Generic</div>

        <div class="opt">
            <input type="checkbox" id="opt1" data-filter="generic:tool"/>
            <label for="opt1">Tool</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt2" data-filter="generic:game"/>
            <label for="opt2">Game</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt3" data-filter="generic:media"/>
            <label for="opt3">Media</label>
        </div>
    </div>

    <div class="cgroup">
        <div class="title2">Game</div>

        <div class="opt">
            <input type="checkbox" id="opt4" data-filter="game:simulation"/>
            <label for="opt4">Simulation</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt5" data-filter="game:stealth"/>
            <label for="opt5">Stealth</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt6" data-filter="game:survival"/>
            <label for="opt6">Survival</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt7" data-filter="game:horror"/>
            <label for="opt7">Horror</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt8" data-filter="game:action"/>
            <label for="opt8">Action</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt9" data-filter="game:sandbox"/>
            <label for="opt9">Sandbox</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt10" data-filter="game:shooter"/>
            <label for="opt10">Shooter</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt11" data-filter="game:racing"/>
            <label for="opt11">Racing</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt12" data-filter="game:adventure"/>
            <label for="opt12">Adventure</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt13" data-filter="game:arcade"/>
            <label for="opt13">Arcade</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt14" data-filter="game:violence"/>
            <label for="opt14">Violence</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt15" data-filter="game:first_person"/>
            <label for="opt15">First-person</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt16" data-filter="game:third_person"/>
            <label for="opt16">Third-person</label>
        </div>
        
        <div class="opt">
            <input type="checkbox" id="opt17" data-filter="game:open_world"/>
            <label for="opt17">Open world</label>
        </div>                        
    </div>

    <div class="cgroup">
        <div class="title2">Tool</div>

        <div class="opt">
            <input type="checkbox" id="opt18" data-filter="tool:audio_authoring"/>
            <label for="opt18">Audio Authoring</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt19" data-filter="tool:photo_authoring"/>
            <label for="opt19">Photo Authoring</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt20" data-filter="tool:video_authoring"/>
            <label for="opt20">Video Authoring</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt21" data-filter="tool:administrative"/>
            <label for="opt21">Administrative</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt22" data-filter="tool:networking"/>
            <label for="opt22">Networking</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt23" data-filter="tool:operating_system"/>
            <label for="opt23">Operating System</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt24" data-filter="tool:office"/>
            <label for="opt24">Office</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt25" data-filter="tool:modelling"/>
            <label for="opt25">Modelling</label>
        </div>
    </div>

    <div class="cgroup">
        <div class="title2">Media</div>

        <div class="opt">
            <input type="checkbox" id="opt26" data-filter="media:audio"/>
            <label for="opt26">Audio</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt27" data-filter="media:video"/>
            <label for="opt27">Video</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt28" data-filter="media:movie"/>
            <label for="opt28">Movie</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt29" data-filter="media:music"/>
            <label for="opt29">Music</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt30" data-filter="media:documentary"/>
            <label for="opt30">Documentary</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt31" data-filter="media:series"/>
            <label for="opt31">Series</label>
        </div>
    </div>

    <div class="cgroup">
        <div class="title2">Uploaders</div>

        <div class="opt">
            <input type="checkbox" id="opt32" data-filter="uploader:1"/>
            <label for="opt32">AiTB</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt33" data-filter="uploader:2"/>
            <label for="opt33">Ali-TPB</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt34" data-filter="uploader:3"/>
            <label for="opt34">Sunblock.</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt35" data-filter="uploader:4"/>
            <label for="opt35">ThumperTM</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt36" data-filter="uploader:5"/>
            <label for="opt36">dauphong</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt37" data-filter="uploader:6"/>
            <label for="opt37">extremezone</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt38" data-filter="uploader:7"/>
            <label for="opt38">fitgirl</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt39" data-filter="uploader:8"/>
            <label for="opt39">haxnode</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt40" data-filter="uploader:9"/>
            <label for="opt40">l.diliberto</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt41" data-filter="uploader:10"/>
            <label for="opt41">rjaa</label>
        </div>
    </div>
</div>

<div class="buttons">
    <button class="custom-element" data-action="filter_reset">Reset</button>
    <button class="custom-element" data-action="filter_close">Close</button>
</div>
`}function generic_page_init(){nav_filter_box.innerHTML=gen_filter_box_html(),filter_state.refs=nav_filter_box.qsa("input[id^=opt]"),nav_search.focus(),load_data()}nav_clear_search.innerHTML=svgClose,nav_search.placeholder="Try: "+input_placeholder_example_words[Math.random()*input_placeholder_example_words_length|0],nav_version.innerText=site_version,nav_records.innerText=56,nav_logo.innerHTML=svgLogo;var db=null,data_load=0,dkey=null;function load_data(){var t=new XMLHttpRequest;t.onreadystatechange=()=>{if(4==t.readyState&&200==t.status){data_load=1;try{db=JSON.parse(str_xor(xhr_fix_bytes(t.response),get_decryption_key())),result_data_len=Object.keys(db).length??0,make_data_useful(db)}catch(e){db={error:1}}}},t.open("GET",path_def.DATABASE),t.send()}var data_time_start=Number(new Date),data_time_end=data_time_start+5e3,data_load_check=setInterval(()=>{if(null==dkey)return clearInterval(data_load_check),0;if(Number(new Date)>data_time_end&&clearInterval(data_load_check),0!=data_load&&1==data_load){clearInterval(data_load_check),console.log(db);return}},1e3);function make_data_useful(t){for(var e of t)result_data[e.id]=e,result_data[e.id].name_lc=result_data[e.id].name.toLowerCase(),result_data[e.id].ref=document.createElement("div"),result_data[e.id].ref.setAttribute("class","item"),result_data[e.id].ref.setAttribute("data-hidden","1"),result_data[e.id].ref.setAttribute("data-item-id",e.id),result_data[e.id].ref.innerHTML=gen_result_item_inners(e),xhr_results.append(result_data[e.id].ref)}var events={click:[],keyup:[],keydown:[]},EVENT_HALT=101;function process_events(t,e){for(var a in events[t])if("function"==typeof events[t][a]&&events[t][a](e)==EVENT_HALT)return}events.click.filter_btn=function(t){if("toggle_filter"==t.target.getAttribute("data-action"))return nav_filter_box.dataset.hidden^=1,EVENT_HALT},events.click.filter_bit=function(t){let e=t.target;if(null==(e=e.backtrack(function(t){return t.id.includes("opt")},1)))return;let a=e?.dataset?.filter;if(null==a)return;let r=a.split(":"),o=r[1].toUpperCase(),l=r[0];if("generic"==l){let n=t.target,s=n.checked;return(filter_uncheck_generic(),s)?(n.checked=!0,filter_state.bit|=category_bit[o],search_records(last_search_query),EVENT_HALT):(s||(n.checked=!1),search_records(last_search_query),EVENT_HALT)}if("uploader"==l)return filter_state.uploaders.includes(o)?filter_state.uploaders=array_remove_value(filter_state.uploaders,o):filter_state.uploaders[filter_state.uploaders.length]=o,search_records(last_search_query),EVENT_HALT;if(!(o in category_bit))return;let d=category_bit[o];if(d in category_desc)return(filter_state.bit&d)==d?filter_state.bit&=~d:filter_state.bit|=d,search_records(last_search_query),EVENT_HALT},events.click.filter_close=function(t){if("filter_close"==t.target.dataset.action)return nav_filter_box.dataset.hidden=1,EVENT_HALT},events.click.filter_reset=function(t){if("filter_reset"==t.target.dataset.action){for(var e of(filter_state.bit=0,filter_state.refs))e.checked=0;return filter_state.uploaders=[],search_records(last_search_query),t.shiftKey&&(nav_filter_box.dataset.hidden=1),EVENT_HALT}},events.click.do_search=function(t){if("do_search"==t.target.dataset.action)return search_records(nav_search.value.toString().trim()),EVENT_HALT},events.click.handle_result_item=function(t){let e=t.target;if(null==(e=e.backtrack(function(t){return null!=t.getAttribute("data-item-id")},!0)))return;let a=result_data[e.getAttribute("data-item-id")],r=document.createElement("a");return r.setAttribute("href","magnet:?xt=urn:"+a.magnet),r.click(),r.remove(),EVENT_HALT},events.click.clear_search=function(t){if(t.target?.dataset?.action=="clear_search")return nav_search.value="",nav_search.focus(),EVENT_HALT},events.keyup.do_search=function(t){t.preventDefault(),t.stopPropagation();let e=t.target;if(null!=(e=e.backtrack(function(t){return t?.id!="search"},!0))&&13==t.keyCode)return search_records(nav_search.value),EVENT_HALT},events.keydown.clear_search=function(t){let e=document.activeElement;if("search"==e.id&&t.altKey&&"Backspace"==t.key)return e.value="",e.focus(),EVENT_HALT},events.keydown.search_show_x_icon=function(t){if("search"==document.activeElement.id)return EVENT_HALT},events.keydown.filter_close_by_esc=function(t){if(1!=nav_filter_box.dataset.hidden)return"Escape"==t.key&&(nav_filter_box.dataset.hidden=1),EVENT_HALT},document.body.addEventListener("click",function(t){process_events("click",t)}),document.body.addEventListener("keyup",function(t){process_events("keyup",t)}),document.body.addEventListener("keydown",function(t){process_events("keydown",t)}),site_loaded=1,do_decrypt();