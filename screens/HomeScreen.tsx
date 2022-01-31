import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet,Image, Platform } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import NewsItem from '../components/NewsItem';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';


export default function HomeScreen() {

  const [newsArticles,setNewsArticles] = useState([]);
  const [refreshing,setRefreshing] = useState(false);
  const [language,setLanguage] = useState("en");

  

// getting news
  const getNews = async () => {
    
    await axios.get('https://newsapi.org/v2/top-headlines',{
      params: {
        category: "technology",
        language: language,
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

  // on refresh
  const onRefresh = () => {
    getNews();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  // call getNews when user first open the app
  useEffect(() => {
    getNews();
  }, []);
  
  return (
    <SafeAreaView 
      style={[styles.container,{
        backgroundColor: Colors.light.background
      }]}>
        {/* list of articles */}
      <FlatList
        data={newsArticles}
        renderItem={({item}) => <NewsItem newsData={item}/>}
        keyExtractor={(item)=>item.title}
        ListHeaderComponent={
          <View style={styles.headerComponent}>
            <FontAwesome name="newspaper-o" size={24} color={Colors.light.tint} />
            <Text 
              style={[styles.heading,{
              color: Colors.light.tint
              }]}
            >
              Tech News
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{height: 20}}/>}
        // on refresh
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.tint}
          />
        }
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerComponent:{
    padding: 10,
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 45 : 0,

  },
  heading:{
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 15
  }
});
