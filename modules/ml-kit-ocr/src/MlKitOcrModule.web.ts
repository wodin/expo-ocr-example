import { NativeModule, registerWebModule } from 'expo';

class MlKitOcrModule extends NativeModule {
  async recognizeTextAsync(uri: string): Promise<string> {
    throw new Error('The OCR module is not supported on Web.');
  }
};

export default registerWebModule(MlKitOcrModule);
