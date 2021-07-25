import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Animated, TextInput, Dimensions, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import Footer from '../../components/Footer';

import api from '../../services/api';

function Products() {

    const navigation = useNavigation();

    const searchInputWidth = useRef(new Animated.Value(0)).current;

    const [products, setProducts] = useState<Array<Product>>([]);
    const [productsPage, setProductsPage] = useState<number>(1);
    const [searchMode, setSearchMode] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    async function fetchProducts() {
        try {
            const { data: products } = await api.get('product');
            setProducts(products);
            setProductsPage(1);
        } catch(err) {
            alert('Um erro ocorreu ao carregar os produtos');
        }
    }

    function handleToggleSearch() {
        setProductsPage(1);
        if (!searchMode) {
            Animated.timing(searchInputWidth, {
                toValue: Dimensions.get('window').width * 0.7,
                duration: 400,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(searchInputWidth, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start()
            setSearch('');
            fetchProducts();
        }
        setSearchMode(!searchMode);
    }

    async function handleSearch() {
        try {
            const { data: newProducts } = await api.get(`/product/search?q=${search}&page=${productsPage}`);
            setProducts(newProducts)
        } catch(err) {
            alert(err);
        }
    }

    function handleUploadProduct() {
        navigation.navigate('upload-product');
    }

    async function handleMoreProducts() {
        try {
            if (searchMode) {
                const { data: productsFetched } = await api.get(`product/search?q=${search}&page=${productsPage + 1}`);
                if (productsFetched[0]) {
                    const newProducts = products.concat(productsFetched);
                    setProducts(newProducts);
                    setProductsPage(productsPage + 1);
                }
            } else {
                const { data: productsFetched } = await api.get(`product?page=${productsPage + 1}`);
                if (productsFetched[0]) {
                    const newProducts = products.concat(productsFetched);
                    setProducts(newProducts);
                    setProductsPage(productsPage + 1);
                }
            }
        } catch(err) {
            alert('Erro ao carregar mais produtos');
        }
    }

    useEffect(() => {
        fetchProducts();
        navigation.addListener('focus', () => {
            fetchProducts();
        })
    }, [])

    return <View style={styles.container}>
        <Header>
            <View style={styles.header}>
                <Animated.View
                    style={[
                        styles.headerSearchContainer,
                        {
                            width: searchInputWidth
                        }
                    ]}
                >
                    <TextInput
                        style={styles.headerInput}
                        placeholder="Digite sua pesquisa"
                        value={search}
                        onChangeText={(txt) => setSearch(txt)}
                        onSubmitEditing={handleSearch}
                    />
                </Animated.View>
                <RectButton onPress={handleToggleSearch}>
                    <Feather
                        name={searchMode ? 'x'  : 'search'}
                        size={30}
                        color="#FFF"
                    />
                </RectButton>
            </View>
        </Header>
        <FlatList
            style={styles.main}
            contentContainerStyle={styles.mainContent}
            data={products}
            renderItem={({ item }) => <ProductCard {...item}/>}
            keyExtractor={(_, index) => `${index}`}
            onEndReached={handleMoreProducts}
            onEndReachedThreshold={0.2}
            numColumns={2}
            columnWrapperStyle={{ marginTop: 10 }}
        />
        <Footer>
            <RectButton onPress={handleUploadProduct}>
                <Text style={styles.footerText}>Cadastrar produto</Text>
            </RectButton>
        </Footer>
    </View>
}

export default Products;