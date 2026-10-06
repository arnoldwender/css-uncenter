import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Keep the stable React runtime cached separately from application changes.
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'react-runtime', test: /node_modules\/(react|react-dom|scheduler)\// }],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
