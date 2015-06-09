<?php

namespace app\database;

interface IBaseDeDatos {

	public function conectar();
	public function desconectar();

	/**
	 * Retorna una lista con objetos
	 * @param  $consultaSQL
	 * @param $array - Array con los datos ingresados por parametros para la consulta
	*/
	public function obtenerDatos($consultaSQL, $array);

	/**
	 * Retorna un valor booleano. Es verdadero si la transaccion se hizo con exito, y falso si hubo un error
	 * @param  $consultaSQL
	 * @param $array - Array con los datos ingresados por parametros para la consulta
	*/
	public function editar($consultaSQL, $array);

	/**
	 * Retorna un valor booleano. Es verdadero si la transaccion se hizo con exito, y falso si hubo un error
	 * @param  $consultaSQL
	 * @param $array - Array con los datos ingresados por parametros para la consulta
	*/
	public function eliminar($consultaSQL, $array);

	/**
	 * Retorna un DTOCrud. Ver DTO crud...
	 * @param  $consultaSQL
	 * @param $array - Array con los datos ingresados por parametros para la consulta
	*/
	public function insertar($consultaSQL, $array);
}
