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
} from 'react-native';
import database from '@react-native-firebase/database';

class ListRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA: [],
    };
    // this._getAllList();
  }
  componentDidMount() {
    this._getAllList();
  }

  renderItem = ({item, index}) => (
    <TouchableOpacity
      style={{backgroundColor: index % 2 == 0 ? 'orange' : 'green',padding:20, marginBottom:8}}
      onPress={() =>
        this.props.navigation.navigate('UpdateRoom', {
          room: this.state.DATA[index],
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text style={{flex:1, marginRight:10, fontWeight:'bold'}}>Tên Phòng:</Text>
        <Text style={styles.text}>{item.tenphong}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text style={{flex:1, marginRight:10, fontWeight:'bold'}}>Số lượng:</Text>
        <Text style={styles.text}>{item.soluongnguoi}</Text>
      </View>
    </TouchableOpacity>
  );

  _getAllList = () => {
    const ref = database().ref('/QuanLyNhanSu/PhongBan/');
    ref.on('value', (snapshot) => {
      const DATA = [];
      snapshot.forEach((e) => {
        DATA.push(e._snapshot.value);
      });
      this.setState({DATA});
      console.log(this.state.DATA.key);
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerView}>
          <TouchableOpacity
            style={{marginRight: 10}}
            underlayColor="tomato"
            onPress={() => this.props.navigation.navigate('AddRoom')}>
            <Image
              style={{width: 35, height: 35}}
              source={require('../../assets/add_24.png')}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.DATA}
          renderItem={this.renderItem}
          // renderItem={({item,index})=>{console.log(`Item= ${JSON.stringify(item.id)}, index= ${index}`)}}
          // keyExtractor={(item) => item.id}
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
  text:{
    flex:2,    
  }
});
export default ListRoom;
