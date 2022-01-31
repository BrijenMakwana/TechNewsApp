import axios from 'axios';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text,Image, View } from 'react-native';
import NewsItem from '../components/NewsItem';
import Searchbar from '../components/Searchbar';
import Colors from '../constants/Colors';



export default function SearchScreen() {

  const [searchText,setSearchText] = useState("");
  const [newsArticles,setNewsArticles] = useState([]);

  // getting news
  const getNews = async () => {
    
    if(searchText != "")
    {
      await axios.get('https://newsapi.org/v2/top-headlines',{
        params: {
          category: "technology",
          language: "en",
          pageSize: 100,
          q: searchText,
          apiKey: ""
        }
      })
      .then((response) => {
  
        setNewsArticles(response.data.articles);
        
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }else{
      alert("Please enter your search")
    }
      
  }

  // clear search and array
  const clearSearch = () => {
    setSearchText("");
    setNewsArticles([]);
  }

  return (
    <SafeAreaView 
      style={[styles.container,{
        backgroundColor: Colors.light.background
      }]}>
        {/* searchbar */}
      <Searchbar 
        searchText={searchText} 
        setSearchText={(text)=>setSearchText(text)} 
        onSubmit={getNews}  
        onClear={clearSearch}
      />
          {/* list of articles */}
          <FlatList
            data={newsArticles}
            renderItem={({item}) => <NewsItem newsData={item}/>}
            keyExtractor={(item)=>item.title}
            style={{marginTop: 20}}
            ListHeaderComponent={
              <Text 
                style={[styles.noOfArtcles,{
                  color: Colors.light.tint
                }]}
              >
                {newsArticles.length} articles found
              </Text>
            }
            ListFooterComponent={<View style={{height: 20}}/>}
            ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image 
                source={{
                  uri: "https://cdn.pixabay.com/photo/2019/03/13/07/13/men-4052354_960_720.jpg"
                  }} 
                style={styles.image}
                resizeMode= "cover"
              />
            </View>
          }
          />
        
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
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
  },
  noOfArtcles:{
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center"
  }
});
