import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import parser from './utils/parser';
import helper from './utils/helper';

const App = () => {
  const [pageAddress, setPageAddress] = useState('');
  const [successList, setSuccessList] = useState([]);
  const [erroredList, setErroredList] = useState([]);
  const [skippedList, setSkippedList] = useState([]);
  const [pageLinks, setPageLinks] = useState([]);
  const [visitedPages, setVisitedPages] = useState([]);

  useEffect(() => {}, [erroredList, skippedList, successList]);

  useEffect(() => {
    var uniqueLinks = new Set(pageLinks);
    uniqueLinks.forEach((link) => {
      if (!link.visited) {
        visitPageAddress(link.address);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageLinks]);

  const onChangePageAddress = (value) => {
    setPageAddress(value);
  };

  const visitPageAddress = (address) => {
    //visit page only once.
    if (!helper.isDuplicate(visitedPages, address)) {
      setVisitedPages([...visitedPages, address]);
      const links = parser.getLinksForPageAddress(address);
      if (links.length === 0) {
        //Add to error collection since the page do not exist.
        if (!helper.isDuplicate(erroredList, address)) {
          setErroredList([...erroredList, address]);
        }
      } else {
        //Add to success collection since the page is visited successfully.
        if (!helper.isDuplicate(successList, address)) {
          setSuccessList([...successList, address]);
        }
        /*Loop through the linked pages and check if they are already visited address.
         If Yes, then add to skipped collection and mark it as already visited.
         */

        let objects = links.map((link) => {
          if (helper.isDuplicate(visitedPages, link)) {
            if (!helper.isDuplicate(skippedList, link)) {
              setSkippedList([...skippedList, link]);
            }
            return {address: link, visited: true};
          }
          return {address: link, visited: false};
        });
        setPageLinks([...pageLinks, ...objects]);
      }
    }
  };
  const resetData = () => {
    setPageAddress('');
    setErroredList([]);
    setSkippedList([]);
    setVisitedPages([]);
    setSuccessList([]);
    setPageLinks([]);
  };

  const handlePageAddressCrawler = () => {
    visitPageAddress(pageAddress.toLowerCase());
  };

  const handleOnPress = () => {
    resetData();
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Start page:</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePageAddress}
                onEndEditing={handlePageAddressCrawler}
                value={pageAddress}
                placeholder="Enter page address"
              />

              <Text style={styles.sectionTitle}>Success:</Text>
              <Text style={styles.input}>{successList.join(', ')}</Text>
              <Text style={styles.sectionTitle}>Skipped:</Text>
              <Text style={styles.input}>{skippedList.join(', ')}</Text>
              <Text style={styles.sectionTitle}>Errored:</Text>
              <Text style={styles.input}>{erroredList.join(', ')}</Text>
              <Button
                style={styles.button}
                title="Clear"
                onPress={handleOnPress}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '400',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    marginTop: 8,

    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    marginTop: 30,
  },
});

export default App;
