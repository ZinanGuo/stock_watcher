import { defineConfig } from 'vite'            
import react from '@vitejs/plugin-react-swc'   // React + SWC 

export default defineConfig({
  plugins: [react()],                          // React （JSX/TSX exchange）
  server: {
    port: 5173,                                // server port default 5173
    proxy: {
      '/api': {                                
        target: 'http://127.0.0.1:8080',       
        changeOrigin: true,                    
        secure: false                          // allow http/self-signed backend
      }
    }
  }
})
