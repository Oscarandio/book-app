/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "books.google.com",
        port: "", // si es necesario especificar un puerto, de lo contrario, puede dejarse en blanco
        pathname: "/books/**", // patrón de ruta para las imágenes
      },
    ],
  },
};

export default nextConfig;
