import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        // Plugin to serve Hugo blog files in development
        {
          name: 'serve-hugo-blog',
          configureServer(server) {
            // Register middleware early, before React SPA fallback
            server.middlewares.use((req, res, next) => {
              const url = req.url || '';
              
              // Handle blog pagination routes (/page/2/, /page/3/, etc.)
              if (url.startsWith('/page/')) {
                // Ensure URL ends with / for directory matching
                const normalizedUrl = url.endsWith('/') ? url : url + '/';
                const pagePath = path.join(__dirname, 'dist', 'blog', normalizedUrl);
                
                // Try directory with index.html first
                if (fs.existsSync(pagePath) && fs.statSync(pagePath).isDirectory()) {
                  const indexPath = path.join(pagePath, 'index.html');
                  if (fs.existsSync(indexPath)) {
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(indexPath).pipe(res);
                    return;
                  }
                }
                
                // Try as file
                const filePath = path.join(__dirname, 'dist', 'blog', url);
                if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                  res.setHeader('Content-Type', 'text/html');
                  fs.createReadStream(filePath).pipe(res);
                  return;
                }
              }
              
              // Handle blog routes
              if (url.startsWith('/blog')) {
                // Remove /blog prefix and get the file path
                const urlPath = url.replace(/^\/blog/, '') || '/';
                const filePath = path.join(__dirname, 'dist', 'blog', urlPath === '/' ? 'index.html' : urlPath);
                
                // Check if file exists
                if (fs.existsSync(filePath)) {
                  const stat = fs.statSync(filePath);
                  
                  // If it's a directory, try index.html
                  if (stat.isDirectory()) {
                    const indexPath = path.join(filePath, 'index.html');
                    if (fs.existsSync(indexPath)) {
                      res.setHeader('Content-Type', 'text/html');
                      fs.createReadStream(indexPath).pipe(res);
                      return;
                    }
                  }
                  
                  // Serve the file
                  if (stat.isFile()) {
                    const ext = path.extname(filePath).toLowerCase();
                    const contentType = getContentType(ext);
                    res.setHeader('Content-Type', contentType);
                    fs.createReadStream(filePath).pipe(res);
                    return;
                  }
                }
                
                // If file doesn't exist, try with .html extension
                if (!filePath.endsWith('.html')) {
                  const htmlPath = filePath + '.html';
                  if (fs.existsSync(htmlPath)) {
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(htmlPath).pipe(res);
                    return;
                  }
                }
                
                // Try blog subdirectory structure (e.g., /blog/post-slug -> /blog/blog/post-slug/index.html)
                const blogSubPath = path.join(__dirname, 'dist', 'blog', 'blog', urlPath.replace(/^\//, ''), 'index.html');
                if (fs.existsSync(blogSubPath)) {
                  res.setHeader('Content-Type', 'text/html');
                  fs.createReadStream(blogSubPath).pipe(res);
                  return;
                }
              }
              
              // Handle blog assets (CSS, JS, images)
              if (url.startsWith('/css/') || url.startsWith('/js/') || url.startsWith('/images/')) {
                const assetPath = path.join(__dirname, 'dist', 'blog', url);
                if (fs.existsSync(assetPath) && fs.statSync(assetPath).isFile()) {
                  const ext = path.extname(assetPath).toLowerCase();
                  const contentType = getContentType(ext);
                  res.setHeader('Content-Type', contentType);
                  fs.createReadStream(assetPath).pipe(res);
                  return;
                }
              }
              
              next();
            });
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

function getContentType(ext: string): string {
  const types: Record<string, string> = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
  };
  return types[ext] || 'application/octet-stream';
}
