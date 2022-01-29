import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export type SearchbarProps ={
  searchText: string;
  setSearchText: (text: string) => void;
  onSubmit: () => void;
}

const Searchbar = (props: SearchbarProps ) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={20} color="#00AF91" />
      <TextInput
        placeholder="search here"
        value={props.searchText}
        onChangeText={props.setSearchText}
        style={styles.input}
        placeholderTextColor="grey"
        onSubmitEditing={props.onSubmit}
      />
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container:{
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#00AF91",
    borderRadius: 30,
    shadowOpacity: 0.5,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 2
    },
    marginTop: Platform.OS === "android" ? 60 : 0

    
  },
  input:{
    flex: 1,
    marginLeft: 15,
    color: "#000"
  }
});
