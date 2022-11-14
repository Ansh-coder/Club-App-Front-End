import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { appBackgroundColor, appButtonColor, appTextColor, appFont } from '../UniversalAppDesignVars'
import { map } from 'lodash'

const EditInfoComponent = ({titleArray, titleFieldContents, backEndFunction, backEndParameters, buttonTitle}) => {
    var mapData = {}
    console.log(titleArray)
    console.log(titleFieldContents)
    var mapRound = 0;

    const backEndWork = () => {
      const fetchToken = async () => {
        token = await AsyncStorage.getItem('token');
        console.log(token)

        return token
      }

      const assignMap = () => {
      var backEndMapRound = 0;
      var params = [];
      backEndParameters.map(param => {
        var paramData = titleFieldContents[backEndMapRound];
        params.push({[param]: paramData})
        console.log(params)
        backEndMapRound++;

        return params
      })
      return params
      }

      const params = assignMap()
      console.log(params)
      

      async function backEndData(url = '', data = params) {
        // Default options are marked with *
        const token = await fetchToken()
        const response = await fetch(url, {
          method: backEndFunction, // *GET, POST, PUT, DELETE, etc.
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'jwt ' + token
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript
    }
    }

    return <View>
      {titleArray.map(title => {
        const titleContent = titleFieldContents[mapRound]

        const onChangeTitleContent = () => {
          titleContent = React.useState(titleFieldContents[mapRound])
          titleFieldContents[mapRound] = titleContent
        }
        
        mapRound++;
        return(
          <View key={title}>
            <Text style = {styles.fieldName}>{title}</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTitleContent}
              value={titleContent}
              placeholder={title}
              placeholderTextColor = '#D5B877'
            />
          </View>
        )
      })}
          <TouchableOpacity 
              style = {styles.logInButton}
              disabled = {!titleFieldContents}
              onPress = {backEndWork}>
              <Text style = {styles.buttonText}>{buttonTitle}</Text>
          </TouchableOpacity>
    </View>
}

export default EditInfoComponent

const styles = StyleSheet.create({
    textColor: {
        color: 'white',
        fontFamily: appFont
    },
    buttonText: {
      fontFamily: appFont,
      alignSelf: 'center'
    },
    input: {
      width: 300,
      height: 40,
      backgroundColor: appBackgroundColor,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: appButtonColor,
      borderBottomWidth: 3,
      fontSize: 16,
      margin: 15,
      color: appTextColor,
      fontFamily: appFont,
    },
    fieldName: {
      backgroundColor: appBackgroundColor,
      color: appTextColor,
      fontFamily: appFont,
      marginTop: 20,
      marginLeft: 20,
      fontWeight: "900",
      fontSize: 20,
      textDecorationLine: 'underline',
      flexWrap: 'wrap'
    },
    logInButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: appButtonColor,
      color: appTextColor,
      height: 30,
      borderRadius: 2,
      fontFamily: appFont,
      fontSize: 16,
      margin: 20,
      shadowColor: '#5A5A5A',
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 10
    },
})