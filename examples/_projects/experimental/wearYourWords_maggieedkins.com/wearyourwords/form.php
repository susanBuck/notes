<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>PHP FormMail Generator - A tool to create ready-to-use web forms in a flash </title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="keywords" content="PHP FormMail Generator, Free Form, Form Builder, Form Creator, phpFormMailGen, Customized Web Forms, phpFormMailGenerator,formmail.php, formmail.pl, formMail Generator, ASP Formmail, ASP form, PHP Form, Generator, phpFormGen, phpFormGenerator, anti-spam, web hosting">
    <meta name="description" content="PHP formMail Generator - A tool to ceate ready-to-use web forms in a flash">
    <meta name="generator" content="PHP Mail Form Generator, phpfmg.sourceforge.net">

<style type='text/css'>

body{
    margin-left: 18px;
    margin-top: 18px;
}

body{
    font-family : Verdana, Arial, Helvetica, sans-serif;
    font-size : 13px;
    color : #474747;
    background-color: transparent;
}

select, option{
    font-size:13px;
}

ol.phpfmg_form{
    list-style-type:none;
    padding:0px;
    margin:0px;
}

ol.phpfmg_form li{
    margin-bottom:5px;
    clear:both;
    display:block;
    overflow:hidden;
	width: 100%
}


.form_field, .form_required{
    font-weight : bold;
}

.form_required{
    color:red;
    margin-right:8px;
}

.field_block_over{
}

.form_submit_block{
    padding-top: 3px;
}

.text_box, .text_area, .text_select {
    width:300px;
}

.text_area{
    height:80px;
}

.form_error_title{
    font-weight: bold;
    color: red;
}

.form_error{
    background-color: #F4F6E5;
    border: 1px dashed #ff0000;
    padding: 10px;
    margin-bottom: 10px;
}

.form_error_highlight{
    background-color: #F4F6E5;
    border-bottom: 1px dashed #ff0000;
}

div.instruction_error{
    color: red;
    font-weight:bold;
}

hr.sectionbreak{
    height:1px;
    color: #ccc;
}




</style>

</head>

<body>

<div class='form_description'>

</div>

<form name="frmFormMail" action='' method='post' enctype='multipart/form-data' onsubmit='return fmgHandler.onsubmit();'>
<input type='hidden' name='formmail_submit' value='Y'>
<div id='err_required' class="form_error" style='display:none;'>
    <label class='form_error_title'>Please check the required fields</label>
</div>
            
            
<ol class='phpfmg_form' >

<li class='field_block' id='field_0_div'><div class='col_label'>
	<label class='form_field'>First Name:</label> <label class='form_required' >*</label> </div>
	<div class='col_field'>
	<input type="text" name="field_0"  id="field_0" value="" class='text_box'>
	<div id='field_0_tip' class='instruction'></div>
	</div>
</li>

<li class='field_block' id='field_1_div'><div class='col_label'>
	<label class='form_field'>Current Location:</label> <label class='form_required' >*</label> </div>
	<div class='col_field'>
	<input type="text" name="field_1"  id="field_1" value="" class='text_box'>
	<div id='field_1_tip' class='instruction'></div>
	</div>
</li>

<li class='field_block' id='field_2_div'><div class='col_label'>
	<label class='form_field'>Your Six Words:</label> <label class='form_required' >*</label> </div>
	<div class='col_field'>
	<input type="text" name="field_2"  id="field_2" value="" class='text_box'>
	<div id='field_2_tip' class='instruction'></div>
	</div>
</li>

<li class='field_block' id='field_3_div'><div class='col_label'>
	<label class='form_field'>You, in a White Shirt:</label> <label class='form_required' >*</label> </div>
	<div class='col_field'>
	<input type="file" name="field_3"  id="field_3" value="" class='text_box' onchange="fmgHandler.check_upload(this);">
	<div id='field_3_tip' class='instruction'>make sure your full torso and face are visible!</div>
	</div>
</li>


<li class='field_block' id='phpfmg_captcha_div'>
	<div class='col_label'><label class='form_field'>Security Code:</label> <label class='form_required' >*</label> </div><div class='col_field'>
	    <img id="phpfmg_captcha_image" src="admin-31272.php" onclick="this.src='admin.php?mod=captcha&amp;func=get&amp;tid='+Math.random();" border=0 style="cursor:pointer;" alt="Click the image to reload. PHP FormMail Generator at http://phpfmg.sourceforge.net">
    <a href="http://phpfmg.sourceforge.net" onclick="document.getElementById('phpfmg_captcha_image').src='admin.php?mod=captcha&amp;func=get&amp;tid='+Math.random();return false;" style="color:#474747;" title="Reload PHP FormMail Generator Security Image" >Reload Image</a><br>
    <input type='text' name="fmgCaptchCode" value="" class="fmgCaptchCode" style="width:73px;" >  
	</div>
</li>


            <li>
            <div class='col_label'>&nbsp;</div>
            <div class='form_submit_block col_field'>
	
                <input type='submit' value='Submit' class='form_button'>
                <span id='phpfmg_processing' style='display:none;'>
                    <img id='phpfmg_processing_gif' src='admin-26954.php' border=0 alt='Processing...'> <label id='phpfmg_processing_dots'></label>
                </span>
            </div>
            </li>
            
</ol>
            
            


</form>




<script type="text/javascript">
 function dd_change( n, max, prefix ){
    if( n >= max-1 )
        return; // the last dropdown, no need to query
    
    //var prefix = 'dd_' ;
    // reset all other dropdown options
    var next = n+1; 
    for( var i = next; i < max; i ++ ){
        var dd = document.getElementById(prefix +'_' + i );
        if( dd && dd.length >= 1 ) dd.length = 1 ; // keep the first one '- select -'
    };


    // request drop down data from server
    var me = this;
    var http;
    if(navigator.appName == "Microsoft Internet Explorer"){
        me.http = new ActiveXObject("Microsoft.XMLHTTP");
    }else{
        me.http = new XMLHttpRequest();
    };
    
    
    // build query string
    var lookup = [];
    for( var i = 0; i < next; i ++ ){
        lookup.push( "lookup[" + i + "]=" + document.getElementById(prefix +'_' +  i ).value )
    };
    lookup = lookup.join('&');
    
    var url = 'admin.php?mod=dd&func=lookup&n='+next+ '&field_name=' + prefix + '&' + lookup;
    me.http.open('get', url);
    me.http.onreadystatechange = function(){
    
        if( me.http.readyState == 4 ){
            // rebuild the next dropdown options
            var eNext = document.getElementById(prefix +'_' + next );
            if( !eNext )
                return;
            
            var data = me.http.responseText;    
            var opts = String(data).split("\n");
            for( var j = 0, J = opts.length; j < J; j ++ ){
                eNext.options[ eNext.length ] = new Option( opts[j], opts[j], false, false );                
            }; // for
        }; //if
        
    }; 
    me.http.send(null);

 }
 
    
function PHPFMG( formID ){
    var frmID = formID;
    var exts = {
        'upload_control' : '',
        'harmful_exts'  : '.php, .html, .css, .js, .exe, .com, .bat, .vb, .vbs, scr, .inf, .reg, .lnk, .pif, .ade, .adp, .app, .bas, .chm, .cmd, .cpl, .crt, .csh, .fxp, .hlp, .hta, .ins, .isp, .jse, .ksh, .Lnk, .mda, .mdb, .mde, .mdt, .mdw, .mdz, .msc, .msi, .msp, .mst, .ops, .pcd, .prf, .prg, .pst, .scf, .scr, .sct, .shb, .shs, .url, .vbe, .wsc, .wsf, .wsh',
        'harmful_errmsg': "File is potential harmful. Upload is not allowed.",
        'allow_exts'  : '.jpg, .gif, .png, .bmp',
        'allow_errmsg': "Upload is not allowed. Please check your file type."
    };

    function $( id ){
        return document.getElementById(id);
    }

    function get_form( id ){
        var frm = 'object' == typeof($(id)) ? $(id) : eval( 'document.' + id ) ;
        return frm ? frm : document.forms[0];
    } 
    
    function file_ext( f ){
        var n = f.lastIndexOf(".");
        return -1 == n ? '' : f.substr( n ).toLowerCase();
    }
    
    function addLabelEvents(){
        var labels = document.body.getElementsByTagName('LABEL');
        for( var i = 0, N = labels.length; i < N; i ++ ){
            var e = labels[i];
            if( -1 != String(e.className).indexOf('form_choice_text') ){
                var oid = e.getAttribute('oid'); 
                if( !oid ) continue;

                e.onmouseout = function(){ this.className = 'form_choice_text'; };
                e.onmouseover = function(){ this.className = 'form_choice_text form_choice_over'; };
                e.onclick = function(){
                    try{
                        var oid = this.getAttribute('oid'); 
                        var O = document.getElementById(oid);
                        O.checked = !O.checked;
                    }
                    catch(E){};
                };
            }; // if
        }; // for
    } 


    function addFieldBlockEvents(){
        var divs = document.body.getElementsByTagName('DIV');
        for( var i = 0, N = divs.length; i < N; i ++ ){
            var e = divs[i];
            if( -1 != String(e.className).indexOf('field_block') ){
                e.onmouseout = function(){  if( String(this.className).indexOf('form_error_highlight') == -1 ) this.className = 'field_block'; };
                e.onmouseover = function(){ if( String(this.className).indexOf('form_error_highlight') == -1 ) this.className = 'field_block field_block_over'; };
            }; // if
        }; // for
    } 

    function removeHighliht(){
        var divs = document.body.getElementsByTagName('DIV');
        for( var i = 0, N = divs.length; i < N; i ++ ){
            var e = divs[i];
            var cn = String(e.className);
            if( -1 != cn.indexOf('form_error_highlight') ){
                e.className = cn.replace('form_error_highlight','');
            }; // if
        }; // for
    } 
    
    function showProcessing(){
        try{
            var E = $('phpfmg_processing');
            if( !E ) return ;
            if( -1 != navigator.userAgent.toLowerCase().indexOf('msie') ){
                E.style.backgroundColor='#2960AF';
                $('phpfmg_processing_gif').style.display = 'none';
                setInterval( 'fmgHandler.dots()', 380 );
            };
            E.style.display = '' ;
        }catch(e){};
        
    }
    
    
    this.highlight_fields = function( fields ){
        var A = fields.split(',');
        for( var i = 0, N = A.length; i < N; i ++ ){
            var E = $( A[i] + '_div' );
            if( E ){
                E.className += ' form_error_highlight'; 
            };
            var T = $( A[i] + '_tip' );
            if( T ){
                T.className += ' instruction_error'; 
            };
        };
        if( A.length > 0 ) $('err_required').style.display='';
    }
    
    this.choice_clicked = function( id ){
        $(id).checked = !$(id).checked ;
    }
    
    
    this.init = function(){
        //addLabelEvents();
        addFieldBlockEvents();
    }

    this.harmful = function(e){
        if( 'deny' != exts['upload_control'] ){
            return; 
        };
        
        var ext = file_ext(e.value);
        if( -1 != exts['harmful_exts'].toLowerCase().indexOf(ext) ){
            alert( exts['harmful_errmsg'] );
            e.value = '';
        };
    } 
        
    this.is_allow = function(e){
        if( 'allow' != exts['upload_control'] ){
            return; 
        };
        
        var ext = file_ext(e.value);
        if( -1 == exts['allow_exts'].toLowerCase().indexOf(ext) ){
            alert( exts['allow_errmsg'] );
            e.value = '';
        };
    } 

    this.check_upload = function(e){
        if( '' == exts['upload_control'] )
            return ;
        else
            return ( 'deny' == exts['upload_control'] ) 
                   ? this.harmful(e) 
                   : this.is_allow(e);
    }

    this.dots = function(){
        $('phpfmg_processing_dots').innerHTML += '.';
		if( $('phpfmg_processing_dots').innerHTML.length >= 38 ) {
			$('phpfmg_processing_dots').innerHTML = '.';
		};
    }
    
    this.onsubmit = function(){
        showProcessing();
        return true;
    }
    


    var Form = null;
    var err_fields=null;
}
var fmgHandler = new PHPFMG();
fmgHandler.init();


</script>

<div class='form_footer'>

</div>


	<br><br>
	
	<div style="padding-left:10px; font-size:11px;color:#cccccc;text-decoration:none;">
		:: <a href="http://phpfmg.sourceforge.net" target="_blank" title="Free Mailform Maker: Create read-to-use Web Forms in a flash" style="color:#cccccc;text-decoration:none;font-weight:bold;">PHP FormMail Generator</a> ::
	</div>

 </body>
</html>

<!-- Localized -->