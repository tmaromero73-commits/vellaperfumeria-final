
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Usamos './' (ruta relativa) para que funcione tanto en la raíz (bellaperfumeria.store)
  // como en la subcarpeta (bellaperfumeria.store/tienda/) sin romperse.
  base: './', 
})
