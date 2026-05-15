package com.agencia.museomotor.config;

import com.agencia.museomotor.routes.RouteHandler;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * Despachador HTTP.
 * Decide si una peticion debe servir un recurso estatico o ejecutar una ruta MVC.
 */
public class ServerDispatcher implements HttpHandler {

    private final Map<String, RouteHandler> routes;

    public ServerDispatcher(Map<String, RouteHandler> routes) {
        this.routes = routes;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String path = exchange.getRequestURI().getPath();

        if (path.startsWith("/static/")) {
            serveStaticResource(exchange, path);
            return;
        }

        RouteHandler handler = routes.get(path);
        if (handler == null) {
            send(exchange, 404, "text/html", "<h1>404</h1><p>Ruta no encontrada.</p>");
            return;
        }

        send(exchange, 200, "text/html", handler.handle());
    }

    /**
     * Sirve archivos CSS, JavaScript e imagenes ubicados en resources/static.
     */
    private void serveStaticResource(HttpExchange exchange, String path) throws IOException {
        String resourcePath = path.substring(1);

        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(resourcePath)) {
            if (inputStream == null) {
                send(exchange, 404, "text/plain", "Recurso estatico no encontrado.");
                return;
            }

            byte[] content = inputStream.readAllBytes();
            exchange.getResponseHeaders().set("Content-Type", contentType(path));
            exchange.sendResponseHeaders(200, content.length);

            try (OutputStream outputStream = exchange.getResponseBody()) {
                outputStream.write(content);
            }
        }
    }

    private void send(HttpExchange exchange, int status, String contentType, String body) throws IOException {
        byte[] content = body.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", contentType + "; charset=UTF-8");
        exchange.sendResponseHeaders(status, content.length);

        try (OutputStream outputStream = exchange.getResponseBody()) {
            outputStream.write(content);
        }
    }

    private String contentType(String path) {
        if (path.endsWith(".css")) {
            return "text/css; charset=UTF-8";
        }
        if (path.endsWith(".js")) {
            return "application/javascript; charset=UTF-8";
        }
        if (path.endsWith(".png")) {
            return "image/png";
        }
        if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
            return "image/jpeg";
        }
        return "application/octet-stream";
    }
}
