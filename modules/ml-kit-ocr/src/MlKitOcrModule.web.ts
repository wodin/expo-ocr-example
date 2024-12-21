import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './MlKitOcr.types';

type MlKitOcrModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class MlKitOcrModule extends NativeModule<MlKitOcrModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(MlKitOcrModule);
