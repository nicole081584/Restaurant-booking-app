// components/LoadingOverlay.tsx
import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ContainerStyles from '@/components/ContainerStyles';

interface LoadingOverlayProps {
  visible: boolean;
}

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  return (
    <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
          >
            <ThemedView style={ContainerStyles.loadingOverlay}>
              <ActivityIndicator size="large" color="#560324" />
            </ThemedView>
          </Modal>
  );
}
