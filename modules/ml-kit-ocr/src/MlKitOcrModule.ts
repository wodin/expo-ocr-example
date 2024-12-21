import { NativeModule, requireNativeModule } from 'expo';

import { MlKitOcrModuleEvents } from './MlKitOcr.types';

declare class MlKitOcrModule extends NativeModule<MlKitOcrModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<MlKitOcrModule>('MlKitOcr');
