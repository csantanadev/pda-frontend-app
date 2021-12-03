angular.module("apppeladadosamigos").factory("smsAPI", ['$http', 'config', function ($http, config) {

    var _sendSMS = function (telefone, message) {

    	/*fetch('https://api2.totalvoice.com.br/sms', {
		    method: 'POST',
		    body: JSON.stringify({
		      numero_destino: telefone,
		      mensagem: message
		    }),
		    headers: {
		      "Content-type": "application/json; charset=UTF-8",
		      "Access-Token": config.tokenSMS
		    }
		  })
		  .then(response => response.json())
		  .then(json => console.log(json));

		  return jsonRet;*/
  

       /* return  $http.post('https://api2.totalvoice.com.br/sms', 
        					{
				        	    'numero_destino': '81988693905',
				             	'mensagem': 'PELADA DOS AMIOS INFORMA: Não esqueça de votar !! Votação aberta.'
				        	}, 
				        	{
                				'Access-Token': 'ade49cb6a4a8dee84ed22ff8838fe3a6'
            				}); */

        /*return $http({
				            url: 'https://api2.totalvoice.com.br/sms',
				            method: 'post',
				            headers: {
				                'Access-Token': 'ade49cb6a4a8dee84ed22ff8838fe3a6'
				            },
				            data:
				            {
				                'numero_destino': '81988693905',
				                'mensagem': 'PELADA DOS AMIOS INFORMA: Não esqueça de votar !! Votação aberta.'
				            }

				        });  			*/

		return null;				        

    };

    return {
        sendSMS: _sendSMS
    };

}]);