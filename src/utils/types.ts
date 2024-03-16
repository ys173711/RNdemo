import type {SectionListRenderItemInfo} from 'react-native';

/**
 * <SectionList>
 * usage:
 * renderItem: (info: SectionList_InfoTyp<DataT>) => React.ReactElement;
 */
export type SectionData_SectionT<T> = T extends (infer U)[] ? U : never;
type SectionData_ItemT<T> = SectionData_SectionT<T> extends {data: (infer U)[]}
  ? U
  : never;
export type SectionList_InfoTyp<DataT> = SectionListRenderItemInfo<
  SectionData_ItemT<DataT>,
  SectionData_SectionT<DataT>
>;

/**
 * <FlatList>
 * usage:
 * renderItem: (info: FlatList_InfoTyp<DataT>) => React.ReactElement;
 */
export type FlatList_InfoTyp<T> = T extends (infer U)[] ? U : never;
