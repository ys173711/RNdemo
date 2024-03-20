import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
  LayoutAnimation,
  Alert,
  Switch,
} from 'react-native';
import type {StyleProp, ViewStyle, ImageStyle} from 'react-native';
import icon_add from '../assets/images/icon_add-2.png';
import AddAccount from '../components/AddAccount';
import type {AddAccountRef} from '../components/AddAccount';
import {getStorage, setStorage, STORAGE_KEY} from '../utils/Storage';
import {typesArr} from '../components/AddAccount';
import type {User} from '../utils/Storage';
import icon_game from '../assets/images/icon_game.png';
import icon_platform from '../assets/images/icon_platform.png';
import icon_bank_2 from '../assets/images/icon_bank_2.png';
import icon_other from '../assets/images/icon_other.png';
import icon_arrow from '../assets/images/icon_arrow.png';

interface SectionListDataTyp {
  type: string;
  data: User[];
}
const genSectionListData_: () => SectionListDataTyp[] = () => {
  return typesArr.map(item => ({
    type: item.name,
    data: [],
  }));
};

const sectionItemState_ = typesArr.reduce((prev, cur) => {
  if (cur.name === '游戏') {
    prev[cur.name] = true;
    return prev;
  }
  prev[cur.name] = false;
  return prev;
}, {} as {[key: string]: boolean});

export default () => {
  // feat_1: Modal添加账号
  const addAccountRef = React.useRef<AddAccountRef>(null);
  // feat_6: 是否开启显示密码
  const [isShowPwd, setIsShowPwd] = React.useState(true);

  // feat_4: 点击账号列表项查看详情, 带参数传递给Modal, 函数重载
  const onPress = (data?: User) => {
    if (data) {
      addAccountRef.current?.show(data);
    } else {
      addAccountRef.current?.show();
    }
  };

  // feat_5: 长按账号列表项删除
  const deleteAccount = (data: User) => {
    const {id} = data;
    getStorage(STORAGE_KEY.USER).then(res => {
      if (!res) {
        res = [];
      }
      const index = res.findIndex(item => item.id === id);
      if (index !== -1) {
        res.splice(index, 1);
        setStorage(STORAGE_KEY.USER, res).then(() => {
          onFresh();
        });
      }
    });
  };
  const onLongPress = (data: User) => {
    Alert.alert('提示', '确定删除该账号吗?', [
      {text: '取消', onPress: () => {}},
      {text: '确定', onPress: () => deleteAccount(data)},
    ]);
  };

  // feat_2: SectionList数据初始化
  const [sectionListData, setSectionListData] = React.useState<
    SectionListDataTyp[]
  >([]);
  const [sectionItemState, setSectionItemState] =
    React.useState(sectionItemState_);

  const resetStorage = () => {
    setStorage(STORAGE_KEY.USER, []).then(() => {
      onFresh();
    });
  };
  const onReset = () => {
    Alert.alert('提示', '确定清空所有数据吗?', [
      {text: '取消', onPress: () => {}},
      {text: '确定', onPress: resetStorage},
    ]);
  };
  const onFresh = () => {
    getStorage(STORAGE_KEY.USER).then(res => {
      if (!res) {
        res = [];
      }
      const sectionListData_res = res.reduce((prev, cur) => {
        prev.find(item => item.type === cur.type)?.data.push(cur);
        return prev;
      }, genSectionListData_());
      LayoutAnimation.easeInEaseOut();
      setSectionListData(sectionListData_res);
    });
  };
  useEffect(() => {
    onFresh();
  }, []);
  const renderItem = ({item}: {item: User}) => {
    if (!sectionItemState[item.type]) {
      return null;
    }
    const styles = StyleSheet.create({
      content: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
      },
      title: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
      },
      layout: {
        flexDirection: 'row',
      },
      text: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        marginTop: 12,
        marginBottom: 6,
      },
    });
    return (
      <TouchableOpacity
        style={styles.content}
        onPress={() => onPress(item)}
        onLongPress={() => onLongPress(item)}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.layout}>
          <Text style={styles.text}>{`账号: ${item.account}`}</Text>
          <Text style={styles.text}>{`密码: ${
            isShowPwd ? item.pwd : '********'
          }`}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderSectionHeader = ({section}: {section: SectionListDataTyp}) => {
    const iconMap = {
      游戏: icon_game,
      平台: icon_platform,
      银行卡: icon_bank_2,
      其他: icon_other,
    };
    const icon = iconMap[section.type as keyof typeof iconMap];
    const styles = StyleSheet.create({
      sectionHeader: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingHorizontal: 12,
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        position: 'relative',
      },
      title: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 16,
      },
      icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
      },
      iconBtn: {
        position: 'absolute',
        right: 0,
        paddingRight: 12,
      },
      icon_arrow: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
      },
    });
    const isOpen = sectionItemState[section.type];
    const computedStyle_active: StyleProp<ImageStyle> = {
      transform: [{rotate: '-90deg'}],
    };
    const computedStyle = isOpen ? computedStyle_active : null;
    const noData = section.data.length === 0;
    const computedStyle_borderRadius: StyleProp<ViewStyle> = {
      borderBottomLeftRadius: !isOpen || noData ? 12 : 0,
      borderBottomRightRadius: !isOpen || noData ? 12 : 0,
    };
    // feat_3: 点击SectionHeader展开/收起
    const onPressFold = () => {
      sectionItemState[section.type] = !sectionItemState[section.type];
      LayoutAnimation.easeInEaseOut();
      setSectionItemState({...sectionItemState});
    };

    return (
      <View style={[styles.sectionHeader, computedStyle_borderRadius]}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>{section.type}</Text>
        <TouchableOpacity
          style={styles.iconBtn}
          activeOpacity={0.5}
          onPress={onPressFold}>
          <Image
            source={icon_arrow}
            style={[styles.icon_arrow, computedStyle]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  // 渲染账号列表
  const renderSectionList = () => {
    const styles = StyleSheet.create({
      contentContainer: {
        paddingHorizontal: 12,
      },
    });
    return (
      <SectionList
        sections={sectionListData}
        keyExtractor={(item, i) => item.type + i}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.contentContainer}
      />
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>账号管理</Text>
        <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
          <Text>清空数据</Text>
        </TouchableOpacity>
        <Switch
          value={isShowPwd}
          onValueChange={setIsShowPwd}
          style={styles.isShowPwd}
        />
      </View>
      <TouchableOpacity
        style={styles.addBtn}
        activeOpacity={0.5}
        onPress={() => onPress()}>
        <Image source={icon_add} style={styles.addBtn_img} />
      </TouchableOpacity>
      <AddAccount ref={addAccountRef} onFresh={onFresh} />
      {renderSectionList()}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: '100%',
  },
  header: {
    position: 'relative',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  resetBtn: {
    position: 'absolute',
    left: 16,
  },
  isShowPwd: {
    position: 'absolute',
    right: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 46,
  },
  addBtn: {
    position: 'absolute',
    right: 28,
    bottom: 64,
    zIndex: 100,
  },
  addBtn_img: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
});
