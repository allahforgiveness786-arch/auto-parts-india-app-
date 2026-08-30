import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Text, Icon, Appbar } from 'react-native-paper';

export default function AllCategoriesScreen({ navigation, route }: any) {
  const { categories } = route.params || { categories: [] };

  const renderItem = ({ item }: { item: any }) => {
    if (item.name === 'More') return null;

    return (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => {
          navigation.navigate('HomeTab', { screen: 'Home', params: { selectedCategory: item.name } });
        }}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: (item.iconColor || '#0F172A') + '15' }]}>
          <Icon source={item.icon || 'apps'} size={32} color={item.iconColor || '#0F172A'} />
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
  },
  categoryCard: {
    width: '31%',
    marginRight: '2%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
});
