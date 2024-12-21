import * as React from 'react';

import { MlKitOcrViewProps } from './MlKitOcr.types';

export default function MlKitOcrView(props: MlKitOcrViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
