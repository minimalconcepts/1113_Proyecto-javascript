package com.agencia.museomotor.routes;

/**
 * Contrato simple para conectar una ruta HTTP con un metodo de controlador.
 */
@FunctionalInterface
public interface RouteHandler {

    String handle();
}
