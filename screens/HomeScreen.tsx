import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet,Image, Platform } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import NewsItem from '../components/NewsItem';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function HomeScreen() {

  const [newsArticles,setNewsArticles] = useState([]);
  const [refreshing,setRefreshing] = useState(false);

  const getNews = async () => {
    
    await axios.get('https://newsapi.org/v2/top-headlines',{
      params: {
        category: "technology",
        country: "us",
        language: "en",
        pageSize: 100,
        apiKey: ""
      }
    })
    .then((response) => {
      // console.log(response.data.articles);
      setNewsArticles(response.data.articles);
      // console.log(newsArticles.length);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });  
  }

  const onRefresh = () => {
    getNews();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  useEffect(() => {
    getNews();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={newsArticles}
        renderItem={({item}) => <NewsItem newsData={item}/>}
        keyExtractor={(item)=>item.title}
        ListHeaderComponent={
          <View style={styles.headerComponent}>
            <FontAwesome name="newspaper-o" size={24} color="#00AF91" />
            <Text style={styles.heading}>Tech News</Text>
          </View>
        }
        ListFooterComponent={<View style={{height: 20}}/>}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00AF91"
          />
        }
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerComponent:{
    padding: 10,
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 45 : 0,
    // backgroundColor: "red"

  },
  heading:{
    color: "#00AF91",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 15
  }
});