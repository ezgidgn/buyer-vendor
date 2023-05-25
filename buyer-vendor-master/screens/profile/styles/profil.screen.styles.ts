import React from 'react';
import { StyleSheet } from "react-native";

export default StyleSheet.create({
comments_title_container:{
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    width:348,

    
  },
  comments_title:{
    fontSize:24,
    fontWeight:'bold',
    color:'grey',
    alignItems:'center',
    
  },
  container: {
    flex: 5,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  avatar_container: {
    padding: 10,
    flex: 1,
    height: 150,
    borderRadius: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },

  info_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:348
    
    
  },


  comments_container: {
    flex: 2,
    width: 348,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    flexDirection:'row',
    alignItems:'flex-start',
    
  },

  commentName: {
    fontStyle: "italic",
    fontWeight: "bold",
    color:'grey',
    marginTop:10,
    marginLeft:10,
  
  
 
    
  },
  commentContent: {
    fontStyle: "italic",
    fontWeight: "bold",
    alignItems:'flex-start',
    justifyContent:'flex-start',
    color:'grey',
    alignContent:'flex-start',
    paddingRight:5,
    marginTop:10,
    marginRight:30,
    marginLeft:5,
    width:150,
    
  },
  commentDate: {
    fontStyle: "italic",
    fontWeight: "bold",
    alignItems:'flex-end',
    justifyContent:'flex-end',
    color:'grey',
    alignContent:'flex-end',
    marginTop:30,
    

    
  },


  email_container: {
   // backgroundColor: "#EBC181",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
   borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 3,
   marginRight:20,
   marginLeft:20
    
  },
  phone_container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 3,
    marginRight:20,
    marginLeft:20
  },
  address_container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  marginBottom:3,
    marginRight:20,
    marginLeft:20,
    
    
  
  },
  inner_container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 9,
    marginTop:9,
    marginRight:10,
    marginLeft:10,
    backgroundColor:'pink',
  
  },
  input: {

    width: "75%",
    alignContent: "center",
    padding: 3,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    color: "grey",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
    paddingVertical: 2,
    paddingHorizontal: 14,
    borderRadius: 15,
    alignItems: "flex-start",
    margin: 10,
  },

  mail_icon: {
    width: 20,
    height: 20,
    resizeMode: "center",
    
  },
  phone_icon: {
    width: 20,
    height: 20,
    resizeMode: "center",
  },
  address_icon: {
    width: 20,
    height: 20,
    resizeMode: "center",
  },

  avatar: {
    borderRadius: 80,
    borderWidth: 5,
    borderColor: "orange",
    overflow: "hidden",
  },
  profile_text: {
    fontSize: 24,
    fontWeight: "bold",

    margin: 6,
  },
  slogan_text: {
    fontStyle: "italic",
    color: "grey",
  },
 
  });
  