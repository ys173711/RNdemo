// 小红书-个人设置页

import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
  StatusBar,
  Modal,
  SectionList,
} from 'react-native';
import icon_bg from '../assets/images/icon_bg.png';
import icon_menu from '../assets/images/icon_menu.png';
import icon_share from '../assets/images/icon_share.png';
import default_avatar from '../assets/images/default_avatar.png';
import icon_add from '../assets/images/icon_add.png';
import icon_code from '../assets/images/icon_code.png';
import icon_male from '../assets/images/icon_male.png';
import icon_setting from '../assets/images/icon_setting.png';
import icon_1 from '../assets/images/icon_1.png';
import icon_2 from '../assets/images/icon_2.png';
import icon_3 from '../assets/images/icon_3.png';
import {SectionData} from '../constants/Data';
import icon_close_modal from '../assets/images/icon_close_modal.png';

export default () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const renderDashboard = () => {
    return (
      <ImageBackground
        source={icon_bg}
        style={styles.imgBg}
        imageStyle={styles.imgBg_img}>
        <View style={styles.titleBar}>
          <Image source={icon_menu} style={styles.titleBar_icon} />
          <Image source={icon_share} style={styles.titleBar_icon} />
        </View>
        <View style={styles.infoLayout}>
          <Image source={default_avatar} style={styles.avatar} />
          <Image source={icon_add} style={styles.avatar_add} />
          <View style={styles.avatar_name}>
            <Text style={styles.nameTxt}>大公爵</Text>
            <View style={styles.iconCode}>
              <Text style={styles.idTxt}>小红书号: 118302851 </Text>
              <Image source={icon_code} style={styles.icon_code} />
            </View>
          </View>
        </View>
        <Text style={styles.profile}>点击关注，填写简介</Text>
        <View style={styles.sexImgBg}>
          <Image source={icon_male} style={styles.sexImg} />
        </View>
        <View style={styles.countLayout}>
          <TouchableOpacity
            style={styles.countLayout_item}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.itemCount}>142</Text>
            <Text style={styles.itemLabel}>关注</Text>
          </TouchableOpacity>
          <View style={styles.countLayout_item}>
            <Text style={styles.itemCount}>2098</Text>
            <Text style={styles.itemLabel}>粉丝</Text>
          </View>
          <View style={styles.countLayout_item}>
            <Text style={styles.itemCount}>1042</Text>
            <Text style={styles.itemLabel}>获赞与收藏</Text>
          </View>
          <View style={styles.placeholder} />
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editTxt}>编辑资料</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.editButton, styles.editButton_setting]}>
            <Image style={styles.iconSetting} source={icon_setting} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };

  const renderTabsContent = (i: number) => {
    const TabsContentStyles = StyleSheet.create({
      icon: {
        width: 96,
        height: 96,
        resizeMode: 'contain',
      },
      desc: {
        fontSize: 16,
        marginTop: 16,
      },
      button: {
        width: 76,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 12,
        color: '#333333',
      },
    });
    const tabsContent = [];
    tabsContent[0] = (
      <>
        <Image style={TabsContentStyles.icon} source={icon_1} />
        <Text style={TabsContentStyles.desc}>用一句话，分享今天的快乐吧～</Text>
        <Text style={TabsContentStyles.button}>去分享</Text>
      </>
    );
    tabsContent[1] = (
      <>
        <Image style={TabsContentStyles.icon} source={icon_2} />
        <Text style={TabsContentStyles.desc}>快去收藏你喜欢的作品吧～</Text>
        <Text style={TabsContentStyles.button}>去收藏</Text>
      </>
    );
    tabsContent[2] = (
      <>
        <Image style={TabsContentStyles.icon} source={icon_3} />
        <Text style={TabsContentStyles.desc}>你还没有给作品点赞哦～</Text>
        <Text style={TabsContentStyles.button}>去点赞</Text>
      </>
    );

    return tabsContent[i];
  };
  const [activeTab, setActiveTab] = React.useState(0);
  const renderTabs = () => {
    const tabs = [
      {label: '笔记', id: 0},
      {label: '收藏', id: 1},
      {label: '赞过', id: 2},
    ];

    return (
      <>
        <View style={styles.tabsLayout}>
          {tabs.map((item, index) => (
            <TouchableOpacity
              style={[styles.tabsNav]}
              onPress={() => setActiveTab(index)}
              key={item.id}>
              <Text
                style={[
                  styles.tabTxt,
                  activeTab === index && styles.tabTxtSelected,
                ]}>
                {item.label}
              </Text>
              <View
                style={[
                  styles.tabLine,
                  activeTab === index && styles.tabLine_active,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.tabsContentLayout}>
          {renderTabsContent(activeTab)}
        </View>
      </>
    );
  };

  const renderModal = () => {
    const modalStyles = StyleSheet.create({
      content: {
        height: '90%',
        backgroundColor: 'white',
      },
      listHeader: {
        paddingTop: 96,
      },
      titleLayout: {
        height: 46,
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      titleTxt: {
        fontSize: 18,
        color: '#333333',
        fontWeight: 'bold',
      },
      closeButton: {
        position: 'absolute',
        right: 16,
      },
      closeImg: {
        width: 24,
        height: 24,
      },
      nameTxt: {
        height: 46,
        textAlignVertical: 'center',
        paddingLeft: 16,
        fontSize: 16,
        color: '#333333',
      },
      typeTxt: {
        height: 36,
        backgroundColor: '#E0E0E0',
        textAlignVertical: 'center',
        paddingLeft: 16,
        fontSize: 16,
        color: '#666666',
      },
    });
    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent
        statusBarTranslucent>
        <View style={modalStyles.listHeader}>
          <View style={modalStyles.titleLayout}>
            <Text style={modalStyles.titleTxt}>粉丝列表</Text>
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Image style={modalStyles.closeImg} source={icon_close_modal} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={modalStyles.content}>
          <SectionList
            sections={SectionData}
            renderItem={({item}) => (
              <Text style={modalStyles.nameTxt}>{item}</Text>
            )}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderSectionHeader={({section}) => (
              <Text style={modalStyles.typeTxt}>{section.type}</Text>
            )}
          />
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      {renderDashboard()}
      {renderTabs()}
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FAFAFA', // 背景色, 同安卓默认
  },
  // renderDashboard
  imgBg: {
    padding: 20,
  },
  imgBg_img: {
    resizeMode: 'stretch',
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  titleBar_icon: {
    width: 24,
    height: 24,
  },
  infoLayout: {
    flexDirection: 'row',
    marginTop: 20,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 48,
    backgroundColor: 'white',
  },
  avatar_add: {
    width: 24,
    height: 24,
    marginLeft: -20,
    marginTop: 58,
  },
  avatar_name: {
    marginLeft: 8,
  },
  nameTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  iconCode: {
    flexDirection: 'row',
    marginTop: 8,
  },
  icon_code: {
    width: 12,
    height: 12,
    marginTop: 4,
    tintColor: 'white',
  },
  idTxt: {
    fontSize: 14,
    color: 'white',
  },
  profile: {
    fontSize: 16,
    color: 'white',
    marginVertical: 20,
  },
  sexImgBg: {
    width: 24,
    height: 18,
    backgroundColor: '#ffffff60',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sexImg: {
    resizeMode: 'contain',
    width: 12,
    height: 12,
    // backgroundColor: 'red',
    tintColor: '#1876ff',
  },
  countLayout: {
    marginTop: 20,
    flexDirection: 'row',
  },
  countLayout_item: {
    marginRight: 20,
  },
  itemCount: {
    fontSize: 16,
    color: 'white',
  },
  itemLabel: {
    fontSize: 14,
    color: '#ffffffc0',
    marginTop: 3,
  },
  editButton: {
    borderRadius: 16,
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 32,
    justifyContent: 'center',
  },
  editButton_setting: {
    marginLeft: 10,
  },
  editTxt: {
    fontSize: 14,
    color: '#ffffffE0',
  },
  iconSetting: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  placeholder: {
    flexGrow: 1,
  },
  // renderTabs
  tabsLayout: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsNav: {
    marginHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  tabTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#909090',
  },
  tabTxtSelected: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  tabLine: {
    width: 28,
    height: 2,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -14,
  },
  tabLine_active: {
    backgroundColor: '#f05856',
  },
  tabsContentLayout: {
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    paddingTop: 64,
  },
});
