import React, { useState, Fragment } from 'react';
import { View, Text, ScrollView, Image, TextInput, Alert, ActivityIndicator, TouchableOpacity as TO } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

import styles from './styles';

import Header from '../../components/Header';

import api from '../../services/api';

import logo from '../../images/icon.png';

interface ProductIcon {
    uri: string
    name: string
    type: string
}

function UploadProduct() {

    const [productIcon, setProductIcon] = useState<ProductIcon>({
        name: '',
        type: '',
        uri: ''
    })
    const [name, setName] = useState<string>('');
    const [purchasePrice, setPurchasePrice] = useState<number>(0);
    const [salePrice, setSalePrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    function reset() {
        setName('');
        setPurchasePrice(0);
        setSalePrice(0);
        setProductIcon({
            name: '',
            type: '',
            uri: ''
        })
    }

    async function handleUploadImage() {
        try {
            const result = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                exif: true
            })
            if (!result.cancelled) {
                setProductIcon({
                    uri: result.uri,
                    name: `${name}.png`,
                    type: 'image/png'
                })
            }
        } catch(err) {
            Alert.alert('Um erro ocorreu', `${err}`);
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

    async function handleUploadProduct() {
        try {
            let titleAlert = 'Preencha todos os campos'
            if (!productIcon.uri) {
                Alert.alert(titleAlert, 'Faltando imagem');
            }
            if (!name) {
                Alert.alert(titleAlert, 'Faltando nome');
            }
            if (!purchasePrice) {
                Alert.alert(titleAlert, 'Faltando preço de venda');
            }
            if (!salePrice) {
                Alert.alert(titleAlert, 'Faltando preço de compra');
            }
            setLoading(true);

            const formData = new FormData();

            formData.append('image', {
                name: `${name}.png`,
                type: 'image/png',
                uri: productIcon.uri
            } as any)
            formData.append('name', name);
            formData.append('purchasePrice', purchasePrice as any);
            formData.append('salePrice', salePrice as any);

            await api.post('/product', formData, {
                headers: {
                    'Content-Type': 'multipart/formdata'
                }
            })
            Alert.alert('Produto criado com sucesso');
            setLoading(false);
            reset();
        } catch(err) {
            Alert.alert('Um erro ocorreu', `${err}`);
        }
    }

    return <View style={styles.container}>
        <Header return>
            <Text style={styles.headerTitle}>Crie um produto</Text>
        </Header>
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
            <RectButton onPress={handleUploadImage}>
                <View style={styles.productIconContainer}>
                    {productIcon.uri ? <Image
                        source={{ uri: productIcon.uri }}
                        style={styles.productIcon}
                    /> : <Fragment>
                        <Image
                            source={logo}
                            style={styles.productWithoutIcon}
                        />
                        <Text style={styles.productIconTitle}>Imagem do Produto</Text>
                    </Fragment>}
                </View>
            </RectButton>
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
            <TO onPress={handleUploadProduct}>
                <View style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Criar</Text>
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