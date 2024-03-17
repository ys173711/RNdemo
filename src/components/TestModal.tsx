import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Button,
  SectionList,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import icon_close_modal from '../assets/images/icon_close_modal.png';

import {SectionData} from '../constants/Data';

const {height: WINDOW_HEIGHT} = Dimensions.get('window');

const Separator = () => <View style={styles.separator} />;

export default () => {
  const [visible, setVisible] = useState(false);

  const translateYAnimatedValue = useRef(
    new Animated.Value(WINDOW_HEIGHT),
  ).current;

  const anim = Animated.timing(translateYAnimatedValue, {
    toValue: 0,
    duration: 500,
    useNativeDriver: true,
  });

  const showModal = () => {
    setVisible(true);
    anim.start();
  };

  const anim2 = Animated.timing(translateYAnimatedValue, {
    toValue: WINDOW_HEIGHT,
    duration: 500,
    useNativeDriver: true,
  });

  const hideModal = () => {
    anim2.start(() => {
      setVisible(false);
    });
  };

  const renderItem = ({
    item,
    index,
    section,
  }: {
    item: any;
    index: number;
    section: any;
  }) => {
    return <Text style={styles.txt}>{item}</Text>;
  };

  const ListHeader = (
    <View style={styles.header}>
      <Text style={styles.extraTxt}>列表头部</Text>
      <TouchableOpacity style={styles.closeButton} onPress={() => hideModal()}>
        <Image style={styles.closeImg} source={icon_close_modal} />
      </TouchableOpacity>
    </View>
  );

  const ListFooter = (
    <View style={[styles.header, styles.footer]}>
      <Text style={styles.extraTxt}>列表尾部</Text>
    </View>
  );

  const renderSectionHeader = ({section}: {section: any}) => {
    return <Text style={styles.sectionHeaderTxt}>{section.type}</Text>;
  };

  return (
    <View style={styles.root}>
      <Button title="按钮" onPress={() => showModal()} />

      <Modal
        visible={visible}
        onRequestClose={() => hideModal()}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade">
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.contentView,
              {
                transform: [
                  {
                    translateY: translateYAnimatedValue,
                  },
                ],
              },
            ]}>
            <SectionList
              style={styles.sectionList}
              contentContainerStyle={styles.containerStyle}
              sections={SectionData}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item}-${index}`}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={ListHeader}
              ListFooterComponent={ListFooter}
              renderSectionHeader={renderSectionHeader}
              ItemSeparatorComponent={Separator}
              stickySectionHeadersEnabled={true}
            />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
  },
  contentView: {
    width: '100%',
    height: '100%',
    paddingTop: '30%',
  },
  sectionList: {
    width: '100%',
    height: '80%',
  },
  txt: {
    width: '100%',
    height: 56,
    fontSize: 20,
    color: '#333333',
    textAlignVertical: 'center',
    paddingLeft: 16,
  },
  containerStyle: {
    backgroundColor: '#F5F5F5',
  },
  header: {
    width: '100%',
    height: 48,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    // backgroundColor: '#ff000030',
  },
  extraTxt: {
    fontSize: 20,
    color: '#666666',
    textAlignVertical: 'center',
  },
  sectionHeaderTxt: {
    width: '100%',
    height: 36,
    backgroundColor: '#DDDDDD',
    textAlignVertical: 'center',
    paddingLeft: 16,
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
  },
  separator: {
    width: '100%',
    height: 2,
    backgroundColor: '#D0D0D0',
  },
  closeButton: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 16,
  },
  closeImg: {
    width: 24,
    height: 24,
  },
});
