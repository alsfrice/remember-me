import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ToolbarAndroid,
  // Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AccountList from '../components/AccountList.js';
import { exportExcel, importExcel } from '../utils/excel.js';
import { Navigation } from 'react-native-navigation';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  openSidebar = () => {
    Navigation.mergeOptions('main', {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.header}>
              <ToolbarAndroid
                style={styles.toolbar}
                navIcon={require('../assets/sidebar.png')}
                overflowIcon={require('../assets/menu.png')}
                title="RememberMe"
                titleColor={Colors.white}
                actions={[
                  {
                    title: '导入',
                  },
                  {
                    title: '导出'
                  }
                ]}
                onActionSelected={i => handleSelect(i)}
                // contentInsetStart={width / 2 - 32}
                onIconClicked={this.openSidebar}
              />
            </View>
            <View style={styles.body}>
              <AccountList ref={el => (this.accList = el)} />
            </View>
          </ScrollView>
        </SafeAreaView>
        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => this.accList.addAccount({ action: '添加' })}
        >
          <Image
            style={styles.button}
            source={require('../assets/plus.png')}
          />
        </TouchableOpacity>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: Colors.lighter
    backgroundColor: '#F87299'
  },
  engine: {
    position: 'absolute',
    right: 0
  },
  header: {
    backgroundColor: '#F87299',
    // paddingTop: StatusBar.currentHeight
  },
  toolbar: {
    backgroundColor: '#F87299',
    height: 50
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  },
  floatBtn: {
    borderRadius: 50,
    position: 'absolute',
    bottom: 30,
    right: 30,
    height: 60,
    width: 60,
    backgroundColor: '#F87299',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {}
});

// const { width } = Dimensions.get('window');

const handleSelect = index => {
  index === 0 ? importExcel() : exportExcel();
};
