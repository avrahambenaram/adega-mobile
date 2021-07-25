import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TextInput, ActivityIndicator, TouchableOpacity as TO, Alert } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

import styles from './styles';

import Header from '../../components/Header';

import api from '../../services/api';
import url from '../../services/url';

interface GetData {
    data: Product
}

const initialState: Product = {
    creationDate: '',
    creationDay: 0,
    creationHour: 0,
    creationMinute: 0,
    creationMonth: 0,
    creationSecond: 0,
    creationTime: 0,
    id: '',
    creationYear: 0,
    image: '',
    name: '',
    purchasePrice: 0,
    quantity: 0,
    salePrice: 0
}

function UploadProduct() {

    const route = useRoute();
    const navigation = useNavigation();

    const [initialName, setInitialName] = useState<string>('');
    const [initialQuantity, setInitialQuantity] = useState<number>(0);
    const [initialPurchasePrice, setInitialPurchasePrice] = useState<number>(0);
    const [initialSalePrice, setInitialSalePrice] = useState<number>(0);

    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [purchasePrice, setPurchasePrice] = useState<number>(0);
    const [salePrice, setSalePrice] = useState<number>(0);
    const [product, setProduct] = useState<Product>(initialState);
    const [loading, setLoading] = useState<boolean>(false);

    const { params } = route;

    async function fetchProduct() {
        try {
            const { id } = params as any;
            const { data: newProduct } = await api.get(`product/${id}`) as GetData;

            setProduct(newProduct);

            setInitialName(newProduct.name);
            setName(newProduct.name);
            setInitialQuantity(newProduct.quantity);
            setQuantity(newProduct.quantity);
            setInitialPurchasePrice(newProduct.purchasePrice);
            setPurchasePrice(newProduct.purchasePrice);
            setInitialSalePrice(newProduct.salePrice);
            setSalePrice(newProduct.salePrice);
        } catch(err) {
            alert('Erro ao carregar produto');
        }
    }

    function handleChangePriceValue(txt: string, setValue: Function) {
        if (txt === '') {
            setValue(0);
        } else {
            let newText = txt.replace('.', '');
            setValue((parseFloat(newText) / 100).toFixed(2));
        }
    }

    function handleChangeNumberValue(txt: string) {
        if (txt === '') {
            setQuantity(0);
        } else {
            setQuantity(parseInt(txt));
        }
    }

    async function handleSaveProduct() {
        setLoading(true);
        try {
            const { id } = params as any;

            let finalChange: any = {};
            if (initialName !== name) {
                finalChange.name = name;
            }
            if (initialQuantity !== quantity) {
                finalChange.quantity = quantity;
            }
            if (initialPurchasePrice !== purchasePrice) {
                finalChange.purchasePrice = purchasePrice;
            }
            if (initialSalePrice !== salePrice) {
                finalChange.salePrice = salePrice;
            }
            await api.patch(`product/${id}`, finalChange);
            alert('Produto salvo com sucesso');
            fetchProduct();
        } catch(err) {
            alert('Um erro ocorreu ao salvar os dados.');
        }
        setLoading(false);
    }

    function verifyCanSave() {
        if (loading) {
            return true;
        }
        if (initialName !== name) {
            return true;
        }
        if (initialQuantity !== quantity) {
            return true;
        }
        if (initialPurchasePrice !== purchasePrice) {
            return true;
        }
        if (initialSalePrice !== salePrice) {
            return true;
        }
        return false;
    }

    async function deleteProduct() {
        try {
            const { id } = params as any;
            await api.delete(`product/${id}`);
            alert('Produto deletado com sucesso');
            navigation.goBack();
        } catch(err) {
            alert('Um erro ocorreu ao deletar o produto');
        }
    }

    function handleDeleteProduct() {
        Alert.alert(
            'Você está prestes a deletar um produto',
            `${product.name}`,
            [{
                text: 'Não deletar'
            }, {
                text: 'Deletar',
                onPress: deleteProduct
            }],
            {
                cancelable: true
            }
        )
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    return <View style={styles.container}>
        <Header return>
            <Text style={styles.headerTitle}>{initialName}</Text>
        </Header>
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
            <View style={styles.productIconContainer}>
                <Image
                    source={{ uri: `${url}/product/image/${product.image}` }}
                    style={styles.productIcon}
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações básicas</Text>
                <View style={styles.sectionItem}>
                    <View style={[styles.sectionItemInputInfoContainer, { width: '65%' }]}>
                        <Text style={styles.sectionItemInputTitle}>Nome</Text>
                        <View style={styles.sectionItemInputContainer}>
                            <FontAwesome5
                                name="signature"
                                size={18}
                                color="#007bff"
                            />
                            <TextInput
                                style={styles.sectionItemInput}
                                placeholder="Digite o nome"
                                value={name}
                                onChangeText={txt => setName(txt)}
                            />
                        </View>
                    </View>
                    <View style={[styles.sectionItemInputInfoContainer, { width: '30%' }]}>
                        <Text style={styles.sectionItemInputTitle}>Quantidade</Text>
                        <View style={styles.sectionItemInputContainer}>
                            <FontAwesome5
                                name="sort-numeric-up-alt"
                                size={18}
                                color="#007bff"
                            />
                            <TextInput
                                style={styles.sectionItemInput}
                                placeholder="Qntd."
                                keyboardType="number-pad"
                                value={quantity.toString()}
                                onChangeText={handleChangeNumberValue}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preço</Text>
                <View style={styles.sectionItem}>
                    <View style={[styles.sectionItemInputInfoContainer, { width: '40%' }]}>
                        <Text style={styles.sectionItemInputTitle}>Preço de venda</Text>
                        <View style={styles.sectionItemInputContainer}>
                            <Text style={styles.sectionItemInputText}>R${' '}</Text>
                            <TextInput
                                style={styles.sectionItemInput}
                                placeholder="Preço de V."
                                keyboardType="number-pad"
                                value={purchasePrice.toString()}
                                onChangeText={txt => handleChangePriceValue(txt, setPurchasePrice)}
                            />
                        </View>
                    </View>
                    <View style={[styles.sectionItemInputInfoContainer, { width: '40%' }]}>
                        <Text style={styles.sectionItemInputTitle}>Preço de compra</Text>
                        <View style={styles.sectionItemInputContainer}>
                            <Text style={styles.sectionItemInputText}>R${' '}</Text>
                            <TextInput
                                style={styles.sectionItemInput}
                                placeholder="Preço de C."
                                keyboardType="number-pad"
                                value={salePrice.toString()}
                                onChangeText={txt => handleChangePriceValue(txt, setSalePrice)}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <TO onPress={handleSaveProduct} disabled={!verifyCanSave()}>
                <View style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Salvar</Text>
                </View>
            </TO>
            <TO onPress={handleDeleteProduct}>
                <View style={styles.deleteButton}>
                    <Feather
                        name="trash-2"
                        size={24}
                        color="#FFF"
                    />
                    <Text style={styles.uploadButtonText}>Deletar</Text>
                </View>
            </TO>
            {loading ? <ActivityIndicator
                color="#17a2b8"
                size="large"
            /> : null}
        </ScrollView>
    </View>
}

export default UploadProduct;