/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Image, Linking, ActivityIndicator } from 'react-native';


import AntDesign from 'react-native-vector-icons/AntDesign';

const App = () => {

  const [searchtext, setsearchtext] = useState('')
  const [profile, setprofile] = useState('');
  const [paname, setpaname] = useState('');
  const [username, setussername] = useState('');
  const [des, setdes] = useState('');
  const[link,setlink] = useState('');
  const[Followers,setFollowers] = useState();
  const[Following,setFollowing] =useState();
  const [mediacount,setmediacount] = useState();
  const[instaurl,setinstaurl] = useState('');
  const [datanotfound,setdatanotfound] =useState(true);
  const[isloading,setisloading] = useState(false);
   

  function nFormatter(num, digits,frs ) {
    console.log("frs.....",num);
    console.log("frs.....",digits);
    console.log("frs.....",frs);
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    if(frs == 'frs'){
      console.log("....",(num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol);
      setFollowers((num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol);

    }else if(frs== 'flg'){
      setFollowing((num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol);
    }else{
      setmediacount((num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol);
    }
    
  }
    


  const fetchdata = () => {
    setisloading(true);
    fetch('http://v2.aigrow.me/clients/api/ig/ig_profile?ig=therock&api_key=a66943a8-dff9-43a8-a669-a657a5f5a669&response_type=short')
      .then((response) => response.json())
      .then((json) => {


        console.log( "length",json.length);
        setprofile(json[0].profile_pic_url);
        setpaname(json[0].username);
        setussername(json[0].full_name);
        setdes(json[0].biography);
        setlink(json[0].hd_profile_pic_url_info.url)  
        setinstaurl(json[0].external_lynx_url)
        nFormatter(json[0].follower_count,undefined,'frs');
        nFormatter(json[0].following_count,undefined,'flg');
        nFormatter(json[0].media_count,undefined,'media');
        if(json.length>0){
          
          setdatanotfound(false)
        }else{
          setdatanotfound(true)
        }

      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setisloading(false);
    });

      
  }







  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ flex: 1 }} >

        <View style={{  marginTop: 20, flex: 1 }}>
          <Text style={{ fontSize: 25, fontWeight: '600', textAlign: 'center', color: 'black' }}>Search Profile</Text>
          <Text style={{ fontSize: 18, marginTop: 7,textAlign:'center' }}>can search any instagram Profile</Text>
          <View style={{alignSelf:'center', flexDirection: 'row', width: '90%', height: 45, elevation: 1, marginTop: 30, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign name='search1' size={23} style={{}} />
            <TextInput
              placeholder='Enter instagram username'
              style={{ width: '80%', height: 45, marginLeft: 5 }}
              onChangeText={(text) => {
                setsearchtext(text)
                {
                  text.length >= 3 ?
                    // alert('done')
                    setTimeout(() => {

                      fetchdata()
                    }, 3000)

                    :
                    //   alert('not')
                    null
                }
                // validation()
              }}>
            </TextInput>

          </View>

        </View>
        <View style={{ height: 1, backgroundColor: '#D3D3D3', marginTop: 22 }}></View>

        {isloading ? 
<ActivityIndicator 
style={{justifyContent:'center' ,alignItems:'center',flex: 2.7, }}
size={'large'} color="blue"
></ActivityIndicator>

:
datanotfound == false ?
        <View style={{ justifyContent: 'center', flex: 2.7, alignItems: 'center' }}>

          <View style={{ backgroundColor: 'white', width: '80%', height: '80%', elevation: 1, borderRadius: 10, alignItems: 'center' }}>
            {profile == '' || profile == null ?
              <Image
                source={require('./src/images/profile.png')}

                style={{ height: 90, width: 90, marginTop: 20, borderWidth: 1, borderColor: 'black', borderRadius: 90 / 2 }}
              />
              :
              <Image

                source={{ uri: profile }}
                style={{ height: 90, width: 90, marginTop: 20, borderWidth: 1, borderColor: 'black', borderRadius: 90 / 2 }}
              />
            }
            <Text style={{ fontWeight: '700', color: 'black', marginTop: 8, fontSize: 15 }}>{paname}</Text>
            <Text style={{ marginTop: 5, fontSize: 13, color: 'gray' }}>{username}</Text>
            <Text style={{ fontWeight: '700', color: 'black', marginTop: 8, fontSize: 15 }}>{des}</Text>

            <Text  numberOfLines={1} ellipsizeMode='tail' style={{ fontWeight: '700', color: 'blue', marginTop: 8, fontSize: 15 }}
              onPress={() => Linking.openURL(link)}>
              {link}
            </Text>

            <View style={{ height: 1, backgroundColor: '#D3D3D3', width: '90%', marginTop: 20 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 8 }} >
                <Text style={{ fontSize: 17, color: 'black' }}>{Followers}</Text>
                <Text style={{ fontSize: 13 }}>Followers</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 8 }} >
                <Text style={{ fontSize: 17, color: 'black' }}>{Following}</Text>
                <Text style={{ fontSize: 13 }}>Following</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 8 }} >
                <Text style={{ fontSize: 17, color: 'black' }}>{mediacount}</Text>
                <Text style={{ fontSize: 13 }}>Posts</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>Linking.openURL(instaurl) }

              style={{ height: 35, width: 150, borderRadius: 25, borderWidth: 1, borderColor: '#FF007F', marginTop: 17, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={{ color: '#FF007F', fontSize: 15 }}>Open in instagram</Text>
            </TouchableOpacity>
          </View>

        </View>
        : 
        <View style={{flex:2.7 ,justifyContent:'center',alignItems:'center' ,marginBottom:40}}>
          <AntDesign  name='search1' size={80} color='#FF69B4'/>
          <Text style={{color:'#FF69B4' ,fontWeight:'500' ,fontSize:20,marginTop:10}}>Search for instagram profile detail</Text>
        </View>
}

      </View>

    </SafeAreaView>
  );
};



export default App;
