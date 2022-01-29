import axios from 'axios';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text,Image, View } from 'react-native';
import NewsItem from '../components/NewsItem';
import Searchbar from '../components/Searchbar';



export default function TabTwoScreen() {

  const [searchText,setSearchText] = useState("");
  const [newsArticles,setNewsArticles] = useState([]);

  const getNews = async () => {
    
    await axios.get('https://newsapi.org/v2/top-headlines',{
      params: {
        category: "technology",
        // country: "us",
        language: "en",
        pageSize: 100,
        q: searchText,
        apiKey: ""
      }
    })
    .then((response) => {
       console.log(response.data.articles);
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
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar 
        searchText={searchText} 
        setSearchText={(text)=>setSearchText(text)} 
        onSubmit={getNews}  
      />
      {
        newsArticles.length !=0 ? (
          <FlatList
            data={newsArticles}
            renderItem={({item}) => <NewsItem newsData={item}/>}
            keyExtractor={(item)=>item.title}
            style={{marginTop: 20}}
            ListFooterComponent={<View style={{height: 20}}/>}
          />
        ):
        (
          <View style={styles.emptyContainer}>
            <Image 
              source={{
                uri: "https://cdn.pixabay.com/photo/2019/03/13/07/13/men-4052354_960_720.jpg"
                }} 
              style={styles.image}
              resizeMode= "cover"
            />
          </View>
         
        )
      }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  emptyContainer:{
    marginTop: 80,
    shadowOpacity: 0.5,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
        height: 5,
        width: 5
    },
    alignItems: "center"
  },
  image:{
    width: "80%",
    height: 200,
    borderRadius: 50,
  }
});
