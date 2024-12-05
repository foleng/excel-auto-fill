import React, { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';
import { HotTable, HotColumn } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable';

const HandsontableComponent = () => {
  const [tableData, setTableData] = useState<any[][]>([]);
  const data = [
    ['', 'Ford', 'Tesla', 'Toyota', 'Honda'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 32],
    ['2021', 30, 15, 12, 24],
    ['2022', 40, 20, 22, 23],
  ];

   // 初始化表格数据
  useEffect(() => {
    const initialData: any[][] = [];
    for (let i = 0; i < 1000; i++) {
      // 初始化 1000 行，每行 26 列数据
      initialData.push(Array(26).fill(i === 0 ? `Row-${i}` : '')); // 第一行有初始值，其余为空
    }
    setTableData(initialData);
  }, []);

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
    <div>
      <h1>Handsontable 在 React 中的示例</h1>
      <HotTable
        data={tableData}
        height={450}
        // colWidths={[170, 156, 222, 130, 130]}
        // colHeaders={["Company name", "Country", "Name", "Sell date", "Order ID"]}
        colHeaders={Array.from({ length: 26 }, (_, index) => getColumnLabel(index))}
        dropdownMenu={true}
        contextMenu={true}
        filters={true}
        rowHeaders={true}
        manualRowMove={true}
        fillHandle={{ direction: 'vertical' }} // 启用填充手柄
        licenseKey="non-commercial-and-evaluation"
      >
        <HotColumn data={1} />
        <HotColumn data={2} />
        <HotColumn data={3} />
        <HotColumn data={4} type={Handsontable.cellTypes.date} allowInvalid={false} />
      </HotTable>
    </div>
  );
};

export default HandsontableComponent;

