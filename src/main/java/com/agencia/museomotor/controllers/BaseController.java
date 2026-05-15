package com.agencia.museomotor.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

/**
 * Controlador base del proyecto.
 * Centraliza la lectura de vistas HTML para que los demas controladores no repitan codigo.
 */
public abstract class BaseController {

    /**
     * Carga una vista ubicada dentro de src/main/resources/templates.
     */
    protected String view(String templatePath) {
        String resourcePath = "templates/" + templatePath;

        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(resourcePath)) {
            if (inputStream == null) {
                return "<h1>Vista no encontrada</h1><p>" + templatePath + "</p>";
            }

            return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException exception) {
            throw new IllegalStateException("No se pudo cargar la vista " + templatePath, exception);
        }
    }
}
