import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import BouncyCheckbox from "react-native-bouncy-checkbox";

// Form validation
import * as Yup from 'yup'
import { Formik } from 'formik';
// YOUTUBE:
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required')

})
export default function App() {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setupperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength)

    setPassword(passwordResult)
    setIsPassGenerated(true)

  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
    // console.log("create password");

  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setupperCase(false)
    setNumbers(false)
    setSymbols(false)


  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values);
              generatePasswordString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
        
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}

                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType='numeric'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowercase</Text>
                  <BouncyCheckbox
                    useBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    useBuiltInState
                    isChecked={upperCase}
                    onPress={() => setupperCase(!upperCase)}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    useBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    useBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#FC80A5"
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    // onPress={handleSubmit} 
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState()
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
});




































// import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native'
// import React, { useState} from 'react'
// import  BouncyCheckbox  from "react-native-bouncy-checkbox";

// //from validation
//  import * as Yup from 'yup'
//  import {Formik} from 'formik';

// const PasswordSchema = Yup.object().shape({
// passwoedLenght:Yup.number()
// .min(4, 'should be min of 4 characters')
// .max(16, 'should be max of 16 characters')
// .required('Length is required')

// })
// export default function App(){
//   const [password, setpassword] = useState('')
//   const [ispassGenerated, setpassGenerated] = 
//   useState(false)

//   const [lowerCase, setLowerCase] = useState(true)
//   const [upperCase, setupperCase] = useState(false)
//   const [numbers, setNumbers] = useState(false)
//   const [symbols, setSymbols] = useState(false)

// const generatepasswordString = (passwodrLength:number) =>{
//   let characterList ='';
//   const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const lawerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
//   const digitChars = '0123456789';
//   const specialChars = '!@#$%^&*()_+';

//   if (upperCase) {
//     characterList += upperCaseChars
//   }
//   if (lowerCase) {
//     characterList += lawerCaseChars
//   }
//   if (numbers) {
//     characterList += digitChars
//   }
//   if (symbols) {
//     characterList += specialChars
//   }
// const passwordResult = createpassword(characterList, passwodrLength)

// setpassword(passwordResult)
// setpassGenerated(true)

// }

// const createpassword = (characters: string, passwodrLength:number) => {
//   let  result =''
//   for (let i = 0; i < passwodrLength; i++ ){
//     const characterIndex = Math.round(Math.random() * characters.length)
//    result +=  characters.charAt(characterIndex)
//   }
//   return result
// }

// const resetPasswordState = () =>{
//   setpassword('')
//   setpassGenerated(false)
//   setupperCase(false)
//   setLowerCase(true)
//   setNumbers(false)
//   setSymbols(false)

// }
//   return (
//   <ScrollView keyboardShouldPersistTaps="handled">
//     <SafeAreaView style={styles.AppContainer}>
//     <View style={styles.formContainer}>
// <Text style={styles.title}>Password Generator</Text>
// <Formik
//        initialValues={{ passwordLenght:'' }}
//       validationSchema={PasswordSchema}
//        onSubmit={ values => {
//         console.log(values)
//         generatepasswordString(+values.passwordLenght)
//        } }
//      >
//        {({
//          values,
//          errors,
//          touched,
//          isValid,
//          handleChange,
//          handleSubmit,
//          handleReset,
//          /* and other goodies */
//        }) => (
//          <>
//          <View style={styles.inputwrapper}>
//           <View style={styles.inputcolumn}>
//             <Text style={styles.headding}>Password Length</Text>
//             {touched.passwordLenght && errors.passwordLenght && (
//               <Text style={styles.errorText}>
//                 {errors.passwordLenght}
//               </Text>
//             )}

//           </View>
//           <TextInput
//             style={styles.inputstyle}
//             value={values.passwordLenght}
//             onChangeText={handleChange('passwordLenght')}
//             placeholder="Ex. 8"
//             keyboardType='numeric' 
//             />
//          </View>
//          <View style={styles.inputwrapper}>
//           <Text style={styles.headding}>include lowecase</Text>
//           <BouncyCheckbox
//            useBuiltInState
//            isChecked={lowerCase} 
//           onPress={() => setLowerCase(!lowerCase)}
//           fillColor='#29AB87'

//           />
//          </View>
//          <View style={styles.inputwrapper}>
//          <Text style={styles.headding}>include UpperCase</Text>
//           <BouncyCheckbox
//            useBuiltInState
//            isChecked={upperCase} 
//           onPress={() => setLowerCase(!lowerCase)}
//           fillColor='#29AB87'

//           />
//          </View>
//          <View style={styles.inputwrapper}>
//          <Text style={styles.headding}>include Number</Text>
//           <BouncyCheckbox
//            useBuiltInState
//            isChecked={numbers} 
//           onPress={() => setLowerCase(!lowerCase)}
//           fillColor='#29AB87'

//           />
//          </View>
//          <View style={styles.inputwrapper}>
//          <Text style={styles.headding}>include Symbols</Text>
//           <BouncyCheckbox
//            useBuiltInState
//            isChecked={symbols} 
//           onPress={() => setLowerCase(!lowerCase)}
//           fillColor='#29AB87'

//           />
//          </View>

//          <View style={styles.formAction}>
//           <TouchableOpacity 
//           disabled={!isValid}
//           style={styles.primarybtn}
//           onPress={ () =>{handleSubmit()}}
//           >
//             <Text style={styles.primarybtnTxt}>Generator Password</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//           style={styles.secondarybtn}
//           onPress={ () => {
//             handleReset() 
//           }}
//           >
//             <Text style={styles.secondarybtnTxt}>Reset</Text>
//           </TouchableOpacity>
//           </View>

//          </>
//        )}
//      </Formik>
//     </View>
//     {ispassGenerated ? (
//       <View style={[styles.card, styles.cardElevated]}>
//         <Text style={styles.subTitle}>Result:</Text>
//         <Text style={styles.description}>long press to copy</Text>
//         <Text selectable={true} style={styles.generatedpassword}>{password}</Text>
//       </View>
//     ) : null}
//     </SafeAreaView> 
//   </ScrollView>
//   )
// }


// const styles = StyleSheet.create({

//   AppContainer:{
//     flex:1
//   },
//   formContainer:{
//     padding:8,
//     margin:8
//   },
//   title:{
//     fontSize:32,
//     fontWeight:'600',
//     marginBottom:15,
//   },
//   headding:{
//    fontSize:15
//   },
//   errorText:{
//     fontSize:12,
//     color:'black'
//   },
//   inputwrapper:{
//     marginBottom:15,
//     alignItems:'center',
//     justifyContent:'space-between',
//     flexDirection:'row',

//   },

//   inputcolumn:{
//     flexDirection:'column'

//   },
//   Action:{
//     flexDirection:'row',
//     justifyContent:'space-between'
//   },
//   formAction:{
//     flexDirection:'row',
//     justifyContent:'center'
//   },

//   inputstyle:{
//     padding:8,
//     width:'30%',
//     borderWidth:1,
//     borderRadius:4,
//     borderColor:'lightblue'
//   },
//   primarybtn:{
//     width:120,
//     padding:10,
//     borderRadius:8,
//     marginHorizontal:8,
//     backgroundColor:'lightblue'

//   },
//   secondarybtn:{
//     width:120,
//     padding:10,
//     borderRadius:8,
//     marginHorizontal:8,
//     backgroundColor:'lightblue'
//   },
//   card:{
//     padding:12,
//     borderRadius:6,
//     marginHorizontal:12,
//   },

//   description:{
//     color:'lightblue',
//     marginBottom:8

//   },
//   generatedpassword:{
//     fontSize:22,
//     textAlign:'center',
//     marginBottom:12,
//     color:'#000'
//   },
//   primarybtnTxt:{
//     color:'black',
//     textAlign:'center',
//     fontWeight:'700'
//   },
//   secondarybtnTxt:{
//     textAlign:'center'
//   },
//   cardElevated:{
//     backgroundColor:'lightblue',
//     elevation:1,
//     shadowOffset:{
//       width:1,
//       height:1
//     },
//     shadowColor:'#333',
//     shadowOpacity:0.2,
//     shadowRadius:2
//   },
//   subTitle:{
//     fontSize:26,
//     fontWeight:'600',
//     marginBottom:2
//   }

// })


