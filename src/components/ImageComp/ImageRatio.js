import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const ImageRatio = ({item, onPress, aspectRatiodata}) => {
    

    const [aspectRatio, setAspectRatio] = useState(1);
    


    // Set  aspectRatio of image height and weight
    Image.getSize(item.xt_image, (width, height) => {
        aspectRatiodata(width / height);
        setAspectRatio(width / height);
    });
    return (
        <TouchableOpacity
            onPress={onPress}
            // onPress={() => navigation.navigate(routes.SUBMIT_DATA_SCREEN, 
            style={[styles.imageContainer, { aspectRatio: aspectRatio }]}>
            <Image
                resizeMode="contain"
                source={{ uri: item.xt_image }}
                style={[styles.image, { aspectRatio: aspectRatio }]}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        marginHorizontal:8,
      //  backgroundColor:'red',
        padding:5,
      
    },
    image: {  width: undefined },
});

export default ImageRatio