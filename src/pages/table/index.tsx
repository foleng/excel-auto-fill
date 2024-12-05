import React, { useEffect, useRef, useState } from 'react';
import { HotTable, HotColumn } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable';
import './index.less'; // 引入自定义样式

const FullScreenExcel: React.FC = () => {
  const hotTableRef = useRef<HotTable>(null);
  const [tableData, setTableData] = useState<any[][]>([]);

  // 初始化表格数据
  useEffect(() => {
    const initialData: any[][] = [];
    for (let i = 0; i < 1000; i++) {
      // 初始化 1000 行，每行 26 列数据
      initialData.push(Array(26).fill(i === 0 ? `Row-${i}` : '')); // 第一行有初始值，其余为空
    }
    setTableData(initialData);
  }, []);

  // 保存表格数据
  const handleSave = () => {
    const instance = hotTableRef.current?.hotInstance;
    const data = instance?.getData();
    if (data) {
      console.log('表格数据:', data);
    }
  };

  // 根据索引生成列的字母标题 (A-Z, AA-ZZ)
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
          colHeaders={Array.from({ length: 26 }, (_, index) => getColumnLabel(index))} // 列标题
          rowHeaders={true} // 显示行标题
          licenseKey="non-commercial-and-evaluation"
          contextMenu={true} // 启用右键菜单
          width="100%"
          height="100%"
          stretchH="all" // 自动拉伸列
          fillHandle={{
            autoInsertRow: false, // 禁用自动插入行，避免冲突
            direction: 'both', // 同时支持水平和垂直方向拖动
          }}
          manualColumnResize={true} // 允许调整列宽
          manualRowResize={true} // 允许调整行高
          dropdownMenu={true} // 启用下拉菜单
          filters={true} // 启用过滤
          copyable={true} // 启用复制
          paste={true} // 启用粘贴
        >
          {/* 创建 26 列 */}
          {Array.from({ length: 26 }).map((_, index) => (
            <HotColumn key={index} data={index.toString()} />
          ))}
        </HotTable>
      </div>
    </div>
  );
};

export default FullScreenExcel;


