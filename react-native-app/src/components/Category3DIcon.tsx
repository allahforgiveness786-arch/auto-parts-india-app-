import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-paper';

interface Category3DIconProps {
  type: string;
  size?: number;
}

export const Category3DIcon: React.FC<Category3DIconProps> = ({ type, size = 52 }) => {
  if (type === 'engine') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1598209279122-8541213a0387?auto=format&fit=crop&q=80&w=260' }}
          style={styles.img}
          resizeMode="cover"
        />
      </View>
    );
  }

  if (type === 'door') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={styles.doorMockBox}>
          <View style={styles.doorWindow} />
          <View style={styles.doorHandle} />
        </View>
      </View>
    );
  }

  if (type === 'lightning') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Icon source="flash" size={size * 0.75} color="#EAB308" />
      </View>
    );
  }

  if (type === 'suspension') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={styles.suspensionBox}>
          <Icon source="car-brake-alert" size={size * 0.72} color="#0F172A" />
        </View>
      </View>
    );
  }

  if (type === 'exhaust') {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={styles.exhaustBox}>
          <Icon source="pipe-leak" size={size * 0.72} color="#0F172A" />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Icon source="apps" size={size * 0.65} color="#1565FF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  doorMockBox: {
    width: '84%',
    height: '84%',
    backgroundColor: '#2563EB',
    borderRadius: 8,
    borderTopRightRadius: 18,
    padding: 3,
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#1D4ED8',
  },
  doorWindow: {
    width: '82%',
    height: '42%',
    backgroundColor: '#93C5FD',
    borderTopRightRadius: 14,
    borderRadius: 4,
  },
  doorHandle: {
    width: '35%',
    height: 4,
    backgroundColor: '#1E293B',
    borderRadius: 2,
    alignSelf: 'flex-end',
    marginBottom: 4,
    marginRight: 2,
  },
  suspensionBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exhaustBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
