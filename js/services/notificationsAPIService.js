angular.module("apppeladadosamigos").factory("notificationsAPI", ['$http', 'config', function ($http, config) {


        var _sendMessage = function (recipients, title, message)
        {

             if(Array.isArray(recipients)) 
             {
                recipients.forEach( r => 

                    fetch(config.baseUrlNotifications, {
                            mode: 'no-cors',
                            method: 'POST',
                            body: JSON.stringify({
                            'to': r,
                            'sound': 'default',
                            'title': title,
                            'body': message,
                            '_displayInForeground': 'true',
                            'channelId': 'pda-messages'
                            }),
                            headers: {
                                "Content-type": "application/json",
                                "Accept-encoding": "gzip, deflate"
                            }
                    })
                 )
             }
             else
             {
                fetch(config.baseUrlNotifications, {
                            mode: 'no-cors',
                            method: 'POST',
                            body: JSON.stringify({
                            'to': recipients,
                            'sound': 'default',
                            'title': title,
                            'body': message,
                            '_displayInForeground': 'true',
                            'channelId': 'pda-messages'
                            }),
                            headers: {
                                "Content-type": "application/json",
                                "Accept-encoding": "gzip, deflate"
                            }
                    })
             }

            return true
        };

        var _getTokens = function () {

            return $http.get(config.baseUrl + "index.php/Notifications/getTokens/");
        
        };

         var _getPeladeirosToken = function () {

            return $http.get(config.baseUrl + "index.php/Notifications/getPeladeirosToken/");
        
        };



        return {
            sendMessage: _sendMessage,
            getTokens : _getTokens,
            getPeladeirosToken : _getPeladeirosToken            
        };

    }]);