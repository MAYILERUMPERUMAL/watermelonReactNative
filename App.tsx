/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { databaseWatermelon } from './database';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(()=>{
    // fetching()
  },[])

  const fetching = async () => {
    console.log('jjjjjj')
    try {
      const newUser = await databaseWatermelon.write(async () => {
        let newPost:any
        const additionalData = { newKey: 'some value' };
        for(let i=0; i<1000; i++){
          newPost = await databaseWatermelon.get('posts').create(post => {
            post.title = `${i+1} new Users`
            post.body = `${i+1} new body`
            post.subtitle=`${i+1}subtitle`
            post.is_pinned=i%2===0?true:false
            post.metadata = JSON.stringify(additionalData);
          })
        }
       
        console.log('newPost==',newPost)
        return newPost;
      });
      // console.log('New User:', newUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
const onRead=async ()=>{
const allPosts=await databaseWatermelon.get('posts').query().fetch()
// console.log('7777777',allPosts)
const postData=allPosts.map((el:any)=>({
title:el.title,
subtitle:el.subtitle,
body:el.body,
is_pinned:el.is_pinned
}))
console.log('vvvvvv',postData)
}



  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <TouchableOpacity onPress={()=>{onRead()}}><Text>{'get'}</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{fetching()}}><Text>{'create'}</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{updateDb()}}><Text>{'update'}</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{updateDb()}}><Text>{'update'}</Text></TouchableOpacity>
         {/* <TouchableOpacity onPress={()=>>{addExtraKey()}}><Text>{'addExtraKey'}</Text></TouchableOpacity> */}


          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
