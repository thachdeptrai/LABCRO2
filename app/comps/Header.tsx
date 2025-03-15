import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = (
  {
    renderLeft,
    title,
    renderRight
  }
) => {
  return (
    <View style={st.container}>
      <View>
        {renderLeft ?? (
          <Image style={st.icon} source={require("../../assets/arrow_back.png")} />
          
        )}
      </View>
      <View>
        <Text style={st.title}>{title}</Text>
      </View>
      <View>
        {renderRight ?? (
          <Image style={st.icon} source={require("../../assets/person.png")} />
        )}
      </View>
    </View>
  )
}

export default Header

const st = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 0.6,
  },
  icon: {
    height: 26,
    width: 26,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  }
})