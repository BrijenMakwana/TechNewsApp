import { StyleSheet, Image, View, Text, Pressable } from 'react-native';
import React from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export type NewsItemProps = {
    newsData: {
        author: string;
        content: string;
        description: string;
        title: string;
        urlToImage: string;
        publishedAt: string;
    }
}

const NewsItem = (props: NewsItemProps) => {

    const navigation = useNavigation();

  return (
    <Pressable style={styles.container} onPress={()=>navigation.navigate("NotFound")}>
        {/* article image url */}
        <Image
            source={{
                uri: props.newsData.urlToImage || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }}
            style={styles.image}
            resizeMode= "cover"
        />

        {/* article info */}
        <View style={styles.info}>
            {/* title of the article */}
            <Text style={styles.title} numberOfLines={3} ellipsizeMode='tail'>{props.newsData.title}</Text>

            {/* description */}
            <Text style={styles.description} ellipsizeMode="tail" numberOfLines={3}>{props.newsData.description}</Text>

            {/* author and published date */}
            <View style={styles.authorDateContainer}>
                {/* author */}
                <Text>by:<Text style={styles.author}> {props.newsData.author || "unknown"}</Text></Text>
                {/* published date */}
                <Text style={styles.date}>{moment(props.newsData.publishedAt).format("MMM Do YY")}</Text>
            </View>
        </View>
        
    </Pressable>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
    container:{
        width: "90%",
        alignSelf: "center",
        // backgroundColor: "red",
        marginTop: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#fff",
        // shadowOpacity: 1,
        // shadowOffset: {
        //     height: 5,
        //     width: 5
        // }
    
        
        
    },
    image:{
        width: "100%",
        height: 200,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    info:{
        padding: 20,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: "#000"
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#000"
    },
    description:{
        fontSize: 16,
        fontWeight: "500",
        marginTop: 10,
        color: "#000"
    },
    authorDateContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    author:{
        fontSize: 15,
        fontWeight: "bold",
        color: "#000"
    },
    date:{
        fontSize: 15,
        fontWeight: "bold",
        color: "#00AF91"
    }
})
