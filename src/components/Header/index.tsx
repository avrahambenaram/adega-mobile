import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

interface Props {
    return?: boolean
    children?: any
}

function Header(props: Props) {

    const navigation = useNavigation();

    function handlePress() {
        if (props.return) {
            navigation.goBack();
        } else {
            (navigation as any).openDrawer();
        }
    }

    return <View style={styles.container}>
        <RectButton onPress={handlePress}>
            <Feather
                name={props.return ? 'arrow-left' : 'menu'}
                size={40}
                color="#FFF"
            />
        </RectButton>
        <View style={styles.area}>
            {props.children}
        </View>
    </View>
}

export default Header;