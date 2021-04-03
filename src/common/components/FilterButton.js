import { Tree } from 'antd';

export const FilterButton = (props) => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <Tree
      checkable
      defaultExpandedKeys={props.filterData.map((filter) => filter.key)}
      defaultSelectedKeys={props.filterData.map((filter) => filter.key)}
      defaultCheckedKeys={props.filterData.map((filter) => filter.key)}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={props.filterData}
      showLine={false}
    />
  );
};
