import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import database from '@react-native-firebase/database';
import {Searchbar} from 'react-native-paper';

class ListStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA: [],
      keySearch: '',
      temp: [],
    };
  }
  componentDidMount() {
    this._getAllList();
  }

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: index % 2 == 0 ? 'gray' : 'green',
          padding: 20,
          marginBottom: 8,
        }}
        onPress={() =>
          this.props.navigation.navigate('UpdateStaff', {
            room: this.state.DATA[index],
          })
        }>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: `${item.photo}`}}
            style={{width: 70, height: 70}}
          />
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{marginVertical: 5, fontWeight: 'bold'}}>
                Tên NV:
              </Text>
              <Text style={{marginVertical: 5, fontWeight: 'bold'}}>
                Phòng Ban:
              </Text>
            </View>
            <View>
              <Text style={styles.text}>{item.tennv}</Text>

              <Text style={styles.text}>{item.phongban}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _getAllList = () => {
    const ref = database().ref('/QuanLyNhanSu/NhanVien/');
    ref.on('value', (snapshot) => {
      const DATA = [];
      snapshot.forEach((e) => {
        DATA.push(e._snapshot.value);
      });
      this.setState({DATA});
      this.setState({temp: DATA});
      console.log('A ' + this.state.temp);
    });
  };

  _renderSearchBar = () => {
    return (
      <Searchbar
        placeholder={'Search Here...'}
        value={this.state.keySearch}
        editable={true}
        onChangeText={this._updateSearch}
      />
    );
  };

  _updateSearch = (keySearch) => {
    this.setState({keySearch}, () => {
      if ('' == keySearch) {
        this.setState({
          DATA: [...this.state.temp],
        });
        return;
      }
      this.state.DATA = this.state.temp.filter(function (item){
        return item.phongban.includes(keySearch);
      }).map(function({tennv, phongban, photo}){
        return{tennv,phongban, photo}
      })
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerView}>
          <TouchableOpacity
            style={{marginRight: 10}}
            underlayColor="tomato"
            onPress={() => this.props.navigation.navigate('AddStaff')}>
            <Image
              style={{width: 35, height: 35}}
              source={require('../../assets/add_24.png')}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          ListHeaderComponent={this._renderSearchBar}
          data={this.state.DATA}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          extraData={this.state}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99ffff',
  },
  item: {
    // backgroundColor: 'gray',
    padding: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
  },
  centerView: {
    backgroundColor: 'tomato',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textInput: {
    flexDirection: 'row',
    margin: 20,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
export default ListStaff;
