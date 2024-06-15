import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import { resolve } from 'path';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';

// TODO: add react-hotkeys-hook to the project
// pnpm i react-hotkeys-hook

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}
export default defineConfig((_env: ConfigEnv) => {
  const env = loadEnv(_env.mode, process.cwd());
  return {
    plugins: [
      million.vite({ auto: true }),
      react({ jsxImportSource: '@emotion/react' }),
      checker({
        typescript: true,
      }),
    ],
    resolve: {
      alias: {
        '@core': pathResolve('src/modules/shared'),
        '@config': pathResolve('src/config'),
        '@layout': pathResolve('src/layout'),
        '@containers': pathResolve('src/containers'),
        '@providers': pathResolve('src/providers'),
        '@assets': pathResolve('src/assets'),
        '@components': pathResolve('src/components'),
        '@modules': pathResolve('src/modules'),
        '@hooks': pathResolve('src/hooks'),
        '@design': pathResolve('src/modules/design/view/DesignForm'),
        src: pathResolve('src'),
        './runtimeConfig': './runtimeConfig.browser',
      },
    },
    base: '/',
    server: {
      host: env.VITE_HOST,
      port: parseInt(env.VITE_PORT, 10),
    },
    build: {
      sourcemap: env.mode === 'development' ? true : false,
      rollupOptions: {
        onwarn: (warning: any, defaultHandler: any) => {
          const listsMessageIgnore = [
            `Can't resolve original location of error`,
            `Export "default" of module`,
            `Either change the import in`,
            `use client`,
          ];
          if (listsMessageIgnore.some((msg) => warning.message.includes(msg))) {
            return;
          }

          return defaultHandler(warning);
        },
        output: {
          /**
           * The pattern to use for chunks created from entry points, or a function that is called per entry chunk to return such a pattern.
           *
           * @see https://rollupjs.org/configuration-options/#output-entryfilenames
           */
          chunkFileNames: 'app/js/[name]-[hash].js',
          /**
           * The pattern to use for naming shared chunks created when code-splitting, or a function that is called per chunk to return such a pattern.
           * @see https://rollupjs.org/configuration-options/#output-chunkfilenames
           */
          entryFileNames: 'app/js/[name]-[hash].js',

          /**
           * The pattern to use for naming custom emitted assets to include in the build output,
           * or a function that is called per asset to return such a pattern.
           * Please ensure that the returned path is relative to the out directory defined in the build.output option.
           *
           * @see https://rollupjs.org/configuration-options/#output-assetfilenames
           *
           */
          assetFileNames: ({ name }: { name: string }) => {
            // Move files which end with gif, jpeg, jpg, png or svg to assets/images.
            // If you don't need hash, you can use the [name] placeholder like this:
            // 'assets/images/[name][extname]'
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
              return 'app/assets/images/[name]-[hash][extname]';
            }

            // Move files which end with css to assets/css
            if (/\.css$/.test(name ?? '')) {
              return 'app/assets/css/[name]-[hash][extname]';
            }

            if (/\.(ttf|woff|woff2)$/.test(name ?? '')) {
              return 'app/assets/font/[name]-[hash][extname]';
            }

            // Default value
            // ref: https://rollupjs.org/guide/en/#outputassetfilenames
            return 'app/[name]-[hash][extname]';
          },
        },
      },
    },
  };
});
