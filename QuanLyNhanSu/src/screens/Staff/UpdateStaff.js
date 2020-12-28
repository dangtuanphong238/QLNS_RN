import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

export default class UpdateStaff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DATA: this.props.route.params,
      id: '',
      tennv: '',
      ngaysinh: '',
      sdt: '',
      cmnd: '',
      quequan: '',
      chucvu: '',
      phongban: '',
      photo: '',
    };
  }
  componentDidMount() {
    this._getParam();
  }

  _getParam = async () => {
    await this.setState({tennv: this.state.DATA.staff.tennv});
    await this.setState({ngaysinh: this.state.DATA.staff.ngaysinh});
    await this.setState({sdt: this.state.DATA.staff.sdt});
    await this.setState({cmnd: this.state.DATA.staff.cmnd});
    await this.setState({quequan: this.state.DATA.staff.quequan});
    await this.setState({chucvu: this.state.DATA.staff.chucvu});
    await this.setState({phongban: this.state.DATA.staff.phongban});
    await this.setState({photo: this.state.DATA.staff.photo});
    await this.setState({id: this.state.DATA.staff.id});
  };

  selectFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          photo: source.uri,
        });
      }
    });
  };

  _removeStaff = async () => {
    await database().ref(`QuanLyNhanSu/NhanVien/${this.state.id}`).remove();
    this.props.navigation.navigate('ListStaff');
  };

  _createTwoButtonAlert = () =>
    Alert.alert(
      'Warning',
      `Bạn có chắc chắn muốn xóa ${this.state.tennv} ?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this._removeStaff()},
      ],
      {cancelable: false},
    );

  uploadImage = async () => {
    const task = storage()
      .ref(`/ImageNhanVien/${this.state.tennv}/`)
      .putFile(this.state.photo);
    task.on('state_changed', (snapshot) => {
      console.log('snapshot: ' + snapshot);
    });
    try {
      await task;
    } catch (e) {
      console.log(e);
    }
    this.setState({
      photo: (
        await storage()
          .ref(`/ImageNhanVien/${this.state.tennv}`)
          .getDownloadURL()
      ).toString(),
    });
  };

  _updateStaff = async () => {
    if (
      this.state.tennv != '' &&
      this.state.ngaysinh != '' &&
      this.state.sdt != '' &&
      this.state.cmnd != '' &&
      this.state.quequan != '' &&
      this.state.chucvu != '' &&
      this.state.phongban != '' &&
      this.state.photo != ''
    ) {
      await this.uploadImage();
      await database()
        .ref(`QuanLyNhanSu/NhanVien/${this.state.id}`)
        .update({
          tennv: this.state.tennv,
          ngaysinh: this.state.ngaysinh,
          sdt: this.state.sdt,
          cmnd: this.state.cmnd,
          quequan: this.state.quequan,
          chucvu: this.state.chucvu,
          phongban: this.state.phongban,
          photo: this.state.photo,
        })
        .then(() => alert('Cập nhật thành công!'));
    } else {
      alert('Vui lòng nhập đủ!');
    }
  };

  render() {
    const {
      tennv,
      ngaysinh,
      sdt,
      cmnd,
      quequan,
      chucvu,
      phongban,
      photo,
    } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.centerView}>
          <Text style={styles.viewTieude}>SỬA NHÂN VIÊN</Text>
        </View>
        <View style={styles.view1}>
          <Text> Tên Nhân Viên : </Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            defaultValue={tennv}
            onChangeText={(text) => {
              this.setState({tennv: text});
            }}
          />
        </View>
        <View style={styles.view1}>
          <Text> Ngày Sinh : </Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            defaultValue={ngaysinh}
            onChangeText={(text) => {
              this.setState({ngaysinh: text});
            }}
          />
        </View>
        <View style={styles.view1}>
          <Text> Số Điện Thoại : </Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            defaultValue={sdt}
            onChangeText={(text) => {
              this.setState({sdt: text});
            }}
          />
        </View>
        <View style={styles.view1}>
          <Text> CMND : </Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            defaultValue={cmnd}
            onChangeText={(text) => {
              this.setState({cmnd: text});
            }}
          />
        </View>
        <View style={styles.view1}>
          <Text> Quê Quán : </Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            defaultValue={quequan}
            onChangeText={(text) => {
              this.setState({quequan: text});
            }}
          />
        </View>
        <View style={styles.view1}>
          <Text> Chức Vụ : </Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            defaultValue={chucvu}
            onChangeText={(text) => {
              this.setState({chucvu: text});
            }}
          />
        </View>
        <View style={styles.view1}>
          <Text> Phòng Ban : </Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            defaultValue={phongban}
            onChangeText={(text) => {
              this.setState({phongban: text});
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.view1}>
            <Text style={styles.view4}> Chọn hình : </Text>
          </View>
          <TouchableOpacity style={styles.view3} onPress={this.selectFile}>
            <Image
              source={require('../../assets/camera.png')}
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.view3}>
          <Image
            source={{uri: `${photo}`}}
            style={{marginHorizontal: 10, width: 200, height: 200}}
          />
        </View>
        <View>
          <View style={{flexDirection: 'row', marginHorizontal: 10}}>
            <View style={styles.view3}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this._updateStaff()}>
                <Image source={require('../../assets/idea.png')} />
                <Text style={styles.tieude}>Sửa Nhân Viên</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.view3}>
              <TouchableOpacity
                style={styles.button}
                onPress={this._createTwoButtonAlert}>
                <Image source={require('../../assets/clear.png')} />
                <Text style={styles.tieude}>Xóa Nhân Viên</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#99ffff'},
  view1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  view2: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  view3: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  view4: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingLeft: 20,
  },
  button: {
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
  vuithoi: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  viewTieude: {
    color: '#FF0000',
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 20,
  },
});
