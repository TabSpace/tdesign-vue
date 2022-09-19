import pick from 'lodash/pick';
import TreeStore from '../../_common/js/tree/tree-store';
import { TdTreeProps } from '../type';
import { TypeValueMode, TypeEventState, TypeTreeNodeModel } from '../interface';

export interface TypeUseStoreOptions {
  onLoad?: (info: TypeEventState) => void;
  onUpdate?: () => void;
}

export default function useTreeStore(props: TdTreeProps) {
  const {
    actived, value, valueMode, filter, keys,
  } = props;

  const store = new TreeStore({
    valueMode: valueMode as TypeValueMode,
    filter,
  });

  // 同步 Store 选项
  const updateStoreConfig = () => {
    // 统一更新选项，然后在 store 统一识别属性更新
    const storeProps = pick(props, [
      'expandAll',
      'expandLevel',
      'expandMutex',
      'expandParent',
      'activable',
      'activeMultiple',
      'disabled',
      'checkable',
      'checkStrictly',
      'load',
      'lazy',
      'valueMode',
      'filter',
    ]);
    store.setConfig(storeProps);
  };

  const updateExpanded = () => {
    const { expanded, expandParent } = props;
    if (!Array.isArray(expanded)) return;
    // 初始化展开状态
    // 校验是否自动展开父节点
    const expandedMap = new Map();
    expanded.forEach((val) => {
      expandedMap.set(val, true);
      if (expandParent) {
        const node = store.getNode(val);
        if (node) {
          node
            .getModel()
            .getParents()
            .forEach((tn: TypeTreeNodeModel) => {
              expandedMap.set(tn.value, true);
            });
        }
      }
    });
    const expandedArr = Array.from(expandedMap.keys());
    store.setExpanded(expandedArr);
  };

  // keys map 比较特殊，不应该在实例化之后再次变更
  store.setConfig({
    keys,
  });
  updateStoreConfig();
  store.append(props.data);

  // 刷新节点，必须在配置选中之前执行
  // 这样选中态联动判断才能找到父节点
  store.refreshNodes();

  // 初始化选中状态
  if (Array.isArray(value)) {
    store.setChecked(value);
  }

  // 更新节点展开状态
  updateExpanded();

  // 初始化激活状态
  if (Array.isArray(actived)) {
    store.setActived(actived);
  }

  return {
    store,
    updateStoreConfig,
    updateExpanded,
  };
}
