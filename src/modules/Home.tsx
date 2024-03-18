import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
} from 'react-native';
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
const sectionListData_: SectionListDataTyp[] = typesArr.map(item => ({
  type: item.name,
  data: [],
}));

export default () => {
  // feat_1: Modal添加账号
  const addAccountRef = React.useRef<AddAccountRef>(null);
  const onPress = () => {
    addAccountRef.current?.show();
  };

  // feat_2: SectionList数据初始化
  const [sectionListData, setSectionListData] = React.useState<
    SectionListDataTyp[]
  >([]);
  useEffect(() => {
    getStorage(STORAGE_KEY.USER).then(res => {
      if (!res) {
        res = [];
      }
      const sectionListData_res = res.reduce((prev, cur) => {
        prev.find(item => item.type === cur.type)?.data.push(cur);
        return prev;
      }, sectionListData_);
      setSectionListData(sectionListData_res);
    });
  }, []);
  const renderItem = ({item}: {item: User}) => {
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
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.layout}>
          <Text style={styles.text}>{`账号: ${item.account}`}</Text>
          <Text style={styles.text}>{`密码: ${item.pwd}`}</Text>
        </View>
      </View>
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
    return (
      <View style={styles.sectionHeader}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>{section.type}</Text>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.5}>
          <Image source={icon_arrow} style={styles.icon_arrow} />
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
      <Text style={styles.title}>账号管理</Text>
      <TouchableOpacity
        style={styles.addBtn}
        activeOpacity={0.5}
        onPress={onPress}>
        <Image source={icon_add} style={styles.addBtn_img} />
      </TouchableOpacity>
      <AddAccount ref={addAccountRef} />
      {renderSectionList()}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: '100%',
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