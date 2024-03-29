import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity as TO, ActivityIndicator, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import styles from './styles';

import Header from '../../components/Header';

import api from '../../services/api';
import url from '../../services/url';

interface ProductsQuantity {
    [index: string]: number
}

function UploadSale() {

    const dispatch = useDispatch();

    const route = useRoute();

    const [awaitingSaleId, setAwaitingSaleId] = useState(0);

    const [clientName, setClientName] = useState('');
    const [products, setProducts] = useState<Array<Product>>([]);
    const [productsQuantity, setProductsQuantity] = useState<ProductsQuantity>({});
    const [productSearch, setProductSearch] = useState<string>('');
    const [productsSearch, setProductsSearch] = useState<Array<Product>>([]);
    const [payments, setPayments] = useState<Array<Payment>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [qrcodeImage, setQrcodeImage] = useState('');

    function reset() {
        setProducts([]);
        setProductsQuantity({});
        setProductsSearch([]);
        setProductSearch('');
        setPayments([]);
    }

    function buildSale(): AwaitingSale {
        return {
            products,
            productsQuantity,
            payments,
            id: Date.now(),
            client: clientName
        }
    }

    function calculateTotalValue(): number {
        let totalValue = 0;
        products.forEach(product => {
            totalValue += product.salePrice * productsQuantity[product.id];
        })
        return totalValue;
    }

    function calculateTotalValueStr(): string {
        let totalValue = 0;
        products.forEach(product => {
            totalValue += product.salePrice * productsQuantity[product.id];
        })
        return totalValue.toFixed(2).toString().replace('.', ',');
    }

    function calculateProductValueStr(id: string, price: number): string {
        const value = price * productsQuantity[id];
        return value.toFixed(2).toString().replace('.', ',');
    }

    function calculateProductValue(id: string, price: number): number {
        return price * productsQuantity[id];
    }

    function calculateLeftValue() {
        let payValue = 0;
        payments.forEach(payment => {
            payValue += payment.pay;
        })
        return calculateTotalValue() - payValue;
    }

    function handleChangeClientName(txt: string) {
        setClientName(txt);
    }

    async function handleChangeSearch(txt: string) {
        try {
            setProductSearch(txt);

            if (txt === '') {
                setProductsSearch([]);
            } else {
                const { data: newProducts } = await api.get(`product/search?q=${txt}`);
                function filter(product: Product) {
                    if (productsQuantity[product.id] == undefined) {
                        return true;
                    } else {
                        return false;
                    }
                }
                setProductsSearch(newProducts.filter(filter));
            }
        } catch(err) {
            alert('Um erro ocorreu ao carregar os produtos da pesquisa');
        }
    }

    function handleChangeQuantity(id: string, txt: string) {
        if (isNaN(txt as any)) {
            return;
        }
        const newProductsQuantity = {...productsQuantity};
        if (txt === '') {
            newProductsQuantity[id] = 0;
        } else {
            const newValue = parseInt(txt);
            newProductsQuantity[id] = newValue;
        }
        setProductsQuantity(newProductsQuantity);
    }

    function handleRemoveProduct(id: string) {
        const newProducts = [...products];
        const newProductsQuantity = {...productsQuantity};
        const index = newProducts.findIndex(product => product.id === id);
        newProducts.splice(index, 1);
        delete newProductsQuantity[id]
        setProducts(newProducts);
        setProductsQuantity(newProductsQuantity);
    }

    function handleAddProduct(newProduct: Product) {
        const newProducts = [...products];
        const newProductsQuantity = {...productsQuantity}
        newProducts.push(newProduct);
        newProductsQuantity[newProduct.id] = 1;
        setProducts(newProducts);
        setProductsQuantity(newProductsQuantity);
        setProductSearch('');
        setProductsSearch([]);
    }

    function handleAddPayment() {
        const newPayments = [...payments];
        newPayments.push({
            pay: 0,
            paymentType: 'money'
        })
        setPayments(newPayments)
    }

    function handleChangePay(index: number, txt: string) {
        const newPayments = [...payments];
        if (txt === '') {
            newPayments[index].pay = 0;
        } else {
            let newText = txt.replace('.', '');
            let pay = parseFloat((parseFloat(newText) / 100).toFixed(2));
            newPayments[index].pay = pay;
        }
        setPayments(newPayments);
    }    

    function handleChangePayType(index: number, type: string) {
        const newPayments = [...payments];
        newPayments[index].paymentType = type;
        setPayments(newPayments);
    }

    function handleRemovePayment(index: number) {
        const newPayments = [...payments];
        newPayments.splice(index, 1);
        setPayments(newPayments);
    }

    async function handleUploadSale() {
        setLoading(true);
        try {
            const leftValue = calculateLeftValue();
            if (leftValue !== 0) {
                setLoading(false);
                return Alert.alert('Pagamento invalido', 'Valor restante não deve ser diferente de 0');
            }
            const productsUpload: Array<ProductSale> = [];
            products.forEach(product => {
                productsUpload.push({
                    deleted: false,
                    id: product.id,
                    price: calculateProductValue(product.id, product.salePrice),
                    quantity: productsQuantity[product.id]
                })
            })

            await api.post('sale', {
                products: productsUpload,
                payment: payments,
                price: calculateTotalValue()
            })
            dispatch({
                type: 'remove-awaiting-sale',
                id: awaitingSaleId
            })

            alert('Venda cadastrada com sucesso');
            reset();
        } catch(err) {
            alert('Erro ao cadastrar a venda');
        }
        setLoading(false);
    }

    function checkPixPayment(): boolean {
        let exists = false;
        payments.forEach(payment => {
            if (payment.paymentType === 'pix') {
                exists = true;
            }
        })
        return exists;
    }

    useEffect(() => {
        if (route.params) {
            const awaitingSale: AwaitingSale = (route as any).params.awaitingSale;
            setClientName(awaitingSale.client);
            setPayments(awaitingSale.payments);
            setProducts(awaitingSale.products);
            setProductsQuantity(awaitingSale.productsQuantity);
            setAwaitingSaleId(awaitingSale.id);
        }
    }, [route.params])

    useEffect(() => {
        async function generateQrCode() {
            try {
                let value = 0;
                payments.forEach(payment => {
                    if (payment.paymentType === 'pix') {
                        value += payment.pay;
                    }
                })
                const { data } = await api.post('/pix/create', {
                    value
                })
                setQrcodeImage(data.base64);
            } catch(err) {
                console.log(err)
                alert('Erro ao gerar QR Code');
            }
        }
        if (checkPixPayment()) {
            generateQrCode();
        }
    }, [payments])

    return <View style={styles.container}>
        <Header uploadSale sale={buildSale()} awaitingSaleId={awaitingSaleId}/>
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cliente</Text>
                <View style={styles.sectionHr}/>
                <TextInput
                    placeholder="Digite o nome do cliente"
                    style={styles.sectionInput}
                    value={clientName}
                    onChangeText={handleChangeClientName}
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Produtos</Text>
                <View style={styles.sectionHr}/>
                {products.length > 0 ? <View
                    style={[styles.sectionProduct, { borderColor: 'transparent' }]}
                >
                    <Text style={styles.sectionText}>Nome</Text>
                    <Text style={styles.sectionText}>Qntd.</Text>
                    <Text style={styles.sectionText}>Remover</Text>
                </View> : null}
                {products.map(product => {
                    return <View
                        key={product.id}
                        style={[
                            styles.sectionProduct,
                            { borderColor: '#28a745' }
                        ]}
                    >
                        <View style={styles.sectionProductInfoContainer}>
                            <Image
                                style={styles.sectionProductImage}
                                source={{ uri: `${url}/product/image/${product.image}` }}
                            />
                            <Text style={styles.sectionProductName}>{product.name}</Text>
                        </View>
                        <View style={styles.sectionProductInfoContainer2}>
                            <TextInput
                                style={styles.sectionProductName}
                                placeholder="Qntd."
                                keyboardType="number-pad"
                                value={productsQuantity[product.id].toString()}
                                onChangeText={txt => handleChangeQuantity(product.id, txt)}
                            />
                            <RectButton onPress={() => handleRemoveProduct(product.id)}>
                                <Feather
                                    name="x"
                                    size={20}
                                    color="#dc3545"
                                />
                            </RectButton>
                        </View>
                    </View>
                })}
                <TextInput
                    placeholder="Digite o nome do produto"
                    style={styles.sectionInput}
                    value={productSearch}
                    onChangeText={handleChangeSearch}
                />
                {productsSearch.map(productSearched => {
                    return <TO
                        key={productSearched.id}
                        onPress={() => handleAddProduct(productSearched)}
                    >
                        <View style={[styles.sectionProduct, { borderColor: 'lightgray' }]}>
                            <View style={styles.sectionProductInfoContainer}>
                                <Image
                                    style={styles.sectionProductImage}
                                    source={{ uri: `${url}/product/image/${productSearched.image}` }}
                                />
                                <Text style={styles.sectionProductName}>{productSearched.name}</Text>
                            </View>
                        </View>
                    </TO>
                })}
            </View>
            <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>Formas de pagamento</Text>
                    <RectButton onPress={handleAddPayment}>
                        <Feather
                            name="plus"
                            size={20}
                            color="#000"
                        />
                    </RectButton>
                </View>
                <View style={styles.sectionHr}/>
                {payments.map((payment, index) => {
                    return <View key={index} style={styles.sectionFooter}>
                        <View style={styles.sectionProductInfoContainer}>
                            <Text style={styles.sectionFooterText}>Valor:</Text>
                            <TextInput
                                style={styles.sectionProductName}
                                keyboardType="number-pad"
                                placeholder="Valor a pagar"
                                value={payment.pay.toFixed(2)}
                                onChangeText={txt => handleChangePay(index, txt)}
                            />
                        </View>
                        <Picker
                            style={{ width: '40%' }}
                            selectedValue={payment.paymentType}
                            onValueChange={value => handleChangePayType(index, value)}
                            mode="dropdown"
                        >
                            <Picker.Item label="Dinheiro" value="money" />
                            <Picker.Item label="Crédito" value="credit" />
                            <Picker.Item label="Débito" value="debt" />
                            <Picker.Item label="PIX" value="pix" />
                        </Picker>
                        <RectButton onPress={() => handleRemovePayment(index)}>
                                <Feather
                                    name="x"
                                    size={20}
                                    color="#dc3545"
                                />
                            </RectButton>
                    </View>

                })}
                <Text style={styles.sectionFooterPrice}>Resumo:</Text>
                {products.map(product => {
                    return <View key={product.id} style={styles.sectionFooter}>
                        <Text style={styles.sectionFooterPrice}>{product.name}</Text>
                        <Text style={styles.sectionFooterPriceText}>R$ {calculateProductValueStr(product.id, product.salePrice)}</Text>
                    </View>
                })}
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterText}>Valor total:</Text>
                    <Text style={styles.sectionFooterMoney}>R$ {calculateTotalValueStr()}</Text>
                </View>
                <View style={styles.sectionFooter}>
                    <Text style={styles.sectionFooterText}>Valor restante:</Text>
                    <Text style={styles.sectionFooterMoney}>R$ {calculateLeftValue().toFixed(2).replace('.', ',')}</Text>
                </View>
            </View>
            {loading ? <ActivityIndicator
                color="#17a2b8"
                size="large"
            /> : null}
            <TO onPress={handleUploadSale} disabled={loading}>
                <View style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Cadastrar</Text>
                </View>
            </TO>
            {checkPixPayment() ? <>
            <Image
                style={styles.pixQrCode}
                source={{ uri: qrcodeImage }}
            />
            <View style={styles.pixKeyContainer}>
                <Text style={styles.pixTitle}>Ou utilize a chave pix CNPJ:</Text>
                <Text style={styles.pixText}>46.763.941/0001-88</Text>
            </View>
            </> : null}
        </ScrollView>
    </View>
}

export default UploadSale