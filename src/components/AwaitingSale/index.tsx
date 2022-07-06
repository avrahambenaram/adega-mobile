import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

interface Props {
    item: AwaitingSale
}

function AwaitingSale({ item }: Props) {

    const navigation = useNavigation();

    function calculateTotalProducts() {
        let totalProducts = 0;
        const keys = Object.keys(item.productsQuantity);
        keys.forEach(key => {
            totalProducts += item.productsQuantity[key];
        })
        return totalProducts;
    }

    function calculateTotalProductsPrice() {
        let totalPrice = 0;
        item.products.forEach(product => {
            totalPrice += item.productsQuantity[product.id] * product.salePrice;
        })
        return totalPrice.toFixed(2).replace('.', ',');
    }

    function handleUploadSale() {
        navigation.navigate('upload-sale', {
            awaitingSale: item
        })
    }

    return <RectButton style={styles.container} onPress={handleUploadSale}>
        <Text style={styles.text}>{item.client}</Text>
        <Text style={styles.text}>{calculateTotalProducts()} produto{calculateTotalProducts() > 1 ? 's' : ''}</Text>
        <Text style={styles.textPrice}>R$ {calculateTotalProductsPrice()}</Text>
    </RectButton>
}

export default AwaitingSale;