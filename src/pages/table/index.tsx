import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import React, { useEffect, useRef, useState } from 'react';
import './index.less'; // 引入自定义样式

const FullScreenExcel: React.FC = () => {
  const hotTableRef = useRef<Handsontable | null>(null);
  const [tableData, setTableData] = useState<any[][]>([]);

  // 初始化1000行数据
  useEffect(() => {
    const initialData = [];
    for (let i = 0; i < 1000; i++) {
      initialData.push(Array(26).fill('')); // 假设每行有26列（A-Z）
    }
    setTableData(initialData); // 设置初始数据
  }, []);

  const handleSave = () => {
    const instance = hotTableRef.current?.hotInstance;
    const data = instance?.getData();
    if (data) {
      console.log('表格数据', data);
    }
  };

  // 将列索引转化为字母 A-Z
  const getColumnLabel = (index: number) => {
    const letters = [];
    while (index >= 0) {
      letters.unshift(String.fromCharCode((index % 26) + 65));
      index = Math.floor(index / 26) - 1;
    }
    return letters.join('');
  };

  return (
    <div className="excel-container">
      {/* 工具栏 */}
      <div className="toolbar">
        <button onClick={handleSave}>保存</button>
      </div>

      {/* Handsontable 表格 */}
      <div className="table-wrapper">
        <HotTable
          ref={hotTableRef}
          data={tableData}
          colHeaders={(index: number) => getColumnLabel(index)} // 列头为字母 A-Z
          rowHeaders={true} // 行号从 1 开始
          licenseKey="non-commercial-and-evaluation"
          contextMenu={true}
          width="100%"
          height="100%"
          copyable={true} // 允许复制
          paste={true} // 允许粘贴
          stretchH="all"
          manualColumnResize={true} // 启用列宽调整
          manualRowResize={true} // 启用行高调整
        />
      </div>
    </div>
  );
};

export default FullScreenExcel;
