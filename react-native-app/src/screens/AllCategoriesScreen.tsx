import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { Category3DIcon } from '../components/Category3DIcon';

const DEFAULT_CATEGORIES = [
  { id: 'engine', name: 'Engine & Parts', is3DGraphic: 'engine' },
  { id: 'body', name: 'Body Parts', is3DGraphic: 'body' },
  { id: 'electricals', name: 'Electricals', is3DGraphic: 'electricals' },
  { id: 'suspension', name: 'Suspension', is3DGraphic: 'suspension' },
  { id: 'exhaust', name: 'Exhaust', is3DGraphic: 'exhaust' },
  { id: 'brakes', name: 'Brakes', is3DGraphic: 'brakes' },
  { id: 'filters', name: 'Filters', is3DGraphic: 'filters' },
  { id: 'accessories', name: 'Accessories', is3DGraphic: 'more' },
  { id: 'tyres', name: 'Tyres & Wheels', is3DGraphic: 'suspension' },
  { id: 'transmission', name: 'Transmission', is3DGraphic: 'engine' },
  { id: 'cooling', name: 'AC & Cooling', is3DGraphic: 'electricals' },
  { id: 'lighting', name: 'Lights & Indicators', is3DGraphic: 'electricals' },
];

export default function AllCategoriesScreen({ navigation, route }: any) {
  const passedCats = route?.params?.categories;
  const categories = (Array.isArray(passedCats) && passedCats.length > 0) ? passedCats : DEFAULT_CATEGORIES;

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
          <Category3DIcon type={item.is3DGraphic || item.name} size={48} />
        </View>
        <Text style={styles.categoryLabel} numberOfLines={2}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Appbar.Header style={{ backgroundColor: '#FFFFFF', elevation: 0 }}>
        <Appbar.BackAction onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('MainTabs', { screen: 'HomeTab' });
          }
        }} />
        <Appbar.Content title="All Categories" titleStyle={{ fontWeight: '700', fontSize: 18 }} />
      </Appbar.Header>

      <FlatList
        data={categories.filter((c: any) => c.name !== 'More')}
        keyExtractor={(item, index) => item.id || item.name || index.toString()}
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
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
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
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#002F34',
    textAlign: 'center',
  },
});
