import { NativeModule, requireNativeModule } from 'expo';

declare class OcrModule extends NativeModule {
  recognizeTextAsync(uri: string): Promise<string>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<OcrModule>('OcrModule');
