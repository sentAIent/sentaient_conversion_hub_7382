import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    base: '/legaleagle/',
    plugins: [
        react(),
        {
            name: 'add-trailing-slash',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url === '/legaleagle') {
                        res.writeHead(301, { Location: '/legaleagle/' });
                        res.end();
                        return;
                    }
                    if (req.url === '/') {
                        res.writeHead(301, { Location: '/legaleagle/' });
                        res.end();
                        return;
                    }
                    next();
                });
            }
        }
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 5173,
        host: true,
    },
})
