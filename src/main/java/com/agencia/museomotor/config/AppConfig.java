package com.agencia.museomotor.config;

import com.agencia.museomotor.routes.RouteHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.HashMap;
import java.util.Map;

/**
 * Configuracion principal del servidor.
 * Centraliza el puerto, las rutas registradas y el arranque de la aplicacion.
 */
public class AppConfig {

    private final int port;
    private final Map<String, RouteHandler> routes = new HashMap<>();
    private HttpServer server;

    public AppConfig(int port) {
        this.port = port;
    }

    /**
     * Registra una URL y el controlador que debe atenderla.
     */
    public void get(String path, RouteHandler handler) {
        routes.put(path, handler);
    }

    /**
     * Arranca el servidor usando solo librerias estandar de Java.
     */
    public void start() {
        try {
            server = HttpServer.create(new InetSocketAddress(port), 0);
            server.createContext("/", new ServerDispatcher(routes));
            server.setExecutor(null);
            server.start();
            System.out.println("Museo Wiki del Motor disponible en http://localhost:" + port);
        } catch (IOException exception) {
            throw new IllegalStateException("No se pudo iniciar el servidor en el puerto " + port, exception);
        }
    }
}
