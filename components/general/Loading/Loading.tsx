import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { View } from '../../Themed';

interface Props {
  loading: boolean;
  size?: number | 'small' | 'large';
}
export default function ({ loading, size = 'small' }: Props) {
  if (!loading) return null;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating size={size} />
    </View>
  );
}
