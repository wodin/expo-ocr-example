import { NativeModule, requireNativeModule } from 'expo';

import { MlKitOcrModuleEvents } from './MlKitOcr.types';

declare class MlKitOcrModule extends NativeModule {
  recognizeTextAsync(uri: string): Promise<string>;
}

 // This call loads the native module object from the JSI.
export default requireNativeModule<MlKitOcrModule>('MlKitOcr');
