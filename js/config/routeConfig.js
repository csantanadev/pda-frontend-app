angular.module("apppeladadosamigos")

    .config(function ($routeProvider) {

        // home
        $routeProvider.when("/", {
            templateUrl: "view/home/home.html",
            controller: "homeCtrl"
        });

        // alterar senha
        $routeProvider.when("/alterarsenha", {
            templateUrl: "view/home/alterarsenha.html",
            controller: "alterarSenhaCtrl"
        });


        // login
        $routeProvider.when("/login", {
            templateUrl: "view/login/login.html",
            controller: "loginCtrl"
        });


        // Jogadores
        $routeProvider.when("/jogadores", {
            templateUrl: "view/jogadores/jogadores.html",
            controller: "jogadoresCtrl"
        });
        $routeProvider.when("/novoJogador/", {
            templateUrl: "view/jogadores/manterJogadores.html",
            controller: "jogadoresManterCtrl",
            resolve: {
                dadosTabela: function (frameAPI) {
                    return frameAPI.get('Tabela');
                }
            }
        });
        $routeProvider.when("/detalheJogador/:id", {
            templateUrl: "view/jogadores/manterJogadores.html",
            controller: "jogadoresDetalheCtrl"
        });
        $routeProvider.when("/perfilJogador/:id", {
            templateUrl: "view/jogadores/PerfilJogador.html",
            controller: "homeCtrl"
        });
        $routeProvider.when("/perfilJogadorDash/:id", {
            templateUrl: "view/jogadores/PerfilJogadorDash.html",
            controller: "homeCtrl"
        });


        // Peladas
        $routeProvider.when("/peladas", {
            templateUrl: "view/peladas/peladas.html",
            controller: "peladasCtrl"
        });
        $routeProvider.when("/novaPelada/", {
            templateUrl: "view/peladas/manterPeladas.html",
            controller: "peladasManterCtrl"
        });
        $routeProvider.when("/detalhePelada/:id", {
            templateUrl: "view/peladas/manterPeladas.html",
            controller: "peladasDetalheCtrl"
        });
        $routeProvider.when("/scoutsPelada/:id", {
            templateUrl: "view/peladas/scoutsPelada.html",
            controller: "scoutsPeladaCtrl"
        });
        $routeProvider.when("/votacaoPelada/:id", {
            templateUrl: "view/peladas/votacaoPelada.html",
            controller: "votacaoPeladaCtrl"
        });


        // Notificações
        $routeProvider.when("/notifications", {
            templateUrl: "view/notifications/notifications.html",
            controller: "notificationsCtrl"
        });


         // Financeiro
         $routeProvider.when("/financeiro", {
            templateUrl: "view/financeiro/financeiro.html",
            controller: "financeiroCtrl"
        });
        $routeProvider.when("/novofinanceiro", {
            templateUrl: "view/financeiro/manterFinanceiro.html",
            controller: "financeiroManterCtrl"
        });
        $routeProvider.when("/detalheFinanceiro/:id", {
            templateUrl: "view/financeiro/manterFinanceiro.html",
            controller: "financeiroDetalheCtrl"
        });

         // dashboard
         $routeProvider.when("/dashboard", {
            templateUrl: "view/dashboard/dashboard.html",
            controller: ""
        });
        
        $routeProvider.when("/dashboard/fincancas", {
            templateUrl: "view/dashboard/dashboard_fincancas.html",
            controller: "dashboardCtrl"
        }); 

        $routeProvider.when("/dashboard/artilheiroano", {
            templateUrl: "view/dashboard/dashboard_artilheiro_ano.html",
            controller: "dashboardCtrl"
        }); 

        $routeProvider.when("/dashboard/artilheiromes", {
            templateUrl: "view/dashboard/dashboard_artilheiro_mes.html",
            controller: "dashboardCtrl"
        }); 

        $routeProvider.when("/dashboard/selecaomes", {
            templateUrl: "view/dashboard/dashboard_selecao_mes.html",
            controller: "dashboardCtrl"
        }); 

        $routeProvider.when("/dashboard/selecaoano", {
            templateUrl: "view/dashboard/dashboard_selecao_ano.html",
            controller: "dashboardCtrl"
        }); 

        $routeProvider.when("/dashboard/mediagols", {
            templateUrl: "view/dashboard/dashboard_media_gols.html",
            controller: "dashboardCtrl"
        }); 

        $routeProvider.when("/dashboard/disciplicados", {
            templateUrl: "view/dashboard/dashboard_disciplinados.html",
            controller: "dashboardCtrl"
        });

        $routeProvider.when("/dashboard/indisciplicados", {
            templateUrl: "view/dashboard/dashboard_indisciplinados.html",
            controller: "dashboardCtrl"
        });

        $routeProvider.when("/dashboard/frequencia", {
            templateUrl: "view/dashboard/dashboard_frequencia.html",
            controller: "dashboardCtrl"
        });

        $routeProvider.when("/dashboard/divida_ativa", {
            templateUrl: "view/dashboard/dashboard_divida_ativa.html",
            controller: "dashboardCtrl"
        });

        $routeProvider.when("/dashboard/aniversariantes", {
            templateUrl: "view/dashboard/dashboard_aniversariantes.html",
            controller: "dashboardCtrl"
        });

        $routeProvider.when("/dashboard/auditoria", {
            templateUrl: "view/dashboard/dashboard_auditoria.html",
            controller: "dashboardAuditoriaCtrl"
        });

        $routeProvider.otherwise({ redirectTo: "/" });
    })

    .run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http) {

        $rootScope.globals = $cookieStore.get('globals') || {};

        if ($rootScope.globals.currentUser) {

            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;

        }

        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {

        	// recolher o menu a cada mudanca de rota
            if(!$("#btn-menu").hasClass("collapsed"))
            {
            	$("#btn-menu").click();
            }

            // controle de cook 
            if($location.path() !== '/peladas' && 
               $location.path().indexOf("scoutsPelada") == -1 && 
               $location.path().indexOf("novaPelada") == -1 &&
               $location.path().indexOf("detalhePelada") == -1 &&
               $location.path().indexOf("votacaoPelada") == -1)
            {
                $cookieStore.remove('cookPesqPelada');
            }

            if($location.path() !== '/financeiro' && 
               $location.path().indexOf("novofinanceiro") == -1 && 
               $location.path().indexOf("detalheFinanceiro") == -1)
            {
                $cookieStore.remove('cookPesqFinanc');
            }
           

            // se entrou aqui é pq houve mudança de rota
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {

                $location.path('/login');

            }


        })

    }]);