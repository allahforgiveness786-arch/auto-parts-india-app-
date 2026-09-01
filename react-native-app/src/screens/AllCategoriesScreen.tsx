import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { Category3DIcon } from '../components/Category3DIcon';

export default function AllCategoriesScreen({ navigation, route }: any) {
  const { categories } = route.params || { categories: [] };

  const renderItem = ({ item }: { item: any }) => {
    if (item.name === 'More') return null;

    return (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => {
          navigation.navigate('MainTabs', { screen: 'HomeTab', params: { selectedCategory: item.name } });
        }}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Category3DIcon type={item.is3DGraphic || item.name} size={50} />
        </View>
        <Text style={styles.categoryLabel}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Appbar.Header style={{ backgroundColor: '#FFFFFF', elevation: 0 }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="All Categories" titleStyle={{ fontWeight: '700', fontSize: 18 }} />
      </Appbar.Header>

      <FlatList
        data={categories}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconContainer: {
    width: 58,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
});
