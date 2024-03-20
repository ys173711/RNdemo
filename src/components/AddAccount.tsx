import React, {forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import type {StyleProp, ViewStyle, TextStyle} from 'react-native';
import icon_close_modal from '../assets/images/icon_close_modal.png';
import {getUUID} from '../utils/UUID';
import {getStorage, setStorage, STORAGE_KEY} from '../utils/Storage';
import type {User} from '../utils/Storage';

interface AddAccountProps {
  onFresh?: () => void;
}

// 需指定暴露的ref类型
export interface AddAccountRef {
  show: (accountInfo?: User) => void;
  hide: () => void;
}

export const typesArr = [
  {id: 1, name: '游戏'},
  {id: 2, name: '平台'},
  {id: 3, name: '银行卡'},
  {id: 4, name: '其他'},
];

const AddAccount = forwardRef<AddAccountRef, AddAccountProps>((props, ref) => {
  const {onFresh} = props;
  const [visible, setVisible] = React.useState(false);
  const selectTypeDefault = '游戏';
  const [selectType, setSelectType] = React.useState(selectTypeDefault);
  const [name, setName] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [id, setId] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);

  const reset = () => {
    setSelectType(selectTypeDefault);
    setName('');
    setAccount('');
    setPwd('');
    setId('');
    setIsEdit(false);
  };
  const show = (accountInfo?: User) => {
    if (accountInfo) {
      setSelectType(accountInfo.type);
      setName(accountInfo.name);
      setAccount(accountInfo.account);
      setPwd(accountInfo.pwd);
      setId(accountInfo.id);
      setIsEdit(true);
    } else {
      reset();
    }
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };
  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  const renderHeader = () => {
    const styles = StyleSheet.create({
      header: {
        position: 'relative',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
      },
      closeBtn: {
        position: 'absolute',
        right: 6,
      },
      closeBtn_img: {
        width: 28,
        height: 28,
      },
    });
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{isEdit ? '编辑' : '添加'}账号</Text>
        <TouchableOpacity onPress={hide} style={styles.closeBtn}>
          <Image source={icon_close_modal} style={styles.closeBtn_img} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSelectType = () => {
    const styles = StyleSheet.create({
      selectTypeLayout: {
        flexDirection: 'row',
        marginTop: 8,
        height: 32,
        borderRadius: 8,
      },
      typeItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
      },
    });
    const computedStyle = (index: number): StyleProp<ViewStyle> => ({
      borderTopLeftRadius: index === 0 ? 8 : 0,
      borderBottomLeftRadius: index === 0 ? 8 : 0,
      borderTopRightRadius: index === typesArr.length - 1 ? 8 : 0,
      borderBottomRightRadius: index === typesArr.length - 1 ? 8 : 0,
      transform: [{translateX: index !== 0 ? -index : 0}],
    });
    const computedStyle_selected = (
      index: number,
      isSelected: boolean,
    ): StyleProp<ViewStyle> => {
      return isSelected ? {backgroundColor: '#1890ff'} : null;
    };
    type TextStyleTyp = StyleProp<TextStyle>;
    const computedStyle_selected_text = (isSelected: boolean): TextStyleTyp => {
      return isSelected ? {color: 'white'} : null;
    };

    return (
      <View style={styles.selectTypeLayout}>
        {typesArr.map((item, index) => {
          const _computedStyle = computedStyle(index);
          const isSelected = selectType === item.name;
          const _computedStyle_selected = computedStyle_selected(
            index,
            isSelected,
          );
          const _computedStyle_selected_text =
            computedStyle_selected_text(isSelected);
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.typeItem, _computedStyle, _computedStyle_selected]}
              onPress={() => setSelectType(item.name)}>
              <Text style={_computedStyle_selected_text}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderName = () => (
    <TextInput
      style={styles.input}
      maxLength={20}
      value={name}
      onChangeText={setName}
    />
  );

  const renderAccount = () => (
    <TextInput
      style={styles.input}
      maxLength={20}
      value={account}
      onChangeText={setAccount}
    />
  );

  const renderPwd = () => (
    <TextInput
      style={styles.input}
      maxLength={20}
      value={pwd}
      onChangeText={setPwd}
    />
  );

  // 动态生成id
  const onPress = () => {
    // 非空校验
    if (!name || !account || !pwd) {
      return;
    }
    const data: User = {
      id,
      type: selectType,
      name,
      account,
      pwd,
    };
    if (isEdit) {
      getStorage(STORAGE_KEY.USER)
        .then(res => {
          if (!res) {
            res = [];
          }
          const index = res.findIndex(item => item.id === id);
          res[index] = data;
          return setStorage(STORAGE_KEY.USER, res);
        })
        .then(() => {
          reset();
          hide();
          onFresh && onFresh();
        });
    } else {
      data.id = getUUID();
      getStorage(STORAGE_KEY.USER)
        .then(res => {
          if (!res) {
            res = [];
          }
          res.push(data);
          return setStorage(STORAGE_KEY.USER, res);
        })
        .then(() => {
          reset();
          hide();
          onFresh && onFresh();
        });
    }
  };
  const renderButton = () => {
    const styles = StyleSheet.create({
      button: {
        marginTop: 16,
        padding: 8,
        backgroundColor: '#1890ff',
        borderRadius: 8,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
      },
    });
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>保存</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={hide}>
      <KeyboardAvoidingView style={styles.root} behavior={'padding'}>
        <View style={styles.container}>
          {renderHeader()}
          <Text style={styles.subsTitle}>账号类型</Text>
          {renderSelectType()}
          <Text style={styles.subsTitle}>账号名称</Text>
          {renderName()}
          <Text style={styles.subsTitle}>账号</Text>
          {renderAccount()}
          <Text style={styles.subsTitle}>密码</Text>
          {renderPwd()}
          {renderButton()}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {},
  container: {
    width: '80%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  //
  subsTitle: {
    color: '#666',
    fontSize: 12,
    marginTop: 16,
  },
  //
  input: {
    height: 40,
    borderRadius: 8,
    paddingLeft: 8,
    marginTop: 8,
    color: '#333',
    backgroundColor: '#f0f0f0',
  },
});

export default AddAccount;
