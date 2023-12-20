var result_data={},result_data_len=0,site_version="0.1",site_loaded=0,initial_decrypt_load=1,path_def={DATABASE:"6e6973746576696e6f726d616c6e692e",DATA:"44454a5441",METADATA_FILE:"m",COVER_IMAGE_FILE:"c",RECORD_COUNT:"rc"},qs=e=>document.querySelector(e),sqa=e=>document.querySelectorAll(e);function backtrackQuick(e,t,a,r=0){return e[t]==a?e:e.backtrack(function(e){if(e[t]instanceof Array&&"object"==typeof e[t]){if(e[t].join(" ").includes(a))return e}else if("string"==typeof e[t]&&e[t].includes(a)||e[t]==a)return e;return null},r)}function str_isolate(e,t=" 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",a=!1){var r="";for(i=0,j=e.length;i<j;i++){var o=e[i];!1==a&&-1!==t.indexOf(o)?r+=o:!0==a&&-1===t.indexOf(o)&&(r+=o)}return r}function array_remove_value(e,t){var a=[];for(var r of e)t!=r&&(a[a.length]=r);return a}function bin2hex(e=null){if(null==e)return null;var t=e.length,a="";for(let r=0;r<t;r++){var o=e.charCodeAt(r).toString(16);2>o.length&&(o="0"+o),a+=o}return a}function hex2bin(e=null){if(null==e)return null;var t=(e=e.toLowerCase()).length;if(t%2)return -1;for(let a=0;a<t;a++){var r=Number(e.charCodeAt(a));if(!(r>47&&r<58||r>96&&r<103))return -2}var o="";for(let l=0;l<t;l+=2)o+=String.fromCharCode(parseInt(e.substr(l,2),16));return o}function xhr_fix_bytes(e){for(var t=(e=e.split("")).length,a=0;a<t;a++){var r=bin2hex(e[a]);r.length>2&&(r=r.substr(2,2),e[a]=hex2bin(r))}return e.join("")}function is_float(e){return e!==(0|e)}function set_float_precision(e,t=2){if(0>=t)return 0|e;let a=e+"",r=a.indexOf(".")+1,o=0,l=0;return r<0&&(l=String("0").repeat(t)),r>-1&&(l=a.substring(r,r+t)),l.length!=t&&(l+=String("0").repeat(t-l.length)),Number((o=a.substring(0,r-1))+"."+l)}function byte_unit_conv(e,t=2){if(!+e)return"0 Bytes";let a=Math.floor(Math.log(e)/Math.log(1e3));return`${parseFloat((e/Math.pow(1e3,a)).toFixed(t<0?0:t))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][a]}`}function unix_ts(){return Number(new Date)/1e3|0}function abs(e){let t=e>>4294967295;return(e^t)-t}Element.prototype.qs=function(e){return this.querySelector(e)},Element.prototype.qsa=function(e){return this.querySelectorAll(e)},Element.prototype.show=function(){return this.setAttribute("data-hidden","0")},Element.prototype.hide=function(){return this.setAttribute("data-hidden","1")},Element.prototype.backtrack=function(e={},t=!1){var a="function"==typeof e,r="object"==typeof e;if(!a&&!r||0==e.length)return null;if(r){var o=Object.keys(e),l={};for(var n of o)l[n]=e[n];e=l}var c=null;for(c=t?this:this.parentElement;null!==c;){var d=!1;if(a&&(d=e(c)),r)for(var n in e){var s=e[n];if(n in c){if(c[n]!==s)continue;d=!0}}if(d)return c;c=c.parentElement}return null},String.prototype.isolate=function(e=" 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"){if(""==e)return t;var t="";for(i=0,j=this.length;i<j;i++){var a=this[i];-1!=e.indexOf(a)&&(t+=a)}return t};var sec_compare_data_enc="637E0D126772736F6D7F171D006D127572627D7D68677F6A1379677368710D7A041D79021D0C79676B6D7B70771D0B0208667E737F1979731617670E0C62746D1C7D6767720B741613036B6C717B616677136566657B7D070C7C1269037B65001B6177611C7973611D757D6A74060E0468127A6A7675657B607269167C7D1A6A78690700747573726D6914100C63036474696772726A6F610C647A6D707F1B60090B631B1116647A7A7E6C62700C091914707D796E19",sec_compare_data_dec="544849535F4B45595F49535F45585045435445445F544F5F574F524B5F46494E455F49465F4E4F545F5448454E5F49444B5F4D414E5F4C4554535F484F50455F594F555F4649475552455F544849535F4F55545F534F4D45484F575F454C53455F594F555F4D41595F42455F41424C455F544F5F4445524956455F5448455F534F5F43414C4C45445F5F505249564154455F5F4B45595F5448524F5547485F544849535F535452494E475F57494E4B5F57494E4B5F5F";function get_decryption_key(){return window.localStorage.magnetic_key??null}function check_decryption_key(e){if(128>(e=e?.toUpperCase()?.isolate("0123456789ABCDEF")?.trim()??"").length||e.length>128)return!1;var t=str_xor(hex2bin(sec_compare_data_enc),e),a=hex2bin(sec_compare_data_dec);return t==a}function save_decryption_key(e){window.localStorage.magnetic_key=e}function clear_decryption_key(){window.localStorage.magnetic_key=""}var decrypt_overlay=document.querySelector(".decrypt_overlay"),decrypt_box=document.querySelector(".decrypt_box"),kinput=document.querySelector(".kinput"),err=document.querySelector(".err");function do_decrypt(){if(check_decryption_key(get_decryption_key())){decrypt_overlay.dataset.hidden=1,generic_page_init();return}kinput.value=kinput.value.trim();if(128>kinput.value.length){decrypt_overlay.dataset.hidden=0,err.innerText="Key length must be 128 characters";return}err.innerText="";let e=kinput.value;if(!check_decryption_key(e=e.substring(0,128))){err.innerText="Incorrect key";return}decrypt_overlay.dataset.hidden=1,err.innerText="",save_decryption_key(e),generic_page_init()}var theme_index={DEFAULT:0,DARK:1,DARK_OLED:2},theme_desc={[theme_index.DEFAULT]:"Default",[theme_index.DARK]:"Dark",[theme_index.DARK_OLED]:"Dark (OLED)"},themes=["default","dark","dark-oled"],current_theme=(window.localStorage.theme??theme_index.DEFAULT)|0;Object.values(theme_index).includes(0|window.localStorage.theme)||(window.localStorage.theme=0,current_theme=0),document.body.className="theme-"+themes[current_theme];var uploaders=[0,"AiTB","Ali-TPB","Sunblock.","ThumperTM","dauphong","extremezone","fitgirl","haxnode","l.diliberto","rjaa","eyezin","FirstUploads"],uploaders_length=11;function get_uploader_name_by_id(e){return e>uploaders_length?"":uploaders[e].toString().trim()}var state_bit={VIP:1,TRUSTED:2,APPROVED:4,UNTESTED:8},state_desc={[state_bit.VIP]:"VIP",[state_bit.TRUSTED]:"Trusted",[state_bit.APPROVED]:"Approved",[state_bit.UNTESTED]:"Untested"};function set_state_icons(e){var t="<span class=state_icons>";for(var a of Object.values(state_bit))(e&a)==a&&(t+=`<img src="/img/state/${a}.png" title="${state_desc[a]}">`);return t+"</span>"}var last_search_query="",search_char_isolation=" 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function hide_all_records(){for(let e=1;e<=result_data_len;e++)result_data[e].ref.hide()}function search_records(e){if(hide_all_records(),0!=(e=str_isolate(e,search_char_isolation)).length){for(last_search_query=e=e.toString().toLowerCase().trim();-1!=e.indexOf("  ");)e=e.replace("  "," ");if(0==e.length)return!1;var t=[];for(let a=1;a<=result_data_len;a++){let r=result_data[a];var o=!1;r.name_lc.indexOf(e)>-1&&(o=!0),o&&(o&&0!=filter_state.bit&&(r.category&filter_state.bit)!=filter_state.bit&&(o=!1),o&&filter_state.uploaders.length>0&&!filter_state.uploaders.includes(r.uploaded_by.toString())&&(o=!1),o&&(t[t.length]=r.id))}if(0!=t.length)for(var l of t)result_data[l].ref.show()}}var language_bit={ENGLISH:1,RUSSIAN:2,ANY:4},language_desc={[language_bit.ENGLISH]:"English",[language_bit.RUSSIAN]:"Russian",[language_bit.ANY]:"Any"};function str_xor(e,t){for(var a=e.length,r=t.length,o="",l=0;l<a;l++)o+=String.fromCharCode(e.charCodeAt(l)^t.charCodeAt(l%r));return o}var platform_bit={APPLE:1,CPU:2,CPU32:4,CPU64:8,LINUX:16,WIN:32,WIN7:64,WIN10:128,WIN11:256,WINXP:512,MSSTORE:1024},platform_desc={[platform_bit.APPLE]:"Apple Platform",[platform_bit.CPU]:"CPU (Any)",[platform_bit.CPU32]:"CPU 32-bit",[platform_bit.CPU64]:"CPU 64-bit",[platform_bit.LINUX]:"Linux",[platform_bit.WIN]:"Windows (Any)",[platform_bit.WIN7]:"Windows 7",[platform_bit.WIN10]:"Windows 10",[platform_bit.WIN11]:"Windows 11",[platform_bit.WINXP]:"Windows XP",[platform_bit.MSSTORE]:"Microsoft Store Product"};function set_platform_icons(e){var t="<span class=platform_icons>";for(var a of Object.values(platform_bit))(e&a)==a&&(t+=`<img src="/img/glyph/${platform_glyph[a]}.png" title="${platform_desc[a]}">`);return t+"</span>"}function decypher_platform(e){var t=[];for(var a of Object.values(platform_bit))(e&a)==a&&t.push(platform_desc[a]);return t}var category_bit={TOOL:1,GAME:2,MEDIA:4,SIMULATION:8,STEALTH:16,SURVIVAL:32,HORROR:64,ACTION:128,SANDBOX:256,SHOOTER:512,RACING:1024,ADVENTURE:2048,ARCADE:4096,VIOLENCE:8192,FIRST_PERSON:16384,THIRD_PERSON:32768,OPEN_WORLD:65536,AUDIO_AUTHORING:131072,PHOTO_AUTHORING:262144,VIDEO_AUTHORING:524288,ADMINISTRATIVE:1048576,NETWORKING:2097152,OPERATING_SYSTEM:4194304,OFFICE:8388608,MODELLING:16777216,AUDIO:33554432,VIDEO:67108864,MOVIE:134217728,MUSIC:268435456,DOCUMENTARY:536870912,SERIES:1073741824,PRIVATE:-2147483648},category_desc={[category_bit.TOOL]:"Tool",[category_bit.GAME]:"Game",[category_bit.MEDIA]:"Media",[category_bit.SIMULATION]:"Simulation",[category_bit.STEALTH]:"Stealth",[category_bit.SURVIVAL]:"Survival",[category_bit.HORROR]:"Horror",[category_bit.ACTION]:"Action",[category_bit.SANDBOX]:"Sandbox",[category_bit.SHOOTER]:"Shooter",[category_bit.RACING]:"Racing",[category_bit.ADVENTURE]:"Adventure",[category_bit.ARCADE]:"Arcade",[category_bit.VIOLENCE]:"Violence",[category_bit.FIRST_PERSON]:"First-person",[category_bit.THIRD_PERSON]:"Third-person",[category_bit.OPEN_WORLD]:"Open world",[category_bit.AUDIO_AUTHORING]:"Audio Authoring",[category_bit.PHOTO_AUTHORING]:"Photo Authoring",[category_bit.VIDEO_AUTHORING]:"Video Authoring",[category_bit.ADMINISTRATIVE]:"Administrative",[category_bit.NETWORKING]:"Networking",[category_bit.OPERATING_SYSTEM]:"Operating System",[category_bit.OFFICE]:"Office",[category_bit.MODELLING]:"Modelling",[category_bit.AUDIO]:"Audio",[category_bit.VIDEO]:"Video",[category_bit.MOVIE]:"Movie",[category_bit.MUSIC]:"Music",[category_bit.DOCUMENTARY]:"Documentary",[category_bit.SERIES]:"Series",[category_bit.PRIVATE]:"Private"};function decypher_category(e){var t=[];for(var a of Object.values(category_bit))(e&a)==a&&t.push(category_desc[a]);return t}var platform_glyph={[platform_bit.APPLE]:"apple",[platform_bit.CPU]:"cpu",[platform_bit.CPU32]:"cpu32",[platform_bit.CPU64]:"cpu64",[platform_bit.LINUX]:"linux",[platform_bit.WIN]:"win",[platform_bit.WIN7]:"win7",[platform_bit.WIN10]:"win10",[platform_bit.WIN11]:"win11",[platform_bit.WINXP]:"winxp",[platform_bit.MSSTORE]:"msstore"},svgLogo='<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 151 192"><g transform="translate(0,192) scale(0.1,-0.1)" fill="#000" stroke="none"><path d="M591 1904 c-184 -49 -338 -151 -435 -287 -56 -79 -85 -139 -125 -254 l-31 -91 0 -590 c0 -353 4 -601 10 -616 5 -14 18 -34 30 -46 18 -18 32 -20 178 -20 129 0 162 3 181 16 51 36 51 42 51 642 0 606 2 627 56 699 25 33 102 93 118 92 5 0 12 4 16 11 4 6 36 16 72 22 59 10 70 9 119 -10 30 -12 61 -23 69 -24 28 -5 107 -95 136 -154 l29 -59 5 -587 5 -587 29 -30 30 -31 167 0 168 0 20 26 c21 26 21 34 21 643 0 366 -4 634 -10 661 -47 215 -199 408 -404 512 -113 57 -206 78 -340 77 -63 0 -134 -7 -165 -15z m-261 -1689 l0 -105 -105 0 -105 0 0 105 0 105 105 0 105 0 0 -105z m1070 0 l0 -105 -105 0 -105 0 0 105 0 105 105 0 105 0 0 -105z"/></g></svg>',svgClose='<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g transform="translate(0,512) scale(0.1,-0.1)" fill="#000" stroke="none"><path d="M1052 4068 l-92 -93 707 -707 708 -708 -708 -708 -707 -707 92 -93 93 -92 707 707 708 708 708 -708 707 -707 93 92 92 93 -707 707 -708 708 708 708 707 707 -92 93 -93 92 -707 -707 -708 -708 -708 708 -707 707 -93 -92z"/></g></svg>',input_placeholder_example_words=["Grand Theft Auto","Wondershare Filmora","Call of Duty","Adobe Photoshop","Forza Horizon","Need for Speed","FL Studio","WinRAR","Autodesk AutoCAD"],input_placeholder_example_words_length=9,filter_state={queue:null,bit:0,refs:[],uploaders:[]};function filter_uncheck_generic(){filter_state.bit&=~(category_bit.TOOL|category_bit.GAME|category_bit.MEDIA),filter_state.refs[0].checked=filter_state.refs[1].checked=filter_state.refs[2].checked=!1}var nav=qs(".nav"),nav_search=nav.qs("#search"),nav_clear_search=nav.qs(".clear-search"),nav_extra=nav.qs(".extra"),nav_logo=nav.qs(".logo"),nav_version=nav_extra.qs(".version"),nav_records=nav_extra.qs(".records"),nav_filter=nav.qs(".filter button"),nav_filter_box=nav.qs(".filter .box"),nav_theme_box=nav.qs(".theme .box"),xhr_results=qs(".xhr_results"),load_overlay=qs(".load-overlay");function gen_result_item_inners(e){let t;return`
<div class="part cover">
    <img src="/${path_def.DATA}/t/${e.id.toString().split("").join("/")}/c">
</div>

<div class="part name">
    <div class="text">${e.name}</div>
    <div class="size">${byte_unit_conv(e.size)}</div>
</div>

<div class="part uploaded_by">
    <span>${get_uploader_name_by_id(e.uploaded_by)}</span>
</div>

<div class="part size" data-hidden="1">
    <span>${e.size}</span>
</div>

<div class="part platforms">
    <span>${set_platform_icons(e.platforms)}</span>
</div>

<div class="part state">
    <span>${set_state_icons(e.state)}</span>
</div>

<div class="part category">
    <span>${decypher_category(e.category).join(", ")}</span>
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

        <div class="opt">
            <input type="checkbox" id="opt42" data-filter="uploader:11"/>
            <label for="opt42">eyezin</label>
        </div>

        <div class="opt">
            <input type="checkbox" id="opt43" data-filter="uploader:12"/>
            <label for="opt43">FirstUploads</label>
        </div>
    </div>
</div>

<div class="buttons">
    <button class="custom-element" data-action="filter_reset">Reset</button>
    <button class="custom-element" data-action="filter_close">Close</button>
</div>
`}function generic_page_init(){nav_filter_box.innerHTML=gen_filter_box_html(),filter_state.refs=nav_filter_box.qsa("input[id^=opt]"),nav_search.focus(),load_record_count(),load_data()}function load_record_count(){let e=-1,t=-1;if("record_count"in window.localStorage?e=0|window.localStorage.record_count:window.localStorage.record_count=0,"record_count_timeout"in window.localStorage?t=0|window.localStorage.record_count_timeout:window.localStorage.record_count_timeout=0,unix_ts()>t)return e=t=-1,window.localStorage.record_count=-1,window.localStorage.record_count_timeout=unix_ts()+604800,load_record_count();if(window.localStorage.record_count>-1){nav_records.innerText=window.localStorage.record_count;return}let a=new XMLHttpRequest;a.onreadystatechange=()=>{if(4==a.readyState&&200==a.status){data_load=1;try{nav_records.innerText=window.localStorage.record_count=a.response}catch(e){nav_records.innerText=" count unknown"}}},a.open("GET",path_def.RECORD_COUNT),a.send()}nav_clear_search.innerHTML=svgClose,nav_search.placeholder="Try: "+input_placeholder_example_words[Math.random()*input_placeholder_example_words_length|0],nav_version.innerText=site_version,nav_records.innerText="...",nav_logo.innerHTML=svgLogo;var db=null,data_load=0,dkey=null;function load_data(){var e=new XMLHttpRequest;e.onreadystatechange=()=>{if(4==e.readyState&&200==e.status){data_load=1;try{db=JSON.parse(str_xor(xhr_fix_bytes(e.response),get_decryption_key())),result_data_len=Object.keys(db).length??0,make_data_useful(db)}catch(t){db={error:1}}}},e.open("GET",path_def.DATABASE),e.send()}var data_time_start=Number(new Date),data_time_end=data_time_start+5e3,data_load_check=setInterval(()=>{if(null==dkey)return clearInterval(data_load_check),0;if(Number(new Date)>data_time_end&&clearInterval(data_load_check),0!=data_load&&1==data_load){clearInterval(data_load_check),console.log(db);return}},1e3);function make_data_useful(e){for(var t of e){result_data[t.id]=t;let a=result_data[t.id].name.toLowerCase();for(a=str_isolate(a,search_char_isolation);a.indexOf("  ")>-1;)a=a.replace("  "," ");result_data[t.id].name_lc=a,result_data[t.id].ref=document.createElement("div"),result_data[t.id].ref.setAttribute("class","item"),result_data[t.id].ref.setAttribute("data-hidden","1"),result_data[t.id].ref.setAttribute("data-item-id",t.id),result_data[t.id].ref.innerHTML=gen_result_item_inners(t),xhr_results.append(result_data[t.id].ref)}}var events={click:[],keyup:[],keydown:[]},EVENT_HALT=101;function process_events(e,t){for(var a in events[e])if("function"==typeof events[e][a]&&events[e][a](t)==EVENT_HALT)return}events.click.filter_btn=function(e){if("toggle_filter"==e.target.getAttribute("data-action"))return nav_filter_box.dataset.hidden^=1,EVENT_HALT},events.click.filter_bit=function(e){let t=e.target;if(null==(t=t.backtrack(function(e){return e.id.includes("opt")},1)))return;let a=t?.dataset?.filter;if(null==a)return;let r=a.split(":"),o=r[1].toUpperCase(),l=r[0];if("generic"==l){let n=e.target,c=n.checked;return(filter_uncheck_generic(),c)?(n.checked=!0,filter_state.bit|=category_bit[o],search_records(last_search_query),EVENT_HALT):(c||(n.checked=!1),search_records(last_search_query),EVENT_HALT)}if("uploader"==l)return filter_state.uploaders.includes(o)?filter_state.uploaders=array_remove_value(filter_state.uploaders,o):filter_state.uploaders[filter_state.uploaders.length]=o,search_records(last_search_query),EVENT_HALT;if(!(o in category_bit))return;let d=category_bit[o];if(d in category_desc)return(filter_state.bit&d)==d?filter_state.bit&=~d:filter_state.bit|=d,search_records(last_search_query),EVENT_HALT},events.click.filter_close=function(e){if("filter_close"==e.target.dataset.action)return nav_filter_box.dataset.hidden=1,EVENT_HALT},events.click.filter_reset=function(e){if("filter_reset"==e.target.dataset.action){for(var t of(filter_state.bit=0,filter_state.refs))t.checked=0;return filter_state.uploaders=[],search_records(last_search_query),e.shiftKey&&(nav_filter_box.dataset.hidden=1),EVENT_HALT}},events.click.do_search=function(e){if("do_search"==e.target.dataset.action)return search_records(nav_search.value.toString().trim()),EVENT_HALT},events.click.handle_result_item=function(e){let t=e.target;if(null==(t=t.backtrack(function(e){return null!=e.getAttribute("data-item-id")},!0)))return;let a=result_data[t.getAttribute("data-item-id")],r=document.createElement("a");return r.setAttribute("href","magnet:?xt=urn:"+a.magnet),r.click(),r.remove(),EVENT_HALT},events.click.clear_search=function(e){if(e.target?.dataset?.action=="clear_search")return nav_clear_search.dataset.hidden=1,nav_search.value="",nav_search.focus(),EVENT_HALT},events.click.theme_btn=function(e){if(e.target?.dataset?.action=="toggle_theme_sel")return nav_theme_box.dataset.hidden^=1,EVENT_HALT},events.click.select_theme=function(e){let t=e.target;if(t?.dataset?.action=="select_theme")return window.localStorage.theme=t.dataset.theme,current_theme=t.dataset.theme,document.body.className="theme-"+themes[current_theme],nav_theme_box.dataset.hidden=1,EVENT_HALT},events.keyup.do_search=function(e){e.preventDefault(),e.stopPropagation();let t=e.target;if(null!=(t=t.backtrack(function(e){return e?.id!="search"},!0))&&13==e.keyCode)return search_records(nav_search.value),EVENT_HALT},events.keyup.search_show_x_icon=function(e){let t=document.activeElement;if("search"==t.id)return nav_clear_search.dataset.hidden=0|!(t.value.length>0),EVENT_HALT},events.keydown.clear_search=function(e){let t=document.activeElement;if("search"==t.id&&e.altKey&&"Backspace"==e.key)return t.value="",t.focus(),EVENT_HALT},events.keydown.close_by_esc=function(e){if(1!=nav_filter_box.dataset.hidden)return"Escape"==e.key&&(nav_filter_box.dataset.hidden=1),EVENT_HALT},events.keydown.theme_sel_close_by_esc=function(e){if(1!=nav_theme_box.dataset.hidden)return"Escape"==e.key&&(nav_theme_box.dataset.hidden=1),EVENT_HALT},events.keydown.search_show_x_icon=events.keyup.search_show_x_icon,document.body.addEventListener("click",function(e){process_events("click",e)}),document.body.addEventListener("keyup",function(e){process_events("keyup",e)}),document.body.addEventListener("keydown",function(e){process_events("keydown",e)}),site_loaded=1,do_decrypt(),load_overlay.dataset.hidden=1;