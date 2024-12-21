import { requireNativeView } from 'expo';
import * as React from 'react';

import { MlKitOcrViewProps } from './MlKitOcr.types';

const NativeView: React.ComponentType<MlKitOcrViewProps> =
  requireNativeView('MlKitOcr');

export default function MlKitOcrView(props: MlKitOcrViewProps) {
  return <NativeView {...props} />;
}
