import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';

export default class UpdateRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DATA: this.props.route.params,
      tenphong: '',
      soluongnguoi: '',
      id: '',
    };
  }

  componentDidMount() {
    this._getParam();
  }

  _getParam = async () => {
    await this.setState({tenphong: this.state.DATA.room.tenphong});
    await this.setState({soluongnguoi: this.state.DATA.room.soluongnguoi});
    await this.setState({id: this.state.DATA.room.id});
  };

  _removeRoom = async () => {
    await database().ref(`QuanLyNhanSu/PhongBan/${this.state.id}`).remove();
    this.props.navigation.navigate('ListRoom');
  };

  _createTwoButtonAlert = () =>
    Alert.alert(
      'Warning',
      `Bạn có chắc chắn muốn xóa ${this.state.tenphong} ?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this._removeRoom()},
      ],
      {cancelable: false},
    );

_updateRoom = async () => {
   if(this.state.tenphong != "" && this.state.soluongnguoi != "")
   {
    await database()
    .ref(`QuanLyNhanSu/PhongBan/${this.state.id}`)
    .update({
      tenphong: this.state.tenphong,
      soluongnguoi: this.state.soluongnguoi
    })
    .then(() => alert("Cập nhật thành công!"));
   }
   else{
       alert("Vui lòng nhập đủ!")
   }
}
  render() {
    // const {room} = this.props.route.params

    return (
      <View style={styles.container}>
        <View style={styles.centerView}>
          <Text style={styles.tieude1}>Cập Nhật Phòng Ban</Text>
        </View>
        <View style={styles.view1}>
          <Text style={{fontWeight:'bold'}}> Tên Phòng : </Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.tenphong}
            onChangeText={(text) => {this.setState({tenphong:text})}}

            />
        </View>
        <View style={styles.view1}>
          <Text style={{fontWeight:'bold'}}> Số Lượng Người : </Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            defaultValue={this.state.soluongnguoi}
            onChangeText={(text) => {this.setState({soluongnguoi:text})}}
            />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginRight: 5,
            }}>
            <View style={styles.view3}>
              <TouchableOpacity style={styles.button} 
                onPress={()=>this._updateRoom()}>
                <Image
                  source={require('../../assets/idea.png')}
                  style={{marginHorizontal: 10}}
                />
                <Text style={styles.tieude}>Sửa Phòng</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.view3}>
              <TouchableOpacity
                style={styles.button}
                onPress={this._createTwoButtonAlert}>
                <Image
                  source={require('../../assets/clear.png')}
                  style={{marginHorizontal: 10}}
                />
                <Text style={styles.tieude}>Xóa Phòng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#99ffff'},
  view1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  view2: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  view3: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  centerView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textInput: {
    marginHorizontal: 20,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    marginHorizontal: 8,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  tieude: {
    fontSize: 16,
    marginVertical: 10,
    color: '#FF0000',
  },
  tieude1: {
    fontSize: 30,
    marginVertical: 30,
    color: '#FF0000',
  },
});
