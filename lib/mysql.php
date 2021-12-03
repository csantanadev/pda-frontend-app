<?php

class DbMySql {

    private static $__conn;

    public static function getConn() {
        if (self::$__conn == null) {
            self::$__conn = mysqli_connect("localhost", "root", "", "appmpm");
            // Set false to "auto commit"
            mysqli_autocommit(self::$__conn, FALSE);
            // Set 120 seconds for timeout 
            mysqli_options(self::$__conn, MYSQLI_OPT_CONNECT_TIMEOUT, 120);
            if (mysqli_connect_errno()) {
                throw new Exception("Erro ao conectar ao MySQL: " . mysqli_connect_error());
            }

            // changing character set to utf8
            mysqli_set_charset(self::$__conn, "utf8");
        }
        return self::$__conn;
    }

    function __destruct() {
        mysqli_close(self::$__conn);
    }

    public static function Rollback() {
        try {
            mysqli_rollback(self::$__conn);
        } catch (Exception $e) {
            throw new Exception("Erro ao realizar Rollback ao MySQL: " . mysqli_connect_error());
        }
    }

    /*public static function ExecutarQuery($sql, $entidade) {

        $result = mysqli_query(self::$__conn, $sql);

        $retorno = Array();

        if (!$result) {

            $retorno[] = Array(
                "CODIGO_ERRO" => 99,
                "MSG" => 'Ocorreu um erro ao tentar salvar registro em: ' . $entidade . ' Msg Original: ');

            //$retorno = json_encode($retorno);
            die('');
        } else {

            $retorno[] = Array(
                "CODIGO_ERRO" => 0,
                "MSG" => 'Dados salvos com sucesso.');

            //$retorno = json_encode($retorno);
        }
        return $retorno;
     
    }*/

    public static function Commit() {
        try {
            mysqli_commit(self::$__conn);
        } catch (Exception $e) {
            throw new Exception("Erro ao realizar Commit ao MySQL: " . mysqli_connect_error());
        }
    }

    public static function GetEscalar($sql) {
        $result = mysqli_query($this->__conn, $sql);
        $row = mysqli_fetch_array($result);
        return $row[0];
    }

}
