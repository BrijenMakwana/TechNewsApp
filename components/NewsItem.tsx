import { StyleSheet, Image, View, Text, Pressable } from 'react-native';
import React from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';

export type NewsItemProps = {
    newsData: {
        author: string;
        url: string;
        description: string;
        title: string;
        urlToImage: string;
        publishedAt: string;
        source: {
            name: string;
        }
    }
}

const NewsItem = (props: NewsItemProps) => {

    const navigation = useNavigation();

    const goToArticle = () => {
        // got to article source
       WebBrowser.openBrowserAsync(props.newsData.url);
        
    }

  return (
    <Pressable 
        style={[styles.container,{
            backgroundColor: Colors.light.background
        }]} 
        onPress={goToArticle}
    >
        {/* article image url */}
        <Image
            source={{
                uri: props.newsData.urlToImage || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }}
            style={styles.image}
            resizeMode= "cover"
        />

        {/* article info */}
        <View 
            style={[styles.info,{
                backgroundColor: Colors.light.background
            }]}
        >
            {/* title of the article */}
            <Text 
                style={[styles.title,{
                    color: Colors.light.text
                }]} 
                numberOfLines={3} 
                ellipsizeMode='tail'
            >
                {props.newsData.title}
            </Text>

            {/* description */}
            <Text 
                style={[styles.description,{
                    color: Colors.light.text
                }]} 
                ellipsizeMode="tail" 
                numberOfLines={3}
            >
                {props.newsData.description}
            </Text>

            {/* author and published date */}
            <View style={styles.authorDateContainer}>
                {/* author */}
                <Text>
                    by:{'\u00A0'} 
                    <Text 
                        style={[styles.author,{
                            color: Colors.light.text
                        }]} 
                        numberOfLines={1} 
                        ellipsizeMode='tail'
                    > 
                        {props.newsData.author || "unknown"}
                    </Text>
                </Text>
                {/* published date */}
                <Text 
                    style={[styles.date,{
                        color: Colors.light.tint
                    }]}
                >
                    {moment(props.newsData.publishedAt).format("MMM Do YY")}
                </Text>
            </View>
            <Text style={{marginTop: 10}}>
                source:{'\u00A0'}
                <Text 
                    style={[styles.sourceText,{
                        color: Colors.light.tint
                    }]}
                > 
                    {props.newsData.source.name || "unknown"}
                </Text>
            </Text>
        </View>
        
        
    </Pressable>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
    container:{
        width: "90%",
        alignSelf: "center",
        marginTop: 28,
        borderRadius: 30,
        shadowOpacity: 0.5,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            height: 5,
            width: 5
        }
    },
    image:{
        width: "100%",
        height: 200,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    info:{
        padding: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        
    },
    description:{
        fontSize: 16,
        fontWeight: "500",
        marginTop: 10,
        
    },
    authorDateContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        width: "100%",
        flexWrap: "wrap"
    },
    author:{
        fontSize: 15,
        fontWeight: "bold",
    },
    date:{
        fontSize: 15,
        fontWeight: "bold",
        
        
    },
    sourceText:{
        fontSize: 18,
        fontWeight: "bold",
        
    }
})
