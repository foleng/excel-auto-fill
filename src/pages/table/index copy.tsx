import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import React, { useEffect, useRef, useState } from 'react';
import './index.less'; // 引入自定义样式

const FullScreenExcel: React.FC = () => {
  const hotTableRef = useRef<Handsontable | null>(null);
  const [tableData, setTableData] = useState<any[][]>([]);
  console.log(tableData);


  // 初始化表格数据
  useEffect(() => {
    chrome.storage.local.get('tableData', (result) => {
      debugger;
      const rawData = result.tableData;
      if (rawData) {
        try {
          setTableData(JSON.parse(rawData));
        } catch (error) {
          console.error('解析表格数据失败：', error);
          setTableData([
            ['A1', 'B1'],
            ['A2', 'B2'],
          ]);
        }
      } else {
        setTableData([
          ['A1', 'B1'],
          ['A2', 'B2'],
        ]); // 默认数据
      }
    });
  }, []);

  const handleSave = () => {
    const instance = hotTableRef.current?.hotInstance;
    const data = instance?.getData();
    if (data) {
      chrome.storage.local.set({ tableData: JSON.stringify(data) }, () => {
        alert('表格数据已保存！');
      });
    }
  };

  return (
    <div className="excel-container">
      <div className="toolbar">
        <button onClick={handleSave}>保存</button>
        <button
          onClick={() => {
            const instance = hotTableRef.current?.hotInstance;
            if (instance) {
              instance.clear(); // 清空表格内容
            }
          }}
        >
          清空表格
        </button>
      </div>
      <div className="table-wrapper">
        <HotTable
          ref={hotTableRef}
          data={tableData}
          // colHeaders={true}
           colHeaders={[
        "Company name",
        "Country",
        "Name",
        "Sell date",
        "Order ID",
        "In stock",
        "Qty",
      ]}
          rowHeaders={true}
          licenseKey="non-commercial-and-evaluation"
          contextMenu={true}
          width="100%"
          height="100%"
          stretchH="all"
        />
      </div>
    </div>
  );
};

export default FullScreenExcel;
