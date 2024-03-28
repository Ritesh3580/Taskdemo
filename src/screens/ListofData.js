import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { BASE_URL, Instance, endPoints, getAuthHeaders } from '../network/servicesAxios';
import AppColor from '../Assets/AppColor';
import ImageRatio from '../components/ImageComp/ImageRatio';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import AppButton from '../components/Button/AppButton';


const ListofData = ({ navigation }) => {
    // const navigation = useNavigation();
    const [offset, setOffset] = useState(0);
    const [imageData, setimageData] = useState([]);
    const [btnLoading, setBtnLoding] = useState(false);
    const [dataloading, setdataloading] = useState(true);
    useEffect(() => {
        handledataList();
    }, []);


    const  handledataList = () => {
        setBtnLoding(true);
       // setdataloading(true);
        const formData = new FormData();
        formData.append('user_id', '108');
        formData.append('offset', offset);
        formData.append('type', 'popular');
       
           
            axios.post(`http://dev3.xicom.us/xttest/getdata.php`, formData,
                { headers: { 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    
                    if (response?.data) {
                        setBtnLoding(false);
                        setdataloading(false);
                        setimageData(prevData => [...prevData, ...response?.data?.images]);
                        setOffset(offset + 1);
                        
                    }
                    else{
                        setBtnLoding(false)
                    }

                }
                )
                .catch((error) => {
                    Toast.show('Something went wrong', Toast.show);
                })

       





    }
   

    return (
        <SafeAreaView style={styles.container}>

           
            {
                dataloading ? <ActivityIndicator /> :


                    <FlatList
                        data={imageData}
                        renderItem={({ item, index }) =>
                            <ImageRatio item={item}
                                onPress={() =>
                                    navigation.navigate('SubmitData', { data: item })} />
                        }

                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={
                            <View style={styles.footer}>
                                <AppButton
                                    loaderColor={AppColor.WHITE}
                                    backgroundColor={AppColor.DARK_BLUE}
                                    title={'Load More'}
                                    textStyle={{ color: AppColor.WHITE, fontSize: 17 }}
                                    Indicator={btnLoading}
                                    onPress={() => handledataList()}
                                    ContainerStyle={{ height: 50 }}
                                />
                            </View>
                        }
                    />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainer: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        aspectRatio: 1,
        paddingHorizontal: 15,
    },
    image: {
        flex: 1,
    },
    footer: {
        width: '75%',
        alignSelf: 'center',
        paddingBottom: 20
    },

    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        borderRadius: 10,
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderColor: AppColor.BLACK
    },
    buttonText: {
        color: AppColor.BLACK,
        fontSize: 19,
        fontWeight: '700'
    }
    // lottieContainer: {
    //     backgroundColor: AppColor.WHITE,
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // lottieStyle: {
    //     height: '25%',
    //     width: '60%',
    // },
});

export default ListofData