## Pendiente

Loader al cargar los libros/optimizar carga

Página de resultados por categoría

Arreglar error número de peticiones/useCallBack/useEffect

# Visión General del Proyecto

## Descripción de la Aplicación

Aplicación para visualizar un catálogo de libros a través de la API de Google Books y tener listados de Libros Guardados, Libros por Leer... entre otras cosas.

## Tecnologías

<strong>Frontend:</strong> Next.js para la interfaz de usuario y la generación de páginas estáticas/dinámicas.

<strong>Backend:</strong> Puedes usar un backend simple con Next.js API Routes para manejar operaciones básicas o integrar un backend más robusto si lo necesitas (por ejemplo, usando Express.js, Django, etc.).

<strong>Base de Datos:</strong> Podrías usar una base de datos como MongoDB, PostgreSQL, o incluso un sistema sin servidor como Firebase para almacenar los libros guardados por el usuario.

## Componentes y funcionalidades

Página de Inicio: Pantalla principal donde los usuarios pueden buscar libros.

Página de Resultados de Búsqueda: Mostrar los resultados obtenidos de la API de Google Books. (Esta puede ser la misma que la de inicio, tan solo filtrando el contenido según la búsqueda).

Página de Detalles del Libro (Ficha del libro): Mostrar detalles más completos de un libro seleccionado.

Gestión de Listas de Libros: Los usuarios pueden marcar libros como "Leídos" o "Por Leer".

Autenticación de Usuarios: Para guardar los libros en listas personalizadas, es posible que necesites implementar autenticación de usuarios con servicios como Firebase Authentication o Auth0.

## Arquitectura y Diseño

Componentes de React: Crear componentes reutilizables para la UI (por ejemplo, lista de libros, tarjetas de libro, etc.).

Gestión de Estado: Puedes usar Context API o una solución más avanzada como Redux para manejar el estado global. (Para las listas de leídos y por leer)

Interacción con la API de Google Books: Utilizar fetch o axios para hacer solicitudes a la API y obtener datos de los libros.
