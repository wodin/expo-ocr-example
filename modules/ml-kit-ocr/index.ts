// Reexport the native module. On web, it will be resolved to MlKitOcrModule.web.ts
// and on native platforms to MlKitOcrModule.ts
export { default } from './src/MlKitOcrModule';
export { default as MlKitOcrView } from './src/MlKitOcrView';
export * from  './src/MlKitOcr.types';
